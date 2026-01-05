import type { ClientInput } from '../pages/admin/CaseStudyWizard';
import type { CaseStudy } from '../data/caseStudies';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export interface GenerationCallbacks {
  onPhaseChange: (phase: string) => void;
}

function getSystemPrompt(): string {
  return `You are a marketing case study writer for Satori Studios, a web development and digital marketing agency specializing in local service businesses.

Your task is to generate a comprehensive case study based on the provided client information. The case study should demonstrate clear ROI and business value.

OUTPUT FORMAT: You MUST return a valid JSON object (no markdown, no code blocks, just raw JSON) matching this exact TypeScript interface:

{
  "slug": "lowercase-hyphenated-client-name",
  "clientName": "Business Name",
  "industry": "Industry Category",
  "location": "City, State",
  "services": ["Service 1", "Service 2"],
  "websitePreviewImages": {
    "desktop": "",
    "mobile": "",
    "thumbnail": ""
  },
  "kpis": [
    { "label": "Metric Name", "value": "123/mo", "delta": "+45%", "trend": "up" }
  ],
  "summaryHeadline": "One compelling sentence summarizing the main result",
  "challenge": "2-3 paragraphs describing the client's situation before working with Satori",
  "strategy": "2-3 paragraphs describing the approach and methodology used",
  "buildDeliverables": ["Deliverable 1", "Deliverable 2"],
  "resultsNarrative": "2-3 paragraphs describing the outcomes and impact",
  "chartsData": {
    "conversions": [
      { "name": "Month 1", "value": 50, "previous": 30 },
      { "name": "Month 2", "value": 75, "previous": 32 }
    ],
    "traffic": [
      { "name": "Month 1", "value": 1000, "previous": 600 }
    ]
  },
  "testimonial": {
    "name": "Client Contact Name",
    "title": "Position, Company",
    "text": "A compelling 2-3 sentence testimonial in first person"
  },
  "timeline": [
    { "week": "Week 1-2", "actions": ["Action 1", "Action 2"] }
  ],
  "tools": ["React", "Tailwind CSS", "Google Analytics"],
  "featured": false
}

IMPORTANT GUIDELINES:
1. Generate 4-6 compelling KPIs with realistic metrics based on industry benchmarks
2. Create a believable 4-phase timeline (typically spanning 8-12 weeks)
3. Write an authentic-sounding testimonial in first person with specific details
4. The challenge should highlight specific pain points and quantify problems where possible
5. The strategy should show clear methodology and connect to the results
6. Results narrative should quantify outcomes and tie back to the strategy
7. Generate 6 months of chart data with realistic growth trajectories
8. Include "previous" values in chart data representing baseline before engagement
9. Leave websitePreviewImages empty - these will be filled in manually
10. Use professional but conversational tone throughout
11. Focus on ROI, lead generation, revenue growth, and conversion metrics

For KPIs, use formats like:
- "342/mo" for volume metrics
- "$45,200" for revenue
- "4.8%" for rates
- "+127%" for delta values

For trends, use: "up" for positive improvements (even for cost reductions), "down" for negative trends, "neutral" for unchanged.`;
}

function buildUserPrompt(input: ClientInput): string {
  const beforeMetrics = input.beforeMetrics
    .filter(m => m.label && m.value)
    .map(m => `  - ${m.label}: ${m.value}`)
    .join('\n');

  const afterMetrics = input.afterMetrics
    .filter(m => m.label && m.value)
    .map(m => `  - ${m.label}: ${m.value}`)
    .join('\n');

  const industry = input.industry === 'Other' ? input.customIndustry : input.industry;

  let prompt = `Generate a comprehensive case study for this client:

CLIENT DETAILS:
- Name: ${input.clientName}
- Website: ${input.clientUrl}
- Industry: ${industry}
- Location: ${input.location}
- Services Provided: ${input.services.join(', ')}`;

  if (input.duration) {
    prompt += `\n- Project Duration: ${input.duration}`;
  }

  if (input.context) {
    prompt += `\n\nADDITIONAL CONTEXT:\n${input.context}`;
  }

  if (beforeMetrics) {
    prompt += `\n\nBEFORE METRICS (baseline):\n${beforeMetrics}`;
  }

  if (afterMetrics) {
    prompt += `\n\nAFTER METRICS (results):\n${afterMetrics}`;
  }

  prompt += `\n\nGenerate a compelling case study that showcases transformative results. Return ONLY the JSON object, no additional text or formatting.`;

  return prompt;
}

export async function generateCaseStudy(
  input: ClientInput,
  callbacks: GenerationCallbacks
): Promise<Partial<CaseStudy>> {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

  if (!apiKey) {
    throw new Error('Claude API key not configured. Please set VITE_CLAUDE_API_KEY in your .env.local file.');
  }

  callbacks.onPhaseChange('Preparing request...');

  const systemPrompt = getSystemPrompt();
  const userPrompt = buildUserPrompt(input);

  callbacks.onPhaseChange('Analyzing client information...');

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      }),
    });

    callbacks.onPhaseChange('Generating case study content...');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    callbacks.onPhaseChange('Processing response...');

    if (!data.content || !data.content[0] || data.content[0].type !== 'text') {
      throw new Error('Invalid response format from Claude API');
    }

    const content = data.content[0].text;

    // Parse the JSON response
    let caseStudy: Partial<CaseStudy>;
    try {
      // Try to extract JSON from the response (handle potential markdown code blocks)
      let jsonString = content;

      // Remove markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1];
      }

      caseStudy = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error('Failed to parse response:', content);
      throw new Error('Failed to parse case study from AI response. Please try again.');
    }

    callbacks.onPhaseChange('Finalizing...');

    // Validate required fields
    const requiredFields = ['slug', 'clientName', 'industry', 'summaryHeadline', 'challenge', 'strategy'];
    for (const field of requiredFields) {
      if (!caseStudy[field as keyof CaseStudy]) {
        throw new Error(`Generated case study missing required field: ${field}`);
      }
    }

    return caseStudy;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while generating the case study');
  }
}

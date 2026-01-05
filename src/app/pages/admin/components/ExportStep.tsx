import { useState } from 'react';
import { Download, Copy, Check, FileJson, FileCode, Eye } from 'lucide-react';
import type { WizardState } from '../CaseStudyWizard';

interface ExportStepProps {
  state: WizardState;
  dispatch: React.Dispatch<{ type: string }>;
}

type ExportFormat = 'json' | 'typescript' | 'preview';

export function ExportStep({ state }: ExportStepProps) {
  const { caseStudy } = state;
  const [format, setFormat] = useState<ExportFormat>('typescript');
  const [copied, setCopied] = useState(false);

  const generateTypeScriptExport = () => {
    return `// Add this to src/app/data/caseStudies.ts

export const ${caseStudy.slug?.replace(/-/g, '_')}: CaseStudy = ${JSON.stringify(caseStudy, null, 2)};

// Then add to the caseStudies array:
// ${caseStudy.slug?.replace(/-/g, '_')},`;
  };

  const generateJSONExport = () => {
    return JSON.stringify(caseStudy, null, 2);
  };

  const getExportContent = () => {
    switch (format) {
      case 'json':
        return generateJSONExport();
      case 'typescript':
        return generateTypeScriptExport();
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    const content = getExportContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const filename =
      format === 'json'
        ? `${caseStudy.slug}.json`
        : `${caseStudy.slug}.ts`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Export Case Study</h2>

      {/* Format Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-3">Export Format</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFormat('typescript')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              format === 'typescript'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:border-cyan-400/50'
            }`}
          >
            <FileCode className="w-4 h-4" />
            TypeScript
          </button>
          <button
            type="button"
            onClick={() => setFormat('json')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              format === 'json'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:border-cyan-400/50'
            }`}
          >
            <FileJson className="w-4 h-4" />
            JSON
          </button>
          <button
            type="button"
            onClick={() => setFormat('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              format === 'preview'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:border-cyan-400/50'
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Preview Mode */}
      {format === 'preview' && (
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
          <div className="mb-6">
            <span className="text-xs text-cyan-400 uppercase tracking-wider">{caseStudy.industry}</span>
            <h3 className="text-2xl font-bold mt-2">{caseStudy.clientName}</h3>
            <p className="text-zinc-400 mt-1">{caseStudy.location}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-zinc-400 mb-2">Summary</h4>
            <p className="text-zinc-300">{caseStudy.summaryHeadline}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {caseStudy.kpis?.slice(0, 4).map((kpi, index) => (
              <div key={index} className="bg-zinc-800/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-cyan-400">{kpi.value}</div>
                <div className="text-xs text-zinc-500">{kpi.label}</div>
                {kpi.delta && (
                  <div className="text-xs text-emerald-400 mt-1">{kpi.delta}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-zinc-400 mb-2">Services</h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.services?.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-zinc-800/50 border border-white/10 rounded-full text-sm text-zinc-300"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {caseStudy.testimonial && (
            <div className="bg-zinc-800/50 rounded-lg p-4 border-l-4 border-cyan-500">
              <p className="text-zinc-300 italic mb-2">"{caseStudy.testimonial.text}"</p>
              <p className="text-sm text-zinc-500">
                — {caseStudy.testimonial.name}, {caseStudy.testimonial.title}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Code Output */}
      {format !== 'preview' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-zinc-400">Output</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400 hover:border-cyan-400/50 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400 hover:border-cyan-400/50 transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <pre className="bg-zinc-950 border border-white/10 rounded-lg p-4 overflow-x-auto max-h-96">
            <code className="text-sm text-zinc-300 font-mono whitespace-pre">{getExportContent()}</code>
          </pre>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="font-medium text-cyan-400 mb-2">Next Steps</h4>
        <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-1">
          <li>Copy the generated code above</li>
          <li>Open <code className="text-cyan-300">src/app/data/caseStudies.ts</code></li>
          <li>Add the case study object to the file</li>
          <li>Add the variable name to the <code className="text-cyan-300">caseStudies</code> array</li>
          <li>Add hero image and thumbnail to <code className="text-cyan-300">public/images/case-studies/</code></li>
        </ol>
      </div>
    </div>
  );
}

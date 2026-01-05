import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { WizardState } from '../CaseStudyWizard';
import type { CaseStudy, KPI, TimelineItem } from '@/app/data/caseStudies';

interface ReviewStepProps {
  state: WizardState;
  dispatch: React.Dispatch<{
    type: string;
    updates?: Partial<CaseStudy>;
    index?: number;
    kpi?: KPI;
    timeline?: TimelineItem;
    value?: string;
  }>;
}

export function ReviewStep({ state, dispatch }: ReviewStepProps) {
  const { caseStudy } = state;
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['basic', 'content', 'kpis'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const SectionHeader = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border border-white/10 rounded-lg overflow-hidden mb-4">
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="w-full px-4 py-3 flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
      >
        <span className="font-medium">{title}</span>
        {expandedSections.has(id) ? (
          <ChevronUp className="w-5 h-5 text-zinc-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-zinc-400" />
        )}
      </button>
      {expandedSections.has(id) && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Review & Edit</h2>

      {/* Basic Information */}
      <SectionHeader id="basic" title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Slug (URL)</label>
            <input
              type="text"
              value={caseStudy.slug || ''}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CASE_STUDY', updates: { slug: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
              placeholder="client-name-case-study"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Client Name</label>
            <input
              type="text"
              value={caseStudy.clientName || ''}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CASE_STUDY', updates: { clientName: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry</label>
            <input
              type="text"
              value={caseStudy.industry || ''}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CASE_STUDY', updates: { industry: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Location</label>
            <input
              type="text"
              value={caseStudy.location || ''}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CASE_STUDY', updates: { location: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={caseStudy.featured || false}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CASE_STUDY', updates: { featured: e.target.checked } })
              }
              className="w-4 h-4 rounded border-white/10 bg-zinc-900/50 text-cyan-500 focus:ring-cyan-400/20"
            />
            <span className="text-sm text-zinc-400">Featured Case Study</span>
          </label>
        </div>
      </SectionHeader>

      {/* Content */}
      <SectionHeader id="content" title="Content">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Summary Headline</label>
          <textarea
            value={caseStudy.summaryHeadline || ''}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_CASE_STUDY', updates: { summaryHeadline: e.target.value } })
            }
            rows={2}
            className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Challenge</label>
          <textarea
            value={caseStudy.challenge || ''}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_CASE_STUDY', updates: { challenge: e.target.value } })
            }
            rows={4}
            className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Strategy</label>
          <textarea
            value={caseStudy.strategy || ''}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_CASE_STUDY', updates: { strategy: e.target.value } })
            }
            rows={4}
            className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Results Narrative</label>
          <textarea
            value={caseStudy.resultsNarrative || ''}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_CASE_STUDY', updates: { resultsNarrative: e.target.value } })
            }
            rows={4}
            className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none resize-none"
          />
        </div>
      </SectionHeader>

      {/* KPIs */}
      <SectionHeader id="kpis" title="Key Performance Indicators">
        {(caseStudy.kpis || []).map((kpi, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <input
                type="text"
                value={kpi.label}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_KPI', index, kpi: { ...kpi, label: e.target.value } })
                }
                className="px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
                placeholder="Label"
              />
              <input
                type="text"
                value={kpi.value}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_KPI', index, kpi: { ...kpi, value: e.target.value } })
                }
                className="px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
                placeholder="Value"
              />
              <input
                type="text"
                value={kpi.delta}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_KPI', index, kpi: { ...kpi, delta: e.target.value } })
                }
                className="px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
                placeholder="Delta"
              />
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_KPI', index })}
              className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => dispatch({ type: 'ADD_KPI' })}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
        >
          <Plus className="w-4 h-4" /> Add KPI
        </button>
      </SectionHeader>

      {/* Timeline */}
      <SectionHeader id="timeline" title="Timeline">
        {(caseStudy.timeline || []).map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                type="text"
                value={item.week}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_TIMELINE',
                    index,
                    timeline: { ...item, week: e.target.value },
                  })
                }
                className="px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
                placeholder="Week"
              />
              <input
                type="text"
                value={item.actions.join(', ')}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_TIMELINE',
                    index,
                    timeline: { ...item, actions: e.target.value.split(', ') },
                  })
                }
                className="px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
                placeholder="Actions (comma-separated)"
              />
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_TIMELINE', index })}
              className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => dispatch({ type: 'ADD_TIMELINE' })}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
        >
          <Plus className="w-4 h-4" /> Add Timeline Item
        </button>
      </SectionHeader>

      {/* Deliverables */}
      <SectionHeader id="deliverables" title="Deliverables">
        {(caseStudy.buildDeliverables || []).map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => dispatch({ type: 'UPDATE_DELIVERABLE', index, value: e.target.value })}
              className="flex-1 px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
              placeholder="Deliverable"
            />
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_DELIVERABLE', index })}
              className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => dispatch({ type: 'ADD_DELIVERABLE' })}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
        >
          <Plus className="w-4 h-4" /> Add Deliverable
        </button>
      </SectionHeader>

      {/* Tools */}
      <SectionHeader id="tools" title="Tools Used">
        {(caseStudy.tools || []).map((tool, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={tool}
              onChange={(e) => dispatch({ type: 'UPDATE_TOOL', index, value: e.target.value })}
              className="flex-1 px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
              placeholder="Tool"
            />
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_TOOL', index })}
              className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => dispatch({ type: 'ADD_TOOL' })}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
        >
          <Plus className="w-4 h-4" /> Add Tool
        </button>
      </SectionHeader>

      {/* Testimonial */}
      <SectionHeader id="testimonial" title="Testimonial">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Quote Text</label>
          <textarea
            value={caseStudy.testimonial?.text || ''}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_CASE_STUDY',
                updates: {
                  testimonial: { ...caseStudy.testimonial, text: e.target.value } as CaseStudy['testimonial'],
                },
              })
            }
            rows={3}
            className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Name</label>
            <input
              type="text"
              value={caseStudy.testimonial?.name || ''}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_CASE_STUDY',
                  updates: {
                    testimonial: { ...caseStudy.testimonial, name: e.target.value } as CaseStudy['testimonial'],
                  },
                })
              }
              className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              type="text"
              value={caseStudy.testimonial?.title || ''}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_CASE_STUDY',
                  updates: {
                    testimonial: { ...caseStudy.testimonial, title: e.target.value } as CaseStudy['testimonial'],
                  },
                })
              }
              className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none"
              placeholder="Owner, Company Name"
            />
          </div>
        </div>
      </SectionHeader>
    </div>
  );
}

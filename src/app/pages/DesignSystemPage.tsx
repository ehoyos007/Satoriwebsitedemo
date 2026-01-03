import { motion } from 'motion/react';

export function DesignSystemPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl mb-4">
              Satori Studios{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                Design System
              </span>
            </h1>
            <p className="text-xl text-zinc-400">
              Dark mode SaaS aesthetic with glowing gradients and premium motion
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Color Palette</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Primary Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-[#0a0a0f] border border-white/10" />
                  <div>
                    <div className="font-mono text-sm">#0a0a0f</div>
                    <div className="text-zinc-500 text-sm">Background Base</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-zinc-950 border border-white/10" />
                  <div>
                    <div className="font-mono text-sm">#09090b</div>
                    <div className="text-zinc-500 text-sm">Secondary Background</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-white" />
                  <div>
                    <div className="font-mono text-sm">#ffffff</div>
                    <div className="text-zinc-500 text-sm">Text Primary</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Accent Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-cyan-400 glow-cyan" />
                  <div>
                    <div className="font-mono text-sm">#22d3ee</div>
                    <div className="text-zinc-500 text-sm">Cyan Accent</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-violet-400 glow-violet" />
                  <div>
                    <div className="font-mono text-sm">#a78bfa</div>
                    <div className="text-zinc-500 text-sm">Violet Accent</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-emerald-400 glow-emerald" />
                  <div>
                    <div className="font-mono text-sm">#34d399</div>
                    <div className="text-zinc-500 text-sm">Emerald Accent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Gradient System</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Primary Gradient</h3>
              <div className="h-24 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 mb-3" />
              <code className="text-sm text-zinc-400">from-cyan-500 to-violet-500</code>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Hero Gradient</h3>
              <div className="h-24 rounded-lg bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 mb-3" />
              <code className="text-sm text-zinc-400">from-cyan-400 via-violet-400 to-emerald-400</code>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Subtle Background</h3>
              <div className="h-24 rounded-lg bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent mb-3" />
              <code className="text-sm text-zinc-400">from-cyan-500/10 via-violet-500/10 to-transparent</code>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Hover State</h3>
              <div className="h-24 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-400 mb-3" />
              <code className="text-sm text-zinc-400">from-cyan-400 to-violet-400</code>
            </div>
          </div>
        </section>

        {/* Effects */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Effects & Shadows</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Glassmorphism</h3>
              <div className="p-6 glass-panel rounded-lg border border-white/10 mb-3">
                <p className="text-sm">Glass Panel</p>
              </div>
              <code className="text-sm text-zinc-400 block">
                background: rgba(24, 24, 27, 0.6)<br />
                backdrop-filter: blur(12px)<br />
                border: 1px solid rgba(255, 255, 255, 0.1)
              </code>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Glow Cyan</h3>
              <div className="p-6 rounded-lg bg-cyan-500/20 glow-cyan mb-3">
                <p className="text-sm">Glowing Element</p>
              </div>
              <code className="text-sm text-zinc-400 block">
                box-shadow: 0 0 20px rgba(34, 211, 238, 0.3)
              </code>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Gradient Border</h3>
              <div className="p-6 rounded-lg gradient-border mb-3">
                <p className="text-sm">Gradient Border</p>
              </div>
              <code className="text-sm text-zinc-400 block">
                Linear gradient mask technique
              </code>
            </div>
          </div>
        </section>

        {/* Motion Notes */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Motion Design System</h2>
          
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-3 flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-sm">Global</span>
                Animated Galaxy Background
              </h3>
              <div className="space-y-2 text-zinc-400 text-sm">
                <p><strong className="text-white">Implementation:</strong> Canvas-based animation with multi-layer rendering</p>
                <p><strong className="text-white">Layers:</strong> Base gradient → Glow gradients → Animated grid → Floating triangles → Vignette</p>
                <p><strong className="text-white">Performance:</strong> 60fps target, mobile density reduction, DPR capping</p>
                <p><strong className="text-white">Accessibility:</strong> Respects prefers-reduced-motion (static gradient fallback)</p>
                <p><strong className="text-white">Position:</strong> Fixed to viewport, z-index: 0, pointer-events: none</p>
                <p><strong className="text-white">Variants:</strong> "grid" | "triangles" | "galaxy" (default)</p>
                <p><strong className="text-white">Intent:</strong> Premium SaaS aesthetic with subtle technical motion</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-3 flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-violet-500/20 text-violet-400 text-sm">Case Studies</span>
                Data Flow Lines
              </h3>
              <div className="mb-4 p-6 rounded-lg relative overflow-hidden" style={{ background: '#18181b', minHeight: '150px' }}>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    style={{
                      top: `${30 + i * 30}%`,
                      left: 0,
                      right: 0,
                      animation: `data-flow ${8 + i * 2}s linear infinite`,
                      animationDelay: `${i * 2}s`,
                    }}
                  />
                ))}
              </div>
              <div className="space-y-2 text-zinc-400 text-sm">
                <p><strong className="text-white">Animation:</strong> Horizontal scanning lines</p>
                <p><strong className="text-white">Duration:</strong> 8–12 second linear loops</p>
                <p><strong className="text-white">Movement:</strong> translateX(-100%) to translateX(100%)</p>
                <p><strong className="text-white">Opacity:</strong> Fade in/out at edges (0 → 0.3 → 0)</p>
                <p><strong className="text-white">Intent:</strong> Implies data processing and technical precision</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-3 flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-sm">Final CTA</span>
                Pulse Glow Effect
              </h3>
              <div className="mb-4 p-6 rounded-lg relative overflow-hidden flex items-center justify-center" style={{ background: '#18181b', minHeight: '150px' }}>
                <div
                  className="absolute w-48 h-48 bg-cyan-500/20 rounded-full"
                  style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
                />
                <div
                  className="absolute w-40 h-40 bg-violet-500/20 rounded-full"
                  style={{ animation: 'pulse-glow 6s ease-in-out infinite reverse' }}
                />
                <p className="relative z-10">CTA Content</p>
              </div>
              <div className="space-y-2 text-zinc-400 text-sm">
                <p><strong className="text-white">Animation:</strong> Gentle pulsing glow orbs</p>
                <p><strong className="text-white">Duration:</strong> 6–8 second ease-in-out loops</p>
                <p><strong className="text-white">Movement:</strong> Opacity + blur changes only</p>
                <p><strong className="text-white">Opacity:</strong> 0.4 ↔ 0.6 breathing effect</p>
                <p><strong className="text-white">Intent:</strong> Draws attention to CTA without aggression</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-3 flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-sm">Global</span>
                Noise Texture Overlay
              </h3>
              <div className="space-y-2 text-zinc-400 text-sm">
                <p><strong className="text-white">Implementation:</strong> body::before pseudo-element</p>
                <p><strong className="text-white">Opacity:</strong> 0.03 (very subtle)</p>
                <p><strong className="text-white">Z-index:</strong> 9999 (top layer)</p>
                <p><strong className="text-white">Pointer Events:</strong> none (non-interactive)</p>
                <p><strong className="text-white">Intent:</strong> Adds depth and prevents flat gradients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Component Patterns</h2>
          
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Primary Button (CTA)</h3>
              <div className="mb-4">
                <button className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                  <span className="relative z-10">Buy Website — $999.95</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              <code className="text-sm text-zinc-400 block">
                Gradient background • Hover: scale 1.05 • Glow shadow on hover • Inner gradient transition
              </code>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Secondary Button</h3>
              <div className="mb-4">
                <button className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm">
                  Book a Call
                </button>
              </div>
              <code className="text-sm text-zinc-400 block">
                Border style • Subtle fill on hover • Border color transition to accent
              </code>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="text-xl mb-4">Card with Hover Effect</h3>
              <div className="mb-4">
                <div className="group relative p-6 rounded-xl glass-panel hover:scale-105 transition-all border border-white/5 hover:border-cyan-400/30">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="relative z-10">Card Content</p>
                </div>
              </div>
              <code className="text-sm text-zinc-400 block">
                Glassmorphism base • Scale on hover • Gradient overlay appears • Border accent glow
              </code>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Typography Scale</h2>
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <div>
              <div className="text-7xl mb-2">Hero Headline</div>
              <code className="text-sm text-zinc-400">text-7xl (4.5rem / 72px)</code>
            </div>
            <div>
              <div className="text-5xl mb-2">Page Title</div>
              <code className="text-sm text-zinc-400">text-5xl (3rem / 48px)</code>
            </div>
            <div>
              <div className="text-3xl mb-2">Section Heading</div>
              <code className="text-sm text-zinc-400">text-3xl (1.875rem / 30px)</code>
            </div>
            <div>
              <div className="text-xl mb-2">Subheading / Large Body</div>
              <code className="text-sm text-zinc-400">text-xl (1.25rem / 20px)</code>
            </div>
            <div>
              <div className="text-base mb-2">Body Text</div>
              <code className="text-sm text-zinc-400">text-base (1rem / 16px)</code>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Spacing System</h2>
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-8 bg-cyan-500/20 rounded" />
                <code className="text-sm text-zinc-400">Section Padding: py-20 (5rem / 80px)</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-violet-500/20 rounded" />
                <code className="text-sm text-zinc-400">Card Padding: p-6 to p-8 (1.5–2rem)</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-8 bg-emerald-500/20 rounded" />
                <code className="text-sm text-zinc-400">Grid Gap: gap-6 (1.5rem / 24px)</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-8 bg-cyan-500/20 rounded" />
                <code className="text-sm text-zinc-400">Stack Gap: gap-3 (0.75rem / 12px)</code>
              </div>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-lg border border-white/5">
              <div className="w-full h-16 bg-cyan-500/20 rounded-lg mb-2" />
              <code className="text-sm text-zinc-400">rounded-lg (0.5rem)</code>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <div className="w-full h-16 bg-violet-500/20 rounded-xl mb-2" />
              <code className="text-sm text-zinc-400">rounded-xl (0.75rem)</code>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="w-full h-16 bg-emerald-500/20 rounded-2xl mb-2" />
              <code className="text-sm text-zinc-400">rounded-2xl (1rem)</code>
            </div>
            <div className="glass-panel p-6 rounded-full border border-white/5">
              <div className="w-full h-16 bg-cyan-500/20 rounded-full mb-2" />
              <code className="text-sm text-zinc-400">rounded-full (pill)</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
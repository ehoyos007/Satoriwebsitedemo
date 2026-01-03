import { Link } from 'react-router-dom';
import logoMark from 'figma:asset/51404eac78630c9ba9d5e3c7ee7ded4c32b0de1b.png';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoMark} alt="Satori Studios" className="h-10 w-auto" />
            </div>
            <p className="text-zinc-400 max-w-md">
              Satori Studios builds conversion-focused websites and measurable growth systems for SMBs.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-zinc-500">Company</h3>
            <div className="space-y-2">
              <Link to="/services" className="block text-zinc-400 hover:text-cyan-400 transition-colors">
                Services
              </Link>
              <Link to="/case-studies" className="block text-zinc-400 hover:text-cyan-400 transition-colors">
                Case Studies
              </Link>
              <Link to="/pricing" className="block text-zinc-400 hover:text-cyan-400 transition-colors">
                Pricing
              </Link>
              <Link to="/design-system" className="block text-zinc-400 hover:text-cyan-400 transition-colors">
                Design System
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-zinc-500">Contact</h3>
            <div className="space-y-2">
              <a href="#contact" className="block text-zinc-400 hover:text-cyan-400 transition-colors">
                Book a Call
              </a>
              <a href="mailto:hello@satoristudios.com" className="block text-zinc-400 hover:text-cyan-400 transition-colors">
                Email Us
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <p className="text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} Satori Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
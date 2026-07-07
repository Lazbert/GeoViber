import { Link } from 'react-router-dom';
import IconGeoViber from '@/assets/IconGeoViber.svg?react';

const NAV_ITEMS: { label: string; to: string | null }[] = [
  { label: 'Countries', to: '/countries' },
  { label: 'Metas', to: null },
  { label: 'Flags', to: null },
];

const NavigationBar: React.FC = () => {
  return (
    <nav className="z-50 glass rounded-b-3xl px-6 py-3 flex justify-between items-center w-full animate-fade-in">
      <Link to="/" className="flex items-center gap-3 group cursor-pointer">
        <IconGeoViber className="w-14 h-14 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3" />
        <span className="font-semibold text-3xl tracking-tight">
          <span className="text-brick-red">Geo</span>
          <span className="text-smoke">Viber</span>
        </span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        {NAV_ITEMS.map(({ label, to }) =>
          to ? (
            <Link
              key={label}
              to={to}
              className="relative overflow-hidden rounded-full px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium text-smoke bg-gunmetal/60 border border-white/10 transition-all duration-200 hover:border-brick-red/60 hover:bg-brick-red/15 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick-red/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brick-red/70"
            >
              {label}
            </Link>
          ) : (
            <button
              key={label}
              disabled
              aria-disabled="true"
              className="relative overflow-hidden rounded-full px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium text-smoke bg-gunmetal/60 border border-white/10 transition-all duration-200 opacity-50 cursor-not-allowed focus:outline-none"
            >
              {label}
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;

import IconGMapsPin from '../../assets/IconGMapsPin.svg?react';
import AutocompleteCountryBar from './AutocompleteCountryBar';

const HeroSection: React.FC = () => {
  return (
    <section className="z-10 relative flex-1 flex flex-col gap-8 px-4 sm:px-6 lg:px-8 max-w-2xl">
      <div className="relative">
        <h1 className="font-bold text-5xl sm:text-6xl lg:text-[72px] leading-[0.95] tracking-tight text-balance">
          <span className="block text-dark-lime animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            Skill issues?
          </span>
          <span
            className="block mt-2 text-2xl sm:text-3xl lg:text-[34px] font-medium text-grey leading-snug animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Start guessing like you&apos;ve been living there
          </span>
        </h1>
        <IconGMapsPin
          className="hidden lg:block absolute -top-6 -right-10 w-36 h-36 opacity-90 animate-float pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <p
        className="text-lg sm:text-xl text-smoke/80 leading-relaxed max-w-xl animate-fade-in-up"
        style={{ animationDelay: '0.35s' }}
      >
        The all-in-one platform to collate metas and trivia for GeoGuessr enthusiasts.
      </p>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <AutocompleteCountryBar />
      </div>
    </section>
  );
};

export default HeroSection;

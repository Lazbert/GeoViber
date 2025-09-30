import IconGMapsPin from '../../assets/IconGMapsPin.svg?react';
import AutocompleteCountryBar from './AutocompleteCountryBar';

const HeroSection: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center gap-6 px-5">
        <span className="font-semibold text-[64px] text-dark-lime leading-tight text-left px-2.5">
            Skill issues?
            <br />
            <span className='text-smoke text-[36px]'>
                Start guessing like you've been living there
            </span>
        </span>
        <span className="text-2xl text-grey leading-tight text-left px-2.5">
            The all-in-one platform to compile all metas into a compendium<br />
            for Geoguessr enthusiasts
        </span>
        <IconGMapsPin className="absolute top-[-2px] left-[368px] w-[195px] h-[195px]" />
        <AutocompleteCountryBar />
    </div>
  );
};

export default HeroSection;
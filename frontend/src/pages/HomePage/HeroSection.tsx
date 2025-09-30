import IconGMapsPin from '../../assets/IconGMapsPin.svg?react';
import AutocompleteCountryBar from './AutocompleteCountryBar';

const HeroSection: React.FC = () => {
  return (
    <div className="z-10 relative flex-1 flex flex-col gap-6 px-5">
        <div>
            <span className="font-semibold text-[58px] text-dark-lime leading-none text-left whitespace-pre">
                Skill issues?{"\n"}
            </span>
            <span className='-mt-2 text-smoke text-[32px]'>
                Start guessing like you've been living there
            </span>
        </div>
        <span className="text-2xl text-grey leading-tight text-left">
            The all-in-one platform to collate metas and trivia for Geoguessr enthusiasts
        </span>
        <IconGMapsPin className="absolute top-[-2px] left-[368px] w-[195px] h-[195px]" />
        <AutocompleteCountryBar />
    </div>
  );
};

export default HeroSection;
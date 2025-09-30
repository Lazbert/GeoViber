import IconGeoViber from '@/assets/IconGeoViber.svg?react';

const NavigationBar = () => {
  return (
    <div className="bg-white/20 rounded-b-2xl p-4 px-6 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <IconGeoViber className="w-[70px] h-[70px]" />
        <span className="font-inter font-bold text-4xl text-gunmetal leading-[1.21]">
          GeoViber
        </span>
      </div>
      <div className="flex gap-5 py-2">
        <button className="bg-brick-red text-smoke border-none rounded-lg px-6 py-3 text-xl cursor-pointer flex items-center justify-center font-poppins">
          Countries
        </button>
        <button className="bg-brick-red text-smoke border-none rounded-lg px-6 py-3 text-xl cursor-pointer flex items-center justify-center font-poppins">
          Metas
        </button>
        <button className="bg-brick-red text-smoke border-none rounded-lg px-6 py-3 text-xl cursor-pointer flex items-center justify-center font-poppins">
          Flags
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
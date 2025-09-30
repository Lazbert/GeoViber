import Earth from '../../assets/Earth2D.svg?react';

const InteractiveEarth = () => {
  return (
    <div className="flex justify-center items-center gap-2.5 w-fit h-full">
      <Earth className="w-[612px] h-[632px]" />
    </div>
  );
};

export default InteractiveEarth;
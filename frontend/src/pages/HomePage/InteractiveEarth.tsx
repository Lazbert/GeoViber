import { useState } from 'react';

import SwitchToggle from '@/components/SwitchToggle';
import Earth2D from '../../assets/Earth2D.svg?react';
import Earth3D from '@/components/Earth3D';

const InteractiveEarth: React.FC = () => {
  const [enabled3D, setEnabled3D] = useState(false);
  
  return (
    <div className="flex flex-col justify-center items-center gap-2.5 h-full py-4">
      <SwitchToggle className="self-end h-fit" enabled={enabled3D} setEnabled={setEnabled3D} />
      {enabled3D ? <Earth3D /> : <Earth2D className="h-full animate-heartbeat" />}
    </div>
  );
};

export default InteractiveEarth;
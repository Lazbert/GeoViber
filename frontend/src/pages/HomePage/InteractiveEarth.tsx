import { useState } from 'react';

import SwitchToggle from '@/components/SwitchToggle';
import Earth2D from '../../assets/Earth2D.svg?react';
import EarthWithEnvironment from '@/components/EarthWithEnvironment';

const InteractiveEarth: React.FC = () => {
  const [enabled3D, setEnabled3D] = useState(false);
  
  return (
    <div className="flex-1 flex flex-col items-center gap-2.5 h-full py-4">
      <SwitchToggle className="z-10 self-end h-fit" enabled={enabled3D} setEnabled={setEnabled3D} />
      {enabled3D ? <EarthWithEnvironment /> : <Earth2D className="h-full animate-heartbeat" />}
    </div>
  );
};

export default InteractiveEarth;
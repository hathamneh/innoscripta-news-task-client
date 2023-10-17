import { PropsWithChildren, useState } from 'react';
import Topbar from '@/components/Layouts/topbar';
import Sidebar from '@/components/Layouts/sidebar';

const AppLayout = ({ children }: PropsWithChildren<{}>) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <div>
      <Topbar onMenuClick={toggleMenu} />
      <div className="flex">
        <Sidebar expanded={isMenuVisible} />
        <main className="flex-1 p-4 pt-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;

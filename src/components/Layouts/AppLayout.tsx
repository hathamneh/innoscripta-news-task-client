import { PropsWithChildren, useState } from 'react';
import Topbar from '@/components/Layouts/Topbar';
import Sidebar from '@/components/Layouts/Sidebar';

type Props = {
  hideSidebar?: boolean;
};

const AppLayout = ({ children, hideSidebar }: PropsWithChildren<Props>) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <div>
      <Topbar onMenuClick={toggleMenu} hideSidebar={hideSidebar} />
      <div className="flex">
        {!hideSidebar && <Sidebar expanded={isMenuVisible} />}
        <main className="flex-1 p-4 pt-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;

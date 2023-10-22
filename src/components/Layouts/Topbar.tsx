import { IconMenu2 } from '@tabler/icons-react';
import { useAuth } from '@/hooks/auth';
import ThemeToggle from '@/components/ThemeToggle';
import TopbarUserLogin from '@/components/Layouts/TopbarUserLogin';
import TopbarUserInfo from '@/components/Layouts/TopbarUserInfo';
import ApplicationLogo from '@/components/ApplicationLogo';

type Props = { onMenuClick: () => void; hideSidebar?: boolean };

export default function Topbar({ onMenuClick, hideSidebar }: Props) {
  const { user, isLoading } = useAuth();

  return (
    <header className="h-[60px] top-0 sticky z-20 bg-white bg-opacity-50 dark:bg-slate-900 dark:bg-opacity-70 flex items-center gap-6 px-6 py-2 w-full shadow shadow-slate-500/25 dark:shadow-slate-800 backdrop-blur">
      {!hideSidebar && (
        <button className="lg:hidden" type="button" onClick={onMenuClick}>
          <IconMenu2 size={24} />
        </button>
      )}
      <ApplicationLogo />
      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        {!isLoading && <>{user ? <TopbarUserInfo /> : <TopbarUserLogin />}</>}
      </div>
    </header>
  );
}

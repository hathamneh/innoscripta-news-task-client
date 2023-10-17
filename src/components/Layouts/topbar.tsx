import { IconMenu2 } from '@tabler/icons-react';
import { useAuth } from '@/hooks/auth';
import ThemeToggle from '@/components/theme-toggle';
import TopbarUserLogin from '@/components/Layouts/topbar-user-login';
import TopbarUserInfo from '@/components/Layouts/topbar-user-info';
import ApplicationLogo from '@/components/ApplicationLogo';

type Props = { onMenuClick: () => void };

export default function Topbar({ onMenuClick }: Props) {
  const { user } = useAuth();

  return (
    <header className="h-[60px] top-0 sticky z-20 bg-slate-100 dark:bg-slate-800 flex items-center gap-6 px-6 py-2 w-full border-b border-slate-200 dark:border-slate-700 shadow shadow-slate-200 dark:shadow-slate-800">
      <button className="lg:hidden" type="button" onClick={onMenuClick}>
        <IconMenu2 size={24} />
      </button>
      <ApplicationLogo />
      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        {user ? <TopbarUserInfo /> : <TopbarUserLogin />}
      </div>
    </header>
  );
}

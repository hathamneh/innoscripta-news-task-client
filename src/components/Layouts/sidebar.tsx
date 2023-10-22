import cx from 'classnames';
import { IconFlame, IconHome } from '@tabler/icons-react';
import SidebarLink from './sidebar-link';
import { TopSourcesList } from '@/components/TopSourcesList';
import { TopCategoriesList } from '@/components/TopCategoriesList';

export default function Sidebar({ expanded }: { expanded: boolean }) {
  return (
    <aside className="w-0 lg:w-auto">
      <div
        className={cx(
          'bg-slate-100 dark:bg-slate-800 h-full w-[300px] p-6 -translate-x-full lg:translate-x-0 transition-transform lg:shadow-none',
          expanded
            ? 'translate-x-0 shadow shadow-slate-400'
            : '-translate-x-full',
        )}>
        <div className="sticky top-[84px] z-10 flex flex-col gap-8">
          <div>
            <h3 className="uppercase text-sm font-bold text-slate-400 dark:text-slate-500 px-4">
              Feed
            </h3>
            <ul className="mt-4 flex flex-col gap-1">
              <li>
                <SidebarLink href="/">
                  <IconHome className="h-5" />
                  My feed
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href="/latest">
                  <IconFlame className="h-5" />
                  Latest
                </SidebarLink>
              </li>
            </ul>
          </div>

          <TopCategoriesList />
          <TopSourcesList />
        </div>
      </div>
    </aside>
  );
}

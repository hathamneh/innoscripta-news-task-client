import ActiveLink from '@/ui/ActiveLink';

type Props = { href: string; children: React.ReactNode };

export default function SidebarLink({ href, children }: Props) {
  return (
    <ActiveLink
      href={href}
      className="rounded px-4 py-3 text-sm hover:bg-gray-200 hover:dark:bg-gray-900 flex gap-3 transition-colors"
      activeClassName="bg-primary-gradient font-bold text-white">
      {children}
    </ActiveLink>
  );
}

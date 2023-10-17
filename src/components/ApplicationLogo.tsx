import Link from 'next/link';

const ApplicationLogo = () => (
  <Link
    href="/"
    className="text-xs font-bold uppercase tracking-widest px-2 py-1 text-gray-500 dark:text-gray-300 border-2 border-gray-400 hover:bg-primary-gradient hover:text-white">
    News Feed
  </Link>
);

export default ApplicationLogo;

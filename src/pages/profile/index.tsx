import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import { Tabs } from 'antd';
import { useScreenLg } from '@/hooks/media-query';
import { MyFeedSettings } from '@/components/UserSettings/MyFeedSettings';
import { useAuth } from '@/hooks/auth';
import { ProfileSettings } from '@/components/UserSettings/ProfileSettings';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth({
    middleware: 'auth',
  });
  const [tab, setTab] = useState('profile');

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.push('/latest');
  }, [user, isLoading]);

  useEffect(() => {
    if (router.query.tab) {
      setTab(router.query.tab as string);
    }
  }, [router.query.tab]);

  const matches = useScreenLg();

  if (!user) return null;

  return (
    <AppLayout hideSidebar>
      <Head>
        <title>Settings</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight mb-8">
            Settings
          </h2>

          <Tabs
            activeKey={tab}
            onChange={key => router.push(`/profile?tab=${key}`)}
            tabPosition={matches ? 'left' : 'top'}
            items={[
              {
                key: 'profile',
                label: 'Profile',
                children: <ProfileSettings />,
              },
              { key: 'feed', label: 'My Feed', children: <MyFeedSettings /> },
            ]}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

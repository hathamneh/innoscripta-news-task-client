import React from 'react';
import { useAuth } from '@/hooks/auth';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { IconAdjustmentsFilled } from '@tabler/icons-react';
import { UserFeedArticles } from '@/components/MyFeed/UserFeedArticles';

export const MyFeed = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="max-w-[700px] w-full flex flex-col gap-8 relative">
      {user?.settings ? (
        <UserFeedArticles />
      ) : (
        <div className="flex flex-col gap-8 items-center mt-10">
          <img src="/bench.svg" alt="No feed" className="w-2/3 mx-auto" />
          <p className="text-center text-lg text-slate-600 dark:text-slate-400">
            You haven't customized your feed yet.
          </p>
          <div className="flex gap-4 items-center justify-center my-4">
            <Button
              type="primary"
              icon={<IconAdjustmentsFilled className="w-5" />}
              onClick={() => router.push('/profile?tab=feed')}
              size="large">
              Customize your feed
            </Button>
            <Button onClick={() => router.push('/latest')} size="large">
              See latest articles
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useArticles } from '@/hooks/articles';
import { ArticlesList } from '@/components/NewsList/ArticlesList';
import { IconAdjustmentsFilled } from '@tabler/icons-react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

export const UserFeedArticles = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { articles, reload, loadMore, hasMore, isLoading } = useArticles({
    filters: {
      category: user?.settings?.categories,
      source: user?.settings?.sources,
      country: user?.settings?.countries,
      language: user?.settings?.languages,
    },
    fetchOnMount: false,
  });

  useEffect(() => {
    if (!user?.settings) return;
    reload();
  }, [user?.settings]);

  return (
    <>
      <div className="flex justify-between mt-4 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold">Your feed</h2>
        <Button
          type="primary"
          icon={<IconAdjustmentsFilled className="w-5" />}
          onClick={() => router.push('/profile?tab=feed')}>
          Customize your feed
        </Button>
      </div>
      <ArticlesList
        articles={articles}
        onLoadMore={hasMore ? loadMore : undefined}
        loading={isLoading}
      />
    </>
  );
};

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useArticles } from '@/hooks/articles';
import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import { ArticlesList } from '@/components/NewsList/ArticlesList';
import { useSource } from '@/hooks/sources';

const Source = () => {
  const { query } = useRouter();
  const sourceId = query.source as string;
  const { source } = useSource(sourceId);
  const { articles, error, isLoading, loadMore, hasMore, reload } = useArticles(
    {
      filters: { source: [sourceId] },
      fetchOnMount: false,
    },
  );

  useEffect(() => {
    if (!sourceId) return;
    reload();
  }, [sourceId]);

  if (!sourceId) return null;

  return (
    <AppLayout>
      <Head>
        <title>{source?.name ?? 'Source'}</title>
      </Head>

      <div className="flex flex-col gap-4 items-center">
        <div className="max-w-[700px] w-full">
          <h1 className="text-3xl font-bold block mt-4 mb-10">
            "{source?.name}" articles
          </h1>
          {error && <div>Error loading articles</div>}
          {articles && (
            <div className="flex flex-col gap-6 mb-24">
              <ArticlesList
                articles={articles}
                onLoadMore={hasMore ? loadMore : undefined}
                loading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Source;

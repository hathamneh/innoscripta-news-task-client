import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useArticles } from '@/hooks/articles';
import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import { ArticlesList } from '@/components/NewsList/ArticlesList';
import { capitalize } from '@/utils/strings';

const Category = () => {
  const { query } = useRouter();
  const category = query.category as string;

  const { articles, error, isLoading, loadMore, hasMore, reload } = useArticles(
    {
      filters: { category: [category] },
      fetchOnMount: false,
    },
  );

  useEffect(() => {
    if (!category) return;
    reload();
  }, [category]);

  if (!category) return null;

  return (
    <AppLayout>
      <Head>
        <title>{capitalize(category)}</title>
      </Head>

      <div className="flex flex-col gap-4 items-center">
        <div className="max-w-[700px] w-full">
          <h1 className="text-3xl font-bold block mt-4 mb-10">
            "{capitalize(category)}" articles
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

export default Category;

import React, { useEffect, useRef } from 'react';
import { ArticleCard } from '@/components/NewsList/ArticleCard';
import { Article } from '@/hooks/articles';
import { NoResults } from '@/components/NoResults';
import { Button, Spin } from 'antd';

type Props = {
  articles: Article[];
  onLoadMore?: () => void;
  loading?: boolean;
};

export const ArticlesList = ({ articles, onLoadMore, loading }: Props) => {
  const loadMoreWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadMoreWrapperRef.current) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          onLoadMore?.();
        }
      });

      observer.observe(loadMoreWrapperRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [onLoadMore]);

  return (
    <>
      {articles.length > 0 && (
        <div className="flex flex-col gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
          {!loading && (
            <>
              {onLoadMore ? (
                <div
                  ref={loadMoreWrapperRef}
                  className="flex justify-center p-8">
                  <Button type="link" onClick={onLoadMore}>
                    Load more
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center p-8">
                  <p>No more articles</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {!loading && articles.length === 0 && <NoResults />}
      {loading && (
        <div className="flex justify-center py-16">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

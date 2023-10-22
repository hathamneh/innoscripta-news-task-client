import React from 'react';
import { Article } from '@/hooks/articles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { Card } from 'antd';
import { capitalize } from '@/utils/strings';

dayjs.extend(relativeTime);

type Props = {
  article: Article;
};

export const ArticleCard = ({ article }: Props) => {
  return (
    <Card>
      <div className="flex gap-2 mb-3">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
          {capitalize(article.source)}
        </span>
        <span className="text-sm text-slate-300 dark:text-slate-500">•</span>
        <span
          className="text-sm text-slate-600 dark:text-slate-400"
          title={dayjs(article.publishedAt).format('YYYY-MM-DD HH:mm:ss')}>
          {dayjs(article.publishedAt).fromNow()}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="text-sm">{article.description}</p>
      <a
        className="link inline-block mt-2"
        href={article.url}
        target="_blank"
        rel="noreferrer">
        Read more
      </a>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="mt-4 rounded-md w-full h-80 object-cover"
        />
      )}
      {article.categories.length > 0 && (
        <div className="flex gap-2 mt-4">
          {article.categories.map(category => (
            <Link
              href={`/category/${category.id}`}
              key={category.id}
              className="text-xs py-1 px-2 rounded-md bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
};

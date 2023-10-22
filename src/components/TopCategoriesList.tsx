import React from 'react';
import axios from '@/lib/axios';
import SidebarLink from '@/components/Layouts/sidebar-link';
import useSWR from 'swr';
import { capitalize } from '@/utils/strings';

export const TopCategoriesList = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR('/api/top-categories', () =>
    axios
      .get('/api/categories', { params: { top: true, pageSize: 5 } })
      .then(res => res.data),
  );

  return (
    <div>
      <h3 className="uppercase text-sm font-bold text-slate-400 dark:text-slate-500 px-4">
        Top Categories
      </h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {error ? (
            <div>Error loading categories</div>
          ) : (
            <ul className="mt-4 flex flex-col gap-1">
              {categories.data?.map((category: any) => (
                <li key={category.name}>
                  <SidebarLink href={`/category/${category.name}`}>
                    {capitalize(category.name)}
                  </SidebarLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

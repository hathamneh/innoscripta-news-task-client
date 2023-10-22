import React from 'react';
import axios from '@/lib/axios';
import SidebarLink from '@/components/Layouts/sidebar-link';
import useSWR from 'swr';

export const TopSourcesList = () => {
  const {
    data: sources,
    error,
    isLoading,
  } = useSWR('/api/top-sources', () =>
    axios
      .get('/api/sources', { params: { top: true, pageSize: 5 } })
      .then(res => res.data),
  );

  return (
    <div>
      <h3 className="uppercase text-sm font-bold text-slate-400 dark:text-slate-500 px-4">
        Top Sources
      </h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {error ? (
            <div>Error loading sources</div>
          ) : (
            <ul className="mt-4 flex flex-col gap-1">
              {sources.data?.map((source: any) => (
                <li key={source.id}>
                  <SidebarLink href={`/source/${source.id}`}>
                    {source.name}
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

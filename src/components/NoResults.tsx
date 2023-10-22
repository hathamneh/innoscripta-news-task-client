import React from 'react';

export const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <img src="/bench.svg" alt="No feed" className="w-2/3 mx-auto" />
      <p className="text-center text-lg text-slate-600 dark:text-slate-400">
        No articles found
      </p>
    </div>
  );
};

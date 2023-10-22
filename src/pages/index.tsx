import Head from 'next/head';
import AppLayout from '@/components/Layouts/AppLayout';
import { useAuth } from '@/hooks/auth';
import { MyFeed } from '@/components/MyFeed';
import { Button, Spin } from 'antd';
import { useRouter } from 'next/router';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  return (
    <AppLayout>
      <Head>
        <title>My Feed</title>
      </Head>

      <div className="flex justify-center">
        {isLoading ? (
          <div className="my-12">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {user ? (
              <MyFeed />
            ) : (
              <div className="max-w-[700px] w-full flex flex-col gap-8 relative mt-16">
                <img src="/bench.svg" alt="No feed" className="w-2/3 mx-auto" />
                <p className="text-center text-lg text-slate-600 dark:text-slate-400">
                  Login to customize your feed and get the latest articles from
                  your favorite sources and categories.
                </p>
                <div className="flex gap-4 items-center text-slate-400 dark:text-slate-500 before:content-[''] before:flex-1 before:border-b before:border-slate-200 before:dark:border-slate-700 after:content-[''] after:flex-1 after:border-b after:border-slate-200 after:dark:border-slate-700">
                  OR
                </div>
                <p className="flex flex-col items-center justify-center gap-3 text-lg text-slate-600 dark:text-slate-400">
                  <span>
                    Check out the latest articles from all over the web.
                  </span>
                  <Button onClick={() => router.push('/latest')} size="large">
                    See latest articles
                  </Button>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}

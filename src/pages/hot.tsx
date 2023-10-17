import Head from 'next/head';
import AppLayout from '@/components/Layouts/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <Head>
        <title>Laravel</title>
      </Head>

      <div className="flex flex-col gap-4 items-center">
        <div className="max-w-[700px]">
          <div className="card p-4">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, voluptatum.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

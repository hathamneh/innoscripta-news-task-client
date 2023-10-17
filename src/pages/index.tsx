import Head from 'next/head';
import AppLayout from '@/components/Layouts/AppLayout';
import SearchBar from '@/components/search-bar';

export default function Home() {
  return (
    <AppLayout>
      <Head>
        <title>My Feed</title>
      </Head>

      <div className="flex justify-center">
        <div className="max-w-[700px] flex flex-col gap-8 relative">
          <div className="">
            <SearchBar />
          </div>

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

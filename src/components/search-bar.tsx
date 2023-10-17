import React from 'react';
import Input from '@/components/Input';
import { IconSearch } from '@tabler/icons-react';

export default function SearchBar() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2">
        <IconSearch size={16} />
      </button>
    </div>
  );
}

import React from 'react';
import Input from '@/ui/Input';
import { IconSearch } from '@tabler/icons-react';

type Props = {
  value?: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
};

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <form
      className="relative w-full"
      onSubmit={e => {
        e.preventDefault();
        onSearch?.();
      }}>
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
        onClick={onSearch}>
        <IconSearch size={16} />
      </button>
    </form>
  );
}

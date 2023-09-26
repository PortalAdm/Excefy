import { HTMLAttributes } from 'react';
import { searchInputTv } from '../SearchTV';

interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {}

export function SearchInput({ placeholder, ...props }: SearchInputProps) {
  return (
    <input
      className={searchInputTv()}
      type="search"
      placeholder={placeholder ?? 'Pesquisar...'}
      {...props}
    />
  );
}

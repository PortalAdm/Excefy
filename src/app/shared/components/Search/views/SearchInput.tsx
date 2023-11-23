import { InputHTMLAttributes } from 'react';
import { searchInputTv } from '../SearchTV';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ placeholder, ...props }: SearchInputProps) {
  return (
    <input
      className={searchInputTv()}
      type="text"
      placeholder={placeholder ?? 'Pesquisar...'}
      {...props}
    />
  );
}

'use client';

import { IoSearchOutline } from 'react-icons/io5';
import { Icon } from '~/src/app/shared/components/Icon';
import { Search } from '~/src/app/shared/components/Search';
import { useDashboardController } from '../controller';

interface ProcessListSearchProps {
  onSearch: (search: string) => void;
}

export function ProcessListSearch({ onSearch }: ProcessListSearchProps) {
  const { value, setValue } = useDashboardController();

  return (
    <Search.root>
      <Icon className="pointer-events-none" icon={IoSearchOutline} color="outline" input="left" />
      <Search.input
        value={value}
        placeholder="Pesquise pelo nome do processo"
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </Search.root>
  );
}

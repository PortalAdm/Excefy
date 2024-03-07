import { ElementType } from 'react';
import { SearchMenuTv } from '~/src/app/features/menuSidebar/MenuSidebarTv';
import { Icon } from '~/src/app/shared/components/Icon';
import { Search } from '~/src/app/shared/components/Search';

interface SearchMenuProps {
  isClose: boolean;
  icon: ElementType;
  onClick: () => void;
}

export function SearchMenu({ isClose, icon, onClick }: SearchMenuProps) {
  return (
    <div className={SearchMenuTv()}>
      <Search.root>
        {isClose ? <Search.input /> : <Icon onClick={onClick} icon={icon} color="white" />}
      </Search.root>
    </div>
  );
}

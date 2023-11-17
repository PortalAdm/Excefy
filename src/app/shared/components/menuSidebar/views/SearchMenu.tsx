import { ElementType } from 'react';
import { Icon } from '../../Icon';
import { Search } from '../../Search';

interface SearchMenuProps {
  isClose: boolean;
  icon: ElementType;
  onClick: () => void;
}

export function SearchMenu({ isClose, icon, onClick }: SearchMenuProps) {
  return (
    <div className="w-full h-16 relative border-t-2 border-b-2 border-white flex items-center justify-center">
      <Search.root>
        {isClose ? <Search.input /> : <Icon onClick={onClick} icon={icon} color="white" />}
      </Search.root>
    </div>
  );
}

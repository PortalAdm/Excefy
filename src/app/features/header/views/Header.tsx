import { DropdownComp } from '~/src/app/shared/components/Dropdown';
import { Header as HeaderComponent } from '~/src/app/shared/components/header';
import { HeaderActionProps } from '~/src/app/shared/components/header/views/HeaderAction';
import { dropdownOptions } from '../HeaderUtils';

interface HeaderProps {
  actions?: HeaderActionProps[];
}

export function Header({ actions }: HeaderProps) {
  return (
    <HeaderComponent.root>
      <HeaderComponent.title />
      <HeaderComponent.content>
        {actions &&
          actions?.map((action, i) => (
            <HeaderComponent.action
              key={i}
              size={action.size}
              variant={action.variant}
              color={action.color}
              actionLabel={action.actionLabel}
              icon={action.icon}
              onClick={action.onClick}
              path={action.path}
            />
          ))}
        <HeaderComponent.label />
        <DropdownComp.Dropdown options={dropdownOptions} />
      </HeaderComponent.content>
    </HeaderComponent.root>
  );
}

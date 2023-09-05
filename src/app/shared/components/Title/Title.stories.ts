import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '.';

const meta: Meta<typeof Title> = {
  title: 'Utils/Texts/Title',
  component: Title,
  argTypes: {
    title: { type: 'string' }
  }
};

export default meta;
type Story = StoryObj<typeof Title>;

export const title: Story = {
  args: {
    title: 'Title component',
    size: 'lg'
  }
};

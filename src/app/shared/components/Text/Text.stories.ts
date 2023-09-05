import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '.';

const meta: Meta<typeof Text> = {
  title: 'Utils/Texts/Text',
  component: Text,
  argTypes: {
    text: { type: 'string' }
  }
};

export default meta;
type Story = StoryObj<typeof Text>;

export const text: Story = {
  args: {
    text: 'Text component',
    size: 'lg',
    weigth: 'normal'
  }
};

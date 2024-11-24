import type { Meta, StoryObj } from 'client/node_modules/@storybook/vue3/dist';
import Button from './CustomButton.vue';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    onClick: { action: 'clicked' }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    default: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    default: 'Secondary Button'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
    disabled: false,
    default: 'Danger Button'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    default: 'Small Button'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    default: 'Large Button'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled Button'
  }
};
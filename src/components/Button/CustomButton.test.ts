import { describe, test, expect } from 'client/node_modules/vitest/dist';
import { mount } from 'client/node_modules/@vue/test-utils/dist';
import CustomButton from './CustomButton.vue'

describe('Button', () => {
  test('renders with default props', () => {
    const wrapper = mount(CustomButton, {
      slots: {
        default: 'Click me'
      }
    });
    
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.classes()).toContain('bg-blue-500'); // primary variant
  });

  test('emits click event when clicked', async () => {
    const wrapper = mount(CustomButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  test('applies correct variant classes', () => {
    const wrapper = mount(CustomButton, {
      props: {
        variant: 'danger'
      }
    });
    
    expect(wrapper.classes()).toContain('bg-red-500');
  });

  test('applies disabled state', () => {
    const wrapper = mount(CustomButton, {
      props: {
        disabled: true
      }
    });
    
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('opacity-50');
  });
});
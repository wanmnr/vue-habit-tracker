import type { Meta, StoryObj } from 'client/node_modules/@storybook/vue3/dist';
import { ref } from 'client/node_modules/vue/dist/vue.mjs';
import CustomModal from './CustomModal.vue';
import { Button } from 'client/node_modules/ant-design-vue/es';

const meta = {
  title: 'Components/Modal',
  component: CustomModal,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl']
    },
    visible: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    showFooter: {
      control: 'boolean'
    },
    showHeaderActions: {
      control: 'boolean'
    },
    maskClosable: {
      control: 'boolean'
    },
    fullscreenable: {
      control: 'boolean'
    },
    title: {
      control: 'text'
    },
    okText: {
      control: 'text'
    },
    cancelText: {
      control: 'text'
    }
  }
} satisfies Meta<typeof CustomModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Add a type for the component props
type CustomModalProps = InstanceType<typeof CustomModal>['$props'];

// Basic Modal
export const Basic: Story = {
  render: (args: CustomModalProps) => ({
    components: { CustomModal, Button },
    setup() {
      const visible = ref(false);
      return {
        args,
        visible,
        showModal: () => (visible.value = true),
        handleOk: () => {
          console.log('OK clicked');
          visible.value = false;
        },
        handleCancel: () => {
          console.log('Cancel clicked');
          visible.value = false;
        }
      };
    },
    template: `
      <div>
        <Button @click="showModal">Open Modal</Button>
        <CustomModal
          v-bind="args"
          v-model:visible="visible"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </CustomModal>
      </div>
    `
  }),
  args: {
    title: 'Basic Modal',
    variant: 'primary',
    size: 'md'
  }
};

// Form Modal
export const FormModal: Story = {
  render: (args: CustomModalProps) => ({
    components: { CustomModal, Button },
    setup() {
      const visible = ref(false);
      const form = ref({
        name: '',
        email: '',
        message: ''
      });
      
      return {
        args,
        visible,
        form,
        showModal: () => (visible.value = true),
        handleOk: () => {
          console.log('Form submitted:', form.value);
          visible.value = false;
        }
      };
    },
    template: `
      <div>
        <Button @click="showModal">Open Form Modal</Button>
        <CustomModal
          v-bind="args"
          v-model:visible="visible"
          @ok="handleOk"
        >
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                v-model="form.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                v-model="form.message"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </CustomModal>
      </div>
    `
  }),
  args: {
    title: 'Contact Form',
    variant: 'primary',
    size: 'md',
    okText: 'Submit',
    loading: false
  }
};

// Confirmation Modal
export const ConfirmationModal: Story = {
  render: (args: CustomModalProps) => ({
    components: { CustomModal, Button },
    setup() {
      const visible = ref(false);
      return {
        args,
        visible,
        showModal: () => (visible.value = true),
        handleOk: () => {
          console.log('Confirmed');
          visible.value = false;
        }
      };
    },
    template: `
      <div>
        <Button danger @click="showModal">Delete Item</Button>
        <CustomModal
          v-bind="args"
          v-model:visible="visible"
          @ok="handleOk"
        >
          <div class="text-center">
            <p class="text-gray-600">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
        </CustomModal>
      </div>
    `
  }),
  args: {
    title: 'Confirm Deletion',
    variant: 'error',
    size: 'sm',
    okText: 'Delete',
    cancelText: 'Keep',
    maskClosable: false
  }
};

// Custom Header Actions Modal
export const CustomHeaderActions: Story = {
  render: (args: CustomModalProps) => ({
    components: { CustomModal, Button },
    setup() {
      const visible = ref(false);
      return {
        args,
        visible,
        showModal: () => (visible.value = true)
      };
    },
    template: `
      <div>
        <Button @click="showModal">Open Modal with Custom Header</Button>
        <CustomModal
          v-bind="args"
          v-model:visible="visible"
        >
          <template #header-actions>
            <Button type="text" size="small">
              <template #icon><SearchOutlined /></template>
            </Button>
            <Button type="text" size="small">
              <template #icon><SettingOutlined /></template>
            </Button>
          </template>
          <div class="space-y-4">
            <p>Content with custom header actions...</p>
          </div>
        </CustomModal>
      </div>
    `
  }),
  args: {
    title: 'Custom Header Actions',
    variant: 'primary',
    size: 'lg',
    showHeaderActions: true
  }
};
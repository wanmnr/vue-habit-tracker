<!-- src/App.vue -->

<template>
  <a-button type="primary">Hello Ant Design Vue</a-button>
  <a-date-picker />
  <div class="form-container">
    <a-form
      :model="formState"
      name="basicForm"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <!-- Text Input -->
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <!-- Password Input -->
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <!-- Select -->
      <a-form-item label="Country" name="country">
        <a-select v-model:value="formState.country">
          <a-select-option value="usa">USA</a-select-option>
          <a-select-option value="uk">UK</a-select-option>
          <a-select-option value="canada">Canada</a-select-option>
        </a-select>
      </a-form-item>

      <!-- DatePicker -->
      <a-form-item label="Birth Date" name="birthDate">
        <a-date-picker
          v-model:value="formState.birthDate"
          :format="dateFormat"
          placeholder="Select birth date"
        />
      </a-form-item>

      <!-- Radio Group -->
      <a-form-item label="Gender" name="gender">
        <a-radio-group v-model:value="formState.gender">
          <a-radio value="male">Male</a-radio>
          <a-radio value="female">Female</a-radio>
          <a-radio value="other">Other</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- Checkbox -->
      <a-form-item name="subscribe" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.subscribe">
          Subscribe to newsletter
        </a-checkbox>
      </a-form-item>

      <!-- TextArea -->
      <a-form-item label="Bio" name="bio">
        <a-textarea
          v-model:value="formState.bio"
          :rows="4"
          placeholder="Tell us about yourself"
        />
      </a-form-item>

      <!-- Switch -->
      <a-form-item label="Notifications" name="notifications">
        <a-switch v-model:checked="formState.notifications" />
      </a-form-item>

      <!-- Rate -->
      <a-form-item label="Rate Us" name="rating">
        <a-rate v-model:value="formState.rating" />
      </a-form-item>

      <!-- Submit Button -->
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Dayjs } from 'dayjs';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Radio,
  Checkbox,
  Switch,
  Rate,
} from 'ant-design-vue';

// Register all needed components
const AForm = Form;
const AFormItem = Form.Item;
const AInput = Input;
const AInputPassword = Input.Password;
const ASelect = Select;
const ASelectOption = Select.Option;
const ADatePicker = DatePicker;
const ARadio = Radio;
const ARadioGroup = Radio.Group;
const ACheckbox = Checkbox;
const ASwitch = Switch;
const ARate = Rate;
const ATextarea = Input.TextArea;

// Define the interface for form state
interface FormState {
  username: string;
  password: string;
  country: string | undefined;
  birthDate: Dayjs | undefined;
  gender: 'male' | 'female' | 'other' | undefined;
  subscribe: boolean;
  bio: string;
  notifications: boolean;
  rating: number;
}

// Form state
const formState = ref<FormState>({
  username: '',
  password: '',
  country: undefined,
  birthDate: undefined,
  gender: undefined,
  subscribe: false,
  bio: '',
  notifications: false,
  rating: 0,
});

// Form submission handler
const onFinish = (values: FormState) => {
  console.log('Success:', values);
};

// Date format string
const dateFormat = 'YYYY-MM-DD';

// Optional: If you need to initialize with a default date
// formState.value.birthDate = dayjs(); // Sets to current date

</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}
</style>

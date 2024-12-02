// types/forms.ts
export interface FormState {
  email: string;
  password: string;
}

export interface UserPreferencesFormState {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
}

export interface ProfileFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: File | null;
}

export interface PasswordChangeFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// For form validation rules
export interface FormRule {
  required?: boolean;
  message?: string;
  trigger?: 'blur' | 'change' | Array<'blur' | 'change'>;
  min?: number;
  max?: number;
  type?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';
  pattern?: RegExp;
  validator?: (rule: FormRule, value: any) => Promise<void> | void;
}

// Generic form state type for dynamic forms
export interface DynamicFormState {
  [key: string]: any;
}
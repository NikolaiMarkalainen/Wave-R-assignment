<script setup lang="ts">
import { NButton, NInput, NTabs, NTabPane, NForm, NFormItem, NFlex, useMessage } from 'naive-ui';
import { createUserService, loginUserService } from '@/services/authServices';
import { ref } from 'vue';
import type { FormRules } from 'naive-ui';
import { handleApiResult } from '@/helpers/messageHelpers';
import { loginRules } from '@/helpers/forms';
import type { MessageResult } from '@/types/types';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const { loginSuccess } = useAuth();
const router = useRouter();
const loginModel = ref({
  username: '',
  password: '',
});

const registerModel = ref({
  username: '',
  password: '',
  passwordConfirm: '',
});

const loginFormRef = ref();
const registerFormRef = ref();
const viewTab = ref<'signin' | 'signup'>('signin');
const message = useMessage();
const handleLogin = async () => {
  const { username, password } = loginModel.value;
  const result = await handleApiResult(() => loginUserService({ username, password }));
  writeMessage(result);
  if (result.success) {
    loginSuccess();
    router.push('/');
  }
};

const handleRegister = async () => {
  const { username, password } = registerModel.value;
  const result = await handleApiResult(() => createUserService({ username, password }));
  writeMessage(result);
  if (result.success) {
    viewTab.value = 'signin';
  }
};

const writeMessage = (result: MessageResult) => {
  console.log(result);
  if (result.success) {
    message.success(result.message);
    return;
  }
  message.error(result.message);
  return;
};

const registerRules: FormRules = {
  username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
  passwordConfirm: [
    {
      required: true,
      message: 'Please confirm your password',
      trigger: 'blur',
    },
    {
      validator: (_, value) => {
        if (value !== registerModel.value.password) {
          return new Error('Passwords do not match');
        }
        return true;
      },
      trigger: 'blur',
    },
  ],
};
</script>

<template>
  <n-flex justify="center" size="small" class="flex-container">
    <n-tabs
      class="login-parent"
      animated
      size="large"
      default-value="signup"
      v-model:value="viewTab"
    >
      <n-tab-pane name="signin" tab="Sign in">
        <n-form
          ref="loginFormRef"
          style="margin-top: 2rem"
          @submit.prevent="handleLogin"
          :model="loginModel"
          :rules="loginRules"
        >
          <n-form-item label="Username" path="username" show-require-mark>
            <n-input v-model:value="loginModel.username" placeholder="Enter username here" round />
          </n-form-item>

          <n-form-item label="Password" path="password" show-require-mark>
            <n-input
              v-model:value="loginModel.password"
              placeholder="Enter password here"
              round
              type="password"
              show-password-on="mousedown"
            />
          </n-form-item>

          <n-button block type="primary" strong style="margin-top: auto" attr-type="submit">
            Sign in
          </n-button>
        </n-form>
      </n-tab-pane>

      <n-tab-pane name="signup" tab="Sign up">
        <n-form
          ref="registerFormRef"
          :rules="registerRules"
          style="margin-top: 2rem"
          @submit.prevent="handleRegister"
          :model="registerModel"
        >
          <n-form-item label="Username" path="username" show-require-mark>
            <n-input
              v-model:value="registerModel.username"
              placeholder="Enter username here"
              round
            />
          </n-form-item>

          <n-form-item label="Password" path="password" show-require-mark>
            <n-input
              v-model:value="registerModel.password"
              placeholder="Enter password here"
              round
              type="password"
              show-password-on="mousedown"
            />
          </n-form-item>

          <n-form-item label="Re-enter Password" path="passwordConfirm" show-require-mark>
            <n-input
              v-model:value="registerModel.passwordConfirm"
              placeholder="Re-enter password here"
              round
              type="password"
              show-password-on="mousedown"
            />
          </n-form-item>

          <n-button block type="primary" strong style="margin-top: auto" attr-type="submit">
            Sign up
          </n-button>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </n-flex>
</template>

<style scoped>
.login-parent {
  background: linear-gradient(
    135deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(87, 199, 133, 1) 50%,
    rgba(237, 221, 83, 1) 100%
  );
  border-radius: 2rem;
  padding: 2rem;
}
.flex-container {
  margin: 4rem 25vw 0;
  min-height: 50vh;
}
</style>

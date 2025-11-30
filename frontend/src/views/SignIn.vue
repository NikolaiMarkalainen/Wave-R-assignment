<script setup lang="ts">
import { NButton, NInput, NTabs, NTabPane, NForm, NFormItem, NFlex } from 'naive-ui'
</script>

<template>
  <n-flex justify="center" size="small" class="flex-container">
    <n-tabs class="login-parent" animated size="large" default-value="signin">
      <n-tab-pane name="signin" tab="Sign in">
        <n-form ref="formRef" style="margin-top: 2rem">
          <n-form-item label="Username" path="user.name" show-require-mark>
            <n-input placeholder="Enter username here" round />
          </n-form-item>
          <n-form-item label="Password" path="user.password" show-require-mark>
            <n-input
              placeholder="Enter password here"
              round
              type="password"
              show-password-on="mousedown"
            />
          </n-form-item>
          <n-button block type="primary" secondray strong style="margin-top: auto"
            >Sign in</n-button
          >
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="Sign up">
        <n-form ref="formRef" style="margin-top: 2rem">
          <n-form-item label="Username" path="user.name" show-require-mark>
            <n-input placeholder="Enter username here" round />
          </n-form-item>
          <n-form-item label="Password" path="user.password" show-require-mark>
            <n-input
              placeholder="Enter password here"
              round
              type="password"
              show-password-on="mousedown"
            />
          </n-form-item>
          <n-form-item label="Re-enter Password" path="user.password" show-require-mark>
            <n-input
              placeholder="Enter password here"
              round
              type="password"
              show-password-on="mousedown"
            />
          </n-form-item>
          <n-button block type="primary" secondray strong style="margin-top: auto"
            >Sign up</n-button
          >
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

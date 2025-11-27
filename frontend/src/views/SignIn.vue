<script setup lang="ts">
import { NButton, NInput, NCard } from 'naive-ui'

</script>

<template>
  <div class="login-parent">
  <n-card class="login-form" footer-class="footer-c" title="Administrator View">
    <h2>Username</h2>
    <n-input placeholder="Enter username here" round />
    <h2>Password</h2>
    <n-input placeholder="Enter password here" round type="password" show-password-on="mousedown" />
    <p>Please login to your account if none available feel free to register from button below</p>

    <n-button type="primary">Login</n-button>
    <n-button secondary>Register</n-button>
    <template #footer> All passwords are hashed, not saved in plain text to database</template>
  </n-card>
  </div>
</template>

<style scoped>
.login-form {
  margin: 2.5rem;
  width: 50%;
  min-height: 75%;
  border-radius: 5%;
  padding: 2rem;
  overflow: scroll;
  color: black;
  background: linear-gradient(
    135deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(87, 199, 133, 1) 50%,
    rgba(237, 221, 83, 1) 100%
  );
  border: 0;
}
.login-parent {
  display: flex;
  justify-content: center;
  width: 100%;
}
.n-input {
  width: 48rem;
}
:deep(.footer-c) {
  font-size: 0.9rem;
  color: black;
  font-style: italic;
}
p {
  padding-bottom: 1.75rem;
}
button {
  margin-right: 1rem;
  padding: 0.75rem;
  border-radius: 5%;
}
@media (max-width: 720px) {
  .login-form {
    width: 95vw;
    padding: 1rem;
  }
}
</style>

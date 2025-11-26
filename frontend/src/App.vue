<script setup lang="ts"></script>

<template>
  <n-card class="login-form" footer-class="footer-c" title="Administrator View">
    <h2>Username</h2>
    <n-input placeholder="Enter username here" round />
    <h2>Password</h2>
    <n-input placeholder="Enter password here" round type="password" show-password-on="mousedown" />
    <p>Please login to your account if none available feel free to register from button below</p>

    <n-button type="primary">Login</n-button>
    <n-button secondary type="info">Register</n-button>
    <template #footer> All passwords are hashed, not saved in plain text to database</template>
  </n-card>
</template>

<style scoped>
.login-form {
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 50vw;
  min-height: 75vh;
  border-radius: 5%;
  padding: 2rem;
  overflow: scroll;
}

.n-input {
  width: 48rem;
}
:deep(.footer-c) {
  font-size: 0.9rem;
  color: #c0c0c0;
  font-style: italic;
}
h1 {
  font-family: var(--font-family);
  color: var(--text-color-1);
}

h2 {
  font-family: var(--font-family);
  color: var(--text-color-2);
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

import { ref, readonly } from 'vue';
import { verifyToken, logoutUser } from '@/services/authServices';

const isAuthenticated = ref(false);

const checkAuth = async () => {
  try {
    isAuthenticated.value = await verifyToken();
  } catch {
    isAuthenticated.value = false;
  }
};

const loginSuccess = () => {
  isAuthenticated.value = true;
};

const logout = async () => {
  await logoutUser();
  isAuthenticated.value = false;
};

export const useAuth = () => ({
  isAuthenticated: readonly(isAuthenticated),
  checkAuth,
  loginSuccess,
  logout,
});

import toast from 'react-hot-toast';

export const useToast = () => {
  const showToast = (message: string) => {
    toast(message);
  }

  const showError = (message: string) => {
    toast.error(message);
  }

  return { showToast, showError };
};
import React from "react";
import { Toaster, toast } from "react-hot-toast";

// Toast Notification Component
const ToastNotification = () => {
  return <Toaster position="top-center" />;
};

// Export toast functions
export const showSuccessToast = (message) => toast.success(message);
export const showErrorToast = (message) => toast.error(message);
export const showInfoToast = (message) => toast(message);

export default ToastNotification;

import React from "react";
import { Info } from 'lucide-react'; // Import the Lucide info icon

import { Toaster, toast } from "react-hot-toast";

// Toast Notification Component
const ToastNotification = () => {
  return <Toaster position="top-center" />;
};

// Export toast functions with immediate dismissal of previous toasts
export const showSuccessToast = (message) => {
  toast.dismiss(); // Dismiss the previous toast
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.dismiss(); // Dismiss the previous toast
  toast.error(message);
};


export const showInfoToast = (message) => {
  toast.dismiss(); // Dismiss the previous toast

  toast(
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Info size={20} style={{ marginRight: '10px', color: '#fff' }} /> {/* Info Icon */}
      <span>{message}</span>
    </div>,
    {
      duration: 4000, // Duration for the toast
      style: {
        background: '#007BFF', // Custom background color (blue for info)
        color: '#fff', // White text color
        fontSize: '16px', // Font size
        borderRadius: '8px', // Rounded corners
        padding: '12px 20px', // Padding around the text
      },
      position: 'top-center', // Position on the screen
      ariaProps: {
        role: 'status', // ARIA role for accessibility
        'aria-live': 'polite', // ARIA live region
      },
    }
  );
};



export const showWarningToast = (message) => {
  toast.dismiss(); // Dismiss the previous toast
  toast.warning(message);
};

export const showLoadingToast = (message) => {
  toast.dismiss(); // Dismiss the previous toast
  toast.loading(message);
};

export const showCustomToast = (message, icon) => {
  toast.dismiss(); // Dismiss the previous toast
  toast(message, {
    icon: icon, // Optional: customize the icon
    duration: 4000, // Set duration for custom toasts
    style: {
      background: "#333",
      color: "#fff",
      fontSize: "16px",
      borderRadius: "8px",
    },
  });
};

export default ToastNotification;

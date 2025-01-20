import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const notifySuccess = () => toast.success("Success! Account created successfully!");
  const notifyError = () => toast.error("Error! Something went wrong.");
  const notifyWarning = () => toast.warning("Warning! Please check your inputs.");
  const notifyInfo = () => toast("Info! Your profile is up to date.");

  return (
    <div className="App">
      <h1>Hello devs</h1>
      <button onClick={notifySuccess}>Success Toast</button>
      <button onClick={notifyError}>Error Toast</button>
      <button onClick={notifyWarning}>Warning Toast</button>
      <button onClick={notifyInfo}>Info Toast</button>

      <ToastContainer
        position="top-right"
        autoClose={3000} // Automatically close after 3 seconds
        hideProgressBar={false} // Show progress bar
        closeOnClick
        pauseOnHover
        draggable
        progressClassName="gradient-progress" // Custom gradient class for progress bar
      />
    </div>
  );
}

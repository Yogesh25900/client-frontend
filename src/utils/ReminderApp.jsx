import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReminderApp() {
  const [time, setTime] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");
  const [reminderSet, setReminderSet] = useState(false); // Track if a reminder is set
  const [existingReminderTime, setExistingReminderTime] = useState(null); // Store existing reminder time
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button disabled flag
  const [showModal, setShowModal] = useState(false); // Flag for showing the confirmation modal

  const handleSetReminder = () => {
    // Get the current time and the set reminder time
    const currentTime = new Date();
    const reminderTime = new Date(time);

    // Check if the time is in the future
    if (reminderTime <= currentTime) {
      alert("Please set a future time for the reminder.");
      return;
    }

    // Check if a reminder has already been set for the same time
    if (
      reminderSet &&
      existingReminderTime &&
      existingReminderTime.getTime() === reminderTime.getTime()
    ) {
      // Show the custom confirmation modal
      setShowModal(true);
    } else {
      // Proceed to set the reminder
      setReminder();
    }
  };

  const setReminder = () => {
    const currentTime = new Date();
    const reminderTime = new Date(time);
    const timeDifference = reminderTime - currentTime;

    setIsButtonDisabled(true);

    // Set a timeout to trigger the reminder
    setTimeout(() => {
      toast.success(reminderMessage || "It's time for your reminder!");

      if (Notification.permission === "granted") {
        new Notification("Reminder", {
          body: reminderMessage || "It's time for your reminder!",
        });
      }

      setReminderSet(true);
      setExistingReminderTime(reminderTime); // Store the reminder time
      setIsButtonDisabled(false); // Re-enable the button after the reminder is triggered
    }, timeDifference);
  };

  const handleModalConfirm = () => {
    // User confirmed, set the reminder with the new message
    setReminder();
    setShowModal(false); // Close the modal
  };

  const handleModalCancel = () => {
    // User canceled, just close the modal
    setShowModal(false);
  };

  const requestNotificationPermission = () => {
    // Request permission for browser notifications
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  return (
    <div className="App">
      <h1>Set Reminder</h1>
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter reminder message"
        value={reminderMessage}
        onChange={(e) => setReminderMessage(e.target.value)}
      />
      <button onClick={handleSetReminder} disabled={isButtonDisabled}>
        Set Reminder
      </button>
      <button onClick={requestNotificationPermission}>
        Enable Notifications
      </button>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* Custom Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>A reminder is already set for this time</h2>
            <p>Do you want to set the same message, or change it?</p>
            <button onClick={handleModalConfirm}>Yes, Change Message</button>
            <button onClick={handleModalCancel}>Cancel</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          width: 300px;
        }

        .modal button {
          margin: 10px;
          padding: 10px 20px;
          cursor: pointer;
        }

        .modal button:first-child {
          background-color: #4caf50;
          color: white;
        }

        .modal button:last-child {
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </div>
  );
}

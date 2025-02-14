import React, { useState, useEffect } from "react";
import { Search, Settings, Bell, Home, Edit, Trash } from "lucide-react";
import "./UserTables.css";
import { fetchAllUsers, updateUserDetails, deleteUser } from "../api/AuthService";
import { showSuccessToast, showErrorToast,showInfoToast } from "./ToastNotification"; // Import toast functions
import SearchBar from "./SearchBar";
import { getUserByName } from "../api/AuthService"; // Import the search function

function UserTables() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deletedUser, setDeletedUser] = useState(null); // Track deleted user
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    address: "",
    mobileNumber: "",
  });
  const [searchTerm, setSearchTerm] = useState("");  // State for search term
  const token = localStorage.getItem("token");

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);  // Reset to page 1 when searching
  };
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        if (searchTerm) {
          // Fetch users by search query
          const searchedUsers = await getUserByName(searchTerm);
          setUsers(searchedUsers.users);
          setTotalUsers(searchedUsers.totalUsers);
        } else {
          // Fetch all users if no search query
          const data = await fetchAllUsers(token, currentPage, usersPerPage);
          if (data && data.users) {
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
          } else {
            showInfoToast("No users found.");
          }
        }
      } catch (error) {
        showInfoToast("No users found.");

      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, [token, currentPage, deletedUser, searchTerm]); // Update based on search query

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setEditedUser({
      id: user.userID,
      name: user.name || "",
      email: user.email || "",
      address: user.address || "",
      mobileNumber: user.mobileNumber || "",
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(null);
    setEditedUser({
      name: "",
      email: "",
      address: "",
      mobileNumber: "",
    }); // Reset the editedUser state
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (!editedUser.name || !editedUser.email || !editedUser.address || !editedUser.mobileNumber) {
        showErrorToast("All fields are required"); // Show error toast
        return;
      }

      const response = await updateUserDetails(currentUser.userID, editedUser);

      if (response) {
        console.log("Server Response:", response);
        // Update the UI immediately
        setUsers(users.map((user) =>
          user.userID === currentUser.userID ? { ...user, ...editedUser } : user
        ));

        showSuccessToast("User updated successfully!"); // Show success toast
        closeEditModal(); // Close the modal after saving
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showErrorToast("Failed to update user. Please try again."); // Show error toast
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId);  // Call your API or delete function with the userId
      
      // Optionally, update the users state to remove the deleted user from the UI
      setUsers(users.filter(user => user.id !== userId));
      setDeletedUser(userId); 

      showSuccessToast("User deleted successfully!");  // Show success toast
    } catch (error) {
      console.error("Failed to delete user:", error);
      showErrorToast("Failed to delete user. Please try again.");  // Show error toast
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-tables">
      <div className="header-content">
        <div className="header-left">
          <Home className="icon" />
          <span className="separator">/</span>
          <span className="title">Users</span>
        </div>
      </div>
      <div className="table-container">
        <div className="table-bar">
          <h2 className="table-title">Users table</h2>
          <SearchBar onSearch={handleSearch} /> {/* Pass the search handler */}
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr className="table-header">
                <th className="header-cell">Users</th>
                <th className="header-cell">Account Created On</th>
                <th className="header-cell-actions">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="table-cell">
                    <div className="user-info">
                      <img
                        src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name.charAt(0)}&background=random&color=fff`}
                        alt="avatar"
                        className="avatar"
                      />
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="table-cell">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="table-cell-actions">
                    <button className="icon-button-edit" onClick={() => openEditModal(user)}>
                      <Edit className="lucide lucide-edit" />
                    </button>
                    <button className="icon-button-delete" onClick={() => handleDeleteUser(user.userID)}>
                      <Trash className="lucide lucide-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          {[...Array(totalPages)].map((_, index) => (
            <button key={index + 1} className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
          ))}
          <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
      {isEditModalOpen && currentUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User</h3>
            <form className="edit-form" onSubmit={handleSave}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={editedUser.address}
                  onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={editedUser.mobileNumber}
                  onChange={(e) => setEditedUser({ ...editedUser, mobileNumber: e.target.value })}
                />
              </div>
              <button type="submit" className="submit-button">Save</button>
            </form>
            <button className="close-button" onClick={closeEditModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTables;

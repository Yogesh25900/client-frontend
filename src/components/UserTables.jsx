import React, { useState, useEffect } from "react";
import { Search, Settings, Bell, Home } from "lucide-react";
import './UserTables.css';
import { Edit, Trash } from "lucide-react";
import { fetchAllUsers } from '../services/AuthService';

function UserTables() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For modal visibility
  const [currentUser, setCurrentUser] = useState(null); // Store current user data for editing

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await fetchAllUsers(token, currentPage, usersPerPage);
        if (data && data.users) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
        } else {
          setError('No users found');
        }
      } catch (error) {
        setError(`Error fetching users: ${error.response ? error.response.data : error.message}`);
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [token, currentPage]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openEditModal = (user) => {
    setCurrentUser(user); // Set the user to be edited
    setIsEditModalOpen(true); // Open the modal
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setCurrentUser(null); // Reset the current user
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-tables">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Home className="icon" />
            <span className="separator">/</span>
            <span className="title">Tables</span>
          </div>
          <div className="header-right">
            <div className="search-container">
              <Search className="icon search-icon" />
              <input type="text" placeholder="Type here..." className="search-input" />
            </div>
            <button className="icon-button">
              <Settings className="icon" />
            </button>
            <button className="icon-button">
              <Bell className="icon" />
            </button>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="table-container">
          <h2 className="table-title">Users table</h2>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr className="table-header">
                  <th className="header-cell">Users</th>
                  <th className="header-cell">STATUS</th>
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
                          src={user.profilePicture ? user.profilePicture : `https://ui-avatars.com/api/?name=${user.name.charAt(0)}&background=random&color=fff`}
                          alt="avatar"
                          className="avatar"
                        />
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span
                        className={`status ${user.status === "online" ? "online" : "offline"}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="table-cell-actions">
                      <button className="icon-button" onClick={() => openEditModal(user)}>
                        <Edit className="lucide lucide-edit" />
                      </button>
                      <button className="icon-button">
                        <Trash className="lucide lucide-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal Overlay */}
        {isEditModalOpen && currentUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit User</h3>
              <form className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" defaultValue={currentUser.name} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={currentUser.email} />
                </div>
                {/* Add other fields you want to edit */}
                <button type="submit" className="submit-button">Save</button>
              </form>
              <button className="close-button" onClick={closeEditModal}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserTables;

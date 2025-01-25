import React from "react";
import { Search, Settings, Bell, Home } from "lucide-react";
import './UserTables.css'
import { Edit, Trash } from "lucide-react"; // Importing icons from lucide-react

const users = [
  {
    id: 1,
    name: "Esthera Jackson",
    email: "esthera@simmmple.com",

    status: "online",
    employed: "23/04/18",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
  
    status: "offline",
    employed: "11/01/19",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // ... more users
];

function UserTables() {
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
              <input
                type="text"
                placeholder="Type here..."
                className="search-input"
              />
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
                          src={user.avatar}
                          alt=""
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
                    <td className="table-cell">{user.employed}</td>
                    <td class="table-cell-actions">
                            <button class="icon-button">
                                <Edit class="lucide lucide-edit" />
                            </button>
                            <button class="icon-button">
                                <Trash class="lucide lucide-trash" />
                            </button>
                            </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button className="pagination-button">Previous</button>
            <button className="pagination-button active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>
            <button className="pagination-button">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserTables;

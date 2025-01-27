import React from "react";
import './HomePage.css'
import {
  Search,
  Settings,
  Bell,
  Home,
  Wallet,
  Users,
  UserPlus,
  ShoppingCart,
} from "lucide-react";
const stats = [
  {
    title: "Today's Money",
    value: "$53,000",
    change: "+55%",
    icon: Wallet,
    positive: true,
  },
  {
    title: "Today's Users",
    value: "2,300",
    change: "+3%",
    icon: Users,
    positive: true,
  },
  {
    title: "New Clients",
    value: "+3,462",
    change: "-2%",
    icon: UserPlus,
    positive: false,
  },
  {
    title: "Total Sales",
    value: "$103,430",
    change: "+5%",
    icon: ShoppingCart,
    positive: true,
  },
];
export default function HomePage() {
  return (
    <div className="app">
      <header>
        <div className="header-content">
          <div className="breadcrumb">
            <Home className="icon" />
            <span className="separator">/</span>
            <span className="current">Dashboard</span>
          </div>
          <div className="header-actions">
            <div className="search-container">
              <Search className="search-icon" />
              <input type="text" placeholder="Type here..." />
            </div>
            <button className="icon-button">
              <Settings />
            </button>
            <button className="icon-button">
              <Bell />
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div>
                  <p className="stat-title">{stat.title}</p>
                  <div className="stat-value-container">
                    <p className="stat-value">{stat.value}</p>
                    <span
                      className={`stat-change ${stat.positive ? "positive" : "negative"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="stat-icon">
                  <stat.icon />
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="dashboard-grid">

          <div className="welcome-card">
            <div className="welcome-content">
              <p className="welcome-subtitle">Welcome back,</p>
              <h2 className="welcome-title">Mark Johnson</h2>
              <p className="welcome-text">
                Glad to see you again!
                <br />
                Ask me anything.
              </p>
              <button className="record-button">Tap to record</button>
            </div>
            <div className="welcome-blur"></div>
          </div>
          
          <div className="satisfaction-card">
            <h3 className="card-title">Satisfaction Rate</h3>
            <p className="card-subtitle">From all Users</p>
            <div className="satisfaction-chart">
              <div className="satisfaction-value">
                <span>95%</span>
              </div>
              <svg viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
          
        </div>
      </main>
     
    </div>
  );
}

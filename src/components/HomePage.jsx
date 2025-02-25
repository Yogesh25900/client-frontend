import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { getUserDetails } from "../api/AuthService";
import { useOutletContext } from 'react-router-dom';

import {
  Home,
  Wallet,
  Users,
  UserPlus,
  ShoppingCart,
} from "lucide-react";
import WeatherSearchCard from "./WeatherCard";

export default function HomePage() {
  const userId = useOutletContext();
  const [userName, setUserName] = useState('');
  const [userStats, setUserStats] = useState({ totalUsers: 0, percentageIncrease: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/users/total'); // Fix URL
        const data = await response.json();
        if (response.ok) {
          setUserStats({
            totalUsers: data.totalUsers,
            percentageIncrease: data.percentageIncrease,
          });
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats(); // Call inside useEffect to prevent extra renders
  }, []); // Run only once on mount

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(userId);
        if (response.user && response.user.name) {
          setUserName(response.user.name);
        } else {
          console.error("User details not found or missing 'name' field.");
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

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
      value: userStats.totalUsers,
      change: userStats.percentageIncrease >= 0
        ? `+${userStats.percentageIncrease}%`
        : `${userStats.percentageIncrease}%`,
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

  return (
    <div className="app">
      <header>
        <div className="header-contents">
          <div className="breadcrumb">
            <Home className="icon" />
            <span className="separator">/</span>
            <span className="current">Dashboard</span>
          </div>
        </div>
      </header>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-title">{stat.title}</p>
                <div className="stat-value-container">
                  <p className="stat-value">{stat.value}</p>
                  <span className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
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
            <h2 className="welcome-title">{userName}</h2>
            <p className="welcome-text">
              Glad to see you again!
              <br />
              Ask me anything.
            </p>
          </div>
        </div>

        <div>
          <WeatherSearchCard />
        </div>
      </div>
    </div>
  );
}

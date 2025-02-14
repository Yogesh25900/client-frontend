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
import WeatherSearchCard from "./WeatherCard";
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


const mockWeatherData = {
  location: {
    name: "Paris",
    region: "Ile-de-France",
    country: "France",
    lat: 48.867,
    lon: 2.333,
    tz_id: "Europe/Paris",
    localtime_epoch: 1738767124,
    localtime: "2025-02-05 15:52"
  },
  current: {
    last_updated: "2025-02-05 15:45",
    temp_c: 6.4,
    temp_f: 43.5,
    condition: {
      text: "Fog",
      icon: "https://cdn.weatherapi.com/weather/64x64/day/248.png"
    },
    wind_mph: 4.7,
    humidity: 93,
    pressure_mb: 1039.0,
    pressure_in: 30.68,
    precip_mm: 0.0,
    precip_in: 0.0,
    feelslike_c: 4.9,
    feelslike_f: 40.8,
    windchill_c: 9.4,
    windchill_f: 48.9,
    heatindex_c: 10.2,
    heatindex_f: 50.4,
    dewpoint_c: 2.3,
    dewpoint_f: 36.2,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 0.7,
    gust_mph: 5.7,
    gust_kph: 9.2
  }
};

export default function HomePage() {
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
            </div>
          </div>
          
          <div >
            <WeatherSearchCard weatherData={mockWeatherData} />
          </div>
          
        </div>
      </main>
     
    </div>
  );
}

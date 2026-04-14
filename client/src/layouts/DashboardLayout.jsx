import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./DashboardLayout.css"; // Assuming you will create a CSS file for dashboard-specific styles

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="dashboard-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Booking from './pages/Booking';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Profile from './features/auth/Profile';
import Destinations from './pages/Destinations';
import Transport from './pages/Transport';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AIPlanner from './pages/AIPlanner';
import Itinerary from './pages/Itinerary';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destination/:id" element={<Destination />} />
        <Route path="booking" element={<Booking />} />
        <Route path="transport" element={<Transport />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="planner" element={<AIPlanner />} />
        <Route path="itinerary" element={<Itinerary />} />
        <Route path="about" element={<About />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

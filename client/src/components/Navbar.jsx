import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserButton } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" onClick={close}>
          <svg className="nav__logo-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 16L16 30L30 16L16 2Z" fill="#0EA5E9"/>
            <path d="M16 8L8 16L16 24L24 16L16 8Z" fill="white"/>
          </svg>
          <span className="nav__wordmark">SkyTrail</span>
        </Link>

        <button
          type="button"
          className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')} onClick={close}>
            Home
          </NavLink>
          <NavLink to="/destinations" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')} onClick={close}>
            Destinations
          </NavLink>
          <NavLink to="/transport" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')} onClick={close}>
            Transport
          </NavLink>
          <NavLink to="/planner" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')} onClick={close}>
            AI Planner
          </NavLink>
          <NavLink to="/itinerary" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')} onClick={close}>
            My Trips
          </NavLink>

          {isSignedIn ? (
            <div className="nav__user">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="nav__auth-btns">
              <Link to="/sign-in" className="nav__cta nav__cta--ghost" onClick={close}>
                Sign in
              </Link>
              <Link to="/sign-up" className="nav__cta" onClick={close}>
                Join Now
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

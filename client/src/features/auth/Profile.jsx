import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserProfile } from '../../api/auth';
import './Profile.css';

const Profile = () => {
  const { user, isLoaded, isSignedIn, mode } = useAuth();
  const [server, setServer] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!isSignedIn) return;
    fetchUserProfile()
      .then(setServer)
      .catch((e) => setErr(e.message));
  }, [isSignedIn]);

  if (!isLoaded) {
    return <div className="page page-loading">Loading…</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="page page-narrow">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  const display = server || user;

  return (
    <div className="page profile-page">
      <h1>Profile</h1>
      <p className="profile-page__mode">
        Auth mode: <strong>{mode}</strong>
        {mode === 'demo' ? ' — local demo user' : ''}
      </p>
      {err ? <p className="profile-page__err">{err}</p> : null}
      <div className="profile-card">
        {display?.imageUrl ? (
          <img src={display.imageUrl} alt="" className="profile-card__avatar" />
        ) : (
          <div className="profile-card__placeholder" aria-hidden>
            {(display?.name || display?.username || '?').slice(0, 1)}
          </div>
        )}
        <dl className="profile-dl">
          <div>
            <dt>Name</dt>
            <dd>{display?.name || display?.firstName || display?.username || '—'}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{display?.email || '—'}</dd>
          </div>
          {display?._id ? (
            <div>
              <dt>User id</dt>
              <dd>
                <code>{String(display._id)}</code>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </div>
  );
};

export default Profile;

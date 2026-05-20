

///App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocialProvider }        from './context/SocialContext';
import { UIProvider }            from './context/UIContext';

import MainLayout        from './components/layout/MainLayout';
import LoginPage         from './pages/loginPage';
import FeedPage          from './pages/feedPage';
import ExplorePage       from './pages/explorePage';
import ProfilePage       from './pages/profilePage';
import RoomsPage         from './pages/rooms';
import GroupsPage        from './pages/groupsPage';
import ChannelsPage      from './pages/channels';
import NotificationsPage from './pages/notification';

/**
 * ProtectedRoute — wraps any route that requires authentication.
 * If the user is not logged in, redirects to /login and remembers
 * where they were trying to go (via the "from" query param).
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location            = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/login?from=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  return children;
}

/**
 * AppRoutes — all routes live here so they can access AuthContext.
 * Public routes: / (Feed) and /explore — no login required.
 * Protected routes: rooms, groups, channels, notifications, profile.
 * /login is accessible only to unauthenticated users.
 */
function AppRoutes() {
  return (
    <SocialProvider>
      <UIProvider>
        <Routes>
          {/* /login — accessible when NOT logged in */}
          <Route path="/login" element={<LoginPage />} />

          {/* All other routes share MainLayout (sidebar + topbar) */}
          <Route element={<MainLayout />}>
            {/* ── Public pages ── */}
            <Route path="/"        element={<FeedPage />} />
            <Route path="/explore" element={<ExplorePage />} />

            {/* ── Protected pages — redirect to /login if not authenticated ── */}
            <Route path="/rooms"         element={<ProtectedRoute><RoomsPage /></ProtectedRoute>} />
            <Route path="/groups"        element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
            <Route path="/channels"      element={<ProtectedRoute><ChannelsPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/profile"       element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/profile/:id"   element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </UIProvider>
    </SocialProvider>
  );
}

export default function App() {
  return (
   
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
   
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './pages/UserDashboard'; // Panel de usuario
import AdminDashboard from './pages/AdminDashboard'; // Panel de administrador
import Library from './components/Library';
import Profile from './components/Profile';
import Accessibility from './components/Accessibility';
import Crud from './components/Crud'; // Solo para administradores

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Usuario normal */}
        <Route path="/user" element={<UserDashboard />}>
          <Route path="library" element={<Library />} />
          <Route path="profile" element={<Profile />} />
          <Route path="accessibility" element={<Accessibility />} />
        </Route>

        {/* Administrador */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="crud" element={<Crud />} />
          <Route path="library" element={<Library />} />
          <Route path="profile" element={<Profile />} />
          <Route path="accessibility" element={<Accessibility />} />
        </Route>

        {/* Si la ruta no coincide, redirige */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
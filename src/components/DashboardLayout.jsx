import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import ProtectedRoute from './ProtectedRoute';

const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <DashboardHeader />
        <Outlet />
    </ProtectedRoute>
  );
};

export default DashboardLayout; 
import React from 'react';

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-muted-foreground">Select a section from the sidebar to manage its content.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-40 w-full rounded-lg bg-muted animate-pulse"></div>
        <div className="h-40 w-full rounded-lg bg-muted animate-pulse"></div>
        <div className="h-40 w-full rounded-lg bg-muted animate-pulse"></div>
        <div className="h-40 w-full rounded-lg bg-muted animate-pulse"></div>
      </div>
    </div>
  );
};

export default DashboardHome;
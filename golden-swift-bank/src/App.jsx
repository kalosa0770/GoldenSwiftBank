import React from 'react';
import UserDashboard from './user-components/UserDashboard';

import './App.css';

function App() {
  return (
    <main className="relative min-h-screen bg-gray-50 font-[sans] antialiased">
      <UserDashboard />
    </main>
  );
}

export default App;

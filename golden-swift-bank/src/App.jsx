import React from 'react';
import UserDashboard from './user-components/UserDashboard';

import './App.css';

function App() {
  return (
    <div className="font-[sans]">
      <header className="flex flex-col">
        <UserDashboard />
      </header>
    </div>
  );
}

export default App;

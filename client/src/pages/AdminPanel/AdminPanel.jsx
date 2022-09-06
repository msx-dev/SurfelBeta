import "./AdminPanel.css";

import React from 'react'

export default function AdminPanel({handleLogout}) {
  return (
    <div>
          <h1>Admin Panel</h1>
          <button onClick={()=>handleLogout()}>Log Out</button>
    </div>
  )
}

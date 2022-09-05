import "./NearbyCard.css";

import React from 'react'

export default function NearbyCard({nearby}) {

  return (
    <div className="nearby-card">
        <div className="nearby-text">
            <h1 className="spot-name-description">Spot Title</h1>
            <h1 className="nearby-title">{nearby.title}</h1>
            
        </div>
        <div className="nearby-rating">
            <h1 className="spot-name-description">Spot Rating</h1>
            <h1>{nearby.rating}</h1>
        </div>
        
    </div>  
  )
}

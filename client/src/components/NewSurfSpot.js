import React, { useEffect, useState } from 'react';
import "./NewSurfSpot.css";
import {GiWaveSurfer} from 'react-icons/gi';
import axios from 'axios';

export default function NewSurfSpot({storedData, setPins, pins, newPin, setNewPin, setNewSpot}) {
    const [stage, setStage] = useState(1)
    const [title, setTitle] = useState();
    const [review, setReview] = useState();
    const [rating, setRating] = useState(0);
    const [forecastID, setForecastID] = useState("");
    const [remaining, setRemaining] = useState(0);
    const [currentUser, setCurrentUser] = useState(storedData.getItem("user"));



    const handleSubmit = async (e) => {
        console.log(newPin.lat)
        
        const savePin = {
          username: currentUser,
          description: review,
          rating: rating,
          lat: newPin.lat,
          long: newPin.long,
          title: title,
          all_ratings: 1,
          all_ratings_sum: rating,
          forecastID: forecastID
        }
  
        try {
          const response = await axios.post("/pins", savePin);
          console.log(response.data)
          setPins([...pins, response.data]);
          setNewPin(null);
          setNewSpot(false);
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div className="popup-add">
        <h1 className='cancel' onClick={()=> {setNewSpot(false); setNewPin(null)}}>X</h1>
        {stage === 1 ? (
            <div className='newspot-input-compartment1'>
                <h1>Give this spot a title</h1>
                <input placeholder='title' className='input-form' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <h2 className='hint'>It's best to use the name of the beach or perhaps a local name for this spot.</h2>
                <button onClick={()=>setStage(2)} className='next-button'>Next</button>
            </div>
        ): stage === 2 ? (
            <div className='newspot-input-compartment2'>
                <h1>Give this spot a review</h1>
                <textarea placeholder='title' className='textarea-form' value = {review} onChange={(e)=>setReview(e.target.value)}/>
                <h2 className='hint'>Tell us a few words about this spot.</h2>
                <button onClick={()=>setStage(3)} className='next-button'>Next</button>
            </div>
        ) : stage === 3 ? (
            <div className='newspot-input-compartment3'>
                <h1>Give this spot a rating</h1>
                {rating === 0 && (<div className='rating-select'>
                    <GiWaveSurfer className='rating-logo' size={50} onClick={() => {setRating(1); setRemaining(4);}}/>
                    <GiWaveSurfer className='rating-logo' size={50} onClick={() => {setRating(2); setRemaining(3);}}/>
                    <GiWaveSurfer className='rating-logo' size={50} onClick={() => {setRating(3); setRemaining(2);}}/>
                    <GiWaveSurfer className='rating-logo' size={50} onClick={() => {setRating(4); setRemaining(1);}}/>
                    <GiWaveSurfer className='rating-logo' size={50} onClick={() => {setRating(5); setRemaining(0);}}/>
                </div>)}
                {rating !== 0 && (
                    <div className='rating-select'>
                        {[...Array(rating)].map((e, i) => (
                            <GiWaveSurfer size={50} className='rating-logo-full'/>
                        ))}
                        {[...Array(remaining)].map((e, i) => (
                            <GiWaveSurfer size={50} className='rating-logo'/>
                        ))}

                    </div>
                )}
                <h2 className='hint'>It's best to use the name of the beach or perhaps a local name for this spot.</h2>
                <button onClick={()=>setStage(4)} className='next-button'>Next</button>
            </div>
        ) : stage === 4 ? (
            <div className='newspot-input-compartment4'>
                <h1>Spot forecast ID</h1>
                <input placeholder='title' type="number" className='input-form' value={forecastID} onChange={(e)=>setForecastID(e.target.value)}/>
                <h2 className='hint'>You can skip this step, but it will help your fellow surfers. You can read the instructions <a href="">here.</a></h2>
                <button onClick={()=>handleSubmit()} className='next-button'>Finish</button>
            </div> 
        ) : (<div></div>) }
        
    </div>
  )
}

import axios from 'axios';
import React, { useState } from 'react';
import { GiWaveSurfer } from 'react-icons/gi';
import "./NewSpot.css";

export default function NewSpot({storedData, setPins, pins, newPin, setNewPin}) {
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [currentUser, setCurrentUser] = useState(storedData.getItem("user"));


    const handleSubmit = async (e) => {
        console.log(newPin.lat)
        e.preventDefault();
        const savePin = {
          username: currentUser,
          description: review,
          rating: rating,
          lat: newPin.lat,
          long: newPin.long,
          title: title,
          all_ratings: 1,
          all_ratings_sum: rating
        }
  
        try {
          const response = await axios.post("/pins", savePin);
          console.log(response.data)
          setPins([...pins, response.data]);
          setNewPin(null);
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div className="popup-add">
        <h1 className='cancel'>X</h1>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <label>Title</label>
            <input placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
            <label>Review</label>
            <input placeholder="review" onChange={(e) => setReview(e.target.value)}/>
            <label>Rating</label>
            <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type="submit">Add</button>
        </form>
        <GiWaveSurfer/>
    </div>
  )
}

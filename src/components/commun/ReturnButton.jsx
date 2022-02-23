import React from 'react';
import { returnRental } from '../../services/RentalsService';
import { useLocation,useNavigate } from 'react-router-dom';

const ReturnButton=({rental}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleReturn=async()=>{
        console.log(rental._id)
        await returnRental({_id: rental._id})
        return location.pathname==="/rental"? window.location.reload(): navigate(`/rentals/${rental._id}`)
    }

    return rental.dateReturned? "": <button className="btn btn-success mx-1" onClick={handleReturn}>Return</button>
}

export default ReturnButton;
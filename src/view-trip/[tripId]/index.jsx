import { db } from '@/config/Firebase'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Info from '../components/Info'
import Hotel from '../components/Hotel'
import Itenary from '../components/Itenary'
import Footer from '../components/Footer'


const ViewTrip = () => {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);
  useEffect(()=>{
    tripId && getTripData();
  },[tripId])
  const getTripData= async()=>{
    const docref = doc(db,"all-trips",tripId);
    const docsnap = await getDoc(docref);

    if(docsnap.exists()){
      console.log("document - ",docsnap.data());
      setTrip(docsnap.data());

    }else{
      console.log("no trip found");

    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* information */}
      <Info trip={trip}/>

      {/* recommended hotel */}
      <Hotel trip = {trip}/>

      {/* {itenary} */}
      <Itenary trip={trip}/>

      <Footer/>
    </div>
  )
}

export default ViewTrip
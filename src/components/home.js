import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token) navigate("/login");
  },[])
  return (
    <div>Home</div>
  )
}

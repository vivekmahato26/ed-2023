import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../utils/util';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/slices/userSlice';


export default function UserDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.User.value.userDetails);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if(!verifyToken(token,email,userId)) navigate("/login");
    dispatch(fetchUser())
  },[])
  return (
    <div>
      
    </div>
  )
}

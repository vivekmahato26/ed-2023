import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { verifyToken } from "../redux/slices/userSlice";
import ResetPass from "./resetPass";
export default function VerifyToken() {
  const verify = useSelector((state) => state.User.value.verifyToken);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = location.search.split("=")[1];
    dispatch(verifyToken("?token=" + encodeURIComponent(token)));
  }, []);
  return <>{verify.data ? <ResetPass /> : <p>Invalid URL</p>}</>;
}

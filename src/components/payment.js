import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/api";
import { useDispatch } from "react-redux";
import { addSubscription } from "../redux/slices/subscriptionSlice";

export default function Payment() {
  const dispatch = useDispatch();
  const fetchPayment = async () => {
    try {
      const cs_id = localStorage.getItem("cs_id");
      localStorage.removeItem("cs_id");
      const { data: sessionData } = await axios.get(
        baseUrl + "/payment/session/" + cs_id
      );
      const { data: paymentIntent } = await axios.get(
        baseUrl + "/payment/paymentIntent/" + sessionData.payment_intent
      );
      if (paymentIntent.status == "succeeded") {
        dispatch(
          addSubscription({
            userId: localStorage.getItem("userId"),
            courseId: sessionData.metadata.courseId,
            duration: sessionData.metadata.duration,
            paymentId: sessionData.payment_intent,
            startDate: new Date(),
          })
        );
      } else {
        alert("Payment status" + paymentIntent.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  return <div>Payment</div>;
}

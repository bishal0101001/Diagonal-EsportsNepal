import React from "react";
import { useDispatch } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch();
  };
  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handlePayment}>Proceed</button>
    </div>
  );
};

export default Payment;

import React, { useContext, useState } from "react";
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { Navigate, } from "react-router-dom";
import { Auth } from "../config";
import { AuthContext } from "../auth";

function LogIn() {
  const [form,setForm] = useState(undefined);
  const [otp,setOtp] = useState(undefined);

const onChangeHandler = (event) => {
  setForm(event.target.value);
};

const onChangeHandlerOtp = (event) => {
  setOtp(event.target.value);
  console.log(otp);
};

const setUpRecaptcha = () =>{
  console.log("invoked");
  window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      onSignInSubmit();
    }
  }, Auth);
}

const onSubmitOtp = (e) => {
  e.preventDefault();
  let otpInput = otp;
  let optConfirm = window.confirmationResult;
  optConfirm
    .confirm(otpInput)
    .then(function (result) {
      let user = result.user;
      console.log("signed in"+user);
    })
    .catch(function (error) {
      console.log(error);
      alert("Incorrect OTP");
    });
};
const onSignInSubmit = (e) => {
  console.log("hello");
  e.preventDefault();
  setUpRecaptcha();
  let phoneNumber = "+91" + form;
  console.log(phoneNumber);
  let appVerifier = window.recaptchaVerifier;
  
    signInWithPhoneNumber(Auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log("OTP is sent");
    }).catch((error) => {
      console.log(error);
    });
};
const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/Home"/>;
  }

  return (
<div>
        <div fluid="sm" className="mt-3">
          <div className="justify-content-center">
            <div xs={12} md={6} lg={5}>
              <h2 className="mb-3">Login</h2>
              <form className="form" onSubmit={onSignInSubmit}>
                <div id="sign-in-button"></div>
                
                  <input
                    type="number"
                    value={form}
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={(event)=>{onChangeHandler(event)}}
                    required
                  />
                
                <button button="Submit" type="submit" >SUBMIT</button>
              </form>
            </div>
          </div>
          <div className="justify-content-center">
            <div xs={12} md={6} lg={5}>
              <h2 className="mb-3">Enter OTP</h2>
              <form className="form" onSubmit={onSubmitOtp}>
                
                  <input
                    id="otp"
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    value={otp}
                    onChange={(event)=>{onChangeHandlerOtp(event)}}
                  />
                
                <button button="Submit" type="submit" >SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LogIn;

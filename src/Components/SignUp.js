import React, { useContext, useState } from "react";
import { Auth } from "../config";
import { AuthContext } from "../auth";
import { RecaptchaVerifier, signInWithPhoneNumber,updateProfile } from "firebase/auth";
import { InputBox, InputButton } from "./DefaultStyle";
import { Navigate, } from "react-router-dom";
const SignUp = () => {
    const [name,setName] = useState(undefined);
    const [email,setEmail] = useState(undefined);
    const setUpRecaptcha = () => {
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
        console.log(name,email);
        const { otp } = e.target.elements;
        console.log(otp.value);
        let otpInput = otp.value;
        let optConfirm = window.confirmationResult;
        optConfirm
            .confirm(otpInput)
            .then(function (result) {
                console.log(Auth.currentUser);
                updateProfile(Auth.currentUser, {
                    displayName: name.value,email:email.value
                  })
                console.log(Auth.currentUser);
            })
            .catch(function (error) {
                console.log(error);
                alert("Incorrect OTP");
            });
    };
    const onSignInSubmit = (e) => {

        e.preventDefault();
        const name = e.target.elements[0];
        const phonenumber = e.target.elements[1];
        const email = e.target.elements[2];
        setName(name);
        setEmail(email);
        console.log(name.value, phonenumber.value, email.value);
        setUpRecaptcha();
        let phoneNumber = "+91" + phonenumber.value;
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
        return <Navigate to="/Home" />;
    }
    return (
        <div>
            <div className="continer-sm position-absolute top-50 start-50 translate-middle shadow " style={{ width: "23rem", borderRadius: "12px" }}>
                <div>
                    <center>
                        <h2 className="fw-bolder mt-3">Enter credentials</h2>
                        {/* <p className="text-muted mb-3" style={{ fontSize: "12px" }}>Enter credentials to gain access</p> */}
                    </center>
                    <div className="p-3 mt-3"  >
                        <form onSubmit={onSignInSubmit} >
                            <div id="sign-in-button"></div>
                            <InputBox required={true} value="Name" type="text" name="name"></InputBox>
                            <InputBox required={true} value="Phone Number" type="text" name="phonenumber"></InputBox>
                            <InputBox value="Email Address" type="email" name="email" sub="(optional)"></InputBox>

                            <InputButton title="Create Account" type="submit"></InputButton>
                        </form>
                    </div>
                    <div className="p-3">
                        <form onSubmit={onSubmitOtp} >
                            <InputBox required={true} value="OTP" type="text" name="otp"></InputBox>
                            <InputButton title="Sign In" type="submit"></InputButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp;
import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import { Auth } from './config';
import { AuthContext } from './auth';
import { signOut } from "firebase/auth";
const SignedIn = () =>{
    const logOut = () => {
        signOut(Auth).then(() => {
            
      }).catch((error) => {
        });}
        const { currentUser } = useContext(AuthContext);
        console.log(currentUser)
        const name = currentUser.displayName;
        const phone = currentUser.phoneNumber;
  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }
        
        return (
            <div>
                <h1>welcome {name } your phone number is {phone}</h1>
                <button onClick={logOut} >Logout</button>
            </div>
        )
    
}
export default SignedIn;
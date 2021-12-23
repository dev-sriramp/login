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
  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }
        
        return (
            <div>
                <h1>user logged in</h1>
                <button onClick={logOut} >Logout</button>
            </div>
        )
    
}
export default SignedIn;
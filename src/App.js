import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { AuthProvider } from "./auth";
import LogIn from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import SignedIn from "./SignedIn";

import NotFound from "./NotFound";

const App = () => {
  return (<AuthProvider >
    <Router >
      <Routes >
        <Route exact path="/" element={<Navigate to="/Login" />} />
        <Route exact path="/Login" element={<LogIn />} />
        <Route exact path="/Home" element={<SignedIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        
        <Route path="/*" element={<NotFound />} />
      </Routes >
    </Router>
  </AuthProvider>
  );
}

export default App;
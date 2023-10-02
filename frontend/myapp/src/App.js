// // App.js
// import React from 'react';
// import {BrowserRouter,Route,Routes} from 'react-router-dom';
// import Signin from './components/Signin';
// import Signup from './components/Signup';
// import Home from './components/Home'; // Assuming you have a Home component

// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Signin />} /> {/* Define a component for the root URL */}
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/signin" element={<Signin />} />
//       <Route path="/home" element={<Home />} />
//     </Routes>
//   </BrowserRouter>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  const [auth, setAuth] = useState(false);

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin auth={auth} setAuth={setAuth}/>} />
        <Route path="/signup" element={<Signup auth={auth} setAuth={setAuth}/>} />
        <Route path="/signin" element={<Signin auth={auth} setAuth={setAuth}/>} />
        {/* Use a route guard to protect the "/home" route */}
        {/* <Route
          path="/home"
          element={ <Home /> }
        /> */}
         <Route
          path="/home"
          element={<Home auth={auth} setAuth={setAuth}/> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


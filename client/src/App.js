import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';

import Home from "./Home";
import GetUser from './GetUser';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getUser" element={<GetUser />} />
      </Routes>
    </div>
  );
}



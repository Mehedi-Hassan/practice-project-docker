import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import './App.css';

export default function GetUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState(0);

  const navigate = useNavigate();
  const navigateHome = () => {
    Axios.post("http://localhost:3014/insert", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNo: mobileNo
    });

    navigate('/');
  };

  

  return (
    <div className='GetUser'>
      <h1 className='GetUserHeader'>Fill User Info</h1>
      
      <label>First Name</label>
      <input 
        type="text" 
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />

      <label>Last Name</label>
      <input 
        type="text" 
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />

      <label>Email Address</label>
      <input 
        type="text" 
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label>Mobile No</label>
      <input 
        type="text" 
        onChange={(event) => {
          setMobileNo(event.target.value);
        }}
      />

      <button onClick={navigateHome}>Submit</button>
    </div>
  );
}
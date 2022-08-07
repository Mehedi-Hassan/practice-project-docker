import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import Axios from 'axios';
import './App.css';


export default function Home() {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newMobileNo, setNewMobileNo] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0)

    const [userList, setUserList] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3014/read").then((response) => {
            setUserList(response.data)
            console.log(userList)
        })
    }, [])

    const navigate = useNavigate();
    const getUserInfo = () => {
        navigate('/getUser');
    };

    const updateUser = () => {
        console.log(id, newFirstName, newLastName, newEmail, newMobileNo);
        Axios.put("http://localhost:3014/update", {
            id : id,
            newFirstName : newFirstName,
            newLastName : newLastName,
            newEmail : newEmail,
            newMobileNo : newMobileNo,
        })
    }

    function toggleModal() {
        console.log("toggle")
        setIsOpen(!isOpen);
    }

    function UpdateDialog(_id, _firstName, _lastName, _email, _mobileNo){
        setId(_id);
        setNewFirstName(_firstName);
        setNewLastName(_lastName);
        setNewEmail(_email);
        setNewMobileNo(_mobileNo);

        console.log(id, newFirstName, newLastName, newEmail, newMobileNo);
        toggleModal();
    }

    const DeleteUser = (_id) => {
        Axios.delete(`http://localhost:3014/delete/${_id}`);
    }
    

    return (
        <div className='Home'>
            <h1 className="Header"> CRUD Application with MERN</h1>
    
            <div className='ListHeader'>
                <h2>Users List</h2>
                <button onClick={getUserInfo}>Add User</button>
            </div>

            <div className="UsersList">
                <table>
                    <tbody>
                        <tr>
                            <th>#ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Action</th>
                        </tr>
                        
                        {userList.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key+1}</td>
                                    <td>{val.firstName}</td>
                                    <td>{val.lastName}</td>
                                    <td>{val.email}</td>
                                    <td>{val.mobileNo}</td>
                                    <td>
                                        <button className="EditButton" onClick={() => 
                                            UpdateDialog(val._id, 
                                                        val.firstName,
                                                        val.lastName,
                                                        val.email,
                                                        val.mobileNo)}>Edit</button>

                                        <button className="DeleteButton" onClick={() => 
                                            DeleteUser(val._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    
                </table>
            </div>

            <div>
                <Modal
                    isOpen = {isOpen}
                    onRequestClose = {toggleModal}
                    contentLabel="My dialog"
                    className="UpdateUserDialog"
                >
                    <h3>Update User Info</h3>
                    <input 
                        type="text" 
                        placeholder="First Name"
                        onChange={(event) => {
                        setNewFirstName(event.target.value);
                        }}
                    />

                    <input 
                        type="text" 
                        placeholder="Last Name"
                        onChange={(event) => {
                        setNewLastName(event.target.value);
                        }}
                    />

                    <input 
                        type="text" 
                        placeholder="Email Address"
                        onChange={(event) => {
                        setNewEmail(event.target.value);
                        }}
                    />

                    <input 
                        type="text" 
                        placeholder="Mobile No"
                        onChange={(event) => {
                        setNewMobileNo(event.target.value);
                        }}
                    />

                    <button onClick={() => {
                        updateUser();
                        toggleModal();
                    }}
                    >Update</button>
                    
                </Modal>
            </div>
        </div>
    );
  }

//   function UpdateDialog(id){
    // const [newFirstName, setNewFirstName] = useState("");
    // const [newLastName, setNewLastName] = useState("");
    // const [newEmail, setNewEmail] = useState("");
    // const [newMobileNo, setNewMobileNo] = useState("");
    // const [isOpen, setIsOpen] = useState(false);

    // const updateUser = () => {
    //     console.log(id, newFirstName, newLastName, newEmail, newMobileNo);
    //     Axios.put("http://localhost:3014/update", {
    //         id : id,
    //         newFirstName : newFirstName,
    //         newLastName : newLastName,
    //         newEmail : newEmail,
    //         newMobileNo : newMobileNo,
    //     })
    // }

    // function toggleModal() {
    //     console.log("toggle")
    //     setIsOpen(!isOpen);
    // }

    // toggleModal();

    // return (
        // <div>
        //     <Modal
        //         isOpen = {isOpen}
        //         onRequestClose = {toggleModal}
        //         contentLabel="My dialog"
        //         className="UpdateUserDialog"
        //     >
        //         <h3>Update User Info</h3>
        //         <input 
        //             type="text" 
        //             placeholder="First Name"
        //             onChange={(event) => {
        //             setNewFirstName(event.target.value);
        //             }}
        //         />

        //         <input 
        //             type="text" 
        //             placeholder="Last Name"
        //             onChange={(event) => {
        //             setNewLastName(event.target.value);
        //             }}
        //         />

        //         <input 
        //             type="text" 
        //             placeholder="Email Address"
        //             onChange={(event) => {
        //             setNewEmail(event.target.value);
        //             }}
        //         />

        //         <input 
        //             type="text" 
        //             placeholder="Mobile No"
        //             onChange={(event) => {
        //             setNewMobileNo(event.target.value);
        //             }}
        //         />

        //         <button onClick={() => {
        //             updateUser();
        //             toggleModal();
        //         }}
        //         >Update</button>
                
        //     </Modal>
            
        
        // </div>
//     )
//   }

  
import React from 'react'
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import FormInput from "../components/FormInput";
import "./app.css";

const App = () => {
    const [values, setValues] = useState({
      username: "",
      email: "",
      MobileNo: "",
      Address:"",
      AccountNumber:"",
      password: "",
      confirmPassword: "",
    });
  
  


    const inputs = [
      {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Username",
        errorMessage:"Username should be 3-16 characters and shouldn't include any special character!",
        label: "Username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
              },
         

      {
        id: 2,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "It should be a valid email address!",
        label: "Email",
        required: true,
      },
      {
        id: 3,
        name: "MobileNo",
        type: "text",
        placeholder: "Mobile Number",
        errorMessage: "Please enter valid 10 digit number",
        label: "Mobile Number",
        pattern:"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
        required: true,
        },

      {
        id: 6,
        name: "Address",
        type: "text",
        placeholder: "Your Address",
        errorMessage: "Please enter  your address",
        label: "Your Address",
        required: true,
        
      },

      {
        id: 7,
        name: "AccountNumber",
        type: "text",
        placeholder: "Enter Your Account Number",
        errorMessage: "Please enter a valid 10 digit Account number",
        label: "Account Number",
        pattern:"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
        required: true,
      },



      {
        id: 4,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "Password",
        pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
        required: true,
      },
      {
        id: 5,
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        errorMessage: "Passwords don't match!",
        label: "Confirm Password",
        pattern: values.password,
        required: true,
      },
    ];
  
    const handleSubmit = async (e) => {
        let response = await axios.post("http://localhost:3000/posts", values);

      if (response) {
        alert ("data submitted Successfully");
      } else{
        alert("something went wrong");
      }
      
      setValues({
        username: "",
        email: "",
        MobileNo: "",
        Address:"",
        AccountNumber:"",
        password: "",
        confirmPassword: "",
      });
    };


    const onChange = (e) => {
     setValues({ ...values, [e.target.name]: e.target.values });
    };
    
    useEffect(() => {
      fetch("http://localhost:3000/posts")
      .then(res=>{
        return res.json();
      })
      .then(data =>{
        console.log(data);
        setValues(data)
      })
    }, []);

  
    return (
      <div className="app">
         <Navbar />
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </form>
        <Footer />
      </div>
    );
  };

  
  export default App
  

import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./css/register.css";
import { useNavigate } from "react-router-dom";

const Email_Regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
// const PWD_Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const Login = () => {
    let navigate = useNavigate()

    const [loginDetails, setloginDetails] = useState({
        email: "",
        password: ""
    })
    const [chances,setChances] = useState(true)
    const [message,setMessage] = useState("")    
    const [emailValidation, setemailValidation] = useState(true)

    const inputChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setloginDetails((prevalue) => {
            return{
                ...prevalue,[name]:value
            }
        })
    }

    useEffect(() => {
        const email_validator = Email_Regex.test(loginDetails.email)
        setemailValidation(email_validator)
    },[loginDetails.email])

    const Loggingin = async() => {
        await axios({
            method : 'post',
            url : 'http://127.0.0.1:8000/auth/login/',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                'email' : loginDetails.email,
                'password' : loginDetails.password
            }
        }).then((response) => {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
                console.log(response.status)
                const token = response.data.access
                localStorage.setItem("SavedToken", 'Bearer ' + token)
                console.log(localStorage.getItem('SavedToken'))
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                navigate("/dashboard")
            } else{
                setChances(false)
                setMessage("Login Failed.Try Again")
            }
        }).catch((error) => {
            console.error(error.response)
        })
    }

    const submitData = (event) => {
        event.preventDefault()
        Loggingin()
    }







    return (
        <>
            <div className="container1">
                <h1 className="heading_style">Login Page</h1>
                <form onSubmit={submitData} autocomplete="on">
                    <div className="box">
                        <label for="email" className="fl fontLabel"> Email ID: </label>
                        {emailValidation != true ? <p style={{ 'color': '#fff' }}>Enter a valid email </p> : <p> </p>}
                        <div className="fl iconBox"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                        <div className="fr">

                            <input type="email" required value={loginDetails.email} name="email" placeholder="Email Id" onChange={inputChange} className="textBox" />
                        </div>
                        <div className="clr"></div>
                    </div>
                    <div className="box">
                        <label for="password" className="fl fontLabel"> Password </label>
                        <div className="fl iconBox"><i className="fa fa-key" aria-hidden="true"></i></div>
                        <div className="fr">
                            <input type="Password" required value={loginDetails.password} name="password" placeholder="Confirm Password" onChange={inputChange} className="textBox" />
                        </div>
                        <div className="clr"></div>
                        <br />
                        <br />
                        <button  className="submit" value="submit" >Log In</button>
                        <br />
                        <br />
                        { chances == false ? <p style={{'color' : '#fff'}}> Login Failed Try Again</p> : <p></p> }
                    </div>
                    <br />
                    <br />
                </form>
            </div>
        </>
    )
}

export default Login;
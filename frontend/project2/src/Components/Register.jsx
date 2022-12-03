import "./css/register.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Email_Regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
const PWD_Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const Register = () => {
    const [details, setDetails] = useState({
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender : "",
        phoneNo: "",
        password: "",
        password1: ""
    })
    let navigate = useNavigate();
    const [email_validation,setemailValidation] = useState(false)

    const [password_validation,setpasswordValidation] = useState(false)
    const [repassword_validation,setrepasswordValidation] = useState(false)
    const [btn,setBtn] = useState(false)

    const inputChange = (event) => {
        // console.log(event.target.value)
        // console.log(event.target.name)
        const name = event.target.name
        const value = event.target.value
        setDetails((prevalue) => {
            // console.log(prevalue)
            // console.log({...prevalue,[name] : value})
            return {
                ...prevalue,[name] : value
            }
        })
    }
    useEffect(() => {
        const email_validator = Email_Regex.test(details.email)
        setemailValidation(email_validator)
    },[details.email])

    useEffect(() => {
        const pwd_validator = PWD_Regex.test(details.password)
        setpasswordValidation(pwd_validator)
        const match_validator = details.password === details.password1
        setrepasswordValidation(match_validator)

    },[details.password,details.password1])
    useEffect(() => {
        setBtn(true)
    },[])

    const submitData = (event) => {
        event.preventDefault()
        // console.log(event)
        addUser()

    }
    const initialData = () => {
        setDetails({
            email: "",
            firstName: "",
            middleName: "",
            lastName: "",
            gender : "",
            phoneNo: "",
            password: "",
            password1: ""
        })        
    }

    const addUser = async () => {
        await axios({
            method: 'post',
            url : 'http://127.0.0.1:8000/auth/register/',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                'email' : details.email,
                'first_name' : details.firstName,
                'middle_name' : details.middleName,
                'last_name' : details.lastName,
                'phone_number' : details.phoneNo,
                'gender' : details.gender,
                'password' : details.password,
                'password1' : details.password1
            }
        }).then((response) => {
            console.log(response.data.status)
            if (response.data.status == 201) {
                navigate("/otp")
            } else{
                navigate('/register')
            }

        }).catch((error) => {
            console.error(error.resonse.status)
        })
    }



    return (
        <>
            <div className="container">
                <form onSubmit={submitData} autocomplete="on">

                    <div className="box">
                        <label for="firstName" className="fl fontLabel"> First Name: </label>
                        <div className="new iconBox">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </div>
                        <div className="fr">
                            <input type="text" value={details.firstName} name="firstName" placeholder="First Name"
                                className="textBox" autofocus="on" required onChange={inputChange } />
                        </div>
                        <div className="clr"></div>
                    </div>

                    <div className="box">
                        <label for="middleName" className="fl fontLabel"> Middle Name: </label>
                        <div className="new iconBox">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </div>
                        <div className="fr">
                            <input type="text" value={details.middleName} name="middleName" placeholder="Middle Name"
                                className="textBox" autofocus="on" onChange={inputChange } />
                        </div>
                        <div className="clr"></div>
                    </div>





                    <div className="box">
                        <label for="lastName" className="fl fontLabel"> Last Name: </label>
                        <div className="fl iconBox"><i className="fa fa-user" aria-hidden="true"></i></div>
                        <div className="fr">
                            <input type="text" required value={details.lastName} name="lastName"
                                placeholder="Last Name" className="textBox" onChange={inputChange } />
                        </div>
                        <div className="clr"></div>
                    </div>




                    <div className="box">
                        <label for="phone" className="fl fontLabel"> Phone No.: </label>
                        <div className="fl iconBox"><i className="fa fa-phone-square" aria-hidden="true"></i></div>
                        <div className="fr">
                            <input type="text" required value={details.phoneNo} name="phoneNo" maxlength="15" onChange={inputChange } placeholder="Phone No." className="textBox" />
                        </div>
                        <div className="clr"></div>
                    </div>




                    <div className="box"> 
                        <label for="email" className="fl fontLabel"> Email ID: </label>
                        { email_validation != true? <p style={{'color' : '#fff'}}>Enter a valid email </p> : <p> </p>} 
                        <div className="fl iconBox"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                        <div className="fr">
                           
                            <input type="email" required value={details.email} name="email" placeholder="Email Id" onChange={inputChange } className="textBox" />
                        </div>
                        <div className="clr"></div>
                    </div>




                    <div className="box">
                        <label for="password" className="fl fontLabel"> Password </label>
                        { password_validation != true ? <p style={{'color' : '#fff'}}>one UpperCase,LowerCase,Numbers & symbols </p> : <p> </p>}
                        <div className="fl iconBox"><i className="fa fa-key" aria-hidden="true"></i></div>
                        <div className="fr">
                            <input type="Password" required value={details.password} name="password" placeholder="Password" onChange={inputChange } className="textBox" />
                        </div>
                        <div className="clr"></div>
                    </div>
                    <br />

                    <div className="box">
                        <label for="password" className="fl fontLabel">Confirm Password </label>
                        { repassword_validation != true ? <p style={{'color' : '#fff'}}> Enter same password </p> : <p style={{'color' : '#fff'}}> Passwords are matching </p>}
                        <div className="fl iconBox"><i className="fa fa-key" aria-hidden="true"></i></div>
                        <div className="fr">
                            <input type="Password" required value={details.password1} name="password1" placeholder="Confirm Password" onChange={inputChange } className="textBox" />
                        </div>
                        <div className="clr"></div>
                    </div>


                    <div className="box radio">
                        <label for="gender" className="fl fontLabel"> gender: </label>
                        <input type="radio" name="gender" value="MALE" onChange={inputChange} required /> Male &nbsp; &nbsp; &nbsp; &nbsp;
                        <input type="radio"  name="gender" VALUE="FEMALE" onChange={inputChange} required /> Female  &nbsp; &nbsp; &nbsp; &nbsp;
                        <input type="radio" name="gender" VALUE="OTHERS" onChange={inputChange} required /> Others  &nbsp; &nbsp; &nbsp; &nbsp;
                    </div>



{/* 
                    <div className="box terms">
                        <input type="checkbox" name="Terms" required /> &nbsp; I accept the terms and conditions
                    </div>
 */}




                    {/* <div className="box" style={{ 'background': '#2d3e3f' }} >
                        <input type="Submit" disabled={password_validation && repassword_validation ? "true" : "false" } name="Submit" className="submit" value="SUBMIT" />
                    </div> */}
                    <button  className="submit" value="submit" >Sign In</button>
                </form>
            </div>
        </>
    )
}

export default Register;
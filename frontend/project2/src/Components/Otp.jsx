import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/otp.css";

const Otp = () => {
    let navigate = useNavigate();
    const [otpDetails, setotpDetails] = useState({
        email: "",
        otp: ""
    })
    const [message,setMessage] = useState("")
    const [chances,setChances] = useState(true)

    const inputChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setotpDetails((prevalue) => {
            return{
                ...prevalue,[name]:value
            }
        })
    }

    const sendOtp = async () => {
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/auth/verify/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'email': otpDetails.email,
                'otp': otpDetails.otp
            }
        }).then((response) => {
            console.log(response.data)
            // console.log(response.status)
            if (response.data.status == 200) {
                setChances(true)
                navigate('/login')
            } else {
                setMessage("Wrong OTP")
                setChances(false)
                navigate('/otp')
            }
        }).catch((error) => {
            console.error(error.response)
        })
    }

    const submitData = (event) => {
        event.preventDefault()
        sendOtp()
        navigate("/login")
    }


    return (
        <>
            <div className="card" style={{"width": "50rem"}}>
                <div className="card-body">
                    <h5 className="card-title">OTP</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Enter OTP sent in your email</h6>
                    <form onSubmit={submitData} autoComplete="true">
                    <input type="email" required value={otpDetails.email} name="email" maxlength="50" onChange={inputChange} placeholder="Email." className="textBox" />
                    <br />
                    <input type="text" required value={otpDetails.otp} name="otp" maxlength="4" onChange={inputChange} placeholder="OTP Number" className="textBox" />
                    <br />
                    { chances != true ? <p> OTP isnt matching </p> : <p> </p> }
                    <button  className="submit" value="submit" >Submit</button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Otp;
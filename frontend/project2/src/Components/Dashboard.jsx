import { useEffect, useState } from "react"
import axios from "axios"
import { json } from "react-router-dom"

const Dashboard = () => {

    const [user,setUser] = useState([])

    const getUser = async() => {
        await axios({
            method : 'get',
            url : 'http://127.0.0.1:8000/auth/list/',
            headers : {
                "Authorization": `Bearer ${(localStorage.getItem('SavedToken'))}`
            },
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }
    
    useEffect(
        getUser()
    ,[])
    return(
        <>

        </>
    )
}


export default Dashboard;
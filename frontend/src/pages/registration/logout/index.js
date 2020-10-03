import React from "react"
import {Redirect} from 'react-router-dom'
export default function Logout(){
    localStorage.removeItem('jwt')
    localStorage.removeItem('jwt_refresh')
    return <Redirect to="/" />
}
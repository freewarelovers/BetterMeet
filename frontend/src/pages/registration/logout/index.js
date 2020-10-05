import React from "react"
import {Redirect} from 'react-router-dom'
import { apolloClient } from "../../../apolloClient"
export default function Logout(){
    localStorage.removeItem('jwt')
    localStorage.removeItem('jwt_refresh')
    localStorage.removeItem('user_id')
    apolloClient.resetStore()
    return <Redirect to="/" />
}
import React from "react"
import {Redirect} from 'react-router-dom'
import { apolloClient } from "../../../apolloClient"
export default function Logout(){
    localStorage.removeItem('jwt')
    localStorage.removeItem('jwt_refresh')
    apolloClient.resetStore()
    return <Redirect to="/" />
}
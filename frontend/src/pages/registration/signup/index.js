import React, { useEffect,useRef } from "react"
import SignupForm from "../../../components/forms/signupForm/index"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../../api/login/index'
import {Redirect,Link} from "react-router-dom"
function Signup (){
    const token = localStorage.getItem('jwt')
    let is_auth = useRef(false)
    let loading_auth = useRef( token ? true :  false)
    const [verifyAuthToken, { data,error,loading }  ] = useMutation(CHECK_AUTH_TOKEN)

    useEffect(() => {
       
        if (token){
            verifyAuthToken({variables : {
                token : token
            }}).then(res=>{
                is_auth.current = res.data.verifyToken.success
                loading_auth.current = false
            })
         }        
         else{
            is_auth.current =false
         }
    }, [verifyAuthToken,token])

    if (error) console.log(error)

    if (loading) return <div>{loading}</div>

    if (data) {
        is_auth.current = data.verifyToken.success 
        loading_auth.current = false
    }

    if(loading_auth.current===true){
        return <div>Hey im loading :/ </div>
    }

    if (is_auth.current===false){
        return(
            <div>
            <header>
            <h1>Signup</h1>
            </header>            
            <SignupForm />
            <Link to="/signin/">Already have an account create a one here</Link>
            </div>
        )
    }

    
    if (is_auth.current===true){
        return <Redirect 
        to={{pathname:"/dashboard/me",
        state:{message: "welcome "}}}
        />        
    }

}

export default Signup
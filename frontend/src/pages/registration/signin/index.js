import React, { useEffect,useRef } from "react"
import SigninForm from "../../../components/forms/signinForm/index"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../../api/login/index'
import {Redirect,Link, useLocation} from "react-router-dom"

function Signin (){
    
    const  token = localStorage.getItem('jwt')
    let is_auth = useRef(false)
    let loading_auth = useRef( token ? true :  false)
    const [verifyAuthToken, { data,error,loading }  ] = useMutation(CHECK_AUTH_TOKEN)

    let location = useLocation();
    const message = location.state  ? location.state.message : undefined

        
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
             console.log("there is no token here")
            is_auth.current = false
            loading_auth.current = false
         }
    }, [verifyAuthToken,token]);

    console.log( loading_auth.current )
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
            {message ?
               <div>{message}</div>:undefined 
            }
            <header>
            <h1>Signin</h1>
            </header>            
            <SigninForm />
            <Link to="signup/">Create new account</Link>
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

export default Signin

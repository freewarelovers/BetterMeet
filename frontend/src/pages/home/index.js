import React ,{ useEffect } from "react"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../api/login/index'
import {Redirect, Link} from "react-router-dom"


function Home (){
    const token = localStorage.getItem('jwt')
    const [checkAuthToken, { data,error,loading }  ] = useMutation(CHECK_AUTH_TOKEN) 
    let is_auth = false
    
    useEffect(() => {
       
        if (token){
            checkAuthToken({variables : {
                token : token
            }})
         }
        
    }, [token,checkAuthToken]);
    if(data){is_auth = data.verifyToken.success}
    if (error) console.log(error)
    if (loading) return <div>{loading}</div>

    if (is_auth){
        return <Redirect 
        to={{pathname:"dashboard/me",
        state:{message: ""}}}
        />        
    }
   

    
    
    return(        
    <>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Signup</Link>
       <div>HOme page)</div>
 
    </>
    )

}
export default Home
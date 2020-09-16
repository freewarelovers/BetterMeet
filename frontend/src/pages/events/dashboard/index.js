import React ,{ useEffect} from "react"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../../api/login/index'
import {Link, Redirect} from "react-router-dom"

function  Dashboard (){

    const token = localStorage.getItem('jwt')
     let is_auth = true
    const [verifyAuthToken, { data,error,loading }  ] = useMutation(CHECK_AUTH_TOKEN)

   
    useEffect( () => {
        console.log(token)
        if (token){
           verifyAuthToken({variables : {
                    token : token
                }}) 
                
            
            }  
    }, [verifyAuthToken,token]);


    if (error) console.log(error)

    if (loading) return <div>{loading}</div>
    if (data) is_auth = data.verifyToken.success

    console.log("is uath out of promise ",is_auth)
    if (is_auth===true){ 
    return(
        <>
            <Link to="/create-group">Create a new group</Link>
            <div>hey</div>
        </>
    )
    }
    if (is_auth===false){        
        return <Redirect 
        to={{pathname:"/signin",
        state:{message: "you are not logged in  try to login again"}}}
        />        
    }
   
   
    

  

      
    
}

export default Dashboard
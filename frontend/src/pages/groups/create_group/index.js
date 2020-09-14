import React ,{ useEffect } from "react"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../../api/login/index'
import {Redirect,Link} from "react-router-dom"


function CreateGroup ()  {


    const token = localStorage.getItem('jwt')

    let is_auth = false

    const [checkAuthToken, { data,error,loading }  ] = useMutation(CHECK_AUTH_TOKEN) 

    
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


    if (!is_auth){
        return <Redirect 
        to={{pathname:"/signin",
        state:{message: "you are not logged in  try to login again"}}}
        />        
    }

    return(
        <>
            <Link to="/create-group">go back to dash</Link>
            <div>helloo there lets create a new group</div>
        </>
    )

}
export default CreateGroup

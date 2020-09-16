import React ,{ useEffect } from "react"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../../api/login/index'
import {Redirect,Link} from "react-router-dom"


function CreateGroup ()  {


    const token = localStorage.getItem('jwt')
    const [checkAuthToken, { data,error,loading }  ] = useMutation(CHECK_AUTH_TOKEN)

    let is_auth = false

    useEffect(() => {
       
        if (token){
            checkAuthToken({variables : {
                token : token
            }})
         }
        
    }, [checkAuthToken, token]);


    if(data){is_auth =data.verifyToken.success}

    if (error) console.log(error)

    if (loading) return <div>{loading}</div>


    if (is_auth===false){
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

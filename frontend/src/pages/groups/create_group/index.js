import React ,{ useEffect,useRef } from "react"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../../api/login/index'
import {Redirect,Link} from "react-router-dom"


function CreateGroup ()  {

    const token = localStorage.getItem('jwt')
    let loading_auth = useRef(true)
    let is_auth =useRef(true)  
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
    }, [verifyAuthToken, token,is_auth]);


    if (error) console.log(error)

    if (loading) return <div>{loading}</div>

    if (data) {
        is_auth.current = data.verifyToken.success 
        loading_auth.current = false
    }


    if(loading_auth.current===true){
        return <div>Hey im loading :/ </div>
    }

    if (is_auth.current===true){
        return(
            <>
                <Link to="dashboard/me">go back to dash</Link>
                <div>helloo there lets create a new group</div>
            </>
        )
    }

    if (is_auth.current===false){
        return <Redirect 
        to={{pathname:"/signin",
        state:{message: "you are not logged in  try to login again"}}}
        />        
    }

   

}
export default CreateGroup

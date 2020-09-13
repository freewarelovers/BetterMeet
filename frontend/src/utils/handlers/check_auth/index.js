import React from "react"
import {useMutation } from 'react-apollo';
import { CHECK_AUTH_TOKEN} from '../../../api/login/index'

 function CheckAuth({children}){
     const token =  localStorage.getItem('jwt')
     if (token){
        const [checkAuthToken, { data,error,loading }  ] = useMutation(CHECK_AUTH_TOKEN)
        checkAuthToken({
            variables:{
                token : token
            }
        })
        console.log(data)
        return children( { data,error,loading } )
    
     }
     else{
         red
     }

     return(<>azeazeaz</>)
}


export default CheckAuth
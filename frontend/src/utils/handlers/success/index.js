import React from "react"
import {Redirect} from "react-router-dom";


export class SuccessHandler extends React.Component{


    render(){
        const data = this.props.data
        if (data.token  && this.props.auth===true){
            localStorage.setItem('jwt', data.token)
            localStorage.setItem('user_id', data.user.id)
        }
        
        return(
            <>        
            { 
                data.errors.length === 0  ?
                 
                <div>{this.props.message}</div> :undefined
            }            
            </>
        )
    }
}
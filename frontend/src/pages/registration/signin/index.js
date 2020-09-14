import React from "react"
import SigninForm from "../../../components/forms/signinForm/index"

class Signin extends React.Component{
   
    render(){
        const message = this.props.location.state  ? this.props.location.state.message : undefined
        return(
             
            <div>
            {message ?
               <div>{message}</div>:undefined 
            }
            <header>
            <h1>Signin</h1>
            </header>            
            <SigninForm />
            </div>
        )
    }
}

export default Signin

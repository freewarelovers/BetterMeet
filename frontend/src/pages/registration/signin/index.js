import React from "react"
import SigninForm from "../../../components/forms/signinForm/index"

class Signin extends React.Component{
   
    render(){
        return(
            <div>
            <header>
            <h1>Signin</h1>
            </header>            
            <SigninForm />
            </div>
        )
    }
}

export default Signin

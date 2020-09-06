import React from "react"
import SignupForm from "../../../components/forms/signupForm/index"

class Signup extends React.Component{
   
    render(){
        return(
            <div>
            <header>
            <h1>Signup</h1>
            </header>            
            <SignupForm />
            </div>
        )
    }
}

export default Signup
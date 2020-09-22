import React from "react"
import SignupForm from "../../../components/forms/signupForm/index"
import {Link} from "react-router-dom"
function Signup (){
  
        return(
            <div>

                <header>
                    <h1>Signup</h1>
                </header> 

                <SignupForm />

                <Link to="/signin/">Already have an account create a one here</Link>

            </div>
        )

}

export default Signup
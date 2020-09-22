import React from "react"
import SigninForm from "../../../components/forms/signinForm/index"
import {Link} from "react-router-dom"

function Signin (){
     
        return(             
            <div>   

                <header>
                    <h1>Signin</h1>
                </header>  

                <SigninForm />

                <Link to="signup/">Create new account</Link>
            </div>
        )
      


    }

export default Signin

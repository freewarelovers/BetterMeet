import React  from "react"
import {Link} from "react-router-dom"

function Home (){

        return(        
            <>
                <Link to="/signin">Login</Link>
                <Link to="/signup">Signup</Link>
               <div>HOme page)</div>
         
            </>
            ) 

}
export default Home
import React from "react"
import SignupForm from "../../../components/forms/signupForm/index"
import {Link} from "react-router-dom"
import { grommet } from 'grommet/themes';
import {
    Box,
    Grommet,
    Heading
    ,Header 
  } from 'grommet';
function Signup (){
  
        return(
            <>
                <Grommet theme={grommet}>

                    <Box fill align="center" justify="center">
                    <Box width="medium">
                    <Header  pad="small">
                    <Heading level={2} size="medium">
                        Signup
                    </Heading>
                    </Header> 

                    <SignupForm />

                    <Link to="/signin/">Already have an account create a one here</Link>
                    </Box>
                    </Box>
                </Grommet>

            </>
        )

}

export default Signup
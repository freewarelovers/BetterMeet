import React from "react"
import SignupForm from "../../../components/forms/signupForm/index"
import {Link} from "react-router-dom"

import {
    Box,
    Heading
    ,Header ,
    Anchor
  } from 'grommet';
function Signup (){
  
        return(
            <>
                    <Box fill align="center"    justify="center">
                    <Box width="medium">
                    <Header  pad="small">
                    <Heading level={2} size="medium">
                        Signup
                    </Heading>
                    </Header> 

                    <SignupForm />

                    <Anchor color="dark-1" gap="large"  to="/signin/">Already have an account create a one here</Anchor>
                    </Box>
                    </Box>
             

            </>
        )

}

export default Signup
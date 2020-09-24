import React from "react"
import SigninForm from "../../../components/forms/signinForm/index"
import {Link} from "react-router-dom"
import { grommet } from 'grommet/themes';
import {
    Box,
    Grommet,
    Heading,
    Header
  } from 'grommet';
function Signin (){
     
        return(             
            <Grommet theme={grommet}>

             <Box fill align="center" justify="center">
                <Box width="medium">
                <Header  pad="small">
                    <Heading level={2} size="medium">
                            Signin
                    </Heading>
                </Header>  

                <SigninForm />

                <Link to="signup/">Create new account</Link>
                </Box>
                </Box>
            </Grommet>
        )
      


    }

export default Signin

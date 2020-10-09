import React from "react"
import SigninForm from "../../../components/forms/signinForm/index"

import { GET_CURRENT_USER } from "../../../api/users/index";
import { useQuery } from "react-apollo";
import {useHistory} from "react-router-dom"
import {
    Box,
    Heading,
    Header,
    Anchor,
  } from 'grommet';
function Signin (){
        const { data, loading } = useQuery(GET_CURRENT_USER);
        let history = useHistory()
        if(loading) return <div>loading ....</div>

        let me  = data ? data.me :  undefined
        if(me) {
            
            history.push("/dashboard/me")
        }
        return(            
        

             <Box fill align="center"  pad="small" justify="center">
                <Box width="medium">
                <Header  pad="small">
                    <Heading level={2} size="medium">
                            Signin
                    </Heading>
                </Header>  

                <SigninForm />
                <Anchor color="dark-1"   to="signup/">Create new account</Anchor>
                </Box>
            </Box>
        
        )
      


    }

export default Signin

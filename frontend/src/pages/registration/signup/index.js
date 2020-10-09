import React from "react"
import SignupForm from "../../../components/forms/signupForm/index"

import { GET_CURRENT_USER } from "../../../api/users/index";
import { useQuery } from "react-apollo";
import {useHistory} from "react-router-dom"
import {
    Box,
    Heading
    ,Header ,
    Anchor
  } from 'grommet';
  
function Signup (){
        const { data, loading } = useQuery(GET_CURRENT_USER);
        let history = useHistory()
        if(loading) return <div>loading ....</div>

        let me  = data ? data.me :  undefined
        if(me) {
            
            history.push("/dashboard/me")
        }
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
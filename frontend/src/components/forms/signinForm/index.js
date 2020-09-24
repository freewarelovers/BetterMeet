import React from "react"
import {useMutation } from 'react-apollo';

import {
    Button,
    Form,
    FormField as Field,

  } from 'grommet';
import { useFormik  } from 'formik'

// me
import {LOGIN_USER} from "../../../api/login/index"
import {SigninSchema} from "./schema/index"

import {Redirect} from "react-router-dom"

import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'
// lets use this link later when we want handle errors
//import { onError } from 'apollo-link-error';

function SigninForm (){
    
    const [loginUser, { data,loading }  ] = useMutation(LOGIN_USER)
   
    
    const formik = useFormik({
        initialValues : {
            email : "",
            password : "",
        },
        validationSchema : SigninSchema,
        onSubmit :  async values => { await new Promise( 
            console.log(values),
            loginUser(
                    { variables: {
                        email : values.email,
                        password : values.password
                    }}
                ).then(data=>{
                    if(data.data.tokenAuth.success){
                        localStorage.setItem("jwt", data.data.tokenAuth.token)
                        localStorage.setItem("jwt_refresh", data.data.tokenAuth.refreshToken)
                        localStorage.setItem('user_id', data.data.tokenAuth.user.pk)
                    }
                    
                })
            )
        }
    })
     
    console.log(formik)
    if (loading) return (<p>{loading}</p>)
      
    if(data){
        if(data.tokenAuth.success){
           
            return <Redirect 
            from="/signin"
            to={{pathname:"dashboard/me",
            state:{ message:'Logged in successfuly'}}}
            />
        }
    } 
    
        return(
            <>
             
                { data ?
                (<>
                    <RegistrationErrorHandler  data ={data.tokenAuth} errors_function="nonFieldErrors" error_field="message" />
                    <RegistrationSuccessHandler data ={data.tokenAuth}  auth={true} message="successfuly authentificated you will be redirected soon" />
                </>)
                :   undefined}            
                

                
                    <Form  >
                    <label htmlFor="email">Email</label>
                    <Field
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    type="email"
                    value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ?
                    (<div>{formik.errors.email}</div>) : null}

                    <label htmlFor="password">Password</label>
                    <Field
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ?
                    (<div>{formik.errors.password}</div>) : null}
                
                    <Button primary  label="Submit" onClick={formik.handleSubmit} type="submit"></Button>
                    
                    </Form>
                    
            </>
        )

    
    
}

export default SigninForm
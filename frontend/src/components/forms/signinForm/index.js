import React from "react"
import {useMutation } from 'react-apollo';
import {LOGIN_USER} from "../../../api/login/index"
import {SigninSchema} from "./schema/index"
import { Formik, Form, Field} from 'formik'
import {Redirect} from "react-router-dom"
import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'
// lets use this link later when we want handle errors
//import { onError } from 'apollo-link-error';

function SigninForm (){
    
    const [loginUser, { data,loading }  ] = useMutation(LOGIN_USER)
   
    if (loading) return (<p>{loading}</p>)
    
    
      
    if(data){
        if(data.tokenAuth.success){
            localStorage.setItem("jwt", data.tokenAuth.token)
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
            

                <Formik
                initialValues={{
                        email : "",
                        password : "",
                }}
                validationSchema={SigninSchema}
                onSubmit ={ async values => { await new Promise( 
                    loginUser(
                                { variables: {
                                    email : values.email,
                                    password : values.password
                                }}
                            ))
                          }}
                    >
                    {({ errors, touched }) => (
                        <Form>
                        <label htmlFor="email">Email</label>
                        <Field
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        type="email"
                        />
                        {errors.email && touched.email ?
                        (<div>{errors.email}</div>) : null}

                        <label htmlFor="password">Password</label>
                        <Field
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        />
                        {errors.password && touched.password ?
                        (<div>{errors.password}</div>) : null}
                    
                        <button type="submit">Submit</button>
                        
                        </Form>)}
                   
                </Formik>
            </>
        )

    
    
}

export default SigninForm
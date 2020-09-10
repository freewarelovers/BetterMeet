import React from "react"
import {useMutation } from 'react-apollo';
import {LOGIN_USER} from "../../../api/login/index"
import {SigninSchema} from "./schema/index"
import { Formik, Form, Field} from 'formik'

import { ErrorHandler} from '../../../utils/handlers/errors/index'
import {SuccessHandler} from '../../../utils/handlers/success/index'
// lets use this link later when we want handle errors
//import { onError } from 'apollo-link-error';

function SigninForm (){
 
    const [loginUser, { data,error,loading }  ] = useMutation(LOGIN_USER)
        if (loading) return (<p>{console.log("this is a loading",loading)}</p>)

      
        return(
            <>

                { data ?
                 (<><ErrorHandler  data ={data.tokenAuth} errors_function="nonFieldErrors" error_field="message" />
                <SuccessHandler data ={data.tokenAuth}  auth={true} /></>)
                : undefined}
            

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
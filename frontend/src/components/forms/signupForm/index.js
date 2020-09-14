import React from "react"
import {useMutation } from 'react-apollo';

import {SignupSchema} from "./schema/index"
import { Formik, Form, Field} from 'formik'

import {CREATE_USER} from "../../../api/signup/index"

import {Redirect} from "react-router-dom"
import { RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import {RegistrationSuccessHandler} from '../../../utils/handlers/success/index'
// lets use this link later when we want handle errors
//import { onError } from 'apollo-link-error';

function SignupForm (){
 
    const [createUser, { data,error,loading }  ] = useMutation(CREATE_USER)


        if (error) return (
        <>{console.log("this is an error",error)}</>)
        if (loading) return (<p>{console.log("this is a loading",loading)}</p>)

        if(data){
            if(data.addMember.customUser){
                return <Redirect 
                to={{pathname:"signin" ,
                state:{ message:'User created successfuly you can login now'}}}/>
            }
        }
        
          

        return(
            <> { data ?
                (
                    <>
                        <RegistrationErrorHandler  data={data.addMember}  error_field="messages" />
                        <RegistrationSuccessHandler 
                            data={data.addMember}   
                            message='User created successfuly you will be redirected soon'                     
                        /> 
                                           
                    </>
                    
                                           
                )
                   
                :   undefined }
                
                
                
               
                <Formik
                initialValues={{
                        firstName: "",
                        lastName: "",
                        email : "",
                        password1 : "",
                        password2 : "",
                }}
                validationSchema={SignupSchema}
                onSubmit ={ async values => { await new Promise( 

                    createUser(
                                { variables: {
                                    first_name: values.firstName,
                                    last_name: values.lastName,
                                    email : values.email,
                                    password1 : values.password1,
                                    password2 : values.password2,
                                }}
                            ))
                          }}
                    >
                    {({ errors, touched }) => (
                    <Form>

                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Jane" />
                    {errors.firstName && touched.firstName ?
                    (<div>{errors.firstName}</div>) : null}

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" />
                    {errors.lastName && touched.lastName ?
                    (<div>{errors.lastName}</div>) : null}

                    <label htmlFor="email">Email</label>
                    <Field
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    type="email"
                    />
                    {errors.email && touched.email ?
                    (<div>{errors.email}</div>) : null}

                    <label htmlFor="password1">Password</label>
                    <Field
                    id="password1"
                    name="password1"
                    placeholder="password"
                    type="password"
                    />
                    {errors.password1 && touched.password1 ?
                    (<div>{errors.password1}</div>) : null}

                    <label htmlFor="password2">Password Confirmation</label>
                    <Field
                    id="password2"
                    name="password2"
                    placeholder="password confirmation"
                    type="password"
                    />
                    {errors.password2 && touched.password2 ?
                    (<div>{errors.password2}</div>) : null}
                    <button type="submit">Submit</button>
                    
                    </Form>)}
                   
                </Formik>
            </>
        )
    
}

export default SignupForm
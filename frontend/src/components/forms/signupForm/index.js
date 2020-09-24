import React from "react"
import {useMutation } from 'react-apollo';

import {SignupSchema} from "./schema/index"
import { useFormik} from 'formik'
import {
    Button,
    Form,
    FormField as Field,
  } from 'grommet';

import {CREATE_USER} from "../../../api/signup/index"

import {Redirect} from "react-router-dom"
import { RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import {RegistrationSuccessHandler} from '../../../utils/handlers/success/index'
// lets use this link later when we want handle errors
//import { onError } from 'apollo-link-error';

function SignupForm (props){
 
    const [createUser, { data,error,loading }  ] = useMutation(CREATE_USER)
   const formik  =useFormik({

        initialValues: {
                    firstName: "",
                    lastName: "",
                    email : "",
                    password1 : "",
                    password2 : "",
        },
        validationSchema: SignupSchema,
        onSubmit :  async values => { await new Promise( 

        createUser(
                    { variables: {
                        first_name: values.firstName,
                        last_name: values.lastName,
                        email : values.email,
                        password1 : values.password1,
                        password2 : values.password2,
                    }}
                ))
            }})

        if (error) return (
        <>{console.log("this is an error",error)}</>)
        if (loading) return (<p>{console.log("this is a loading",loading)}</p>)

        if(data){
            if(data.addMember.customUser){
                return <Redirect 
                to={{pathname:"/signin" ,
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
                
                
                    <Form  onSubmit={formik.handleSubmit}>

                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Jane"  onChange={formik.handleChange} />
                    {formik.errors.firstName && formik.touched.firstName ?
                    (<div>{formik.errors.firstName}</div>) : null}

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe"  onChange={formik.handleChange} />
                    {formik.errors.lastName && formik.touched.lastName ?
                    (<div>{formik.errors.lastName}</div>) : null}

                    <label htmlFor="email">Email</label>
                    <Field
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    type="email"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email ?
                    (<div>{formik.errors.email}</div>) : null}

                    <label htmlFor="password1">Password</label>
                    <Field
                    id="password1"
                    name="password1"
                    placeholder="password"
                    type="password"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.password1 && formik.touched.password1 ?
                    (<div>{formik.errors.password1}</div>) : null}

                    <label htmlFor="password2">Password Confirmation</label>
                    <Field
                    id="password2"
                    name="password2"
                    placeholder="password confirmation"
                    type="password"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.password2 && formik.touched.password2 ?
                    (<div>{formik.errors.password2}</div>) : null}

                     <Button primary label="Submit" 
                        type="submit"></Button>
                    
                    </Form>
                   
            
            </>
        )
    
}

export default SignupForm
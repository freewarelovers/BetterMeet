import React from "react"
import {useMutation } from 'react-apollo';
import {CREATE_USER} from "../../../api/signup/index"

import { Formik, Form, Field } from 'formik';



function SignupForm (){
 
    const [createUser, { data }  ] = useMutation(CREATE_USER)
        
        return(
            <>
                <Formik
                 initialValues={{
                        firstName: "",
                        lastName: "",
                        email : "",
                        password1 : "",
                        password2 : "",
                    }}
                    onSubmit ={ async values => { await new Promise( r => setTimeout(r, 500));
                            console.log(createUser())
                            alert(JSON.stringify(values, null , 2))  }}
                    >

                    <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Jane" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" />

                    <label htmlFor="email">Email</label>
                    <Field
                    id="email"
                    name="email"
                    placeholder="jane@acme.com"
                    type="email"
                    />

                    <label htmlFor="password1">Password</label>
                    <Field
                    id="password1"
                    name="password1"
                    placeholder="jane@acme.com"
                    type="password"
                    />

                    <label htmlFor="password2">Password Confirmation</label>
                    <Field
                    id="password2"
                    name="password2"
                    placeholder="jane@acme.com"
                    type="password"
                    />
                    <button type="submit">Submit</button>
                    </Form>
                   
                </Formik>
            </>
        )
    
}

export default SignupForm
import React from "react"
import {CREATE_COMMUNITY} from "../../../api/communitys/index"
import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'
import { Formik, Form, Field} from 'formik'
import {useMutation } from 'react-apollo';
import {CreateGroupSchema} from "./schema/index"

export default function CreateCommunityForm(){

    const [createCommunity, { data,loading }  ] = useMutation(CREATE_COMMUNITY)

    if (loading) return (<p>{loading}</p>)
    if (data) {
        console.log(data)
    }
    return (
        <>
        { data ?
            (<>
            <RegistrationErrorHandler  data ={data.addCommunity} errors_function="nonFieldErrors" error_field="message" />
                <RegistrationSuccessHandler data ={data.addCommunity}  auth={false} message="successfuly authentificated you will be redirected soon" />
            </>)
            :   undefined}

        <Formik
            initialValues={{
                    name: "",
            }}
            validationSchema={CreateGroupSchema}
            onSubmit ={ async values => { await new Promise( 
                createCommunity(
                            { variables: {
                                name : values.name,
                            }}
                        ))
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="community">Community</label>

                        <Field
                            id="community"
                            name="community"
                            placeholder="your community name"
                            type="text"
                        />
                        {errors.community && touched.community ?
                        (<div>{errors.community}</div>) : null}

                        <button type="submit">Submit</button>                    
                    </Form>)}
           
        </Formik>
        </>
    )
}
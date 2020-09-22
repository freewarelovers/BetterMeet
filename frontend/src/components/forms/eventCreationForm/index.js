import React from "react"
import {CreateEventSchema} from "./schema/index"
import {CREATE_EVENT} from "../../../api/events/index"
import { Field, Form, Formik } from "formik"
import {useMutation } from 'react-apollo';
import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'

export default function EventCreationForm(){
    const eventCreator = 1
    const [createEvent, { data,loading, error}  ] = useMutation(CREATE_EVENT)
    if (error)  console.log(error)
    if (loading) return (<p>{loading}</p>)
    return(
        <>
        { data ?
            (<>
                <RegistrationErrorHandler  data={data.addCommunityEvent}  error_field="messages" />
                <RegistrationSuccessHandler 
                    data={data.addCommunityEvent}   
                    message='Community created successfuly you will be redirected soon'                     
                />                                            
            </>)
            :   undefined}

        <Formik
            initialValues={{
                name: "",
                description: "",
                position: "",
                startAt: "",
            }}
            validationSchema={CreateEventSchema}
            onSubmit ={ async values =>{
                await new Promise(
                    createEvent(
                        {variables : {
                            name : values.name,
                            eventCreator : eventCreator,
                            description : values.description,
                            position : values.position,
                            startAt : values.startAt
                        }}
                    )
                )
            }}>
             {({ errors, touched }) => (
                <Form>

                    <label htmlFor="name"></label>
                    <Field
                            id="name"
                            name="name"
                            placeholder="your event name"
                            type="text"
                    />
                    {errors.name && touched.name ?
                    (<div>{errors.name}</div>) : null}

                    <label htmlFor="description"></label>
                    <Field
                            id="description"
                            name="description"
                            placeholder="your event description"
                            component='textarea'
                    />
                    {errors.description && touched.description ?
                    (<div>{errors.description}</div>) : null}

                    <label htmlFor="position"></label>
                    <Field
                            id="position"
                            name="position"
                            placeholder="your event position"
                    />
                    {errors.position && touched.position ?
                    (<div>{errors.position}</div>) : null}

                    <label htmlFor="startAt"></label>
                    <Field
                            id="startAt"
                            name="startAt"
                            placeholder="your event start at"
                            component="date"
                    />
                    {errors.startAt && touched.startAt ?
                    (<div>{errors.startAt}</div>) : null}

                    <button type="submit">Submit</button>
                </Form>)}
             
        </Formik>
        </>
        
    )
}
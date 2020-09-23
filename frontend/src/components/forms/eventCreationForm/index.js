import React,{useState} from "react"

import {CreateEventSchema} from "./schema/index"

import {useHistory, useRouteMatch } from "react-router-dom"

import {CREATE_EVENT} from "../../../api/events/index"
import moment from "moment"
import {useMutation } from 'react-apollo';

import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'

import DatePicker from "react-datepicker"
 
import { Field, Form, Formik } from "formik"

import "react-datepicker/dist/react-datepicker.css"

export default function EventCreationForm(){
    const eventCreator = 1
    const [createEvent, { data,loading, error}  ] = useMutation(CREATE_EVENT)
    const [date , setDate] = useState( new Date() )
    const history = useHistory();
    const match  = useRouteMatch()

    if (error)  console.log(error)
    if (loading) return (<p>{loading}</p>)
    return(
        <>
        { data ?
            (<>
                <RegistrationErrorHandler  data={data.addEvent}  error_field="messages" />
                <RegistrationSuccessHandler 
                    data={data.addEvent}   
                    message='Event created successfuly you will be redirected soon'                     
                />                                            
            </>)
            :   undefined}

        <Formik
            initialValues={{
                name: "",
                description: "",
                position: "",
                startAt: date,
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
                            startAt :moment(values.startAt).format("YYYY-MM-DD") 
                        }}
                    ).then(data=>{
                        if(data.data.addEvent.errors.length < 1){
                            let event_slug = data.data.addEvent.event.slug
                            let community_slug = match.params.slug
                            history.push(`communitys/${community_slug}/events/${event_slug}`)
                        }
                    })
                )
            }}>
             {({ errors, touched,setFieldValue}) => (
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
                    <DatePicker
                        id="startAt"
                        name="startAt"
                        selected=  {date}
                        onChange = {date=>{
                            let newdate = moment(date).format("YYYY-MM-DD")
                            setDate(date)
                            setFieldValue('startAt',newdate)
                        }}
                    />    

                    {errors.startAt && touched.startAt ?
                    (<div>{errors.startAt}</div>) : null}

                    <button type="submit">Submit</button>
                </Form>)}
             
        </Formik>
        </>
        
    )
}
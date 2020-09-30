import React,{useState} from "react"

import {CreateEventSchema} from "./schema/index"

import {useHistory, useRouteMatch } from "react-router-dom"

import {CREATE_EVENT} from "../../../api/events/index"
import moment from "moment"
import {useMutation } from 'react-apollo';

import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'

import DatePicker from "react-datepicker"
import { useFormik  } from 'formik'
import {
    Button,
    Form,
    FormField as Field,
  } from 'grommet';
import "react-datepicker/dist/react-datepicker.css"

export default function EventCreationForm(props){
    const [user_id]=  useState(props.current_user)
    const [createEvent, { data,loading, error}  ] = useMutation(CREATE_EVENT)
    const [date , setDate] = useState( new Date() )
    const history = useHistory();
    const match  = useRouteMatch()
    
    const formik =   useFormik({
        initialValues:{
        name: "",
        description: "",
        position: "",
        startAt: date,
        },
    validationSchema : CreateEventSchema,
    onSubmit : async values =>{
        await new Promise(
            createEvent(
                {variables : {
                    name : values.name,
                    eventCreator : user_id,
                    description : values.description,
                    position : values.position,
                    startAt :moment(values.startAt).format("YYYY-MM-DD") 
                }}
            ).then(data=>{
                if(data.data.addEvent.errors.length < 1){
                    let event_id= data.data.addEvent.event.id
                    let community_slug = match.params.slug
                    history.push(`/communities/${community_slug}/event/${event_id}`)
                }
            })
        )
    }})
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

                <Form>

                    <label htmlFor="name"></label>
                    <Field
                            id="name"
                            name="name"
                            placeholder="your event name"
                            type="text"
                            onChange={formik.handleChange}
                    />
                    { formik.errors.name && formik.touched.name ?
                    (<div>{formik.errors.name}</div>) : null}

                    <label htmlFor="description"></label>
                    <Field
                            id="description"
                            name="description"
                            placeholder="your event description"
                            onChange={formik.handleChange}
                    />
                    {formik.errors.description && formik.touched.description ?
                    (<div>{formik.errors.description}</div>) : null}

                    <label htmlFor="position"></label>
                    <Field
                            id="position"
                            name="position"
                            placeholder="your event position"
                            onChange={formik.handleChange}
                    />
                    {formik.errors.position && formik.touched.position ?
                    (<div>{formik.errors.position}</div>) : null}

                    <label htmlFor="startAt"></label>
                    <DatePicker
                        id="startAt"
                        name="startAt"
                        selected=  {date}

                        onChange = {date=>{
                            let newdate = moment(date).format("YYYY-MM-DD")
                            setDate(date)
                            formik.setFieldValue('startAt',newdate)
                        }}
                    />    
                    <br></br>
                    {formik.errors.startAt && formik.touched.startAt ?
                    (<div>{formik.errors.startAt}</div>) : null}

                    <Button 
                        primary  
                        color="dark-1" 
                        label="Submit"
                        onClick={formik.handleSubmit} 
                        type="submit">                        
                    </Button> 
                </Form>
        </>
        
    )
}
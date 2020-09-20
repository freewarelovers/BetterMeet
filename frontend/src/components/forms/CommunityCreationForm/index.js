import React,  {useState} from "react"
import {CREATE_COMMUNITY,CREATE_COMMUNITY_OWNER} from "../../../api/communitys/index"
import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'
import { Formik, Form, Field} from 'formik'
import {useMutation } from 'react-apollo';
import {CreateGroupSchema} from "./schema/index"

export default function CreateCommunityForm(){
    const [user_id, setUSerId]=   useState(localStorage.getItem('user_id'))
    const [createCommunity, { data,loading, error}  ] = useMutation(CREATE_COMMUNITY)
    const [createCommunityOwner, {}] = useMutation(CREATE_COMMUNITY_OWNER)
    if (error)  console.log(error)
    if (loading) return (<p>{loading}</p>)
   
    return (
        <>
        { data ?
            ( <>
                        <RegistrationErrorHandler  data={data.addCommunity}  error_field="messages" />
                        <RegistrationSuccessHandler 
                            data={data.addCommunity}   
                            message='Community created successfuly you will be redirected soon'                     
                        /> 
                                           
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
                        ).then((data)=>{
                            console.log(data)
                            if(data.data.addCommunity.errors.length < 1){
                                
                                console.log(createCommunityOwner(
                                    { variables: {
                                        community : data.data.addCommunity.community.id,
                                        owner : user_id
                                     }}
                                ))
                            }                                
                        }))
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="name">Community</label>

                        <Field
                            id="name"
                            name="name"
                            placeholder="your community name"
                            type="text"
                        />
                        {errors.name && touched.name ?
                        (<div>{errors.name}</div>) : null}

                        <button type="submit">Submit</button>                    
                    </Form>)}
           
        </Formik>
        </>
    )
}
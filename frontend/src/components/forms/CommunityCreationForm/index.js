import React,  {useState} from "react"
import {CREATE_COMMUNITY,CREATE_COMMUNITY_OWNER} from "../../../api/communitys/index"
import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'
import { Formik, Form, Field} from 'formik'
import {useMutation } from 'react-apollo';
import {CreateGroupSchema} from "./schema/index"
import {useHistory } from "react-router-dom"

export default function CreateCommunityForm(){
    const history = useHistory();
  

    const [user_id]=  useState(localStorage.getItem('user_id'))
    const [createCommunity, { data,loading, error}  ] = useMutation(CREATE_COMMUNITY)
    const [createCommunityOwner] = useMutation(CREATE_COMMUNITY_OWNER)
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
                        
                            if(data.data.addCommunity.errors.length < 1){
                                let community =data.data.addCommunity.community.id
                              createCommunityOwner(
                                    { variables: {
                                        community : community,
                                        owner : user_id
                                     }}
                                ).then(data=>{
                                    if(data.data.addOwnerToCommunity.errors.length<1){
                                        history.push(`community/${community}`)
                                    }
                                }

                                )
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
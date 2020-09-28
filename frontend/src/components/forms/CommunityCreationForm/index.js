import React,  {useState} from "react"
import {CREATE_COMMUNITY, CREATE_COMMUNITY_OWNER} from "../../../api/communitys/index"

import {  RegistrationErrorHandler} from '../../../utils/handlers/errors/index'
import { RegistrationSuccessHandler} from '../../../utils/handlers/success/index'

import {useMutation } from 'react-apollo';
import {CreateGroupSchema} from "./schema/index"
import {useHistory } from "react-router-dom"
import { useFormik  } from 'formik'

import {
    Button,
    Form,
    FormField as Field,
  } from 'grommet';

export default function CreateCommunityForm(props){
    const history = useHistory();
  

    const [user_id]=  useState(props.current_user)
 
    const [createCommunity, { data,loading, error}  ] = useMutation(CREATE_COMMUNITY)
    const [createCommunityOwner] = useMutation(CREATE_COMMUNITY_OWNER)
    
    const formik = useFormik({
        initialValues : {
            name : "",
        },
        validationSchema:CreateGroupSchema,
        onSubmit : async values => { await new Promise( 

            createCommunity(
                        { variables: {
                            name : values.name,
                        }}
                    ).then((data)=>{
                    
                        if(data.data.addCommunity.errors.length < 1){
                            let id =data.data.addCommunity.community.id
                            let slug =data.data.addCommunity.community.slug
                          createCommunityOwner(
                                { variables: {
                                    community : id,
                                    owner : user_id
                                 }}
                            ).then(data=>{
                                if(data.data.addOwnerToCommunity.errors.length<1){
                                    history.push(`communitys/${slug}`)
                                }
                            }

                            )
                        }                                
                    }))
                }
    })
     
    if (error)  console.log(error)
    if (loading ) return (<p>{loading}</p>)

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
  
           
               
                    <Form>
                        <label htmlFor="name">Community</label>

                        <Field
                            id="name"
                            name="name"
                            placeholder="your community name"
                            type="text"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.name && formik.touched.name ?
                        (<div>{formik.errors.name}</div>) : null}

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
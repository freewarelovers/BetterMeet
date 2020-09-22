import React from "react"
//import queryString from "query-string"
//import {useRouteMatch} from "react-router-dom"
import  EventCreationForm from "../../../components/forms/eventCreationForm/index"

export default function CommunityPage (){

    //const location = useRouteMatch();
    //console.log(location.params.pk)
    return(
        <>
        <div>Welcome to group </div>
        <EventCreationForm />
        </>
    )
}
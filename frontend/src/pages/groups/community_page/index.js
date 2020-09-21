import React from "react"
//import queryString from "query-string"
import {useRouteMatch} from "react-router-dom"
export default function CommunityPage (){

    const location = useRouteMatch();
    //console.log(location.params.pk)
    return(
        <div>Welcome to group </div>
    )
}
import React  from "react"

import {Link} from "react-router-dom"

import {useQuery} from  "react-apollo"

import { ALL_EVENTS } from "../../../api/events/index"




function  Dashboard (){
    const { loading, error, data } = useQuery(ALL_EVENTS);
    if(data) console.log(data)
    if (loading) return <div>Loading</div>
    if(error) console.log(error)
    return(
        <>
      
            <Link to="/create-community">Create a new community</Link>
            <div>hey</div>
            {data ? 
                data.allEvents.map(element=>(
                    <Link to={`/event/${element.id}`}>{element.name} by {element.eventCreator.community.name}</Link>
                ))
            : <div>Loading...</div>}

        </>
    )

}

export default Dashboard
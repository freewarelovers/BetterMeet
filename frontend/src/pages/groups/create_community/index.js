import React  from "react"
import {Link  } from "react-router-dom"
import CreateCommunityForm  from "../../../components/forms/CommunityCreationForm/index"
function CreateCommunity ()  {
   

        return(
            <>
                <Link to="dashboard/me">go back to dash</Link>
                <div>helloo there lets create a new group</div>
                <CreateCommunityForm /> 
            </>
        )



   

}
export default CreateCommunity

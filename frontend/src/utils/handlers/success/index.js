import React from "react"

export class SuccessHandler extends React.Component{


    render(){
        const data = this.props.data
        return(
            <>
        
            { data.errors.length==0 ? 
                <div>request success</div> : <>errors</>}
            
            </>
        )
    }
}
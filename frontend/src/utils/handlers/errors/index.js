import React from "react"

export class  ErrorHandler extends React.Component{
    render(){
       const data =  this.props.data
    
        if (this.props.errors_function){
            return(
                <ul>
            
                { 
                    data.errors ? data.errors[this.props.errors_function].map(
                        element=>(
                            <li>{element.message}</li>
                        ))  
                    : undefined                    
                }
                </ul>
            )
        }
        else{
            return(
            <ul>
            
            { data.errors ? data.errors.map(element=>(
                element[this.props.error_field].map(element=>(
                    <li>{element}</li>
                ))
            ))  
                : undefined }
            </ul>  
            )
        }
     
    }
       
    
}
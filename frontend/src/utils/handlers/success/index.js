import React from "react"

export class SuccessHandler extends React.Component{


    render(){
        const data = this.props.data
        if (data.token  && this.props.auth===true){
            localStorage.setItem('jwt', data.token)
        }
        return(
            <>        
            { 
                !data.errors  ? 
                <div>request success</div> : <>errors</>
            }            
            </>
        )
    }
}
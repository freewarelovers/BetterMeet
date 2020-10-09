import React from "react"



export class  RegistrationSuccessHandler extends React.Component{


    render(){
        const data = this.props.data
        console.log(data)
        console.log(this.props.auth)
        if (data.token  && this.props.auth===true){
            console.log(data)
            localStorage.setItem('jwt', data.token)
            localStorage.setItem('user_id', data.user.id)
        }
        
        return(
            <>        
            { 
                data.errors.length === 0  ?
                 
                <div>{this.props.message}</div> :undefined
            }            
            </>
        )
    }
}
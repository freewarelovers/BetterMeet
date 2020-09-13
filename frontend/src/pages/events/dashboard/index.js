import React from "react"


class Dashboard extends React.Component{



    render(){
        return(
            <div>{this.props.location.state.message}</div>
        )
    }
}

export default Dashboard
import React from "react"
import { Progress } from 'antd';

class SchoolResponce extends React.Component{
    constructor(props){
        super(props);
    
    }
    state = {
        error: null,
        isLoaded: false,
        school: []
    }

    componentDidMount() {
        fetch("/where")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    school: result.school  

                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render(){
        return (
        <div>
            <div>
                <center>
    <Progress percent={30} />
    </center>
  </div>
        </div>
        );

    }


}
export default SchoolResponce;
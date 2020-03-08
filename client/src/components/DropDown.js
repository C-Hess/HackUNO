import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import React from "react";
import cloud from "../cloud.jpeg";
import { Select, Row, Col } from 'antd';
import "antd/dist/antd.css";
import  {Link, RouteComponentProps} from "react-router-dom";
import '../App.css';
import { DatePicker } from 'antd';

const { Option } = Select;

class DropDown extends React.Component {
    constructor(props){
        super(props);
    }
    state = {
        error: null,
        isLoaded: false,
        school: []
    }
    componentDidMount() {
        fetch(`localhost:5000/where`)
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

 onChange(date, dateString) {
    console.log(date, dateString);
  }
    
handleChange = (value)  => {
  this.props.history.push(`/schoolResponce/${value}`);
}

    render(){
        //if(error) {
          //  return <div> <h1> ERROR </h1> </div>;
           // console.log(error);
         if(!this.state.isLoaded){
           return <div><h1> LOADING! </h1> </div>
        }else {
      //  const options = this.state.school.map((x,i) => {
        //    <Option value={x} key={i}>{x}</Option>
        //});
        console.log(this.state.school)
        return( 
            
            <div className="background">
                    <Row style={{width: "100%", height: "100%"}} type="flex" justify="center" align="middle">
                    <Col>
                    <Select onChange={this.handleChange} defaultValue="SELECT SCHOOL" style={{ width: 1200 }} allowClear>
                <Option value="des moines">des moines</Option>

            </Select>
            <div>
    <DatePicker onChange={this.onChange} />
    <DatePicker onChange={this.onChange} picker="week" />
    <DatePicker onChange={this.onChange} picker="month" />
    <DatePicker onChange={this.onChange} picker="year" />
  </div>
                    </Col>

            </Row>
        </div>);
       }
    }
}




/* ReactDOM.render(
  <div id="components-dropdown-demo-dropdown-button">
    <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button overlay={menu} icon={<UserOutlined />}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button onClick={handleButtonClick} overlay={menu} disabled>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      overlay={menu}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip" key="leftButton">
          {leftButton}
        </Tooltip>,
        rightButton,
      ]}
    >
      With Tooltip
    </Dropdown.Button>
    <Dropdown overlay={menu}>
      <Button>
        Button <DownOutlined />
      </Button>
    </Dropdown>
  </div>,
  mountNode,
); */
export default DropDown;
import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import React from "react"
import { Select } from 'antd';
import "antd/dist/antd.css";
const { Option } = Select;

class DropDown extends React.Component {
    constructor(){
        super();
        this.state = {
            error:null,
            isload: false,
            school : []
        }

    }
    componentDidMount(){
        fetch("http://localhost:5000/").then(res => res.json()).then(
            (result) => {
                this.state({
                    isload : true,
                    school : result.school  

                });
            },
            (error) => {
                this.setState({
                    isload:true,
                    error
                })
            }
        )
    }
    
handleChange = (value)  => {
  console.log(`selected ${value}`);
}

    render(){
        const { error, isLoaded, school } = this.state;
        if(error) {
            return <div> <h1> ERROR </h1> </div>;
            console.log(error);
        }else if(!isLoaded){
           return <div><h1> LOADING! </h1> </div>
        }else {
       return( 
        
        <div>
            <center>
        <Select defaultValue="SELECT SCHOOL" style={{ width: 500 }} allowClear>
            <Option value="lucy">Lucy</Option>
        </Select>
        </center>
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
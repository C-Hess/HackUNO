import React from 'react';
import logo from './logo.svg';
import './App.css';
import DropDown from "./components/DropDown";
import DROPDOWN from "./components/DropDown2";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import SchoolResponce from "./components/SchoolResponce"



function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
            <Route path="/"  exact component={DropDown}/>
            <Route path="/schoolResponce/:id" exact component={SchoolResponce}/>
        </Switch>
      </BrowserRouter>
  </div>);
}

export default App;

import { useEffect, useState } from "react";
import React  from 'react';
import './header.css';
import { getValue } from "@testing-library/user-event/dist/utils";


//import './Timereports.tsx'

function getIndex() {
  //localStorage.setItem("person", "JErm");
  //localStorage.getItem("person");
  //document.getElementById("user").innerText = localStorage.getItem("person");
 
  //localStorage.getItem("person")
  //console.log(localStorage.getItem("person"));
}

interface Person {
    Users: string;
}

const Header = (props:any) => {
    const [list, setList] = useState<Person[]>([]);
    useEffect(() =>{
        fetch('http://localhost:8000/person')
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          setList(response)
        })
      }, []);
    return (
      <header>
          <h1>USERS</h1>
        <div>
         <select onChange={props.onChange}>
          {list.map((row, idx) => {
            return (
              <option key={idx} >
                {row.Users}
              </option>
            )
          })}
         
        </select> 
        <button onClick={getIndex} >LOGIN</button>
        </div>
      </header>
    )
  }
  
  export default Header
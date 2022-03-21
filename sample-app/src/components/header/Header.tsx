import { useEffect, useState } from "react";
import React  from 'react';
import './header.css';

interface Person {
    Users: string;
}

const Header = () => {
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
         <select>
          {list.map((row, idx) => {
            return (
              <option key={idx}>
                {row.Users}
              </option>
            )
          })}
         
        </select> 
        <button>LOGIN</button>
        </div>
      </header>
    )
  }
  
  export default Header
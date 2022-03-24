import React, { useEffect, useState } from "react";
import './header.css';
import { getValue } from "@testing-library/user-event/dist/utils";


interface Person {
    Users: string;
}


const Header = (props : any) => {
    const [isPending, setIsPending] = useState(true);
    const [list, setList] = useState<Person[]>([]);
    useEffect(() =>{
      setTimeout(() =>{
        fetch('http://localhost:8000/person')
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          setList(response)
        });
        setIsPending(false);
      },3000 );
      },[]);
      
      return (
        <header>
            <h1>USERS</h1>
          <div>
           <select onChange={props.onChange}>
             <option>*************</option>
            {list.map((row, idx) => {
              return (
                <option key={idx} >
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
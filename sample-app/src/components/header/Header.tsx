import { useEffect, useState } from "react";
import './header.css';

export interface Person {
    Users: string;
    Id: string;
}
const Header = (props : any) => {
    const [isPending, setIsPending] = useState(true);
    const [list, setList] = useState<Person[]>([]);
    useEffect(() =>{
      setTimeout(() =>{
        fetch('http://localhost:8000/person')
        .then((response) => response.json())
        .then((response) => {
          //console.log(response)
          setList(response)
        });
        setIsPending(false);
      },3000 );
      },[]);
      
      return (
        <header>
            <h1>USERS</h1>
          <div>
            <label htmlFor="users">Select user: </label>
           <select id="users" onChange={props.onChange}>
             <option>*************</option>
            {list.map((row, idx) => {
              return (
                <option key={idx} >
                  {row.Users}
                </option>
              )
            })}
           
          </select> 
          </div>
        </header>
      )
    }
    
export default Header
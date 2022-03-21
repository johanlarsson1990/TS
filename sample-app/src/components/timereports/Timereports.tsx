import {useState, useEffect} from 'react';
import { selectedUser } from '../header/Header';

let user = "Malin";
let project = "Project";

const Timereport = () => {
    
    const timereportForm = {
        // DatePicker: function DatePicker() {
          
          
        // }
      }
      return (
        <header>
            <h1>Time Reports</h1>
            <form>
                <label htmlFor="date">Choose date: </label>             
                <input type="date" id="date"></input>
                <br></br>

                <label htmlFor="user">User: </label>             
                <input type="text" id="user" value={selectedUser} disabled ></input>
                <br></br>

                <label htmlFor="project">Project: </label>             
                <input type="text" id="project" value={project} disabled ></input>
                <br></br>

                <label htmlFor="note">Add note: </label>             
                <input type="text" id="note"></input>
                <br></br>
                
                <button>SUBMIT TIMEREPORT</button>

            </form>
            
        </header>
        
        
        )

}

export default Timereport


import {useState, useEffect} from 'react';
// import DatePicker from "react-datepicker";

const Timereport = () => {
    
    const MyComponents = {
        DatePicker: function DatePicker() {
          
          //<div>Imagine a {props.color} datepicker here.</div>;
        }
      }
      return (
        <header>
            <h1>Timereports</h1>
            <div>  
            <label htmlFor="date">Chose date:</label>             
             <input type="date" id="date"></input>
             
          </div>
          <div>
              <h3>User:</h3>
          </div>
          <div>
              <h3>Project: </h3>
          </div>
          <div>
          <label htmlFor="note">Add note:</label>             
             <input type="text" id="note"></input>
          </div>
          <button>SUBMIT TIMEREPORT</button>
        </header>
        
        
        )

}

export default Timereport


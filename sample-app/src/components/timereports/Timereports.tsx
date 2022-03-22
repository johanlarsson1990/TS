import {useState, useEffect} from 'react';


let project = "";

const Timereport = (props:any) => {
    
    const {selectedUser} = props;
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
                <input type="text" id="user" value={selectedUser || ""} disabled ></input>
                <br></br>

                <label htmlFor="project">Project: </label>             
                <input type="text" id="project" value={project} disabled ></input>
                <br></br>

                <label htmlFor="note">Add note: </label>             
                <input type="text" id="note"></input>
                <br></br>
            </form>
            <button>SUBMIT TIMEREPORT</button>
        </header>
        
        
        )

}

export default Timereport


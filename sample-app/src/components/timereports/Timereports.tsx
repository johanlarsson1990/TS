import React, {useState, useEffect} from 'react';
import {Proj} from "../projects/Projects"
import {Person} from "../header/Header"

const Timereport = (props:any) => {
    
  const {selectedUser} = props;
  const [activeProjects, setActiveProjects] = useState<Proj[]>([]);
  const [date, setDate] = useState("")
  const [hours, setHours] = useState("")
  const [note, setNote] = useState("")

  useEffect(() =>{
      fetch('http://localhost:8000/proj')
      .then((response) => response.json())
      .then((response) => {
        setActiveProjects(response)
      })
   }, []);
      
  const [list, setList] = useState<Person[]>([]);
  useEffect(() =>{
    fetch('http://localhost:8000/person')
      .then((response) => response.json())
      .then((response) => {
        setList(response)
      });
   },[]);
      
      function SubmitFormToNotion(){
        try{
          let user = getId()
          fetch('http://localhost:4000/submitFormToNotion', {
            method: "post",
            headers: {
              "Accept" : "application/json",
              "Content-type" : "application/json"
            },
            body: JSON.stringify({
              user: user,
              date: date,
              project: activeProjects[0].Id,
              hours: hours,
              note: note
            }), 
          })
          .then(response => response.json())
          .then(data => { console.log("success" + data) })

        }catch(error){ console.log("Error: " + error) }
      }
      function getId(){
        for(let i = 0; i < list.length; i++){
          if(list[i].Users === selectedUser){
            return list[i].Id
          }
        }
      }
    
      return (
        <header>
            <h1>Time Reports</h1>
            <form>
                <label htmlFor="date">Choose date: </label>             
                <input type="date" id="date" onChange={(e) => setDate(e.target.value)} required></input>
                <br></br>

                <label htmlFor="user">User: </label>             
                <input type="text" id="user" value={selectedUser || ""} disabled ></input>
                <br></br>

                <label htmlFor="hours">Add hours: </label>             
                <input type="number" id="hours" onChange={(e) => setHours(e.target.value)} required></input>
                <br></br>

                <label htmlFor="project">Project: </label>
                <select id="project">
                    {activeProjects.map((row, idx) => {
                    return (
                    <option key={idx} value={row.Id} >
                    {row.Project}
                    </option>
                    )
                    })}
                    </select>   
                <br></br>

                <label htmlFor="note">Add note: </label>             
                <input type="text" id="note" onChange={(e) => setNote(e.target.value)} required></input>
                <br></br>
                <button type="submit" onClick={SubmitFormToNotion}>SUBMIT TIMEREPORT</button>
                
            </form>
            
        </header>
      )
}


export default Timereport
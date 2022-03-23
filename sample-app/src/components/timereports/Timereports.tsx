import {useState, useEffect} from 'react';

interface Proj {
  Project: string;
}

const Timereport = (props:any) => {
    
    const {selectedUser} = props;
    const [activeProjects, setActiveProjects] = useState<Proj[]>([]);

    useEffect(() =>{
        fetch('http://localhost:8000/proj')
        .then((response) => response.json())
        .then((response) => {
          setActiveProjects(response)
        })
      }, []);
    
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
                <select id="project">
                    {activeProjects.map((row, idx) => {
                    return (
                    <option key={idx} >
                    {row.Project}
                    </option>
                    )
                    })}
                    </select>   
                <br></br>

                <label htmlFor="hours">Add hours: </label>             
                <input type="number" id="hours"></input>
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


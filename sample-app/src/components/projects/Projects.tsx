import {useState, useEffect} from 'react';
import './projects.css';

export interface Proj {
    Project: string;
    Status: any;
    Hours: number;
    Id: string;
}
interface allProjects {
    allProjects: string;
    everyStatus: any;
    totalHours: number;
    workedHours: number;
    hoursLeft: number;
}
const Projects = () => {

    const [allProjlist, setAllProjlist] = useState<allProjects[]>([]);
    const [list, setList] = useState<Proj[]>([]);
    useEffect(() =>{
        fetch('http://localhost:8000/proj')
        .then((response) => response.json())
        .then((response) => {
          setList(response)
        })
      }, []);

    return (
      <header>
          <h1>PROJECTS</h1>
          <table>
              <tbody>
                  <tr>
                      <td>Projectname:</td>
                      {list.map((active, idx) => {
                          return (<td key={idx}>{active.Project}</td>)
                      })}
                  </tr>
                  <tr>
                      <td>Status:</td>
                      {list.map((active, idx) => {
                          return (<td key={idx}>{active.Status}</td>)
                      })}
                  </tr>
                  <tr>
                      <td>Hours:</td>
                      {list.map((active, idx) => {
                          return (<td key={idx}>{active.Hours}</td>)
                      })}
                  </tr>
              </tbody>
          </table>
        <div>
         <button    className='btn btn-primary'
                    type="button"
                    onClick={() => {
                    fetch("http://localhost:8000/allproj")
                        .then((response) => response.json())
                        .then((payload) => {
                        // Set the React state with the array response
                        setAllProjlist(payload);
                        });
                    }}
                >
                    <p className='btn_text'>FETCH ALL PROJECTS</p>
        </button>
         <table>
             <tbody>
                 <tr>
                     <td>Projectname</td>
                     {allProjlist.map((title, idx) => {
                         return ( <td key={idx}>{title.allProjects}</td>)
                     })}
                 </tr>
                 <tr>
                     <td>Status</td>
                 {allProjlist.map((state, idx) => {
                         return ( <td key={idx}>{state.everyStatus}</td>)
                     })}
                 </tr>
                 <tr>
                     <td>Worked hours</td>
                 {allProjlist.map((hour, idx) => {
                         return ( <td key={idx}>{hour.workedHours}</td>)
                     })}
                 </tr>
                 <tr>
                     <td>Hours left</td>
                 {allProjlist.map((hour, idx) => {
                         return ( <td key={idx}>{hour.hoursLeft}</td>)
                     })}
                 </tr>
                 <tr>
                     <td>Total hours</td>
                 {allProjlist.map((hour, idx) => {
                         return ( <td key={idx}>{hour.totalHours}</td>)
                     })}
                 </tr>
            </tbody>
         </table>
        </div>
      </header>
    )
  }
  
  export default Projects
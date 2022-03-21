import {useState, useEffect} from 'react';
import './projects.css';
import React from 'react';
import Tables from './Tables'

interface Proj {
    Project: string;
}

const Header = () => {

    const [list, setList] = useState<Proj[]>([]);
    useEffect(() =>{
        fetch('http://localhost:8000/proj')
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          setList(response)
        })
      }, []);

    return (
      <header>
          <h1>Projects</h1>
          <button
        type="button"
        onClick={() => {
          fetch("http://localhost:8000/proj")
            .then((response) => response.json())
            .then((payload) => {
              // Set the React state with the array response
              setList(payload);
            });
        }}
      >
        Fetch List of Projects
      </button>
        <div>
         <Tables />
        </div>
      </header>
    )
  }
  
  export default Header
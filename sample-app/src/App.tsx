import React,{useState} from 'react';
import Header from './components/header/Header';
import Projects from './components/projects/Projects';
import Timereport  from './components/timereports/Timereports';

export const App = () => {
  const [selectedUser,setSelectedUser] = useState();
  const handleChange = (e: any) => 
  {
    setSelectedUser(e.target.value)
   
  }
  return (
    <>
        <Header onChange={handleChange} />
        <Projects /> 
        <Timereport selectedUser={selectedUser} />    
    </>
  )
}

export default App;
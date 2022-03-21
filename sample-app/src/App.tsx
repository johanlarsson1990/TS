import React from 'react';
import Header from './components/header/Header';
import Projects from './components/projects/Projects';
import Timereport  from './components/timereports/Timereports';

export const App = () => {
  return (
    <>
        <Header />
        <Projects /> 
        <Timereport />    
    </>
  )
}

export default App;
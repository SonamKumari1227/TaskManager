import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Index from './components/Index';
import TodoApp from './components/TodoApp';


const App = () => {
  const [data, setdata] = useState("");

  const DataFromServer = async () => {
    try {
     const response= axios.get("http://localhost:8000/getdata");
      setdata(response.data);
    }
    catch (e) {
      console.log(e);
   }
  }
  useEffect(() => {
    DataFromServer();
  }, [])
  

  
  return (
    <div>
     <TodoApp/>
    
    </div>
  )
}

export default App



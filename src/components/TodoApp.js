

import React from 'react'
import { useState, useEffect } from 'react';

import './TodoApp.css'
const TodoApp = (props) => {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        // Fetch all tasks when the component mounts
        fetch_all_mytask();
      }, []);
    
      const handleFormSubmit = (event) => {
        event.preventDefault();
      
        // Check if the task input field is empty
        const taskValue = event.target.task.value.trim(); // Trim to remove leading and trailing whitespaces
      
        if (taskValue === "") {
          // If empty, provide feedback or handle as needed
          alert("Task cannot be empty!");
          return;
        }
      
        // Submit the form using AJAX (e.g., fetch or axios)
        fetch('/addtask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task: taskValue,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            window.location.reload();
          })
          .catch(error => console.error('Error:', error));
      };
      
    const fetch_all_mytask = (event) => {
        fetch('/allmytask', {
            
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                
                  setTasks(data.tasks);
                })
                .catch(error => console.error('Error:', error));
    };
    
    const markComplete = () => {
      
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
        checkedCheckboxes.forEach(checkbox => {
          const li = checkbox.closest('li');
          li.style.backgroundColor = 'darkgreen';
        });
    };
    const deleteTask = () => {
        // Get all the checkboxes that are checked
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  
        const taskIds = Array.from(checkedCheckboxes).map(checkbox => checkbox.id);
    
        // Submit the IDs to the server for deletion
        fetch('/deletetask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskIds: taskIds,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            // Fetch all tasks after successful deletion
            fetch_all_mytask();
          })
          .catch(error => console.error('Error:', error));
      };
    
  return (
    <>
      <div class="navbar">
      <nav>
        <h1>Task Manager</h1>
      
    </nav>
     </div>
      <div class="todoapp">
      <form onSubmit={handleFormSubmit}>
              <input type="text" name="task" placeholder="enter a task" style={{color:'white',fontWeight:'bold'}} />
              <input type="submit" value="add a task"/>
          </form>
          
      
          <button onClick={markComplete} id="btn1">mark as complete</button>
        <button onClick={deleteTask}>Delete Task</button>
        <div style={{display:'flex', width:'100%', overflow:'auto',margin:'2%'}}>
  {/* Render the tasks as list items with checkboxes */}
  <ul>
          {tasks.map(task => (
          <li key={task._id} style={{display:'inline-block', margin:'20px 20px'}}>
            <input type="checkbox" id={task._id} />
            <label htmlFor={task._id}>{task.task}</label>
          </li>
        ))}
      </ul>
     
        </div>

        
      </div>
  
    </>
  )
}

export default TodoApp;



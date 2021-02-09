import React, { useState } from 'react';
import 'fetch';

function CreateTodo() {
    const [todo_description, onChangeTodoDescription] = useState('')
    const [todo_responsible, onChangeTodoResponsible] = useState('')
    const [todo_priority, onChangeTodoPriority] = useState('')
    const [todo_completed, onChangeTodoCompleted] = useState(false)

    const onChangeDescription = (e) => {
        onChangeTodoDescription(e.target.value);
    }
    
    const onChangeResponsible = (e) => {
        onChangeTodoResponsible(e.target.value);
    }

    const onChangePriority = (e) => {
        onChangeTodoPriority(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        const newTodo = {
            todo_description: todo_description,
            todo_responsible: todo_responsible,
            todo_priority: todo_priority,
            todo_completed: todo_completed
        };

        fetch('http://localhost:4000/todos/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
            }).then(res=>res.json())
            .then(res => console.log(res));

        onChangeTodoDescription('');
        onChangeTodoResponsible('');
        onChangeTodoPriority('');
        onChangeTodoCompleted(false);
    }

    return (
        <div style={{marginTop: 10}}>
            <h3>Create New Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                            className="form-control"
                            value={todo_description}
                            onChange={onChangeDescription}
                            />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input 
                            type="text" 
                            className="form-control"
                            value={todo_responsible}
                            onChange={onChangeResponsible}
                            />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                            type="radio" 
                            name="priorityOptions" 
                            id="priorityLow" 
                            value="Low"
                            checked={todo_priority==='Low'} 
                            onChange={onChangePriority}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                            type="radio" 
                            name="priorityOptions" 
                            id="priorityMedium" 
                            value="Medium" 
                            checked={todo_priority==='Medium'} 
                            onChange={onChangePriority}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                            type="radio" 
                            name="priorityOptions" 
                            id="priorityHigh" 
                            value="High" 
                            checked={todo_priority==='High'} 
                            onChange={onChangePriority}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateTodo;
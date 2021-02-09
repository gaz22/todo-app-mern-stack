import React, { useState, useEffect } from 'react';
import 'fetch';

function EditTodo(props) {

    const [todo_description, onChangeTodoDescription] = useState('');
    const [todo_responsible, onChangeTodoResponsible] = useState('');
    const [todo_priority, onChangeTodoPriority] = useState('');
    const [todo_completed, onChangeTodoCompleted] = useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        fetch('http://localhost:4000/todos/'+props.match.params.id)
            .then(response => response.json())
            .then(response => {
                onChangeTodoDescription(response.todo_description)
                onChangeTodoResponsible(response.todo_responsible)
                onChangeTodoPriority(response.todo_priority)
                onChangeTodoCompleted(response.todo_completed)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const onChangeDescription = (e) => {
        onChangeTodoDescription(e.target.value);
    }

    const onChangeResponsible = (e) => {
        onChangeTodoResponsible(e.target.value);
    }

    const onChangePriority = (e) => {
        onChangeTodoPriority(e.target.value);
    }

    const onChangeCompleted = (e) => {
        onChangeTodoCompleted(!todo_completed);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            todo_description: todo_description,
            todo_responsible: todo_responsible,
            todo_priority: todo_priority,
            todo_completed: todo_completed
        };
        console.log(obj);
            

        fetch(`http://localhost:4000/todos/update/${props.match.params.id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
            }).then(res=>res.json())
            .then(res => console.log(res));
        
        props.history.push('/');
    }

    return (
        <div>
            <h3 align="center">Update Todo</h3>
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
                <div className="form-check">
                    <input  className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={onChangeCompleted}
                            checked={todo_completed}
                            value={todo_completed}
                            />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                    </label>                        
                </div>

                <br />

                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditTodo;
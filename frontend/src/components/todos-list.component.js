import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'fetch';


function TodosList() {

    const[todos, setTodos] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        fetch('http://localhost:4000/todos/')
            .then(response => response.json())
            .then(data => setTodos({ todos: data }));
    }, []);

        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(todos).map((e)=>{
                            const rankOrder = ["High", "Medium", "Low", "", undefined];

                            return todos[e].sort((a, b) => rankOrder.indexOf(a.todo_priority) - rankOrder.indexOf(b.todo_priority))
                                .map((e,i)=>{
                                    return (
                                        <tr>
                                            <td className={e.todo_completed ? 'completed' : ''}>{e.todo_description}</td>
                                            <td className={e.todo_completed ? 'completed' : ''}>{e.todo_responsible}</td>
                                            <td className={e.todo_completed ? 'completed' : ''}>{e.todo_priority}</td>
                                            <td>
                                                <Link to={"/edit/"+e._id}>Edit</Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
}
export default TodosList;
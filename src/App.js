import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {

    const [users, setUsers] = useState([]);
    const [value, setValue] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef(null);
    const getUsers = () => {
        axios.get('http://localhost:7542/users' + window.location.search).then(res => {
            setUsers(res.data);
        })
    };

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = () => {
        axios.post('http://localhost:7542/users', {name: inputRef.current.value}).then(res => {
            getUsers();
        })
        setValue([])
    };

    const deleteUser = (id) => {
        axios.delete(`http://localhost:7542/users/${id}`).then(res => {
            getUsers();
        })
        setValue([])
    }

    const updateUser = (id, name) => {
        axios.put('http://localhost:7542/users/', {id, name}).then(res => {
            getUsers();
        })
    };

    const onChange = (e) => {
        setValue(e.currentTarget.value)
    };

    return <div>
        <input onChange={onChange} value={value} ref={inputRef}/>
        <button onClick={createUser}>Create User</button>
        {users.map(u => <div>
            {editMode
                ? <input defaultValue={u.name} onBlur={(e) => {
                    updateUser(u._id, e.currentTarget.value)
                    setEditMode(false)
                }}/>
                : <span onDoubleClick={()=>setEditMode(true)}>{u.name}</span>}
            <button onClick={() => deleteUser(u._id)}>x</button>
        </div>)}
    </div>
}

export default App;

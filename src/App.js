import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {

    const [users, setUsers] = useState([]);
    const [value, setValue] = useState([]);
    const inputRef = useRef(null);
    const getUsers = () => {
        axios.get('http://localhost:7542/users').then(res => {
            setUsers(res.data);
        })
    };

    useEffect(() => {
        getUsers();
    }, []);

    let createUser = (event) => {
        axios.post('http://localhost:7542/users', {name: inputRef.current.value}).then(res => {
            getUsers();
        })
        setValue('')
    };

    let onChange = (e) => {
        setValue(e.currentTarget.value)
    };

    return <div>
        <input onChange={onChange} value={value} ref={inputRef}/>
        <button onClick={createUser}>Create User</button>
        {users.map(u => <div>{u.name}</div>)}
    </div>
}

export default App;

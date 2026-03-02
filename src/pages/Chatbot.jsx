import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

const ChatbotManager = () => {

    const [loading, setLoading] = useState(true);

    const [chats, setChats] = useState([]);

    const [botquestion, setBotquestion] = useState({
        question: '',
        answer: ''
    });


    const handleChange = (e) => {
        setBotquestion({...botquestion, [e.target.name]: e.target.value});
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/addChats", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(botquestion)
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetchChats();
        })
        .catch((error) => {
            alert("Fail adding chats");
        });
    };

    const fetchChats = () => {
        fetch("http://localhost:3000/api/getChats")
        .then((response) => response.json())
        .then((data) => {
            setChats(data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(true);
        });
    };

    useEffect(() => {
        fetchChats();
    },[]);


    const deleteChat = (id) => {
        fetch(`http://localhost:3000/api/deleteChats/${id}`,{
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetchChats();
        })
        .catch((error) => {
            alert("Fail deleting chats");
        });
    };

    return(
        <>
        <Navbar/>
        <div className='chatbotmanger'>
            <h1>Chatbot Manager</h1>

            <form onSubmit={handleSubmit}>
                <input type='text' name='question' onChange={handleChange} placeholder='Qustion'/>
                <input type='text' name='answer' onChange={handleChange} placeholder='Answer'/>
                <button>Save</button>
                <button type='reset'>Reset</button>
            </form>
           {loading ? (
            <h2>Loading Chats...</h2>
           ): (
             <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {chats.map((chat) => (
                        <tr key={chat.id}>
                            <td>{chat.id}</td>
                            <td>{chat.question}</td>
                            <td>{chat.answer}</td>
                            <td><button onClick={() => deleteChat(chat.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
           )}
        </div>
        </>
    );
};

export default ChatbotManager;
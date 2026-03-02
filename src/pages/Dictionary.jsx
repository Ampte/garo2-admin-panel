import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL;


const DictionaryManager = () => {

    const [totalWords, setTotalWords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [words, setWords] = useState({
        english: '',
        garo: ''
    });


    const handleChange = (e) =>{
        setWords({...words, [e.target.name]: e.target.value});
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/addWords`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(words)
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
        })
        .catch((error) => {
            alert("Fail adding words");
        });
    };

    const fetchWords = () => {
        fetch(`${API_URL}/getWords`)
        .then((response) => response.json())
        .then((data) => {
            setTotalWords(data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(true);
        });
    };

    useEffect(() => {
        fetchWords();
    },[]);


    const deleteWord = (id) => {
        fetch(`${API_URL}/deleteWord/${id}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetchWords();
        })
        .catch((error) => {
            alert("Fail deleting word");
        });
    };

    return(
        <>
        <Navbar/>
        <div className='dictionarymanager'>
            <h1>Dictionary Manager</h1>

            <form onSubmit={handleSubmit}>
                <input type='text' name='english' onChange={handleChange} placeholder='English'/>
                <input type='text' name='garo' onChange={handleChange} placeholder='Garo'/>
                <button>Save</button>
                <button type='reset'>Reset</button>
            </form>
            {loading ? (
                <h2>Loading words...</h2>
            ): (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>English</th>
                            <th>Garo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalWords.map((tword) => (
                            <tr key={tword.id}>
                                <td>{tword.id}</td>
                                <td>{tword.english}</td>
                                <td>{tword.garo}</td>
                                <td><button onClick={() => deleteWord(tword.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
};

export default DictionaryManager;
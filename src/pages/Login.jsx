import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        adminpassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.adminpassword === "#@2026Garo2AdminP") {
            navigate("/dashboard");
        } else {
            alert("Wrong password please try again");
        }
    };

    return(
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f4f6f9"
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    padding: "40px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    width: "300px"
                }}
            >

                <h2 style={{textAlign:"center", marginBottom:"10px"}}>
                    Garo2 Admin
                </h2>

                <input
                    type='password'
                    name='adminpassword'
                    value={formData.adminpassword}
                    onChange={handleChange}
                    placeholder='Admin password'
                    style={{
                        padding:"10px",
                        borderRadius:"6px",
                        border:"1px solid #ccc",
                        fontSize:"16px"
                    }}
                />

                <button
                    type='submit'
                    style={{
                        padding:"10px",
                        backgroundColor:"#4CAF50",
                        color:"white",
                        border:"none",
                        borderRadius:"6px",
                        fontSize:"16px",
                        cursor:"pointer"
                    }}
                >
                    Login
                </button>

            </form>
        </div>
    );
};

export default Login;
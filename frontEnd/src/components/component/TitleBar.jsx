import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import icon from '../../assets/icon.png';
import profileicon from '../../assets/profileIcon.png';
import '../styles/TitleBar.css'
export default function TitleBar() {
    var { username } = useParams();
    if (username){
        console.log("exists");
        useEffect(() => {
            fetch(`http://localhost:8080/customers/${username}`,
            
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                  }

            }).then(response =>{
                console.log("entered response")
                console.log(response)
                console.log(response.status != 200)
                if (response.status != 200) {
                    username = false
                    window.location.href = `http://localhost:5173/`;
                    console.log("USER DOES NOT EXIST")
                    throw new Error("Failed to fetch product data");
                  }
        })
        }
        )
    }
    else{
        console.log("nope")
        username = false
    }
    console.log("here you are",username)
    return (
        <div className="titleBar">
            {!username ?
                (
                    <>
                        <img className='iconImage' src={icon}></img>
                        
                        <Link to="/login" className="login">
                            Login
                        </Link>
                        <Link to="/signUp" className="signUp">
                            Sign-Up
                        </Link>

                    </>
                ) : (
                    <>
                       <img className='iconImage' src={icon}></img>
                       <Link to={username ? `/${username}` : '/'} className='linkHome'>
                        <h1>Boogs and Pajes</h1>
                        </Link>
                       <img className='profileIcon' src={profileicon}></img>

                    </>
                )}
        </div>)
}



import React from 'react'
import { useParams, Link } from 'react-router-dom';
import icon from '../../assets/icon.png';
import profileicon from '../../assets/profileIcon.png';
import '../styles/TitleBar.css'
export default function TitleBar() {
    const { username } = useParams();
    if (username){
        console.log("exists");
    }
    else{
        console.log("nope")
    }
    return (
        <div className="titleBar">
            {!username ?
                (
                    <>
                        <img className='iconImage' src={icon}></img>
                        <h1>Boogs and Pajes</h1>
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
                       <h1>Boogs and Pajes</h1>
                       <img className='profileIcon' src={profileicon}></img>

                    </>
                )}
        </div>)
}



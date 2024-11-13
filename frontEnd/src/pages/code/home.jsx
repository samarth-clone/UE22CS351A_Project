import icon from '../../assets/icon.png';
import '../styles/home.css'
import BookCard from '../../components/component/BookCard.jsx';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
        <div className="titleBar">
            <img className='iconImage' src = {icon}></img>
            <h1>Boogs and Pajes</h1>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/signUp" className="signUp">
              Sign-Up
            </Link>
        </div>
        <div className="items">
          <BookCard id={1}/>
          <BookCard id={2}/>
          
        </div>
    </>
  );
}

export default Home;
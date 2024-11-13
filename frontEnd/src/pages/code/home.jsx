import icon from '../../assets/icon.png';
import '../styles/home.css'
import BookCard from '../../components/component/BookCard.jsx';
import { Link } from 'react-router-dom';
import TitleBar from '../../components/component/TitleBar.jsx';
function Home() {
  return (
    <>
        <TitleBar></TitleBar>
        <div className="items">
          <BookCard id={1}/>
          <BookCard id={2}/>
          
        </div>
    </>
  );
}

export default Home;
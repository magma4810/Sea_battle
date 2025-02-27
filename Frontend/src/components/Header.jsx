import { useState, useEffect } from 'react';
import GameIcon from '../img/Game.png'; 
import ProfileIcon from '../img/Profile.png';
import BestPlayersIcon from '../img/BestPlayers.png';
import LogoutIcon from '../img/Logout.png';
import '../styles/Header.css';

export default function Sidebar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("api/getUser/1")
      .then((response) => response.json())
      .then((data) => setData(data[0]))
      .catch((error) => console.error("Ошибка:", error));
  }, []);
  return (
    <header>
      <div className='gameInfo'>
        <a className='icons'><img src={GameIcon} alt="Game" />Game</a>
        <a className='icons'><img src={ProfileIcon} alt="Profile" />Stats</a>
        <a className='icons'><img src={BestPlayersIcon} alt="Best Players" />Best players</a>
      </div>
      <a className='icons'><img src={LogoutIcon} alt="Logout" />Logout</a>
    </header>
  );
}

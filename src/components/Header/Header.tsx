import React from 'react';
import { Link } from 'react-router-dom';
import home from './home.png'
import profileImage from './profile.png'
import friendImage from './friends.png'
import styles from './style.module.css'
interface HeaderProps {
  handleSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ handleSearch }) => {
  const [query, setQuery] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(query);
  };

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    // TODO: implement login functionality
  };

  return (
    <header>
      <nav className={styles.nav}>
  <div className={styles.navItem}>
    <Link to='/home' className={styles.link}>
      <div className={styles.iconContainer}>
        <img className={styles.icon} src={home} alt='home' />
      </div>
      <div className={styles.label}>Home</div>
    </Link>
  </div>
  <div className={styles.navItem}>
    <Link to='/friends' className={styles.link}>
      <div className={styles.iconContainer}>
        <img className={styles.icon} src={friendImage} alt='friends' />
      </div>
      <div className={styles.label}>Friends</div>
    </Link>
  </div>
  <div className={styles.navItem}>
    <Link to='/profile' className={styles.link}>
      <div className={styles.iconContainer}>
        <img className={styles.icon} src={profileImage} alt='profile' />
      </div>
      <div className={styles.label}>Profile</div>
    </Link>
  </div>
</nav>

      <form onSubmit={handleFormSubmit}>
        <input type='text'placeholder='Search...' value={query} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button onClick={handleLoginClick}>Login</button>
      )}
    </header>
  );
};

export default Header;


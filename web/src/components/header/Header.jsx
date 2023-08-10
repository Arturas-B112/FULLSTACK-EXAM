import icon from '../../assets/party.svg';
import './Header.css';

const Header = () => {
  return (
    <>
      <div className="header-container">
        <img src={icon} className="logo"></img>
        <h1 className="heading">FEUA5 Afterparty Event</h1>
        <button
          className="header-btn"
          onClick={() =>
            window.location.replace(
              'https://codeacademy.lt/?gclid=CjwKCAjw8symBhAqEiwAaTA__G7OvTPTvQkd7UoVxFyDj2SVlpGFd23reFOIMKur8u-_c93CY8BjKxoCBKoQAvD_BwE'
            )
          }
        >
          Join CodeAcademy
        </button>
      </div>
    </>
  );
};

export default Header;

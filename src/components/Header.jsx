import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <header className='header-wrapper'>
            <div className="container">
                <h2>{props.headerText}</h2>
                <div className="nav-links">
                    <NavLink 
                        className={(navData) => (navData.isActive ? 'nav-links__item active' : 'nav-links__item')} 
                        to={'/'}>
                            Home
                    </NavLink>
                    <NavLink 
                        className={(navData) => (navData.isActive ? 'nav-links__item active' : 'nav-links__item')} 
                        to={'/about'}>
                            About
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    headerText: 'Default Comment App Title'
}

Header.propTypes = {
    headerText: PropTypes.string
}

export default Header
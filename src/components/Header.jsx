import PropTypes from 'prop-types';

function Header(props) {
    return (
        <header className='header-wrapper'>
            <div className="container">
                <h2>{props.headerText}</h2>
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
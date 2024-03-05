import PropTypes from 'prop-types';

function Button({children, type, isDisabled, ...otherProps}) {
    return (
        <button
            {...otherProps}
            className="custom-btn"
            type={type} 
            disabled={isDisabled}> 
                {children}
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
    isDisabled: false
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string,
    isDisabled: PropTypes.bool
}

export default Button
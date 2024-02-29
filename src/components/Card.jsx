
function Card({children, darkMode}) {
    return (
        <div className={`card ${darkMode ? 'dark-mode' : ''}`}>
            {children}
        </div>
    )
}

export default Card
import Logo from './../../../../assets/raw.jpg'

/**
 * NavBar displaying title and current level
 * @param {*} props 
 * @returns 
 */
 function NavBar(props) {
    return (
    <nav className="navigation-bar" >
        <img className="logo" src={Logo} alt=""/>
        <h3>Quatre Images Un Mot</h3>
        <div className="divNiveau" >
            <span className="niveau">{props.level}</span>
        </div>
    </nav>
    )
}

export default NavBar;
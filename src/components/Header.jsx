import './Header.css'

export default function Header() {
    return(
        <header className='header'>
            <p className="header-logo">Bewerbungs Tracker</p>
            <nav className="header-nav">
                <a href="#">Home</a>
                <a href="#">About</a>
            </nav>
        </header>

    );
}
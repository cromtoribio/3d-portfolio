import logo from '/LogoConcept-WhiteHex.svg'

export default function Nav() {
    return <div className='nav-container'>
        <nav className="nav">
            <img className="logo" src={logo} alt="Eye in hexagon logo" />
            <h1>CHRIS TORIBIO</h1>
            <p>EXPERIENCE ARCHITECT</p>
        </nav>
    </div>
}
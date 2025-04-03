import logo from '/LogoConcept-WhiteHex.svg'

export default function Nav() {
    return <div className='nav-container'>
        <nav className="nav">
            <img className="logo" src={logo} alt="Eye in hexagon logo" />
        </nav>
    </div>
}
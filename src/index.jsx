import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Nav from './components/interface/Nav.jsx'
import Footer from './components/interface/Footer.jsx'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<>
    <Nav />
    <Canvas
        shadows
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 0, 28]
        }}
    >
        <Experience />
    </Canvas>
    <Footer />
</>
)
import { Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'

import { useRef } from 'react'
import { OrbitControls, Text3D, Center, Float } from '@react-three/drei'

import WobblySphere from './WobblySphere/WobblySphere.jsx'
// import { useFrame, } from '@react-three/fiber'
// import { Perf } from 'r3f-perf'
// import * as THREE from 'three'
// import { CylinderCollider, CuboidCollider, Physics, RigidBody } from '@react-three/rapier'

export default function Experience() {

    // Set to true to show Perf dashboard
    const { perfVisible } = useControls('Perf', {
        perfVisible: false
    })

    const light = useRef()

    const { lPosition, lColor } = useControls('Light', {
        lPosition: {
            value: { x: -0.5, y: 1, z: 0.85 },
            step: 0.01,
            min: -20,
            max: 20,
        },
        lColor: '#ffffff'
    })

    const { bColor } = useControls('Canvas', {
        bColor: '#212121',
    })


    return <>

        {/* Set to false to show Leva Controls */}
        <Leva hidden={true} />
        <color args={[bColor]} attach='background' />

        {perfVisible && <Perf position='bottom-left' />}

        <OrbitControls />
        <ambientLight intensity={0.2} color={'white'} />
        <directionalLight
            ref={light}
            position={[lPosition.x, lPosition.y, lPosition.z]}
            intensity={3}
            color={lColor}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={10}
            shadow-camera-right={10}
            shadow-camera-bottom={- 10}
            shadow-camera-left={- 10}
            castShadow
        />

        <WobblySphere />
    </>
}
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

import { useRef } from 'react'
import { OrbitControls, Text3D, Center, Float } from '@react-three/drei'

import WobblySphere from './WobblySphere/WobblySphere.jsx'
// import { useFrame, } from '@react-three/fiber'
// import { Perf } from 'r3f-perf'
// import * as THREE from 'three'
// import { CylinderCollider, CuboidCollider, Physics, RigidBody } from '@react-three/rapier'

export default function Experience() {

    const { perfVisible } = useControls('Perf', {
        perfVisible: true
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

    const { bColor, tColor } = useControls('Canvas', {
        bColor: '#000000',
        tColor: '#ffffff'
    })


    return <>
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

        <Float
            floatIntensity={0.5}
            rotationIntensity={0.5}
        >
            <Center position={[0, -5, 4.9]}>
                <Text3D
                    font='./fonts/VisueltProMedium_Regular.json'
                    position={[0, -5, 4.9]}
                    rotation={[-0.2, 0, 0]}
                    size={0.5}
                    height={0.2}
                    curveSegments={12}
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    CRAFTING A NEW EXPERIENCE
                    <meshStandardMaterial color={tColor} />
                </Text3D>
            </Center>
        </Float>

        <WobblySphere />
    </>
}
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { CylinderCollider, CuboidCollider, Physics, RigidBody } from '@react-three/rapier'

export default function Experience() {

    // const [hitSound] = useState(() => new Audio('./hit.mp3'))
    const cube = useRef()
    const twister = useRef()
    const hamburger = useGLTF('./hamburger.glb')

    const cubeJump = () => {
        const mass = cube.current.mass()
        console.log(mass)
        cube.current.applyImpulse({ x: 0, y: 5. * mass, z: 0 })
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        })
    }

    useFrame((state) => {
        const time = state.clock.elapsedTime

        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quatRotation = new THREE.Quaternion()
        quatRotation.setFromEuler(eulerRotation)

        twister.current.setNextKinematicRotation(quatRotation)

        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2

        twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z })
    })

    const onCollisionEnter = () => {
        // console.log('collision!')
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <Physics debug gravity={[0, -9.81, 0]}>
            <RigidBody colliders="ball">
                <mesh castShadow position={[-1.5, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody
                position={[1.5, 2, 0]}
                ref={cube}
                restitution={0}
                friction={0}
                colliders={false}
            >
                <CuboidCollider
                    args={[0.5, 0.5, 0.5]}
                    mass={50}
                />
                <mesh onClick={cubeJump} castShadow>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody>

            <RigidBody
                position={[0, -0.8, 0]}
                friction={0}
                type='kinematicPosition'
                ref={twister}
                onCollisionEnter={onCollisionEnter}
            >
                <mesh castShadow>
                    <boxGeometry args={[0.4, 0.4, 3]} />
                    <meshStandardMaterial color="darkred" />
                </mesh>
            </RigidBody>

            <RigidBody
                type="fixed"
                restitution={0}
                friction={0.1}
            >
                <mesh receiveShadow position-y={- 1.25}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <RigidBody position={[0, 4, 0]} colliders={false}>
                <CylinderCollider args={[0.5, 1.25]} />
                <primitive object={hamburger.scene} scale={0.25} />
            </RigidBody>

        </Physics >

    </>
}
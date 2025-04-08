import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"

export default function Stars() {

    const stars = useRef()

    useFrame((state, delta) => {
        stars.current.rotation.y += delta * 0.003
    })

    return <Sparkles
        ref={stars}
        count={2000}
        size={5}
        scale={75}
        speed={0}
        noise={0}
    />
}
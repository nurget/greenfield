import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Sphere } from "@react-three/drei";

const AnimatedBall = () => {
    const ballRef = useRef<any>();

    useFrame(() => {
        // 공이 자연스럽게 움직이게 합니다.
        if (ballRef.current) {
            ballRef.current.position.x += Math.sin(Date.now() * 0.001) * 0.01;
            ballRef.current.position.y += Math.cos(Date.now() * 0.001) * 0.01;
        }
    });

    return (
        <Sphere ref={ballRef} position={[0, 0, 0]} args={[0.5, 32, 32]}>
            <meshStandardMaterial color="white" />
        </Sphere>
    );
};

export const AnimatedBalls = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            {/* 여러개의 공을 반복해서 생성 */}
            {Array.from({ length: 20 }, (_, i) => (
                <AnimatedBall key={i} />
            ))}
        </Canvas>
    );
};

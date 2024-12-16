import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import gsap from 'gsap';

const Baseball = ({ position, rotation }) => {
    const baseballRef = useRef();
    const geometry = useLoader(STLLoader, '/models/baseball.STL');

    useEffect(() => {
        // 초기 스케일 설정
        if (baseballRef.current) {
            baseballRef.current.scale.set(0.02, 0.02, 0.02); // 크기 조절
        }

        const animate = () => {
            gsap.to(baseballRef.current.position, {
                y: position[1] + (Math.random() * 2 - 1),    // 현재 위치 기준으로 움직임
                x: position[0] + (Math.random() * 2 - 1),
                z: position[2] + (Math.random() * 1 - 0.5),
                duration: 4,
                ease: "power1.inOut",
                onComplete: animate
            });

            gsap.to(baseballRef.current.rotation, {
                x: Math.random() * Math.PI * 2,
                y: Math.random() * Math.PI * 2,
                z: Math.random() * Math.PI * 2,
                duration: 4,
                ease: "power1.inOut"
            });
        };

        animate();
    }, [position]);

    return (
        <mesh
            ref={baseballRef}
            position={position}
            rotation={rotation}
            geometry={geometry}
        >
            <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.3}
                metalness={0.1}
                clearcoat={0.2}
                clearcoatRoughness={0.2}
            />
        </mesh>
    );
};

export default Baseball;

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Physics, useSphere } from '@react-three/cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CONFIG = {
    sizes: {
        mobile: { ball: 0.15, scale: 0.15 },
        desktop: { ball: 0.25, scale: 0.25 }
    },
    physics: {
        mobile: {
            baseVelocity: 3,
            maxVelocity: 8,
            damping: 0.95,
            force: 15
        },
        desktop: {
            baseVelocity: 4,
            maxVelocity: 12,
            damping: 0.985,
            force: 20
        }
    }
};

const Baseball = ({ position, initialVelocity = [0, 0, 0] }) => {
    const baseball = useLoader(GLTFLoader, '/models/baseball.glb');
    const baseballScene = useMemo(() => baseball.scene.clone(), [baseball.scene]);
    const { viewport } = useThree();

    const isSmallScreen = viewport.width < 5;
    const settings = isSmallScreen ? CONFIG.physics.mobile : CONFIG.physics.desktop;
    const size = isSmallScreen ? CONFIG.sizes.mobile : CONFIG.sizes.desktop;

    const [sphereRef, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [size.ball],
        linearDamping: 0.01,
        angularDamping: 0.01,
        velocity: initialVelocity,
    }));

    const positionRef = useRef(position);
    const velocityRef = useRef(initialVelocity);

    useEffect(() => {
        const unsubPosition = api.position.subscribe((p) => (positionRef.current = p));
        const unsubVelocity = api.velocity.subscribe((v) => (velocityRef.current = v));
        return () => {
            unsubPosition();
            unsubVelocity();
        };
    }, [api]);

    useFrame(() => {
        const bounds = viewport.getCurrentViewport();
        const [x, y] = positionRef.current;
        const [vx, vy] = velocityRef.current;
        const boundaryX = bounds.width * 0.45;
        const boundaryY = bounds.height * 0.45;

        const currentSpeed = Math.sqrt(vx * vx + vy * vy);

        if (currentSpeed > settings.baseVelocity) {
            api.velocity.set(
                vx * settings.damping,
                vy * settings.damping,
                0
            );
        }

        if (Math.abs(x) > boundaryX) {
            const newVx = -vx * settings.force;
            const limitedVx = Math.sign(newVx) * Math.min(Math.abs(newVx), settings.maxVelocity);
            api.velocity.set(limitedVx, vy, 0);
            api.position.set(
                x > 0 ? boundaryX * 0.95 : -boundaryX * 0.95,
                y,
                0
            );
        }

        if (Math.abs(y) > boundaryY) {
            const newVy = -vy * settings.force;
            const limitedVy = Math.sign(newVy) * Math.min(Math.abs(newVy), settings.maxVelocity);
            api.velocity.set(vx, limitedVy, 0);
            api.position.set(
                x,
                y > 0 ? boundaryY * 0.95 : -boundaryY * 0.95,
                0
            );
        }

        const floatStrength = isSmallScreen ? 0.15 : 0.25;
        api.applyForce(
            [
                Math.sin(Date.now() * 0.001) * floatStrength,
                Math.cos(Date.now() * 0.001) * floatStrength,
                0
            ],
            [0, 0, 0]
        );
    });

    // 마우스 위치 추적을 위한 ref
    const mouseRef = useRef({ x: 0, y: 0 });
    const mouseVelocityRef = useRef({ x: 0, y: 0 });
    const lastMousePosRef = useRef({ x: 0, y: 0 });

    useFrame(({ mouse, viewport }) => {
        const bounds = viewport.getCurrentViewport();
        const [x, y] = positionRef.current;
        const [vx, vy] = velocityRef.current;
        const boundaryX = bounds.width * 0.45;
        const boundaryY = bounds.height * 0.45;

        // 마우스 위치를 뷰포트 좌표로 변환
        mouseRef.current = {
            x: mouse.x * bounds.width / 2,
            y: mouse.y * bounds.height / 2
        };

        // 마우스 속도 계산
        mouseVelocityRef.current = {
            x: mouseRef.current.x - lastMousePosRef.current.x,
            y: mouseRef.current.y - lastMousePosRef.current.y
        };

        lastMousePosRef.current = { ...mouseRef.current };

        // 마우스와 공 사이의 거리 계산
        const dx = mouseRef.current.x - x;
        const dy = mouseRef.current.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 마우스가 공 근처에 있을 때 힘 적용
        if (distance < 2) {
            const force = 20 * (1 - distance / 2); // 거리에 반비례하는 힘
            const repulsionX = (dx / distance) * force;
            const repulsionY = (dy / distance) * force;

            // 마우스 속도도 반영
            const mouseInfluence = 10;
            const totalForceX = repulsionX + mouseVelocityRef.current.x * mouseInfluence;
            const totalForceY = repulsionY + mouseVelocityRef.current.y * mouseInfluence;

            api.velocity.set(totalForceX, totalForceY, 0);
        }

        // 기존의 벽 충돌 및 감속 로직
        const currentSpeed = Math.sqrt(vx * vx + vy * vy);
        if (currentSpeed > settings.baseVelocity) {
            api.velocity.set(
                vx * settings.damping,
                vy * settings.damping,
                0
            );
        }

        if (Math.abs(x) > boundaryX) {
            const newVx = -vx * settings.force;
            const limitedVx = Math.sign(newVx) * Math.min(Math.abs(newVx), settings.maxVelocity);
            api.velocity.set(limitedVx, vy, 0);
            api.position.set(
                x > 0 ? boundaryX * 0.95 : -boundaryX * 0.95,
                y,
                0
            );
        }

        if (Math.abs(y) > boundaryY) {
            const newVy = -vy * settings.force;
            const limitedVy = Math.sign(newVy) * Math.min(Math.abs(newVy), settings.maxVelocity);
            api.velocity.set(vx, limitedVy, 0);
            api.position.set(
                x,
                y > 0 ? boundaryY * 0.95 : -boundaryY * 0.95,
                0
            );
        }

        // 부드러운 부유 움직임
        const floatStrength = isSmallScreen ? 0.15 : 0.25;
        api.applyForce(
            [
                Math.sin(Date.now() * 0.001) * floatStrength,
                Math.cos(Date.now() * 0.001) * floatStrength,
                0
            ],
            [0, 0, 0]
        );
    });

    return (
        <mesh ref={sphereRef}>
            <primitive object={baseballScene} scale={size.scale} />
        </mesh>
    );
};

const Scene = () => {
    const { viewport } = useThree();
    const isSmallScreen = viewport.width < 5;
    const ballCount = isSmallScreen ? 8 : 15;

    const baseballs = useMemo(() =>
            Array.from({ length: ballCount }, (_, i) => ({
                id: i,
                position: [
                    Math.random() * 16 - 8,
                    Math.random() * 12 - 6,
                    0
                ] as [number, number, number],
                velocity: [
                    (Math.random() - 0.5) * (isSmallScreen ? 4 : 6),
                    (Math.random() - 0.5) * (isSmallScreen ? 4 : 6),
                    0
                ] as [number, number, number]
            })),
        [ballCount]);

    return (
        <Physics
            gravity={[0, 0, 0]}
            defaultContactMaterial={{
                friction: 0,
                restitution: isSmallScreen ? 1.1 : 1.2,
            }}
        >
            {baseballs.map((ball) => (
                <Baseball
                    key={ball.id}
                    position={ball.position}
                    initialVelocity={ball.velocity}
                />
            ))}
        </Physics>
    );
};

export const BaseballScene = () => {
    return (
        <div className="baseball-scene w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 10] }}
                gl={{ alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={2.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <pointLight position={[-10, -10, 10]} intensity={1.5} />
                <directionalLight position={[0, 5, 5]} intensity={2} />
                <Scene />
            </Canvas>
        </div>
    );
};

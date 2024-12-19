import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Physics, useSphere } from '@react-three/cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BREAKPOINTS = {
    mobile: 5,    // viewport width < 5
    tablet: 8,    // 5 <= viewport width < 8
    desktop: 12   // viewport width >= 8
};

const CONFIG = {
    sizes: {
        mobile: {
            ball: 0.12,
            scale: 0.12
        },
        tablet: {
            ball: 0.18,
            scale: 0.18
        },
        desktop: {
            ball: 0.2,
            scale: 0.2
        }
    },
    physics: {
        mobile: {
            baseVelocity: 2,
            maxVelocity: 6,
            damping: 0.92,
            force: 12,
            floatStrength: 0.12,
            boundary: {
                x: 0.4,
                y: 0.4
            }
        },
        tablet: {
            baseVelocity: 3,
            maxVelocity: 9,
            damping: 0.95,
            force: 15,
            floatStrength: 0.18,
            boundary: {
                x: 0.42,
                y: 0.42
            }
        },
        desktop: {
            baseVelocity: 4,
            maxVelocity: 12,
            damping: 0.985,
            force: 20,
            floatStrength: 0.25,
            boundary: {
                x: 0.45,
                y: 0.45
            }
        }
    },
    balls: {
        mobile: {
            count: 10,
            initialVelocityRange: 3,
            positionRange: { x: 6, y: 4 }
        },
        tablet: {
            count: 15,
            initialVelocityRange: 4,
            positionRange: { x: 10, y: 6 }
        },
        desktop: {
            count: 25,
            initialVelocityRange: 6,
            positionRange: { x: 16, y: 8 }
        }
    }
};

const getDeviceConfig = (viewport) => {
    if (viewport.width < BREAKPOINTS.mobile) return 'mobile';
    if (viewport.width < BREAKPOINTS.tablet) return 'tablet';
    return 'desktop';
};

const Baseball = ({ position, initialVelocity = [0, 0, 0] }) => {
    const baseball = useLoader(GLTFLoader, '/models/baseball.glb');
    const baseballScene = useMemo(() => baseball.scene.clone(), [baseball.scene]);
    const { viewport } = useThree();

    const deviceType = getDeviceConfig(viewport);
    const settings = CONFIG.physics[deviceType];
    const size = CONFIG.sizes[deviceType];

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
        const boundaryX = bounds.width * settings.boundary.x;
        const boundaryY = bounds.height * settings.boundary.y;

        // 속도 제한
        const currentSpeed = Math.sqrt(vx * vx + vy * vy);
        if (currentSpeed > settings.baseVelocity) {
            api.velocity.set(
                vx * settings.damping,
                vy * settings.damping,
                0
            );
        }

        // 벽 충돌
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

        api.applyForce(
            [
                Math.sin(Date.now() * 0.001) * settings.floatStrength,
                Math.cos(Date.now() * 0.001) * settings.floatStrength,
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
    const deviceType = getDeviceConfig(viewport);
    const ballSettings = CONFIG.balls[deviceType];

    const baseballs = useMemo(() =>
            Array.from({ length: ballSettings.count }, (_, i) => ({
                id: i,
                position: [
                    Math.random() * ballSettings.positionRange.x - ballSettings.positionRange.x / 2,
                    Math.random() * ballSettings.positionRange.y - ballSettings.positionRange.y / 2,
                    0
                ] as [number, number, number],
                velocity: [
                    (Math.random() - 0.5) * ballSettings.initialVelocityRange,
                    (Math.random() - 0.5) * ballSettings.initialVelocityRange,
                    0
                ] as [number, number, number]
            })),
        [deviceType]);

    return (
        <Physics
            gravity={[0, 0, 0]}
            defaultContactMaterial={{
                friction: 0,
                restitution: deviceType === 'mobile' ? 1.1 : deviceType === 'tablet' ? 1.3 : 1.5,
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

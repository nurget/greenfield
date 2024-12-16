import {Link} from "react-router-dom";
import {Canvas} from "@react-three/fiber";
import Baseball from "../components/Baseball.tsx";
import {Suspense} from "react";

const MainPage = () => {
    return (
        <main id="main-content" className="h-screen bg-green-500">
            {/* Baseball 3D Scene */}
            <div className="fixed inset-0 pointer-events-none">
                <Canvas
                    camera={{
                        position: [0, 0, 10],
                        fov: 60,
                        near: 0.1,
                        far: 1000
                    }}
                    shadows
                    className="touch-none"
                >
                    <ambientLight intensity={0.7}/>
                    <pointLight position={[10, 10, 10]} intensity={1.5}/>
                    <Suspense fallback={null}>
                        {[...Array(10)].map((_, i) => (
                            <Baseball
                                key={i}
                                position={[
                                    Math.random() * 8 - 4,    // 더 넓은 X축 분포
                                    Math.random() * 8 - 4,    // 더 넓은 Y축 분포
                                    Math.random() * -5 - 2    // Z축을 더 뒤로
                                ]}
                                rotation={[
                                    Math.random() * Math.PI,
                                    Math.random() * Math.PI,
                                    Math.random() * Math.PI
                                ]}
                            />
                        ))}
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col">
                {/* 상단 타이틀 섹션 */}
                <div className="flex-1 lg:min-h-[max(53vh,340px)]">
                    <div className="container-outset-inset h-full">
                        <div
                            className="h-full border-white border-l border-r border-t px-[var(--container-outset-gutter)] lg:px-[1em] flex items-center">
                            <div className="flex flex-col">
                                <h1 className="outline-title text-left">
                                    <div
                                        className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider leading-none mb-2">
                                        GREENFIELD
                                    </div>
                                    <div
                                        className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider leading-none">
                                        BASEBALL
                                    </div>
                                    <div
                                        className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider leading-none">
                                        RECORD. 2025
                                    </div>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 메뉴 섹션 */}
                <div className="flex-1">
                    <div className="container-outset-inset h-full">
                        <div
                            className="h-full flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white border border-white">
                            <MenuButton to="/records/2024" title="2024 기록 보기"/>
                            <MenuButton to="/predictions/2025" title="2025 순위 예측"/>
                            <MenuButton to="/stats" title="세이버 매트릭스"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
        ;
};

const MenuButton = ({to, title}) => {
    return (
        <div className="flex-1 flex">
            <Link
                to={to}
                className="group relative flex-1 flex text-white px-[0.3em] py-[0.4em] text-2xl md:text-3xl font-bold"
            >
                {title}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100"
                    viewBox="0 0 765 672"
                    preserveAspectRatio="none"
                >
                    <path
                        vectorEffect="non-scaling-stroke"
                        d="M2.27344 1.33862L762.732 670.661"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                    />
                    <path
                        vectorEffect="non-scaling-stroke"
                        d="M2.27344 670.661L762.732 1.33862"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                    />
                </svg>
            </Link>
        </div>
    );
};

// 전역 스타일
const styles = `
:root {
    --container-outset-gutter: 10px;
    --container-inset-gutter: 40px;
    --ticker-height: 50px;
    --ticker-clearance-gap: 15px;
    --ticker-clearance-height: calc(var(--ticker-height) + var(--ticker-clearance-gap));
}

.container-outset-inset {
    padding-left: var(--container-outset-gutter);
    padding-right: var(--container-outset-gutter);
}

@media (min-width: 1024px) {
    .container-outset-inset {
        padding-left: 1em;
        padding-right: 1em;
    }
}

html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#main-content {
    height: 100vh;
    overflow: hidden;
}

/* 타이틀 외곽선 스타일 */
.outline-title {
    color: transparent;
    -webkit-text-stroke: 2px white;
    text-stroke: 2px white;
}

/* 백업 스타일 - -webkit-text-stroke가 지원되지 않을 경우 */
@supports not (-webkit-text-stroke: 2px white) {
    .outline-title {
        color: transparent;
        text-shadow:
           -2px -2px 0 #fff,  
            2px -2px 0 #fff,
           -2px  2px 0 #fff,
            2px  2px 0 #fff;
    }
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default MainPage;

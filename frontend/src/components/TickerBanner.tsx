import React from 'react';

const TickerBanner = () => {
    return (
        <div className="ticker-frame relative h-[50px] bg-green-700 overflow-hidden">
            <div className="relative h-full z-[1]">
                <div className="marquee-wrap">
                    <div className="marquee-content">
                        <div >
                            <img
                                src="/banner.png"
                                alt="Banner"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        {/* 부드러운 루프를 위한 복제 */}
                        <div>
                            <img
                                src="/banner.png"
                                alt="Banner"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* 강화된 그림자 효과 */}
            <div className="absolute top-0 left-[-20px] right-[-20px] h-full shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_-4px_6px_rgba(0,0,0,0.3)]"></div>
        </div>
    );
};

const styles = `
.marquee-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.marquee-content {
    display: flex;
    width: max-content;
    height: 100%;
    animation: marquee 30s linear infinite;
}

.marquee-item {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.marquee-item img {
    height: 100%;
    width: auto;
    max-width: none;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

.marquee-wrap:hover .marquee-content {
    animation-play-state: paused;
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default TickerBanner;

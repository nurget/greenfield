import React, { useState, useRef } from 'react';

interface DynamicGhostTextProps {
    text: string;
    className?: string;
    maxDistance?: number;
    layers?: {
        distance: number;    // 기본 거리의 배수 (0-1)
        opacity: number;     // 투명도 (0-1)
    }[];
}

export const DynamicGhostText: React.FC<DynamicGhostTextProps> = ({
                                                                      text,
                                                                      className = "",
                                                                      maxDistance = 25,
                                                                      layers = [
                                                                          { distance: 0.25, opacity: 0.4 },
                                                                          { distance: 0.5, opacity: 0.3 },
                                                                          { distance: 0.75, opacity: 0.2 },
                                                                          { distance: 1, opacity: 0.1 }
                                                                      ]
                                                                  }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    // 반응형에 따른 maxDistance 조정
    const getResponsiveDistance = () => {
        if (window.innerWidth < 640) return maxDistance * 0.6; // 모바일
        if (window.innerWidth < 768) return maxDistance * 0.8; // 태블릿
        if (window.innerWidth < 1024) return maxDistance * 0.9; // 작은 데스크탑
        return maxDistance; // 큰 데스크탑
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!textRef.current) return;

        const rect = textRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) / rect.width;
        const distanceY = (e.clientY - centerY) / rect.height;

        setMousePosition({ x: distanceX, y: distanceY });
    };

    return (
        <div
            ref={textRef}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Ghost layers */}
            {isHovering && layers.map((layer, index) => {
                const responsiveDistance = getResponsiveDistance();
                const xOffset = mousePosition.x * responsiveDistance * layer.distance;
                const yOffset = mousePosition.y * responsiveDistance * layer.distance;

                return (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform duration-150 ease-out pointer-events-none ${className}`}
                        style={{
                            transform: `translate(${xOffset}px, ${yOffset}px)`,
                            opacity: layer.opacity * (window.innerWidth < 640 ? 0.7 : 1), // 모바일에서는 투명도 조정
                        }}
                    >
                        {text}
                    </div>
                );
            })}
            {/* Main text */}
            <div className={className}>
                {text}
            </div>
        </div>
    );
};

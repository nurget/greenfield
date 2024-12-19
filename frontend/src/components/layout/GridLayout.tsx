import React from 'react';

interface GridLayoutProps {
    children: React.ReactNode;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
    return (
        <main id="main-content" className="bg-[#1A72FF]">
            <div className="min-h-screen flex flex-col">
                {/* 히어로 섹션 */}
                <div className="h-[35vh] sm:h-[38vh] md:h-[45vh] relative">
                    <div className="container-outset-inset h-full">
                        <div
                            className="h-full border-l-2 border-r-2 border-white px-[var(--container-outset-gutter)] lg:px-[1em] flex items-center">
                            {children[0]}
                        </div>
                    </div>
                </div>

                {/* 메뉴 섹션 */}
                <div className="h-[50vh] sm:h-[47vh] md:h-[40vh] relative">
                    <div className="absolute inset-x-0 border-t-2 border-b-2 border-white h-full">
                        <div className="container-outset-inset h-full">
                            <div
                                className="h-full grid grid-cols-1 md:grid-cols-3 border-l-2 border-r-2 border-white divide-y-2 md:divide-y-0 md:divide-x-2 divide-white">
                                {children[1]}
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIAMOND DATA 섹션 */}
                <div className="flex-1">
                    <div className="container-outset-inset">
                        <div className="border-l-2 border-r-2 border-white px-[var(--container-outset-gutter)] py-8">
                            {children[2]}
                        </div>
                    </div>
                </div>

                {/* 푸터 섹션 */}
                <div className="flex-shrink-0 relative">
                    <div className="border-t-2 border-white w-full">
                        <div className="container-outset-inset">
                            <div
                                className="border-l-2 border-r-2 border-white px-[var(--container-outset-gutter)] py-4 font-andale text-center text-white text-sm">
                                © @nurget (github username)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

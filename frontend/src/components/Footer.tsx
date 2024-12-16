const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative text-white bg-green-500">
            <div className="container-outset-inset">
                <div className="max-w-[90%] mx-auto border-x border-white">
                    {/* 상단 콘텐츠 */}
                    <div className="py-8 lg:py-10 container-outset">
                        <div className="relative flex flex-col items-center gap-4">
                            {/* 오른쪽 로고 영역 */}
                            <div className="lg:absolute top-0 right-0">
                                <div className="relative">
                                    <img
                                        src="/images/kbo-logo.png"
                                        className="w-[166px] h-auto opacity-80 hover:opacity-100 transition-opacity"
                                        alt="KBO Logo"
                                    />
                                </div>
                            </div>

                            {/* 중앙 카피라이트 */}
                            <div className="w-full text-center lg:px-[190px]">
                                <span className="inline-block text-sm font-mono text-center uppercase">
                                    © GREENFIELD BASEBALL INC. {currentYear}
                                </span>
                            </div>

                            {/* 왼쪽 약관 버튼 */}
                            <div className="lg:absolute top-0 left-0">
                                <button className="relative group">
                                    <div className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-green-600 transition-colors">
                                        <span className="text-sm font-bold tracking-wider">
                                            이용약관
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 구분선 SVG */}
                    <div className="border-x overflow-hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 879 100"
                            className="w-full h-auto mt-[-2px] mb-[-3px]"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                fill="none"
                                d="M0,50 H879 M219,0 v100 M439,0 v100 M659,0 v100"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    {/* 하단 마퀴 텍스트 */}
                    <div className="border-x">
                        <div className="marquee-wrap py-4">
                            <div className="marquee-content">
                                <div className="marquee-text" style={{ animationDuration: "30s" }}>
                                    <span className="mx-4">GREENFIELD BASEBALL INC.</span>
                                </div>
                                <div className="marquee-text" style={{ animationDuration: "30s" }}>
                                    <span className="mx-4">GREENFIELD BASEBALL INC.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

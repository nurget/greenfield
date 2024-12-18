const Banner = () => {
    const bannerTextA = "KBO RECORDS IN DIAMOND DATA.";
    const bannerTextB = "KIA TIGERS • SAMSUNG LIONS • LG TWINS • KT WIZ • DOOSAN BEARS • SSG LANDERS • LOTTE GIANTS • HANHWA EAGLES • NC DINOS • KIWOOM HEROES •";

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#1A72FF] to-[#FFB43C]">
            <div className="relative flex overflow-hidden">
                {/* 첫 번째 텍스트 그룹 */}
                <div className="animate-scroll flex whitespace-nowrap py-4">
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextA}</span>
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextB}</span>
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextA}</span>
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextB}</span>
                </div>
                {/* 두 번째 텍스트 그룹 (seamless loop를 위한 복제) */}
                <div className="animate-scroll flex whitespace-nowrap py-4">
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextA}</span>
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextB}</span>
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextA}</span>
                    <span className="text-white text-2xl font-bold mx-4">{bannerTextB}</span>
                </div>
            </div>
        </div>
    );
};

export default Banner;

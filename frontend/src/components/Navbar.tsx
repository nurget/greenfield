import GreenfieldLogo from "./Logo.tsx";

const Navbar = () => {
    return (
        <nav className="bg-green-500 text-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                {/* 로고 */}
                <div className="ml-4">
                    <GreenfieldLogo />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

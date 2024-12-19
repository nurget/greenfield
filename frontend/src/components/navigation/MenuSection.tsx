import { Link } from 'react-router-dom';

interface MenuItemProps {
    title: string;
    to: string;
}

export const CrossOutSymbol = () => (
    <svg style={{ display: 'none' }}>
        <symbol id="cross-out" viewBox="0 0 400 100" preserveAspectRatio="none" stroke="white" strokeWidth="1">
            <path d="M0,0 L400,100 M400,0 L0,100" />
        </symbol>
    </svg>
);

export const MenuItem: React.FC<MenuItemProps> = ({ title, to }) => {
    return (
        <div className="flex-1">
            <Link
                to={to}
                className="group relative flex justify-start h-full w-full px-3 sm:px-4 md:px-6 lg:px-[1.5rem] py-4 sm:py-5 md:py-6 lg:py-[2rem]
                   text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-syne font-bold transition-all"
            >
                {title}
                <svg
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                        height: '100%',
                        width: '100%',
                        left: '0',
                        top: '0'
                    }}
                    preserveAspectRatio="none"
                >
                    <use href="#cross-out"/>
                </svg>
            </Link>
        </div>
    );
};

import { Link } from 'react-router-dom';

export const MenuGrid = () => {
    return (
        <div className="grid grid-cols-3 h-full border-t border-[var(--grid-border-color)]">
            <MenuLink to="/records/2024" text="2024 Records" />
            <MenuLink to="/predictions/2025" text="2025 Predictions" />
            <MenuLink to="/stats" text="Sabermetrics" />
        </div>
    );
};

const MenuLink: React.FC<{ to: string; text: string }> = ({ to, text }) => (
    <Link
        to={to}
        className="grid-border border-r last:border-r-0 flex items-center justify-center
               text-white text-2xl lg:text-3xl font-bold hover:bg-white/10 transition-colors
               p-8 font-[Space Grotesk]"
    >
        {text}
    </Link>
);

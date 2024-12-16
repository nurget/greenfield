const buttons = [
    { label: "2024 기록 보기", path: "/records/2024" },
    { label: "2025 순위 예측", path: "/predictions/2025" },
    { label: "팀 & 선수 기록", path: "/stats" },
    { label: "2025 예상 순위", path: "/analytics/2025" },
];

const Buttons = () => {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((btn, index) => (
                <button
                    key={index}
                    className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
};

export default Buttons;

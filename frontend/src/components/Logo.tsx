import React from "react";

const GreenfieldLogo: React.FC = () => {
    return (
        <h1 style={styles.logoText}>GREENFIELD</h1>
    );
};

const styles = {
    logoText: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "2rem", // Navbar에 맞게 크기 조정
        letterSpacing: "0.2rem",
        color: "#fff", // 흰색으로 변경
    },
};

export default GreenfieldLogo;

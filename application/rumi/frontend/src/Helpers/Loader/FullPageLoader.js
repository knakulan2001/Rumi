import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const FullPageLoader = () => {
    return (
        <div className="loading">
            <ScaleLoader height={28} width={10} radius={0} margin={2} color="#1da699" speedMultiplier={1.7} />
            <div>Loading...</div>
        </div>
    );
};

export default FullPageLoader;

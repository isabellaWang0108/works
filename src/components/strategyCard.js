import React from "react";

const StrategyCard = ({ index, title, children }) => (
    <div className="strategy-card">
        <span className="strategy-card-index">{index}</span>
        <h4>{title}</h4>
        <p>{children}</p>
    </div>
);

export default StrategyCard;

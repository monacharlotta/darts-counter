import { useState } from "react";

const PlayerScores = ({ playerName }) => {
    
    const [scores, setScores] = useState([]);
    const [scoreTotal, setScoreTotal] = useState(0);
    return (
        <>
            <div style={{ borderBottom: 'solid' }}>
                <h1>{playerName}</h1>
            </div>
            something
            <div style={{ borderTop: 'solid'}}>
                <h4>Total: {scoreTotal}</h4>
            </div>
            
        </>
    );
}

export default PlayerScores;
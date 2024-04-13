import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PlayerScores from "./PlayerScores";

const ScoreBoard = ({ players, initialScore }) => {
    
    return (
        <Container fluid="md" style={{ backgroundColor: 'Silver' }}>
            <Row style={{ borderStyle:'dashed'}}>
                <h1>Darts Counter - {initialScore} up</h1>
            </Row>
            <Row>
                <Col><PlayerScores playerName={players[0]} /></Col>
                <Col><PlayerScores playerName={players[1]} /></Col>
            </Row>
        </Container>
    );
}

export default ScoreBoard;
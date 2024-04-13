import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DartsContext } from '../App';

const Setup = ({ setPlayers, setInitialScore, setSetSize }) => {
    // State
    let player1Name = '';
    let player2Name = '';
    const { setSize } = useContext(DartsContext); // get set size from parent through the use of context
    const [validated, setValidated] = useState(false);
    const [setSizeIsValid, setSetSizeIsValid] = useState(true);
  
  	const handleSubmit = event => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
			
		// Force set size to be an odd number
		if (setSize % 2 === 0) {
			setSetSizeIsValid(false);
			setValidated(true);
			return; // Need to return as form would be considered valid even with even set size below
		}

		if (form.checkValidity() === true) {
			// If the form is valid (and setsize is odd) we set the players array with the new names
			// We have already set the setSize itself to the parent property as it is done continuously on input
			setPlayers([player1Name, player2Name]);
		}
			
		setValidated(true);
  	}

	// CSS
	const style = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	};
	
    return (
      <Form style={style} noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Player 1 Name</Form.Label>
          <Form.Control type="text" onChange={e => player1Name = e.target.value} required placeholder="Player 1" />
          <Form.Control.Feedback type="invalid">Please enter a name!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Enter Player 2 Name</Form.Label>
          <Form.Control type="text" onChange={e => player2Name = e.target.value} required placeholder="Player 2" />
          <Form.Control.Feedback type="invalid">Please enter a name!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group style={{paddingBottom: '10px'}}>
          <Form.Check inline defaultChecked name="mode" label="301 up" onInput={() => setInitialScore(301)} type="radio" />
          <Form.Check inline name="mode" label="501 up" onInput={() => setInitialScore(501)} type="radio" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Set size</Form.Label>
          <Form.Control min={1} isInvalid={!setSizeIsValid} type="number" onChange={e => setSetSize(e.target.value)} required value={setSize} />
          <Form.Control.Feedback type="invalid">Please enter an odd set size!</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Start</Button>
    </Form>
  )
}

export default Setup;
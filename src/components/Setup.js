import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Setup = ({ setPlayers, setInitialScore }) => {
    // State
    let player1Name = '';
    let player2Name = '';
    const [validated, setValidated] = useState(false);
  
  	const handleSubmit = event => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		else {
			setPlayers([player1Name, player2Name]);
		}
			
    	setValidated(true);
  	}

    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
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
        <Button type="submit">Start</Button>
    </Form>
  )
}

export default Setup
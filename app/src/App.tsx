import { useState } from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, Form, Table } from 'react-bootstrap'

const App = () => {
	const [players, setPlayers] = useState<string>('')
	const [dist, setDist] = useState<boolean>(false)
	const [res, setRes] = useState<Array<string>>([])

	// Reset
	const sendReset = (): void => {
		setDist(false)
		setPlayers('')
	}

	// Send request to backend.
	const sendRequest = ({players} : {players: any}): void => {
		const data = { players: players };
		fetch("http://localhost/api/index.php",
		{
			method: "POST",
			body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status === "error"){
				alert(data.message)
				setDist(false)
				setPlayers('')
			} else {
				setRes(data.distributed)
				setDist(true)
			}
		})
	};

	// Render
	return (
		<div>
			<header className="App-header">
				<Card className="my-5" style={{ color: "#000", width: '90vw', maxWidth: '800px' }}>
					<Card.Header>Simple Card Distributor</Card.Header>
					<Card.Body>
						<Form.Group className="mb-3" controlId="players">
							<Form.Label>Number of Players</Form.Label>
							<Form.Control onChange={e => setPlayers(e.target.value)} value={players} type="text" placeholder="Enter number from 1 - 52" />
							<Form.Text className="text-muted">
							Enter number of players that will be playing.
							</Form.Text>
						</Form.Group>
						<div className="App">
							<Button onClick={() => sendRequest({ players })} className="submit-button me-2" variant="primary">
								Distribute Cards
							</Button>
							<Button onClick={() => sendReset()} className="submit-button me-2" variant="danger">
								Reset
							</Button>
							<Table style={{ display: dist ? 'table' : 'none' }} striped bordered className="mt-4">
								<thead>
									<tr>
									<th style={{ width: "20%" }}>Player</th>
									<th>Cards</th>
									</tr>
								</thead>
								<tbody>
								{res.map((cards, index) => (
									<tr key={index}>
										<td>{index+1}</td>
										<td>{cards+''}</td>
									</tr>
								))}
								</tbody>
							</Table>
						</div>
					</Card.Body>
				</Card>
			</header>
		</div>
	)
}

export default App
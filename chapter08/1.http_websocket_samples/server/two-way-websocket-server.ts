import * as express from 'express';
import * as path from 'path';
import { Server } from 'ws';

class Product {
	constructor (public id : number,
	             public title : string,
	             public price : number) {
	}
}

const products = [
	new Product(0, 'First Product', 24.99),
	new Product(1, 'Second Product', 64.99),
	new Product(2, 'Third Product', 74.99)
];

function getProducts () : Product[] {
	return products;
}

const app = express();

app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));

app.get('/products', (req, res) => {
	res.json(getProducts());
});

// HTTP Server
const httpServer = app.listen(8000, 'localhost', () => {
	const { port } = httpServer.address();
	console.log('HTTP Server is listening on %s', port);
});

// WebSocket Server
const wsServer : Server = new Server({ port : 8085 });
console.log('WebSocket server is listening on port 8085');

wsServer.on('connection', websocket => {
	websocket.send('This message was pushed by the WebSocket server');

	websocket.on('message', message => console.log('Server received: %s', message));
});
import * as express from 'express';
import * as path from 'path';
import { Server as HttpServer } from 'http';
import { Server as WsServer } from 'ws';
import { getProducts, getProductById, getReviewsByProductId } from './model';

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/products', (req, res) => {
	res.json(getProducts(req.query));
});

app.get('/products/:productId', (req, res) => {
	res.json(getProductById(parseInt(req.params.productId)));
});

app.get('/products/:productId/reviews', (req, res) => {
	res.json(getReviewsByProductId(parseInt(req.params.productId)));
});

// HTTP Server
const httpServer : HttpServer = app.listen(8000, 'localhost', () => {
	const { port } = httpServer.address();
	console.log('HTTP Server is listening on %s', port);
});


// WebSocket Server listening to the same port as HTTP server
const wsServer : WsServer = new WsServer({ server : httpServer });

wsServer.on('connection', ws => {
	ws.on('message', message => {
		let subscriptionRequest = JSON.parse(message);
		subscribeToProductBids(ws, subscriptionRequest.productId);
	});
});

const subscriptions = new Map<any, number[]>();

function subscribeToProductBids (client, productId : number) : void {
	let products = subscriptions.get(client) || [];
	subscriptions.set(client, [...products, productId]);
}

// helper functions
setInterval(() => {
	generateNewBids();
	broadcastNewBidsToSubscribers();
}, 2000);

const currentBids = new Map<number, number>();

function generateNewBids () {
	getProducts().forEach(p => {
		const currentBid = currentBids.get(p.id) || p.price;
		const newBid = random(currentBid, currentBid + 5); // Max bid increase is $5
		currentBids.set(p.id, newBid);
	});
}

function broadcastNewBidsToSubscribers () {
	subscriptions.forEach((products : number[], ws : WebSocket) => {
		if (ws.readyState === 1) { // 1 - READY_STATE_OPEN
			let newBids = products.map(pid => ({
				productId : pid,
				bid : currentBids.get(pid)
			}));
			ws.send(JSON.stringify(newBids));
		} else {
			subscriptions.delete(ws);
		}
	});
}

function random (low : number, high : number) : number {
	return Math.random() * (high - low) + low;
}
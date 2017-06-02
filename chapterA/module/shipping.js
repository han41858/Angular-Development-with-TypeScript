import { processPayment } from 'billing.js';

export function ship () {
	processPayment();
	console.log('Shipping products...');
}

function calculateShippingCost () {
	console.log('Calculating shipping cost');
}
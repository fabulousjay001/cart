/** @format */

const reducer = (state, action) => {
	if (action.type === 'CLEAR_CART') {
		return { ...state, cart: [] };
	}
	if (action.type === 'REMOVE') {
		return {
			...state,
			cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
		};
	}
	if (action.type === 'INCREASE') {
		let temporaryCart = state.cart.map((cartItem) => {
			if (cartItem.id === action.payload) {
				return { ...cartItem, amount: cartItem.amount + 1 };
			}
			return cartItem;
		});
		return { ...state, cart: temporaryCart };
	}
	if (action.type === 'DECREASE') {
		let temporaryCart = state.cart
			.map((cartItem) => {
				if (cartItem.id === action.payload) {
					return { ...cartItem, amount: cartItem.amount - 1 };
				}
				return cartItem;
			})
			.filter((cartItem) => cartItem.amount !== 0); //you dont wanna have negative number or go below 0.If its lesser than 0, the cartItem should be removed
		return { ...state, cart: temporaryCart };
	}

	if (action.type === 'GET_TOTALS') {
		const { total, amount } = state.cart.reduce(
			(cartTotal, cartItem) => {
				const { price, amount } = cartItem;

				const itemtotal = price * amount;
				cartTotal.total += itemtotal;
				cartTotal.amount += amount; //add the amount properties value to the cart

				return cartTotal;
			},
			{
				total: 0,
				amount: 0,
			}
		);

		const newTotal = parseFloat(total.toFixed(2)); //round of 2dp

		return { ...state, total: newTotal, amount };
	}
	if (action.type === 'LOADING') {
		return { ...state, loading: true };
	}

	if (action.type === 'DISPLAY_ITEMS') {
		return { ...state, cart: action.payload };
	}
	return state; //default case
};

export default reducer;

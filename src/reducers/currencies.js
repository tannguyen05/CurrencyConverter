import {
    SWAP_CURRENCY,
    CHANGE_AMOUNT,
    DEPARTURE_SELECTOR,
    ARRIVAL_SELECTOR,
    GET_RATES
} from "../actions/type";

const initialState = {
    departureCurrency: "USD",
    arrivalCurrency: "VND",
    amount: 0,
    convertion: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SWAP_CURRENCY:
            return {
                ...state,
                departureCurrency: state.arrivalCurrency,
                arrivalCurrency: state.departureCurrency
            };
        case CHANGE_AMOUNT:
            return { ...state, amount: action.payload };
        case DEPARTURE_SELECTOR:
            return {
                ...state,
                departureCurrency: action.payload
            };
        case ARRIVAL_SELECTOR:
            return { ...state, arrivalCurrency: action.payload };
        case GET_RATES:
            return { ...state, convertion: action.payload };
        default:
            return state;
    }
}

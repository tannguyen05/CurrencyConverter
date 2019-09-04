import {
    SWAP_CURRENCY,
    CHANGE_AMOUNT,
    DEPARTURE_SELECTOR,
    ARRIVAL_SELECTOR,
    GET_RATES,
    CHANGE_THEME
} from "./type";
import { getRates } from "../api/getRates";

export const changeAmount = amount => ({
    type: CHANGE_AMOUNT,
    payload: amount
});
export const getDepartureValue = value => ({
    type: DEPARTURE_SELECTOR,
    payload: value
});

export const getArrivalValue = value => ({
    type: ARRIVAL_SELECTOR,
    payload: value
});

export const rates = payload => ({
    type: GET_RATES,
    payload: payload
});

export const swapCurrency = () => ({
    type: SWAP_CURRENCY
});

export const changeTheme = value => ({
    type: CHANGE_THEME,
    payload: value
});

export const getRatesApi = () => async (dispatch, getState) => {
    try {
        dispatch(rates({}));
        const base = getState().currencies.departureCurrency;
        const payload = await getRates(base);
        if (payload.result == "error") {
            alert(payload.error_type);
            dispatch(rates({}));
        } else {
            dispatch(rates(payload));
        }
    } catch (e) {
        console.log(e);
    }
};

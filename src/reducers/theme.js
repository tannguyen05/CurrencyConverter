import { CHANGE_THEME } from "../actions/type";

const initialState = {
    name: "NavyBlue",
    hex: "#12213b"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                name: action.payload.name,
                hex: action.payload.hex
            };
        default:
            return state;
    }
}

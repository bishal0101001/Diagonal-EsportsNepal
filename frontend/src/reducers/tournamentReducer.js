import {
  TOURNAMENT_REGISTER_REQUEST,
  TOURNAMENT_REGISTER_SUCCESS,
  TOURNAMENT_REGISTER_FAIL,
  TOURNAMENT_REGISTER_CANCEL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from "../constants/tournamentConstants";

export const registerForTournamentReducer = (state = {}, action) => {
  switch (action.type) {
    case TOURNAMENT_REGISTER_REQUEST:
      return { loading: true };
    case TOURNAMENT_REGISTER_SUCCESS:
      return { loading: false, registeredTournament: action.payload };
    case TOURNAMENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case TOURNAMENT_REGISTER_CANCEL:
      return {};
    default:
      return state;
  }
};

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return { loading: true };
    case PAYMENT_SUCCESS:
      return { loading: false, paid: action.payload };
    case PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

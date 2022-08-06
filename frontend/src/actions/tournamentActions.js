import {
  TOURNAMENT_REGISTER_REQUEST,
  // TOURNAMENT_REGISTER_SUCCESS,
  // TOURNAMENT_REGISTER_FAIL,
  // TOURNAMENT_REGISTER_CANCEL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from "./../constants/tournamentConstants";
import axios from "axios";

import { renderError } from "../utils/renderActionErrors";

export const registerForTournamentAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOURNAMENT_REGISTER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo.token,
        },
      };

      const { data } = await axios.post(`/tournament/${id}`, {}, config);
      console.log(data, "data");
    } catch (error) {}
  };

export const paymentAction = () => async (dispatch) => {
  try {
    dispatch(PAYMENT_REQUEST);

    //Payment Verification with payment gateway

    dispatch({ type: PAYMENT_SUCCESS, payload: { isPaid: true } });
  } catch (error) {
    dispatch({ type: PAYMENT_FAIL, error: renderError(error) });
  }
};

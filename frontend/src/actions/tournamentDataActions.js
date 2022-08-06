import axios from "axios";
import {
  GET_TOURNAMENT_DATA_REQUEST,
  GET_TOURNAMENT_DATA_SUCCESS,
  GET_TOURNAMENT_DATA_FAIL,
  GET_DATA,
  GET_TABLE_HEADER_DATA,
  SORT_COLUMN,
} from "../constants/tournamentConstants";
import { renderError } from "./../utils/renderActionErrors";

export const tableDataAction = (eventData) => async (dispatch) => {
  dispatch({ type: GET_DATA, payload: eventData });
};

export const tournamentData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TOURNAMENT_DATA_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: userInfo.token,
    //   },
    // };

    const { data } = await axios.get("/api/tournament");

    dispatch({ type: GET_TOURNAMENT_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TOURNAMENT_DATA_FAIL, payload: renderError(error) });
  }
};

export const updateTournamentParticipants = (data) => (dispatch, getState) => {
  let key = Object.keys(data?.data);
  const updatedData = data?.data[key[1]];
  const schemaId = data?.schema._id;

  const { tournamentData } = getState();
  tournamentData &&
    tournamentData.data?.forEach((item) => {
      if (item._id === schemaId) {
        item.tournament.forEach((j) => {
          if (j._id === updatedData.tournamentId)
            j.participants.push(data?.data[key[1]]);
        });
      }
    });
  dispatch({
    type: GET_TOURNAMENT_DATA_SUCCESS,
    payload: tournamentData.data,
  });
};

export const tableHeaderAction = (columns) => async (dispatch) => {
  dispatch({ type: GET_TABLE_HEADER_DATA, payload: columns });
};

export const sortColumnAction = (data) => (dispatch) => {
  dispatch({ type: SORT_COLUMN, payload: data });
};

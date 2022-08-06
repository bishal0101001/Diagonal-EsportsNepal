import {
  GET_TOURNAMENT_DATA_REQUEST,
  GET_TOURNAMENT_DATA_SUCCESS,
  GET_TOURNAMENT_DATA_FAIL,
  GET_DATA,
  GET_TABLE_HEADER_DATA,
  SORT_COLUMN,
} from "../constants/tournamentConstants";

export const tournamentDataReducer = (state = null, action) => {
  switch (action.type) {
    case GET_TOURNAMENT_DATA_REQUEST:
      return { loading: true };
    case GET_TOURNAMENT_DATA_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_TOURNAMENT_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const tableHeader = (state = { columns: null }, action) => {
  switch (action.type) {
    case GET_TABLE_HEADER_DATA:
      return { columns: action.payload };
    default:
      return state;
  }
};
const teamsData = (state = null, action) => {
  switch (action.type) {
    case GET_DATA:
      return action.payload;
    default:
      return state;
  }
};

export const tableDataReducer = (
  state = { data: null, headers: { columns: null } },
  action
) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, data: teamsData(state.data, action) };
    case GET_TABLE_HEADER_DATA:
      return { ...state, headers: tableHeader(state.headers, action) };
    default:
      return state;
  }
};

export const sortColumnReducer = (
  state = { path: "rank", order: "asc" },
  action
) => {
  switch (action.type) {
    case SORT_COLUMN:
      return action.payload;
    default:
      return state;
  }
};

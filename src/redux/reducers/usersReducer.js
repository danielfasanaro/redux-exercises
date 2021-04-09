import {
  SET_SEARCH_QUERY,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  IS_FETCHING,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAIL,
  FETCH_USER_REPOS_SUCCESS,
  FETCH_USER_REPOS_FAIL
} from '../actions';

const INITIAL_USERSREDUCER_STATE = {
  searchQuery: '',
  users: [],
  error: '',
  isFetching: false,
  userDetails: {},
  userRepos: [],
};

const usersReducer = (state = INITIAL_USERSREDUCER_STATE, action) => {
  switch(action.type) {
  case SET_SEARCH_QUERY:
    return {
      ...state,
      searchQuery: action.searchQuery,
    };
  case FETCH_USERS_SUCCESS:
    return {
      ...state,
      users: action.users,
      isFetching: false,
    }
  case FETCH_USERS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    }
  case IS_FETCHING:
    return {
      ...state,
      isFetching: true,
    }
  case FETCH_USER_DETAILS_SUCCESS:
    return {
      ...state,
      userDetails: action.userDetails,
      isFetching: false,
    }
  case FETCH_USER_DETAILS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    }
  case FETCH_USER_REPOS_SUCCESS:
    return {
      ...state,
      userRepos: action.userRepos,
    }
  case FETCH_USER_REPOS_FAIL:
    return {
      ...state,
      error: action.error,
    }
  default:
    return state;
  }
}

export default usersReducer;

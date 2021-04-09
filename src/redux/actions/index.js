export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
export const IS_FETCHING = 'IS_FETCHING';
export const FETCH_USER_DETAILS_SUCCESS = 'FETCH_USER_DETAILS_SUCCESS';
export const FETCH_USER_DETAILS_FAIL = 'FETCH_USER_DETAILS_FAIL';
export const FETCH_USER_REPOS_SUCCESS = 'FETCH_USER_REPOS_SUCCESS';
export const FETCH_USER_REPOS_FAIL = 'FETCH_USER_REPOS_SUCCESS';


export const setSearchQuery = (searchQuery) => ({
  type: SET_SEARCH_QUERY,
  searchQuery,
});

export const fetchUsers = (githubUser) => (
  async (dispatch) => {
    dispatch(isFetching);
    try {
      const fetchResponse = await fetch(`https://api.github.com/search/users?q=${githubUser}+in:login&per_page=5`);
      const usersResult = await fetchResponse.json();
      return dispatch(fetchUsersSucess(usersResult));
    } catch (error) {
      return dispatch(fetchUsersFail(error));
    }
  }
)

export const fetchUserDetails = (username) => (
  async (dispatch) => {
    dispatch(isFetching);
    await setTimeout(null, 3000);
    try {
      const fetchResponse = await fetch(`https://api.github.com/users/${username}`);
      const userDetailsResult = await fetchResponse.json();
      return dispatch(fetchUserDetailsSuccess(userDetailsResult));
    } catch (error) {
      return dispatch(fetchUserDetailsFail(error));
    }
  }
)

export const fetchUserRepos = (username) => (
  async (dispatch) => {
    try {
      const fetchResponse = await fetch(`https://api.github.com/users/${username}/repos?type=owner&sort=updated`);
      const userReposResult = await fetchResponse.json();
      return dispatch(fetchUserReposSuccess(userReposResult));
    } catch (error) {
      return dispatch(fetchUserReposFail(error));
    }
  }
)

export const isFetching = () => ({
  type: IS_FETCHING,
});

const fetchUsersSucess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users,
})

const fetchUsersFail = (error) => ({
  type: FETCH_USERS_FAIL,
  error,
});

export const fetchUserDetailsSuccess = (userDetails) => ({
  type: FETCH_USER_DETAILS_SUCCESS,
  userDetails,
})

export const fetchUserDetailsFail = (error) => ({
  type: FETCH_USER_DETAILS_FAIL,
  error,
})

export const fetchUserReposSuccess = (userRepos) => ({
  type: FETCH_USER_REPOS_SUCCESS,
  userRepos,
})

export const fetchUserReposFail = (error) => ({
  type: FETCH_USER_REPOS_FAIL,
  error,
})

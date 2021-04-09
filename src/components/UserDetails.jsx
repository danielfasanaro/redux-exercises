import React from 'react';
import { connect } from 'react-redux';
import { fetchUserDetails, fetchUserRepos } from '../redux/actions';
import './UserDetails.css'

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date().getTime(),
    }
    this.renderLastUpdate = this.renderLastUpdate.bind(this);
  }

  componentDidMount() {
    const {
      dispatchFetchUserDetails,
      dispatchFetchUserRepos,
      match: { params: { username } } } = this.props;
    dispatchFetchUserDetails(username);
    dispatchFetchUserRepos(username);
  }

  renderLastUpdate(repo) {
    const { currentDate } = this.state;
    const repoDate = new Date(repo.updated_at).getTime();
    const lastUpdated = Math.ceil((currentDate - repoDate) / (1000 * 60 * 60 * 24));
    if (lastUpdated <= 1) return `${lastUpdated} day`;
    return `${lastUpdated} days`
  }

  render() {
    const {
      userDetails,
      userRepos,
      isFetching,
      match: { params: { username } },
    } = this.props;
    if (isFetching) return <h1 className="user-detaisl-div">Loading</h1>
    return (
      <div className="user-details-div">
        <aside>
          <img src={ userDetails.avatar_url } alt={ username }/>
          <h2>{ userDetails.name }</h2>
          <h3>{ username }</h3>
          <h3>{ userDetails.bio }</h3>
          <a href={ userDetails.blog }>{ userDetails.blog }</a>
        </aside>
        <div className="repo-list-div">
          <h2>Repositories</h2>
          { userRepos.filter((repo, index) => index < 3).map((repo, index) => {
            return (
              <div className="repo-div">
                <h3><a href={ repo.html_url }>{repo.name}</a></h3>
                <div>
                  <p className="repo-language">{ repo.language }</p>
                  <p>Updated { this.renderLastUpdate(repo) } ago</p>
                </div>
              </div>
            )
          }
          ) }
        </div>
      </div>
    );
  }
}

const mapStateToProps =(state) => ({
  userDetails: state.usersReducer.userDetails,
  userRepos: state.usersReducer.userRepos,
  isFetching: state.usersReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchUserDetails: (username) => dispatch(fetchUserDetails(username)),
  dispatchFetchUserRepos: (username) => dispatch(fetchUserRepos(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

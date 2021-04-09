import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, setSearchQuery } from '../redux/actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: '',
    };

    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.renderUsersList = this.renderUsersList.bind(this);
  }

  handleSearchBar({ target: { name, value }}) {
    const { dispatchSetSearchQuery } = this.props;
    this.setState({ [name]: value }, () => dispatchSetSearchQuery(value));
  }

  handleSearchButton() {
    const { dispatchFetchUsers, searchQuery } = this.props;
    dispatchFetchUsers(searchQuery);
  }

  renderUsersList() {
    const { users } = this.props;
    if (users.items) {
      return users.items.map((user) => (
        <Link
          to={`/details/${user.login}`}
          key={user.id}
          className="user-links"
        >
          {user.login}
        </Link>
      ));
    }
  }

  render() {
    const { searchBar } = this.state;
    const { isFetching } = this.props;
    return (
      <div>
        <label htmlFor="search-bar">
          Search for Github user:
          <input
            type="text"
            id="search-bar"
            name="searchBar"
            value={ searchBar }
            onChange={ this.handleSearchBar }/>
        </label>
        <button onClick={ this.handleSearchButton }>
          Search
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          { isFetching || this.renderUsersList() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchQuery: state.usersReducer.searchQuery,
  users: state.usersReducer.users,
  error: state.usersReducer.error,
  isFetching: state.usersReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSearchQuery: (searchQuery) => dispatch(setSearchQuery(searchQuery)),
  dispatchFetchUsers: (searchQuery) => dispatch(fetchUsers(searchQuery)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

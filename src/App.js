import React, { useState } from 'react';

import GistList from './components/GistList';
import './styles.scss';

const blockName = 'search-page';

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [formErrors, setFormErrors] = useState(false);

  // set current page for future improvement as part of pagination for api calls
  const [currentPage, setCurrentPage] = useState(1);

  // handles state change for search box input
  const onSearchChange = e => {
    setSearchText(e.target.value)
    setFormErrors(false)
  }

  // handles search operation when clicked on search button
  const handleSubmit = async e => {
    e.preventDefault();
    if (searchText === '' || searchText === undefined) {
        setFormErrors(true)
    }
    else {
        const userGists =  await performSearch(searchText);
        setResults(userGists);
      }
  }

  // function to fetch gists for a user based on curret page and per page param
  const getUserGists = async(query) => {
    setLoading(false);
    return fetch(`https://api.github.com/users/${query}/gists?page=${currentPage}&per_page=5`)
        .then(res => res.json())
        .then(response => {
            setLoading(false);
            return(response)
        })
        .catch(error => {
            setFormErrors(true)
        })
  }

  const performSearch = async(query) => {
    // get users all gists
    const userGists = await getUserGists(query);

    //fetch gist forks for each gist and get last three forks
    let formattedUserGists = [];
      for(let i=0; i< userGists.length; i++) {
        let gist = userGists[i]
        let data = await fetch(`https://api.github.com/gists/${gist.id}/forks`)
        let contents = await data.json()
        if(contents.length) {
          let sortedForks = contents.sort(function(a,b){
            return new Date(b.created_at) - new Date(a.created_at);
          });
          let lastThreeForks = sortedForks.slice(0,3);
          let newGist = gist;
          newGist.lastThreeForks = lastThreeForks;
          formattedUserGists.push(newGist);
        }
      }
      return formattedUserGists; 
  }

  return (
    <div className={blockName}>
      <form className={`${blockName}__form`}>
        <input type="search"
          className={`${blockName}__text-input`}
          onChange={onSearchChange}
          name="search"
          placeholder="Search" />
        <button
          className={`${blockName}__search-button`}
          type="submit"
          id="submit"
          onClick={handleSubmit}>Search</button>
      </form>

      {formErrors && <p>Please enter valid search</p>}
      
      <div className={`${blockName}__search-results`}>
        {(loading) ? <p>Loading</p> : <GistList userGists={results} />}
      </div>
    </div>
  );
}

export default App;
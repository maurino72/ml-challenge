import React, { useState, useEffect } from "react";
import "./SearchBox.scss";
import logo from "../../assets/images/Logo_ML.png";
import searchIcon from "../../assets/images/ic_Search.png";
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Header({ onSubmit, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  let history = useHistory();
  let query = useQuery();

  useEffect(() => {
    if (query.get('search')) {
      setSearchTerm(query.get('search'));
    }
  }, [])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    history.push('/items?search=' + searchTerm);
  };

  return (
    <div className="header">
      <div className="wrapper__container">
        <div className="header__navbar">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Mercado Libre Logo" />
          </Link>

          <form className="header__search" 
            method="GET"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="header__searchInput"
              type="text"
              placeholder="Nunca dejes de buscar"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button className="header__searchButton">
              <img src={searchIcon} alt="Search Button" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);

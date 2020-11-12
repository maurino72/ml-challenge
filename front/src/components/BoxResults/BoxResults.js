import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./BoxResults.scss";
import Product from "./Product/Product";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BoxResults() {
  const query = useQuery();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    let queryString = query.get('search');
    let url = "http://localhost:3001/api/items?q=" + queryString

    if (queryString) {
      let response = await fetch(url);
      let data = await response.json();
      setSearchResults(data);
    }
  }, [query.get('search')]);

  return (
    <div className="boxResults">
      <div className="wrapper__container">
        <p className="boxResults__breadcrumb">
          {
            searchResults?.categories?.map(
              (category) => {
                return category
              }
            ).reduce((prev, curr) => [prev, ' > ', curr])
          }
        </p>

        <div className="boxResults__main">
          {searchResults?.items?.map((item, index) => {
            return <Product 
              key={index}
              item={item}
            />
          })}
        </div>
      </div>
    </div>
  );
}

export default BoxResults;

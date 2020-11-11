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

  useEffect(() => {
    let queryString = query.get('search');

    if (queryString) {
      return fetch("http://localhost:3001/api/items?q=" + queryString)
        .then(res => res.json())
        .then((response) => {
          setSearchResults(response);

          console.log(searchResults);
        })
        .catch((error) => console.log(error.message));
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
          {searchResults?.items?.map((item) => {
            return <Product 
              key={item.id}
              item={item}
            />
          })}
        </div>
      </div>
    </div>
  );
}

export default BoxResults;

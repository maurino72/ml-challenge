import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./BoxResults.scss";
import Product from "./Product/Product";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BoxResults() {
  const query = useQuery();
  const [items, setItems] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    let queryString = query.get('search');
    let url = "http://localhost:3001/api/items?q=" + queryString;

    if (queryString) {
      fetch(url)
        .then(res => res.json())
        .then((response) => {
          setCategories(response.categories);
          setItems(response.items);
        })
        .catch((error) => console.log(error.message));
    }
  }, [query.get('search')]);

  return (
    <div className="boxResults">
      <div className="wrapper__container">
        <p className="boxResults__breadcrumb">
          {categories?.length > 1 ?
            categories?.map(
              (category) => {
                return category
              }
            ).reduce((prev, curr) => [prev, ' > ', curr])
          : ''}
        </p>
        <div className="boxResults__main">
          {items?.map((item) => {
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

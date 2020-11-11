import React, { useEffect } from "react";
import "./Product.scss";
import shipping from '../../../assets/images/ic_shipping.png';
import CurrencyFormat from 'react-currency-format';
import { BrowserRouter as Router, Link } from 'react-router-dom'

function Product({ item }) {
  useEffect(() => {
    console.log(item);
  }, [])
  const id = item.id;
  return (
    <div className="product">
      <Link to={'/items/' + id}>
        <div className="product__container">
          <img className="product__image" src={item?.picture} alt=""/>

          <div className="product__info">
            <div className="product__priceInfo">
              <CurrencyFormat
                renderText={(value) => {
                  return (
                    <>
                      <p className="product__price">{value}</p>
                    </>
                  );
                }}
                decimalScale={2}
                value={item?.price?.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              {item?.free_shipping ? <img className="product__shippingImg" src={shipping} alt=""/> : {}}
            </div>
            <p className="product__location">Capital Federal</p>

            <div >
              <p className="product__description">{item?.title}</p>
            </div>
          </div>
        </div>

        <div className="product__divider"></div>
      </Link>
    </div>
  );
}

export default Product;
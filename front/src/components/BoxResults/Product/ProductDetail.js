import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './ProductDetail.scss';
import CurrencyFormat from 'react-currency-format';

function ProductDetail() {
    const { id } = useParams();
    const [data, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/items/' + id)
            .then((res) => res.json())
            .then(
                (data) => {
                    setData(data);
                }
            )
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="productDetail">
            <div className="wrapper__container">
                <p className="boxResults__breadcrumb">
                    {
                        data?.categories?.map(
                        (category) => {
                            return category
                        }
                        ).reduce((prev, curr) => [prev, ' > ', curr])
                    }
                </p>

                {data ? <div className="productDetail__container">
                    <div className="productDetail__heading">
                        <div className="productDetail__image">
                            <img className="productDetail__image" src={data?.item?.picture} alt=""/>
                        </div>
                        <div className="productDetail__info">
                            <p className="productDetail__condition">
                                {data?.item?.condition ? 'Nuevo' : ''} - {data?.item?.sold_quantity + " Productos Vendidos"}
                            </p>
                            <p className="productDetail__title">{data?.item?.title}</p>
                            <CurrencyFormat
                                renderText={(value) => {
                                return (
                                    <>
                                    <p className="productDetail__price">{value}</p>
                                    </>
                                );
                                }}
                                decimalScale={2}
                                value={data?.item?.price?.amount}
                                displayType={"text"}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                decimalScale={2}
                                prefix={"$"}
                                fixedDecimalScale={true}
                            />

                            <button className="productDetail__buyBtn">Comprar</button>
                        </div>
                    </div>
                    <div className="productDetail__description">
                        <h3 className="productDetail_descriptionTitle">Descripcion del Producto</h3>
                        <p className="productDetail__descriptionInfo">{data?.item?.description}</p>
                    </div>
                </div> : ''}
            </div>
        </div>
    )
}

export default ProductDetail

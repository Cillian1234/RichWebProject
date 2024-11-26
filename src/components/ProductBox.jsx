import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import './productBox.css'


export default function ProductBox(props) {

    const [productsData, setProductsData] = useState(props.data)
    const ProductBoxElements = (
        productsData.map((product, i) => (
            <div className="productBox" key={i} >
                <img src="https://www.krispykreme.ie/media/catalog/product/a/s/assorted_dozen_-_with_lip_result_1.png?quality=80&fit=bounds&height=&width=&canvas=:" alt={product.name} />
                <div className="productInfo">
                    <h2 className="itemName">{product.pName}</h2>
                    <p className="itemPrice">{product.pPrice}</p>
                    <Button className="addButton" variant="outlined" onClick={() => props.AddToCart(product.pName)}> Add to cart </Button>
                </div>
            </div>
        ))
    )

    return (
        <Box className="productBoxContainer">{ProductBoxElements}</Box>
    )
}
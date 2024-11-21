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
                <img src={null} alt={product.name} />
                <h2 className="itemName">{product.pName}</h2>
                <p className="itemPrice">{product.pPrice}</p>
                <Button className="addButton" variant="outlined" onClick={() => props.AddToCart(product.pName)}> Add to cart </Button>
            </div>
        ))
    )

    return (
        <Box className="productBoxContainer">{ProductBoxElements}</Box>
    )
}
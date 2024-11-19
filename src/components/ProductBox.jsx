import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";


export default function ProductBox(props) {

    const [productsData, setProductsData] = useState(props.data)
    const ProductBoxElements = (
        productsData.map((product, i) => (
            <div style={{padding: '20px'}} key={i} >
                {product.pName}
                <br/>
                {product.pPrice}
                <br/>
                <Button variant="outlined" onClick={() => props.AddToCart(product.pName)}> Add to cart </Button>
            </div>
        ))
    )

    return (
        <Box>{ProductBoxElements}</Box>
    )
}
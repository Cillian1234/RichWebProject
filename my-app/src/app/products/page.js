'use client'

import { useState, useEffect } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import {Container} from "@mui/material";
import Navbar from "@/components/Navbar";
import ProductBox from "@/components/ProductBox";

export default function MyApp() {

    function AddToCart(item) {
        console.log('AddToCart', item);
        fetch("http://localhost:3000/api/putInCart?item="+item);
    }

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    return (
        <Box>
            <Navbar />

            <Container className="ProductsList">
                <Box component="section">
                    This is a list of products.
                    <hr/>
                    {data != null &&
                        <ProductBox
                            data={data}
                            AddToCart = {AddToCart}
                        />}
                </Box>
            </Container>
        </Box>
    );
}
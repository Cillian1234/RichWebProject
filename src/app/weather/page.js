'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import {useEffect} from "react";


export default function MyApp() {

    const [weatherData, setWeatherData] = React.useState("");

    useEffect(() => {
        fetch("https://api.weatherapi.com/v1/current.json?key=e7c488c7a361474b85f144807242410&q=Dublin&aqi=no")
            .then(res => res.json())
            .then(data => setWeatherData(data))
    }, [])

    function buildWeatherDisplay() {
        return (
            <>
                <h1>Location: {weatherData.location.name}, {weatherData.location.country}</h1>
                <p>
                    Current temperature is {weatherData.current.temp_c}
                    <br/>
                    It feels like {weatherData.current.feelslike_c}
                </p>
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />

            <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                {weatherData && buildWeatherDisplay()}
            </Box>
        </Box>
    );
}
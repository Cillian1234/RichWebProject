import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import LogoPNG from "../../public/assets/KKLogo.png";
import * as React from "react";
import Box from "@mui/material/Box";


export default function Navbar() {
    return (
        <Toolbar className="Navbar">
            <Box className="NavLeft">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Link href="./">
                    <Image
                        src={LogoPNG}
                        alt="Krispy Kreme logo"
                        height={100}
                    />
                </Link>
            </Box>

            <Box className="NavRight">
                <Link href="./products">Products</Link>
                <Link href="./login">Login</Link>
                <Link href="./weather">Weather</Link>
            </Box>
        </Toolbar>
    )
}
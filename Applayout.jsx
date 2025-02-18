import Navbar from "./src/Pages/Navbar"
import { Outlet } from "react-router-dom"
const Applayout = () =>{
    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}
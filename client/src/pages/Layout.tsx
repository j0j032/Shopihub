import React, {useState} from "react";
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";
import {Navbar} from "../components/Navbar";
import {Sidebar} from "../components/Sidebar";
import {RootState} from "main";
import {useGetUser} from "../api/user";

function Layout() {
    const isNonMobile = useMediaQuery("(min-width: 800px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(isNonMobile);
    const userId = useSelector((state: RootState) => state.global.userId);
    const {data, isLoading} = useGetUser(userId)

    return (
        <Box display={isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
            {!isLoading && (
                <>
                    <Sidebar isNonMobile={isNonMobile} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
                             drawerWidth='250px' user={data}/>
                    <Box flexGrow='1'>
                        <Navbar isNonMobile={isNonMobile} user={data} isSidebarOpen={isSidebarOpen}
                                setIsSidebarOpen={setIsSidebarOpen}/>
                        <Outlet/>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default Layout

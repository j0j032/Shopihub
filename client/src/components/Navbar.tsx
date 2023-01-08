import React, {Dispatch, SetStateAction, useState} from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined, ChevronLeftOutlined
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import {useDispatch} from "react-redux";
import {setMode} from "../reducers/globalSlice";
import profilePic from '../assets/profile.jpg'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import User from "../types/User";
import {PaletteColorKey} from "../../mui";

type NavbarProps = {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
    user?: User,
    isNonMobile: boolean
}


export function Navbar({isNonMobile, isSidebarOpen, setIsSidebarOpen, user}: NavbarProps) {
    const dispatch = useDispatch()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);
    const paddingLeft = isSidebarOpen && isNonMobile ? '240px' : '0'

    return <AppBar sx={{
        position: 'fixed',
        background: 'none',
        boxShadow: 'none',
        backdropFilter: 'blur(10px)',
        paddingLeft: paddingLeft
    }}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <ChevronLeftOutlined/> : <MenuIcon/>}
                </IconButton>
                <FlexBetween backgroundColor={theme.palette.background.paper} borderRadius='9px'
                             p='0 0 0 1rem' m='0 1rem 0 1rem' minWidth='140px'>
                    <InputBase placeholder='Search..'/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            </FlexBetween>

            <FlexBetween gap='0.4rem'>
                <IconButton onClick={() => dispatch(setMode(null))}>
                    {theme.palette.mode === 'dark'
                        ? <DarkModeOutlined sx={{fontSize: '24px'}}/>
                        : <LightModeOutlined sx={{fontSize: '24px'}}/>}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{fontSize: '24px'}}/>
                </IconButton>
                {isNonMobile && (
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                component='img'
                                alt='profile'
                                src={profilePic}
                                height='32px'
                                width='32px'
                                borderRadius='50%'
                                sx={{objectFit: "cover"}}
                            />
                            <Box textAlign='left'>
                                <Typography
                                    fontWeight='bold'
                                    fontSize='0.85rem'
                                    sx={{color: theme.palette.secondary[100 as PaletteColorKey]}}
                                >
                                    {user?.name}
                                </Typography>
                                <Typography
                                    fontSize='0.75rem'
                                    sx={{color: theme.palette.secondary[200 as PaletteColorKey]}}
                                >
                                    {user?.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{color: theme.palette.secondary[300 as PaletteColorKey], fontSize: "25px"}}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                        >
                            <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                )}
            </FlexBetween>
        </Toolbar>
    </AppBar>
}

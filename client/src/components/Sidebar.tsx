import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {SettingsOutlined, ChevronLeft, ChevronRightOutlined} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profilePic from '../assets/profile.jpg'
import {navItems} from "../config/navItems";
import User from "../types/User";
import {PaletteColorKey} from "../../mui";

type SidebarProps = {
    isNonMobile: boolean,
    drawerWidth: string,
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
    user?: User
}

export function Sidebar({isNonMobile, drawerWidth, isSidebarOpen, setIsSidebarOpen, user}: SidebarProps) {
    const {pathname} = useLocation();
    const [active, setActive] = useState<string | number | undefined>("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component='nav'>
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200 as PaletteColorKey],
                            backgroundColor: theme.palette.background.paper,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width='100%'>
                        <Box m='1.5rem 2rem 2rem 3rem'>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display='flex' alignItems='center' gap='0.5rem'>
                                    <Typography variant='h3' fontWeight='bold'>
                                        Shopi*hub
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({text, icon}) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{m: "2.25rem 0 1rem 3rem"}}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[300 as PaletteColorKey]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette.primary[600 as PaletteColorKey]
                                                        : theme.palette.secondary[100 as PaletteColorKey],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600 as PaletteColorKey]
                                                            : theme.palette.secondary[200 as PaletteColorKey],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text}/>
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ml: "auto"}}/>
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    <Box position='absolute' bottom='2rem'>
                        <Divider/>
                        <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 3rem'>
                            <Box component='img' alt='profile' src={profilePic} height='40px'
                                 width='40px' borderRadius='50%' sx={{objectFit: 'cover'}}/>
                            <Box textAlign='left'>
                                <Typography fontWeight='bold' fontSize='0.9rem'
                                            sx={{color: theme.palette.secondary[100 as PaletteColorKey]}}>
                                    {user?.name}
                                </Typography>
                                <Typography fontSize='0.8rem'
                                            sx={{color: theme.palette.secondary[200 as PaletteColorKey]}}>
                                    {user?.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{color: theme.palette.secondary[300 as PaletteColorKey], fontSize: '25px'}}/>
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

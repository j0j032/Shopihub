import {Box, Typography, useTheme} from "@mui/material";
import {PaletteColorKey} from "../../mui";
import FlexBetween from "./FlexBetween";
import {ReactNode} from "react";

type StatBoxProps = {
    title: string
    value: number
    increase: string
    icon: ReactNode
    description: string
}

export function StatBox({title, icon, increase, value, description}: StatBoxProps) {
    const theme = useTheme();
    return (
        <Box
            gridColumn='span 2'
            gridRow='span 1'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            p='1.25rem 1rem'
            flex='1 1 100%'
            sx={{backgroundColor: theme.palette.background.paper}}
            borderRadius='0.55rem'
        >
            <FlexBetween>
                <Typography variant='h6' sx={{color: theme.palette.secondary[100 as PaletteColorKey]}}>
                    {title}
                </Typography>
                {icon}
            </FlexBetween>

            <Typography
                variant='h3'
                fontWeight='600'
                sx={{color: theme.palette.secondary[200 as PaletteColorKey]}}
            >
                {value}
            </Typography>
            <FlexBetween gap='1rem'>
                <Typography
                    variant='h5'
                    fontStyle='italic'
                    sx={{color: theme.palette.secondary.light}}
                >
                    {increase}
                </Typography>
                <Typography>{description}</Typography>
            </FlexBetween>
        </Box>
    );
}

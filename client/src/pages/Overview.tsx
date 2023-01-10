import {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, useTheme} from "@mui/material"
import {Header} from "../components/Header";
import {OverviewChart} from "../components/OverviewChart";

type OverviewProps = {}

export function Overview({}: OverviewProps) {
    const [view, setView] = useState("units");

    return (
        <Box padding='4.2rem 2.5rem 1.5rem 2.5rem'>
            <Header
                title='OVERVIEW'
                subtitle='Overview of general revenue and profit'
            />
            <Box height='75vh'>
                <FormControl sx={{mt: "1rem"}}>
                    <InputLabel>View</InputLabel>
                    <Select
                        value={view}
                        label='View'
                        onChange={(e) => setView(e.target.value)}
                    >
                        <MenuItem value='sales'>Sales</MenuItem>
                        <MenuItem value='units'>Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view}/>
            </Box>
        </Box>
    );
}

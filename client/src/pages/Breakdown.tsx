import {Box} from "@mui/material";
import {Header} from "../components/Header";
import {BreakdownChart} from "../components/BreakdownChart";

export function Breakdown() {
    return (
        <Box padding='4.2rem 2.5rem 1.5rem 2.5rem'>
            <Header title='BREAKDOWN' subtitle='Breakdown of Sales By Category'/>
            <Box mt='40px' height='75vh'>
                <BreakdownChart/>
            </Box>
        </Box>
    );
}

import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import {DataGrid, GridCellParams} from "@mui/x-data-grid";
import FlexBetween from "../components/FlexBetween";
import {Header} from "../components/Header";
import {DownloadOutlined, Email, PersonAdd, PointOfSale, Traffic} from "@mui/icons-material";
import {PaletteColorKey} from "../../mui";
import {OverviewChart} from "../components/OverviewChart";
import {BreakdownChart} from "../components/BreakdownChart";
import {useGetDashboardStats} from "../api/General/dashboard";
import {StatBox} from "../components/StatBox";

export function Dashboard() {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const {data, isLoading} = useGetDashboardStats()

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params: GridCellParams) => params.value.length,
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params: GridCellParams) => `$${Number(params.value).toFixed(2)}`,
        },
    ];

    return (
        <Box padding='4.2rem 2.5rem 1.5rem 2.5rem'>
            <FlexBetween>
                <Header title='DASHBOARD' subtitle='Welcome to your dashboard'/>

                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.paper,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlined sx={{mr: "10px"}}/>
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>

            <Box
                mt='20px'
                display='grid'
                gridTemplateColumns='repeat(12, 1fr)'
                gridAutoRows='160px'
                gap='20px'
                sx={{
                    "& > div": {gridColumn: isNonMediumScreens ? undefined : "span 12"},
                }}
            >
                {/* ROW 1 */}
                <StatBox
                    title='Total Customers'
                    value={data && data.totalCustomers}
                    increase='+14%'
                    description='Since last month'
                    icon={
                        <Email
                            sx={{color: theme.palette.secondary[300 as PaletteColorKey], fontSize: "26px"}}
                        />
                    }
                />
                <StatBox
                    title='Sales Today'
                    value={data && data.todayStats.totalSales}
                    increase='+21%'
                    description='Since last month'
                    icon={
                        <PointOfSale
                            sx={{color: theme.palette.secondary[300 as PaletteColorKey], fontSize: "26px"}}
                        />
                    }
                />
                <Box
                    gridColumn='span 8'
                    gridRow='span 2'
                    p='1rem'
                    borderRadius='0.55rem'
                    sx={{backgroundColor: theme.palette.background.paper}}
                >
                    <OverviewChart view='sales' isDashboard={true}/>
                </Box>
                <StatBox
                    title='Monthly Sales'
                    value={data && data.thisMonthStats.totalSales}
                    increase='+5%'
                    description='Since last month'
                    icon={
                        <PersonAdd
                            sx={{color: theme.palette.secondary[300 as PaletteColorKey], fontSize: "26px"}}
                        />
                    }
                />
                <StatBox
                    title='Yearly Sales'
                    value={data && data.yearlySalesTotal}
                    increase='+43%'
                    description='Since last month'
                    icon={
                        <Traffic
                            sx={{color: theme.palette.secondary[300 as PaletteColorKey], fontSize: "26px"}}
                        />
                    }
                />

                {/* ROW 2 */}
                <Box
                    gridColumn='span 8'
                    gridRow='span 3'
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderRadius: "5rem",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.secondary[100 as PaletteColorKey],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.background.paper,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.secondary[100 as PaletteColorKey],
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200 as PaletteColorKey]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        loading={isLoading || !data}
                        getRowId={(row) => row._id}
                        rows={(data && data.transactions) || []}
                        columns={columns}
                    />
                </Box>
                <Box
                    gridColumn='span 4'
                    gridRow='span 3'
                    p='1.5rem'
                    sx={{backgroundColor: theme.palette.background.paper}}
                    borderRadius='0.55rem'
                >
                    <Typography variant='h6' sx={{color: theme.palette.secondary[100 as PaletteColorKey]}}>
                        Sales By Category
                    </Typography>
                    <BreakdownChart isDashboard={true}/>
                    <Typography
                        p='0 0.6rem'
                        fontSize='0.8rem'
                        sx={{color: theme.palette.secondary[200 as PaletteColorKey]}}
                    >
                        Breakdown of real states and information via category for revenue
                        made for this year and total sales.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

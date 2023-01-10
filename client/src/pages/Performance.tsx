import {useGetUserPerformance} from "../api/Management/management";
import {useSelector} from "react-redux";
import {Box, useTheme} from "@mui/material";
import {Header} from "../components/Header";
import {PaletteColorKey} from "../../mui";
import {DataGrid, GridCellParams} from "@mui/x-data-grid";
import {CustomColumnMenu} from "../components/CustomColumnMenu";
import {RootState} from "../main";

export function Performance() {
    const theme = useTheme();
    const userId = useSelector((state: RootState) => state.global.userId);
    const {data, isLoading} = useGetUserPerformance(userId);

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
            <Header
                title='PERFORMANCE'
                subtitle='Track your Affiliate Sales Performance Here'
            />
            <Box
                mt='40px'
                height='75vh'
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
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
                        backgroundColor: theme.palette.primary.light,
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
                    rows={(data && data.sales) || []}
                    columns={columns}
                    components={{
                        ColumnMenu: CustomColumnMenu,
                    }}
                />
            </Box>
        </Box>
    );
}

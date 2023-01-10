import {Box, useTheme} from "@mui/material";
import {useGetAdmin} from "../api/Management/management";
import {Header} from "../components/Header";
import {PaletteColorKey} from "../../mui";
import {DataGrid, GridCellParams} from "@mui/x-data-grid";
import {CustomColumnMenu} from "../components/CustomColumnMenu";

export function Admin() {
    const theme = useTheme();
    const {data, isLoading} = useGetAdmin();

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params: GridCellParams) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
            },
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
    ];

    return (
        <Box padding='4.2rem 2.5rem 1.5rem 2.5rem'>
            <Header title='ADMINS' subtitle='Managing admins and list of admins'/>
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
                    rows={data || []}
                    columns={columns}
                    components={{
                        ColumnMenu: CustomColumnMenu,
                    }}
                />
            </Box>
        </Box>
    );
}

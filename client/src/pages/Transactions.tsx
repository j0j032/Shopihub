import {Box, useTheme} from "@mui/material";
import {useGetTransactions} from "../api/transactions";
import {useState} from "react";
import {Header} from "../components/Header";
import {PaletteColorKey} from "../../mui";
import {GridCellParams, GridSortModel} from '@mui/x-data-grid';
import {DataGrid} from "@mui/x-data-grid";
import {DataGridCustomToolbar} from "../components/DataGridCustomToolbar";

export function Transactions() {
    const theme = useTheme();
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [sort, setSort] = useState<object>({});
    const [search, setSearch] = useState<string>("");

    const [searchInput, setSearchInput] = useState<string>("");
    const {data, isLoading} = useGetTransactions({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const handleSort = (newSortModel: GridSortModel) => {
        const [sortModel] = newSortModel
        setSort(sortModel)
    }

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
            <Header title='TRANSACTIONS' subtitle='Entire list of transactions'/>
            <Box
                height='80vh'
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
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode='server'
                    sortingMode='server'
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => handleSort(newSortModel)}
                    components={{Toolbar: DataGridCustomToolbar}}
                    componentsProps={{
                        toolbar: {searchInput, setSearchInput, search, setSearch},
                    }}
                />
            </Box>
        </Box>
    );
}


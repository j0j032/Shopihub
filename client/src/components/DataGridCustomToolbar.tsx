import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport
} from "@mui/x-data-grid";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {RestartAltOutlined, Search} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import React from "react";

type DataGridCustomToolbarProps = {
    search: string,
    searchInput: string,
    setSearchInput: React.Dispatch<string>,
    setSearch: React.Dispatch<string>
}

export function DataGridCustomToolbar({searchInput, setSearchInput, search, setSearch}: DataGridCustomToolbarProps) {

    return (
        <GridToolbarContainer>
            <FlexBetween width='100%'>
                <FlexBetween>
                    <GridToolbarColumnsButton/>
                    <GridToolbarDensitySelector/>
                    <GridToolbarExport/>
                </FlexBetween>
                <TextField
                    label='Search...'
                    sx={{mb: "0.5rem", width: "15rem"}}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    variant='standard'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => {
                                    setSearch(searchInput);
                                    setSearchInput("");
                                }}>
                                    {search === '' ? <Search/> : <RestartAltOutlined/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
}

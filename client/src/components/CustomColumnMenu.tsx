import {GridColDef, GridColumnMenuContainer, GridFilterMenuItem, HideGridColMenuItem} from "@mui/x-data-grid";
import React from "react";

type CustomColumnMenuProps = {
    hideMenu: (event: React.SyntheticEvent<Element, Event>) => void
    currentColumn: GridColDef,
    open: boolean
}

export function CustomColumnMenu({hideMenu, currentColumn, open}: CustomColumnMenuProps) {
    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn}/>
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn}/>
        </GridColumnMenuContainer>
    );
}

import React from "react";
import {
    AdminPanelSettingsOutlined,
    CalendarMonthOutlined,
    Groups2Outlined,
    HomeOutlined, PieChartOutlined, PointOfSaleOutlined,
    PublicOutlined,
    ReceiptLongOutlined,
    ShoppingCartOutlined, TodayOutlined, TrendingUpOutlined
} from "@mui/icons-material";

interface NavItem {
    text: string,
    icon: React.ReactElement | null
}

export const navItems: NavItem[] = [
    {
        text: "Dashboard",
        icon: <HomeOutlined/>,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined/>,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined/>,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined/>,
    },
    {
        text: "Geography",
        icon: <PublicOutlined/>,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined/>,
    },
    {
        text: "Daily",
        icon: <TodayOutlined/>,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined/>,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined/>,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined/>,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined/>,
    },
];

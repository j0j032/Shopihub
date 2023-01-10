import {DailyDatas, MonthlyDatas} from "./Product";
import {PaletteColor} from "@mui/material";

type SalesByCategory = {
    accessories: number,
    clothing: number,
    misc: number,
    shoes: number
}

export interface Sales {
    createdAt: string,
    dailyData: DailyDatas[],
    monthlyData: MonthlyDatas[],
    salesByCategory: SalesByCategory
    updatedAt: string,
    year: number,
    yearlySalesTotal?: number,
    yearlyTotalSoldUnits?: number,
    __v?: number,
    _id: number
}

interface XYValue {
    x: string,
    y: number
}

type TotalLine = { id: string, color: PaletteColor | string, data: XYValue[] }



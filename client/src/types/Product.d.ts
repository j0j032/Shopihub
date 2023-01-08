type Data = {
    totalSales?: number,
    totalUnits?: number,
    _id: string
}

interface DailyDatas extends Data {
    month: string
}

interface MonthlyDatas extends Data {
    date: string
}

type ProductStat = {
    dailyData: DailyDatas[],
    monthlyData: MonthlyDatas[]
    createdAt?: string,
    updatedAt?: string,
    productId?: string,
    yearlySalesTotal?: number,
    yearlyTotalSoldUnits?: number,
    __v?: number,
    _id: number
}

type ProductStats = ProductStat[]

export interface Product {
    name: string,
    category: string,
    description: string,
    price: number,
    rating: number,
    supply: number,
    stat: ProductStats,
    createdAt: string,
    updatedAt: string,
    __v?: number,
    _id: string
}

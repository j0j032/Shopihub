import {useGetSales} from "../api/Sales/sales";
import {useTheme} from "@mui/material";
import {useMemo} from "react";
import {PaletteColorKey} from "../../mui";
import {TotalLine} from "../types/Sales";
import {ResponsiveLine} from "@nivo/line"

type OverviewChartProps = {
    view: string,
    isDashboard?: boolean
}

export function OverviewChart({view, isDashboard = false}: OverviewChartProps) {
    const theme = useTheme();
    const {data, isLoading} = useGetSales()

    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!data) return [];

        const {monthlyData} = data;
        const totalSalesLine: TotalLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine: TotalLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600 as PaletteColorKey],
            data: [],
        };

        Object.values(monthlyData).reduce(
            (acc, {month, totalSales, totalUnits}) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    {x: month, y: curSales},
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    {x: month, y: curUnits},
                ];

                return {sales: curSales, units: curUnits};
            },
            {sales: 0, units: 0}
        );
        console.log([totalSalesLine])
        return [[totalSalesLine], [totalUnitsLine]];
    }, [data]);

    if (!data || isLoading) return <p>"Loading..."</p>;

    return (
        // @ts-ignore
        // no ts-support
        <ResponsiveLine
            data={view === "sales" ? totalSalesLine : totalUnitsLine}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200 as PaletteColorKey],
                        },
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200 as PaletteColorKey],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200 as PaletteColorKey],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200 as PaletteColorKey],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200 as PaletteColorKey],
                    },
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    },
                },
            }}
            margin={{top: 20, right: 50, bottom: 50, left: 70}}
            xScale={{type: "point"}}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=' >-.2f'
            curve='catmullRom'
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard
                    ? ""
                    : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
                legendOffset: -60,
                legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{theme: "background"}}
            pointBorderWidth={2}
            pointBorderColor={{from: "serieColor"}}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                !isDashboard
                    ? [
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: -40,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]
                    : undefined
            }
        />
    );
}

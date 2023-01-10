import {useGetSales} from "../api/Sales/sales";
import {useMemo, useState} from "react";
import {Box, useTheme} from "@mui/material";
import {TotalLine} from "../types/Sales";
import {PaletteColorKey} from "../../mui";
import {ResponsiveLine} from "@nivo/line";
import {Header} from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DailyProps = {}

export function Daily({}: DailyProps) {
    const [startDate, setStartDate] = useState<Date>(new Date("2021-02-01"));
    const [endDate, setEndDate] = useState<Date>(new Date("2021-03-01"));
    const {data} = useGetSales();
    const theme = useTheme();

    const [formattedData] = useMemo(() => {
        if (!data) return [];

        const {dailyData} = data;
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

        Object.values(dailyData).forEach(({date, totalSales, totalUnits}) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf("-") + 1);

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    {x: splitDate, y: totalSales},
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    {x: splitDate, y: totalUnits},
                ];
            }
        });

        const formattedData = [totalSalesLine, totalUnitsLine];

        return [formattedData];
    }, [data, startDate, endDate]);

    return (
        <Box padding='4.2rem 2.5rem 1.5rem 2.5rem'>
            <Header title='DAILY SALES' subtitle='Chart of daily sales'/>
            <Box height='75vh'>

                {data &&
					<Box display='flex' justifyContent='flex-end'>
						<Box>
							<DatePicker
								selected={startDate}
								onChange={(date: Date) => setStartDate(date)}
								selectsStart
								startDate={startDate}
								endDate={endDate}
							/>
						</Box>
						<Box>
							<DatePicker
								selected={endDate}
								onChange={(date: Date) => setEndDate(date)}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								minDate={startDate}
							/>
						</Box>
					</Box>
                }

                {data ? (
                    // @ts-ignore
                    <ResponsiveLine
                        data={formattedData}
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
                        colors={{datum: "color"}}
                        margin={{top: 50, right: 50, bottom: 70, left: 60}}
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
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: "bottom",
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 90,
                            legend: "Month",
                            legendOffset: 60,
                            legendPosition: "middle",
                        }}
                        axisLeft={{
                            orient: "left",
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Total",
                            legendOffset: -50,
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
                        legends={[
                            {
                                anchor: "top-right",
                                direction: "column",
                                justify: false,
                                translateX: 50,
                                translateY: 0,
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
                        ]}
                    />
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </Box>
    );
}

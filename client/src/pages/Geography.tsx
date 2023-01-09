import {Box, useTheme} from "@mui/material";
import {useGetGeography} from "../api/Client/geography";
import {Header} from "../components/Header";
import {ResponsiveChoropleth} from "@nivo/geo";
import {PaletteColorKey} from "../../mui";
import {geoData} from "../config/geoData";

export function Geography() {
    const {data, isLoading} = useGetGeography()
    const theme = useTheme();

    return (
        <Box padding='4.2rem 2.5rem 1.5rem 2.5rem'>
            <Header title='GEOGRAPHY' subtitle='Find where your users are located.'/>
            {!isLoading ? (
                    <Box
                        mt='40px'
                        height='75vh'
                        width='100%'
                        border={`1px solid ${theme.palette.secondary[200 as PaletteColorKey]}`}
                        borderRadius='4px'
                    >
                        {data ? (
                            <ResponsiveChoropleth
                                data={data}
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
                                features={geoData.features}
                                margin={{top: 0, right: 0, bottom: 0, left: -50}}
                                domain={[0, 60]}
                                colors='YlGn'
                                unknownColor='#666666'
                                label='properties.name'
                                valueFormat='.2s'
                                projectionScale={150}
                                projectionTranslation={[0.45, 0.6]}
                                projectionRotation={[0, 0, 0]}
                                borderWidth={1}
                                borderColor='#262627'
                                legends={[
                                    {
                                        anchor: "bottom-right",
                                        direction: "column",
                                        justify: true,
                                        translateX: 0,
                                        translateY: -125,
                                        itemsSpacing: 0,
                                        itemWidth: 94,
                                        itemHeight: 18,
                                        itemDirection: "left-to-right",
                                        itemTextColor: theme.palette.secondary[200 as PaletteColorKey],
                                        itemOpacity: 0.85,
                                        symbolSize: 18,
                                        effects: [
                                            {
                                                on: "hover",
                                                style: {
                                                    itemTextColor: theme.palette.background.paper,
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
                    </Box>)
                : (<>Loading...</>
                )}
        </Box>
    );
}

import {Product as ProductType} from '../types/Product'
import {Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useTheme} from "@mui/material";
import {useState} from 'react';
import {PaletteColorKey} from "../../mui";

type ProductProps = {
    _id: ProductType['_id'],
    name: ProductType['name'],
    description: ProductType['description'],
    price: ProductType['price'],
    rating?: ProductType['rating'],
    category: ProductType['category'],
    supply: ProductType['supply'],
    stat: ProductType['stat'],
}

export function Product({_id, name, description, price, stat, category, rating, supply}: ProductProps) {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "0.55rem",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <CardContent>
                <Typography
                    sx={{fontSize: 14}}
                    color={theme.palette.secondary[700 as PaletteColorKey]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant='h5' component='div'>
                    {name}
                </Typography>
                <Typography sx={{mb: "1.5rem"}} color={theme.palette.secondary[400 as PaletteColorKey]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly/>

                <Typography variant='body2'>{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    size='small'
                    color='inherit'
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout='auto'
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300 as PaletteColorKey],
                }}
            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>
                        Yearly Sales This Year: {stat[0].yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

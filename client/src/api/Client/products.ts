import axios from "axios";
import {useQuery} from "react-query";
import {Product} from "../../types/Product";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL

const getProducts = () => axios.get<Product[]>(`${BASE_URL}/client/products`).then(r => r.data)

export const useGetProducts = () => {
    return useQuery(['products'], () => getProducts(), {
        refetchOnWindowFocus: false
    })
}

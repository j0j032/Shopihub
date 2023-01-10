import axios from "axios";
import {useQuery} from "react-query";
import {Sales} from "../../types/Sales";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL

const getSales = () => axios.get<Sales>(`${BASE_URL}/sales/sales`).then(r => r.data)

export const useGetSales = () => {
    return useQuery(['sales'], () => getSales(), {
        refetchOnWindowFocus: false
    })
}

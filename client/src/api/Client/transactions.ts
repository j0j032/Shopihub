import axios from "axios";
import {useQuery} from "react-query";
import {Transactions} from "../../types/Transaction";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL
type Sort = { field: string, sort: string } | {}
type QueryTypes = {
    page?: number,
    pageSize?: number,
    sort?: Sort,
    search?: string
}

const getTransactions = ({page, pageSize, sort, search}: QueryTypes) => axios
    .get<Transactions>(`${BASE_URL}/client/transactions`, {params: {page, pageSize, sort, search}}).then(r => r.data)

export const useGetTransactions = ({page, pageSize, sort, search}: QueryTypes) => {
    return useQuery(['transactions', page, pageSize, sort, search], () => getTransactions({
        page,
        pageSize,
        sort,
        search
    }), {
        refetchOnWindowFocus: false,
    })
}

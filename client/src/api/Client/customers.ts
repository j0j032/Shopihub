import axios from "axios";
import {useQuery} from "react-query";
import User from "../../types/User";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL

const getCustomers = () => axios.get<User[]>(`${BASE_URL}/client/customers`).then(r => r.data)

export const useGetCustomers = () => {
    return useQuery(['customers'], () => getCustomers(), {
        refetchOnWindowFocus: false
    })
}

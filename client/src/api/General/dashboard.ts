import axios from "axios";
import {useQuery} from "react-query";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL

const getDashboardStats = () => axios.get(`${BASE_URL}/general/dashboard`).then(r => r.data)

export const useGetDashboardStats = () => {
    return useQuery(['dashboard'], () => getDashboardStats(), {
        refetchOnWindowFocus: false
    })
}

import axios from "axios";
import {useQuery} from "react-query";
import User, {UserWithStats} from "../../types/User";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL

const getAdmin = () => axios.get<User[]>(`${BASE_URL}/management/admins`).then(r => r.data)

export const useGetAdmin = () => {
    return useQuery(['admins'], () => getAdmin(), {
        refetchOnWindowFocus: false
    })
}

const getUserPerformance = (id: string) => axios.get<UserWithStats>(`${BASE_URL}/management/performance/${id}`).then(r => r.data)


export const useGetUserPerformance = (id: string) => {
    return useQuery(['performance'], () => getUserPerformance(id), {
        refetchOnWindowFocus: false
    })
}

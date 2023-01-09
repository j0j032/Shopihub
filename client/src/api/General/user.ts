import axios from "axios";
import {useQuery} from "react-query";
import User from "../../types/User";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL

const getUser = (userId: string) => axios.get<User>(`${BASE_URL}/general/user/${userId}`).then(res => res.data)

export const useGetUser = (useriId: string) => {
    return useQuery(['user'], () => getUser(useriId), {
        refetchOnWindowFocus: false
    })
}

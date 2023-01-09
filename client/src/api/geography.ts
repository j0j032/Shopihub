import axios from "axios";
import {useQuery} from "react-query";
import {Locations} from "../types/Location";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL

const getGeography = () => axios.get<Locations>(`${BASE_URL}/client/geography`).then(r => r.data)

export const useGetGeography = () => {
    return useQuery(['geography'], () => getGeography(), {
        refetchOnWindowFocus: false
    })
}

import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export const getOrderBook = async () => {
    const response = await axios.get(`${BASE_URL}/depth`,{
        params:{
            symbol:'BTCUSDT',
            limit:10,
        },
    });
    return response.data;
}
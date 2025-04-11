import { getOrderBook } from "@/services/api";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";



export default function Home(){
    const[orderBook,setOrderBook] = useState<any>(null);

    useEffect(() => {
     const fetchData = async() => {
        const data = await getOrderBook();
        setOrderBook(data);
     }
     fetchData();
    },[])


    return(
    <Box>
          <Typography component={"h1"}> Orderbook BTC-USD (Top 10)</Typography>
          {orderBook && (
            <Box>
                <Typography component={"h3"}> Bids </Typography>
                 <Typography  component={"pre"}> { JSON.stringify(orderBook.bids, null,2)}</Typography>

                 <Typography component = {"h3"}> Asks </Typography>
                 <Typography  component={"pre"}> { JSON.stringify(orderBook.asks, null,2)}</Typography>
                </Box>
          )}
    </Box>
    
)
}
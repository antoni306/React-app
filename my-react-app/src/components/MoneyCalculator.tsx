import { Box, Typography, Autocomplete, TextField, Paper } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Rate } from "./types"
export default (props: { currencies: Rate[] }) => {
    const [fromCurrency, setFromCurrency] = useState<Rate | null>(null)
    const [toCurrency, setToCurrency] = useState<Rate | null>(null)
    const [amount, setAmount] = useState<number | "">("")
    function handleAutocomplete(evt: any, newValue: Rate | null) {

        if (evt && evt.target && evt.target.id && evt.target.id.includes("fromCurrency")) {
            setFromCurrency(newValue);
        } else {
            setToCurrency(newValue);
        }

    }
    function handleInputChange(evt: any) {
        setAmount(evt.target.value);
    }
    return (
        <Paper elevation={12} sx={{ padding: 5, display: "flex", m: 5 }}>
            <Box>
                <Typography>
                    From:
                </Typography>
                <Box sx={{ padding: 5, display: "flex" }}>
                    <Autocomplete id="fromCurrency" onChange={handleAutocomplete} value={fromCurrency} disablePortal options={props.currencies} sx={{ width: 300 }} getOptionLabel={curr => curr.currency} renderInput={opt => <TextField key={`f${opt.id}`} {...opt} />} />
                    <TextField variant="outlined" onChange={handleInputChange} value={amount} label="Amount" placeholder="ex. 123.5" sx={{ ml: 2 }} />
                </Box>
                <Typography>
                    To:
                </Typography>
                <Box sx={{ padding: 5, display: "flex" }}>
                    <Autocomplete onChange={handleAutocomplete} value={toCurrency} id="toCurrency" disablePortal options={props.currencies} sx={{ width: 300 }} getOptionLabel={curr => curr.currency} renderInput={opt => <TextField key={`s${opt.id}`} {...opt} />} />
                    <Typography variant="h3" sx={{ ml: 2 }}>{fromCurrency && toCurrency && amount && (fromCurrency.mid * amount / toCurrency.mid).toFixed(2)}</Typography>
                </Box>
            </Box>
        </Paper>
    );

}
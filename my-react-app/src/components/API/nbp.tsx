import axios from "axios";
const req = "https://api.nbp.pl/api/exchangerates/tables/"; // A lub B lub C

export default async (table: "A" | "B" | "C") => {
    try {
        const response = await axios.get(req + table);
        if (response)
            return response;
        throw new Error("no data");
    } catch (error) {
        throw error
    }
}
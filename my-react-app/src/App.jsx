
import SideBar from "./components/single components/SideBar";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Home from "./components/pages/Home";
import Currencies from "./components/pages/Currencies";
function Page(props) {
  switch (props.page) {
    case "Home":
      return <Home />
    case "Currencies":
      return <Currencies />
    case "Coins":
      return <Coins />
    default:
      return <Stocks />
  }
}

function App() {
  const [page, setPage] = useState("Home");


  return (
    <Box>
      <SideBar onPageChange={setPage} />
      <Page page={page} />
    </Box>

  );

}

export default App

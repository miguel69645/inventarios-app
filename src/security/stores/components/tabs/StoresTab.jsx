import { useState } from "react";
import { Box } from "@mui/material";
import StoresNavTab from "../tabs/StoresNavTab";
import StoresTable from "../tables/StoreTable";
import SeriesTab from "../../../series/components/tabs/SeriesTab";
export default function StoresTab() {
  const [currentRowInStoresTab, setCurrentRowInStoresTab] = useState(0);
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] =useState('ALMACENES');
  return (
    <Box>
      <StoresNavTab
        currentInRowInStoreTab={setCurrentRowInStoresTab}
        setCurrentNameTabInStoreTab={setCurrentTabInPrincipalTab}
      />
      {currentTabInPrincipalTab == "ALMACENES" && <StoresTable />}
      {currentTabInPrincipalTab == "SERIES" && <SeriesTab />}
    </Box>
  );
}

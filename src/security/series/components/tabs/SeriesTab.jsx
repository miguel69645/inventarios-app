import { Box } from "@mui/material";
import SeriesNavTab from "../tabs/SeriesNavTab";
import SeriesTable from "../tables/SeriesTable";
import StatusTable from "../../../status/components/tables/StatusTable";
import { useState } from "react";
import LocationTable from "../../../location/components/tables/LocationTable";

export default function BusinessTab() {
  const [currentRowInSeriesTab, setCurrentRowInSeriesTab] = useState(0);
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] =
    useState("SERIES");
  return (
    <Box>
      <SeriesNavTab
        currentRowInSeriesTab={setCurrentRowInSeriesTab}
        setCurrentNameTabInSeriesTab={setCurrentTabInPrincipalTab}
      />
      {currentTabInPrincipalTab == "SERIES" && <SeriesTable />}
      {currentTabInPrincipalTab == "ESTATUS FISICO" && (
        <StatusTable statusType="Fisico" />
      )}
      {currentTabInPrincipalTab == "ESTATUS VENTA" && (
        <StatusTable statusType="Venta" />
      )}
      {currentTabInPrincipalTab == "UBICACIONES" && <LocationTable />}
    </Box>
  );
}

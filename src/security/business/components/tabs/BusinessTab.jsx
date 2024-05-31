import { Box } from "@mui/material";
import { useState } from "react";
import BusinessNavTab from "./BusinessNavTab";
import BusinessTable from "../tables/BusinessTable";
import StoresTab from "../../../stores/components/tabs/StoresTab";

export default function BusinessTab() {
  const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] =
    useState("NEGOCIOS");

  return (
    <Box>
      <BusinessNavTab
        currentRowInBusinessTab={setCurrentRowInInstitutesTab}
        setCurrentNameTabInBusinessTab={setCurrentTabInPrincipalTab}
      />
      {currentTabInPrincipalTab == "NEGOCIOS" && <BusinessTable />}

      {currentTabInPrincipalTab == "ALMACENES" && <StoresTab />}
    </Box>
  );
}

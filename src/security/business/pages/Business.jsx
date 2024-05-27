import { useState } from "react";
import { Box } from "@mui/material";
import BusinessNavTab from "../components/tabs/BusinessNavTab";
import BusinessTab from "../components/tabs/BusinessTab";
import StoresTab from "../../stores/components/tabs/StoresTab";

export default function Business() {
  const [currentRowInBusinessTab, setCurrentRowInBusinessTab] = useState(0);
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] =
    useState("NEGOCIOS");

  return (
    <Box>
      <BusinessNavTab
        currentRowInBusinessTab={setCurrentRowInBusinessTab}
        setCurrentNameTabInBusinessTab={setCurrentTabInPrincipalTab}
      />
      {currentTabInPrincipalTab == "NEGOCIOS" && <BusinessTab />}

      {currentTabInPrincipalTab == "ALMACENES" && <StoresTab />}
    </Box>
  );
}

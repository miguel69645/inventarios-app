import { useState } from "react";
import { Box } from "@mui/material";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
import InstitutesTab from "../components/tabs/InstitutesTab";
import BusinessTab from "../../business/components/tabs/BusinessTab";

export default function Institutes() {
  const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] =
    useState("INSTITUTOS");

  return (
    <Box>
      <InstitutesNavTab
        currentRowInInstitutesTab={setCurrentRowInInstitutesTab}
        setCurrentNameTabInPrincipalTab={setCurrentTabInPrincipalTab}
      />
      {currentTabInPrincipalTab == "INSTITUTOS" && <InstitutesTab />}

      {currentTabInPrincipalTab == "NEGOCIOS" && <BusinessTab />}
    </Box>
  );
}

import { Box, Tab, Tabs } from "@mui/material";
import  { useState } from "react";

const BusinessTabs = [
  "NEGOCIOS",
  "ALMACENES",
];

const BusinessNavTab = ({
  currentRowInBusinessTab,
  setCurrentNameTabInBusinessTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInBusinessTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "NEGOCIOS":
        setCurrentTabIndex(0);
        break;
      case "ALMACENES":
        setCurrentTabIndex(1);
        break;
    }
  };
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        mx: 1,
        padding: 0.5,
      }}
    >
      <Tabs
        value={currenTabIndex}
        variant={"fullWidth"}
        onChange={handleChange}
        aria-label="icon tabs example"
        textColor=""
      >
        {BusinessTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowInBusinessTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default BusinessNavTab;

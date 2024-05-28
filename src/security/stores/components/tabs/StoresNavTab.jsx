import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const BusinessTabs = [
  "ALMACENES",
  "SERIES",
];

const BusinessNavTab = ({
  currentInRowInStoreTab,
  setCurrentNameTabInStoreTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInStoreTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "ALMACENES":
        setCurrentTabIndex(0);
        break;
      case "SERIES":
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
              disabled={currentInRowInStoreTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default BusinessNavTab;

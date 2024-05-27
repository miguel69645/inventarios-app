import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const SeriesTabs = [
  "SERIES",
  "ESTATUS FISICO",
  "ESTATUS VENTA",
];

const SeriesNavTab = ({
  currentRowInSeriesTab,
  setCurrentNameTabInSeriesTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInSeriesTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "NEGOCIOS":
        setCurrentTabIndex(0);
        break;
      case "INFO ADICIONAL":
        setCurrentTabIndex(1);
        break;
      case "ARCHIVOS":
        setCurrentTabIndex(2);
        break;
      case "TELEFONOS":
        setCurrentTabIndex(3);
        break;
      case "DIR WEBS":
        setCurrentTabIndex(4);
        break;
      case "DOMICILIOS":
        setCurrentTabIndex(5);
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
        textColor="primary"
      >
        {SeriesTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowInSeriesTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default SeriesNavTab;

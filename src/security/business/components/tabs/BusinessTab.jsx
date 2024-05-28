import { Box } from "@mui/material";
import BusinessTable from "../tables/BusinessTable";

export default function BusinessTab() {
  return (
    <Box>
      <h2><center>Tab con la tabla de la coleccion de Negocios</center></h2>
      <BusinessTable />
    </Box>
  );
}
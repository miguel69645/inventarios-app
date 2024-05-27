import { Box } from "@mui/material";
import MovementTable from "../tables/MovementTable";

export default function MovementTab() {
  return (
    <Box>
      <h2><center>Tab con la tabla de la coleccion de Negocios</center></h2>
      <MovementTable />
    </Box>
  );
}

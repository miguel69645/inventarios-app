//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: DB
//import StatussStaticData from '../../../../../db/security/json/Statuss/StatussData';
import { getAllStatus } from "../../services/remote/get/getAllStatus";
//FIC: Modals
import AddStatusModal from "../modals/AddStatusModal";
//FIC: Columns Table Definition.
const StatusColumns = [
  {
    accessorKey: "IdTipoEstatusOK",
    header: "ID OK",
    size: 100, //small column
  },
  {
    accessorKey: "Actual",
    header: "ACTUAL",
    size: 30, //small column
  },
];
//FIC: Table - FrontEnd.
const StatusTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [StatusData, setStatusData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddStatusShowModal, setAddStatusShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllStatusData = await getAllStatus();
        setStatusData(AllStatusData);
        //setStatussData(StatussStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de StatusTable:",
          error
        );
      }
    }
    fetchData();
  }, []);
  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={StatusColumns}
          data={StatusData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddStatusShowModal(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Detalles ">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              {/* ------- BARRA DE ACCIONES FIN ------ */}
            </>
          )}
        />
      </Box>
      {/* M O D A L E S */}
      <Dialog open={AddStatusShowModal}>
        <AddStatusModal
          AddStatusShowModal={AddStatusShowModal}
          setAddStatusShowModal={setAddStatusShowModal}
          onClose={() => setAddStatusShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default StatusTable;




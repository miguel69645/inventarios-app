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
//import MovementsStaticData from '../../../../../db/security/json/institutes/MovementsData';
import { getAllMovements } from "../../services/remote/get/getAllMovements";
//FIC: Modals
import AddMovementModal from "../modals/AddMovementModal";
//FIC: Columns Table Definition.
const MovementsColumns = [
  {
    accessorKey: "CantidadMovto",
    header: "ID OK",
    size: 30, //small column
  },
  {
    accessorKey: "CantidadAnt",
    header: "CANT ANTERIOR",
    size: 30, //small column
  },
  {
    accessorKey: "CantidadAct",
    header: "CANT ACTUAL",
    size: 150, //small column
  },
  {
    accessorKey: "IdTipoMovtoOK",
    header: "TIPO MOVIMIENTO",
    size: 50, //small column
  },
  {
    accessorKey: "IdClaseMovtoOK",
    header: "CLASE DE MOVIMIENTO",
    size: 30, //small column
  },
  {
    accessorKey: "Referencia",
    header: "REFERENCIA",
    size: 150, //small column
  },
];
//FIC: Table - FrontEnd.
const MovementsTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [MovementsData, setMovementsData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddMovementShowModal, setAddMovementShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllMovementsData = await getAllMovements();
        setMovementsData(AllMovementsData);
        //setMovementsData(MovementsStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de MovementsTable:",
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
          columns={MovementsColumns}
          data={MovementsData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddMovementShowModal(true)}>
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
      <Dialog open={AddMovementShowModal}>
        <AddMovementModal
          AddMovementShowModal={AddMovementShowModal}
          setAddMovementShowModal={setAddMovementShowModal}
          onClose={() => setAddMovementShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default MovementsTable;




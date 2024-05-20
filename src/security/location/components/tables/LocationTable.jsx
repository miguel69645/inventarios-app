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
//import LocationsStaticData from '../../../../../db/security/json/Locations/LocationsData';
import { getAllLocations } from "../../services/remote/get/getAllLocation";
//FIC: Modals
import AddLocationModal from "../modals/AddLocationModal";
//FIC: Columns Table Definition.
const LocationsColumns = [
  {
    accessorKey: "Ubicacion",
    header: "ID OK",
    size: 30, //small column
  },
  {
    accessorKey: "Actual",
    header: "ACTUAL",
    size: 30, //small column
  },
];
//FIC: Table - FrontEnd.
const LocationsTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [LocationsData, setLocationsData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddLocationShowModal, setAddLocationShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllLocationsData = await getAllLocations();
        setLocationsData(AllLocationsData);
        //setLocationsData(LocationsStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de LocationsTable:",
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
          columns={LocationsColumns}
          data={LocationsData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddLocationShowModal(true)}>
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
      <Dialog open={AddLocationShowModal}>
        <AddLocationModal
          AddLocationShowModal={AddLocationShowModal}
          setAddLocationShowModal={setAddLocationShowModal}
          onClose={() => setAddLocationShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default LocationsTable;




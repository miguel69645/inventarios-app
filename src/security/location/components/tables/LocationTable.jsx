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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//FIC: Modals
import AddLocationModal from "../modals/AddLocationModal";
//FIC: Columns Table Definition.
//FIC: Table - FrontEnd.
const LocationsTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  const selectedBusinessId = useSelector(
    (state) => state.business.selectedBusinessId
  );
  const selectedStoresId = useSelector(
    (state) => state.stores.selectedStoresId
  );
  const selectedSeriesId = useSelector(
    (state) => state.series.selectedSeriesId
  );
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [LocationsData, setLocationsData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddLocationShowModal, setAddLocationShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const AllLocationsData = await getAllLocations(
          id,
          selectedBusinessId,
          selectedStoresId,
          selectedSeriesId
        );
        setLocationsData(AllLocationsData);
        setLoadingTable(false);
        //setLocationsData(LocationsStaticData);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de LocationsTable:",
          error
        );
      }
    }
    fetchData();
  }, [dispatch, id, selectedBusinessId, selectedStoresId, selectedSeriesId]);
  const LocationsColumns = [
    {
      accessorKey: "Ubicacion",
      header: "ID_UBICACION",
      size: 30, //small column
    },
    {
      accessorKey: "Actual",
      header: "ACTUAL",
      size: 30, //small column
    },
  ];
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

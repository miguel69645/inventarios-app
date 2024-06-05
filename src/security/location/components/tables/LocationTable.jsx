import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  Dialog,
  Checkbox,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllLocations } from "../../services/remote/get/getAllLocation";
import { deleteLocation } from "../../services/remote/delete/DeleteOneLocation";
import { useSelector, useDispatch } from "react-redux";
import AddLocationModal from "../modals/AddLocationModal";
import UpdateLocationModal from "../modals/UpdateLocationModal";
import { SET_ID_UBICACION } from "../../../redux/slices/locationsSlice";

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

  const [loadingTable, setLoadingTable] = useState(true);
  const [LocationsData, setLocationsData] = useState([]);
  const [selectedUbicacionId, setSelectedUbicacionId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [AddLocationShowModal, setAddLocationShowModal] = useState(false);
  const [UpdateLocationShowModal, setUpdateLocationShowModal] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);

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
        if (AllLocationsData.length > 0) {
          dispatch(SET_ID_UBICACION(AllLocationsData[0].Ubicacion));
          setSelectedUbicacionId(AllLocationsData[0].Ubicacion);
          setRowSelection({ [AllLocationsData[0].Ubicacion]: true });
        }
      } catch (error) {
        console.error(
          "Error al obtener las ubicaciones en useEffect de LocationsTable:",
          error
        );
      }
    }
    fetchData();
  }, [
    dispatch,
    id,
    selectedBusinessId,
    selectedStoresId,
    selectedSeriesId,
    AddLocationShowModal,
  ]);

  const handleRowClick = (row) => {
    dispatch(SET_ID_UBICACION(row.original.Ubicacion));
    setSelectedUbicacionId(row.original.Ubicacion);
    console.log(row.original.Ubicacion);
  };

  const handleDelete = async () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta ubicación?")
    ) {
      try {
        await deleteLocation(
          id,
          selectedBusinessId,
          selectedStoresId,
          selectedSeriesId,
          selectedUbicacionId
        );
        // Actualizar los datos de la tabla después de eliminar la ubicación
        const AllLocationsData = await getAllLocations(
          id,
          selectedBusinessId,
          selectedStoresId,
          selectedSeriesId
        );
        setLocationsData(AllLocationsData);
      } catch (error) {
        console.error("Error al eliminar la ubicación:", error);
      }
    }
  };

  const LocationsColumns = useMemo(
    () => [
      {
        accessorKey: "Ubicacion",
        header: "ID_UBICACION",
        size: 30,
      },
      {
        accessorKey: "Actual",
        header: "ACTUAL",
        size: 30,
        Cell: ({ row }) => {
          return (
            <Checkbox
              checked={
                row.original.Actual &&
                row.original.Actual.trim().toUpperCase() === "S"
              }
              disabled
            />
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: LocationsColumns,
    data: LocationsData,
    getRowId: (row) => row.Ubicacion,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setRowSelection((prev) => ({
          [row.id]: !prev[row.id],
        }));
        handleRowClick(row);
      },
      selected: !!rowSelection[row.id],
      sx: {
        cursor: "pointer",
        backgroundColor: rowSelection[row.id] ? "lightgreen" : "white",
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection, isLoading: loadingTable },
    renderBottomToolbarCustomActions: () => (
      <Stack direction="row" sx={{ m: 1 }}>
        <Box>
          <Tooltip title="Agregar">
            <IconButton onClick={() => setAddLocationShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                setUpdateLocationShowModal(true);
                setIsDetailView(false);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => handleDelete()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Detalles">
            <IconButton
              onClick={() => {
                setUpdateLocationShowModal(true);
                setIsDetailView(true);
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    ),
  });

  return (
    <Box>
      <Box>
        <MaterialReactTable table={table} />
      </Box>
      <Dialog open={AddLocationShowModal}>
        <AddLocationModal
          AddLocationShowModal={AddLocationShowModal}
          setAddLocationShowModal={setAddLocationShowModal}
          onClose={() => setAddLocationShowModal(false)}
        />
      </Dialog>
      <Dialog open={UpdateLocationShowModal}>
        <UpdateLocationModal
          UpdateLocationShowModal={UpdateLocationShowModal}
          setUpdateLocationShowModal={setUpdateLocationShowModal}
          selectedUbicacionId={selectedUbicacionId}
          isDetailView={isDetailView}
          onClose={() => setUpdateLocationShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default LocationsTable;

import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllSeries } from "../../services/remote/get/getAllSeries";
import { deleteSerie } from "../../services/remote/delete/DeleteOneSerie";
import { useSelector, useDispatch } from "react-redux";
import { SET_ID_SERIES } from "../../../redux/slices/seriesSlice";
import AddSeriesModal from "../modals/AddSeriesModal";
import UpdateSeriesModal from "../modals/UpdateSeriesModal";

const SeriessTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  const selectedBusinessId = useSelector(
    (state) => state.business.selectedBusinessId
  );
  const selectedStoresId = useSelector(
    (state) => state.stores.selectedStoresId
  );
  const [loadingTable, setLoadingTable] = useState(true);
  const [SeriessData, setSeriessData] = useState([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [AddSeriesShowModal, setAddSeriesShowModal] = useState(false);
  const [UpdateSeriesShowModal, setUpdateSeriesShowModal] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!id || !selectedBusinessId || !selectedStoresId) {
        console.error(
          "Error: id, selectedBusinessId, or selectedStoresId is not valid."
        );
        return;
      }

      setLoadingTable(true);

      try {
        const AllSeriessData = await getAllSeries(
          id,
          selectedBusinessId,
          selectedStoresId
        );
        setSeriessData(AllSeriessData);
        setLoadingTable(false);
        if (AllSeriessData.length > 0) {
          dispatch(SET_ID_SERIES(AllSeriessData[0].Serie));
          setSelectedSeriesId(AllSeriessData[0].Serie);
          setRowSelection({ [AllSeriessData[0].Serie]: true });
        }
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de SeriessTable:",
          error
        );
        setLoadingTable(false);
      }
    }

    fetchData();
  }, [dispatch, id, selectedBusinessId, selectedStoresId]);

  const fetchSeriesData = async () => {
    if (!id || !selectedBusinessId || !selectedStoresId) {
      console.error(
        "Error: id, selectedBusinessId, or selectedStoresId is not valid."
      );
      return;
    }

    setLoadingTable(true);

    try {
      const AllSeriessData = await getAllSeries(
        id,
        selectedBusinessId,
        selectedStoresId
      );
      setSeriessData(AllSeriessData);
      setLoadingTable(false);
      if (AllSeriessData.length > 0) {
        dispatch(SET_ID_SERIES(AllSeriessData[0].Serie));
        setSelectedSeriesId(AllSeriessData[0].Serie);
        setRowSelection({ [AllSeriessData[0].Serie]: true });
      }
    } catch (error) {
      console.error(
        "Error al obtener los institutos en useEffect de SeriessTable:",
        error
      );
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchSeriesData();
  }, [dispatch, id, selectedBusinessId, selectedStoresId]);

  const handleRowClick = (row) => {
    dispatch(SET_ID_SERIES(row.original.Serie));
    setSelectedSeriesId(row.original.Serie);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta serie?")) {
      try {
        await deleteSerie(
          id,
          selectedBusinessId,
          selectedStoresId,
          selectedSeriesId
        );
        // Actualizar los datos de la tabla después de eliminar la serie
        const AllSeriesData = await getAllSeries(
          id,
          selectedBusinessId,
          selectedStoresId
        );
        setSeriessData(AllSeriesData);
      } catch (error) {
        console.error("Error al eliminar la serie:", error);
      }
    }
  };

  const SeriesColumns = useMemo(
    () => [
      {
        accessorKey: "Serie",
        header: "SERIE",
        size: 30,
      },
      {
        accessorKey: "Placa",
        header: "PLACA",
        size: 30,
      },
      {
        accessorKey: "Observacion",
        header: "OBSERVACION",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: SeriesColumns,
    data: SeriessData,
    getRowId: (row) => row.Serie,
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
            <IconButton onClick={() => setAddSeriesShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                setUpdateSeriesShowModal(true);
                setIsDetailView(false);
                console.log("UpdateSeriesShowModal:", UpdateSeriesShowModal);
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
                setIsDetailView(true);
                setUpdateSeriesShowModal(true);
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
      <Dialog open={AddSeriesShowModal}>
        <AddSeriesModal
          AddSeriesShowModal={AddSeriesShowModal}
          setAddSeriesShowModal={setAddSeriesShowModal}
          onClose={() => setAddSeriesShowModal(false)}
        />
      </Dialog>
      <Dialog open={UpdateSeriesShowModal}>
        <UpdateSeriesModal
          UpdateSeriesShowModal={UpdateSeriesShowModal}
          setUpdateSeriesShowModal={setUpdateSeriesShowModal}
          onClose={() => setUpdateSeriesShowModal(false)}
          instituteId={id}
          businessId={selectedBusinessId}
          storeId={selectedStoresId}
          selectedSeriesId={selectedSeriesId}
          updateSeries={fetchSeriesData}
          isDetailView={isDetailView}
        />
      </Dialog>
    </Box>
  );
};

export default SeriessTable;

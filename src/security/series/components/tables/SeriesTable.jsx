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
import { useSelector, useDispatch } from "react-redux";
import { SET_ID_SERIES } from "../../../redux/slices/seriesSlice";
import AddSeriesModal from "../modals/AddSeriesModal";

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
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
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
      }
    }
    fetchData();
  }, [dispatch, id, selectedBusinessId, selectedStoresId]);

  const handleRowClick = (row) => {
    dispatch(SET_ID_SERIES(row.original.Serie));
    setSelectedSeriesId(row.original.Serie);
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
            <IconButton onClick={() => setAddStoreShowModal(true)}>
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
          <Tooltip title="Detalles">
            <IconButton>
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
    </Box>
  );
};

export default SeriessTable;

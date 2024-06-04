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
import { getAllStatus } from "../../services/remote/get/getAllStatus";
import { useSelector, useDispatch } from "react-redux";
import AddStatusModal from "../modals/AddStatusModal";
import { SET_ID_TIPO_ESTATUS_OK } from "../../../redux/slices/statusSlice";

const StatusTable = ({ statusType }) => {
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
  const [StatusData, setStatusData] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [AddStatusShowModal, setAddStatusShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const AllStatusData = await getAllStatus(
          id,
          selectedBusinessId,
          selectedStoresId,
          selectedSeriesId
        );
        const filteredStatusData = AllStatusData.filter((status) =>
          status.IdTipoEstatusOK.includes(statusType)
        );
        setStatusData(filteredStatusData);
        setLoadingTable(false);
        if (filteredStatusData.length > 0) {
          dispatch(
            SET_ID_TIPO_ESTATUS_OK(filteredStatusData[0].IdTipoEstatusOK)
          );
          setSelectedStatusId(filteredStatusData[0].IdTipoEstatusOK);
          setRowSelection({ [filteredStatusData[0].IdTipoEstatusOK]: true });
        }
      } catch (error) {
        console.error(
          `Error al obtener los estados en useEffect de StatusTable (${statusType}):`,
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
    statusType,
    AddStatusShowModal
  ]);

  const handleRowClick = (row) => {
    dispatch(SET_ID_TIPO_ESTATUS_OK(row.original.IdTipoEstatusOK));
    setSelectedStatusId(row.original.IdTipoEstatusOK);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const StatusColumns = useMemo(
    () => [
      {
        accessorKey: "IdTipoEstatusOK",
        header: "IDTIPOSTATUS",
        size: 100,
      },
      {
        accessorKey: "Actual",
        header: "ACTUAL",
        size: 30,
        Cell: ({ row }) => (
          <Checkbox
            checked={
              row.original.Actual &&
              row.original.Actual.trim().toUpperCase() === "S"
            }
            disabled
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: StatusColumns,
    data: StatusData,
    getRowId: (row) => row.IdTipoEstatusOK,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
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
      <Dialog open={AddStatusShowModal}>
        <AddStatusModal
          AddStatusShowModal={AddStatusShowModal}
          setAddStatusShowModal={setAddStatusShowModal}
          onClose={() => setAddStatusShowModal(false)}
          statusType={statusType}
        />
      </Dialog>
    </Box>
  );
};

export default StatusTable;

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
import { getAllStores } from "../../services/remote/get/getAllStores";
import { getOneStore } from "../../services/remote/get/getOneStore";
import { deleteStore } from "../../services/remote/delete/DeleteOneStore";
import { useSelector, useDispatch } from "react-redux";
import { SET_ID_STORES } from "../../../redux/slices/storesSlice";
import AddStoreModal from "../modals/AddStoreModal";
import UpdateStoreModal from "../modals/UpdateStoreModal";

const StoresTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  const selectedBusinessId = useSelector(
    (state) => state.business.selectedBusinessId
  );
  const [loadingTable, setLoadingTable] = useState(true);
  const [UpdateStoreShowModal, setUpdateStoreShowModal] = useState(false);
  const [StoresData, setStoresData] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [AddStoreShowModal, setAddStoreShowModal] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const dispatch = useDispatch();

  // useEffect para manejar la carga inicial de los datos
  useEffect(() => {
    async function fetchData() {
      try {
        const AllStoresData = await getAllStores(id, selectedBusinessId);
        setStoresData(AllStoresData);
        setLoadingTable(false);
        if (AllStoresData.length > 0) {
          dispatch(SET_ID_STORES(AllStoresData[0].IdAlmacenOK));
          setSelectedStoreId(AllStoresData[0].IdAlmacenOK);
          setRowSelection({ [AllStoresData[0].IdAlmacenOK]: true });
        }
      } catch (error) {
        console.error(
          "Error al obtener los almacenes en useEffect de StoresTable:",
          error
        );
      }
    }
    fetchData();
  }, [dispatch, id, selectedBusinessId]);

  // useEffect para manejar la actualización de los datos cuando se cierra el modal
  useEffect(() => {
    if (!UpdateStoreShowModal && !AddStoreShowModal) {
      updateStores();
    }
  }, [UpdateStoreShowModal, AddStoreShowModal]);

  const updateStores = async () => {
    try {
      const AllStoresData = await getAllStores(id, selectedBusinessId);
      setStoresData(AllStoresData);
    } catch (error) {
      console.error(
        "Error al actualizar los almacenes en updateStores:",
        error
      );
    }
  };

  const handleRowClick = (row) => {
    dispatch(SET_ID_STORES(row.original.IdAlmacenOK));
    setSelectedStoreId(row.original.IdAlmacenOK);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este almacen?")) {
      try {
        await deleteStore(id, selectedBusinessId, selectedStoreId);
        // Actualizar los datos de la tabla después de eliminar el almacen
        const AllStoresData = await getAllStores(id, selectedBusinessId);
        setStoresData(AllStoresData);
      } catch (error) {
        console.error("Error al eliminar el almacen:", error);
      }
    }
  };

  const StoresColumns = useMemo(
    () => [
      {
        accessorKey: "IdAlmacenOK",
        header: "ID OK",
        size: 30,
      },
      {
        accessorKey: "Descripcion",
        header: "DESCRIPCION",
        size: 30,
      },
      {
        accessorKey: "Principal",
        header: "PRINCIPAL",
        size: 30,
        Cell: ({ row }) => {
          return (
            <Checkbox
              checked={
                row.original.Principal &&
                row.original.Principal.trim().toUpperCase() === "S"
              }
              disabled
            />
          );
        },
      },
      {
        accessorKey: "CantidadActual",
        header: "CANT ACTUAL",
        size: 150,
      },
      {
        accessorKey: "CantidadDisponible",
        header: "CANT DISPONIBLE",
        size: 50,
      },
      {
        accessorKey: "CantidadApartada",
        header: "CANT APARTADA",
        size: 30,
      },
      {
        accessorKey: "CantidadTransito",
        header: "CANT TRANSITO",
        size: 150,
      },
      {
        accessorKey: "CantidadMerma",
        header: "MERMA",
        size: 30,
      },
      {
        accessorKey: "StockMaximo",
        header: "STOCK MAX",
        size: 30,
      },
      {
        accessorKey: "StockMinimo",
        header: "STOCK MIN",
        size: 30,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: StoresColumns,
    data: StoresData,
    getRowId: (row) => row.IdAlmacenOK,
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
            <IconButton
              onClick={() => {
                setIsDetailView(false);
                setUpdateStoreShowModal(true);
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
              onClick={async () => {
                  setIsDetailView(true);
                  setUpdateStoreShowModal(true);
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
      <MaterialReactTable table={table} />
      <Dialog open={AddStoreShowModal}>
        <AddStoreModal
          AddStoreShowModal={AddStoreShowModal}
          setAddStoreShowModal={setAddStoreShowModal}
          onClose={() => setAddStoreShowModal(false)}
        />
      </Dialog>
      <Dialog open={UpdateStoreShowModal}>
        <UpdateStoreModal
          UpdateStoreShowModal={UpdateStoreShowModal}
          setUpdateStoreShowModal={setUpdateStoreShowModal}
          onClose={() => setUpdateStoreShowModal(false)}
          StoreId={selectedStoreId}
          instituteId={id}
          businessId={selectedBusinessId}
          selectedStoreId={selectedStoreId}
          updateStores={updateStores}
          isDetailView={isDetailView}
        />
      </Dialog>
    </Box>
  );
};

export default StoresTable;

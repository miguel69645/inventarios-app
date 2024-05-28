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
//import StoresStaticData from '../../../../../db/security/json/institutes/StoresData';
import { getAllStores } from "../../services/remote/get/getAllStores";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SET_ID_STORES } from "../../../redux/slices/storesSlice";
//FIC: Modals
import AddStoreModal from "../modals/AddStoreModal";
//FIC: Columns Table Definition.
<<<<<<< HEAD

const handleRowClick = (row) => {
  console.log(row._id);
};

const StoresColumns = [
  {
    accessorKey: "IdAlmacenOK",
    header: "ID OK",
    size: 30, //small column
  },
  {
    accessorKey: "Principal",
    header: "PRINCIPAL",
    size: 30, //small column
  },
  {
    accessorKey: "CantidadActual",
    header: "CANT ACTUAL",
    size: 150, //small column
  },
  {
    accessorKey: "CantidadDisponible",
    header: "CANT DISPONIBLE",
    size: 50, //small column
  },
  {
    accessorKey: "CantidadApartada",
    header: "CANT APARTADA",
    size: 30, //small column
  },
  {
    accessorKey: "CantidadTransito",
    header: "CANT TRANSITO",
    size: 150, //small column
  },
  {
    accessorKey: "CantidadMerma",
    header: "MERMA",
    size: 30, //small column
  },
  {
    accessorKey: "StockMaximo",
    header: "STOCK MAX",
    size: 30, //small column
  },
  {
    accessorKey: "StockMinimo",
    header: "STOCK MIN",
    size: 30, //small column
  },
  {
    accessorKey: "select",
    header: "SELECCIONAR",
    Cell: ({ row }) => (
      <button onClick={() => handleRowClick(row.original)}>
        seleccionar
      </button>
    ),
  },
];
=======
>>>>>>> 4c2cf068c87d60beaefb7ff73a056bbc17ff787f
//FIC: Table - FrontEnd.
const StoresTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  const selectedBusinessId = useSelector(
    (state) => state.business.selectedBusinessId
  );
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [StoresData, setStoresData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddStoreShowModal, setAddStoreShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const AllStoresData = await getAllStores(id, selectedBusinessId);
        setStoresData(AllStoresData);
        //setStoresData(StoresStaticData);
        setLoadingTable(false);
        // Establecer el primer almacen como seleccionado por defecto
        if (AllStoresData.length > 0) {
          dispatch(SET_ID_STORES(AllStoresData[0].IdAlmacenOK));
        }
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de StoresTable:",
          error
        );
      }
    }
    fetchData();
  }, [dispatch, id, selectedBusinessId]);
  const handleRowClick = (row) => {
    dispatch(SET_ID_STORES(row.IdAlmacenOK));
    console.log(row.IdAlmacenOK);
  };
  const StoresColumns = [
    {
      accessorKey: "IdAlmacenOK",
      header: "ID OK",
      size: 30, //small column
    },
    {
      accessorKey: "Principal",
      header: "PRINCIPAL",
      size: 30, //small column
    },
    {
      accessorKey: "CantidadActual",
      header: "CANT ACTUAL",
      size: 150, //small column
    },
    {
      accessorKey: "CantidadDisponible",
      header: "CANT DISPONIBLE",
      size: 50, //small column
    },
    {
      accessorKey: "CantidadApartada",
      header: "CANT APARTADA",
      size: 30, //small column
    },
    {
      accessorKey: "CantidadTransito",
      header: "CANT TRANSITO",
      size: 150, //small column
    },
    {
      accessorKey: "CantidadMerma",
      header: "MERMA",
      size: 30, //small column
    },
    {
      accessorKey: "StockMaximo",
      header: "STOCK MAX",
      size: 30, //small column
    },
    {
      accessorKey: "StockMinimo",
      header: "STOCK MIN",
      size: 30, //small column
    },
    {
      accessorKey: "select",
      header: "SELECCIONAR",
      Cell: ({ row }) => (
        <button onClick={() => handleRowClick(row.original)}>
          Seleccionar
        </button>
      ),
    },
  ];
  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={StoresColumns}
          data={StoresData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
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
      <Dialog open={AddStoreShowModal}>
        <AddStoreModal
          AddStoreShowModal={AddStoreShowModal}
          setAddStoreShowModal={setAddStoreShowModal}
          onClose={() => setAddStoreShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default StoresTable;

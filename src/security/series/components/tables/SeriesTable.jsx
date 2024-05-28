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
//import SeriessStaticData from '../../../../../db/security/json/Seriess/SeriessData';
import { getAllSeries } from "../../services/remote/get/getAllSeries";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//FIC: Modals
import AddSeriesModal from "../modals/AddSeriesModal";
//FIC: Columns Table Definition.
<<<<<<< HEAD

const handleRowClick = (row) => {
  // dispatch(SET_ID_SERIES(row._id));
  console.log(row._id)
}
const SeriesColumns = [
  {
    accessorKey: "Serie",
    header: "SERIE",
    size: 30, //small column
  },
  {
    accessorKey: "Placa",
    header: "PLACA",
    size: 30, //small column
  },
  {
    accessorKey: "Observacion",
    header: "OBSERVACION",
    size: 150, //small column
  },
  {
    accessorKey: "select",
    header: "Seleccionar",
    Cell: ({ row }) => (
      <button onClick={() => handleRowClick(row.original)}>
        Seleccionar
      </button>
    ),
  },
];
=======
>>>>>>> 4c2cf068c87d60beaefb7ff73a056bbc17ff787f
//FIC: Table - FrontEnd.
const SeriessTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  const selectedBusinessId = useSelector(
    (state) => state.business.selectedBusinessId
  );
  const selectedStoresId = useSelector(
    (state) => state.stores.selectedStoresId
  );
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [SeriessData, setSeriessData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddSeriesShowModal, setAddSeriesShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const AllSeriessData = await getAllSeries(id, selectedBusinessId, selectedStoresId);
        setSeriessData(AllSeriessData);
        //setSeriessData(SeriessStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de SeriessTable:",
          error
        );
      }
    }
    fetchData();
  }, [dispatch, id, selectedBusinessId, selectedStoresId]);
  const SeriesColumns = [
    {
      accessorKey: "Serie",
      header: "SERIE",
      size: 30, //small column
    },
    {
      accessorKey: "Placa",
      header: "PLACA",
      size: 30, //small column
    },
    {
      accessorKey: "Observacion",
      header: "OBSERVACION",
      size: 150, //small column
    },
  ];
  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={SeriesColumns}
          data={SeriessData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddSeriesShowModal(true)}>
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




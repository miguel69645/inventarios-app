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
//import BusinesssStaticData from '../../../../../db/security/json/Businesss/BusinesssData';
import { GetAllBusiness } from "../../services/remote/get/getAllBusiness";
//FIC: Modals
import AddBusinessModal from "../modals/AddBusinessModal";
//FIC: Columns Table Definition.
const BusinesssColumns = [
  {
    accessorKey: "IdNegocioOK",
    header: "ID NEGOCIO",
    size: 30, //small column
  },
  {
    accessorKey: "ControlaSerie",
    header: "CONTROLA SERIE",
    size: 30, //small column
  },
  {
    accessorKey: "descripcionNegocio",
    header: "DESCRIPCION",
    size: 100, //small column  
  },
];
//FIC: Table - FrontEnd.
const BusinessTable = () => {

  const addBusinesss = async () => {
    try {
      const AllBusinesssData = await GetAllBusiness();
      setBusinessData(AllBusinesssData);
    } catch (error) {
      console.error(
        "Error al actualizr los institutos en addBusinesss:",
        error
      );
    }
  };

  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [BusinessData, setBusinessData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddBusinessShowModal, setAddBusinessShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllBusinesssData = await GetAllBusiness();
        setBusinessData(AllBusinesssData);
        //setBusinesssData(BusinesssStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de BusinesssTable:",
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
          columns={BusinesssColumns}
          data={BusinessData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddBusinessShowModal(true)}>
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
      <Dialog open={AddBusinessShowModal}>
        <AddBusinessModal
          AddBusinessShowModal={AddBusinessShowModal}
          setAddBusinessShowModal={setAddBusinessShowModal}
          onClose={() => setAddBusinessShowModal(false)}
          addBusinesss={addBusinesss}
        />
      </Dialog>
    </Box>
  );
};
export default BusinessTable;




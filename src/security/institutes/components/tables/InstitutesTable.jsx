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
//import InstitutesStaticData from '../../../../../db/security/json/institutes/InstitutesData';
import { getAllInstitutes } from "../../services/remote/get/getAllInstitutes";
//FIC: Modals
import AddInstituteModal from "../modals/AddInstituteModal";
//FIC: Columns Table Definition.
const InstitutesColumns = [
  {
    accessorKey: "IdInstitutoOK",
    header: "ID INSTITUTO OK",
    size: 150, //small column
  },
  {
    accessorKey: "IdProdServOK",
    header: "ID PRODSERV OK",
    size: 150, //small column
  },
  {
    accessorKey: "IdPresentaOK",
    header: "ID PRESENTA OK",
    size: 150, //small column
  },
];
//FIC: Table - FrontEnd.
const InstitutesTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [InstitutesData, setInstitutesData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllInstitutesData = await getAllInstitutes();
        setInstitutesData(AllInstitutesData);
        //setInstitutesData(InstitutesStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de InstitutesTable:",
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
          columns={InstitutesColumns}
          data={InstitutesData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddInstituteShowModal(true)}>
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
      <Dialog open={AddInstituteShowModal}>
        <AddInstituteModal
          AddInstituteShowModal={AddInstituteShowModal}
          setAddInstituteShowModal={setAddInstituteShowModal}
          onClose={() => setAddInstituteShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default InstitutesTable;




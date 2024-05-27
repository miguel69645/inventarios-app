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
import { useDispatch } from "react-redux";
import { SET_ID_INSTITUTES } from "../../../redux/slices/institutesSlice";
//FIC: Modals
import AddInstituteModal from "../modals/AddInstituteModal";

//FIC: Columns Table Definition.
//FIC: Table - FrontEnd.
const InstitutesTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);
  //FIC: controlar el estado de la data de Institutos.
  const [InstitutesData, setInstitutesData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  const [addInstituteShowModal, setAddInstituteShowModal] = useState(false);
  const [DetailsInstituteShowModal, setDetailsInstituteShowModal] =
    useState(false);
  const [UpdateInstituteShowModal, setUpdateInstituteShowModal] =
    useState(false);
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
  const dispatch = useDispatch();
  const handleRowClick = (row) => {
    setSelectedInstituteId(row._id);
    dispatch(SET_ID_INSTITUTES(selectedInstituteId));
  };
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
          columns={InstitutesColumns}
          data={InstitutesData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          onRowClick={handleRowClick}
          rowPop={(row) => ({
            style: {
              backgroundColor:
                row._id === selectedInstituteId ? "lightgreen" : "white",
            },
          })}
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
                    <IconButton
                      onClick={async () => {
                        if (selectedInstituteId !== null) {
                          const instituteDetails = await getOneInstitute(
                            selectedInstituteId
                          );
                          console.log(instituteDetails);
                          setUpdateInstituteShowModal(true);
                        }
                        else {
                          alert('Por favor, seleccione un instituto antes de editarlo');
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Detalles ">
                    <IconButton
                       onClick={() => {
                        if (selectedInstituteId !== null) {
                          setDetailsInstituteShowModal(true);
                        } else {
                          alert(
                            "Por favor, selecciona una fila para ver detalles."
                          );
                        }
                      }}
                    >
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
      <Dialog open={addInstituteShowModal}>
        <AddInstituteModal
          AddInstituteShowModal={addInstituteShowModal}
          setAddInstituteShowModal={setAddInstituteShowModal}
          onClose={() => setAddInstituteShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default InstitutesTable;

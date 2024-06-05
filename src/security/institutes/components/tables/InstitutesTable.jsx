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
import { getAllInstitutes } from "../../services/remote/get/getAllInstitutes";
import { getOneInstitute } from "../../services/remote/get/getOneInstitute";
import { DeleteOneInstitute } from "../../services/remote/delete/DeleteOneInstitute";
import { getConcatenatedDescription } from "../../services/remote/get/getDescription";
import { useDispatch } from "react-redux";
import { SET_ID_INSTITUTES } from "../../../redux/slices/institutesSlice";
import AddInstituteModal from "../modals/AddInstituteModal";
import UpdateInstituteModal from "../modals/UpdateInstituteModal";

const InstitutesTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [InstitutesData, setInstitutesData] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [addInstituteShowModal, setAddInstituteShowModal] = useState(false);
  const [UpdateInstituteShowModal, setUpdateInstituteShowModal] =
    useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const AllInstitutesData = await getAllInstitutes();
        const descriptions = await getConcatenatedDescription();
        const InstitutesDataWithDescription = AllInstitutesData.map(
          (institute, index) => {
            return {
              ...institute,
              DescripcionConcatenada:
                descriptions[index].DescripcionConcatenada,
            };
          }
        );
        setInstitutesData(InstitutesDataWithDescription);
        setLoadingTable(false);

        // Set initial selection
        if (InstitutesDataWithDescription.length > 0) {
          const firstInstituteId = InstitutesDataWithDescription[0]._id;
          setSelectedInstituteId(firstInstituteId);
          setRowSelection({ [firstInstituteId]: true });
          dispatch(SET_ID_INSTITUTES(firstInstituteId));
        }
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de InstitutesTable:",
          error
        );
      }
    }
    fetchData();
  }, [dispatch, addInstituteShowModal]);

  const handleRowClick = (row) => {
    setSelectedInstituteId(row.original._id);
    dispatch(SET_ID_INSTITUTES(row.original._id));
    console.log(row.original._id);
  };

  const reloadInstitutesData = async () => {
    const data = await getAllInstitutes();
    setInstitutesData(data);
  };

  const updateInstitutes = async () => {
    try {
      const AllInstitutesData = await getAllInstitutes();
      setInstitutesData(AllInstitutesData);
    } catch (error) {
      console.error(
        "Error al actualizar los institutos en updateInstitutes:",
        error
      );
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este instituto?")
    ) {
      try {
        await DeleteOneInstitute(selectedInstituteId);
        // Actualizar los datos de la tabla después de eliminar el instituto
        const AllInstitutesData = await getAllInstitutes();
        setInstitutesData(AllInstitutesData);
      } catch (error) {
        console.error("Error al eliminar el instituto:", error);
      }
    }
  };

  const InstitutesColumns = useMemo(
    () => [
      {
        accessorKey: "IdInstitutoOK",
        header: "ID INSTITUTO OK",
        size: 150,
      },
      {
        accessorKey: "IdProdServOK",
        header: "ID PRODSERV OK",
        size: 150,
      },
      {
        accessorKey: "IdPresentaOK",
        header: "ID PRESENTA OK",
        size: 150,
      },
      {
        accessorKey: "DescripcionConcatenada",
        header: "DESCRIPCIÓN",
        size: 300,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: InstitutesColumns,
    data: InstitutesData,
    getRowId: (row) => row._id,
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
                  setIsDetailView(false); 
                  setUpdateInstituteShowModal(true);
                } else {
                  alert("Por favor, seleccione un instituto antes de editarlo");
                }
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
                if (selectedInstituteId !== null) {
                  const instituteDetails = await getOneInstitute(
                    selectedInstituteId
                  );
                  console.log(instituteDetails);
                  setIsDetailView(true); // Añade esta línea
                  setUpdateInstituteShowModal(true);
                } else {
                  alert("Por favor, seleccione un instituto antes de editarlo");
                }
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
      <Dialog open={addInstituteShowModal}>
        <AddInstituteModal
          AddInstituteShowModal={addInstituteShowModal}
          setAddInstituteShowModal={setAddInstituteShowModal}
          reloadInstitutesData={reloadInstitutesData}
          onClose={() => setAddInstituteShowModal(false)}
        />
      </Dialog>
      <Dialog open={UpdateInstituteShowModal}>
        <UpdateInstituteModal
          UpdateInstituteShowModal={UpdateInstituteShowModal}
          setUpdateInstituteShowModal={setUpdateInstituteShowModal}
          onClose={() => {
            setIsDetailView(false); 
            setUpdateInstituteShowModal(false);
          }}
          instituteId={selectedInstituteId}
          updateInstitutes={updateInstitutes}
          isDetailView={isDetailView} 
        />
      </Dialog>
      {/* Aquí también agregarás los diálogos para editar y ver detalles si los tienes */}
    </Box>
  );
};

export default InstitutesTable;

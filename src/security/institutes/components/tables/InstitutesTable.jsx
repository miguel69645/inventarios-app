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
import { getConcatenatedDescription } from "../../services/remote/get/getDescription";
import { useDispatch } from "react-redux";
import { SET_ID_INSTITUTES } from "../../../redux/slices/institutesSlice";
import AddInstituteModal from "../modals/AddInstituteModal";

const InstitutesTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [InstitutesData, setInstitutesData] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [addInstituteShowModal, setAddInstituteShowModal] = useState(false);
  const [DetailsInstituteShowModal, setDetailsInstituteShowModal] =
    useState(false);
  const [UpdateInstituteShowModal, setUpdateInstituteShowModal] =
    useState(false);
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
  }, [dispatch]);

  const handleRowClick = (row) => {
    setSelectedInstituteId(row.original._id);
    dispatch(SET_ID_INSTITUTES(row.original._id));
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
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Detalles">
            <IconButton
              onClick={() => {
                if (selectedInstituteId !== null) {
                  setDetailsInstituteShowModal(true);
                } else {
                  alert("Por favor, selecciona una fila para ver detalles.");
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
          onClose={() => setAddInstituteShowModal(false)}
        />
      </Dialog>
      {/* Aquí también agregarás los diálogos para editar y ver detalles si los tienes */}
    </Box>
  );
};

export default InstitutesTable;

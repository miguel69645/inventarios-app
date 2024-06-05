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
import { getAllBusiness } from "../../services/remote/get/getAllBusiness";
import { getOneBusiness } from "../../services/remote/get/getOneBusiness";
import { deleteBusiness } from "../../services/remote/delete/DeleteOneBusiness";
import { useSelector, useDispatch } from "react-redux";
import { SET_ID_BUSINESS } from "../../../redux/slices/businessSlice";
import AddBusinessModal from "../modals/AddBusinessModal";
import UpdateBusinessModal from "../modals/UpdateBusinessModal";

const BusinessTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  console.log(id);

  const [selectedInstitutoId, setSelectedInstitutoId] = useState(id);
  const [loadingTable, setLoadingTable] = useState(true);
  const [BusinessData, setBusinessData] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [AddBusinessShowModal, setAddBusinessShowModal] = useState(false);
  const [UpdateBusinessShowModal, setUpdateBusinessShowModal] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const dispatch = useDispatch();

  // useEffect para manejar la carga inicial de los datos
  useEffect(() => {
    setSelectedInstitutoId(id);
    console.log(selectedInstitutoId);
    async function fetchData() {
      try {
        const AllBusinesssData = await getAllBusiness(id);
        setBusinessData(AllBusinesssData);
        setLoadingTable(false);
        if (AllBusinesssData.length > 0) {
          dispatch(SET_ID_BUSINESS(AllBusinesssData[0].IdNegocioOK));
          setSelectedBusinessId(AllBusinesssData[0].IdNegocioOK);
          setRowSelection({ [AllBusinesssData[0].IdNegocioOK]: true });
        }
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de BusinessTable:",
          error
        );
      }
    }
    fetchData();
  }, [dispatch, id]);

  // useEffect para manejar la actualización de los datos cuando se cierra el modal de agregar
  useEffect(() => {
    if (!AddBusinessShowModal) {
      addBusinesss();
    }
  }, [AddBusinessShowModal]);

  const addBusinesss = async () => {
    try {
      const AllBusinesssData = await getAllBusiness(selectedInstitutoId);
      setBusinessData(AllBusinesssData);
    } catch (error) {
      console.error("Error al actualizar los negocios en addBusinesss:", error);
    }
  };

  // useEffect para manejar la actualización de los datos cuando se cierra el modal
  useEffect(() => {
    if (!UpdateBusinessShowModal) {
      updateBusiness(selectedInstitutoId);
    }
  }, [UpdateBusinessShowModal, selectedInstitutoId]);

  const updateBusiness = async (id) => {
    try {
      const AllBusinessData = await getAllBusiness(id);
      setBusinessData(AllBusinessData);
    } catch (error) {
      console.error(
        "Error al actualizar los institutos en updateBusiness:",
        error
      );
    }
  };

  const handleRowClick = (row) => {
    dispatch(SET_ID_BUSINESS(row.original.IdNegocioOK));
    setSelectedBusinessId(row.original.IdNegocioOK);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este negocio?")) {
      try {
        await deleteBusiness(id, selectedBusinessId);
        // Actualizar los datos de la tabla después de eliminar el negocio
        const AllBusinessData = await getAllBusiness(id);
        setBusinessData(AllBusinessData);
      } catch (error) {
        console.error("Error al eliminar el negocio:", error);
      }
    }
  };

  const BusinesssColumns = useMemo(
    () => [
      {
        accessorKey: "IdNegocioOK",
        header: "ID NEGOCIO",
        size: 30,
      },
      {
        accessorKey: "descripcionNegocio",
        header: "DESCRIPCIÓN",
        size: 100,
      },
      {
        accessorKey: "ControlaSerie",
        header: "CONTROLA SERIE",
        size: 30,
        Cell: ({ row }) => {
          return (
            <Checkbox
              checked={
                row.original.ControlaSerie &&
                row.original.ControlaSerie.trim().toUpperCase() === "S"
              }
              disabled
            />
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: BusinesssColumns,
    data: BusinessData,
    getRowId: (row) => row.IdNegocioOK,
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
            <IconButton onClick={() => setAddBusinessShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={async () => {
                if (selectedBusinessId !== null) {
                  const BusinessDetails = await getOneBusiness(
                    selectedInstitutoId,
                    selectedBusinessId
                  );
                  console.log(BusinessDetails);
                  setIsDetailView(false);
                  setUpdateBusinessShowModal(true);
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
                if (selectedBusinessId !== null) {
                  const businessDetails = await getOneBusiness(
                    selectedInstitutoId,
                    selectedBusinessId
                  );
                  console.log(businessDetails);
                  setIsDetailView(true);
                  setUpdateBusinessShowModal(true);
                } else {
                  alert(
                    "Por favor, seleccione un negocio antes de ver los detalles"
                  );
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
      <Dialog open={AddBusinessShowModal}>
        <AddBusinessModal
          AddBusinessShowModal={AddBusinessShowModal}
          setAddBusinessShowModal={setAddBusinessShowModal}
          onClose={() => setAddBusinessShowModal(false)}
          addBusinesss={addBusinesss}
        />
      </Dialog>
      <Dialog open={UpdateBusinessShowModal}>
        <UpdateBusinessModal
          UpdateBusinessShowModal={UpdateBusinessShowModal}
          setUpdateBusinessShowModal={setUpdateBusinessShowModal}
          onClose={() => setUpdateBusinessShowModal(false)}
          InstitutoId={selectedInstitutoId}
          businessId={selectedBusinessId}
          updateBusinesss={updateBusiness}
          isDetailView={isDetailView}
        />
      </Dialog>
    </Box>
  );
};

export default BusinessTable;

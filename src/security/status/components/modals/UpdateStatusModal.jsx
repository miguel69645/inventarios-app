import React, { useState, useEffect } from "react";
//FIC: Material
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
//FIC: Helpers
import { StatusValues } from "../../helpers/StatusValues";
//FIC: Services
import { putStatus_fisico, putStatus_venta } from "../../services/remote/put/UpdateOneStatus";
import { getAllStatus } from "../../services/remote/get/getAllStatus";
import { getOneStatus } from "../../services/remote/get/getOneStatus";

const UpdateStatusModal = ({
  UpdateStatusShowModal,
  setUpdateStatusShowModal,
  statusId,
  InstitutoId,
  isDetailView,
  statusType,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const negocio = useSelector((state) => state.business.selectedBusinessId);
  const almacenes = useSelector((state) => state.stores.selectedStoresId);
  const series = useSelector((state) => state.series.selectedSeriesId);
  const ids = [instituto, negocio, almacenes, series, statusId];
  console.log("ids:", ids);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    if (statusId) {
      getStatusData();
    }
  }, [statusId]);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const status = await getAllStatus(ids);
        setStatusOptions(status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    }

    fetchStatus();
  }, []);

  async function getStatusData() {
    try {
      const statusData = await getOneStatus(ids, statusId);
      console.log(statusData.Actual);
      formik.setValues({
        IdTipoEstatusOK: statusData.IdTipoEstatusOK,
        Actual: statusData.Actual === 'S',
        Observaciones: statusData.Observaciones,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }

  const status =
  statusType == "Fisico"
    ? [
        "IdEstatusFisicoInventariosSeries-IdUsado",
        "IdEstatusFisicoInventariosSeries-IdNuevo",
      ]
    : [
        "IdEstatusVentaInventariosSeries-IdDisponible",
        "IdEstatusVentaInventariosSeries-IdReservado",
        "IdEstatusVentaInventariosSeries-IdVendido",
      ];

  const formik = useFormik({
    initialValues: {
      IdTipoEstatusOK: status[0],
      Actual: false,
      Observaciones: "",
    },
    validationSchema: Yup.object({
      IdTipoEstatusOK: Yup.string().required("Requerido"),
      Actual: Yup.boolean(),
      Observaciones: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values.Actual = values.Actual  ? "S" : "N";
        const Status = StatusValues(values);
        await statusType == "Fisico" ? putStatus_fisico(ids, Status) : putStatus_venta(ids, Status);
        setMensajeExitoAlert(
          "Instituto fue actualizado y guardado Correctamente"
        );
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar el Instituto: " + e.message);
      }
      setLoading(false);
    },
  });

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={UpdateStatusShowModal}
      onClose={() => setUpdateStatusShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Negocio</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
        <Autocomplete
            disablePortal
            id="IdTipoEstatusOK"
            value={formik.values.IdTipoEstatusOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoEstatusOK &&
              Boolean(formik.errors.IdTipoEstatusOK)
            }
            helperText={
              formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK
            }
            options={status}
            renderInput={(params) => (
              <TextField {...params} label="IdTipoEstatusOK" />
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdTipoEstatusOK", newValue);
            }}
          />
          <FormControlLabel
            label="Actual*"
            control={
              <Checkbox
                id="Actual"
                checked={formik.values.Actual}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!!mensajeExitoAlert}
              />
            }
          />  
          <TextField
            id="Observaciones"
            label="Observaciones*"
            value={formik.values.Observaciones}
            {...commonTextFieldProps}
            error={
              formik.touched.Observaciones &&
              Boolean(formik.errors.Observaciones)
            }
            helperText={
              formik.touched.Observaciones &&
              formik.errors.Observaciones
            }
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setUpdateStatusShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {!isDetailView && (
            <LoadingButton
              color="primary"
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
              disabled={!!mensajeExitoAlert}
              loading={Loading}
            >
              <span>GUARDAR</span>
            </LoadingButton>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateStatusModal;
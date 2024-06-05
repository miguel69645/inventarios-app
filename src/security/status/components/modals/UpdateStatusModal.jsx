import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOneStatus } from "../../services/remote/get/getOneStatus";
import { updateStatus } from "../../services/remote/put/UpdateOneStatus";
import { StatusValues } from "../../helpers/StatusValues";

const UpdateStatusModal = ({
  open,
  onClose,
  statusType,
  selectedStatusId,
  isDetailView,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const negocio = useSelector((state) => state.business.selectedBusinessId);
  const almacenes = useSelector((state) => state.stores.selectedStoresId);
  const series = useSelector((state) => state.series.selectedSeriesId);
  const ids = [instituto, negocio, almacenes, series];
  console.log("ids:", ids);

  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  const statusOptions =
    statusType === "Fisico"
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
      IdTipoEstatusOK: "",
      Actual: "",
    },
    validationSchema: Yup.object({
      IdTipoEstatusOK: Yup.string().required("Campo requerido"),
      Actual: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values.Actual ? (values.Actual = "S") : (values.Actual = "N");
        const Status = StatusValues(values);
        console.log(Status);
        await updateStatus(
          ids,
          Status.IdTipoEstatusOK,
          selectedStatusId,
          statusType
        );
        setMensajeExitoAlert("Status fue actualizado Correctamente");
      } catch (e) {
        setMensajeErrorAlert("No se pudo actualizar el Status");
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedStatusId) {
        try {
          const statusData = await getOneStatus(
            ids,
            selectedStatusId,
            statusType
          );
          formik.setValues({
            IdTipoEstatusOK: statusData.IdTipoEstatusOK,
            Actual: statusData.Actual === "S",
          });
        } catch (error) {
          console.error("Error fetching status data:", error);
        }
      }
    };
    fetchData();
  }, [selectedStatusId]);

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Status</strong>
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
            options={statusOptions}
            renderInput={(params) => (
              <TextField {...params} label="IdTipoEstatusOK" />
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdTipoEstatusOK", newValue);
            }}
            disabled={isDetailView}
          />
          <FormControlLabel
            label="Actual*"
            control={
              <Checkbox
                id="Actual"
                checked={formik.values.Actual}
                {...commonTextFieldProps}
                error={formik.touched.Actual && Boolean(formik.errors.Actual)}
                helperText={formik.touched.Actual && formik.errors.Actual}
              />
            }
            disabled={isDetailView}
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
            onClick={onClose}
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

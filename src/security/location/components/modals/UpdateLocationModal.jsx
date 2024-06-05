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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { putLocation } from "../../services/remote/put/UpdateOneLocation";
import { getOneLocation } from "../../services/remote/get/getOneLocation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const UpdateLocationModal = ({
  UpdateLocationShowModal,
  setUpdateLocationShowModal,
  selectedUbicacionId,
  isDetailView,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const negocio = useSelector((state) => state.business.selectedBusinessId);
  const almacenes = useSelector((state) => state.stores.selectedStoresId);
  const series = useSelector((state) => state.series.selectedSeriesId);
  const ids = [instituto, negocio, almacenes, series];

  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      Ubicacion: selectedUbicacionId.Ubicacion || "",
      Actual: selectedUbicacionId.Actual || "",
    },
    validationSchema: Yup.object({
      Ubicacion: Yup.string().required("Campo requerido"),
      Actual: Yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values.Actual ? (values.Actual = "S") : (values.Actual = "N");
        await putLocation(ids, selectedUbicacionId.Ubicacion, values);
        setMensajeExitoAlert("Ubicación fue actualizada Correctamente");
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar la Ubicación");
      }
      setLoading(false);
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationData = await getOneLocation(ids, selectedUbicacionId);
        dispatch({ type: "LOCATION_FETCHED", payload: locationData });
        formik.setValues({
          Ubicacion: locationData.Ubicacion || "",
          Actual: locationData.Actual || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocationData();
  }, [dispatch, selectedUbicacionId, formik, ids]);

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={UpdateLocationShowModal}
      onClose={() => setUpdateLocationShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Instituto</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <TextField
            id="Ubicacion"
            label="Ubicación*"
            value={formik.values.Ubicacion}
            {...commonTextFieldProps}
            error={formik.touched.Ubicacion && Boolean(formik.errors.Ubicacion)}
            helperText={formik.touched.Ubicacion && formik.errors.Ubicacion}
            disabled={isDetailView}
          />
          <FormControlLabel
            label="Actual*"
            control={
              <Checkbox
                id="Actual"
                checked={formik.values.Actual === "S"}
                onChange={(event) =>
                  formik.setFieldValue(
                    "Actual",
                    event.target.checked ? "S" : "N"
                  )
                }
                disabled={isDetailView}
              />
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
            onClick={() => setUpdateLocationShowModal(false)}
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

export default UpdateLocationModal;

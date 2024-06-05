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
import { LocationValues } from "../../helpers/LocationValues";
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
  const ids = [instituto, negocio, almacenes, series, selectedUbicacionId];
  console.log("ids:", ids);

  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
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
        const Location = LocationValues(values);
        await putLocation(ids, Location);
        setMensajeExitoAlert("Ubicación fue actualizada Correctamente");
      } catch (e) {
        setMensajeErrorAlert("No se pudo actualizar la Ubicación" + e.message);
        setMensajeExitoAlert(null);
      }
      setLoading(false);
    },
  });

  async function fetchLocationData() {
    try {
      const locationData = await getOneLocation(ids, selectedUbicacionId);
      setStatusOptions(locationData);
      formik.setValues({
        Ubicacion: locationData.Ubicacion,
        Actual: locationData.Actual === "S" ? true : false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchLocationData();
  }, []);

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

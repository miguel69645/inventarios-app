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
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { putLocation } from "../../services/remote/put/UpdateOneLocation";
import { getOneLocation } from "../../services/remote/get/getOneLocation";
import { getAllLocations1 } from "../../services/remote/get/getLocation";
import { LocationValues } from "../../helpers/LocationValues";
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
  const [locationOptions, setLocationOptions] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocationOptions();
    fetchLocationData();
  }, []);

  async function fetchLocationOptions() {
    try {
      const locations = await getAllLocations1();
      setLocationOptions(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }

  async function fetchLocationData() {
    try {
      const locationData = await getOneLocation(ids, selectedUbicacionId);
      formik.setValues({
        Ubicacion: locationData.Ubicacion,
        Actual: locationData.Actual === "S" ? true : false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      Ubicacion: "",
      Actual: "",
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
          <Autocomplete
            id="Ubicacion"
            options={locationOptions}
            getOptionLabel={(option) => `${option.Ubicacion}`}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "Ubicacion",
                newValue ? newValue.Ubicacion : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ubicación*"
                error={
                  formik.touched.Ubicacion && Boolean(formik.errors.Ubicacion)
                }
                helperText={formik.touched.Ubicacion && formik.errors.Ubicacion}
                disabled={isDetailView}
              />
            )}
            value={
              locationOptions.find(
                (option) => option.Ubicacion === formik.values.Ubicacion
              ) || null
            }
            disabled={!!mensajeExitoAlert}
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

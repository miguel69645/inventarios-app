import React, { useState, useEffect } from "react";
// Material UI components
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
import { LocationValues } from "../../helpers/LocationValues";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
// Services
import { postLocation } from "../../services/remote/post/AddOneLocation";
import { getAllLocations1 } from "../../services/remote/get/getLocation";
import { useSelector } from "react-redux";

const AddLocationModal = ({
  AddLocationShowModal,
  setAddLocationShowModal,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const negocio = useSelector((state) => state.business.selectedBusinessId);
  const almacenes = useSelector((state) => state.stores.selectedStoresId);
  const series = useSelector((state) => state.series.selectedSeriesId);
  const ids = [instituto, negocio, almacenes, series];

  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLocationOptions() {
      try {
        const locations = await getAllLocations1();
        setLocationOptions(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    fetchLocationOptions();
  }, []);

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
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values.Actual ? (values.Actual = "S") : (values.Actual = "N");
        const Location = LocationValues(values);
        await postLocation(ids, Location);
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        // fetchDataLocation();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Instituto");
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
      open={AddLocationShowModal}
      onClose={() => setAddLocationShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Instituto</strong>
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
                label="Ubicacion*"
                error={
                  formik.touched.Ubicacion && Boolean(formik.errors.Ubicacion)
                }
                helperText={formik.touched.Ubicacion && formik.errors.Ubicacion}
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
                onChange={() =>
                  formik.setFieldValue(
                    "Actual",
                    formik.values.Actual === "S" ? "N" : "S"
                  )
                }
                disabled={!!mensajeExitoAlert}
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
            onClick={() => setAddLocationShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
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
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLocationModal;

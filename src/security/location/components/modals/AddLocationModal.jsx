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
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { LocationValues } from "../../helpers/LocationValues";
//FIC: Services
import { AddOneLocation } from "../../services/remote/post/AddOneLocation";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
const AddLocationModal = ({
  AddLocationShowModal,
  setAddLocationShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [LocationsValuesLabel, setLocationsValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSelectLocationsType();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Institutos
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
  async function getDataSelectLocationsType() {
    try {
      const Labels = await GetAllLabels();
      console.log("Labels:", Labels); // Registrar la respuesta completa
      const LocationsTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
      console.log("LocationsTypes:", LocationsTypes); // Registrar el resultado de la búsqueda
      if (LocationsTypes) {
        setLocationsValuesLabel(LocationsTypes.valores);
      } else {
        console.error(
          "No se encontraron etiquetas para Tipos Giros de Institutos"
        );
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdAlmacenOK: "",
      Ubicacion: "",
      Actual: "",
    },
    validationSchema: Yup.object({
      IdAlmacenOK: Yup.string().required("Campo requerido"),
      Ubicacion: Yup.string().required("Campo requerido"),
      Actual: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      //FIC: mostramos el Loading.
      setLoading(true);

      //FIC: notificamos en consola que si se llamo y entro al evento.
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      //FIC: reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        //FIC: Extraer los datos de los campos de
        //la ventana modal que ya tiene Formik.
        const Location = LocationValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Location>>", Location);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneLocation" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneLocation(Location);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataLocation();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Instituto");
      }

      //FIC: ocultamos el Loading.
      setLoading(false);
    },
  });
  //FIC: props structure for TextField Control.
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
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Instituto</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <TextField
            id="IdAlmacenOK"
            label="IdAlmacenOK*"
            value={formik.values.IdAlmacenOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdAlmacenOK &&
              Boolean(formik.errors.IdAlmacenOK)
            }
            helperText={
              formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK
            }
          />
          <TextField
            id="Ubicacion"
            label="Ubicacion*"
            value={formik.values.Ubicacion}
            {...commonTextFieldProps}
            error={
              formik.touched.Ubicacion &&
              Boolean(formik.errors.Ubicacion)
            }
            helperText={
              formik.touched.Ubicacion && formik.errors.Ubicacion
            }
          />
          <TextField
            id="Actual"
            label="Actual*"
            value={formik.values.Actual}
            {...commonTextFieldProps}
            error={
              formik.touched.Actual && Boolean(formik.errors.Actual)
            }
            helperText={
              formik.touched.Actual && formik.errors.Actual
            }
          />
        </DialogContent>
        {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {console.log("mensajeExitoAlert", mensajeExitoAlert)}
            {console.log("mensajeErrorAlert", mensajeErrorAlert)}
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
          {/* FIC: Boton de Cerrar. */}
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setAddLocationShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {/* FIC: Boton de Guardar. */}
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

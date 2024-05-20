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
import { StoreValues } from "../../helpers/StoreValues";
//FIC: Services
import { AddOneStore } from "../../services/remote/post/AddOneStore";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
const AddStoreModal = ({
  AddStoreShowModal,
  setAddStoreShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [StoresValuesLabel, setStoresValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSelectStoresType();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Almacenes
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo CantidadTransito en la Modal.
  async function getDataSelectStoresType() {
    try {
      const Labels = await GetAllLabels();
      console.log("Labels:", Labels); // Registrar la respuesta completa
      const StoresTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
      console.log("StoresTypes:", StoresTypes); // Registrar el resultado de la búsqueda
      if (StoresTypes) {
        setStoresValuesLabel(StoresTypes.valores);
      } else {
        console.error(
          "No se encontraron etiquetas para Tipos Giros de Almacenes"
        );
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Almacenes:",
        e
      );
    }
  }

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdAlmacenOK: "",
      Principal: "",
      CantidadActual: "",
      CantidadDisponible: "",
      CantidadApartada: "",
      CantidadTransito: "",
      CantidadMerma: "",
      StockMaximo: "",
      StockMinimo: "",
    },
    validationSchema: Yup.object({
      IdAlmacenOK: Yup.string().required("Campo requerido"),
      Principal: Yup.string().required("Campo requerido"),
      CantidadActual: Yup.string().required("Campo requerido"),
      CantidadDisponible: Yup.string().required("Campo requerido"),
      CantidadApartada: Yup.boolean().required("Campo requerido"),
      CantidadTransito: Yup.string().required("Campo requerido"),
      CantidadMerma: Yup.string().required("Campo requerido"),
      StockMaximo: Yup.string().required("Campo requerido"),
      StockMinimo: Yup.string().required("Campo requerido"),

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
        const Store = StoreValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Store>>", Store);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneStore" y que previamente
        //construye todo el JSON de la coleccion de Almacenes para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneStore(Store);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Almacen fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataStore();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Almacen");
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
      open={AddStoreShowModal}
      onClose={() => setAddStoreShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Instituto</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Almacenes */}
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
            id="Principal"
            label="Principal*"
            value={formik.values.Principal}
            {...commonTextFieldProps}
            error={
              formik.touched.Principal &&
              Boolean(formik.errors.Principal)
            }
            helperText={
              formik.touched.Principal && formik.errors.Principal
            }
          />
          <TextField
            id="CantidadActual"
            label="CantidadActual*"
            value={formik.values.CantidadActual}
            {...commonTextFieldProps}
            error={
              formik.touched.CantidadActual && Boolean(formik.errors.CantidadActual)
            }
            helperText={
              formik.touched.CantidadActual && formik.errors.CantidadActual
            }
          />
          <TextField
            id="CantidadDisponible"
            label="CantidadDisponible*"
            value={formik.values.CantidadDisponible}
            {...commonTextFieldProps}
            error={formik.touched.CantidadDisponible && Boolean(formik.errors.CantidadDisponible)}
            helperText={formik.touched.CantidadDisponible && formik.errors.CantidadDisponible}
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
            onClick={() => setAddStoreShowModal(false)}
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
export default AddStoreModal;

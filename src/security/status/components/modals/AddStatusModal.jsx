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
import { StatusValues } from "../../helpers/StatusValues";
//FIC: Services
import { AddOneStatus } from "../../services/remote/post/AddOneStatus";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
const AddStatusModal = ({
  AddStatusShowModal,
  setAddStatusShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [StatussValuesLabel, setStatussValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSelectStatussType();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Status
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
  async function getDataSelectStatussType() {
    try {
      const Labels = await GetAllLabels();
      console.log("Labels:", Labels); // Registrar la respuesta completa
      const StatussTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
      console.log("StatussTypes:", StatussTypes); // Registrar el resultado de la búsqueda
      if (StatussTypes) {
        setStatussValuesLabel(StatussTypes.valores);
      } else {
        console.error(
          "No se encontraron etiquetas para Tipos Giros de Status"
        );
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Status:",
        e
      );
    }
  }

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdTipoEstatusOK: "",
      Actual: "",
      Observacion: "",
    },
    validationSchema: Yup.object({
      IdTipoEstatusOK: Yup.string().required("Campo requerido"),
      Actual: Yup.string().required("Campo requerido"),
      Observacion: Yup.string().required("Campo requerido"),
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
        //FIC: si fuera necesario meterle valores compuestos o no compuestos
        //a alguns propiedades de formik por la razon que sea, se muestren o no
        //estas propiedades en la ventana modal a travez de cualquier control.
        //La forma de hacerlo seria:
        //formik.values.IdInstitutoBK = `${formik.values.IdInstitutoOK}-${formik.values.IdCEDI}`;
        //formik.values.Matriz = autoChecksSelecteds.join(",");
        //FIC: mutar los valores (true o false) de Matriz.
        values.Matriz == true ? (values.Matriz = "S") : (values.Matriz = "N");
        //FIC: Extraer los datos de los campos de
        //la ventana modal que ya tiene Formik.
        const Status = StatusValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Status>>", Status);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneStatus" y que previamente
        //construye todo el JSON de la coleccion de Status para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneStatus(Status);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataStatus();
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
      open={AddStatusShowModal}
      onClose={() => setAddStatusShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Instituto</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Status */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <TextField
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
            value={formik.values.IdInstitutoOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdInstitutoOK &&
              Boolean(formik.errors.IdInstitutoOK)
            }
            helperText={
              formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK
            }
          />
          <TextField
            id="IdTipoEstatusOK"
            label="IdTipoEstatusOK*"
            value={formik.values.IdTipoEstatusOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoEstatusOK &&
              Boolean(formik.errors.IdTipoEstatusOK)
            }
            helperText={
              formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK
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
          <TextField
            id="Observacion"
            label="Observacion*"
            value={formik.values.Observacion}
            {...commonTextFieldProps}
            error={formik.touched.Observacion && Boolean(formik.errors.Observacion)}
            helperText={formik.touched.Observacion && formik.errors.Observacion}
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
            onClick={() => setAddStatusShowModal(false)}
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
export default AddStatusModal;

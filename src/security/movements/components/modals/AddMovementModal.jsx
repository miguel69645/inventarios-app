import { useState, useEffect } from "react";
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
import { MovementValues } from "../../helpers/MovementValues";
//FIC: Services
import { AddOneMovement } from "../../services/remote/post/AddOneMovement";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
const AddMovementModal = ({
  AddMovementShowModal,
  setAddMovementShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [MovementsValuesLabel, setMovementsValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSelectMovementsType();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Institutos
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
  async function getDataSelectMovementsType() {
    try {
      const Labels = await GetAllLabels();
      console.log("Labels:", Labels); // Registrar la respuesta completa
      const MovementsTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
      console.log("MovementsTypes:", MovementsTypes); // Registrar el resultado de la búsqueda
      if (MovementsTypes) {
        setMovementsValuesLabel(MovementsTypes.valores);
      } else {
        console.error(
          "No se encontraron etiquetas para Tipos Giros de Movimientos"
        );
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Movimientos:",
        e
      );
    }
  }

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      CantidadMovto: "",
      CantidadAnt: "",
      CantidadAct: "",
      IdTipoMovtoOK: "",
      IdClaseMovtoOK: "",
      Referencia: "",
    },
    validationSchema: Yup.object({
      CantidadMovto: Yup.number().required("Campo requerido"),
      CantidadAnt: Yup.number().required("Campo requerido"),
      CantidadAct: Yup.number().required("Campo requerido"),
      IdTipoMovtoOK: Yup.string().required("Campo requerido"),
      IdClaseMovtoOK: Yup.string().required("Campo requerido"),
      Referencia: Yup.string().required("Campo requerido"),
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
        const Movement = MovementValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Movement>>", Movement);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneMovement" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneMovement(Movement);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Movimiento fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataMovement();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Movimiento");
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
      open={AddMovementShowModal}
      onClose={() => setAddMovementShowModal(false)}
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
            id="CantidadMovto"
            label="CantidadMovto*"
            value={formik.values.CantidadMovto}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.CantidadMovto &&
              Boolean(formik.errors.CantidadMovto)
            }
            helperText={
              formik.touched.CantidadMovto && formik.errors.CantidadMovto
            }
          />
          <TextField
            id="CantidadAnt"
            label="CantidadAnt*"
            value={formik.values.CantidadAnt}
            {...commonTextFieldProps}
            error={
              formik.touched.CantidadAnt &&
              Boolean(formik.errors.CantidadAnt)
            }
            helperText={
              formik.touched.CantidadAnt && formik.errors.CantidadAnt
            }
          />
          <TextField
            id="CantidadAct"
            label="CantidadAct*"
            value={formik.values.CantidadAct}
            {...commonTextFieldProps}
            error={
              formik.touched.CantidadAct && Boolean(formik.errors.CantidadAct)
            }
            helperText={
              formik.touched.CantidadAct && formik.errors.CantidadAct
            }
          />
          <TextField
            id="IdTipoMovtoOK"
            label="IdTipoMovtoOK*"
            value={formik.values.IdTipoMovtoOK}
            {...commonTextFieldProps}
            error={formik.touched.IdTipoMovtoOK && Boolean(formik.errors.IdTipoMovtoOK)}
            helperText={formik.touched.IdTipoMovtoOK && formik.errors.IdTipoMovtoOK}
          />
          <TextField
            id="IdClaseMovtoOK"
            label="IdClaseMovtoOK*"
            value={formik.values.IdClaseMovtoOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdClaseMovtoOK &&
              Boolean(formik.errors.IdClaseMovtoOK)
            }
            helperText={
              formik.touched.IdClaseMovtoOK && formik.errors.IdClaseMovtoOK
            }
          />
          <TextField
            id="Referencia"
            label="Referencia*"
            value={formik.values.Referencia}
            {...commonTextFieldProps}
            error={
              formik.touched.Referencia &&
              Boolean(formik.errors.Referencia)
            }
            helperText={
              formik.touched.Referencia && formik.errors.Referencia
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
            onClick={() => setAddMovementShowModal(false)}
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
export default AddMovementModal;

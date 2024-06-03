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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { BusinessValues } from "../../helpers/BusinessValues";
//FIC: Services
import { postBusiness } from "../../services/remote/post/AddOneBusiness";
import { useSelector } from "react-redux";

const AddBusinessModal = ({
  AddBusinessShowModal,
  setAddBusinessShowModal,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdNegocioOK: "",
      // descripcionNegocio: "",
      ControlaSerie: "",
    },
    validationSchema: Yup.object({
      IdNegocioOK: Yup.string().required("Campo requerido"),
      ControlaSerie: Yup.boolean().required("Campo requerido"),
      descripcionNegocio: Yup.string().required("Campo requerido"),
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
        values.ControlaSerie == true ? (values.ControlaSerie = "S") : (values.ControlaSerie = "N");
        const Business = BusinessValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Business>>", Business);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneBusiness" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await postBusiness(instituto, Business);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Negocio fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataBusiness();
      } catch (e) {
        console.log(e.message);
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Negocio");
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
      open={AddBusinessShowModal}
      onClose={() => setAddBusinessShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h2">
            <strong>Agregar Nuevo Negocio</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <TextField
            id="IdNegocioOK"
            label="IdNegocioOK*"
            value={formik.values.IdNegocioOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)
            }
            helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
          />
          <TextField
            id="descripcionNegocio"
            label="descripcionNegocio*"
            value={formik.values.descripcionNegocio}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.descripcionNegocio && Boolean(formik.errors.descripcionNegocio)
            }
            helperText={formik.touched.descripcionNegocio && formik.errors.descripcionNegocio}
          />
          <FormControlLabel
            label="ControlaSerie*"
            control={
              <Checkbox
                id="ControlaSerie"
                value={formik.values.ControlaSerie}
                {...commonTextFieldProps}
                error={
                  formik.touched.ControlaSerie &&
                  Boolean(formik.errors.ControlaSerie)
                }
                helperText={
                  formik.touched.ControlaSerie && formik.errors.ControlaSerie
                }
              />
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
            onClick={() => setAddBusinessShowModal(false)}
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

export default AddBusinessModal;

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
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { StatusValues } from "../../helpers/StatusValues";
//FIC: Services
import { postStatusFisico } from "../../services/remote/post/AddOneStatus";
const AddStatusModal = ({
  AddStatusShowModal,
  setAddStatusShowModal,
  statusType,
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

  const status =
    statusType == "Fisico"
      ? [
          "IdEstatusFisicoInventariosSeries-IdUsado",
          "IdEstatusFisicoInventariosSeries-IdNuevo",
        ]
      : [
          "IdEstatusVentaInventariosSeries-IdDisponible",
          "IdEstatusVentaInventariosSeries-IdReservado",
          "IdEstatusVentaInventariosSeries-IdVendido",
        ];

  useEffect(() => {}, []);

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdTipoEstatusOK: status[0],
      Actual: "",
    },
    validationSchema: Yup.object({
      IdTipoEstatusOK: Yup.string().required("Campo requerido"),
      Actual: Yup.boolean().required("Campo requerido"),
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
        values.Actual == true ? (values.Actual = "S") : (values.Actual = "N");
        console.log(values);
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
        await postStatusFisico(ids, Status, statusType);
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
            options={status}
            renderInput={(params) => (
              <TextField {...params} label="IdTipoEstatusOK" />
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdTipoEstatusOK", newValue);
            }}
          />
          <FormControlLabel
            label="Actual*"
            control={
              <Checkbox
                id="Actual"
                value={formik.values.Actual}
                {...commonTextFieldProps}
                error={formik.touched.Actual && Boolean(formik.errors.Actual)}
                helperText={formik.touched.Actual && formik.errors.Actual}
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

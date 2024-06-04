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
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
//FIC: Helpers
import { BusinessValues } from "../../helpers/BusinessValues";
//FIC: Services
import { putBusiness } from "../../services/remote/put/UpdateOneBusiness";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
import { getOneBusiness } from "../../services/remote/get/getOneBusiness";

const UpdateBusinessModal = ({
  UpdateBusinessShowModal,
  setUpdateBusinessShowModal,
  businessId,
  InstitutoId,
  updateBusinesss,
}) => {
  const ids = [InstitutoId, businessId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [BusinesssValuesLabel, setBusinesssValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(InstitutoId, businessId);
    if (businessId) {
      getBusinessData();
    }
    getDataSelectBusinesssType();
  }, [businessId]);
  async function getDataSelectBusinesssType() {
    try {
      const Labels = await GetAllLabels();
      console.log("Labels:", Labels); // Registrar la respuesta completa
      const BusinesssTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
      console.log("BusinesssTypes:", BusinesssTypes); // Registrar el resultado de la búsqueda
      if (BusinesssTypes) {
        setBusinesssValuesLabel(BusinesssTypes.valores);
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
  async function getBusinessData() {
    console.log("getBusinessData is called");
    try {
      const businessData = await getOneBusiness(InstitutoId, businessId);
      console.log("Business Data:", businessData);
      formik.setValues({
        IdNegocioOK: businessData.IdNegocioOK,
        descripcionNegocio: businessData.descripcionNegocio,
        ControlaSerie: businessData.ControlaSerie === "S" ? true : false,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }
  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdNegocioOK: "",
      descripcionNegocio: "",
      ControlaSerie: "",
    },
    validationSchema: Yup.object({
      IdNegocioOK: Yup.string().required("Campo requerido"),
      descripcionNegocio: Yup.string().required("Campo requerido"),
      ControlaSerie: Yup.boolean().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Business = BusinessValues(values);
        console.log("<<Business>>", Business);
        await putBusiness(ids, Business);
        setMensajeExitoAlert(
          "Instituto fue actualizado y guardado Correctamente"
        );
        updateBusinesss();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar el Instituto");
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
      open={UpdateBusinessShowModal}
      onClose={() => setUpdateBusinessShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Instituto</strong>
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
            {...formik.getFieldProps("IdNegocioOK")}
            error={
              formik.touched.IdNegocioOK &&
              Boolean(formik.errors.IdNegocioOK)
            }
            helperText={
              formik.touched.IdNegocioOK && formik.errors.IdNegocioOK
            }
          />
          <TextField
            id="descripcionNegocio"
            label="descripcionNegocio*"
            {...formik.getFieldProps("descripcionNegocio")}
            error={
              formik.touched.descripcionNegocio &&
              Boolean(formik.errors.descripcionNegocio)
            }
            helperText={
              formik.touched.descripcionNegocio && formik.errors.descripcionNegocio
            }
          />
          <FormControlLabel
            label="ControlaSerie*"
            control={
              <Checkbox
                id="ControlaSerie"
                value={formik.values.ControlaSerie}
                {...commonTextFieldProps}
                checked={formik.values.ControlaSerie}
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
            onClick={() => setUpdateBusinessShowModal(false)}
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
export default UpdateBusinessModal;

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
  Autocomplete,
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
import { getAllBusiness1 } from "../../services/remote/get/getBusiness";
import { getOneBusiness } from "../../services/remote/get/getOneBusiness";

const UpdateBusinessModal = ({
  UpdateBusinessShowModal,
  setUpdateBusinessShowModal,
  businessId,
  InstitutoId,
  updateBusinesss,
  isDetailView,
}) => {
  const ids = [InstitutoId, businessId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [BusinesssValuesLabel, setBusinesssValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [businessOptions, setBusinessOptions] = useState([]);

  useEffect(() => {
    if (businessId) {
      getBusinessData();
    }
    getDataSelectBusinesssType();
  }, [businessId]);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const business = await getAllBusiness1();
        setBusinessOptions(business);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    }

    fetchBusiness();
  }, []);

  async function getDataSelectBusinesssType() {
    try {
      const Labels = await GetAllLabels();
      const BusinesssTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
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
    try {
      const businessData = await getOneBusiness(InstitutoId, businessId);
      formik.setValues({
        IdNegocioOK: businessData.IdNegocioOK,
        descripcionNegocio: businessData.descripcionNegocio,
        ControlaSerie: businessData.ControlaSerie === "S",
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }

  const formik = useFormik({
    initialValues: {
      IdNegocioOK: "",
      descripcionNegocio: "",
      ControlaSerie: false,
    },
    validationSchema: Yup.object({
      IdNegocioOK: Yup.string().required("Campo requerido"),
      descripcionNegocio: Yup.string().required("Campo requerido"),
      ControlaSerie: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values.ControlaSerie = values.ControlaSerie ? "S" : "N";
        const Business = BusinessValues(values);
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
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Negocio</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdNegocioOK"
            options={businessOptions}
            getOptionLabel={(option) => option.IdNegocioOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdNegocioOK",
                newValue ? newValue.IdNegocioOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdNegocioOK*"
                error={
                  formik.touched.IdNegocioOK &&
                  Boolean(formik.errors.IdNegocioOK)
                }
                helperText={
                  formik.touched.IdNegocioOK && formik.errors.IdNegocioOK
                }
                disabled={isDetailView}
              />
            )}
            value={
              businessOptions.find(
                (option) => option.IdNegocioOK === formik.values.IdNegocioOK
              ) || null
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
              formik.touched.descripcionNegocio &&
              formik.errors.descripcionNegocio
            }
            disabled={isDetailView}
          />
          <FormControlLabel
            label="ControlaSerie*"
            control={
              <Checkbox
                id="ControlaSerie"
                name="ControlaSerie"
                checked={formik.values.ControlaSerie}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!!mensajeExitoAlert}
              />
            }
            disabled={isDetailView}
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
            onClick={() => setUpdateBusinessShowModal(false)}
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

export default UpdateBusinessModal;

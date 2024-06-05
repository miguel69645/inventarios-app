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
  Checkbox,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BusinessValues } from "../../helpers/BusinessValues";
import { postBusiness } from "../../services/remote/post/AddOneBusiness";
import { getAllBusiness1 } from "../../services/remote/get/getBusiness";
import { useSelector } from "react-redux";

const AddBusinessModal = ({
  AddBusinessShowModal,
  setAddBusinessShowModal,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [businessOptions, setBusinessOptions] = useState([]);

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

  const formik = useFormik({
    initialValues: {
      IdNegocioOK: "",
      ControlaSerie: false,
      descripcionNegocio: "",
    },
    validationSchema: Yup.object({
      IdNegocioOK: Yup.string().required("Campo requerido"),
      ControlaSerie: Yup.boolean(),
      descripcionNegocio: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);

      try {
        const modifiedValues = {
          ...values,
          ControlaSerie: values.ControlaSerie ? "S" : "N",
        };
        const Business = BusinessValues(modifiedValues);
        await postBusiness(instituto, Business);
        setMensajeExitoAlert("Negocio fue creado y guardado Correctamente");
      } catch (e) {
        console.log(e.message);
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Negocio");
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
      open={AddBusinessShowModal}
      onClose={() => setAddBusinessShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h2">
            <strong>Agregar Nuevo Negocio</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdNegocioOK"
            options={businessOptions}
            getOptionLabel={(option) =>
              `${option.IdNegocioOK} - ${option.name}`
            }
            onChange={(event, value) =>
              formik.setFieldValue(
                "IdNegocioOK",
                value ? value.IdNegocioOK : ""
              )
            }
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
                {...commonTextFieldProps}
              />
            )}
          />
          <TextField
            id="descripcionNegocio"
            label="descripcionNegocio*"
            value={formik.values.descripcionNegocio}
            {...commonTextFieldProps}
            error={
              formik.touched.descripcionNegocio &&
              Boolean(formik.errors.descripcionNegocio)
            }
            helperText={
              formik.touched.descripcionNegocio &&
              formik.errors.descripcionNegocio
            }
          />
          <FormControlLabel
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
            label="ControlaSerie*"
          />
          {formik.touched.ControlaSerie && formik.errors.ControlaSerie && (
            <Typography color="error">{formik.errors.ControlaSerie}</Typography>
          )}
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
            onClick={() => setAddBusinessShowModal(false)}
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

export default AddBusinessModal;

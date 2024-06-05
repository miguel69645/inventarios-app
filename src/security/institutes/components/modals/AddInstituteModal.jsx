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
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InstituteValues } from "../../helpers/InstituteValues";
import { AddOneInstitute } from "../../../institutes/services/remote/post/AddOneInstitute";
import { getAllInstitutes1 } from "../../services/remote/get/getInstitutes";
import { getConcatenatedDescription } from "../../services/remote/get/getDescription";

const AddInstituteModal = ({
  AddInstituteShowModal,
  setAddInstituteShowModal,
  reloadInstitutesData,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [institutesOptions, setInstitutesOptions] = useState([]);
  const [prodServOptions, setProdServOptions] = useState([]);
  const [presentaOptions, setPresentaOptions] = useState([]);
  const [selectedProdServ, setSelectedProdServ] = useState(null);

  useEffect(() => {
    async function fetchInstitutes() {
      try {
        const institutes = await getAllInstitutes1();
        setInstitutesOptions(institutes);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    }

    async function fetchProdServOptions() {
      try {
        const options = await getConcatenatedDescription();
        setProdServOptions(options);
      } catch (error) {
        console.error("Error fetching product services:", error);
      }
    }

    fetchInstitutes();
    fetchProdServOptions();
  }, []);

  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdProdServOK: "",
      IdPresentaOK: "",
      DescripcionConcatenada: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdProdServOK: Yup.string().required("Campo requerido"),
      IdPresentaOK: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);

      try {
        const Institute = InstituteValues(values);
        await AddOneInstitute(Institute);
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        reloadInstitutesData();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Instituto");
      }

      setLoading(false);
    },
  });

  const handleProdServChange = (event, value) => {
    formik.setFieldValue("IdProdServOK", value?.IdProdServOK || "");
    setSelectedProdServ(value);
    setPresentaOptions(value ? value.presentaciones : []);
  };

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={AddInstituteShowModal}
      onClose={() => setAddInstituteShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h1">
            <strong>Agregar Nuevo Instituto</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdInstitutoOK"
            options={institutesOptions}
            getOptionLabel={(option) =>
              `${option.IdInstitutoOK} - ${option.DesInstituto}`
            }
            onChange={(event, value) => {
              formik.setFieldValue("IdInstitutoOK", value?.IdInstitutoOK || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdInstitutoOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdInstitutoOK &&
                  Boolean(formik.errors.IdInstitutoOK)
                }
                helperText={
                  formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK
                }
              />
            )}
            value={
              institutesOptions.find(
                (option) => option.IdInstitutoOK === formik.values.IdInstitutoOK
              ) || null
            }
          />
          <Autocomplete
            id="IdProdServOK"
            options={prodServOptions}
            getOptionLabel={(option) =>
              `${option.IdProdServOK} - ${option.DesProdServ}`
            }
            onChange={handleProdServChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdProdServOK*"
                error={
                  formik.touched.IdProdServOK &&
                  Boolean(formik.errors.IdProdServOK)
                }
                helperText={
                  formik.touched.IdProdServOK && formik.errors.IdProdServOK
                }
              />
            )}
            value={
              prodServOptions.find(
                (option) => option.IdProdServOK === formik.values.IdProdServOK
              ) || null
            }
          />
          {formik.values.IdProdServOK && (
            <Autocomplete
              id="IdPresentaOK"
              options={presentaOptions}
              getOptionLabel={(option) =>
                `${option.IdPresentaOK} - ${option.DesPresenta}`
              }
              onChange={(event, value) => {
                formik.setFieldValue("IdPresentaOK", value?.IdPresentaOK || "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="IdPresentaOK*"
                  error={
                    formik.touched.IdPresentaOK &&
                    Boolean(formik.errors.IdPresentaOK)
                  }
                  helperText={
                    formik.touched.IdPresentaOK && formik.errors.IdPresentaOK
                  }
                />
              )}
              value={
                presentaOptions.find(
                  (option) => option.IdPresentaOK === formik.values.IdPresentaOK
                ) || null
              }
            />
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
            onClick={() => setAddInstituteShowModal(false)}
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

export default AddInstituteModal;

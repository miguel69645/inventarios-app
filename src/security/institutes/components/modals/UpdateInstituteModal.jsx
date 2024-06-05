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
import { UpdateOneInstitute } from "../../services/remote/put/UpdateOneInstitute";
import { getAllInstitutes1 } from "../../services/remote/get/getInstitutes";
import { getConcatenatedDescription } from "../../services/remote/get/getDescription";
import { getOneInstitute } from "../../../institutes/services/remote/get/getOneInstitute";

const UpdateInstituteModal = ({
  UpdateInstituteShowModal,
  setUpdateInstituteShowModal,
  instituteId,
  updateInstitutes,
  isDetailView,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [institutesOptions, setInstitutesOptions] = useState([]);
  const [prodServOptions, setProdServOptions] = useState([]);
  const [presentaOptions, setPresentaOptions] = useState([]);

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

  useEffect(() => {
    if (instituteId) {
      getInstituteData();
    }
  }, [instituteId, prodServOptions]);

  async function getInstituteData() {
    try {
      const instituteData = await getOneInstitute(instituteId);
      const selectedProdServ = prodServOptions.find(
        (option) => option.IdProdServOK === instituteData.IdProdServOK
      );
      setPresentaOptions(
        selectedProdServ ? selectedProdServ.presentaciones : []
      );
      formik.setValues({
        IdInstitutoOK: instituteData.IdInstitutoOK,
        IdProdServOK: instituteData.IdProdServOK,
        IdPresentaOK: instituteData.IdPresentaOK,
        DescripcionConcatenada: instituteData.DescripcionConcatenada,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }

  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdProdServOK: "",
      IdPresentaOK: "",
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
        await UpdateOneInstitute(instituteId, Institute);
        setMensajeExitoAlert(
          "Instituto fue actualizado y guardado Correctamente"
        );
        updateInstitutes();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar el Instituto");
      }

      setLoading(false);
    },
  });

  const handleProdServChange = (event, value) => {
    formik.setFieldValue("IdProdServOK", value?.IdProdServOK || "");
    setPresentaOptions(value ? value.presentaciones : []);
    formik.setFieldValue("IdPresentaOK", "");
  };

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert || isDetailView,
  };

  return (
    <Dialog
      open={UpdateInstituteShowModal}
      onClose={() => setUpdateInstituteShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Instituto</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <TextField
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
            {...formik.getFieldProps("IdInstitutoOK")}
            error={
              formik.touched.IdInstitutoOK &&
              Boolean(formik.errors.IdInstitutoOK)
            }
            helperText={
              formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK
            }
            disabled={isDetailView}
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
                {...commonTextFieldProps}
              />
            )}
            value={
              prodServOptions.find(
                (option) => option.IdProdServOK === formik.values.IdProdServOK
              ) || null
            }
            disabled={isDetailView}
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
                  {...commonTextFieldProps}
                />
              )}
              value={
                presentaOptions.find(
                  (option) => option.IdPresentaOK === formik.values.IdPresentaOK
                ) || null
              }
              disabled={isDetailView}
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
            onClick={() => setUpdateInstituteShowModal(false)}
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

export default UpdateInstituteModal;

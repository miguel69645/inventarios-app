import React, { useState, useEffect } from "react";
// Material UI components
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
// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
// Services
import { putSeries } from "../../services/remote/put/UpdateOneSerie";
import { getOneSeries } from "../../services/remote/get/getOneSerie";
import { getAllSeries1 } from "../../services/remote/get/getSeries";

const UpdateSeriesModal = ({
  UpdateSeriesShowModal,
  setUpdateSeriesShowModal,
  instituteId,
  businessId,
  storeId,
  selectedSeriesId,
  updateSeries,
  isDetailView,
}) => {
  const ids = [instituteId, businessId, storeId, selectedSeriesId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState([]);

  useEffect(() => {
    if (selectedSeriesId) {
      getSeriesData();
    }
    fetchSeriesOptions();
  }, [selectedSeriesId]);

  async function fetchSeriesOptions() {
    try {
      const series = await getAllSeries1();
      setSeriesOptions(series);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  }

  async function getSeriesData() {
    try {
      const seriesData = await getOneSeries(ids);
      formik.setValues({
        Serie: seriesData.Serie,
        Placa: seriesData.Placa,
        Observacion: seriesData.Observacion,
      });
    } catch (e) {
      console.error("Error al obtener los datos de la serie:", e);
    }
  }

  // Formik and Yup setup
  const formik = useFormik({
    initialValues: {
      Serie: "",
      Placa: "",
      Observacion: "",
    },
    validationSchema: Yup.object({
      Serie: Yup.string().required("Campo requerido"),
      Placa: Yup.string().required("Campo requerido"),
      Observacion: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const series = values;
        await putSeries(ids, series);
        setMensajeExitoAlert("Serie actualizada correctamente");
        updateSeries();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar la serie: " + e.message);
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
      open={UpdateSeriesShowModal}
      onClose={() => setUpdateSeriesShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Serie</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="Serie"
            options={seriesOptions}
            getOptionLabel={(option) => `${option.Serie}`}
            onChange={(event, newValue) => {
              formik.setFieldValue("Serie", newValue ? newValue.Serie : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Serie*"
                error={formik.touched.Serie && Boolean(formik.errors.Serie)}
                helperText={formik.touched.Serie && formik.errors.Serie}
              />
            )}
            value={
              seriesOptions.find(
                (option) => option.Serie === formik.values.Serie
              ) || null
            }
            disabled={isDetailView || !!mensajeExitoAlert}
          />
          <TextField
            id="Placa"
            label="Placa*"
            {...formik.getFieldProps("Placa")}
            error={formik.touched.Placa && Boolean(formik.errors.Placa)}
            helperText={formik.touched.Placa && formik.errors.Placa}
            disabled={isDetailView}
          />
          <TextField
            id="Observacion"
            label="Observacion*"
            {...formik.getFieldProps("Observacion")}
            error={
              formik.touched.Observacion && Boolean(formik.errors.Observacion)
            }
            helperText={formik.touched.Observacion && formik.errors.Observacion}
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
            onClick={() => setUpdateSeriesShowModal(false)}
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

export default UpdateSeriesModal;

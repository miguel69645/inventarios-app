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
import * as Yup from "yup";
//FIC: Helpers
import { StoreValues } from "../../helpers/StoreValues";
//FIC: Services
import { putStore } from "../../services/remote/put/UpdateOneStore";
import { getOneStore } from "../../services/remote/get/getOneStore";
import { getAllStores1 } from "../../services/remote/get/getStores";

const UpdateStoreModal = ({
  UpdateStoreShowModal,
  setUpdateStoreShowModal,
  instituteId,
  businessId,
  selectedStoreId,
  updateStores,
  isDetailView,
}) => {
  const ids = [instituteId, businessId, selectedStoreId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [storeOptions, setStoreOptions] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const stores = await getAllStores1();
        setStoreOptions(stores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }

    fetchStores();
  }, []);

  useEffect(() => {
    if (instituteId) {
      getStoreData();
    }
  }, [instituteId]);

  async function getStoreData() {
    try {
      const instituteData = await getOneStore(ids);
      formik.setValues({
        IdAlmacenOK: instituteData.IdAlmacenOK,
        Descripcion: instituteData.Descripcion,
        Principal: instituteData.Principal === "S",
        CantidadActual: instituteData.CantidadActual,
        CantidadDisponible: instituteData.CantidadDisponible,
        CantidadApartada: instituteData.CantidadApartada,
        CantidadTransito: instituteData.CantidadTransito,
        CantidadMerma: instituteData.CantidadMerma,
        StockMaximo: instituteData.StockMaximo,
        StockMinimo: instituteData.StockMinimo,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdAlmacenOK: "",
      Descripcion: "",
      Principal: "",
      CantidadActual: "",
      CantidadDisponible: "",
      CantidadApartada: "",
      CantidadTransito: "",
      CantidadMerma: "",
      StockMaximo: "",
      StockMinimo: "",
    },
    validationSchema: Yup.object({
      IdAlmacenOK: Yup.string().required("Campo requerido"),
      Descripcion: Yup.string().required("Campo requerido"),
      Principal: Yup.boolean(),
      CantidadActual: Yup.string().required("Campo requerido"),
      CantidadDisponible: Yup.string().required("Campo requerido"),
      CantidadApartada: Yup.string().required("Campo requerido"),
      CantidadTransito: Yup.string().required("Campo requerido"),
      CantidadMerma: Yup.string().required("Campo requerido"),
      StockMaximo: Yup.string().required("Campo requerido"),
      StockMinimo: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values.Principal = values.Principal ? "S" : "N";
        const Store = StoreValues(values);
        await putStore(ids, Store);
        setMensajeExitoAlert(
          "Instituto fue actualizado y guardado Correctamente"
        );
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert(
          "No se pudo actualizar el Instituto: " + e.message
        );
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
      open={UpdateStoreShowModal}
      onClose={() => setUpdateStoreShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Almacen</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdAlmacenOK"
            options={storeOptions}
            getOptionLabel={(option) =>
              `${option.IdAlmacenOK} - ${option.name}`
            }
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdAlmacenOK",
                newValue ? newValue.IdAlmacenOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdAlmacenOK*"
                error={
                  formik.touched.IdAlmacenOK &&
                  Boolean(formik.errors.IdAlmacenOK)
                }
                helperText={
                  formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK
                }
              />
            )}
            value={
              storeOptions.find(
                (option) => option.IdAlmacenOK === formik.values.IdAlmacenOK
              ) || null
            }
            disabled={isDetailView}
          />
          <TextField
            id="Descripcion"
            label="Descripcion*"
            {...formik.getFieldProps("Descripcion")}
            error={
              formik.touched.Descripcion && Boolean(formik.errors.Descripcion)
            }
            helperText={formik.touched.Descripcion && formik.errors.Descripcion}
            disabled={isDetailView}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="Principal"
                {...formik.getFieldProps("Principal")}
                checked={formik.values.Principal}
                error={
                  formik.touched.Principal && Boolean(formik.errors.Principal)
                }
              />
            }
            label="Principal*"
            disabled={isDetailView}
          />
          <TextField
            id="CantidadActual"
            label="CantidadActual*"
            {...formik.getFieldProps("CantidadActual")}
            error={
              formik.touched.CantidadActual &&
              Boolean(formik.errors.CantidadActual)
            }
            helperText={
              formik.touched.CantidadActual && formik.errors.CantidadActual
            }
            disabled={isDetailView}
          />
          <TextField
            id="CantidadDisponible"
            label="CantidadDisponible*"
            {...formik.getFieldProps("CantidadDisponible")}
            error={
              formik.touched.CantidadDisponible &&
              Boolean(formik.errors.CantidadDisponible)
            }
            helperText={
              formik.touched.CantidadDisponible &&
              formik.errors.CantidadDisponible
            }
            disabled={isDetailView}
          />
          <TextField
            id="CantidadApartada"
            label="CantidadApartada*"
            {...formik.getFieldProps("CantidadApartada")}
            error={
              formik.touched.CantidadApartada &&
              Boolean(formik.errors.CantidadApartada)
            }
            helperText={
              formik.touched.CantidadApartada && formik.errors.CantidadApartada
            }
            disabled={isDetailView}
          />
          <TextField
            id="CantidadTransito"
            label="CantidadTransito*"
            {...formik.getFieldProps("CantidadTransito")}
            error={
              formik.touched.CantidadTransito &&
              Boolean(formik.errors.CantidadTransito)
            }
            helperText={
              formik.touched.CantidadTransito && formik.errors.CantidadTransito
            }
            disabled={isDetailView}
          />
          <TextField
            id="CantidadMerma"
            label="CantidadMerma*"
            {...formik.getFieldProps("CantidadMerma")}
            error={
              formik.touched.CantidadMerma &&
              Boolean(formik.errors.CantidadMerma)
            }
            helperText={
              formik.touched.CantidadMerma && formik.errors.CantidadMerma
            }
            disabled={isDetailView}
          />
          <TextField
            id="StockMaximo"
            label="StockMaximo*"
            {...formik.getFieldProps("StockMaximo")}
            error={
              formik.touched.StockMaximo && Boolean(formik.errors.StockMaximo)
            }
            helperText={formik.touched.StockMaximo && formik.errors.StockMaximo}
            disabled={isDetailView}
          />
          <TextField
            id="StockMinimo"
            label="StockMinimo*"
            {...formik.getFieldProps("StockMinimo")}
            error={
              formik.touched.StockMinimo && Boolean(formik.errors.StockMinimo)
            }
            helperText={formik.touched.StockMinimo && formik.errors.StockMinimo}
            disabled={isDetailView}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡EXITO!</b> {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          <LoadingButton
            variant="contained"
            color="secondary"
            onClick={() => setUpdateStoreShowModal(false)}
            startIcon={<CloseIcon />}
            loadingPosition="start"
          >
            CERRAR
          </LoadingButton>
          {!isDetailView && (
            <LoadingButton
              type="submit"
              variant="contained"
              color="secondary"
              loading={Loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
            >
              GUARDAR
            </LoadingButton>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateStoreModal;

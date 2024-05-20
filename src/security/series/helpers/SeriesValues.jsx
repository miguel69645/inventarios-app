import { SerieModel } from "../models/SerieModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const SeriesValues = (values) => {
  let serie = SerieModel();
  (serie.Serie = values.Serie),
    (serie.Placa = values.Placa),
    (serie.Observacion = values.Observacion);
  return serie;
};

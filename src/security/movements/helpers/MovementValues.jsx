import { MovementModel } from "../models/MovementsModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const MovementValues = (values) => {
  let Movement = MovementModel();
  (Movement.CantidadMovto = values.CantidadMovto),
  (Movement.CantidadAnt = values.CantidadAnt),
  (Movement.CantidadAct = values.CantidadAct),
    (Movement.IdTipoMovtoOK = values.IdTipoMovtoOK),
    (Movement.IdClaseMovtoOK = values.IdClaseMovtoOK),
    (Movement.Referencia = values.Referencia);
  return Movement;
};

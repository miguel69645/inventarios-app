import { StatusModel } from "../models/StatusModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const StatusValues = (values) => {
  let Status = StatusModel();
  (Status.IdTipoEstatusOK = values.IdTipoEstatusOK),
    (Status.Actual = values.Actual),
    (Status.Observacion = values.Observacion);
  return Status;
};

import { BusinessModel } from "../models/BusinessModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const BusinessValues = (values) => {
  let business = BusinessModel();
  (business.IdNegocioOK = values.IdNegocioOK),
    (business.ControlaSerie = values.ControlaSerie);
  return business;
};

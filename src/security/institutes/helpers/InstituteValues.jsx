import { InstituteModel } from "../models/InstitutesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const InstituteValues = (values) => {
  let Institute = InstituteModel();
  (Institute._id = values._id),
  (Institute.IdInstitutoOK = values.IdInstitutoOK),
    (Institute.IdProdServOK = values.IdProdServOK),
    (Institute.IdPresentaOK = values.IdPresentaOK);
  return Institute;
};

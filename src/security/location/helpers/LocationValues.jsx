import { InstituteModel } from "../models/InstitutesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const LocationValues = (values) => {
  let Institute = InstituteModel();
  (Institute.Ubicacion = values.Ubicacion),
    (Institute.Actual = values.Actual);
  return Institute;
};

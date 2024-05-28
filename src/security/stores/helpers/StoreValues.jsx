import { StoreModel } from "../models/StoreModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const StoreValues = (values) => {
  let Store = StoreModel();
  (Store._id = values._id),
  (Store.IdAlmacenOK = values.IdAlmacenOK),
    (Store.Principal = values.Principal),
    (Store.CantidadActual = values.CantidadActual),
    (Store.CantidadDisponible = values.CantidadDisponible),
    (Store.CantidadApartada = values.CantidadApartada),
    (Store.CantidadTransito = values.CantidadTransito),
    (Store.CantidadMerma = values.CantidadMerma),
    (Store.StockMaximo = values.StockMaximo),
    (Store.StockMinimo = values.StockMinimo);
  return Store;
};

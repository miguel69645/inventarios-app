import { getDetailRow } from "../helpers/Utils";

export function StoreModel() {
  let store = {
    IdAlmacenOK: { type: String },
    Principal: { type: String },
    CantidadActual: { type: String },
    CantidadDisponible: { type: Number },
    CantidadApartada: { type: Number },
    CantidadTransito: { type: Number },
    CantidadMerma: { type: Number },
    StockMaximo: { type: Number },
    StockMinimo: { type: Number },
    detail_row: getDetailRow(),
  };
  return store;
}

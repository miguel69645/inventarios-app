import { getDetailRow } from "../helpers/Utils";

export function StoreModel() {
  let store = {
    _id: { type: String },
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

import { getDetailRow } from "../helpers/Utils";

export function BusinessModel() {
  let Business = {
    _id: { type: String },
    IdNegocioOK: { type: String },
    descripcionNegocio: { type: String },
    ControlaSerie: { type: String },
    detail_row: getDetailRow(),
  };
  return Business;
}

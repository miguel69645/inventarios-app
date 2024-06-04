import { getDetailRow } from "../helpers/Utils";

export function BusinessModel() {
  let Business = {
    IdNegocioOK: { type: String },
    descripcionNegocio: { type: String },
    ControlaSerie: { type: String },
    detail_row: getDetailRow(),
  };
  return Business;
}

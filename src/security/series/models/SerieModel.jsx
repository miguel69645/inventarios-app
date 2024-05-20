import { getDetailRow } from "../helpers/Utils";

export function SerieModel() {
  let Serie = {
    Serie: { type: String },
    Placa: { type: String },
    Observacion: { type: String },
    detail_row: getDetailRow(),
  };
  return Serie;
}

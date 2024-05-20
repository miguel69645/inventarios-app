import { getDetailRow } from "../helpers/Utils";

export function MovementModel() {
  let Movement = {
    CantidadMovto: { type: Number },
    CantidadAnt: { type: Number },
    CantidadAct: { type: Number },
    IdTipoMovtoOK: { type: String },
    IdClaseMovtoOK: { type: String },
    Referencia: { type: String },
    detail_row: getDetailRow(),
  };
  return Movement;
}

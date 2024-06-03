import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    Ubicacion: { type: String },
    Actual: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}

import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    IdInstitutoOK: { type: String },
    IdProdServOK: { type: String },
    IdPresentaOK: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}

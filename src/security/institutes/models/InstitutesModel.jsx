import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    _id: { type: String },
    IdInstitutoOK: { type: String },
    IdProdServOK: { type: String },
    IdPresentaOK: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}

import { getDetailRow } from "../helpers/Utils";

export function StatusModel() {
  let Status = {
    IdTipoEstatusOK: { type: String },
    Actual: { type: String },
    detail_row: getDetailRow(),
  };
  return Status;
}

import axios from "axios";

export async function deleteStatusFisico(
  id,
  idNegocioOk,
  idAlmacenOK,
  serieId,
  estatusVentaId
) {
  console.log(id, idNegocioOk, idAlmacenOK, serieId, estatusVentaId);
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}/estatus_venta/${estatusVentaId}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Status venta eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteStatus - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteStatus - Status>>", error);
        reject(error);
      });
  });
}

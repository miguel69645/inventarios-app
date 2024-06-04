import axios from "axios";

export async function putStatusVenta(
  id,
  idNegocioOk,
  idAlmacenOK,
  serieId,
  estatusVentaId,
  statusventa
) {
  console.log(
    id,
    idNegocioOk,
    idAlmacenOK,
    serieId,
    estatusVentaId,
    statusventa
  );
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}/estatus_venta/${estatusVentaId}`,
        statusventa
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("statusventa actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putStatus - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putStatus - Status>>", error);
        reject(error);
      });
  });
}

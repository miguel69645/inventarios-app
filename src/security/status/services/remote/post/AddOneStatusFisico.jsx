import axios from "axios";

export async function postStatusFisico(
  id,
  idNegocioOk,
  idAlmacenOK,
  serieId,
  statusfisico
) {
  console.log(id, idNegocioOk, idAlmacenOK, serieId, statusfisico);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}/status_fisico`,
        statusfisico
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Status fisico agregado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<postStatus - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<postStatus - Status>>", error);
        reject(error);
      });
  });
}

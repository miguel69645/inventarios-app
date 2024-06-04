import axios from "axios";

export async function deleteLocation(
  id,
  idNegocioOk,
  idAlmacenOK,
  serieId,
  ubicacionId
) {
  console.log(id, idNegocioOk, idAlmacenOK, serieId, ubicacionId);
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}/ubicaciones/${ubicacionId}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Ubicacion eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteLocation - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteLocation - Location>>", error);
        reject(error);
      });
  });
}

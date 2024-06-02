import axios from "axios";

export async function deleteSerie(id, idNegocioOk, idAlmacenOK, serieId) {
  console.log(id, idNegocioOk, idAlmacenOK, serieId);
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Serie eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteSerie - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteSerie - Series>>", error);
        reject(error);
      });
  });
}

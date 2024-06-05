import axios from "axios";

export async function putSeries(ids, serie) {
  const [id, idNegocioOk, idAlmacenOK, serieId] = ids;
  console.log("res",id, idNegocioOk, idAlmacenOK, serieId, serie);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}`,
        serie
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("serie actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putSerie - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putSerie - Series>>", error);
        reject(error);
      });
  });
}

import axios from "axios";

export async function putLocation(
  id,
  idNegocioOk,
  idAlmacenOK,
  serieId,
  ubicacionId,
  location
) {
  console.log(
    id,
    idNegocioOk,
    idAlmacenOK,
    serieId,
    ubicacionId,
    location
  );
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}/ubicaciones/${ubicacionId}`,
        location
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("location actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putLocation - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putLocation - Location>>", error);
        reject(error);
      });
  });
}

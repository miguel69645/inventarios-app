import axios from "axios";

export async function postLocation(
  id,
  idNegocioOk,
  idAlmacenOK,
  serieId,
  location
) {
  console.log(id, idNegocioOk, idAlmacenOK, serieId, location);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}/series/${serieId}/ubicaciones`,
        location
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Ubicacion agregado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<postLocation - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<postLocation - Location>>", error);
        reject(error);
      });
  });
}

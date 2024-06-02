import axios from "axios";

export async function putStore(id, idNegocioOk, idAlmacenOK, almacen) {
  console.log(id, idNegocioOk, idAlmacenOK, almacen);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}`,
        almacen
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("almacen actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putStore - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putStore - Store>>", error);
        reject(error);
      });
  });
}

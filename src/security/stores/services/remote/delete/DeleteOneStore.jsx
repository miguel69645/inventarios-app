import axios from "axios";

export async function deleteStore(id, idNegocioOk, idAlmacenOK) {
  console.log(id, idNegocioOk, idAlmacenOK);
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes/${idAlmacenOK}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Almacen eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteStore - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteStore - Store>>", error);
        reject(error);
      });
  });
}

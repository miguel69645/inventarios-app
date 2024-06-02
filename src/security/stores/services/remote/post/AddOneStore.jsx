import axios from "axios";

export async function postStore(id, idNegocioOk, almacen) {
  console.log(id, idNegocioOk, almacen);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/negocios/${idNegocioOk}/almacenes`,
        almacen
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Almacen agregado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<postStore - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<postStore - Store>>", error);
        reject(error);
      });
  });
}

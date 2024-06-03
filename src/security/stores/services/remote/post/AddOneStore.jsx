import axios from "axios";

export async function postStore(ids, almacen) {
  console.log(ids, almacen);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${
          import.meta.env.VITE_GET_ALL
        }/${ids[0]}/negocios/${ids[1]}/almacenes`,
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
import axios from "axios";

export async function putStore(ids, almacen) {
  console.log(
    `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${ids[1]}/almacenes/${
      ids[2]
    }`
  );
  console.log(ids, almacen);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${
          ids[1]
        }/almacenes/${ids[2]}`,
        almacen
      )
      .then((response) => {
        console.log(response.status);
        if (response.status == 200 || response.status == 201) {
          console.log("almacen actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putStore - Services>>",
            response.data
          );
          reject([]);
        }
      })
      .catch((error) => {
        console.error("Error en <<putStore - Store>>", error);
        reject(error);
      });
  });
}

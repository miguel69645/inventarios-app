import axios from "axios";

export async function putLocation(
  ids,
  location
) {
  console.log(
    ids,
    location
  );
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${
          import.meta.env.VITE_GET_ALL
        }/${ids[0]}/negocios/${ids[1]}/almacenes/${ids[2]}/series/${ids[3]}/ubicaciones/${ids[4]}`,
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

import axios from "axios";

export async function postLocation(
  ids,
  location
) {
  console.log(ids, location);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${
          import.meta.env.VITE_GET_ALL
        }/${ids[0]}/negocios/${ids[1]}/almacenes/${ids[2]}/series/${ids[3]}/ubicaciones`,
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
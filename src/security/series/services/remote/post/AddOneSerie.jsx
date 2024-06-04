import axios from "axios";
export async function postSerie(ids, serie) {
  console.log(ids, serie);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${
          ids[1]
        }/almacenes/${ids[2]}/series`,
        serie
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Serie agregado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<postSerie - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<postSerie - Series>>", error);
        reject(error);
      });
  });
}

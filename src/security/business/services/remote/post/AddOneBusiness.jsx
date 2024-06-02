import axios from "axios";

export async function postBusiness(id, negocio) {
  console.log(id, negocio);
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_GET_ALL}/${id}/negocios`, negocio)
      .then((response) => {
        if (response.status === 201) {
          console.log("Negocio agregado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<postBusiness - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<postBusiness - Business>>", error);
        reject(error);
      });
  });
}

import axios from "axios";

export async function putBusiness(id, idNegocioOk, negocio) {
  console.log(id, idNegocioOk, negocio);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${id}/negocios/${idNegocioOk}`,
        negocio
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Negocio actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putBusiness - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putBusiness - Business>>", error);
        reject(error);
      });
  });
}

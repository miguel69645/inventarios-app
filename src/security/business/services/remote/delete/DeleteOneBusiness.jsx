import axios from "axios";

export async function deleteBusiness(id, idNegocioOk) {
  console.log(id, idNegocioOk);
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_GET_ALL}/${id}/negocios/${idNegocioOk}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Negocio eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteBusiness - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteBusiness - Business>>", error);
        reject(error);
      });
  });
}

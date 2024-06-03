import axios from "axios";

export async function postStatusFisico(ids, status, statusType) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${
    ids[1]
  }/almacenes/${ids[2]}/series/${ids[3]}/${statusType == "Fisico" ? "estatus_fisico" : "estatus_venta"}`);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${
          ids[1]
        }/almacenes/${ids[2]}/series/${ids[3]}/${statusType == "Fisico" ? "estatus_fisico" : "estatus_venta"}`,
        status
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Status fisico agregado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<postStatus - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<postStatus - Status>>", error);
        reject(error);
      });
  });
}

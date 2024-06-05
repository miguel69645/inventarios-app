import axios from "axios";

export async function updateStatus(ids, statusId, status, statusType) {
  console.log(
    `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${ids[1]}/almacenes/${
      ids[2]
    }/series/${ids[3]}/${
      statusType == "Fisico" ? "estatus_fisico" : "estatus_venta"
    }/${statusId}`
  );
  return new Promise((resolve, reject) => {
    console.log("Updating status with:", status);
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${
          ids[1]
        }/almacenes/${ids[2]}/series/${ids[3]}/${
          statusType == "Fisico" ? "estatus_fisico" : "estatus_venta"
        }/${statusId}`,
        status
      )
      .then((response) => {
        console.log("API response:", response);
        if (response.status === 200) {
          console.log("Status fisico actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<updateStatus - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<updateStatus - Status>>", error);
        reject(error);
      });
  });
}

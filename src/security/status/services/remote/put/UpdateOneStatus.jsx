import axios from "axios";

export async function putStatus_fisico(ids, estatus_fisico) {
  console.log(
    `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${ids[1]}/almacenes/${
      ids[2]
    }/series/${ids[3]}/estatus_fisico/${ids[4]}`
  );
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${
          ids[1]
        }/almacenes/${ids[2]}/series/${ids[3]}/estatus_fisico/${ids[4]}`,
        estatus_fisico
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("serie actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putSerie - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putSerie - Series>>", error);
        reject(error);
      });
  });
}

export async function putStatus_venta(ids, estatus_venta) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${
          ids[1]
        }/almacenes/${ids[2]}/series/${ids[3]}/estatus_venta/${ids[4]}`,
        estatus_venta
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("serie actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putSerie - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putSerie - Series>>", error);
        reject(error);
      });
  });
}

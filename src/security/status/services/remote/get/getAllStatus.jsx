import axios from "axios";

export function getAllStatus(ids) {
  console.log(ids);
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/${ids[1]}/${ids[2]}/${
          ids[3]
        }`
      )
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.status)) {
          const status = data.status.map((status) => {
            return {
              IdTipoEstatusOK: status.IdTipoEstatusOK,
              Actual: status.Actual,
            };
          });
          console.log(status);
          resolve(status);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllStatus - Status>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllStatus - Status>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

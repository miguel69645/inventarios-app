import axios from "axios";

export function getAllSeries(id, selectedBusinessId, selectedStoresId) {
  console.log(id, selectedBusinessId, selectedStoresId);
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/${selectedBusinessId}/${selectedStoresId}`
      )
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          const series = data.map((serie) => {
            return {
              Serie: serie.Serie,
              Placa: serie.Placa,
              Observacion: serie.Observacion,
            };
          });
          console.log(series);
          resolve(series);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllSeries - Service>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllSeries - Series>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

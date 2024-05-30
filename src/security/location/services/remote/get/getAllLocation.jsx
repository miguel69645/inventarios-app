import axios from "axios";

export function getAllLocations(
  id,
  selectedBusinessId,
  selectedStoresId,
  selectedSeriesId
) {
  console.log(id, selectedBusinessId, selectedStoresId, selectedSeriesId);
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${
          import.meta.env.VITE_GET_ALL
        }/${id}/${selectedBusinessId}/${selectedStoresId}/${selectedSeriesId}`
      )
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.location)) {
          const location = data.location.flat().map((location) => {
            // Utiliza flat() para convertir el array de arrays en un solo array
            return {
              Ubicacion: location.Ubicacion,
              Actual: location.Actual,
            };
          });
          console.log(location);
          resolve(location);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllLocations - Location>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllLocations - Location>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

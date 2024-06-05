import axios from "axios";

export function getOneLocation(ids, selectedUbicacionId) {
  console.log("hola", ids, selectedUbicacionId);
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/${ids[1]}/${ids[2]}/${
          ids[3]
        }`
      )
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.location)) {
          const location = data.location
            .flat()
            .find(
              (locationItem) => locationItem.Ubicacion == selectedUbicacionId
            );
          console.log(location);
          if (location) {
            resolve(location);
          } else {
            console.error(
              "No se pudo encontrar la ubicación con el ID proporcionado",
              selectedUbicacionId
            );
            reject(new Error("Ubicación no encontrada"));
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getOneLocation - Location>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getOneLocation - Location>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

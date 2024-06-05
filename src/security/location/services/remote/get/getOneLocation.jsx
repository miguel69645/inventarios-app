import axios from "axios";

export function getOneLocation(ids, selectedUbicacionId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/${ids[1]}/${ids[2]}/${
          ids[3]
        }`
      )
      .then((response) => {
        const data = response.data;
        let ubicacion = {}
        const location = data.location.map((locationItem) => {
          locationItem.map((locatito) => {
            console.log(locatito, selectedUbicacionId);
            if (locatito.Ubicacion == selectedUbicacionId)
              ubicacion = {
                Ubicacion: locatito.Ubicacion,
                Actual: locatito.Actual,
              };
          })
        });
        console.log(location);
        if (location) {
          resolve(ubicacion);
        } else {
          console.error(
            "No se pudo encontrar la ubicación con el ID proporcionado",
            selectedUbicacionId
          );
          reject(new Error("Ubicación no encontrada"));
        }
      })
      .catch((error) => {
        console.error("Error en <<getOneLocation - Location>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

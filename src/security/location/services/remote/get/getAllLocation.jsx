import axios from "axios";

export function getAllLocations() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const ubicaciones = data.flatMap((item) =>
          item.negocios.flatMap((negocios) =>
            negocios.almacenes.flatMap((almacenes) =>
              almacenes.series.flatMap((serie) => 
                serie.ubicaciones.map((ubicacion) => {
                  return {
                    Ubicacion: ubicacion.Ubicacion,
                    Actual: ubicacion.Actual,
                  };
                })
              )
            )
          )
        );
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_ubicaciones>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_ubicaciones>>", data);
            resolve(ubicaciones); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllLocations - Locations>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllLocations - locations>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
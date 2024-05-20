import axios from "axios";

export function getAllSeries() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const series = data.flatMap((item) =>
          item.negocios.flatMap((negocios) =>
            negocios.almacenes.flatMap((almacenes) =>
              almacenes.series.map((serie) => {
                return {
                  Serie: serie.Serie,
                  Placa: serie.Placa,
                  CantidadAct: serie.CantidadAct,
                  IdTipoMovtoOK: serie.IdTipoMovtoOK,
                  IdClaseMovtoOK: serie.IdClaseMovtoOK,
                  Referencia: serie.Referencia,
                };
              })
            )
          )
        );
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_Series>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_series>>", data);
            resolve(series); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllSeriess - Series>>",
            data
          );
          reject(series); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllSeriess - Series>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
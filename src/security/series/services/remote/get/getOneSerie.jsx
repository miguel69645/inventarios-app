import axios from "axios";

export function getOneSeries(ids) {
  console.log(ids);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/${ids[1]}/${ids[2]}`)
      .then((response) => {
        const data = response.data;
        let series = {};
        data.map((serie) => {
          if (serie.Serie == ids[3]) {
            series = {
              Serie: serie.Serie,
              Placa: serie.Placa,
              Observacion: serie.Observacion,
            };
          } else return;
        });
        console.log(series);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(series);
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(series);
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error);
      });
  });
}

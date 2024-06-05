import axios from "axios";

export function getOneLocation(ids, selectedStatusId) {
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
        console.log("e", data);
        let location = {};
        data.location.map((locationItem) => {
          if (locationItem.IdTipoEstatusOK == selectedStatusId) {
            location = {
              Ubicacion: locationItem.Ubicacion,
              Actual: locationItem.Actual,
            };
          } else return;
        });
        console.log(location);
        if (response.location === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(location);
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(location);
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error);
      });
  });
}

import axios from "axios";

export function getOneStatus(ids, selectedStatusId) {
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
        console.log("e",data);
        let status = {};
        data.status.map((statusItem) => {
          if (statusItem.IdTipoEstatusOK == selectedStatusId) {
            status = {
              IdTipoEstatusOK: statusItem.IdTipoEstatusOK,
              Actual: statusItem.Actual,
            };
          } else return;
        });
        console.log(status);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(status);
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(status);
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error);
      });
  });
}

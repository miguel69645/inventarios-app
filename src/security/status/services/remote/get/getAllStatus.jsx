import axios from "axios";

export function getAllStatus() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const ventas = data.flatMap((item) =>
          item.negocios.flatMap((negocios) =>
            negocios.almacenes.flatMap((almacenes) =>
              almacenes.series.flatMap((serie) => 
                serie.estatus_venta.map((status) => {
                  return {
                    IdTipoEstatusOK: status.IdTipoEstatusOK,
                    Actual: status.Actual,
                  };
                })
              )
            )
          )
        );

        const fisico = data.flatMap((item) =>
          item.negocios.flatMap((negocios) =>
            negocios.almacenes.flatMap((almacenes) =>
              almacenes.series.flatMap((serie) => 
                serie.estatus_fisico.map((status) => {
                  return {
                    IdTipoEstatusOK: status.IdTipoEstatusOK,
                    Actual: status.Actual,
                  };
                })
              )
            )
          )
        );

        const status = [...ventas, ...fisico]
        console.log(status);
        if (response.status === 200) {
          if (status.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_status>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_status>>", status);
            resolve(status); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllStatus - Status>>",
            status
          );
          reject(status); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllStatus - Status>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

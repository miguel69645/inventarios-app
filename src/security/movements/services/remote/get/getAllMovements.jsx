import axios from "axios";

export function getAllMovements() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const movimientos = data.flatMap((item) =>
          item.negocios.flatMap((negocios) =>
            negocios.almacenes.flatMap((almacenes) =>
              almacenes.movtos.map((movimientos) => {
                return {
                  CantidadMovto: movimientos.CantidadMovto,
                  CantidadAnt: movimientos.CantidadAnt,
                  CantidadAct: movimientos.CantidadAct,
                  IdTipoMovtoOK: movimientos.IdTipoMovtoOK,
                  IdClaseMovtoOK: movimientos.IdClaseMovtoOK,
                  Referencia: movimientos.Referencia,
                };
              })
            )
          )
        );
        console.log(movimientos)
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_movimientos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_movements>>", data);
            resolve(movimientos); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllMovements - Movements>>",
            data
          );
          reject(movimientos); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllMovements - Movements>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

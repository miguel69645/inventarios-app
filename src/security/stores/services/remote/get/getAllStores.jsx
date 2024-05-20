import axios from "axios";

export function getAllStores() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const almacenes = data.flatMap((item) =>
          item.negocios.flatMap((negocios) =>
            negocios.almacenes.map((almacenes) => {
              return {
                IdAlmacenOK: almacenes.IdAlmacenOK,
                Principal: almacenes.Principal,
                CantidadActual: almacenes.CantidadActual,
                CantidadDisponible: almacenes.CantidadDisponible,
                CantidadApartada: almacenes.CantidadApartada,
                CantidadTransito: almacenes.CantidadTransito,
                CantidadMerma: almacenes.CantidadMerma,
                StockMaximo: almacenes.StockMaximo,
                StockMinimo: almacenes.StockMinimo,
              };
            })
          )
        );
        console.log(almacenes);

        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_almacenes>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(almacenes); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllStores - Service>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllStores - Stores>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

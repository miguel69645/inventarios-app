import axios from "axios";

export function getAllStores(id, selectedBusinessId) {
  console.log(id, selectedBusinessId);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${id}/${selectedBusinessId}`)
      .then((response) => {
        const data = response.data;
<<<<<<< HEAD
        const almacenes = data.flatMap((item) =>
          item.negocios.flatMap((negocios) =>
            negocios.almacenes.map((almacenes) => {
              return {
                _id: almacenes._id,
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
=======
        if (Array.isArray(data)) {
          const almacenes = data.map((almacen) => {
            return {
              IdAlmacenOK: almacen.IdAlmacenOK,
              Principal: almacen.Principal,
              CantidadActual: almacen.CantidadActual,
              CantidadDisponible: almacen.CantidadDisponible,
              CantidadApartada: almacen.CantidadApartada,
              CantidadTransito: almacen.CantidadTransito,
              CantidadMerma: almacen.CantidadMerma,
              StockMaximo: almacen.StockMaximo,
              StockMinimo: almacen.StockMinimo,
            };
          });
          console.log(almacenes);
          resolve(almacenes);
>>>>>>> 4c2cf068c87d60beaefb7ff73a056bbc17ff787f
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

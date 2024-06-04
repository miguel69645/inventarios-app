import axios from "axios";

export function getAllStores(id, selectedBusinessId) {
  console.log(id, selectedBusinessId);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${id}/${selectedBusinessId}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          const almacenes = data.map((almacen) => {
            return {
              IdAlmacenOK: almacen.IdAlmacenOK,
              Descripcion: almacen.Descripcion,
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

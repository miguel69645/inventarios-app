import axios from "axios";

export function getOneStore(ids) {
  console.log(ids);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/${ids[1]}`)
      .then((response) => {
        const data = response.data;
        let store = {};
        data.map((almacen) => {
          if (almacen.IdAlmacenOK == ids[2]) {
            store = {
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
          } else return;
        });
        console.log(store)
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(store);
            // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(store); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

import axios from "axios";

export function getAllBusiness() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data
        const negocios = data.flatMap((item) => item.negocios.map((negocios) => {
          return {
            IdNegocioOK: negocios.IdNegocioOK,
            ControlaSerie: negocios.ControlaSerie,
            Activo: negocios.detail_row.Activo,
            Borrado: negocios.detail_row.Borrado,
          };
        }));
        console.log(negocios)

        if (response.status === 200) {
          if (negocios.length === 0) {
            console.info("🛈 No se encontraron documentos en <<business>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data); // Resuelve la promesa con el arreglo de institutos
            resolve(negocios);
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllBusiness - Services>>",
            negocios
          );
          reject(negocios); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllBusiness - Business>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

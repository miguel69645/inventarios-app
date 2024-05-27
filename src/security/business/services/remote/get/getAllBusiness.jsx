import axios from "axios";

export async function getAllBusiness(id) {
  console.log(id)
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${id}`)
      .then((response) => {
        const data = response.data
        const negocios = data.negocios.map((negocios) => {
          return {
            IdNegocioOK: negocios.IdNegocioOK,
            ControlaSerie: negocios.ControlaSerie,
            descripcionNegocio: negocios.descripcionNegocio,
          };
        });
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

import axios from "axios";

export function getOneBusiness(instituteId, businessId) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${instituteId}`);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${instituteId}`)
      .then((response) => {
        const data = response.data;
        let business = {};
        data.negocios.map((negocio) => {
          if (negocio.IdNegocioOK == businessId) {
            business = {
              IdNegocioOK: negocio.IdNegocioOK,
              descripcionNegocio: negocio.descripcionNegocio,
              ControlaSerie: negocio.ControlaSerie,
            };
          } else return;
        });
        console.log(business);

        if (response.status === 200 || response.status === 201) {
          resolve(business);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneBusiness>> de forma correcta",
            data
          );
          reject(business);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOneBusiness>>", error);
        reject(error);
      });
  });
}

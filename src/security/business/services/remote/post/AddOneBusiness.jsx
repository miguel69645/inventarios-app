import axios from "axios";

export function AddOneBusiness(business) {
  console.log("<<EJECUTA>> API <<AddOneBusiness>> Requiere:", business);
  return new Promise((resolve, reject) => {
    const documentId = business._id;
    const newBusinessEntry = business.datos
    axios
      .get(`import.meta.env.VITE_GET_ALL/${documentId}`)
      .then((response) => {
        
        if (response.status === 200 || response.status === 201) {
          const data = response.data;
          data.negocios.push()
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneBusiness>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneBusiness>>", error);
        reject(error);
      });
  });
}

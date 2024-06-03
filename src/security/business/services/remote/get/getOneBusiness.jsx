import axios from "axios";

export function UpdateOneBusiness(instituteId, businessId, business) {
  console.log("<<EJECUTA>> API <<UpdateOneBusiness>> Requiere:", business);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${instituteId}/${businessId}`,
        business
      )
      .then((response) => {
        console.log("<<RESPONSE>> UpdateOneBusiness", business);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneBusiness>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOneBusiness>>", error);
        reject(error);
      });
  });
}
import axios from "axios";

export function AddOneBusiness(business) {
  console.log("<<EJECUTA>> API <<AddOneBusiness>> Requiere:", business);
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_GET_ALL_BUSINESS_URL, business)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneBusiness", business);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
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

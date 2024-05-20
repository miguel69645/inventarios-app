import axios from "axios";

export function AddOneStore(store) {
  console.log("<<EJECUTA>> API <<AddOneInstitute>> Requiere:", store);
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_CAT_STORE_URL, store)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneInstitute", store);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneStore>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneStore>>", error);
        reject(error);
      });
  });
}

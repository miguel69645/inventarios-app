import axios from "axios";

export function AddOneStatus(status) {
  console.log("<<EJECUTA>> API <<AddOneStatus>> Requiere:", status);
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_CAT_STATUS_URL, status)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneStatus", status);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneStatus>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneStatus>>", error);
        reject(error);
      });
  });
}

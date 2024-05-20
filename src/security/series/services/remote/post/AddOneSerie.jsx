import axios from "axios";

export function AddOneSeries(Serie) {
  console.log("<<EJECUTA>> API <<AddOneSeries>> Requiere:", Serie);
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_CAT_SERIES_URL, Serie)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneSeries", Serie);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneSeries>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneSeries>>", error);
        reject(error);
      });
  });
}

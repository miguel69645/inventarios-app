import axios from "axios";

export function AddOneLocation(location) {
  console.log("<<EJECUTA>> API <<AddOnelocation>> Requiere:", location);
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_CAT_LOCATIONS_URL, location)
      .then((response) => {
        console.log("<<RESPONSE>> AddOnelocation", location);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOnelocation>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOnelocation>>", error);
        reject(error);
      });
  });
}

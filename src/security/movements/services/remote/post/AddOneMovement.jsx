import axios from "axios";

export function AddOneMovement(movement) {
  console.log("<<EJECUTA>> API <<AddOneMovement>> Requiere:", movement);
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_CAT_MOVEMENT_URL, movement)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneMovement", movement);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneMovement>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneMovement>>", error);
        reject(error);
      });
  });
}

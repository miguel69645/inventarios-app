import axios from "axios";

export const AddOneInstitute = async (institute) => {
  try {
    console.log("<<EJECUTA>> API <<AddOneInstitute>> Requiere:", institute);
    const response = await axios.post(import.meta.env.VITE_GET_ALL, institute);

    console.log("<<RESPONSE>> AddOneInstitute", institute);
    const data = response.data;
    console.log(response.status);

    if (response.status === 200 || response.status === 201) {
      return data;
    } else {
      console.error(
        "<<ERROR>> <<NO>> se ejecuto la API <<AddOneInstitute>> de forma correcta",
        data
      );
      throw data;
    }
  } catch (error) {
    console.error("<<ERROR>> en API <<AddOneInstitute>>", error);
    throw error;
  }
};

import axios from "axios";

export const UpdateOneInstitute = async (id, institute) => {
  try {
    console.log(
      "<<EJECUTA>> API <<UpdateOneInstitute>> Requiere:",
      id,
      institute
    );
    const response = await axios.put(
      `${import.meta.env.VITE_GET_ALL}/${id}`,
      institute
    );

    console.log("<<RESPONSE>> UpdateOneInstitute", institute);
    const data = response.data;
    console.log(response.status);

    if (response.status === 200 || response.status === 201) {
      return data;
    } else {
      console.error(
        "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneInstitute>> de forma correcta",
        data
      );
      throw data;
    }
  } catch (error) {
    console.error("<<ERROR>> en API <<UpdateOneInstitute>>", error);
    throw error;
  }
};

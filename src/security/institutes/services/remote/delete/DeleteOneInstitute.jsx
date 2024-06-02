import axios from "axios";

export const DeleteOneInstitute = async (id) => {
  try {
    console.log("<<EJECUTA>> API <<DeleteOneInstitute>> Requiere:", id);
    const response = await axios.delete(
      `${import.meta.env.VITE_GET_ALL}/${id}`
    );

    console.log("<<RESPONSE>> DeleteOneInstitute", id);
    const data = response.data;
    console.log(response.status);

    if (response.status === 200 || response.status === 204) {
      return data;
    } else {
      console.error(
        "<<ERROR>> <<NO>> se ejecuto la API <<DeleteOneInstitute>> de forma correcta",
        data
      );
      throw data;
    }
  } catch (error) {
    console.error("<<ERROR>> en API <<DeleteOneInstitute>>", error);
    throw error;
  }
};

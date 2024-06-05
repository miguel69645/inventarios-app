import axios from "axios";

export const getConcatenatedDescription = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_GET_ALL1);
    if (response.status === 200) {
      console.log("Colección: <<cat_prod>>", response.data);
      return response.data;
    } else {
      console.error(
        "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
        response.data
      );
      throw new Error(response.data);
    }
  } catch (error) {
    console.error("Error en <<getAllInstitutes - Services>>", error);
    throw error;
  }
};

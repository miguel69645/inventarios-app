import axios from "axios";

export const getConcatenatedDescription = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_GET_ALL1);
    if (response.status === 200) {
      console.log("Colección: <<cat_prod>>", response.data);
      const data = response.data.reduce((acc, item) => {
        if (!acc[item.IdProdServOK]) {
          acc[item.IdProdServOK] = {
            DesProdServ: item.DesProdServ,
            presentaciones: [],
          };
        }
        acc[item.IdProdServOK].presentaciones.push({
          IdPresentaOK: item.IdPresentaOK,
          DesPresenta: item.DesPresenta,
        });
        return acc;
      }, {});
      return Object.entries(data).map(([IdProdServOK, value]) => ({
        IdProdServOK,
        ...value,
      }));
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

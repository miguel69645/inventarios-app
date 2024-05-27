import axios from "axios";
export async function getInstitutesAll() {
  let result = await axios.get(
    `${import.meta.env.VITE_GET_ALL}`
  );
  return result.data;
}

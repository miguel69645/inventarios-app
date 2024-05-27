import axios from "axios";
export async function getInstitutesAll() {
  let result = await axios.get(
    `${import.meta.env.VITE_GET_ALL}`
  );
  console.log(result.data[0]._id);
  return result.data[0]._id;
}

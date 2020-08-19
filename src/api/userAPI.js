import axios from "axios";

export const fetchUsersCharacters = async (user) => {
  const url = `https://dnd-backend-node.herokuapp.com/characters`;
  try {
    const { data } = await axios.get(url, {
      headers: {
        "x-auth-token": user.auth,
        "x-auth-user": user.id,
      },
    });
    console.log("api", data);
    return data;
  } catch (error) {
    return error;
  }
};

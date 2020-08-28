import axios from "axios";

export const fetchUsersCharacters = async (user) => {
    const url = `/characters`;
    try {
        const { data } = await axios.get(url, {
            headers: {
                "x-auth-token": user.auth,
                "x-auth-user": user.id,
            },
        });

        return data;
    } catch (error) {
        return error;
    }
};

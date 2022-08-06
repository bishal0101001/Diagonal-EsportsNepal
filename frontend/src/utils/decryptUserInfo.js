import axios from "axios";

export async function decryptUserInfo(encrypted) {
  const { data } = await axios.post(
    `/api/user/decrypt`,
    { encrypted },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}

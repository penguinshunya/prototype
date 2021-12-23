import axios from "axios";

export interface User {
  id: string;
  name: string;
  description: string;
}

export async function ListUsers() {
  return await axios.get<User[]>("https://qiita.com/api/v2/users").then((r) => r.data);
}

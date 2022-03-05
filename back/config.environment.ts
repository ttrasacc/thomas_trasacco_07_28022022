import * as dotenv from "dotenv";
dotenv.config();

export const env: Config = process.env as unknown as Config;

interface Config {
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
}

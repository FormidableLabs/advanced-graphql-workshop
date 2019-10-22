import { createContext, useContext } from "react";
import { Client } from "./Client";

export const Context = createContext(new Client("/graphql"));

export const useClient = () => useContext(Context);

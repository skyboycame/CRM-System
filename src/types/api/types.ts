import type { TodoInfoFilterEnum } from "../todos/types";


export interface GetParams {
  filter?: TodoInfoFilterEnum;
}

export type StatusType = "loading" | "fulfilled" | "rejected" | "idle";

export type FailedRequst = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

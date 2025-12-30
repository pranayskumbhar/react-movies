import { AxiosError } from "axios";

export function GetAxiosError(error: unknown): AxiosError | null {
    return error as AxiosError;
}
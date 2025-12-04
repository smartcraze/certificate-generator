import { NextResponse } from "next/server";

export type ApiResponse<T = any> = {
  status: number;
  message: string;
  data?: T;
  error?: string;
};

type SuccessArgs<T> = {
  message: string;
  data?: T;
  status?: number;
};

type ErrorArgs = {
  message: string;
  status?: number;
  error?: string;
};

export function sendSuccess<T>({
  message,
  data,
  status = 200,
}: SuccessArgs<T>) {
  return NextResponse.json<ApiResponse<T>>({ status, message, data }, { status });
}

export function sendError({ message, status = 400, error }: ErrorArgs) {
  return NextResponse.json<ApiResponse>({ status, message, error }, { status });
}

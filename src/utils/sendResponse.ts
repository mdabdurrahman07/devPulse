import type { Response } from "express";

export function sendResponse<T, X>(
  res: Response,
  {
    message,
    error,
    data,
    err,
  }: { message: unknown; error?: boolean; data?: T; err?: X },
  status = error ? 500 : 200,
) {
  res.status(status).json({
    success: error ? false : true,
    message: message,
    data: error ? undefined : data,
    errors: error ? err : undefined
  });
}

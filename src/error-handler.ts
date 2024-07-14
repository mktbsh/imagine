import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import type { AppContext } from "./context";

interface FailureResponse {
  error: ErrorDetail;
}

interface ErrorDetail {
  code: string;
  message: string;
}

export const handleError: ErrorHandler<AppContext> = (err, c): Response => {
  switch (true) {
    case err instanceof HTTPException: {
      if (err.status >= 500) {
        // TODO: report error
      }

      return c.json(
        createFailureResponse({
          code: err.name,
          message: err.message,
        }),
        err.status
      );
    }
    default:
      return c.json(createFailureResponse({ message: err.message }), 500);
  }
};

function createFailureResponse({
  code = "INTERNAL_SERVER_ERROR",
  message = "something unexpected happened",
}: Partial<ErrorDetail>): FailureResponse {
  return {
    error: {
      code,
      message,
    },
  };
}

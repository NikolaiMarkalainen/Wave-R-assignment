export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export const BadRequest = (message = 'Bad request') => new ApiError(400, message);
export const NotFound = (message = 'Resource not found') => new ApiError(404, message);
export const InternalServerError = (message = 'Internal server error') =>
  new ApiError(500, message);

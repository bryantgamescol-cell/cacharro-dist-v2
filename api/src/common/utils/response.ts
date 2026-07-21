export function successResponse(

  message: string,

  data: any,

  pagination?: any

) {

  return {

    success: true,

    message,

    data,

    pagination

  };

}

export function errorResponse(message: string) {

  return {

    success: false,

    message

  };

}
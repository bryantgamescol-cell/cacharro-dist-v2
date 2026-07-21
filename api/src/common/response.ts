export class ApiResponse {

  static success(data: any, message = "Operación exitosa") {
    return {
      success: true,
      message,
      data
    };
  }

  static error(message = "Ha ocurrido un error") {
    return {
      success: false,
      message
    };
  }

}
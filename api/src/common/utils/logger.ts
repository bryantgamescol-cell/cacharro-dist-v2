export function logger(

  method: string,

  url: string,

  status: number,

  time: number

) {

  console.log(

    `[${new Date().toLocaleTimeString()}] ${method} ${url} ${status} ${time}ms`

  );

}
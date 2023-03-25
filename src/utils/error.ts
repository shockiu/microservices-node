export const err = (message: string, code: number) => {
    let e: any = new Error(message);
    if ( code ) e.statusCode = code; 
    return e;
}
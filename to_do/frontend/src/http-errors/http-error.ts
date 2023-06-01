class HttpErrors extends Error{
    constructor(message?: string){
        super(message)
        this.name = this.constructor.name
    }
}
/**
 * Status code : 401*/ 
export class UnauthorizedError extends HttpErrors{}

/**
 * Status code : 409*/ 
export class ConflicError extends HttpErrors{}
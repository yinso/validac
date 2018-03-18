export type ValidationError = {
    readonly error: string;
    readonly path : string;
    readonly expected: any;
    readonly actual: any;
}

export function isValidationError(arg : any) : arg is ValidationError {
    return !!arg && arg.error && arg.path;
}

export function isValidationErrorArray(arg : any) : arg is ValidationError[] {
    return arg instanceof Array && arg.every(isValidationError);
}

export type IValidationResult<T> = Promise<T>;

export function isValidationResult<T>(item : any) : item is IValidationResult<T> {
    return !!item && item.onSuccess; 
}

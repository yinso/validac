import { suite, test, slow, timeout } from 'mocha-typescript';
import { ValidationResult } from '../base';

export function expectError<T>(inner : ValidationResult<T>) {
    inner.cata(
        (_) => {
            throw new Error(`UnexpectedSuccess`)
        },
        (_) => { }
    )
}

export function expectErrorAsync<T>(inner : Promise<T>) {
    return new Promise<T>((resolve, reject) => {
        inner.then((res) => reject(new Error(`UnexpectedSuccess`)))
            .catch((e) => resolve());
    })
}

export { suite , test, slow, timeout } from 'mocha-typescript';

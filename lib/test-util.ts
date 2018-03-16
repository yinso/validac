import { suite, test, slow, timeout } from 'mocha-typescript';

export function expectError<T>(inner : Promise<T>) {
    return new Promise<T>((resolve, reject) => {
        inner.then((res) => reject(new Error(`UnexpectedSuccess`)))
            .catch((e) => resolve());
    })
}

export { suite , test, slow, timeout } from 'mocha-typescript';

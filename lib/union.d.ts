import { Validator } from './base';

export function oneOf<T, T1>(v1 : Validator<T, T1>) : Validator<T, T1>;
export function oneOf<T, T1, T2>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
) : Validator<T, T1 | T2>;
export function oneOf<T, T1, T2, T3>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
) : Validator<T, T1 | T2 | T3>;
export function oneOf<T, T1, T2, T3, T4>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
    , v4: Validator<T, T4>
) : Validator<T, T1 | T2 | T3 | T4>;
export function oneOf<T, T1, T2, T3, T4, T5>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
    , v4: Validator<T, T4>
    , v5: Validator<T, T5>
) : Validator<T, T1 | T2 | T3 | T4 | T5>;
export function oneOf<T, T1, T2, T3, T4, T5, T6>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
    , v4: Validator<T, T4>
    , v5: Validator<T, T5>
    , v6: Validator<T, T6>
) : Validator<T, T1 | T2 | T3 | T4 | T5  | T6>;
export function oneOf<T, T1, T2, T3, T4, T5, T6, T7>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
    , v4: Validator<T, T4>
    , v5: Validator<T, T5>
    , v6: Validator<T, T6>
    , v7: Validator<T, T7>
) : Validator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function oneOf<T, T1, T2, T3, T4, T5, T6, T7, T8>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
    , v4: Validator<T, T4>
    , v5: Validator<T, T5>
    , v6: Validator<T, T6>
    , v7: Validator<T, T7>
    , v8: Validator<T, T8>
) : Validator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function oneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
    , v4: Validator<T, T4>
    , v5: Validator<T, T5>
    , v6: Validator<T, T6>
    , v7: Validator<T, T7>
    , v8: Validator<T, T8>
    , v9: Validator<T, T9>
) : Validator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function oneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
(v1 : Validator<T, T1>
    , v2: Validator<T, T2>
    , v3: Validator<T, T3>
    , v4: Validator<T, T4>
    , v5: Validator<T, T5>
    , v6: Validator<T, T6>
    , v7: Validator<T, T7>
    , v8: Validator<T, T8>
    , v9: Validator<T, T9>
    , v10: Validator<T, T10>
) : Validator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

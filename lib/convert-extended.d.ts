import { ConvertValidator } from './convert';

export function convertOneOf<T, T1>(v1 : ConvertValidator<T, T1>) : ConvertValidator<T, T1>;
export function convertOneOf<T, T1, T2>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    )
: ConvertValidator<T, T1 | T2>;
export function convertOneOf<T, T1, T2, T3>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    )
: ConvertValidator<T, T1 | T2 | T3>;
export function convertOneOf<T, T1, T2, T3, T4>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4>;
export function convertOneOf<T, T1, T2, T3, T4, T5>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    , v8: ConvertValidator<T, T8>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    , v8: ConvertValidator<T, T8>
    , v9: ConvertValidator<T, T9>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    , v8: ConvertValidator<T, T8>
    , v9: ConvertValidator<T, T9>
    , v10: ConvertValidator<T, T10>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function convertAllOf<T, T1>
    (v1 : ConvertValidator<T, T1>)
: ConvertValidator<T, T1>;
export function convertAllOf<T, T1, T2>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    )
: ConvertValidator<T, T1 & T2>;
export function convertAllOf<T, T1, T2, T3>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    )
: ConvertValidator<T, T1 & T2 & T3>;
export function convertAllOf<T, T1, T2, T3, T4>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4>;
export function convertAllOf<T, T1, T2, T3, T4, T5>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    , v8 : ConvertValidator<T, T8>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    , v8 : ConvertValidator<T, T8>
    , v9 : ConvertValidator<T, T9>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    , v8 : ConvertValidator<T, T8>
    , v9 : ConvertValidator<T, T9>
    , v10 : ConvertValidator<T, T10>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;

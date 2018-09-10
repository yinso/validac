import { ConvertValidator } from './convert';

export function convertOneOf<T1>(v1 : ConvertValidator<T1>) : ConvertValidator<T1>;
export function convertOneOf<T1, T2>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    )
: ConvertValidator<T1 | T2>;
export function convertOneOf<T1, T2, T3>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    )
: ConvertValidator<T1 | T2 | T3>;
export function convertOneOf<T1, T2, T3, T4>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    , v4: ConvertValidator<T4>
    )
: ConvertValidator<T1 | T2 | T3 | T4>;
export function convertOneOf<T1, T2, T3, T4, T5>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    , v4: ConvertValidator<T4>
    , v5: ConvertValidator<T5>
    )
: ConvertValidator<T1 | T2 | T3 | T4 | T5>;
export function convertOneOf<T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    , v4: ConvertValidator<T4>
    , v5: ConvertValidator<T5>
    , v6: ConvertValidator<T6>
    )
: ConvertValidator<T1 | T2 | T3 | T4 | T5  | T6>;
export function convertOneOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    , v4: ConvertValidator<T4>
    , v5: ConvertValidator<T5>
    , v6: ConvertValidator<T6>
    , v7: ConvertValidator<T7>
    )
: ConvertValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function convertOneOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    , v4: ConvertValidator<T4>
    , v5: ConvertValidator<T5>
    , v6: ConvertValidator<T6>
    , v7: ConvertValidator<T7>
    , v8: ConvertValidator<T8>
    )
: ConvertValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function convertOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    , v4: ConvertValidator<T4>
    , v5: ConvertValidator<T5>
    , v6: ConvertValidator<T6>
    , v7: ConvertValidator<T7>
    , v8: ConvertValidator<T8>
    , v9: ConvertValidator<T9>
    )
: ConvertValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function convertOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidator<T1>
    , v2: ConvertValidator<T2>
    , v3: ConvertValidator<T3>
    , v4: ConvertValidator<T4>
    , v5: ConvertValidator<T5>
    , v6: ConvertValidator<T6>
    , v7: ConvertValidator<T7>
    , v8: ConvertValidator<T8>
    , v9: ConvertValidator<T9>
    , v10: ConvertValidator<T10>
    )
: ConvertValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function convertAllOf<T1>
    (v1 : ConvertValidator<T1>)
: ConvertValidator<T1>;
export function convertAllOf<T1, T2>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    )
: ConvertValidator<T1 & T2>;
export function convertAllOf<T1, T2, T3>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    )
: ConvertValidator<T1 & T2 & T3>;
export function convertAllOf<T1, T2, T3, T4>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    , v4 : ConvertValidator<T4>
    )
: ConvertValidator<T1 & T2 & T3 & T4>;
export function convertAllOf<T1, T2, T3, T4, T5>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    , v4 : ConvertValidator<T4>
    , v5 : ConvertValidator<T5>
    )
: ConvertValidator<T1 & T2 & T3 & T4 & T5>;
export function convertAllOf<T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    , v4 : ConvertValidator<T4>
    , v5 : ConvertValidator<T5>
    , v6 : ConvertValidator<T6>
    )
: ConvertValidator<T1 & T2 & T3 & T4 & T5 & T6>;
export function convertAllOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    , v4 : ConvertValidator<T4>
    , v5 : ConvertValidator<T5>
    , v6 : ConvertValidator<T6>
    , v7 : ConvertValidator<T7>
    )
: ConvertValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function convertAllOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    , v4 : ConvertValidator<T4>
    , v5 : ConvertValidator<T5>
    , v6 : ConvertValidator<T6>
    , v7 : ConvertValidator<T7>
    , v8 : ConvertValidator<T8>
    )
: ConvertValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function convertAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    , v4 : ConvertValidator<T4>
    , v5 : ConvertValidator<T5>
    , v6 : ConvertValidator<T6>
    , v7 : ConvertValidator<T7>
    , v8 : ConvertValidator<T8>
    , v9 : ConvertValidator<T9>
    )
: ConvertValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function convertAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidator<T1>
    , v2 : ConvertValidator<T2>
    , v3 : ConvertValidator<T3>
    , v4 : ConvertValidator<T4>
    , v5 : ConvertValidator<T5>
    , v6 : ConvertValidator<T6>
    , v7 : ConvertValidator<T7>
    , v8 : ConvertValidator<T8>
    , v9 : ConvertValidator<T9>
    , v10 : ConvertValidator<T10>
    )
: ConvertValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;

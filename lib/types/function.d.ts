import { BaseIsaValidator } from '../isa';
import { IsaValidator } from '../base';

export interface FunctionIsaValidator0<TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function) : TR;
}
export interface FunctionIsaValidator1<T1, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1) : TR;
}
export interface FunctionIsaValidator2<T1, T2, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2) : TR;
}
export interface FunctionIsaValidator3<T1, T2, T3, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3) : TR;
}
export interface FunctionIsaValidator4<T1, T2, T3, T4, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4) : TR;
}
export interface FunctionIsaValidator5<T1, T2, T3, T4, T5, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5) : TR;
}
export interface FunctionIsaValidator6
    <T1, T2, T3, T4, T5, T6, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5
        , p6: T6
        ) : TR;
}
export interface FunctionIsaValidator7
    <T1, T2, T3, T4, T5, T6, T7, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5
        , p6: T6, p7: T7
        ) : TR;
}
export interface FunctionIsaValidator8
    <T1, T2, T3, T4, T5, T6, T7, T8, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5
        , p6: T6, p7: T7, p8: T8
        ) : TR;
}
export interface FunctionIsaValidator9
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5
        , p6: T6, p7: T7, p8: T8, p9: T9
        ) : TR;
}
export interface FunctionIsaValidator10
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5
        , p6: T6, p7: T7, p8: T8, p9: T9, p10: T10
        ) : TR;
}
export interface FunctionIsaValidator11
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5
        , p6: T6, p7: T7, p8: T8, p9: T9, p10: T10, p11: T11
        ) : TR;
}
export interface FunctionIsaValidator12
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5
        , p6: T6, p7: T7, p8: T8, p9: T9, p10: T10, p11: T11, p12: T12
        ) : TR;
}

export function isFunction
    <TR>
    (r : IsaValidator<TR>)
: FunctionIsaValidator0<TR>;
export function isFunction
    <T1, TR>
    (p1 : IsaValidator<T1>, r : IsaValidator<TR>)
: FunctionIsaValidator1<T1, TR>;
export function isFunction
    <T1, T2, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, r : IsaValidator<TR>)
: FunctionIsaValidator2<T1, T2, TR>;
export function isFunction
    <T1, T2, T3, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, r : IsaValidator<TR>)
: FunctionIsaValidator3<T1, T2, T3, TR>;
export function isFunction
    <T1, T2, T3, T4, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, r : IsaValidator<TR>)
: FunctionIsaValidator4<T1, T2, T3, T4, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, p5 : IsaValidator<T5>, r : IsaValidator<TR>)
: FunctionIsaValidator5<T1, T2, T3, T4, T5, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, T6, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>, r : IsaValidator<TR>)
: FunctionIsaValidator6<T1, T2, T3, T4, T5, T6, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, T6, T7, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>
    , r : IsaValidator<TR>)
: FunctionIsaValidator7<T1, T2, T3, T4, T5, T6, T7, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>
    , r : IsaValidator<TR>)
: FunctionIsaValidator8<T1, T2, T3, T4, T5, T6, T7, T8, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , r : IsaValidator<TR>)
: FunctionIsaValidator9<T1, T2, T3, T4, T5, T6, T7, T8, T9, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , p10: IsaValidator<T10>
    , r : IsaValidator<TR>)
: FunctionIsaValidator10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , p10: IsaValidator<T10>, p11: IsaValidator<T11>
    , r : IsaValidator<TR>)
: FunctionIsaValidator11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TR>;
export function isFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , p10: IsaValidator<T10>, p11: IsaValidator<T11>, p12: IsaValidator<T12>
    , r : IsaValidator<TR>)
: FunctionIsaValidator12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TR>;

export interface AsyncFunctionIsaValidator0<TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator1<T1, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator2<T1, T2, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator3<T1, T2, T3, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator4<T1, T2, T3, T4, TR> extends IsaValidator<Function> {
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator5
    <T1, T2, T3, T4, T5, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5
    ) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator6
    <T1, T2, T3, T4, T5, T6, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5, p6: T6
    ) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator7
    <T1, T2, T3, T4, T5, T6, T7, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5, p6: T6, p7: T7
    ) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator8
    <T1, T2, T3, T4, T5, T6, T7, T8, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5, p6: T6, p7: T7, p8: T8
    ) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator9
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5, p6: T6, p7: T7, p8: T8, p9: T9
    ) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator10
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5, p6: T6, p7: T7, p8: T8, p9: T9, p10: T10
    ) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator11
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5, p6: T6, p7: T7, p8: T8, p9: T9, p10: T10
        , p11: T11
    ) : Promise<TR>;
}
export interface AsyncFunctionIsaValidator12
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TR>
    extends IsaValidator<Function>
{
    attach(proc : Function) : Function;
    run(proc : Function, p1: T1, p2: T2, p3 : T3, p4: T4
        , p5: T5, p6: T6, p7: T7, p8: T8, p9: T9, p10: T10
        , p11: T11, p12: T12
    ) : Promise<TR>;
}

export function isAsyncFunction
    <TR>
    (r : IsaValidator<TR>)
: AsyncFunctionIsaValidator0<TR>;
export function isAsyncFunction
    <T1, TR>
    (p1 : IsaValidator<T1>, r : IsaValidator<TR>)
: AsyncFunctionIsaValidator1<T1, TR>;
export function isAsyncFunction
    <T1, T2, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, r : IsaValidator<TR>)
: AsyncFunctionIsaValidator2<T1, T2, TR>;
export function isAsyncFunction
    <T1, T2, T3, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, r : IsaValidator<TR>)
: AsyncFunctionIsaValidator3<T1, T2, T3, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, r : IsaValidator<TR>)
: AsyncFunctionIsaValidator4<T1, T2, T3, T4, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, p5 : IsaValidator<T5>, r : IsaValidator<TR>)
: AsyncFunctionIsaValidator5<T1, T2, T3, T4, T5, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, T6, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>, p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>, r : IsaValidator<TR>)
: AsyncFunctionIsaValidator6<T1, T2, T3, T4, T5, T6, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, T6, T7, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>
    , r : IsaValidator<TR>)
: AsyncFunctionIsaValidator7<T1, T2, T3, T4, T5, T6, T7, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>
    , r : IsaValidator<TR>)
: AsyncFunctionIsaValidator8<T1, T2, T3, T4, T5, T6, T7, T8, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , r : IsaValidator<TR>)
: AsyncFunctionIsaValidator9<T1, T2, T3, T4, T5, T6, T7, T8, T9, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , p10: IsaValidator<T10>
    , r : IsaValidator<TR>)
: AsyncFunctionIsaValidator10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , p10: IsaValidator<T10>, p11: IsaValidator<T11>
    , r : IsaValidator<TR>)
: AsyncFunctionIsaValidator11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TR>;
export function isAsyncFunction
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TR>
    (p1 : IsaValidator<T1>, p2 : IsaValidator<T2>, p3 : IsaValidator<T3>
    , p4: IsaValidator<T4>, p5 : IsaValidator<T5>, p6 : IsaValidator<T6>
    , p7: IsaValidator<T7>, p8 : IsaValidator<T8>, p9 : IsaValidator<T9>
    , p10: IsaValidator<T10>, p11: IsaValidator<T11>, p12: IsaValidator<T12>
    , r : IsaValidator<TR>)
: AsyncFunctionIsaValidator12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TR>;

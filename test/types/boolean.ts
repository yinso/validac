import * as B from '../../lib/types/boolean';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class BooleanTest {
    @test isBoolean () {
        [true, false].forEach((v) => B.isBoolean.assert(v))
    }

    @test isNotBoolean () {
        ['true', 'false', 1, 2].forEach((v) => expectError(B.isBoolean.validate(v)))
    }

    @test convertBoolean () {
        [true, false, 'true', 'false', 'TRUE', 'FALSE']
        .forEach((v) => B.isBoolean.toConvert().assert(v))
    }

    @test convertNotBoolean () {
        [1, new Date(), 'not a boolean']
        .forEach((v) => expectError(B.isBoolean.toConvert().validate(v)))
    }

    @test isTrue() {
        B.isTrue.assert(true)
    }

    @test isNotTrue() {
        ['true', 'false', 1, 2].forEach((v) => expectError(B.isTrue.validate(v)))
    }

    @test convertTrue() {
        [true, 'true', 'TRUE']
        .forEach((v) => B.isTrue.toConvert().assert(v))
    }

    @test convertNotTrue() {
        [1, new Date(), 'not a boolean']
        .forEach((v) => expectError(B.isTrue.toConvert().validate(v)))
    }

    @test isFalse() {
        B.isFalse.assert(false)
    }

    @test isNotFalse() {
        ['true', 'false', 1, 2].forEach((v) => expectError(B.isFalse.validate(v)))
    }

    @test convertFalse() {
        [false, 'false', 'FALSE']
        .forEach((v) => B.isFalse.toConvert().assert(v))
    }

    @test convertNotFalse() {
        [1, new Date(), 'not a boolean']
        .forEach((v) => expectError(B.isBoolean.toConvert().validate(v)))
    }

}

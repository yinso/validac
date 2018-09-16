"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var V = require("../../lib");
var test_util_1 = require("../../lib/util/test-util");
var ObjectFamilyTest = /** @class */ (function () {
    function ObjectFamilyTest() {
    }
    ObjectFamilyTest.prototype.canStartObjectFamily = function () {
        var isElement = V.isTaggedObjectFactory('tag', {});
        var isImage = isElement.register('Image', {
            title: V.isString,
            url: V.isString
        });
        test_util_1.expectError(isElement.validate({ tag: 'Test' })); // UnknownTag
        test_util_1.expectError(isElement.validate({ tag: 1234 }));
        isImage.assert({ tag: 'Image', title: 'test title', url: 'test link' });
        isElement.toConvert().assert({
            tag: 'Image',
            title: 123456,
            url: 'test link'
        });
        // how do we represent the above?
        var isLineElement = isElement.extends({});
        // we want these things to work correctly!!!
        // each isLineElement & isLineElementWithChildren should have its own sets of
        // registry - but the top level should know all of them and can have the check to be successful.
        var isLineElementWithChildren = isLineElement.extends({
            children: V.isArray(isElement)
        });
        var isLineBreak = isLineElement.register('LineBreak', {});
        var isBold = isLineElementWithChildren.register('Bold', {});
        //console.log('************ isLineElementWithChildren', util.inspect(isLineElementWithChildren, { depth: null, colors: true}))
        isLineBreak.assert({ tag: 'LineBreak' });
        isBold.assert({ tag: 'Bold', children: [{ tag: 'Image', title: 'test', url: 'test' }] });
        isBold.assert({ tag: 'Bold', children: [{ tag: 'LineBreak' }] });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectFamilyTest.prototype, "canStartObjectFamily", null);
    ObjectFamilyTest = __decorate([
        test_util_1.suite
    ], ObjectFamilyTest);
    return ObjectFamilyTest;
}());
//# sourceMappingURL=tagged-object-factory.js.map
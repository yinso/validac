import * as assert from 'assert';
import * as V from '../../lib';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as util from 'util';

interface Element {
    tag: string;
}

interface Image extends Element {
    tag: 'Image';
    title: string;
    url: string;
}

interface LineElement extends Element { }

interface LineElementWithChildren extends LineElement {
    children: Element[];
}

interface LineBreak extends LineElement {
    tag: 'LineBreak';
}

interface Bold extends LineElementWithChildren {
    tag: 'Bold';
}

type ImageDiff = Pick<Image, Exclude<keyof Image, keyof Element>>;

type ImageExtract = Pick<Image, Extract<keyof Image, keyof Element>>;

type ImageUnion = ImageDiff & ImageExtract;

@suite class ObjectFamilyTest {
    @test canStartObjectFamily() {
        let isElement = V.isTaggedObjectFactory<'tag', Element>('tag', {
        });
        let isImage = isElement.register<'Image', Image>('Image', {
            title: V.isString,
            url: V.isString
        })
        expectError(isElement.validate({ tag: 'Test' })) // UnknownTag
        expectError(isElement.validate({ tag: 1234 }))
        isImage.assert({ tag: 'Image', title: 'test title', url : 'test link'})
        isElement.convert({
            tag: 'Image',
            title: 123456,
            url: 'test link'
        })

        // how do we represent the above?
        let isLineElement = isElement.extends<LineElement>({});

        // we want these things to work correctly!!!
        // each isLineElement & isLineElementWithChildren should have its own sets of
        // registry - but the top level should know all of them and can have the check to be successful.
        let isLineElementWithChildren = isLineElement.extends<LineElementWithChildren>({
            children: V.isArray<Element>(isElement)
        });

        let isLineBreak = isLineElement.register<'LineBreak', LineBreak>('LineBreak', {});
        let isBold = isLineElementWithChildren.register<'Bold', Bold>('Bold', {});
        //console.log('************ isLineElementWithChildren', util.inspect(isLineElementWithChildren, { depth: null, colors: true}))

        isLineBreak.assert({ tag: 'LineBreak'})
        isBold.assert({ tag: 'Bold' , children: [ { tag: 'Image' , title: 'test', url: 'test' } ] })
        isBold.assert({ tag: 'Bold' , children: [ { tag: 'LineBreak' } ] })
    }
}
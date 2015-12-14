'use strict';

beforeEach(module('msieurtoph.ngKeydown'));

var KeydownService;
function initKeydown(){
    inject(['Keydown', function(Keydown){
        KeydownService = Keydown;
    }]);
}

function trigKeyEvent(type, keyCode) {
    var eventObj = document.createEventObject ? document.createEventObject() : document.createEvent('Events');

    if(eventObj.initEvent){
      eventObj.initEvent(type, true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;

    if (document.dispatchEvent) {
        document.dispatchEvent(eventObj);
    } else {
        document.fireEvent('on'+type, eventObj);
    }

}

describe('Keydown service', function(){

    it('should detect one key pressed', function(){
        initKeydown();

        trigKeyEvent('keydown', 16);
        expect(KeydownService.shift).toBe(true);
        expect(KeydownService.pressed).toEqual([16]);

        trigKeyEvent('keyup', 16);
        expect(KeydownService.shift).toBe(false);
        expect(KeydownService.pressed).toEqual([]);
    });

    it('should detect two keys pressed', function(){
        initKeydown();

        trigKeyEvent('keydown', 16);
        trigKeyEvent('keydown', 17);
        expect(KeydownService.shift).toBe(true);
        expect(KeydownService.ctrl).toBe(true);
        expect(KeydownService.pressed).toEqual([16,17]);

        trigKeyEvent('keyup', 16);
        expect(KeydownService.shift).toBe(false);
        expect(KeydownService.ctrl).toBe(true);
        expect(KeydownService.pressed).toEqual([17]);

        trigKeyEvent('keyup', 17);
        expect(KeydownService.shift).toBe(false);
        expect(KeydownService.ctrl).toBe(false);
        expect(KeydownService.pressed).toEqual([]);
    });

    it('should detect main keys', function(){
        initKeydown();

        trigKeyEvent('keydown', 18);
        expect(KeydownService.alt).toBe(true);

        trigKeyEvent('keydown', 38);
        expect(KeydownService.up).toBe(true);

        trigKeyEvent('keydown', 40);
        expect(KeydownService.down).toBe(true);

        trigKeyEvent('keydown', 37);
        expect(KeydownService.left).toBe(true);

        trigKeyEvent('keydown', 39);
        expect(KeydownService.right).toBe(true);

        trigKeyEvent('keydown', 33);
        expect(KeydownService.pgUp).toBe(true);

        trigKeyEvent('keydown', 34);
        expect(KeydownService.pgDown).toBe(true);

        trigKeyEvent('keydown', 32);
        expect(KeydownService.space).toBe(true);

        trigKeyEvent('keydown', 13);
        expect(KeydownService.enter).toBe(true);

        trigKeyEvent('keydown', 27);
        expect(KeydownService.escape).toBe(true);

        trigKeyEvent('keydown', 9);
        expect(KeydownService.tab).toBe(true);
    });

    it('should detect other keys', function(){
        initKeydown();

        trigKeyEvent('keydown', 66);
        trigKeyEvent('keydown', 67);
        expect(KeydownService.others[66]).toBe(true);
        expect(KeydownService.others[67]).toBe(true);
        expect(KeydownService.pressed).toEqual([66,67]);
    });

    it('should prevent double keydown', function(){
        initKeydown();

        trigKeyEvent('keydown', 16);
        expect(KeydownService.shift).toBe(true);
        expect(KeydownService.pressed).toEqual([16]);

        trigKeyEvent('keydown', 16);
        expect(KeydownService.shift).toBe(true);
        expect(KeydownService.pressed).toEqual([16]);
    });

    it('should prevent invalid keyup', function(){
        initKeydown();

        trigKeyEvent('keyup', 16);
        expect(KeydownService.shift).toBe(false);
        expect(KeydownService.pressed).toEqual([]);
    });

});


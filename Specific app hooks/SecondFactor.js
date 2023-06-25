function byteArray2String(bytearray){
    var buffer = Java.array('byte', bytearray);
    var result = '';
    for(var i = 0; i < buffer.length; ++i){
        result += (String.fromCharCode(buffer[i] & 0xff));
    }
    return result;
}

function string2ByteArray(str){
    var result = [];
    for(var i = 0; i < str.length; ++i){
        result.push(str.charCodeAt(i) & 0xff);
    }
    return result;
}


function bin2hex(array, length) {
    var result = '';

    length = length || array.length;

    for (var i = 0; i < length; ++i) {
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    }
    return result;
}

function hex2String(hex) {
    var result = '';
    for (var i = 0; i < hex.length; i += 2) {
        result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return result;
}


function stackTrace() {
    var ThreadDef = Java.use('java.lang.Thread');
    var ThreadObj = ThreadDef.$new();

    console.log(`[+] Printing stack trace...`);
    console.log('---------------------------------------------------------');
    var stack = ThreadObj.currentThread().getStackTrace();
    for (var i = 0; i < stack.length; i++) {
        console.log(`${i}\t| ${stack[i].toString()}`);
    }
    console.log('---------------------------------------------------------');
}


function debug(){

    let b = Java.use('o3.b');

    b.b.implementation = function (str) {
        console.log(`[+] b.b is called (String to Byte array)`);
        console.log(`\t[-] Str: ${str}`);
        let result = this.b(str);
        console.log(`\t[-] Result: ${byteArray2String(result)}`);
        console.log('');
        return result;
    };

    b.a.implementation = function (bArr) {
        console.log(`[+] b.a is called (Byte array to String)`);
        console.log(`\t[-] bArr: ${byteArray2String(bArr)}`);
        let result = this['a'](bArr);
        console.log(`\t[-] Result: ${result}`);
        console.log('');
        return result;
    };

    let a = Java.use('v0.a');
    a.getString.implementation = function (str, str2) {
        console.log(`[+] a.getString is called`);
        console.log(`\t[-] Str: ${str}`);
        console.log(`\t[-] Str2: ${str2}`);
        let result = this.getString(str, str2);
        console.log(`\t[-] Result: ${result}`);
        console.log('');
        return result;
    };

    let i = Java.use('r3.i');
    i.c.implementation = function (str, bArr) {
        console.log(`[+] Message received (r3.i.b is called)`);
        let result = this.c(str, bArr);
        console.log(`\t[-] Message: ${result}`);
        console.log('');
        return result;
    };

    i.a.implementation = function (bArr) {
        console.log(`[+] Message sent (r3.i.a is called)`);
        let result = this.a(bArr);
        console.log(`\t[-] Message: ${result}`);
        console.log('');
        return result;
    };

    // let KeyStore = Java.use('javax.crypto.KeyStore');
    // KeyStore.getKey.implementation = function(alias, password) {
    //     console.log('[+] KeyStore.getKey() called');
    //     var result = this.getKey(alias, password);
    //     console.log(`\t[-] Key: ${result.getEncoded()}`);
    //     console.log('');
    //     return result;
    // };
    
    var mac = Java.use("javax.crypto.Mac");
    mac.doFinal.overload('[B').implementation = function (b) {
        console.log('[+] Mac.doFinal called');
        console.log(`\t[-] Message: ${byteArray2String(b)}`);
        let result = this.doFinal(b);
        console.log(`\t[-] MAC: ${result}`);
        console.log('');
        return result;
    };
    
}

function interceptCommunications(){

    console.log('[+] Intercepting communications in SecondFactor...\n');

    var cipher = Java.use('javax.crypto.Cipher');

    cipher.doFinal.overload('[B').implementation = function (b) {

        let result = cipher.doFinal.overload('[B').call(this, b);          
        
        let ThreadObj = Java.use('java.lang.Thread').$new();
        var stack = ThreadObj.currentThread().getStackTrace();

        for (var i = 0; i < stack.length; i++) {

            let msg = byteArray2String(b);
            let msg2 = byteArray2String(result);

            if(stack[i].toString().includes('ChallengesFragment.N') && msg[0] == '{' && 
                msg[msg.length - 1] == '}'){
                    
                console.log(`\t[-] Outgoing message: ${byteArray2String(b)}\n`);
                break;

            } else if (stack[i].toString().includes('ChallengesFragment.M') && msg2[0] == '{' 
                && msg2[msg2.length - 1] == '}'){

                console.log(`\t[-] Received message: ${byteArray2String(result)}\n`);
                break;
            }
        }
        return this.doFinal(b);
    };

}

function modifyCommand(){
    console.log('[+] Tampering communications in SecondFactor...\n');
    var cipher = Java.use('javax.crypto.Cipher');

    cipher.doFinal.overload('[B').implementation = function (b) {
        
        let result = cipher.doFinal.overload('[B').call(this, b);      
        let ThreadObj = Java.use('java.lang.Thread').$new();
        var stack = ThreadObj.currentThread().getStackTrace();

        for (var i = 0; i < stack.length; i++) {
            let msg = byteArray2String(b);
            let msg2 = byteArray2String(result);

            if(stack[i].toString().includes('ChallengesFragment.N') && msg[0] == '{'
                && msg[msg.length - 1] == '}'){
                console.log(`\t[-] Outgoing message: ${byteArray2String(b)}\n`);
                let newMessage = `{"operation":"getFlag"}`;
                console.log(`\t[-] Tampering communications. New message: ${newMessage}\n`);       
                result = cipher.doFinal.overload('[B').call(this, string2ByteArray(newMessage));
                break;

            }else if (stack[i].toString().includes('ChallengesFragment.M') && msg2[0] == '{'
                && msg2[msg2.length - 1] == '}'){
                console.log(`\t[-] Received message: ${byteArray2String(result)}\n`);
                break;
            }
        }
        return result;
    };
}

function hookAllCommands(){
    let operationClass = Java.use("r3.j");

    // Hook al constructors for the classes that extend r3.j
    operationClass.$init.overloads.forEach(function (constructor) {

        constructor.implementation = function () {

            constructor.apply(this, arguments);

            console.log(`[+] OperationClass created`);
            console.log(`\t[-] Subclass created: ${this.getClass().getName()}`);
            console.log(`\t[-] Operation: ${this.operation.value}\n`);

            //stackTrace();

        };
    });
}

setTimeout(function() {
	Java.perform(function() {
        console.log('');
        //debug();
        //interceptCommunications();
        //hookAllCommands();
        modifyCommand();
	});
}, 0);

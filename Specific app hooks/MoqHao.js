function debug(){

    let c3sApplication = Java.use("gr6j3d4.c3sApplication");
    c3sApplication.c.implementation = function () {
        console.log(`[+] gr6j3d4.c3sApplication is called. Starting unpacker...\n`);
        this.c();
    };

    let a = Java.use("gr6j3d4.a");
    a.a.implementation = function (str) {
        console.log(`[+] gr6j3d4.a is called`);
        console.log(`\t[-] Retrieving ${str} from assets...\n`)
        let result = this.a(str);
        return result;
    };


    c3sApplication.b.implementation = function (objPayload, bArr, inputStream) {
        console.log(`[+] c3sApplication.b is called. Decompressing payload file...\n`);
        
        // console.log(`\t[-] Decompressed object payload: ${objPayload}`); // Payload written here
        // console.log(`\t[-] Compressed decrypted payload: ${bArr}`); // Compressed decrypted payload
        // console.log(`\t[-] InputStream: ${inputStream}`); // -> Uses InflaterInputStream to deinflate

        this.b(objPayload, bArr, inputStream);
    };

    c3sApplication.d.implementation = function () {
        console.log(`[+] c3sApplication.d is called. Creating d file...\n`);
        let result = this.d();
        return result;
    };

    c3sApplication.i.implementation = function (obj) {
        console.log(`[+] c3sApplication.i called. Loading and instanciating payload...\n`);
        this.i(obj);
    };
}

function natives(){
    let bv = Java.use("ons.bv");

    bv.hzd.implementation = function (str, str2) {
        console.log(`[+] Native function hzd called with arguments:`);
        console.log(`\t[-] str: ${str}`);
        console.log(`\t[-] str2: ${str2}\n`);
        let result = this.hzd(str, str2);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };

    bv.jcd.implementation = function (i) {
        console.log(`[+] Native function jcd called with argument:`);
        console.log(`\t[-] i: ${i}\n`);
        let result = this.jcd(i);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };

    bv.kq.implementation = function (str, obj, obj2, i, str2, z) {
        console.log(`[+] Native function kq called with arguments:`);
        console.log(`\t[-] str: ${str}`);
        console.log(`\t[-] obj: ${obj}`);
        console.log(`\t[-] obj2: ${obj2}`);
        console.log(`\t[-] i: ${i}`);
        console.log(`\t[-] str2: ${str2}`);
        console.log(`\t[-] z: ${z}\n`);
        let result = this.kq(str, obj, obj2, i, str2, z);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };

    bv.kz1.implementation = function (cls) {
        console.log(`[+] Native function kz1 called with argument:`);
        console.log(`\t[-] cls: ${cls}\n`);
        let result = this.kz1(cls);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };

    bv.nbs.implementation = function (obj, obj2) {
        console.log(`[+] Native function nbs called with arguments:`);
        console.log(`\t[-] obj: ${obj}`);
        console.log(`\t[-] obj2: ${obj2}\n`);
        let result = this.nbs(obj, obj2);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };

    bv.wk.implementation = function (obj, obj2) {
        console.log(`Native function wk called with arguments:`);
        console.log(`\t[-] obj: ${obj}`);
        console.log(`\t[-] obj2: ${obj2}\n`);
        let result = this.wk(obj, obj2);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };
}


function dumpPayload(){
    let bv = Java.use("ons.bv");
    let dumpFile = "/data/data/gni.wqep.hemef.hitpxu.zwm/MoqHaoDump.dex";

    bv.n1fb.implementation = function (str, bArr) {
        console.log(`[+] Native function n1fb called with arguments`);
        console.log(`\t[-] str: ${str}`);
        console.log(`\t[-] bArr: ${bArr}\n`);

        console.log(`[>] Tampering parameters to dump the payload file...`); // This will prevent the malware execution as well
        try{
            let result = this.n1fb(dumpFile, bArr);
            console.log(`\t[>] File has been written to ${dumpFile}\n`);

        } catch (e){
            console.log(`\t[-] Error\n`);
        }
        
        return result;
    };

}


function hookNatives(){
    const SystemClass = Java.use('java.lang.System');
    const RuntimeClass = Java.use('java.lang.Runtime');
    const VMStackClass = Java.use('dalvik.system.VMStack');

    SystemClass.loadLibrary.overload('java.lang.String').implementation = function(library) {
        console.log(`[+] Loading library ${library}`);
        try {
            const loadedLibrary = RuntimeClass.getRuntime().loadLibrary0(VMStackClass.getCallingClassLoader(), library);

            if (library.includes('jc')){

                console.log(`[>] Succesfully hooked malicious library: ${library}`);

                console.log(`[+] Hooking some functions...`);
            
                // HOOKS
                // natives();
                dumpPayload();

            }

            return loadedLibrary;

        } catch(e) {
            console.log(e);
        }
    };
}


Java.perform(function() {
    console.log('');
    debug();
    hookNatives();
    
});
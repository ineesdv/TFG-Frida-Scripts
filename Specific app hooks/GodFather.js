function enumerateClasses(){
    console.log("\n---------------------- ENUMERATING CLASSES ----------------------");
    var allClasses = Java.enumerateLoadedClassesSync();

    allClasses.forEach(function (className) {
        if (className.includes('expressvpn')){
            console.log(className);
        }
       
    });
    console.log("---------------------------- FINISHED ---------------------------\n");
}

function bin2ascii(array) {
    var result = [];

    for (var i = 0; i < array.length; ++i) {
        result.push(String.fromCharCode( 
            parseInt(
                ('0' + (array[i] & 0xFF).toString(16)).slice(-2),
                16
            )
        ));
    }
    return result.join('');
}

function bin2hex(array, length) {
    var result = "";

    length = length || array.length;

    for (var i = 0; i < length; ++i) {
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    }
    return result;
}

function mainActivity() {
    let kittenspreachers = Java.use("com.expressvpn.vpn.kittenspreachers");

    kittenspreachers.$init.implementation = function () {
        console.log(`[+] kittenspreachers Constructor is called`);
        this.$init();
        let kecc1 = this.kecc1.value;
        let k87db = this.k87db.value;
        console.log(`\t[-] Attribute kecc1 - Value: ${kecc1}`);
        console.log(`\t[-] Attribute k87db - Value: ${k87db}`);
        console.log('');
    };

}

function tamperEmulation(){
    console.log("[+] Tampering BUILD values to bypass"
        +"emulator detection...")
    var BuildClass = Java.use("android.os.Build");

    // ro.build.product
    BuildClass.PRODUCT.value = "begonia";
    // ro.product.manufacturer
    BuildClass.MANUFACTURER.value = "Xiaomi";
    // ro.product.brand
    BuildClass.BRAND.value = "Redmi";
    // ro.product.device
    BuildClass.DEVICE.value = "begonia";
    // ro.product.model
    BuildClass.MODEL.value = "Redmi Note 8 Pro";
    // ro.hardware
    BuildClass.HARDWARE.value = "mt6785";
    // ro.build.fingerprint
    BuildClass.FINGERPRINT.value = "Redmi/begonia_eea/begonia:10/"
        +"QP1A.190711.020/V12.0.5.0.QGGEUXM:user/release-keys";
    
    console.log("\t[-] Tampering succesful\n");
}

function evasionHook2(){
    let runebearingdealerdom = Java.use("com.expressvpn.vpn.runebearingdealerdom");
    runebearingdealerdom.ke7a8e8f.implementation = function () {
        console.log(`[+] runebearingdealerdom.ke7a8e8f is called`);
        //let result = this.ke7a8e8f();
        console.log(`\t[-] Tampering emulator detection...`);
        //console.log(`\t[-] Result: ${result}`);
        return false;
    };
}

// GodFather retrieves the C2 from a telegram group description, then decrypts it (Blowfish) and uses it to send the information
function decryptC2(){

    var runebearingdealerdom = Java.use('com.expressvpn.vpn.runebearingdealerdom');
    var Stringx = Java.use("com.decryptstringmanager.Stringx");

    var domain = Stringx.decryptString("fef4f72dc88e9c0bf998ffd3f2610da77f2065f4aef2b81b690de6b6c0474e7d");

    try{
        console.log(`\t[+] Found telegram group: ${domain}`); // "https://t.me/varezotukomirza"

        var domain_tele = runebearingdealerdom.k0081ecc(domain);

        // Matcher matcher = Pattern.compile("<meta property=\"og:description\" content=\"(.*?)\">", 0x20).matcher(domain_tele);
        // while(matcher.find()) {
        //     runebearingdealerdom.edit_sharedPreferences2(arg6, "main_wang", matcher.group(1));
        // }
        var pattern = /<meta property=\"og:description\" content=\"(.*?)\">/i;
        var matches = domain_tele.match(pattern);
        var C2_encrypted = matches[1];
        console.log(`\t[+] Retrieved encrypted C2 from the description: ${C2_encrypted}`);


        // Boufariktripylaean.decrypt_blowfish(runebearingdealerdom.get_value_from_SharedPreferences(ctx, "main_wang")
        var Boufariktripylaean = Java.use('com.expressvpn.vpn.Boufariktripylaean');
        var C2 = Boufariktripylaean.k7e226aa(C2_encrypted);

        console.log(`\t[>] C2 server URL: ${C2}`);

    } catch(e){

    }    
}

function decryptStrings() {
    var obtainedKeyInfo = false;
    var SecretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');

    SecretKeySpec.$init.overload('[B','java.lang.String').implementation = function(key, spec){
        if (!obtainedKeyInfo){
            console.log(`[+] SecretKeySpec constructor is called`);
            console.log(`[-] Spec: ${spec}`);
            console.log(`[-] Key (hex): ${bin2hex(key)}\n`);
            obtainedKeyInfo = true;
        }

        return this.$init(key, spec);
    };

    var Stringx = Java.use("com.decryptstringmanager.Stringx");

    Stringx.decipher.implementation = function (str) {   
        console.log(`[+] Stringx.decipher is called`);
        let result = this.decipher(str);
        console.log(`\t[-] Introduced string: ${str}`);
        console.log(`\t[-] Decrypted string: ${result}\n`); 
        return result;
    };
}


function decrypt(str) {
    var Stringx = Java.use("com.decryptstringmanager.Stringx");
    let result = Stringx.decipher(str);
    console.log(`[>] Decrypted string: ${result}\n`);
    return;
}


function webSockets(){

    let WebSocketConnection = Java.use("io.crossbar.autobahn.websocket.WebSocketConnection");
    WebSocketConnection.connect.overload('java.lang.String', '[Ljava.lang.String;', 'io.crossbar.autobahn.websocket.interfaces.IWebSocketConnectionHandler', 'io.crossbar.autobahn.websocket.types.WebSocketOptions', 'java.util.Map').implementation = function (wsUri, wsSubprotocols, wsHandler, options, headers) {
        
        console.log(`[+] WebSocketConnection.connect called`);
        console.log(`\t[-] wsUri: ${wsUri}`);
        console.log(`\t[-] wsSubprotocols: ${wsSubprotocols}`);
        console.log(`\t[-] wsHandler: ${wsHandler}`);
        console.log(`\t[-] Options: ${options}`);
        console.log(`\t[-] Headers: ${headers}\n`);
        
        this.connect(wsUri, wsSubprotocols, wsHandler, options, headers);
    };

    WebSocketConnection.sendMessage.overload('java.lang.String').implementation = function (payload) {

        console.log(`[+] WebSocketConnection.sendMessage called`);
        console.log(`\t[-] Message: ${payload}\n`);
      
        this.sendMessage(payload);
    };

    WebSocketConnection.sendMessage.overload('io.crossbar.autobahn.websocket.messages.Message').implementation = function (message) {
        console.log(`[+] WebSocketConnection.sendMessage called`);
        console.log(`\t[-] Message: ${payload.toString()}\n`);

        this.sendMessage(message);
    };
    
}

function sharedPrefs(){
    
    let runebearingdealerdom = Java.use("com.expressvpn.vpn.runebearingdealerdom");

    // Edit shared preferences
    runebearingdealerdom.k29fd779.implementation = function (context, name, params) {

        console.log(`[+] Inserted pair into Shared Preferences`);
        console.log(`\t[-] Name: ${name}`);
        console.log(`\t[-] Value: ${params}\n`);

        if (name.includes("websocket_connect")){
            console.log(`[+] Web Socket connection started\n`);
            webSockets();
        }

        this.k29fd779(context, name, params);
    };

    // Retrieve value from shared preferences
    runebearingdealerdom.kddda9ca.implementation = function (context, name) {

        console.log(`[+] Retrieved "${name}" from Shared Preferences`);
        let result = this.kddda9ca(context, name);
        console.log(`\t[-] Value: ${result}\n`);
        return result;
    };
}


function connections(){

    let anciliazentner = Java.use("com.expressvpn.vpn.anciliazentner");

    anciliazentner.kc04ae4d.implementation = function (ctx, requestURL, params) {
        console.log(`[+] anciliazentner.kc04ae4d called`);
        console.log(`\t[-] RequestURL: ${requestURL}\n`);

        this.kc04ae4d(ctx, requestURL, params);
    };


    var ServerSocket = Java.use('java.net.ServerSocket');

    ServerSocket.$init.overload('int').implementation = function (port) {
        console.log('[+] SOCKS5 ServerSocket created');
        console.log(`\t[-] Port: ${port}\n`);
        //stackTrace();

        return this.$init(port);
    };

    // Sends messages using the socks5 server
    let runebearingdealerdom = Java.use("com.expressvpn.vpn.runebearingdealerdom");
    runebearingdealerdom.ke45dc21.implementation = function (context, data) {
        console.log(`[+] runebearingdealerdom.ke45dc21 is called`);
        console.log(`\t[-] Data: ${data}\n`);

        this.ke45dc21(context, data);
    };

    runebearingdealerdom.k42693aa.implementation = function (str, str2, str3, str4) {

        console.log(`[+] Proxy Server is up and running. Intercepting values...`);
        console.log(`\t[-] Host: ${str}`);
        console.log(`\t[-] Username: ${str2}`);
        console.log(`\t[-] Password: ${str3}`);
        console.log(`\t[-] Port: ${str4}\n`);

        this.k42693aa(str, str2, str3, str4);
    };

    runebearingdealerdom.k0081ecc.implementation = function (url) {

        console.log(`[+] runebearingdealerdom.k0081ecc called`);
        console.log(`\t[-] URL: ${url}`);
        let result = this.k0081ecc(url);
        console.log(`\t[-] Server response: ${result}\n`);
        return result;
    };

    // Socks5 intent
    let swattedapplyingly = Java.use("com.expressvpn.vpn.Network.swattedapplyingly");
    swattedapplyingly.$init.implementation = function () {
        console.log(`[+] swattedapplyingly.$init is called - SOCKS5 Server\n`);
        this.$init();
    };

    swattedapplyingly.onHandleIntent.implementation = function (intent) {
        console.log(`[+] swattedapplyingly.onHandleIntent is called\n`);
        this.onHandleIntent(intent);
    };

    var ServerSocket = Java.use('java.net.ServerSocket');

    // public static String k64612d7(Context ctx, String requestURL, HashMap arg8) Sends data to C2 (hashmap) 
    let smokeryMicromeria = Java.use("com.expressvpn.vpn.smokeryMicromeria");

    smokeryMicromeria.k64612d7.implementation = function (ctx, requestURL, params) {

        console.log(`[+] smokeryMicromeria.k64612d7 called`);
        console.log(`\t[-] Request URL: ${requestURL}`); //c2
        console.log(`\t[-] Data sent: ${params}`);

        let result = this.k64612d7(ctx, requestURL, params);
        console.log(`\t[-] Result: ${result}`);

        return result;
    };


    
}

Java.perform(function(){

    console.log('');
    // mainActivity();
    // enumerateClasses();
    // decryptC2();
    tamperEmulation();
    // evasionHook2();
    // decryptStrings();
    // sharedPrefs();
    // connections();

});
function stackTrace() {
    var ThreadDef = Java.use('java.lang.Thread');
    var ThreadObj = ThreadDef.$new();

    console.log(`[+] Printing stack trace...`);
    console.log("---------------------------------------------------------");
    var stack = ThreadObj.currentThread().getStackTrace();
    for (var i = 0; i < stack.length; i++) {
        console.log(`${i}| ${stack[i].toString()}`);
    }
    console.log("---------------------------------------------------------");
}

function logs() {

    var Log = Java.use("android.util.Log");

    Log.d.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, message, throwable) {
        console.log(`[LOG] [DEBUG] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.d(tag, message, throwable);
    };
    
    Log.v.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, message, throwable) {
        console.log(`[LOG] [VERBOSE] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.v(tag, message, throwable);
    };
    
    Log.i.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, message, throwable) {
        console.log(`[LOG] [INFO] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.i(tag, message, throwable);
    };
    
    Log.e.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, message, throwable) {
        console.log(`[LOG] [ERROR] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.e(tag, message, throwable);
    };
    
    Log.w.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, message, throwable) {
        console.log(`[LOG] [WARN] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.w(tag, message, throwable);
    };
    
    Log.d.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log(`[LOG] [DEBUG] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.d(tag, message);
    };
    
    Log.v.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log(`[LOG] [VERBOSE] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.v(tag, message);
    };
    
    Log.i.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log(`[LOG] [INFO] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.i(tag, message);
    };
    
    Log.e.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log(`[LOG] [ERROR] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.e(tag, message);
    };
    
    Log.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log(`[LOG] [WARN] - ${tag}`);
        console.log(`\t[-] ${message}\n`);
        // stackTrace();
        return this.w(tag, message);
    };
    

}

Java.perform(function() {
	console.log('');
	console.log('[*] Hooking Logs...');
	console.log('');

	logs();
	
});

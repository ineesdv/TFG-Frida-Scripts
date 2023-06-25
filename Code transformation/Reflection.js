function stackTrace() {
    var ThreadDef = Java.use('java.lang.Thread');
    var ThreadObj = ThreadDef.$new();
    console.log(`[+] Printing stack trace...`);
    console.log("---------------------------------------------------------");
    var stack = ThreadObj.currentThread().getStackTrace();
    for (var i = 0; i < stack.length; i++) {
        console.log(`${i}\t| ${stack[i].toString()}`);
    }
    console.log("---------------------------------------------------------");
}

function reflection(){

    // Filter internal common classes
    var classFilter = ["android.", "com.android", "java.lang", "java.io"];

    // CLASS LOADING
    var Class = Java.use('java.lang.Class');

    Class.forName.overload('java.lang.String').implementation = function(className) {
        var log = true;
        for (var i = 0; i < classFilter.length; i++) {
            if (className.startsWith(classFilter[i])) {
                log = false;
            }
        }
        if (log) {
            console.log(`[REFLECTION] Class.forName(${className})\n`);
            //stackTrace();
        }
        return this.forName(className);
    }

    Class.forName.overload('java.lang.String', 'boolean', 'java.lang.ClassLoader').implementation = function(className, flag, class_loader) {
        var log = true;
        for (var i = 0; i < classFilter.length; i++) {
            if (className.startsWith(classFilter[i])) {
                log = false;
            }
        }
        if (log) {
            console.log(`[REFLECTION] Class.forName(${className})\n`);
            //stackTrace();
        }
        return this.forName(className, flag, class_loader);
    }


    var ClassLoader = Java.use('java.lang.ClassLoader');

    ClassLoader.loadClass.overload('java.lang.String').implementation = function(className) {
        var log = true;
        for (var i = 0; i < classFilter.length; i++) {
            if (className.startsWith(classFilter[i])) {
                log = false;
            }
        }
        if (log) {
            console.log(`[REFLECTION] ClassLoader.loadClass(${className})\n`);
            //stackTrace();
        }
        return ClassLoader.loadClass.overload('java.lang.String').call(this, className);
    }

    ClassLoader.loadClass.overload('java.lang.String', 'boolean').implementation = function(className, resolve) {
        var log = true;
        for (var i = 0; i < classFilter.length; i++) {
            if (className.startsWith(classFilter[i])) {
                log = false;
                break;
            }
        }
        if (log) {
            console.log(`[REFLECTION] ClassLoader.loadClass(${className})\n`);
            //stackTrace();
        }
        return ClassLoader.loadClass.overload('java.lang.String', 'boolean').call(this, className, resolve);
    }
    

    // ADDITIONAL INFORMATION

    Class.getMethod.overload('java.lang.String', '[Ljava.lang.Class;').implementation = function(name, paramTypes) {
        var method = this.getMethod(name, paramTypes);
        console.log(`[REFLECTION] Class.getMethod invoked`);
        var className = this.getName();
        console.log(`\t[-] Class: '${className}'`);
        console.log(`\t[-] Name: '${name}'\n`);
        //stackTrace();
        return method;
    }

    Class.getMethod.overload('java.lang.String', '[Ljava.lang.Class;', 'boolean').implementation = function(name, paramTypes, bool) {
        var method = this.getMethod(name, paramTypes, bool);
        console.log(`[REFLECTION] Class.getMethod invoked`);
        var className = this.getName();
        console.log(`\t[-] Class: '${className}'`);
        console.log(`\t[-] Name: '${name}'\n`);
        //stackTrace();
        return method;
    }

    Class.getDeclaredMethod.overload('java.lang.String', '[Ljava.lang.Class;').implementation = function(name, paramTypes) {
        var method = this.getDeclaredMethod(name, paramTypes);
        console.log(`[REFLECTION] Class.getMethod invoked`);
        var className = this.getName();
        console.log(`\t[-] Class: '${className}'`);
        console.log(`\t[-] Name: '${name}'\n`);
        //stackTrace();
        return method; 
    };


    var Method = Java.use('java.lang.reflect.Method');

    Method.invoke.overload('java.lang.Object', '[Ljava.lang.Object;').implementation = function (instance, args) {
        var className = this.getDeclaringClass().getName();
        var methodName = this.getName();
        console.log(`[REFLECTION] Method invoked: ${className}.${methodName}()`);
        //stackTrace();
        
        try{
            if (args != null){
                for (var i = 0; i < args.length; i++) {
                    console.log(`\t[-] Arg${i}: ${args[i]}`);
                }
            }
        }catch(e){
            console.log(`\t[-] Error: ${e}`);
        }
        console.log('');

        var result = this.invoke(instance, args);
        //console.log(`\t[>] Result: ${result}\n`);
        
        return result;
    };


    var Constructor = Java.use('java.lang.reflect.Constructor');

    // public T newInstance (Object... initargs)
    Constructor.newInstance.implementation = function () {

        var className = this.getDeclaringClass().getName();
        console.log(`[REFLECTION] Constructor.newInstance: ${className}\n`);
        //stackTrace();

        // Handle any number of arguments
        return this.newInstance.apply(this, arguments);
    };

}


Java.perform(function() {
    console.log('');
    console.log('[*] Hooking Reflection methods...');
    console.log('');
    reflection();
});
Java.perform(function(){
    console.log('');

    try {
        SystemProperties();
        console.log(`[+] Hooked System properties`);
    } catch (error) {
        console.error(error);
    }
        
    try {
        BuildValues();
        console.log(`[+] Hooked Build values`);
    } catch (error) {
        console.error(error);
    }
    
    try {
        Debugger();
        console.log(`[+] Hooked Debugger`);
    } catch (error) {
        console.error(error);
    }
    
    try {
        SystemFeatures();
        console.log(`[+] Hooked System features`);
    } catch (error) {
        console.error(error);
    }
    
    try {
        Telephony();
        console.log(`[+] Hooked Telephony`);
    } catch (error) {
        console.error(error);
    }
    
    try {
        HidePackages();
        console.log(`[+] Hooked PackageManager`);
    } catch (error) {
        console.error(error);
    }

    try {
        TamperFiles();
        console.log(`[+] Hooked File class`);
    } catch (error) {
        console.error(error);
    }

    try {
        TamperExecs();
        console.log(`[+] Hooked command executions`);
    } catch (error) {
        console.error(error);
    }
    
});

function BuildValues(){
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
    BuildClass.FINGERPRINT.value = "Redmi/begonia_eea/begonia:10/QP1A.190711.020/V12.0.5.0.QGGEUXM:user/release-keys";
    // ro.product.board
    BuildClass.BOARD.value = "begonia";

}

function SystemProperties(){
    var SystemPropertiesClass = Java.use("android.os.SystemProperties");

    SystemPropertiesClass.get.overload('java.lang.String').implementation = function (property) {
        if (property === 'ro.build.product') {
            return 'begonia';

        } else if (property === 'ro.product.manufacturer') {
            return 'Xiaomi';

        } else if (property === 'ro.product.brand') {
            return 'Redmi';

        } else if (property === 'ro.product.device') {
            return 'begonia';

        } else if (property === 'ro.product.model') {
            return 'Redmi Note 8 Pro';

        } else if (property === 'ro.hardware') {
            return 'mt6785';

        } else if (property === 'ro.build.fingerprint') {
            return 'Redmi/begonia_eea/begonia:10/QP1A.190711.020/V12.0.5.0.QGGEUXM:user/release-keys';

        } else if (property === 'ro.secure') { 
            return '1';

        } else if (property === 'gsm.version.baseband') { 
            return 'MOLY.LR13.R1.TC8.SP.V2.P45,MOLY.LR13.R1.TC8.SP.V2.P45';

        } else if (property === 'ro.product.board') {
            return 'begonia';

        } else if (property === 'ro.build.flavor') {
            return 'begonia-user';

        } else if (property === 'ro.board.platform') {
            return 'mt6785';

        } else if (property === 'ro.kernel.qemu') {
            return '0';

        } else if (property === 'ro.build.selinux') { 
            return '1';

        } else if (property === 'ro.debuggable') { 
            return '0';

        } else if (property === 'service.adb.root') { 
            return '0';

        } else if (property === 'ro.product.cpu.abi') { 
            return 'arm64-v8a';

        }

        return this.get(property);
    };
   
}

function SystemFeatures(){
    var PackageManager = Java.use("android.content.pm.PackageManager");
    
    PackageManager.hasSystemFeature.overload('java.lang.String').implementation = function (featureName) {
        if (featureName === "android.hardware.bluetooth" || featureName === "android.hardware.camera" || featureName === "android.hardware.camera.flash") {
    
            return true;
        }
        
        return this.hasSystemFeature(featureName);
    };

    PackageManager.hasSystemFeature.overload('java.lang.String', 'int').implementation = function (featureName, n) {
        if (featureName === "android.hardware.bluetooth" || featureName === "android.hardware.camera" || featureName === "android.hardware.camera.flash") {
    
            return true;
        }
        
        return this.hasSystemFeature(featureName, n);
    };
    
}

function Debugger(){
    var Debug = Java.use('android.os.Debug');

    Debug.isDebuggerConnected.implementation = function() {
        return false;
    }
}

function Telephony() {
    var TelephonyManager = Java.use("android.telephony.TelephonyManager");

    TelephonyManager.getDeviceId.overload().implementation = function() {
        return "1234567890";
    };

    TelephonyManager.getDeviceId.overload('int').implementation = function() {
        return "1234567890";
    };

    TelephonyManager.getSubscriberId.overload().implementation = function() {
        return "12345678909876"; 
    };

    TelephonyManager.getSubscriberId.overload('int').implementation = function() {
        return "12345678909876"; 
    };

    TelephonyManager.getSimSerialNumber.overload().implementation = function() {
        return "9876543210";
    };

    TelephonyManager.getSimSerialNumber.overload('int').implementation = function() {
        return "9876543210";
    };

    TelephonyManager.getNetworkOperatorName.overload().implementation = function() {
        return "Fake Operator";
    };

    TelephonyManager.getNetworkOperatorName.overload('int').implementation = function() {
        return "Fake Operator";
    };

    TelephonyManager.getNetworkCountryIso.overload().implementation = function() {
        return "ES"; 
    };

    TelephonyManager.getNetworkCountryIso.overload('int').implementation = function() {
        return "ES"; 
    };

    TelephonyManager.getSimCountryIso.overload().implementation = function() {
        return "ES"; 
    };

    TelephonyManager.getSimCountryIso.overload('int').implementation = function() {
        return "ES"; 
    };

    TelephonyManager.isNetworkRoaming.overload().implementation = function() {
        return false; 
    };

    TelephonyManager.isNetworkRoaming.overload('int').implementation = function() {
        return false; 
    };

    TelephonyManager.getPhoneType.overload().implementation = function() {
        return TelephonyManager.PHONE_TYPE_GSM; 
    };

    TelephonyManager.getPhoneType.overload('int').implementation = function() {
        return TelephonyManager.PHONE_TYPE_GSM; 
    };

    TelephonyManager.getSimState.overload().implementation = function() {
        return TelephonyManager.SIM_STATE_READY; 
    };

    TelephonyManager.getSimState.overload('int').implementation = function() {
        return TelephonyManager.SIM_STATE_READY; 
    };

}

function HidePackages(){

    // Root packages
    var tamperPackages = ["com.topjohnwu.magisk",
        "eu.chainfire.supersu",
        "eu.chainfire.supersu.pro",
        "stericson.busybox",
        "com.koushikdutta.superuser",
        "com.thirdparty.superuser",
        "com.noshufou.android.su",
        "com.dimonvideo.luckypatcher",
        "com.ramdroid.appquarantine",
        "com.zachspong.temprootremovejb",
        "com.androot.android",
        "com.modaco.superboot",
        "com.thirdparty.superuser.reus",
        "com.yellowes.su",
        "com.greenify",
        "com.devadvance.rootcloak",
        "com.ryansteckler.nlpunbounce",
        "com.jrummyapps.rootchecker",
        "com.m0narx.su",
        "com.miui.uac",
        "com.formyhm.hiderootPremium", 
        "com.formyhm.hideroot", 
        "com.kingouser.com"]

    var PackageManager = Java.use("android.content.pm.PackageManager");
    PackageManager.getInstalledApplications.overload('int').implementation = function (flags) {
        var installedApplications = this.getInstalledApplications.call(this, flags);

        var filteredApplications = installedApplications.filter(function (applicationInfo) {
            var packageName = applicationInfo.packageName.toString();
            return !tamperPackages.includes(packageName);
        });

        return filteredApplications;
    };

    Java.use("android.content.pm.PackageManager").getPackageInfo.overload('java.lang.String', 'int').implementation = function (packageName, flags) {
        var fakePackage = "com.example.fakepackage"; 

        if (tamperPackages.includes(packageName)) {
            packageName = fakePackage;
        }

        return this.getPackageInfo.call(this, packageName, flags);
    };
    
}

function TamperExecs() {
    var rootCommands = ["su", "whoami", "id"];
    var fakeCommand = "fakecommand";
    var fakeCgroupsInfo = "fakecgroupsinfo";

    var RuntimeExec = Java.use("java.lang.Runtime").exec;

    function joinArgs(args) {
        if (args === null) {
            return '';
        }

        var result = '';
        for (var i = 0; i < args.length; i++) {
            result += args[i] + ' ';
        }
        return result.trim();
    }

    RuntimeExec.overload('[Ljava.lang.String;').implementation = function(cmd) {
        var command = joinArgs(cmd);

        if (command.includes("/proc/self/cgroup")) {
            return fakeCgroupsInfo;
        }

        if (rootCommands.includes(command)) {
            return this.exec([fakeCommand]);
        }

        return this.exec(cmd);
    };

    RuntimeExec.overload('java.lang.String').implementation = function(cmd) {
        if (cmd.includes("/proc/self/cgroup")) {
            return fakeCgroupsInfo;
        }

        if (rootCommands.includes(cmd)) {
            return this.exec(fakeCommand);
        }

        return this.exec(cmd);
    };

    RuntimeExec.overload('java.lang.String', '[Ljava.lang.String;').implementation = function(cmd, env) {
        var command = cmd + " " + joinArgs(env);

        if (command.includes("/proc/self/cgroup")) {
            return fakeCgroupsInfo;
        }

        if (rootCommands.includes(command)) {
            return env ? this.exec(fakeCommand, env) : this.exec(fakeCommand);
        }

        return env ? this.exec(cmd, env) : this.exec(cmd);
    };

    RuntimeExec.overload('[Ljava.lang.String;', '[Ljava.lang.String;').implementation = function(cmd, env) {
        var command = joinArgs(cmd) + " " + joinArgs(env);

        if (command.includes("/proc/self/cgroup")) {
            return fakeCgroupsInfo;
        }

        if (rootCommands.includes(command)) {
            return env ? this.exec([fakeCommand], env) : this.exec([fakeCommand]);
        }

        return env ? this.exec(cmd, env) : this.exec(cmd);
    };

    RuntimeExec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.io.File').implementation = function(cmd, env, dir) {
        var command = joinArgs(cmd) + " " + joinArgs(env);

        if (command.includes("/proc/self/cgroup")) {
            return fakeCgroupsInfo;
        }

        if (rootCommands.includes(command)) {
            return env ? (dir ? this.exec([fakeCommand], env, dir) : this.exec([fakeCommand], env)) : this.exec([fakeCommand]);
        }

        return env ? (dir ? this.exec(cmd, env, dir) : this.exec(cmd, env)) : this.exec(cmd);
    };

    RuntimeExec.overload('java.lang.String', '[Ljava.lang.String;', 'java.io.File').implementation = function(cmd, env, dir) {
        var command = cmd + " " + joinArgs(env);

        if (command.includes("/proc/self/cgroup")) {
            return fakeCgroupsInfo;
        }

        if (rootCommands.includes(command)) {
            return env ? (dir ? this.exec(fakeCommand, env, dir) : this.exec(fakeCommand, env)) : this.exec(fakeCommand);
        }

        return env ? (dir ? this.exec(cmd, env, dir) : this.exec(cmd, env)) : this.exec(cmd);
    };
}


function TamperFiles(){

    // If includes
    var tamperFiles = ["frida-server", "libfrida", "frida", "gumjs",
        "bin/su", "supersu", "superuser", "daemonsu", "busybox", "failsafe", "termux", 
        "youwave_id", "vboxguest", "vboxuser", "bluestacks", "qemu",
        "test-keys"]


    function isTamperedFile(filePath) {
        for (var i = 0; i < tamperFiles.length; i++) {
            if (filePath.includes(tamperFiles[i])) {
                return true;
            }
        }
        return false;
    }

    Java.use("java.io.File").exists.implementation = function () {
        var filePath = this.getPath().toString();

        if (isTamperedFile(filePath)) {
            return false; 
        }

        return this.exists();
    };

    Java.use("java.io.File").isDirectory.implementation = function () {
        var filePath = this.getPath().toString();

        if (isTamperedFile(filePath)) {
            return false; 
        }

        return this.isDirectory();
    };
    
}

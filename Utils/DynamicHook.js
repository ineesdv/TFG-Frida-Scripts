function dynamichook(targetClassName){
    var TargetClass;
    var ClassLoaders = Java.enumerateClassLoadersSync();
    for (var i = 0; i < ClassLoaders.length; i++) {
        try {
            TargetClass = Java.ClassFactory.get(ClassLoaders[i]).use(targetClassName);
            console.log(`[+] Found ${targetClassName} class and obtained a wrapper`);
            console.log(`\t [-] Classloader: ${ClassLoaders[i]}\n`);
            break;
        } catch (e) {
            //console.log('\t[-] Failed. Skipping...\n');
        }
    }
    return TargetClass;
}
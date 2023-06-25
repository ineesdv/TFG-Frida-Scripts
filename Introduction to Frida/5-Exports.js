Java.perform(() => {
    Module.enumerateExports('library.so').forEach(function(element, index){
        if(element.name.includes('decrypt')) {
            console.log(`Function ${element.name} found @ ${element.address}`);
        }
    })
});


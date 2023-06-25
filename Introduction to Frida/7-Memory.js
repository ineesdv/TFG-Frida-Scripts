Java.perform(() => {
    // ...

    // Reading from memory
    Memory.readUtf8String(args[0]);
    readUtf16String(args[0]);
    Memory.readCString(args[0]);
    // Read Java string
    Java.vm.getEnv().getStringUtfChars(args[2]).readUtf8String();

    // Writing into memory
    Memory.writeUtf8String(str);
    Memory.writeUtf16String(str);
    Memory.allocUtf8String(str);
    Memory.writeInt(1);
    Memory.writeFloat(1.25);
    // Allocate 4 bytes
    Memory.alloc(4);
    // Allocate byte array
    var barr = Memory.alloc(8); 
    Memory.writeByteArray(barr, [0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90]);
    // Write Java string
    Java.vm.getEnv().newStringUtf("Text"); 

    // ...
});
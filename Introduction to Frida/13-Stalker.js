var funcAddr = module.findExportByName('library.so', 'function');

Interceptor.attach(func, {
    onEnter(args) {

        Stalker.follow(this.threadId, {
            events: {
                call: true, 
                ret: false, 
                exec: false,
                block: false
            },
            transform(iterator) {
                let instruction = iterator.next();
                do {
                    if (instruction.mnemonic.startsWith('j')){
                        var targetAddress;

                        // Indirect jumps
                        if (instruction.operands[0].type == 'mem') { 
                            targetAddress = instruction.address.add(ptr(instruction.operands[0].value.disp));
                            var symbol = DebugSymbol.fromAddress(ptr(targetAddress));

                            if (symbol.name !== null) {
                                console.log(`${instruction.mnemonic} ${symbol.name}`);
                            } else {
                                console.log(instruction);
                            }

                        // Register-based jump
                        } else if (instruction.operands[0].type == 'reg') { 
                            console.log(instruction);

                        // Direct jump
                        } else { 
                            targetAddress = instruction.operands[0].value;
                            var symbol = DebugSymbol.fromAddress(ptr(targetAddress));

                            if (symbol.name !== null) {
                                console.log(`${instruction.mnemonic} ${symbol.name}`);
                            } else {
                                console.log(instruction);
                            }
                        }
                    }
                    iterator.keep();
                } while ((instruction = iterator.next()) != null);
            }
        });
    },
    onLeave: function(retval) {
        Stalker.unfollow(this.tid);      
    }
});
function byteArray2String(bytearray){
    try {
		var buffer = Java.array('byte', bytearray);
    	var result = "";

		for (var i = 0; i < buffer.length; ++i){
			result += (String.fromCharCode(buffer[i] & 0xff)); // here!!
		}

	} catch (e) {
		return bytearray;
	}
    return result;
}

function string2ByteArray(str){
    var result = [];

	try {
		for (var i = 0; i < str.length; ++i){
			result.push(str.charCodeAt(i) & 0xff);
		}
	} catch (e) {
		return str;
	}
    return result;
}

function bin2hex(array, length) {
    var result = "";

    length = length || array.length;

    for (var i = 0; i < length; ++i) {
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    }
    return result;
}

function Ciphers(){

	var Cipher = Java.use("javax.crypto.Cipher");

	Cipher.getInstance.overload('java.lang.String').implementation = function (alg) {
		console.log(`[CRYPTO] Cipher.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}\n`);

		return this.getInstance(alg);
	};

	Cipher.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (alg, prov) {
		console.log(`[CRYPTO] Cipher.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};

	Cipher.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (alg, prov) {
		console.log(`[CRYPTO] Cipher.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};

	Cipher.doFinal.overload('[B').implementation = function (b) {
		let result = this.doFinal(b);            
		
		console.log(`[CRYPTO] Cipher.doFinal called`);
		console.log(`\t[-] Received: ${byteArray2String(b)}`);
		console.log(`\t[-] Result: ${byteArray2String(result)}\n`);
	
		return result;
	};

	Cipher.doFinal.overload('[B', 'int').implementation = function (b, offset) {
		let result = this.doFinal(b, offset);            
		console.log(`[CRYPTO] Cipher.doFinal called with offset`);
		console.log(`\t[-] Received: ${byteArray2String(b)}`);
		console.log(`\t[-] Offset: ${offset}`);
		console.log(`\t[-] Result: ${byteArray2String(result)}\n`);
		return result;
	};
	
	Cipher.doFinal.overload('[B', 'int', 'int').implementation = function (b, offset, len) {
		let result = this.doFinal(b, offset, len);            
		console.log(`[CRYPTO] Cipher.doFinal called with offset and length`);
		console.log(`\t[-] Received: ${byteArray2String(b)}`);
		console.log(`\t[-] Offset: ${offset}`);
		console.log(`\t[-] Length: ${len}`);
		console.log(`\t[-] Result: ${byteArray2String(result)}\n`);
		return result;
	};
	
	Cipher.doFinal.overload('[B', 'int', 'int', '[B').implementation = function (b, offset, len, output) {
		let result = this.doFinal(b, offset, len, output);            
		console.log(`[CRYPTO] Cipher.doFinal called with offset, length, and output buffer`);
		console.log(`\t[-] Received: ${byteArray2String(b)}`);
		console.log(`\t[-] Offset: ${offset}`);
		console.log(`\t[-] Length: ${len}`);
		console.log(`\t[-] Output Buffer: ${byteArray2String(output)}`);
		console.log(`\t[-] Result: ${byteArray2String(result)}\n`);
		return result;
	};
	
	Cipher.doFinal.overload('[B', 'int', 'int', '[B', 'int').implementation = function (b, offset, len, output, outputOffset) {
		let result = this.doFinal(b, offset, len, output, outputOffset);            
		console.log(`[CRYPTO] Cipher.doFinal called with offset, length, output buffer, and output offset`);
		console.log(`\t[-] Received: ${byteArray2String(b)}`);
		console.log(`\t[-] Offset: ${offset}`);
		console.log(`\t[-] Length: ${len}`);
		console.log(`\t[-] Output Buffer: ${byteArray2String(output)}`);
		console.log(`\t[-] Output Offset: ${outputOffset}`);
		console.log(`\t[-] Result: ${byteArray2String(result)}\n`);
		return result;
	};
		
}

function KeysandInfo(){

	var secretKeySpec = Java.use("javax.crypto.spec.SecretKeySpec");
 
	secretKeySpec.$init.overload('[B', 'java.lang.String').implementation = function(keybytes, cipher){
		console.log(`[CRYPTO] SecretKeySpec.init called`);

		var buffer = Java.array('byte', keybytes);
		var key = '';
		try {
			for(var i = 0; i < buffer.length; ++i){
				key += (String.fromCharCode(buffer[i]));
			}

		} catch(e){

			resultStr = "0x";

			for(var i = 0; i < buffer.length; ++i){
				key += buffer[i].toString(16);
			}
		}

		
		
		console.log(`\t[-] Key: ${key}`);
		console.log(`\t[-] Key (hex): ${bin2hex(keybytes)}`);
		console.log(`\t[-] Algorithm: ${cipher}\n`);

		return this.$init(keybytes, cipher);
	}



	var ivSpec = Java.use("javax.crypto.spec.IvParameterSpec");

	ivSpec.$init.overload("[B").implementation = function(ivBytes){
		console.log(`[CRYPTO] IvParameterSpec.init called`);

		var buffer = Java.array('byte', ivBytes);
		var iv = '';
		try{
			for(var i = 0; i < buffer.length; ++i){
				iv += (String.fromCharCode(buffer[i]));
			}
		}catch(e){
			iv = "0x";
			for(var i = 0; i < buffer.length; ++i){
				var d = buffer[i];
				iv += d.toString(16);
			}
		}

		console.log(`\t[-] IV (hex): ${bin2hex(ivBytes)}`);
		console.log(`\t[-] IV: ${iv}\n`);
		
		return this.$init(ivBytes);
	}
	
	ivSpec.$init.overload("[B", "int", "int").implementation = function(ivBytes, offset, len){
		console.log(`[CRYPTO] IvParameterSpec.init called`);

		var buffer = Java.array('byte', ivBytes);
		var iv = '';
		try{
			for(var i = offset; i < len; ++i){
				iv += (String.fromCharCode(buffer[i]));
			}
		}catch(e){
			iv = "0x";
			for(var i = offset; i < len; ++i){
				var d = buffer[i];
				iv += d.toString(16);
			}
		}
		console.log(`\t[-] IV (hex): ${bin2hex(ivBytes)}`);
		console.log(`\t[-] IV: ${iv}\n`);

		return this.$init(ivBytes, offset, len);
	}



	var keyGenerator = Java.use("javax.crypto.KeyGenerator");

	keyGenerator.generateKey.implementation = function () {
		console.log(`[CRYPTO] KeyGenerator.generateKey called\n`);
		return this.generateKey();
	};

	keyGenerator.getInstance.overload('java.lang.String').implementation = function (alg) {
		console.log(`[CRYPTO] KeyGenerator.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}\n`);

		return this.getInstance(alg);
	};

	keyGenerator.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (alg, prov) {

		console.log(`[CRYPTO] KeyGenerator.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};

	keyGenerator.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (alg, prov) {
		console.log(`[CRYPTO] KeyGenerator.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};



	var keyPairGenerator = Java.use("java.security.KeyPairGenerator");

	keyPairGenerator.getInstance.overload('java.lang.String').implementation = function (alg) {
		console.log(`[CRYPTO] GetPairGenerator.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}\n`);;
		return this.getInstance(alg);
	};

	keyPairGenerator.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (alg, prov) {
		console.log(`[CRYPTO] GetPairGenerator.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};
	
	keyPairGenerator.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (alg, prov) {
		console.log(`[CRYPTO] GetPairGenerator.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};



	var KeyGenParameterSpecBuilder = Java.use("android.security.keystore.KeyGenParameterSpec$Builder");

	KeyGenParameterSpecBuilder.$init.overload("java.lang.String", "int").implementation = function (alias, purpose) {
		let operation = "Purpose = " + purpose;
		if (purpose == 2)
			operation = "decrypt";
		else if (purpose == 1)
			operation = "encrypt";
		else if (purpose == 3)
			operation = "decrypt|encrypt";
		else if (purpose == 4)
			operation = "sign";
		else if (purpose == 8)
			operation = "verify";

		console.log(`[CRYPTO] KeyGenParameterSpec.Builder called`);
		console.log(`\t[-] Alias: ${alias}`);
		console.log(`\t[-] Operation: ${operation}\n`);

		return this.$init(alias, purpose);
	};

	KeyGenParameterSpecBuilder.setBlockModes.implementation = function (modes) {
		console.log(`[CRYPTO] KeyGenParameterSpec.Builder.setBlockModes called`);
		console.log(`\t[-] Modes: ${modes.toString()}\n`);
		return this.setBlockModes(modes);
	};

	KeyGenParameterSpecBuilder.setDigests.implementation = function (digests) {
		console.log(`[CRYPTO] KeyGenParameterSpec.Builder.setDigests called`);
		console.log(`\t[-] Digests: ${digests.toString()}\n`);
		return this.setDigests(digests);
	};

	KeyGenParameterSpecBuilder.setKeySize.implementation = function (keySize) {
		console.log(`[CRYPTO] KeyGenParameterSpec.Builder.setKeySize called`);
		console.log(`\t[-] Key Size: ${keySize}\n`);
		return this.setKeySize(keySize);
	};

	KeyGenParameterSpecBuilder.setEncryptionPaddings.implementation = function (paddings) {
		console.log(`[CRYPTO] KeyGenParameterSpec.Builder.setEncryptionPaddings called`);
		console.log(`\t[-] Paddings: ${paddings.toString()}\n`);
		return this.setEncryptionPaddings(paddings);
	};

	KeyGenParameterSpecBuilder.setSignaturePaddings.implementation = function (paddings) {
		console.log(`[CRYPTO] KeyGenParameterSpec.Builder.setSignaturePaddings called`);
		console.log(`\t[-] Paddings: ${paddings.toString()}\n`);
		return this.setSignaturePaddings(paddings);
	};

	KeyGenParameterSpecBuilder.setAlgorithmParameterSpec.implementation = function (spec) {
		console.log(`[CRYPTO] KeyGenParameterSpec.Builder.setAlgorithmParameterSpec called`);
		console.log(`\t[-] Spec: ${spec.toString()}\n`);
		return this.setAlgorithmParameterSpec(spec);
	};

	KeyGenParameterSpecBuilder.build.implementation = function () {
		console.log(`[CRYPTO] KeyGenParameterSpec.Builder.build called\n`);
		return this.build();
	};




	var SecretKeyFactory = Java.use("javax.crypto.SecretKeyFactory");

	SecretKeyFactory.getInstance.overload('java.lang.String').implementation = function (algorithm) {
		console.log(`[CRYPTO] SecretKeyFactory.getInstance called with algorithm`);
		console.log(`\t[-] Algorithm: ${algorithm}\n`);
		return this.getInstance(algorithm);
	};

	SecretKeyFactory.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
		console.log(`[CRYPTO] SecretKeyFactory.getInstance called with algorithm and provider`);
		console.log(`\t[-] Algorithm: ${algorithm}`);
		console.log(`\t[-] Provider: ${provider}\n`);
		return this.getInstance(algorithm, provider);
	};

	SecretKeyFactory.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
		console.log(`[CRYPTO] SecretKeyFactory.getInstance called with algorithm and provider`);
		console.log(`\t[-] Algorithm: ${algorithm}`);
		console.log(`\t[-] Provider: ${provider}\n`);
		return this.getInstance(algorithm, provider);
	};

}

function MACandSignature(){
	
	var mac = Java.use("javax.crypto.Mac");

	mac.getInstance.overload('java.lang.String').implementation = function (alg) {
		console.log(`[CRYPTO] Mac.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}\n`);

		return this.getInstance(alg);
	};

	mac.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (alg, prov) {
		console.log(`[CRYPTO] Mac.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};

	mac.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (alg, prov) {
		console.log(`[CRYPTO] Mac.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};




	var messageDigest = Java.use("java.security.MessageDigest");

	messageDigest.getInstance.overload('java.lang.String').implementation = function (alg) {
		console.log(`[CRYPTO] MessageDigest.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}\n`);

		return this.getInstance(alg);
	};

	messageDigest.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (alg, prov) {
		console.log(`[CRYPTO] MessageDigest.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};
	
	messageDigest.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (alg, prov) {
		console.log(`[CRYPTO] MessageDigest.getInstance called`);
		console.log(`\t[-] Algorithm: ${alg}`);
		console.log(`\t[-] Provider: ${prov}\n`);

		return this.getInstance(alg, prov);
	};
	
	messageDigest.digest.overload().implementation = function () {
		console.log(`[CRYPTO] MessageDigest.digest called`);

		let ret = this.digest();

		var buffer = Java.array('byte', ret);
		var hash = "0x";

		for(var i = 0; i < 16; ++i){
			 var d = buffer[i];
			 if (d < 0)
			 {
				 d = 0xFFFFFFFF + d + 1;
			 }
			 d.toString(16).toUpperCase();
			 hash += d;
		}

		console.log(`\t[-] Algorithm: ${this.getAlgorithm()}`);
		console.log(`\t[-] Hash: ${hash}\n`);

		return ret;
	};
	
	messageDigest.digest.overload("[B").implementation = function (input) {
		console.log(`[CRYPTO] MessageDigest.digest called`);

		ret =  this.digest(input);

		var buffer = Java.array('byte', ret);
		var resultStr = "0x";

		for(var i = 0; i < buffer.length; ++i){
			var d = buffer[i];
			resultStr += d.toString(16);
		}

		console.log(`\t[-] Algorithm: ${this.getAlgorithm()}`);
		console.log(`\t[-] Hash: ${hash}\n`);

		return ret;
	};
	
	messageDigest.digest.overload("[B", "int", "int").implementation = function (input, offset, len) {
		console.log(`[CRYPTO] MessageDigest.digest called`);

		ret =  this.digest(input, offset, len);
		
		var buffer = Java.array('byte', input);
		var resultStr = "0x";

		for(var i = offset; i < ret; ++i){
			var d = buffer[i];
			resultStr += d.toString(16);
		}
		
		console.log(`\t[-] Algorithm: ${this.getAlgorithm()}`);
		console.log(`\t[-] Hash: ${hash}\n`);

		return ret;
	};



	var Signature = Java.use("java.security.Signature");

	Signature.getInstance.overload('java.lang.String').implementation = function (algorithm) {
		console.log(`[CRYPTO] Signature.getInstance called with algorithm`);
		console.log(`\t[-] Algorithm: ${algorithm}\n`);
		return this.getInstance(algorithm);
	};

	Signature.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
		console.log(`[CRYPTO] Signature.getInstance called with algorithm and provider`);
		console.log(`\t[-] Algorithm: ${algorithm}`);
		console.log(`\t[-] Provider: ${provider}\n`);
		return this.getInstance(algorithm, provider);
	};

	Signature.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
		console.log(`[CRYPTO] Signature.getInstance called with algorithm and provider`);
		console.log(`\t[-] Algorithm: ${algorithm}`);
		console.log(`\t[-] Provider: ${provider}\n`);
		return this.getInstance(algorithm, provider);
	};
}


Java.perform(function() {
	console.log('');
	console.log('[*] Hooking cryptographic operations...');
	console.log('');

	Ciphers();
	KeysandInfo();
	MACandSignature();
	
});

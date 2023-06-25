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

function JavaSockets(){

    var Socket = Java.use('java.net.Socket');

    Socket.$init.overload('java.lang.String', 'int').implementation = function (host, port) {

      console.log('[Socket] Socket created');
      console.log(`\t[-] Host: ${host}`);
      console.log(`\t[-] Port: ${port}\n`);
      //stackTrace();

      return this.$init(host, port);
    };
  
    Socket.connect.overload('java.net.SocketAddress', 'int').implementation = function (address, timeout) {

      console.log('[Socket] Socket connect()');
      console.log(`\t[-] Address: ${address.toString()}`);
      console.log(`\t[-] Timeout: ${timeout}\n`);
      //stackTrace();

      return this.connect(address, timeout);
    };

    Socket.getInputStream.implementation = function () {

        console.log('[Socket] Socket getInputStream()');
        console.log(`\t[-] Local Address: ${this.getLocalAddress().getHostAddress()}`);
        console.log(`\t[-] Local Port: ${this.getLocalPort()}`);
        console.log(`\t[-] Remote Address: ${this.getInetAddress().getHostAddress()}`);
        console.log(`\t[-] Remote Port: ${this.getPort()}\n`);
        //stackTrace();

        var inputStream = this.getInputStream();
        return inputStream;
    };

    Socket.getOutputStream.implementation = function () {

        console.log('[Socket] Socket getOutputStream()');
        console.log(`\t[-] Local Address: ${this.getLocalAddress().getHostAddress()}`);
        console.log(`\t[-] Local Port: ${this.getLocalPort()}`);
        console.log(`\t[-] Remote Address: ${this.getInetAddress().getHostAddress()}`);
        console.log(`\t[-] Remote Port: ${this.getPort()}\n`);
        //stackTrace();
        
        var outputStream = this.getOutputStream();
        return outputStream;
    };

    Socket.close.implementation = function () {
        console.log('[Socket] close()');
        return this.close();
    };



    var LocalServerSocket = Java.use('android.net.LocalServerSocket');

    LocalServerSocket.$init.overload('java.lang.String').implementation = function (name) {
        console.log(`[LocalServerSocket] Socket '${name}' created\n`);
        //stackTrace();

        return this.$init(name);
    };

    LocalServerSocket.accept.implementation = function () {
        console.log('[LocalServerSocket] Socket.accept()\n');
        //stackTrace();

        return this.accept();
    };

    LocalServerSocket.close.implementation = function () {
        console.log('[LocalServerSocket] Socket.close()\n');
        //stackTrace();

        return this.close();
    };



    
    var ServerSocket = Java.use('java.net.ServerSocket');

    ServerSocket.$init.overload('int').implementation = function (port) {
        console.log('[ServerSocket] Socket created');
        console.log(`\t[-] Port: ${port}\n`);
        //stackTrace();

        return this.$init(port);
    };

    ServerSocket.accept.implementation = function () {
        console.log('[ServerSocket] Socket.accept()\n');
        //stackTrace();

        return this.accept();
    };

    ServerSocket.close.implementation = function () {
        console.log('[ServerSocket] Socket.close()\n');
        //stackTrace();

        return this.close();
    };



    var SSLSocket = Java.use('javax.net.ssl.SSLSocket');

    SSLSocket.$init.overload('java.lang.String', 'int').implementation = function (host, port) {

        console.log('[SSLSocket] Socket created');
        console.log(`\t[-] Host: ${host}`);
        console.log(`\t[-] Port: ${port}\n`);
        //stackTrace();
        
        this.$init(host, port);
    };
  
    SSLSocket.getOutputStream.implementation = function () {
      
        console.log('[SSLSocket] Socket.getOutputStream()\n');
        // stackTrace();

        var outputStream = this.getOutputStream();
        // To log the data OutputStream.write needs to be intercepted

        return outputStream;
    };
  
    SSLSocket.getInputStream.implementation = function () {
      
        console.log('[SSLSocket] Socket.getInputStream()\n');
        //stackTrace();

        var inputStream = this.getInputStream();
        // To log the data InputStream.read needs to be intercepted
        
        return inputStream;
    };

}


function NativeSockets(){

    // Ref: https://gist.github.com/zihadmahiuddin

    var getaddrinfoPtr = Module.findExportByName(null, 'getaddrinfo')
    var connectPtr = Module.findExportByName(null, 'connect')
    var sendPtr = Module.findExportByName(null, 'send')
    var recvPtr = Module.findExportByName(null, 'recv')

    var getaddrinfoFunction = new NativeFunction(getaddrinfoPtr, 'int', ['pointer', 'pointer', 'pointer', 'pointer'])
    var connectFunction = new NativeFunction(connectPtr, 'int', ['int', 'pointer', 'int'])
    var sendFunction = new NativeFunction(sendPtr, 'int', ['int', 'pointer', 'int', 'int'])
    var recvFunction = new NativeFunction(recvPtr, 'int', ['int', 'pointer', 'int', 'int'])

    /**
     * Returns hex from an ArrayBuffer object
     * @param {ArrayBuffer} array Array to work with
     * @param {Boolean} hex Whether to convert to hex or plain string
     */
    function getReadable(array, hex) {
        var result = new Uint8Array(array.byteLength)
        result.set(array, 0)
        if (hex === false) {
            var str = ''
            for (var i = 0; i < result.length; i++) {
                str += String.fromCharCode(result[i])
            }
            return str
        } else {
            var hexStr = ''
            for (var j = 0; j < result.length; j++) {
                hexStr += result[j].toString(16)
            }
            return hexStr
        }
    }

    /**
     * Returns a nice formatting of a function with parameters
     * @param {string} functionName The name of the function to format
     * @param {string[]} params The function parameters as strings
     */
    function formatFunction(functionName, params, retval) {
       
        var result = `[NATIVE SOCKET] Function ${functionName} called\n`;
        for (var i = 0; i < params.length; i++) {
            result += `\t[-] Parameter ${i+1}: ${params[i]}\n`;
        }
        if (retval !== undefined) {
            result += `\t[-] Return value: ${retval}\n`;
        }
        return result;

    }

    function replaceGadp() {
        Interceptor.replace(getaddrinfoPtr, new NativeCallback(function(name, service, req, pai) {
            var nameStr = Memory.readUtf8String(name)
            console.log(formatFunction('getaddrinfo', [nameStr, service, req, pai]))
            return getaddrinfoFunction(name, service, req, pai)
        }, 'int', ['pointer', 'pointer', 'pointer', 'pointer']))
    }

    function replaceConnect() {
        Interceptor.replace(connectPtr, new NativeCallback(function(socket, address, addressLen) {
            var endpoint = {
                ip: '',
                port: 0
            }
            var portPtr = ptr(parseInt(address) + 2)
            var portHigh = Memory.readU8(portPtr)
            var portLow = Memory.readU8(ptr(parseInt(portPtr) + 1))
            endpoint.port = (portHigh & 0xFF) << 8 | (portLow & 0xFF)

            var ipPtr = ptr(parseInt(address) + 4)
            var ip = []

            ip.push(Memory.readU8(ipPtr))
            ip.push(Memory.readU8(ptr(parseInt(ipPtr) + 1)))
            ip.push(Memory.readU8(ptr(parseInt(ipPtr) + 2)))
            ip.push(Memory.readU8(ptr(parseInt(ipPtr) + 3)))

            endpoint.ip = ip.join('.')

            var result = connectFunction(socket, address, addressLen)

            console.log(formatFunction('connect', [socket, JSON.stringify(endpoint), addressLen], result));
            return result
        }, 'int', ['int', 'pointer', 'int']));
    }

    function replaceSend() {
        Interceptor.replace(sendPtr, new NativeCallback(function(fd, buf, len, flags) {
            var buffer = Memory.readByteArray(buf, len)
            var result = sendFunction(fd, buf, len, flags)
            console.log(formatFunction('send', [fd, getReadable(buffer, false), len, flags], result))
            return result
        }, 'int', ['int', 'pointer', 'int', 'int']));
    }

    function replaceRecv() {
        Interceptor.replace(recvPtr, new NativeCallback(function(fd, buf, len, flags) {
            var result = recvFunction(fd, buf, len, flags)
            if (result > -1) {
                var buffer = Memory.readByteArray(buf, result)
                console.log(formatFunction('recv', [fd, getReadable(buffer, false), len, flags], result))
            } else {
                console.log(formatFunction('recv', [fd, getReadable(buffer, false), len, flags], result))
            }
            return result
        }, 'int', ['int', 'pointer', 'int', 'int']));
    }

    replaceGadp();
    replaceConnect();
    replaceSend();
    replaceRecv();

}


Java.perform(function () {

    console.log('');
    console.log('[*] Hooking Java sockets ...');
    console.log('');
    JavaSockets();
    console.log('[*] Hooking Native sockets ...');
    console.log('');
    NativeSockets();

});

function urls() {
    
    try {
        var URL = Java.use('java.net.URL');

        URL.$init.overload('java.lang.String').implementation = function (url) {
            console.log(`[URL] URL created: ${url}\n`);
            return this.$init(url);
        };
    } catch(e){

    }


    try {
        var HttpURLConnection = Java.use('java.net.HttpURLConnection');

        HttpURLConnection.connect.implementation = function () {
            console.log(`[URL] HttpURLConnection connected: ${this.getURL()}\n`);
            return this.connect();
        };
    } catch(e){

    }


    try {
        var HttpsURLConnection = Java.use('javax.net.ssl.HttpsURLConnection');

        HttpsURLConnection.connect.implementation = function () {
            console.log(`[URL] HttpsURLConnection connected: ${this.getURL()}\n`);
            return this.connect();
        };
    } catch(e){

    }


    try {
        var OkHttpClient = Java.use('okhttp3.OkHttpClient');

        OkHttpClient.newCall.implementation = function (request) {
            console.log(`[URL] OkHttpClient call created: ${request.url()}\n`);
            return this.newCall(request);
        };
    } catch(e){

    }


    try {    
        var Request = Java.use('okhttp3.Request');

        Request.$init.overload('okhttp3.Request$Builder').implementation = function (builder) {
            var requestUrl = builder.build().url().toString();
            console.log(`[URL] Request created: ${requestUrl}\n`);
            return this.$init(builder);
        };

    } catch(e){

    }


    try {
        var WebView = Java.use('android.webkit.WebView');

        WebView.loadUrl.overload('java.lang.String').implementation = function (url) {
            console.log(`[URL] WebView loadUrl: ${url}\n`);
            return this.loadUrl(url);
        };

        WebView.loadUrl.overload('java.lang.String', 'java.util.Map').implementation = function (url, additionalHttpHeaders) {
            console.log(`[URL] WebView loadUrl: ${url}\n`);
            return this.loadUrl(url, additionalHttpHeaders);
        };

    } catch (e) {
        
    }
}


Java.perform(function () {

    console.log('');
    console.log('[*] Hooking URL creations and connections...');
    console.log('');
    urls();
   
});

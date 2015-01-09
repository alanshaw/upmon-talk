# upmon
Super simple service health monitoring.

Sure, there's a bunch of things out there that already do this.

...but this is the JavaScript community right?

We reinvent the wheel every day.

...and who knows, we might even make a better wheel.

So, service monitoring.

* I wanted something that I could run on a raspberry pi, from my house.
* ...because there's no point monitoring my server from my server
* It should make a http request to one or more services

---> DEMO upmon <---

* Something should happen when the `statusCode != 200`
* I should be able to configure the services and the interval
* I should be able to **configure what should happen**

---> DEMO upmon | upmon-sms <---

Started off as a simple personal project but turned into a lesson in how to create modular composeable programs that do one thing and do it well.

# PIPE

* upmon is a readable stream that never ends
* it uses ndjson to emit a bunch of "ping" objects that contain data associated with a ping

```js
{
  "url":"http://www.google.co.uk/",
  "timestamp":1420655438040,
  "status":200,
  "rtt":146
}
```

* upmon modules are through streams, that consume ping data, operate on it, and output it
    - mail
    - sms
    - log
    - graph

* So we can just pipe them together:
    
    ```sh
    upmon | upmon-sms | upmon-mail | upmon-graf
    ```

* ...or like this:

    ```js
    var upmon = require('upmon')
    var mail = require('upmon-mail')
    var sms = require('upmon-sms')
    var graf = require('upmon-graf')

    upmon().pipe(mail()).pipe(sms()).pipe(graf()).pipe(process.stdout)
    ```

* Configure using `.upmonrc` thanks to Dominic Tarr's [rc](https://www.npmjs.com/package/rc) module

```json
{
  "ping": {
    "interval": 60000,
    "services": ["http://www.google.co.uk/", "https://www.npmjs.com/",
      "https://github.com/", "http://localhost:1337"]
  },
  "mail": {
    "from": "upmon@tableflip.io",
    "to": ["alan@tableflip.io"],
    "transport": {
      "service": "Mandrill",
      "auth": {"user": "", "pass": ""}
    }
  },
  "sms": {
    "messagebird": {
      "accessKey": "",
      "originator": "447000000000",
      "recipients": "447000000000"
    }
  },
  "graf": {"port": 5000}
}
```

---> DEMO upmon | upmon-sms | upmon-mail | upmon-graf <---

* Thanks!
* [_alanshaw](http://twitter.com/_alanshaw)
*  https://github.com/alanshaw/upmon

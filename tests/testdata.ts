export const vulnScans1 = `{
  "data" : ["hello", "hello2"],
  "metadata": {
    "index": 0,
    "size": 50,
    "total_data": 45,
    "total_pages": 1
},
"links": [
    {
        "rel": "first",
        "href": "https://us.api.insight.rapid7.com:443/ias/search?index=0&size=50"
    },
    {
        "rel": "self",
        "href": "https://us.api.insight.rapid7.com:443/ias/search"
    },
    {
        "rel": "next",
        "href": ""
    },
    {
        "rel": "last",
        "href": "https://us.api.insight.rapid7.com:443/ias/search?index=0&size=50"
    }
]
}`

export const vulnScans = `{
  "data" : [ {
    "id" : "8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b",
    "app" : {
      "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
    },
    "root_cause" : {
      "url" : "http://webscantest.com/",
      "method" : "GET"
    },
    "severity" : "INFORMATIONAL",
    "status" : "UNREVIEWED",
    "first_discovered" : "2020-12-01T10:26:07.51872",
    "last_discovered" : "2021-04-19T15:48:09.900358",
    "newly_discovered" : false,
    "variances" : [ {
      "module" : {
        "id" : "3e2e60f7-d0e0-4d85-9691-8c2d1f639064"
      },
      "attack" : {
        "id" : "XFrameAttack_1"
      },
      "message" : "X-Frame-Options header not found",
      "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nSet-Cookie: TEST_SESSIONID=comtquks6rs476548428slprr5; path=/\r\nSet-Cookie: NB_SRVID=srv140717; path=/\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
      "proof_description" : "X-Frame-Options header not found"
    }, {
      "original_exchange" : {
        "request" : "GET / HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nX-RTC-REQUESTID: {61CCB525-A4CE-44FB-982D-A064C9FD85D3}\r\n\r\n",
        "response" : "HTTP/1.1 200 OK\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nSet-Cookie: TEST_SESSIONID=comtquks6rs476548428slprr5; path=/\r\nSet-Cookie: NB_SRVID=srv140717; path=/\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
      },
      "module" : {
        "id" : "3e2e60f7-d0e0-4d85-9691-8c2d1f639064"
      },
      "attack" : {
        "id" : "XFrameAttack_1"
      },
      "message" : "X-Frame-Options header not found",
      "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
      "proof_description" : "X-Frame-Options header not found"
    } ],
    "links" : [ {
      "rel" : "self",
      "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b"
    } ]
  }, {
    "id" : "c81b4776-cfb0-408f-81c3-1df3c869f03e",
    "app" : {
      "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
    },
    "root_cause" : {
      "url" : "http://webscantest.com/jsmenu/gotoajax.php",
      "method" : "GET"
    },
    "severity" : "INFORMATIONAL",
    "status" : "UNREVIEWED",
    "first_discovered" : "2020-12-01T10:26:07.51872",
    "last_discovered" : "2021-04-19T15:48:09.900358",
    "newly_discovered" : false,
    "variances" : [ {
      "original_exchange" : {
        "request" : "GET /jsmenu/gotoajax.php HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {6E783131-90D8-446A-855B-78F36D0F8FF7}\r\n\r\n",
        "response" : "HTTP/1.1 302 Found\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 0\r\nContent-Type: text/html\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nLocation: /bjax/\r\nServer: Apache/2.4.7 (Ubuntu)\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
      },
      "module" : {
        "id" : "3e2e60f7-d0e0-4d85-9691-8c2d1f639064"
      },
      "attack" : {
        "id" : "XFrameAttack_1"
      },
      "message" : "X-Frame-Options header not found",
      "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 0\r\nContent-Type: text/html\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nLocation: /bjax/\r\nServer: Apache/2.4.7 (Ubuntu)\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
      "proof_description" : "X-Frame-Options header not found"
    } ],
    "links" : [ {
      "rel" : "self",
      "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/c81b4776-cfb0-408f-81c3-1df3c869f03e"
    } ]
  } ],
  "metadata" : {
    "index" : 0,
    "size" : 2,
    "total_data" : 2,
    "total_pages" : 1
  },
  "links" : [ {
    "rel" : "first",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search?index=0&size=2"
  }, {
    "rel" : "self",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search"
  }, {
    "rel" : "next",
    "href" : ""
  }, {
    "rel" : "last",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search?index=0&size=2"
  } ]
}`
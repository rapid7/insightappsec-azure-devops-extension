export const getAppResponse = `{
  "data": [
      {
          "id": "eefbcf63-0b58-4ab0-b11a-631b54258ec6",
          "name": "_Toms site",
          "links": [
              {
                  "rel": "self",
                  "href": "https://us.api.insight.rapid7.com:443/ias/v1/search/eefbcf63-0b58-4ab0-b11a-631b54258ec6"
              }
          ]
      }
  ],
  "metadata": {
      "index": 0,
      "size": 50,
      "total_data": 1,
      "total_pages": 1
  },
  "links": [
      {
          "rel": "self",
          "href": "https://us.api.insight.rapid7.com:443/ias/v1/search"
      }
  ]
}`

export const getAppIdOutput = "eefbcf63-0b58-4ab0-b11a-631b54258ec6"

export const getAppNameOutput = "_Toms site"

export const vulnScansResponse = `{
  "data" : [{
    "id" : "8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b",
    "app" : {
      "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
      }
    },
    {
      "id" : "c81b4776-cfb0-408f-81c3-1df3c869f03e",
      "app" : {
        "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
      }
    }
    ],
  "metadata": {
    "index": 0,
    "size": 50,
    "total_data": 2,
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

export const vulnScansOutput = [{
  "id" : "8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b",
  "app" : {
    "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
    }
  },
  {
    "id" : "c81b4776-cfb0-408f-81c3-1df3c869f03e",
    "app" : {
      "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
    }
  }
  ]

export const getScanResponse = `{
  "data" : [{
    "id" : "8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b",
    "app" : {
      "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
      }
    },
    {
      "id" : "c81b4776-cfb0-408f-81c3-1df3c869f03e",
      "app" : {
        "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
      }
    }
    ],
  "metadata": {
    "index": 0,
    "size": 50,
    "total_data": 2,
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

export const getScanOutput = {
  "data" : [{
    "id" : "8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b",
    "app" : {
      "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
      }
    },
    {
      "id" : "c81b4776-cfb0-408f-81c3-1df3c869f03e",
      "app" : {
        "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
      }
    }
    ],
  "metadata": {
    "index": 0,
    "size": 50,
    "total_data": 2,
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
}

export const getScanConfigResponse = `{
  "data": [
      {
          "id": "9ed0ed01-94b4-42d8-bc68-03fb93de93c1",
          "name": "CK Test crawl",
          "app": {
              "id": "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
          },
          "attack_template": {
              "id": "11111111-0000-0000-0000-000000000001"
          },
          "assignment": {
              "type": "ENGINE_GROUP",
              "environment": "CLOUD"
          },
          "links": [
              {
                  "rel": "self",
                  "href": "https://us.api.insight.rapid7.com:443/ias/v1/search/9ed0ed01-94b4-42d8-bc68-03fb93de93c1"
              }
          ]
      }
  ],
  "metadata": {
      "index": 0,
      "size": 50,
      "total_data": 1,
      "total_pages": 1
  },
  "links": [
      {
          "rel": "self",
          "href": "https://us.api.insight.rapid7.com:443/ias/v1/search"
      }
  ]
}`

export const getScanConfigIdOutput = "9ed0ed01-94b4-42d8-bc68-03fb93de93c1"

export const getScanConfigNameOutput = "CK Test crawl"

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

export const submitScanResponse = "8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b"
export const submitScanOutput = "8b0b6a25-f06b-4c76-b9db-795d8bb4fb6b"

export const getVulnSeveritiesInput = [ {
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
      "request" : "GET /?redirect=hrs HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nContent-Type: application/x-www-form-urlencoded\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {B3422744-9A53-4814-8AD8-1492340BDA3E}\r\n\r\n",
      "response" : "HTTP/1.1 200 OK\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
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
}, {
  "id" : "810550ef-2a7e-40bf-b0da-eeb225833933",
  "app" : {
    "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
  },
  "root_cause" : {
    "url" : "http://webscantest.com/csrf",
    "method" : "GET"
  },
  "severity" : "INFORMATIONAL",
  "status" : "UNREVIEWED",
  "first_discovered" : "2020-12-01T10:26:07.51872",
  "last_discovered" : "2021-04-19T15:48:09.900358",
  "newly_discovered" : false,
  "variances" : [ {
    "original_exchange" : {
      "request" : "GET /csrf HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {B9118F68-987A-47D7-A087-8F7A6B87CE0E}\r\n\r\n",
      "response" : "HTTP/1.1 301 Moved\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nContent-Length: 316\r\nContent-Type: text/html; charset=iso-8859-1\r\nLocation: http://webscantest.com/csrf/\r\nServer: Apache/2.4.7 (Ubuntu)"
    },
    "module" : {
      "id" : "3e2e60f7-d0e0-4d85-9691-8c2d1f639064"
    },
    "attack" : {
      "id" : "XFrameAttack_1"
    },
    "message" : "X-Frame-Options header not found",
    "proof" : "Connection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nContent-Length: 316\r\nContent-Type: text/html; charset=iso-8859-1\r\nLocation: http://webscantest.com/csrf/\r\nServer: Apache/2.4.7 (Ubuntu)",
    "proof_description" : "X-Frame-Options header not found"
  } ],
  "links" : [ {
    "rel" : "self",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/810550ef-2a7e-40bf-b0da-eeb225833933"
  } ]
}, {
  "id" : "f2dbb7c0-e089-4b14-b522-df3654b9a8a6",
  "app" : {
    "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
  },
  "root_cause" : {
    "url" : "http://webscantest.com/jsmenu/cookie_set_coffeepits.php",
    "method" : "GET"
  },
  "severity" : "INFORMATIONAL",
  "status" : "UNREVIEWED",
  "first_discovered" : "2020-12-01T10:26:07.51872",
  "last_discovered" : "2021-04-19T15:48:09.900358",
  "newly_discovered" : false,
  "variances" : [ {
    "original_exchange" : {
      "request" : "GET /jsmenu/cookie_set_coffeepits.php HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {E13A0734-A135-47DE-8D7A-6B8D9EABA3ED}\r\n\r\n",
      "response" : "HTTP/1.1 200 OK\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 796\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
    },
    "module" : {
      "id" : "3e2e60f7-d0e0-4d85-9691-8c2d1f639064"
    },
    "attack" : {
      "id" : "XFrameAttack_1"
    },
    "message" : "X-Frame-Options header not found",
    "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 796\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
    "proof_description" : "X-Frame-Options header not found"
  } ],
  "links" : [ {
    "rel" : "self",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/f2dbb7c0-e089-4b14-b522-df3654b9a8a6"
  } ]
}, {
  "id" : "cd56a6c5-7b79-4f40-b3d4-49e7730ba39d",
  "app" : {
    "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
  },
  "root_cause" : {
    "url" : "http://webscantest.com/",
    "method" : "GET"
  },
  "severity" : "HIGH",
  "status" : "UNREVIEWED",
  "first_discovered" : "2020-12-01T10:26:07.51872",
  "last_discovered" : "2021-04-19T15:48:09.900358",
  "newly_discovered" : false,
  "variances" : [ {
    "module" : {
      "id" : "615d72f4-01bc-447a-b4a2-139654bc9945"
    },
    "attack" : {
      "id" : "XSSProtectionAttack_1"
    },
    "message" : "The X-XSS-Protection HTTP response header not found.",
    "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nSet-Cookie: TEST_SESSIONID=comtquks6rs476548428slprr5; path=/\r\nSet-Cookie: NB_SRVID=srv140717; path=/\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
    "proof_description" : "The X-XSS-Protection HTTP response header not found."
  }, {
    "original_exchange" : {
      "request" : "GET /?redirect=hrs HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nContent-Type: application/x-www-form-urlencoded\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {B3422744-9A53-4814-8AD8-1492340BDA3E}\r\n\r\n",
      "response" : "HTTP/1.1 200 OK\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
    },
    "module" : {
      "id" : "615d72f4-01bc-447a-b4a2-139654bc9945"
    },
    "attack" : {
      "id" : "XSSProtectionAttack_1"
    },
    "message" : "The X-XSS-Protection HTTP response header not found.",
    "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
    "proof_description" : "The X-XSS-Protection HTTP response header not found."
  } ],
  "links" : [ {
    "rel" : "self",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/cd56a6c5-7b79-4f40-b3d4-49e7730ba39d"
  } ]
} ]

export const getVulnSeveritiesOutput = {
  "INFORMATIONAL": 4,
  "HIGH": 1
}

export const getAttackModulesNames = {
  "8399fa8e-df5c-41bc-9d3c-f85dc23dc26b": 
  `{
    "id": "8399fa8e-df5c-41bc-9d3c-f85dc23dc26b",
    "name": "X-Content-Type-Options",
    "description": "Checks for X-Content-Type-Options HTTP header."
  }`,

  "615d72f4-01bc-447a-b4a2-139654bc9945": `{
    "id": "615d72f4-01bc-447a-b4a2-139654bc9945",
    "name": "X-XSS-Protection",
    "description": "Checks for X-XSS-Protection HTTP header that enables Cross-site scripting (XSS) filter built into the browsers."
}`
}

export const getAttackModulesInput = [ {
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
      "request" : "GET /?redirect=hrs HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nContent-Type: application/x-www-form-urlencoded\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {B3422744-9A53-4814-8AD8-1492340BDA3E}\r\n\r\n",
      "response" : "HTTP/1.1 200 OK\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
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
}, {
  "id" : "810550ef-2a7e-40bf-b0da-eeb225833933",
  "app" : {
    "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
  },
  "root_cause" : {
    "url" : "http://webscantest.com/csrf",
    "method" : "GET"
  },
  "severity" : "INFORMATIONAL",
  "status" : "UNREVIEWED",
  "first_discovered" : "2020-12-01T10:26:07.51872",
  "last_discovered" : "2021-04-19T15:48:09.900358",
  "newly_discovered" : false,
  "variances" : [ {
    "original_exchange" : {
      "request" : "GET /csrf HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {B9118F68-987A-47D7-A087-8F7A6B87CE0E}\r\n\r\n",
      "response" : "HTTP/1.1 301 Moved\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nContent-Length: 316\r\nContent-Type: text/html; charset=iso-8859-1\r\nLocation: http://webscantest.com/csrf/\r\nServer: Apache/2.4.7 (Ubuntu)"
    },
    "module" : {
      "id" : "3e2e60f7-d0e0-4d85-9691-8c2d1f639064"
    },
    "attack" : {
      "id" : "XFrameAttack_1"
    },
    "message" : "X-Frame-Options header not found",
    "proof" : "Connection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nContent-Length: 316\r\nContent-Type: text/html; charset=iso-8859-1\r\nLocation: http://webscantest.com/csrf/\r\nServer: Apache/2.4.7 (Ubuntu)",
    "proof_description" : "X-Frame-Options header not found"
  } ],
  "links" : [ {
    "rel" : "self",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/810550ef-2a7e-40bf-b0da-eeb225833933"
  } ]
}, {
  "id" : "f2dbb7c0-e089-4b14-b522-df3654b9a8a6",
  "app" : {
    "id" : "679703e4-a4e0-4ea6-a38c-53c8789ebfc1"
  },
  "root_cause" : {
    "url" : "http://webscantest.com/jsmenu/cookie_set_coffeepits.php",
    "method" : "GET"
  },
  "severity" : "INFORMATIONAL",
  "status" : "UNREVIEWED",
  "first_discovered" : "2020-12-01T10:26:07.51872",
  "last_discovered" : "2021-04-19T15:48:09.900358",
  "newly_discovered" : false,
  "variances" : [ {
    "original_exchange" : {
      "request" : "GET /jsmenu/cookie_set_coffeepits.php HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {E13A0734-A135-47DE-8D7A-6B8D9EABA3ED}\r\n\r\n",
      "response" : "HTTP/1.1 200 OK\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 796\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
    },
    "module" : {
      "id" : "3e2e60f7-d0e0-4d85-9691-8c2d1f639064"
    },
    "attack" : {
      "id" : "XFrameAttack_1"
    },
    "message" : "X-Frame-Options header not found",
    "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 796\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
    "proof_description" : "X-Frame-Options header not found"
  } ],
  "links" : [ {
    "rel" : "self",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/f2dbb7c0-e089-4b14-b522-df3654b9a8a6"
  } ]
}, {
  "id" : "cd56a6c5-7b79-4f40-b3d4-49e7730ba39d",
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
      "id" : "615d72f4-01bc-447a-b4a2-139654bc9945"
    },
    "attack" : {
      "id" : "XSSProtectionAttack_1"
    },
    "message" : "The X-XSS-Protection HTTP response header not found.",
    "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nSet-Cookie: TEST_SESSIONID=comtquks6rs476548428slprr5; path=/\r\nSet-Cookie: NB_SRVID=srv140717; path=/\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
    "proof_description" : "The X-XSS-Protection HTTP response header not found."
  }, {
    "original_exchange" : {
      "request" : "GET /?redirect=hrs HTTP/1.1\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36\r\nX-RTC-AUTH: R7_IAS\r\nX-RTC-SCANID: e2fcf77e-48cc-46cf-a812-45937073a4df\r\nHost: webscantest.com\r\nReferer: http://webscantest.com/\r\nContent-Type: application/x-www-form-urlencoded\r\nCookie: TEST_SESSIONID=comtquks6rs476548428slprr5; NB_SRVID=srv140717\r\nX-RTC-REQUESTID: {B3422744-9A53-4814-8AD8-1492340BDA3E}\r\n\r\n",
      "response" : "HTTP/1.1 200 OK\r\nCache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29"
    },
    "module" : {
      "id" : "615d72f4-01bc-447a-b4a2-139654bc9945"
    },
    "attack" : {
      "id" : "XSSProtectionAttack_1"
    },
    "message" : "The X-XSS-Protection HTTP response header not found.",
    "proof" : "Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r\nConnection: close\r\nDate: Mon, 19 Apr 2021 15:34:49 GMT\r\nPragma: no-cache\r\nContent-Length: 1693\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nExpires: Thu, 19 Nov 1981 08:52:00 GMT\r\nServer: Apache/2.4.7 (Ubuntu)\r\nVary: Accept-Encoding\r\nx-powered-by: PHP/5.5.9-1ubuntu4.29",
    "proof_description" : "The X-XSS-Protection HTTP response header not found."
  } ],
  "links" : [ {
    "rel" : "self",
    "href" : "https://us.api.insight.rapid7.com:443/ias/v1/search/cd56a6c5-7b79-4f40-b3d4-49e7730ba39d"
  } ]
} ]

export const getAttackModulesOutput = {
  "X-Content-Type-Options": 4,
  "X-XSS-Protection": 1}

export const getNextPageUrlInput = [
  {
      "rel": "first",
      "href": "https://us.api.insight.rapid7.com:443/ias/v1/search?index=0&size=50"
  },
  {
      "rel": "self",
      "href": "https://us.api.insight.rapid7.com:443/ias/v1/search"
  },
  {
      "rel": "next",
      "href": "https://us.api.insight.rapid7.com:443/ias/v1/search?index=1&size=50"
  },
  {
      "rel": "last",
      "href": "https://us.api.insight.rapid7.com:443/ias/v1/search?index=2&size=50"
  }
]

export const getNextPageUrlOutput = "https://us.api.insight.rapid7.com:443/ias/v1/search?index=1&size=50"

export const appUUID = "cd56a6c5-7b79-4f40-b3d4-49e7730ba39d"

export const appName = "Test Site 1"

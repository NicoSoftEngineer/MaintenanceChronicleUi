import {
  __commonJS,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// node_modules/qr-border-plugin/build/index.js
var require_build = __commonJS({
  "node_modules/qr-border-plugin/build/index.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.QRBorderPlugin = e() : t.QRBorderPlugin = e();
    }(exports, () => (() => {
      var t = {
        600: function(t2) {
          var e2;
          e2 = () => (() => {
            var t3 = {
              665: function(t4) {
                t4.exports = (() => {
                  "use strict";
                  var t5 = {
                    d: (e5, i4) => {
                      for (var n4 in i4) t5.o(i4, n4) && !t5.o(e5, n4) && Object.defineProperty(e5, n4, {
                        enumerable: true,
                        get: i4[n4]
                      });
                    },
                    o: (t6, e5) => Object.prototype.hasOwnProperty.call(t6, e5),
                    r: (t6) => {
                      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t6, Symbol.toStringTag, {
                        value: "Module"
                      }), Object.defineProperty(t6, "__esModule", {
                        value: true
                      });
                    }
                  }, e4 = {};
                  t5.r(e4), t5.d(e4, {
                    LICENSE_STATUS: () => l,
                    LICENSING_MODELS: () => d,
                    base64Decode: () => n3,
                    base64Encode: () => o,
                    findScopeNode: () => g,
                    md5: () => s,
                    showExpiredSubscriptionGraceLicenseKeyError: () => v,
                    showExpiredSubscriptionLicenseKeyError: () => m,
                    showInvalidLicenseKeyError: () => h,
                    showLicenseKeyScopeError: () => u,
                    showMissingLicenseKeyError: () => p
                  });
                  const i3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n3 = (t6) => {
                    let e5, n4, o2, a2, r2, s2, l2, d2 = "", c2 = 0;
                    for (t6 = t6.replace(/[^A-Za-z0-9+/=]/g, ""); c2 < t6.length; ) a2 = i3.indexOf(t6.charAt(c2++)), r2 = i3.indexOf(t6.charAt(c2++)), s2 = i3.indexOf(t6.charAt(c2++)), l2 = i3.indexOf(t6.charAt(c2++)), e5 = a2 << 2 | r2 >> 4, n4 = (15 & r2) << 4 | s2 >> 2, o2 = (3 & s2) << 6 | l2, d2 += String.fromCharCode(e5), 64 != s2 && (d2 += String.fromCharCode(n4)), 64 != l2 && (d2 += String.fromCharCode(o2));
                    return d2;
                  }, o = (t6) => {
                    let e5, n4, o2, a2, r2, s2, l2, d2 = "", c2 = 0;
                    for (t6 = function(t7) {
                      for (let e6 = 0; e6 < t7.length; e6++) if (t7.charCodeAt(e6) >= 128) throw new Error("ASCII only support");
                      return t7;
                    }(t6); c2 < t6.length; ) e5 = t6.charCodeAt(c2++), n4 = t6.charCodeAt(c2++), o2 = t6.charCodeAt(c2++), a2 = e5 >> 2, r2 = (3 & e5) << 4 | n4 >> 4, s2 = (15 & n4) << 2 | o2 >> 6, l2 = 63 & o2, isNaN(n4) ? s2 = l2 = 64 : isNaN(o2) && (l2 = 64), d2 = d2 + i3.charAt(a2) + i3.charAt(r2) + i3.charAt(s2) + i3.charAt(l2);
                    return d2;
                  }, a = [];
                  let r = 0;
                  for (; r < 64; ) a[r] = 0 | 4294967296 * Math.sin(++r % Math.PI);
                  function s(t6) {
                    const e5 = [];
                    let i4, n4, o2, s2 = unescape(encodeURI(t6)) + "", l2 = s2.length;
                    const d2 = [i4 = 1732584193, n4 = 4023233417, ~i4, ~n4];
                    for (t6 = --l2 / 4 + 2 | 15, e5[--t6] = 8 * l2; ~l2; ) e5[l2 >> 2] |= s2.charCodeAt(l2) << 8 * l2--;
                    for (r = s2 = 0; r < t6; r += 16) {
                      for (l2 = d2; s2 < 64; l2 = [o2 = l2[3], i4 + ((o2 = l2[0] + [i4 & n4 | ~i4 & o2, o2 & i4 | ~o2 & n4, i4 ^ n4 ^ o2, n4 ^ (i4 | ~o2)][l2 = s2 >> 4] + a[s2] + ~~e5[r | 15 & [s2, 5 * s2 + 1, 3 * s2 + 5, 7 * s2][l2]]) << (l2 = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * l2 + s2++ % 4]) | o2 >>> -l2), i4, n4]) i4 = 0 | l2[1], n4 = l2[2];
                      for (s2 = 4; s2; ) d2[--s2] += l2[s2];
                    }
                    for (t6 = ""; s2 < 32; ) t6 += (d2[s2 >> 3] >> 4 * (1 ^ s2++) & 15).toString(16);
                    return t6;
                  }
                  var l;
                  !function(t6) {
                    t6.NotFound = "NotFound", t6.Invalid = "Invalid", t6.ExpiredSubscription = "ExpiredSubscription", t6.ExpiredSubscriptionGrace = "ExpiredSubscriptionGrace", t6.Valid = "Valid", t6.OutOfScope = "OutOfScope", t6.InvalidDomain = "InvalidDomain";
                  }(l || (l = {}));
                  const d = ["perpetual", "subscription"];
                  function c(t6) {
                    console.error(["*************************************************************", "", ...t6, "", "*************************************************************"].join("\n"));
                  }
                  function h({
                    organization: t6
                  }) {
                    c([`${t6}: Invalid license key.`, "", "Your icense key isn't valid.", "", "To solve the issue, you need to double check that `setLicenseKey()` is called with the right argument"]);
                  }
                  function u({
                    organization: t6,
                    packageName: e5
                  }) {
                    c([`${t6}: License key plan mismatch.`, "", `Your use of ${e5} is not compatible with the plan of your license key. The feature you are trying to use is not included in the plan of your license key.`]);
                  }
                  function p({
                    packageName: t6,
                    organization: e5,
                    scope: i4
                  }) {
                    c([`${e5}: Missing license key.`, "", `The license key is missing. You might not be allowed to use \`${t6}\` which is part of ${i4} plan.`, "", `You need to purchase a license https://lefe.dev/${e5}/license.`]);
                  }
                  function v({
                    scope: t6,
                    packageName: e5,
                    organization: i4,
                    licenseKey: n4,
                    expiryTimestamp: o2
                  }) {
                    c([`${i4}: Expired license key.`, "", `Your subscription license key to use ${e5} ${t6} has expired.`, "", `- License key expiry timestamp: ${new Date(o2)}`, `- Installed license key: ${n4}`, ""]);
                  }
                  function m({
                    scope: t6,
                    packageName: e5,
                    organization: i4,
                    licenseKey: n4,
                    expiryTimestamp: o2
                  }) {
                    throw new Error([`${i4}: Expired license key.`, "", `Your subscription license key to use ${e5} ${t6} has expired.`, "", `- License key expiry timestamp: ${new Date(o2)}`, `- Installed license key: ${n4}`, ""].join("\n"));
                  }
                  function g(t6, e5) {
                    return e5?.find(({
                      name: e6,
                      children: i4
                    }) => e6 === t6 || g(t6, i4));
                  }
                  return e4;
                })();
              }
            }, e3 = {};
            function i2(n3) {
              var o = e3[n3];
              if (void 0 !== o) return o.exports;
              var a = e3[n3] = {
                exports: {}
              };
              return t3[n3].call(a.exports, a, a.exports, i2), a.exports;
            }
            i2.d = (t4, e4) => {
              for (var n3 in e4) i2.o(e4, n3) && !i2.o(t4, n3) && Object.defineProperty(t4, n3, {
                enumerable: true,
                get: e4[n3]
              });
            }, i2.o = (t4, e4) => Object.prototype.hasOwnProperty.call(t4, e4), i2.r = (t4) => {
              "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t4, Symbol.toStringTag, {
                value: "Module"
              }), Object.defineProperty(t4, "__esModule", {
                value: true
              });
            };
            var n2 = {};
            return (() => {
              "use strict";
              i2.r(n2), i2.d(n2, {
                LicenseInfo: () => r,
                LicenseVerifier: () => o,
                showWatermark: () => P
              });
              var t4, e4 = i2(665);
              !function(t5) {
                t5[t5.nonBrowser = 0] = "nonBrowser", t5[t5.localhost = 1] = "localhost", t5[t5.valid = 2] = "valid", t5[t5.invalid = 3] = "invalid";
              }(t4 || (t4 = {}));
              class o {
                scopes;
                organization;
                constructor({
                  scopes: t5,
                  organization: e5
                }) {
                  this.scopes = t5, this.organization = e5;
                }
                static isLicenseScopeSufficient(t5, i3, n3) {
                  const o2 = (0, e4.findScopeNode)(i3, n3), a2 = o2 && [o2];
                  return !!(0, e4.findScopeNode)(t5, a2);
                }
                static decodeLicense(t5) {
                  const i3 = (0, e4.base64Decode)(t5), n3 = {
                    version: 1,
                    scope: null,
                    licensingModel: null,
                    organization: null,
                    expiryTimestamp: null
                  };
                  return i3.split(",").map((t6) => t6.split("=")).filter((t6) => 2 === t6.length).forEach(([t6, e5]) => {
                    switch (t6) {
                      case "V":
                        n3.version = +e5;
                        break;
                      case "S":
                        n3.scope = e5;
                        break;
                      case "L":
                        n3.licensingModel = e5;
                        break;
                      case "O":
                        n3.organization = e5;
                        break;
                      case "E": {
                        const t7 = parseInt(e5, 10);
                        t7 && !Number.isNaN(t7) && (n3.expiryTimestamp = t7);
                        break;
                      }
                      case "D":
                        n3.domain = e5;
                    }
                  }), n3;
                }
                verifyLicense({
                  licenseKey: i3,
                  packageScope: n3
                }) {
                  if (!i3) return console.error(`${this.organization}: Error checking license. License key is not found!`), {
                    status: e4.LICENSE_STATUS.NotFound
                  };
                  const a2 = i3.substr(0, 32), r2 = i3.substr(32);
                  if (a2 !== (0, e4.md5)(r2)) return console.error(`${this.organization}: Error checking license. License key format is not valid!`), {
                    status: e4.LICENSE_STATUS.Invalid
                  };
                  const s2 = o.decodeLicense(r2);
                  if (null == s2.expiryTimestamp) return console.error(`${this.organization}: Error checking license. Expiry timestamp not found or invalid!`), {
                    status: e4.LICENSE_STATUS.Invalid
                  };
                  if (null == s2.scope) return console.error(`${this.organization}: Error checking license. Scope not found or invalid!`), {
                    status: e4.LICENSE_STATUS.Invalid
                  };
                  if (null == s2.licensingModel || !e4.LICENSING_MODELS.includes(s2.licensingModel)) return console.error(`${this.organization}: Error checking license. Licensing model not found or invalid!`), {
                    status: e4.LICENSE_STATUS.Invalid
                  };
                  if (!o.isLicenseScopeSufficient(n3, s2.scope, this.scopes)) return console.error(`${this.organization}: Error checking license. License scope is not sufficient!`), {
                    status: e4.LICENSE_STATUS.OutOfScope
                  };
                  if ("subscription" === s2.licensingModel && (/* @__PURE__ */ new Date()).getTime() > s2.expiryTimestamp) return (/* @__PURE__ */ new Date()).getTime() < s2.expiryTimestamp + 2592e6 ? (console.warn(`${this.organization}: License subscription expired at ${new Date(s2.expiryTimestamp).toISOString()}!`), {
                    status: e4.LICENSE_STATUS.ExpiredSubscriptionGrace,
                    meta: {
                      expiryTimestamp: s2.expiryTimestamp,
                      licenseKey: i3
                    }
                  }) : (console.error(`${this.organization}: Error checking license. License is expired!`), {
                    status: e4.LICENSE_STATUS.ExpiredSubscription,
                    meta: {
                      expiryTimestamp: s2.expiryTimestamp,
                      licenseKey: i3
                    }
                  });
                  if (s2.version && s2.version >= 2) {
                    const i4 = function(e5) {
                      if ("undefined" == typeof window) return t4.nonBrowser;
                      const i5 = window.location.hostname;
                      return "localhost" === i5 ? t4.localhost : e5 && i5.endsWith(e5) ? t4.valid : t4.invalid;
                    }(s2.domain);
                    if (i4 === t4.localhost && console.warn(`${this.organization}: The license is valid on ${s2.domain} domain. The current domain is localhost!`), i4 === t4.invalid) return console.error(`${this.organization}: Error checking license. License is valid only on ${s2.domain} domain.!`), {
                      status: e4.LICENSE_STATUS.InvalidDomain
                    };
                  }
                  return {
                    status: e4.LICENSE_STATUS.Valid
                  };
                }
              }
              const a = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
              class r {
                organization;
                constructor({
                  organization: t5
                }) {
                  this.organization = t5, a[`__${this.organization}_LICENSE_INFO__`] = a[`__${this.organization}_LICENSE_INFO__`] || {
                    key: void 0
                  };
                }
                getLicenseInfo() {
                  return a[`__${this.organization}_LICENSE_INFO__`];
                }
                getLicenseKey() {
                  return this.getLicenseInfo().key;
                }
                setLicenseKey(t5) {
                  this.getLicenseInfo().key = t5;
                }
              }
              !function(t5, e5) {
                void 0 === e5 && (e5 = {});
                var i3 = e5.insertAt;
                if ("undefined" != typeof document) {
                  var n3 = document.head || document.getElementsByTagName("head")[0], o2 = document.createElement("style");
                  o2.type = "text/css", "top" === i3 && n3.firstChild ? n3.insertBefore(o2, n3.firstChild) : n3.appendChild(o2), o2.styleSheet ? o2.styleSheet.cssText = t5 : o2.appendChild(document.createTextNode(t5));
                }
              }("@keyframes watermark{0%{background-position:0 0}25%{background-position:100% 100%}50%{background-position:0 0}75%{background-position:100% -100%}to{background-position:0 0}}");
              var s = function(t5, e5) {
                return s = Object.setPrototypeOf || {
                  __proto__: []
                } instanceof Array && function(t6, e6) {
                  t6.__proto__ = e6;
                } || function(t6, e6) {
                  for (var i3 in e6) Object.prototype.hasOwnProperty.call(e6, i3) && (t6[i3] = e6[i3]);
                }, s(t5, e5);
              }, l = function() {
                return l = Object.assign || function(t5) {
                  for (var e5, i3 = 1, n3 = arguments.length; i3 < n3; i3++) for (var o2 in e5 = arguments[i3]) Object.prototype.hasOwnProperty.call(e5, o2) && (t5[o2] = e5[o2]);
                  return t5;
                }, l.apply(this, arguments);
              };
              function d(t5, e5, i3, n3) {
                return new (i3 || (i3 = Promise))(function(o2, a2) {
                  function r2(t6) {
                    try {
                      l2(n3.next(t6));
                    } catch (t7) {
                      a2(t7);
                    }
                  }
                  function s2(t6) {
                    try {
                      l2(n3.throw(t6));
                    } catch (t7) {
                      a2(t7);
                    }
                  }
                  function l2(t6) {
                    var e6;
                    t6.done ? o2(t6.value) : (e6 = t6.value, e6 instanceof i3 ? e6 : new i3(function(t7) {
                      t7(e6);
                    })).then(r2, s2);
                  }
                  l2((n3 = n3.apply(t5, e5 || [])).next());
                });
              }
              function c(t5, e5) {
                var i3, n3, o2, a2, r2 = {
                  label: 0,
                  sent: function() {
                    if (1 & o2[0]) throw o2[1];
                    return o2[1];
                  },
                  trys: [],
                  ops: []
                };
                return a2 = {
                  next: s2(0),
                  throw: s2(1),
                  return: s2(2)
                }, "function" == typeof Symbol && (a2[Symbol.iterator] = function() {
                  return this;
                }), a2;
                function s2(s3) {
                  return function(l2) {
                    return function(s4) {
                      if (i3) throw new TypeError("Generator is already executing.");
                      for (; a2 && (a2 = 0, s4[0] && (r2 = 0)), r2; ) try {
                        if (i3 = 1, n3 && (o2 = 2 & s4[0] ? n3.return : s4[0] ? n3.throw || ((o2 = n3.return) && o2.call(n3), 0) : n3.next) && !(o2 = o2.call(n3, s4[1])).done) return o2;
                        switch (n3 = 0, o2 && (s4 = [2 & s4[0], o2.value]), s4[0]) {
                          case 0:
                          case 1:
                            o2 = s4;
                            break;
                          case 4:
                            return r2.label++, {
                              value: s4[1],
                              done: false
                            };
                          case 5:
                            r2.label++, n3 = s4[1], s4 = [0];
                            continue;
                          case 7:
                            s4 = r2.ops.pop(), r2.trys.pop();
                            continue;
                          default:
                            if (!((o2 = (o2 = r2.trys).length > 0 && o2[o2.length - 1]) || 6 !== s4[0] && 2 !== s4[0])) {
                              r2 = 0;
                              continue;
                            }
                            if (3 === s4[0] && (!o2 || s4[1] > o2[0] && s4[1] < o2[3])) {
                              r2.label = s4[1];
                              break;
                            }
                            if (6 === s4[0] && r2.label < o2[1]) {
                              r2.label = o2[1], o2 = s4;
                              break;
                            }
                            if (o2 && r2.label < o2[2]) {
                              r2.label = o2[2], r2.ops.push(s4);
                              break;
                            }
                            o2[2] && r2.ops.pop(), r2.trys.pop();
                            continue;
                        }
                        s4 = e5.call(t5, r2);
                      } catch (t6) {
                        s4 = [6, t6], n3 = 0;
                      } finally {
                        i3 = o2 = 0;
                      }
                      if (5 & s4[0]) throw s4[1];
                      return {
                        value: s4[0] ? s4[1] : void 0,
                        done: true
                      };
                    }([s3, l2]);
                  };
                }
              }
              var h = function(t5) {
                return t5.toDataURL("image/png", 1);
              }, u = function(t5) {
                return "function" == typeof t5;
              }, p = function(t5) {
                return void 0 === t5;
              }, v = function(t5, e5, i3) {
                void 0 === e5 && (e5 = {}), void 0 === i3 && (i3 = "http://www.w3.org/2000/svg");
                var n3 = document.createElementNS(i3, t5);
                for (var o2 in e5) n3.setAttribute(o2, e5[o2]);
                return n3;
              }, m = function(t5, e5) {
                return d(void 0, void 0, void 0, function() {
                  var i3, n3, o2, a2, r2, s2, l2, d2, h2;
                  return c(this, function(c2) {
                    switch (c2.label) {
                      case 0:
                        return i3 = v("svg", {
                          xmlns: "http://www.w3.org/2000/svg"
                        }), (n3 = document.createElement("div")).setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), n3.style.cssText = "\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font: ".concat(t5.font, ";\n  color: ").concat(e5.fontColor, ";\n"), n3.innerHTML = "<div class='rich-text-content'>".concat(e5.content, "</div>"), document.body.appendChild(n3), [4, g(n3)];
                      case 1:
                        return c2.sent(), o2 = null === (h2 = n3.querySelector(".rich-text-content")) || void 0 === h2 ? void 0 : h2.getBoundingClientRect(), a2 = null == o2 ? void 0 : o2.width, r2 = null == o2 ? void 0 : o2.height, document.body.removeChild(n3), s2 = e5.richTextWidth || a2 || e5.width, l2 = e5.richTextHeight || r2 || e5.height, i3.setAttribute("width", s2.toString()), i3.setAttribute("height", l2.toString()), (d2 = v("foreignObject", {
                          width: s2.toString(),
                          height: l2.toString()
                        })).appendChild(n3), i3.appendChild(d2), [2, {
                          element: i3,
                          width: s2,
                          height: l2
                        }];
                    }
                  });
                });
              };
              function g(t5) {
                return d(this, void 0, void 0, function() {
                  var e5, i3, n3, o2, a2;
                  return c(this, function(r2) {
                    switch (r2.label) {
                      case 0:
                        e5 = t5.querySelectorAll("img"), i3 = function(t6) {
                          var e6, i4, n4, o3;
                          return c(this, function(a3) {
                            switch (a3.label) {
                              case 0:
                                if (!(e6 = t6.getAttribute("src"))) return [3, 6];
                                a3.label = 1;
                              case 1:
                                return a3.trys.push([1, 5, , 6]), [4, fetch(e6)];
                              case 2:
                                return [4, a3.sent().blob()];
                              case 3:
                                return i4 = a3.sent(), [4, new Promise(function(t7, e7) {
                                  var n5 = new FileReader();
                                  n5.onloadend = function() {
                                    return t7(n5.result);
                                  }, n5.onerror = e7, n5.readAsDataURL(i4);
                                })];
                              case 4:
                                return "string" == typeof (n4 = a3.sent()) && t6.setAttribute("src", n4), [3, 6];
                              case 5:
                                return o3 = a3.sent(), console.error("Error converting ".concat(e6, " to base64:"), o3), [3, 6];
                              case 6:
                                return [2];
                            }
                          });
                        }, n3 = 0, o2 = Array.from(e5), r2.label = 1;
                      case 1:
                        return n3 < o2.length ? (a2 = o2[n3], [5, i3(a2)]) : [3, 4];
                      case 2:
                        r2.sent(), r2.label = 3;
                      case 3:
                        return n3++, [3, 1];
                      case 4:
                        return [2];
                    }
                  });
                });
              }
              var y = function(t5, e5) {
                return p(t5) ? e5 : t5;
              }, f = function(t5, e5, i3) {
                void 0 === e5 && (e5 = void 0), void 0 === i3 && (i3 = void 0);
                var n3 = new Image();
                return n3.setAttribute("crossOrigin", "Anonymous"), !p(e5) && (n3.width = e5), !p(i3) && (n3.height = i3), n3.src = t5, new Promise(function(t6) {
                  n3.onload = function() {
                    t6(n3);
                  };
                });
              }, w = {
                width: 300,
                height: 300,
                rotate: 45,
                layout: "default",
                auxiliaryLine: false,
                translatePlacement: "middle",
                contentType: "text",
                content: "hello watermark-js-plus",
                textType: "fill",
                imageWidth: 0,
                imageHeight: 0,
                lineHeight: 30,
                zIndex: 2147483647,
                backgroundPosition: "0 0",
                backgroundRepeat: "repeat",
                fontSize: "20px",
                fontFamily: "sans-serif",
                fontStyle: "",
                fontVariant: "",
                fontColor: "#000",
                fontWeight: "normal",
                filter: "none",
                letterSpacing: "0px",
                wordSpacing: "0px",
                globalAlpha: 0.5,
                mode: "default",
                mutationObserve: true,
                monitorProtection: false,
                movable: false,
                parent: "body",
                onSuccess: function() {
                },
                onBeforeDestroy: function() {
                },
                onDestroyed: function() {
                },
                onObserveError: function() {
                }
              }, x = function(t5) {
                "undefined" != typeof window && t5 && (Object.defineProperty(window, "MutationObserver", {
                  writable: false,
                  configurable: false
                }), Object.defineProperty(window, "requestAnimationFrame", {
                  writable: false,
                  configurable: false
                }));
              }, b = function() {
                function t5(e5, i3) {
                  this.props = e5, this.options = i3, this.canvas = t5.createCanvas(this.options.width, this.options.height), this.recommendOptions = function(t6, e6, i4) {
                    var n3 = t6.getContext("2d");
                    if (null === n3) throw new Error("get context error");
                    n3.font = "".concat(e6.fontStyle, " ").concat(e6.fontVariant, " ").concat(e6.fontWeight, " ").concat(e6.fontSize, " ").concat(e6.fontFamily), n3.filter = e6.filter, n3.letterSpacing = e6.letterSpacing, n3.wordSpacing = e6.wordSpacing, (null == e6 ? void 0 : e6.rotate) && (e6.rotate = (360 - e6.rotate % 360) * (Math.PI / 180)), p(i4.textRowMaxWidth) && (e6.textRowMaxWidth = e6.width);
                    var o2 = {
                      image: {
                        rect: {
                          width: e6.imageWidth,
                          height: e6.imageHeight
                        },
                        position: {
                          x: 0,
                          y: 0
                        }
                      },
                      textLine: {
                        data: [],
                        yOffsetValue: 0
                      },
                      advancedStyleParams: {
                        linear: {
                          x0: 0,
                          x1: 0
                        },
                        radial: {
                          x0: 0,
                          y0: 0,
                          r0: 0,
                          x1: 0,
                          y1: 0,
                          r1: 0
                        },
                        conic: {
                          x: 0,
                          y: 0,
                          startAngle: 0
                        },
                        pattern: {}
                      }
                    };
                    switch (e6.contentType) {
                      case "text":
                        o2.textLine.data = [e6.content];
                        break;
                      case "multi-line-text":
                        o2.textLine.data = function(t7, e7, i5) {
                          for (var n4 = [], o3 = "", a3 = "", r3 = 0, s3 = e7.length; r3 < s3; r3++) "\n" !== (a3 = e7.charAt(r3)) ? (o3 += a3, t7.measureText(o3).width > i5 && (n4.push(o3.substring(0, o3.length - 1)), o3 = "", r3--)) : (n4.push(o3), o3 = "");
                          return n4.push(o3), n4;
                        }(n3, e6.content, e6.textRowMaxWidth);
                    }
                    var a2 = e6.width / 2, r2 = e6.height / 2, s2 = "middle", l2 = "center";
                    switch (p(null == i4 ? void 0 : i4.translateX) || p(null == i4 ? void 0 : i4.translateY) ? (o2.advancedStyleParams.linear.x0 = -e6.width / 2, o2.advancedStyleParams.linear.x1 = e6.width / 2, o2.advancedStyleParams.radial.r0 = 0, o2.advancedStyleParams.radial.r1 = e6.width / 2) : (a2 = null == i4 ? void 0 : i4.translateX, r2 = null == i4 ? void 0 : i4.translateY, s2 = "top", l2 = "left"), i4.translatePlacement) {
                      case "top":
                        a2 = e6.width / 2, r2 = 0, s2 = "top", o2.advancedStyleParams.linear.x0 = -e6.width / 2, o2.advancedStyleParams.linear.x1 = e6.width / 2, o2.advancedStyleParams.radial.y0 = o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.radial.y1 = o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.conic.y = o2.textLine.data.length * e6.lineHeight / 2;
                        break;
                      case "top-start":
                        a2 = 0, r2 = 0, s2 = "top", l2 = "start", o2.advancedStyleParams.linear.x0 = 0, o2.advancedStyleParams.linear.x1 = e6.width, o2.advancedStyleParams.radial.x0 = e6.width / 2, o2.advancedStyleParams.radial.y0 = o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.radial.x1 = e6.width / 2, o2.advancedStyleParams.radial.y1 = o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.conic.x = e6.width / 2, o2.advancedStyleParams.conic.y = o2.textLine.data.length * e6.lineHeight / 2;
                        break;
                      case "top-end":
                        a2 = e6.width, r2 = 0, s2 = "top", l2 = "end", o2.advancedStyleParams.linear.x0 = 0, o2.advancedStyleParams.linear.x1 = -e6.width, o2.advancedStyleParams.radial.x0 = -e6.width / 2, o2.advancedStyleParams.radial.y0 = o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.radial.x1 = -e6.width / 2, o2.advancedStyleParams.radial.y1 = o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.conic.x = -e6.width / 2, o2.advancedStyleParams.conic.y = o2.textLine.data.length * e6.lineHeight / 2;
                        break;
                      case "bottom":
                        a2 = e6.width / 2, r2 = e6.height, s2 = "bottom", o2.advancedStyleParams.linear.x0 = -e6.width / 2, o2.advancedStyleParams.linear.x1 = e6.width / 2, o2.advancedStyleParams.radial.y0 = -o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.radial.y1 = -o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.conic.x = 0, o2.advancedStyleParams.conic.y = -o2.textLine.data.length * e6.lineHeight / 2;
                        break;
                      case "bottom-start":
                        a2 = 0, r2 = e6.height, s2 = "bottom", l2 = "start", o2.advancedStyleParams.linear.x0 = 0, o2.advancedStyleParams.linear.x1 = e6.width, o2.advancedStyleParams.radial.x0 = e6.width / 2, o2.advancedStyleParams.radial.y0 = -o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.radial.x1 = e6.width / 2, o2.advancedStyleParams.radial.y1 = -o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.conic.x = e6.width / 2, o2.advancedStyleParams.conic.y = -o2.textLine.data.length * e6.lineHeight / 2;
                        break;
                      case "bottom-end":
                        a2 = e6.width, r2 = e6.height, s2 = "bottom", l2 = "end", o2.advancedStyleParams.linear.x0 = 0, o2.advancedStyleParams.linear.x1 = -e6.width, o2.advancedStyleParams.radial.x0 = -e6.width / 2, o2.advancedStyleParams.radial.y0 = -o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.radial.x1 = -e6.width / 2, o2.advancedStyleParams.radial.y1 = -o2.textLine.data.length * e6.lineHeight / 2, o2.advancedStyleParams.conic.x = -e6.width / 2, o2.advancedStyleParams.conic.y = -o2.textLine.data.length * e6.lineHeight / 2;
                        break;
                      case "left":
                        a2 = 0, r2 = e6.height / 2, l2 = "start", o2.advancedStyleParams.linear.x0 = 0, o2.advancedStyleParams.linear.x1 = e6.width, o2.advancedStyleParams.radial.x0 = e6.width / 2, o2.advancedStyleParams.radial.x1 = e6.width / 2, o2.advancedStyleParams.conic.x = e6.width / 2, o2.advancedStyleParams.conic.y = 0;
                        break;
                      case "right":
                        a2 = e6.width, r2 = e6.height / 2, l2 = "end", o2.advancedStyleParams.linear.x0 = 0, o2.advancedStyleParams.linear.x1 = -e6.width, o2.advancedStyleParams.radial.x0 = -e6.width / 2, o2.advancedStyleParams.radial.x1 = -e6.width / 2, o2.advancedStyleParams.conic.x = -e6.width / 2, o2.advancedStyleParams.conic.y = 0;
                    }
                    if (e6.translateX = a2, e6.translateY = r2, p(null == i4 ? void 0 : i4.textBaseline) && (e6.textBaseline = s2), p(null == i4 ? void 0 : i4.textAlign) && (e6.textAlign = l2), ["text", "multi-line-text"].includes(e6.contentType)) switch (e6.textBaseline) {
                      case "middle":
                        o2.textLine.yOffsetValue = (o2.textLine.data.length - 1) * e6.lineHeight / 2;
                        break;
                      case "bottom":
                      case "alphabetic":
                      case "ideographic":
                        o2.textLine.yOffsetValue = (o2.textLine.data.length - 1) * e6.lineHeight + (e6.lineHeight - parseInt(e6.fontSize)) / 2;
                        break;
                      case "top":
                      case "hanging":
                        o2.textLine.yOffsetValue = -e6.lineHeight / 2 + parseInt(e6.fontSize) / 2;
                    }
                    return o2;
                  }(this.canvas, this.options, this.props);
                }
                return t5.createCanvas = function(t6, e5) {
                  var i3, n3 = window.devicePixelRatio || 1, o2 = document.createElement("canvas");
                  return o2.width = t6 * n3, o2.height = e5 * n3, o2.style.width = "".concat(t6, "px"), o2.style.height = "".concat(e5, "px"), null === (i3 = o2.getContext("2d")) || void 0 === i3 || i3.setTransform(n3, 0, 0, n3, 0, 0), o2;
                }, t5.clearCanvas = function(t6) {
                  var e5 = t6.getContext("2d");
                  if (null === e5) throw new Error("get context error");
                  e5.restore(), e5.resetTransform(), e5.clearRect(0, 0, t6.width, t6.height);
                  var i3 = window.devicePixelRatio || 1;
                  e5.setTransform(i3, 0, 0, i3, 0, 0);
                }, t5.prototype.getCanvas = function() {
                  return this.canvas;
                }, t5.prototype.clear = function() {
                  t5.clearCanvas(this.canvas);
                }, t5.prototype.draw = function() {
                  var t6 = this, e5 = this.canvas.getContext("2d");
                  if (null === e5) throw new Error("get context error");
                  return this.options.auxiliaryLine && (e5.beginPath(), e5.rect(0, 0, this.options.width, this.options.height), e5.lineWidth = 1, e5.strokeStyle = "#000", e5.stroke(), e5.closePath(), e5.beginPath(), e5.rect(this.options.translateX, this.options.translateY, 1, 1), e5.lineWidth = 1, e5.strokeStyle = "#f00", e5.stroke(), e5.closePath()), this.setStyle(e5), e5.save(), e5.translate(this.options.translateX, this.options.translateY), e5.rotate(this.options.rotate), new Promise(function(i3) {
                    switch (t6.options.contentType) {
                      case "text":
                        t6.drawText(e5, i3);
                        break;
                      case "image":
                        t6.drawImage(e5, i3);
                        break;
                      case "multi-line-text":
                        t6.drawMultiLineText(e5, i3);
                        break;
                      case "rich-text":
                        t6.drawRichText(e5, i3);
                    }
                  });
                }, t5.prototype.setStyle = function(t6) {
                  var e5, i3 = "fillStyle";
                  "stroke" === this.options.textType && (i3 = "strokeStyle");
                  var n3 = this.options.fontColor;
                  if (null === (e5 = this.options) || void 0 === e5 ? void 0 : e5.advancedStyle) switch (this.options.advancedStyle.type) {
                    case "linear":
                      n3 = this.createLinearGradient(t6);
                      break;
                    case "radial":
                      n3 = this.createRadialGradient(t6);
                      break;
                    case "conic":
                      n3 = this.createConicGradient(t6);
                      break;
                    case "pattern":
                      n3 = this.createPattern(t6);
                  }
                  t6[i3] && n3 && (t6[i3] = n3), this.options.textAlign && (t6.textAlign = this.options.textAlign), this.options.textBaseline && (t6.textBaseline = this.options.textBaseline), t6.globalAlpha = this.options.globalAlpha, this.options.shadowStyle && (t6.shadowBlur = y(this.options.shadowStyle.shadowBlur, 0), t6.shadowColor = y(this.options.shadowStyle.shadowColor, "#00000000"), t6.shadowOffsetX = y(this.options.shadowStyle.shadowOffsetX, 0), t6.shadowOffsetY = y(this.options.shadowStyle.shadowOffsetY, 0)), u(this.options.extraDrawFunc) && this.options.extraDrawFunc(t6);
                }, t5.prototype.createLinearGradient = function(t6) {
                  var e5, i3, n3, o2, a2, r2, s2, l2, d2, c2, h2, u2, p2, v2, m2, g2 = t6.createLinearGradient(y(null === (n3 = null === (i3 = null === (e5 = this.options.advancedStyle) || void 0 === e5 ? void 0 : e5.params) || void 0 === i3 ? void 0 : i3.linear) || void 0 === n3 ? void 0 : n3.x0, this.recommendOptions.advancedStyleParams.linear.x0), y(null === (r2 = null === (a2 = null === (o2 = this.options.advancedStyle) || void 0 === o2 ? void 0 : o2.params) || void 0 === a2 ? void 0 : a2.linear) || void 0 === r2 ? void 0 : r2.y0, 0), y(null === (d2 = null === (l2 = null === (s2 = this.options.advancedStyle) || void 0 === s2 ? void 0 : s2.params) || void 0 === l2 ? void 0 : l2.linear) || void 0 === d2 ? void 0 : d2.x1, this.recommendOptions.advancedStyleParams.linear.x1), y(null === (u2 = null === (h2 = null === (c2 = this.options.advancedStyle) || void 0 === c2 ? void 0 : c2.params) || void 0 === h2 ? void 0 : h2.linear) || void 0 === u2 ? void 0 : u2.y1, 0));
                  return null === (m2 = null === (v2 = null === (p2 = this.options) || void 0 === p2 ? void 0 : p2.advancedStyle) || void 0 === v2 ? void 0 : v2.colorStops) || void 0 === m2 || m2.forEach(function(t7) {
                    g2.addColorStop(t7.offset, t7.color);
                  }), g2;
                }, t5.prototype.createConicGradient = function(t6) {
                  var e5, i3, n3, o2, a2, r2, s2, l2, d2, c2, h2, u2, p2, v2, m2, g2 = t6.createConicGradient(y(null === (o2 = null === (n3 = null === (i3 = null === (e5 = this.options) || void 0 === e5 ? void 0 : e5.advancedStyle) || void 0 === i3 ? void 0 : i3.params) || void 0 === n3 ? void 0 : n3.conic) || void 0 === o2 ? void 0 : o2.startAngle, 0), y(null === (l2 = null === (s2 = null === (r2 = null === (a2 = this.options) || void 0 === a2 ? void 0 : a2.advancedStyle) || void 0 === r2 ? void 0 : r2.params) || void 0 === s2 ? void 0 : s2.conic) || void 0 === l2 ? void 0 : l2.x, this.recommendOptions.advancedStyleParams.conic.x), y(null === (u2 = null === (h2 = null === (c2 = null === (d2 = this.options) || void 0 === d2 ? void 0 : d2.advancedStyle) || void 0 === c2 ? void 0 : c2.params) || void 0 === h2 ? void 0 : h2.conic) || void 0 === u2 ? void 0 : u2.y, this.recommendOptions.advancedStyleParams.conic.y));
                  return null === (m2 = null === (v2 = null === (p2 = this.options) || void 0 === p2 ? void 0 : p2.advancedStyle) || void 0 === v2 ? void 0 : v2.colorStops) || void 0 === m2 || m2.forEach(function(t7) {
                    g2.addColorStop(t7.offset, t7.color);
                  }), g2;
                }, t5.prototype.createRadialGradient = function(t6) {
                  var e5, i3, n3, o2, a2, r2, s2, l2, d2, c2, h2, u2, p2, v2, m2, g2, f2, w2, x2, b2, S2, k2, E2, O2, P2, L, C, T = t6.createRadialGradient(y(null === (o2 = null === (n3 = null === (i3 = null === (e5 = this.options) || void 0 === e5 ? void 0 : e5.advancedStyle) || void 0 === i3 ? void 0 : i3.params) || void 0 === n3 ? void 0 : n3.radial) || void 0 === o2 ? void 0 : o2.x0, this.recommendOptions.advancedStyleParams.radial.x0), y(null === (l2 = null === (s2 = null === (r2 = null === (a2 = this.options) || void 0 === a2 ? void 0 : a2.advancedStyle) || void 0 === r2 ? void 0 : r2.params) || void 0 === s2 ? void 0 : s2.radial) || void 0 === l2 ? void 0 : l2.y0, this.recommendOptions.advancedStyleParams.radial.y0), y(null === (u2 = null === (h2 = null === (c2 = null === (d2 = this.options) || void 0 === d2 ? void 0 : d2.advancedStyle) || void 0 === c2 ? void 0 : c2.params) || void 0 === h2 ? void 0 : h2.radial) || void 0 === u2 ? void 0 : u2.r0, this.recommendOptions.advancedStyleParams.radial.r0), y(null === (g2 = null === (m2 = null === (v2 = null === (p2 = this.options) || void 0 === p2 ? void 0 : p2.advancedStyle) || void 0 === v2 ? void 0 : v2.params) || void 0 === m2 ? void 0 : m2.radial) || void 0 === g2 ? void 0 : g2.x1, this.recommendOptions.advancedStyleParams.radial.x1), y(null === (b2 = null === (x2 = null === (w2 = null === (f2 = this.options) || void 0 === f2 ? void 0 : f2.advancedStyle) || void 0 === w2 ? void 0 : w2.params) || void 0 === x2 ? void 0 : x2.radial) || void 0 === b2 ? void 0 : b2.y1, this.recommendOptions.advancedStyleParams.radial.y1), y(null === (O2 = null === (E2 = null === (k2 = null === (S2 = this.options) || void 0 === S2 ? void 0 : S2.advancedStyle) || void 0 === k2 ? void 0 : k2.params) || void 0 === E2 ? void 0 : E2.radial) || void 0 === O2 ? void 0 : O2.r1, this.recommendOptions.advancedStyleParams.radial.r1));
                  return null === (C = null === (L = null === (P2 = this.options) || void 0 === P2 ? void 0 : P2.advancedStyle) || void 0 === L ? void 0 : L.colorStops) || void 0 === C || C.forEach(function(t7) {
                    T.addColorStop(t7.offset, t7.color);
                  }), T;
                }, t5.prototype.createPattern = function(t6) {
                  var e5, i3, n3, o2, a2, r2, s2, l2;
                  return t6.createPattern(null === (o2 = null === (n3 = null === (i3 = null === (e5 = this.options) || void 0 === e5 ? void 0 : e5.advancedStyle) || void 0 === i3 ? void 0 : i3.params) || void 0 === n3 ? void 0 : n3.pattern) || void 0 === o2 ? void 0 : o2.image, (null === (l2 = null === (s2 = null === (r2 = null === (a2 = this.options) || void 0 === a2 ? void 0 : a2.advancedStyle) || void 0 === r2 ? void 0 : r2.params) || void 0 === s2 ? void 0 : s2.pattern) || void 0 === l2 ? void 0 : l2.repetition) || "");
                }, t5.prototype.setText = function(t6, e5) {
                  var i3 = "fillText";
                  "stroke" === this.options.textType && (i3 = "strokeText"), t6[i3] && t6[i3](e5.text, e5.x, e5.y, e5.maxWidth);
                }, t5.prototype.drawText = function(t6, e5) {
                  this.setText(t6, {
                    text: this.options.content,
                    x: 0,
                    y: 0 - this.recommendOptions.textLine.yOffsetValue,
                    maxWidth: this.options.textRowMaxWidth || this.options.width
                  }), e5(t6.canvas);
                }, t5.prototype.drawImage = function(t6, e5) {
                  var i3 = this;
                  f(this.options.image).then(function(n3) {
                    var o2 = i3.getImageRect(n3), a2 = o2.width, r2 = o2.height, s2 = i3.getDrawImagePosition(a2, r2);
                    t6.drawImage(n3, s2.x, s2.y, a2, r2), e5(t6.canvas);
                  });
                }, t5.prototype.drawMultiLineText = function(t6, e5) {
                  var i3 = this, n3 = this.recommendOptions.textLine.data, o2 = this.recommendOptions.textLine.yOffsetValue;
                  n3.forEach(function(e6, n4) {
                    i3.setText(t6, {
                      text: e6,
                      x: 0,
                      y: i3.options.lineHeight * n4 - o2,
                      maxWidth: i3.options.textRowMaxWidth || i3.options.width
                    });
                  }), e5(t6.canvas);
                }, t5.prototype.drawRichText = function(t6, e5) {
                  return d(this, void 0, void 0, function() {
                    var i3, n3 = this;
                    return c(this, function(o2) {
                      switch (o2.label) {
                        case 0:
                          return [4, m(t6, this.options)];
                        case 1:
                          return i3 = o2.sent(), f((a2 = i3.element, r2 = a2.outerHTML.replace(/<(img|br|input|hr|embed)(.*?)>/g, "<$1$2/>").replace(/\n/g, "").replace(/\t/g, "").replace(/#/g, "%23"), "data:image/svg+xml;charset=utf-8,".concat(r2)), i3.width, i3.height).then(function(i4) {
                            var o3 = n3.getDrawImagePosition(i4.width, i4.height);
                            t6.drawImage(i4, o3.x, o3.y, i4.width, i4.height), e5(t6.canvas);
                          }), [2];
                      }
                      var a2, r2;
                    });
                  });
                }, t5.prototype.getImageRect = function(t6) {
                  var e5 = {
                    width: this.options.imageWidth || 0,
                    height: this.options.imageHeight || 0
                  };
                  switch (true) {
                    case (0 !== e5.width && 0 === e5.height):
                      e5.height = e5.width * t6.height / t6.width;
                      break;
                    case (0 === e5.width && 0 !== e5.height):
                      e5.width = e5.height * t6.width / t6.height;
                      break;
                    case (0 === e5.width && 0 === e5.height):
                      e5.width = t6.width, e5.height = t6.height;
                  }
                  return e5;
                }, t5.prototype.getDrawImagePosition = function(t6, e5) {
                  var i3, n3, o2 = {
                    x: -t6 / 2,
                    y: -e5 / 2
                  };
                  switch (this.options.translatePlacement) {
                    case "top":
                      o2.x = -t6 / 2, o2.y = 0;
                      break;
                    case "top-start":
                      o2.x = 0, o2.y = 0;
                      break;
                    case "top-end":
                      o2.x = -t6, o2.y = 0;
                      break;
                    case "bottom":
                      o2.x = -t6 / 2, o2.y = -e5;
                      break;
                    case "bottom-start":
                      o2.x = 0, o2.y = -e5;
                      break;
                    case "bottom-end":
                      o2.x = -t6, o2.y = -e5;
                      break;
                    case "left":
                      o2.x = 0, o2.y = -e5 / 2;
                      break;
                    case "right":
                      o2.x = -t6, o2.y = -e5 / 2;
                  }
                  return !p(null === (i3 = this.props) || void 0 === i3 ? void 0 : i3.translateX) && (o2.x = 0), !p(null === (n3 = this.props) || void 0 === n3 ? void 0 : n3.translateY) && (o2.y = 0), o2;
                }, t5;
              }(), S = function() {
                function t5(t6, e5) {
                  var i3, n3, o2, a2, r2, s2;
                  this.options = t6, this.partialWidth = this.options.width, this.partialHeight = this.options.height, this.rows = (null === (i3 = this.options.gridLayoutOptions) || void 0 === i3 ? void 0 : i3.rows) || 1, this.cols = (null === (n3 = this.options.gridLayoutOptions) || void 0 === n3 ? void 0 : n3.cols) || 1, this.matrix = (null === (o2 = this.options.gridLayoutOptions) || void 0 === o2 ? void 0 : o2.matrix) || (r2 = this.rows, s2 = this.cols, Array.from({
                    length: r2
                  }, function() {
                    return new Array(s2).fill(1);
                  })), this.gap = (null === (a2 = this.options.gridLayoutOptions) || void 0 === a2 ? void 0 : a2.gap) || [0, 0], this.partialCanvas = e5;
                }
                return t5.prototype.draw = function() {
                  var t6, e5, i3, n3, o2, a2, r2, s2, l2 = b.createCanvas((null === (t6 = this.options.gridLayoutOptions) || void 0 === t6 ? void 0 : t6.width) || this.partialWidth * this.cols + this.gap[0] * this.cols, (null === (e5 = this.options.gridLayoutOptions) || void 0 === e5 ? void 0 : e5.height) || this.partialHeight * this.rows + this.gap[1] * this.rows), d2 = l2.getContext("2d");
                  (null === (i3 = this.options.gridLayoutOptions) || void 0 === i3 ? void 0 : i3.backgroundImage) && (null == d2 || d2.drawImage(null === (n3 = this.options.gridLayoutOptions) || void 0 === n3 ? void 0 : n3.backgroundImage, 0, 0, null === (o2 = this.options.gridLayoutOptions) || void 0 === o2 ? void 0 : o2.width, null === (a2 = this.options.gridLayoutOptions) || void 0 === a2 ? void 0 : a2.height));
                  for (var c2 = 0; c2 < this.rows; c2++) for (var h2 = 0; h2 < this.cols; h2++) (null === (s2 = null === (r2 = this.matrix) || void 0 === r2 ? void 0 : r2[c2]) || void 0 === s2 ? void 0 : s2[h2]) && (null == d2 || d2.drawImage(this.partialCanvas, this.partialWidth * h2 + this.gap[0] * h2, this.partialHeight * c2 + this.gap[1] * c2, this.partialWidth, this.partialHeight));
                  return l2;
                }, t5;
              }(), k = function(t5, e5) {
                return "grid" === t5.layout ? new S(t5, e5).draw() : e5;
              }, E = function() {
                function t5(t6) {
                  void 0 === t6 && (t6 = {}), this.parentElement = document.body, this.isCreating = false, this.props = t6, this.options = l(l({}, w), t6), this.changeParentElement(this.options.parent), this.watermarkCanvas = new b(this.props, this.options), x(this.options.monitorProtection);
                }
                return t5.prototype.changeOptions = function() {
                  return d(this, arguments, void 0, function(t6, e5, i3) {
                    return void 0 === t6 && (t6 = {}), void 0 === e5 && (e5 = "overwrite"), void 0 === i3 && (i3 = true), c(this, function(n3) {
                      switch (n3.label) {
                        case 0:
                          return this.initConfigData(t6, e5), x(this.options.monitorProtection), i3 ? (this.remove(), [4, this.create()]) : [3, 2];
                        case 1:
                          n3.sent(), n3.label = 2;
                        case 2:
                          return [2];
                      }
                    });
                  });
                }, t5.prototype.create = function() {
                  return d(this, void 0, void 0, function() {
                    var t6, e5, i3, n3, o2, a2, r2, s2, l2, d2, u2, v2;
                    return c(this, function(c2) {
                      switch (c2.label) {
                        case 0:
                          return this.isCreating ? [2] : (this.isCreating = true, this.validateUnique() && this.validateContent() ? (t6 = p(this.watermarkDom), [4, null === (a2 = this.watermarkCanvas) || void 0 === a2 ? void 0 : a2.draw()]) : (this.isCreating = false, [2]));
                        case 1:
                          if (c2.sent(), this.layoutCanvas = k(this.options, null === (r2 = this.watermarkCanvas) || void 0 === r2 ? void 0 : r2.getCanvas()), e5 = h(this.layoutCanvas), null === (s2 = this.watermarkCanvas) || void 0 === s2 || s2.clear(), this.watermarkDom = document.createElement("div"), i3 = document.createElement("div"), this.watermarkDom.__WATERMARK__ = "watermark", this.watermarkDom.__WATERMARK__INSTANCE__ = this, n3 = this.checkParentElementType(), this.watermarkDom.style.cssText = "\n      z-index:".concat(this.options.zIndex, "!important;display:block!important;visibility:visible!important;transform:none!important;scale:none!important;\n      ").concat("custom" === n3 ? "top:0!important;bottom:0!important;left:0!important;right:0!important;height:100%!important;pointer-events:none!important;position:absolute!important;" : "position:relative!important;", "\n    "), o2 = function(t7) {
                            var e6, i4, n4;
                            if ("grid" === t7.layout) {
                              var o3 = (null === (e6 = t7.gridLayoutOptions) || void 0 === e6 ? void 0 : e6.cols) || 1, a3 = (null === (i4 = t7.gridLayoutOptions) || void 0 === i4 ? void 0 : i4.rows) || 1, r3 = (null === (n4 = t7.gridLayoutOptions) || void 0 === n4 ? void 0 : n4.gap) || [0, 0];
                              return [t7.width * o3 + r3[0] * o3, t7.height * a3 + r3[1] * a3];
                            }
                            return [t7.width, t7.height];
                          }(this.options), i3.style.cssText = "\n      display:block!important;visibility:visible!important;pointer-events:none;top:0;bottom:0;left:0;right:0;transform:none!important;scale:none!important;\n      position:".concat("root" === n3 ? "fixed" : "absolute", "!important;-webkit-print-color-adjust:exact!important;width:100%!important;height:100%!important;\n      z-index:").concat(this.options.zIndex, "!important;background-image:url(").concat(e5, ")!important;background-repeat:").concat(this.options.backgroundRepeat, "!important;\n      background-size:").concat(o2[0], "px ").concat(o2[1], "px!important;background-position:").concat(this.options.backgroundPosition, ";\n      ").concat(this.options.movable ? "animation: 200s ease 0s infinite normal none running watermark !important;" : "", "\n    "), this.watermarkDom.appendChild(i3), this.parentElement.appendChild(this.watermarkDom), this.options.mutationObserve) try {
                            this.bindMutationObserve();
                          } catch (t7) {
                            null === (d2 = (l2 = this.options).onObserveError) || void 0 === d2 || d2.call(l2);
                          }
                          return t6 && (null === (v2 = (u2 = this.options).onSuccess) || void 0 === v2 || v2.call(u2)), this.isCreating = false, [2];
                      }
                    });
                  });
                }, t5.prototype.destroy = function() {
                  this.remove(), this.watermarkDom = void 0;
                }, t5.prototype.check = function() {
                  return d(this, void 0, void 0, function() {
                    return c(this, function(t6) {
                      return [2, this.parentElement.contains(this.watermarkDom)];
                    });
                  });
                }, t5.prototype.remove = function() {
                  var t6, e5, i3, n3, o2, a2, r2, s2;
                  null === (e5 = (t6 = this.options).onBeforeDestroy) || void 0 === e5 || e5.call(t6), null === (i3 = this.observer) || void 0 === i3 || i3.disconnect(), null === (n3 = this.parentObserve) || void 0 === n3 || n3.disconnect(), this.unbindCheckWatermarkElementEvent(), null === (a2 = null === (o2 = this.watermarkDom) || void 0 === o2 ? void 0 : o2.parentNode) || void 0 === a2 || a2.removeChild(this.watermarkDom), null === (s2 = (r2 = this.options).onDestroyed) || void 0 === s2 || s2.call(r2);
                }, t5.prototype.initConfigData = function(t6, e5) {
                  var i3 = this;
                  void 0 === e5 && (e5 = "overwrite"), "append" === e5 ? Object.keys(t6).forEach(function(e6) {
                    i3.props && (i3.props[e6] = t6[e6]);
                  }) : this.props = t6, this.options = l(l({}, w), this.props), this.changeParentElement(this.options.parent), this.watermarkCanvas = new b(this.props, this.options);
                }, t5.prototype.changeParentElement = function(t6) {
                  if ("string" == typeof t6) {
                    var e5 = document.querySelector(t6);
                    e5 && (this.parentElement = e5);
                  } else this.parentElement = t6;
                  this.parentElement || console.error("[WatermarkJsPlus]: please pass a valid parent element.");
                }, t5.prototype.validateUnique = function() {
                  var t6 = true;
                  return Array.from(this.parentElement.childNodes).forEach(function(e5) {
                    t6 && Object.hasOwnProperty.call(e5, "__WATERMARK__") && (t6 = false);
                  }), t6;
                }, t5.prototype.validateContent = function() {
                  switch (this.options.contentType) {
                    case "image":
                      return Object.hasOwnProperty.call(this.options, "image");
                    case "multi-line-text":
                    case "rich-text":
                    case "text":
                      return this.options.content.length > 0;
                  }
                }, t5.prototype.checkParentElementType = function() {
                  return ["html", "body"].includes(this.parentElement.tagName.toLocaleLowerCase()) ? "root" : "custom";
                }, t5.prototype.checkWatermarkElement = function() {
                  return d(this, void 0, void 0, function() {
                    return c(this, function(t6) {
                      switch (t6.label) {
                        case 0:
                          return this.parentElement.contains(this.watermarkDom) ? [3, 2] : (this.remove(), [4, this.create()]);
                        case 1:
                          t6.sent(), t6.label = 2;
                        case 2:
                          return this.bindCheckWatermarkElementEvent(), [2];
                      }
                    });
                  });
                }, t5.prototype.bindMutationObserve = function() {
                  var t6 = this;
                  this.watermarkDom && (this.bindCheckWatermarkElementEvent(), this.observer = new MutationObserver(function(e5) {
                    return d(t6, void 0, void 0, function() {
                      return c(this, function(t7) {
                        switch (t7.label) {
                          case 0:
                            return e5.length > 0 ? (this.remove(), [4, this.create()]) : [3, 2];
                          case 1:
                            t7.sent(), t7.label = 2;
                          case 2:
                            return [2];
                        }
                      });
                    });
                  }), this.observer.observe(this.watermarkDom, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    characterData: true
                  }), this.parentObserve = new MutationObserver(function(e5) {
                    return d(t6, void 0, void 0, function() {
                      var t7, i3, n3, o2;
                      return c(this, function(a2) {
                        switch (a2.label) {
                          case 0:
                            t7 = 0, i3 = e5, a2.label = 1;
                          case 1:
                            return t7 < i3.length ? (null == (n3 = i3[t7]) ? void 0 : n3.target) === this.watermarkDom || (null === (o2 = null == n3 ? void 0 : n3.removedNodes) || void 0 === o2 ? void 0 : o2[0]) === this.watermarkDom || "childList" === n3.type && n3.target === this.parentElement && n3.target.lastChild !== this.watermarkDom ? (this.remove(), [4, this.create()]) : [3, 3] : [3, 4];
                          case 2:
                            a2.sent(), a2.label = 3;
                          case 3:
                            return t7++, [3, 1];
                          case 4:
                            return [2];
                        }
                      });
                    });
                  }), this.parentObserve.observe(this.parentElement, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    characterData: true
                  }));
                }, t5.prototype.bindCheckWatermarkElementEvent = function() {
                  this.unbindCheckWatermarkElementEvent(), this.checkWatermarkElementRequestID = requestAnimationFrame(this.checkWatermarkElement.bind(this));
                }, t5.prototype.unbindCheckWatermarkElementEvent = function() {
                  p(this.checkWatermarkElementRequestID) || cancelAnimationFrame(this.checkWatermarkElementRequestID);
                }, t5;
              }(), O = (function(t5) {
                function e5(e6) {
                  return void 0 === e6 && (e6 = {}), t5.call(this, l(l({}, e6), {
                    globalAlpha: 5e-3,
                    mode: "blind"
                  })) || this;
                }
                (function(t6, e6) {
                  if ("function" != typeof e6 && null !== e6) throw new TypeError("Class extends value " + String(e6) + " is not a constructor or null");
                  function i3() {
                    this.constructor = t6;
                  }
                  s(t6, e6), t6.prototype = null === e6 ? Object.create(e6) : (i3.prototype = e6.prototype, new i3());
                })(e5, t5), e5.decode = function(t6) {
                  var e6 = t6.url, i3 = void 0 === e6 ? "" : e6, n3 = t6.fillColor, o2 = void 0 === n3 ? "#000" : n3, a2 = t6.compositeOperation, r2 = void 0 === a2 ? "color-burn" : a2, s2 = t6.mode, l2 = void 0 === s2 ? "canvas" : s2, d2 = t6.compositeTimes, c2 = void 0 === d2 ? 3 : d2, p2 = t6.onSuccess;
                  if (i3 && "canvas" === l2) {
                    var v2 = new Image();
                    v2.src = i3, v2.addEventListener("load", function() {
                      var t7 = v2.width, e7 = v2.height, i4 = b.createCanvas(t7, e7), n4 = i4.getContext("2d");
                      if (!n4) throw new Error("get context error");
                      n4.drawImage(v2, 0, 0, t7, e7), n4.globalCompositeOperation = r2, n4.fillStyle = o2;
                      for (var a3 = 0; a3 < c2; a3++) n4.fillRect(0, 0, t7, e7);
                      var s3 = h(i4);
                      u(p2) && (null == p2 || p2(s3));
                    });
                  }
                };
              }(E), function() {
                function t5(t6) {
                  var e5;
                  void 0 === t6 && (t6 = {}), this.drew = false, this.props = t6, this.options = l(l({}, w), t6), this.watermarkCanvas = new b(this.props, this.options), this.originalSrc = null === (e5 = this.props.dom) || void 0 === e5 ? void 0 : e5.src, this.backgroundImage = this.getBackgroundImage();
                }
                return t5.prototype.create = function() {
                  return d(this, void 0, void 0, function() {
                    var t6, e5, i3, n3, o2;
                    return c(this, function(a2) {
                      switch (a2.label) {
                        case 0:
                          return this.drew ? [2] : [4, null === (t6 = this.watermarkCanvas) || void 0 === t6 ? void 0 : t6.draw()];
                        case 1:
                          return a2.sent(), this.options.layout = "grid", this.options.gridLayoutOptions = l(l({}, this.options.gridLayoutOptions), {
                            width: null === (e5 = this.backgroundImage) || void 0 === e5 ? void 0 : e5.width,
                            height: null === (i3 = this.backgroundImage) || void 0 === i3 ? void 0 : i3.height,
                            backgroundImage: this.backgroundImage
                          }), this.layoutCanvas = k(this.options, null === (n3 = this.watermarkCanvas) || void 0 === n3 ? void 0 : n3.getCanvas()), this.options.dom.src = h(this.layoutCanvas), null === (o2 = this.watermarkCanvas) || void 0 === o2 || o2.clear(), this.drew = true, [2];
                      }
                    });
                  });
                }, t5.prototype.destroy = function() {
                  this.options.dom.src = this.originalSrc, this.drew = false;
                }, t5.prototype.getBackgroundImage = function() {
                  if (this.options.dom) return this.options.dom;
                }, t5;
              }());
              const P = (t5, i3 = "block", n3) => {
                if (t5 === e4.LICENSE_STATUS.Valid || t5 === e4.LICENSE_STATUS.ExpiredSubscriptionGrace) return;
                const o2 = new ("image" === i3 ? O : E)(__spreadValues({
                  content: "Trial version"
                }, n3));
                return o2.create(), o2;
              };
            })(), n2;
          })(), t2.exports = e2();
        }
      }, e = {};
      function i(n2) {
        var o = e[n2];
        if (void 0 !== o) return o.exports;
        var a = e[n2] = {
          exports: {}
        };
        return t[n2].call(a.exports, a, a.exports, i), a.exports;
      }
      i.n = (t2) => {
        var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
        return i.d(e2, {
          a: e2
        }), e2;
      }, i.d = (t2, e2) => {
        for (var n2 in e2) i.o(e2, n2) && !i.o(t2, n2) && Object.defineProperty(t2, n2, {
          enumerable: true,
          get: e2[n2]
        });
      }, i.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2);
      var n = {};
      return (() => {
        "use strict";
        i.d(n, {
          default: () => d
        });
        var t2 = i(600);
        const e2 = new t2.LicenseVerifier({
          scopes: [{
            name: "qr-border-plugin"
          }],
          organization: "qr-code-styling"
        }), o = new t2.LicenseInfo({
          organization: "qr-code-styling"
        });
        var a, r;
        !function(t3) {
          t3.top = "top", t3.bottom = "bottom", t3.left = "left", t3.right = "right";
        }(a || (a = {})), function(t3) {
          t3.text = "text", t3.image = "image";
        }(r || (r = {}));
        class s {
          window;
          libOptions;
          extensionOptions;
          svg;
          constructor(t3, e3, i2) {
            this.window = e3?.jsdom ? new e3.jsdom("", {
              resources: "usable"
            }).window : window, this.svg = t3, this.libOptions = e3, this.extensionOptions = i2, this.verifyKey(), this.setup();
          }
          setup = () => {
            const {
              width: t3,
              height: e3
            } = this.libOptions, i2 = this.createRect(), n2 = this.generateDefaultAttributes({
              width: t3,
              height: e3,
              options: this.extensionOptions,
              round: this.extensionOptions.round
            });
            if (this.setAttributes(i2, n2), this.svg.appendChild(i2), this.extensionOptions.borderInner) {
              const i3 = this.createRect(), n3 = this.generateDefaultAttributes({
                width: t3,
                height: e3,
                options: this.extensionOptions.borderInner,
                round: this.extensionOptions.round
              });
              n3.x = n3.x - this.extensionOptions.borderInner.thickness + this.extensionOptions.thickness, n3.y = n3.y - this.extensionOptions.borderInner.thickness + this.extensionOptions.thickness, n3.width = n3.width + 2 * (this.extensionOptions.borderInner.thickness - this.extensionOptions.thickness), n3.height = n3.height + 2 * (this.extensionOptions.borderInner.thickness - this.extensionOptions.thickness), n3.rx = Math.max(0, n3.rx + this.extensionOptions.borderInner.thickness - this.extensionOptions.thickness), this.setAttributes(i3, n3), this.svg.appendChild(i3);
            }
            if (this.extensionOptions.borderOuter) {
              const i3 = this.createRect(), n3 = this.generateDefaultAttributes({
                width: t3,
                height: e3,
                options: this.extensionOptions.borderOuter,
                round: this.extensionOptions.round
              });
              this.setAttributes(i3, n3), this.svg.appendChild(i3);
            }
            let o2;
            for (o2 in this.extensionOptions.decorations) {
              const i3 = this.extensionOptions.decorations[o2];
              let n3;
              "image" === i3.type ? n3 = this.addImage : "text" === i3.type && (n3 = this.addText), n3?.({
                svg: this.svg,
                position: o2,
                thickness: this.extensionOptions.thickness,
                value: i3.value,
                style: i3.style,
                height: e3,
                width: t3,
                round: this.extensionOptions.round
              });
            }
          };
          createRect = () => this.window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
          setAttributes = (t3, e3) => (Object.keys(e3).forEach((i2) => {
            t3.setAttribute(i2, `${e3[i2]}`);
          }), t3);
          generateDefaultAttributes = ({
            width: t3 = 0,
            height: e3 = 0,
            options: i2,
            round: n2
          }) => {
            const o2 = Math.min(t3, e3);
            return {
              fill: "none",
              x: (t3 - o2 + i2.thickness) / 2,
              y: (e3 - o2 + i2.thickness) / 2,
              width: o2 - i2.thickness,
              height: o2 - i2.thickness,
              stroke: i2.color,
              "stroke-width": i2.thickness,
              "stroke-dasharray": i2.dasharray,
              rx: Math.max(0, o2 / 2 * n2 - i2.thickness / 2)
            };
          };
          createTextPath = ({
            position: t3,
            rotate: e3,
            flip: i2,
            thickness: n2,
            height: o2,
            width: a2,
            round: r2
          }) => {
            const s2 = Math.min(a2, o2), l2 = this.window.document.createElementNS("http://www.w3.org/2000/svg", "path"), d2 = (s2 - n2) / 2 * r2;
            let c = "";
            return e3 && (c += `rotate(${e3},${a2 / 2},${o2 / 2}) `), i2 && (c += `scale(1 -1) translate(0 ${-o2}) `), l2.setAttribute("id", `${t3}-text-path`), l2.setAttribute("transform", c), l2.setAttribute("d", `
      M${(a2 - s2 + n2) / 2},${(o2 - s2 + n2) / 2 + d2}
      a${d2},${d2} 0 0 1 ${d2},${-d2}
      h${s2 - n2 - 2 * d2}
      a${d2},${d2} 0 0 1 ${d2},${d2}
    `), l2;
          };
          createText = ({
            value: t3,
            rotate: e3,
            position: i2,
            style: n2
          }) => {
            const o2 = this.window.document.createElementNS("http://www.w3.org/2000/svg", "text"), a2 = this.window.document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            return a2.setAttribute("href", `#${i2}-text-path`), a2.setAttribute("text-anchor", "middle"), a2.setAttribute("startOffset", "50%"), a2.textContent = t3, a2.setAttribute("alignment-baseline", "central"), o2.setAttribute("rotate", `-${e3}`), o2.setAttribute("style", n2 || ""), o2.appendChild(a2), o2;
          };
          addText = ({
            thickness: t3,
            value: e3,
            svg: i2,
            position: n2,
            height: o2 = 0,
            width: a2 = 0,
            round: r2,
            style: s2
          }) => {
            let l2 = 0, d2 = false;
            "right" === n2 ? l2 = 90 : "bottom" === n2 ? d2 = true : "left" === n2 && (l2 = 90, d2 = true), i2.getElementsByTagName("defs")[0].appendChild(this.createTextPath({
              position: n2,
              rotate: l2,
              flip: d2,
              height: o2,
              width: a2,
              round: r2,
              thickness: t3
            })), i2.appendChild(this.createText({
              position: n2,
              rotate: l2,
              value: e3,
              style: s2
            }));
          };
          addImage = ({
            thickness: t3,
            value: e3,
            svg: i2,
            position: n2,
            height: o2 = 0,
            width: r2 = 0,
            style: s2
          }) => {
            const l2 = this.window.document.createElementNS("http://www.w3.org/2000/svg", "image"), d2 = Math.min(r2, o2);
            let c = (r2 - d2 + t3) / 2, h = (o2 - d2 + t3) / 2;
            n2 === a.top ? c += (d2 - t3) / 2 : n2 === a.right ? (c += d2 - t3, h += (d2 - t3) / 2) : n2 === a.bottom ? (c += (d2 - t3) / 2, h += d2 - t3) : n2 === a.left && (h += (d2 - t3) / 2), l2.setAttribute("href", e3 || ""), l2.setAttribute("x", `${c}`), l2.setAttribute("y", `${h}`), l2.setAttribute("style", s2), i2.appendChild(l2);
          };
          static setKey = o.setLicenseKey.bind(o);
          verifyKey = () => {
            this.svg.parentElement && (0, t2.showWatermark)(e2.verifyLicense({
              licenseKey: o.getLicenseKey(),
              packageScope: "qr-border-plugin"
            }).status, "block", {
              parent: this.svg.parentElement,
              width: this.libOptions.width,
              height: this.libOptions.height,
              backgroundRepeat: "no-repeat",
              rotate: 0
            });
          };
        }
        const l = (t3) => (e3, i2) => {
          new s(e3, i2, t3);
        };
        l.setKey = s.setKey;
        const d = l;
      })(), n.default;
    })());
  }
});
export default require_build();
//# sourceMappingURL=qr-border-plugin.js.map

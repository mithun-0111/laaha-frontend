var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: () => Reflect.ownKeys(envAsyncLocalStorage.getStore()),
        getOwnPropertyDescriptor: (_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args),
        get: (_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property),
        set: (_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value)
      }
    )
  };
  globalThis[Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: () => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()),
      getOwnPropertyDescriptor: (_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args),
      get: (_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property),
      set: (_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value)
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var U = Object.defineProperty;
var ae = Object.getOwnPropertyDescriptor;
var ne = Object.getOwnPropertyNames;
var re = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var T = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "T");
var N = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "N");
var oe = /* @__PURE__ */ __name((e, t, a, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of ne(t))
      !ie.call(e, r) && r !== a && U(e, r, { get: () => t[r], enumerable: !(s = ae(t, r)) || s.enumerable });
  return e;
}, "oe");
var V = /* @__PURE__ */ __name((e, t, a) => (a = e != null ? se(re(e)) : {}, oe(t || !e || !e.__esModule ? U(a, "default", { value: e, enumerable: true }) : a, e)), "V");
var g;
var l = T(() => {
  g = { collectedLocales: [] };
});
var f;
var u = T(() => {
  f = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(.*).json$", dest: "/$1", override: true, continue: true, has: [{ type: "header", key: "x-nextjs-data" }] }, { src: "^/index(?:/)?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/", override: true, continue: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|.*\\..*).*))(.json)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "82d72e568abce5e995f3510e42ea00e2" }], middlewarePath: "src/middleware", middlewareRawSrc: ["/((?!_next|.*\\..*).*)"], override: true }, { src: "^/$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/oXdyTFbyaLcRy3_BPrIkx/index.json", continue: true, override: true }, { src: "^/((?!_next/)(?:.*[^/]|.*))/?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/oXdyTFbyaLcRy3_BPrIkx/$1.json", continue: true, override: true }, { src: "^/?$", has: [{ type: "header", key: "rsc" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(.*).json$", dest: "/$1", continue: true, has: [{ type: "header", key: "x-nextjs-data" }] }, { src: "^/index(?:/)?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/", continue: true }, { src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media)/.+$", status: 404, check: true, dest: "$0" }], rewrite: [{ src: "^/$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/oXdyTFbyaLcRy3_BPrIkx/index.json", continue: true }, { src: "^/((?!_next/)(?:.*[^/]|.*))/?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/oXdyTFbyaLcRy3_BPrIkx/$1.json", continue: true }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(?<nxtPlocale>[^/]+?)(?:/)?.json$", dest: "/[locale]?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(?<nxtPlocale>[^/]+?)/api/disable\\-draft(?:/)?.json$", dest: "/[locale]/api/disable-draft?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(?<nxtPlocale>[^/]+?)/api/draft(?:/)?.json$", dest: "/[locale]/api/draft?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(?<nxtPlocale>[^/]+?)/api/revalidate(?:/)?.json$", dest: "/[locale]/api/revalidate?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>.+?)(?:/)?.json$", dest: "/[locale]/[...slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/[locale].rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)(?:/)?$", dest: "/[locale]?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/api/disable\\-draft(?:\\.rsc)(?:/)?$", dest: "/[locale]/api/disable-draft.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/api/disable\\-draft(?:/)?$", dest: "/[locale]/api/disable-draft?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/api/draft(?:\\.rsc)(?:/)?$", dest: "/[locale]/api/draft.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/api/draft(?:/)?$", dest: "/[locale]/api/draft?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/api/revalidate(?:\\.rsc)(?:/)?$", dest: "/[locale]/api/revalidate.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/api/revalidate(?:/)?$", dest: "/[locale]/api/revalidate?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>.+?)(?:\\.rsc)(?:/)?$", dest: "/[locale]/[...slug].rsc?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>.+?)(?:/)?$", dest: "/[locale]/[...slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(.*).json$", headers: { "x-nextjs-matched-path": "/$1" }, continue: true, override: true }, { src: "^/_next/data/oXdyTFbyaLcRy3_BPrIkx/(.*).json$", dest: "__next_data_catchall" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|oXdyTFbyaLcRy3_BPrIkx)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [{ hostname: "^(?:^(?:laaha\\-org\\.ddev\\.site)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }], localPatterns: [{ pathname: "^(?:\\/assets\\/images(?:\\/(?!\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)|$))$", search: "" }, { pathname: "^(?:\\/_next\\/static\\/media(?:\\/(?!\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)|$))$", search: "" }], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "inline" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "__next_data_catchall.json": { path: "__next_data_catchall", contentType: "application/json" } }, framework: { version: "14.2.15" }, crons: [] };
});
var m;
var d = T(() => {
  m = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/__next_data_catchall.json": { type: "override", path: "/__next_data_catchall.json", headers: { "content-type": "application/json" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/chunks/188-923c26e3ff1f8cf3.js": { type: "static" }, "/_next/static/chunks/30-5448846918c727b2.js": { type: "static" }, "/_next/static/chunks/480-21aee840a191b5f3.js": { type: "static" }, "/_next/static/chunks/738-0f9a68f32bbdc8cd.js": { type: "static" }, "/_next/static/chunks/app/[locale]/[...slug]/page-bf675955e36cb7c2.js": { type: "static" }, "/_next/static/chunks/app/[locale]/layout-35e0752939692b63.js": { type: "static" }, "/_next/static/chunks/app/[locale]/page-83c97bf2b6af6993.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-a2ef3f698acccdbb.js": { type: "static" }, "/_next/static/chunks/fd9d1056-596a8d76c47695b1.js": { type: "static" }, "/_next/static/chunks/framework-f66176bb897dc684.js": { type: "static" }, "/_next/static/chunks/main-66a9f582e334d225.js": { type: "static" }, "/_next/static/chunks/main-app-f52b9ade7d6725b7.js": { type: "static" }, "/_next/static/chunks/pages/_app-72b849fbd24ac258.js": { type: "static" }, "/_next/static/chunks/pages/_error-7ba65e1336b92748.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/webpack-58894c314e6c1e94.js": { type: "static" }, "/_next/static/css/0947d6b138729feb.css": { type: "static" }, "/_next/static/css/56d6604242d7ed6e.css": { type: "static" }, "/_next/static/css/c95354cf8081cf46.css": { type: "static" }, "/_next/static/css/f761c99e2b5a5a94.css": { type: "static" }, "/_next/static/media/18bf396c865eea80-s.woff2": { type: "static" }, "/_next/static/media/1a3ad277653d1f78-s.woff2": { type: "static" }, "/_next/static/media/205af106bef5c7f2-s.p.woff2": { type: "static" }, "/_next/static/media/27b355da18abd23f-s.woff2": { type: "static" }, "/_next/static/media/2967033ad4bbca2a-s.p.woff2": { type: "static" }, "/_next/static/media/2a6285e056ff5bbd-s.p.woff2": { type: "static" }, "/_next/static/media/4b776a0847c1bb83-s.woff2": { type: "static" }, "/_next/static/media/95cd1b93e95c6987-s.woff2": { type: "static" }, "/_next/static/media/UniversLTStd-Bold.e9b2ada6.otf": { type: "static" }, "/_next/static/media/UniversLTStd.0b9255ca.otf": { type: "static" }, "/_next/static/media/a9455e641565216e-s.p.woff2": { type: "static" }, "/_next/static/media/dc4449652f81283d-s.woff2": { type: "static" }, "/_next/static/media/e2b947df7871171b-s.woff2": { type: "static" }, "/_next/static/media/e63de21aa07dc8b1-s.woff2": { type: "static" }, "/_next/static/oXdyTFbyaLcRy3_BPrIkx/_buildManifest.js": { type: "static" }, "/_next/static/oXdyTFbyaLcRy3_BPrIkx/_ssgManifest.js": { type: "static" }, "/assets/images/video-icon.png": { type: "static" }, "/favicon.ico": { type: "static" }, "/locales/ar.json": { type: "static" }, "/locales/en.json": { type: "static" }, "/locales/es.json": { type: "static" }, "/locales/ku.json": { type: "static" }, "/locales/my.json": { type: "static" }, "/locales/uk.json": { type: "static" }, "/robots.txt": { type: "static" }, "/[locale]/[...slug]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[...slug].func.js" }, "/[locale]/[...slug].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[...slug].func.js" }, "/[locale]/api/disable-draft": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/api/disable-draft.func.js" }, "/[locale]/api/disable-draft.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/api/disable-draft.func.js" }, "/[locale]/api/draft": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/api/draft.func.js" }, "/[locale]/api/draft.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/api/draft.func.js" }, "/[locale]/api/revalidate": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/api/revalidate.func.js" }, "/[locale]/api/revalidate.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/api/revalidate.func.js" }, "/[locale]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale].func.js" }, "/[locale].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale].func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/__next_data_catchall": { type: "override", path: "/__next_data_catchall.json", headers: { "content-type": "application/json" } }, "src/middleware": { type: "middleware", entrypoint: "__next-on-pages-dist__/functions/src/middleware.func.js" } };
});
var $ = N((Ge, F) => {
  "use strict";
  l();
  u();
  d();
  function x(e, t) {
    e = String(e || "").trim();
    let a = e, s, r = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      s = e[0];
      let o = e.lastIndexOf(s);
      r += e.substring(o + 1), e = e.substring(1, o);
    }
    let n = 0;
    return e = ue(e, (o) => {
      if (/^\(\?[P<']/.test(o)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(o);
        if (!c)
          throw new Error(`Failed to extract named captures from ${JSON.stringify(o)}`);
        let h = o.substring(c[0].length, o.length - 1);
        return t && (t[n] = c[1]), n++, `(${h})`;
      }
      return o.substring(0, 3) === "(?:" || n++, o;
    }), e = e.replace(/\[:([^:]+):\]/g, (o, c) => x.characterClasses[c] || o), new x.PCRE(e, r, a, r, s);
  }
  __name(x, "x");
  function ue(e, t) {
    let a = 0, s = 0, r = false;
    for (let i = 0; i < e.length; i++) {
      let n = e[i];
      if (r) {
        r = false;
        continue;
      }
      switch (n) {
        case "(":
          s === 0 && (a = i), s++;
          break;
        case ")":
          if (s > 0 && (s--, s === 0)) {
            let o = i + 1, c = a === 0 ? "" : e.substring(0, a), h = e.substring(o), p = String(t(e.substring(a, o)));
            e = c + p + h, i = a;
          }
          break;
        case "\\":
          r = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(ue, "ue");
  (function(e) {
    class t extends RegExp {
      constructor(s, r, i, n, o) {
        super(s, r), this.pcrePattern = i, this.pcreFlags = n, this.delimiter = o;
      }
    }
    __name(t, "t");
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(x || (x = {}));
  x.prototype = x.PCRE.prototype;
  F.exports = x;
});
var Z = N((H) => {
  "use strict";
  l();
  u();
  d();
  H.parse = be;
  H.serialize = Pe;
  var Re = Object.prototype.toString, E = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function be(e, t) {
    if (typeof e != "string")
      throw new TypeError("argument str must be a string");
    for (var a = {}, s = t || {}, r = s.decode || ve, i = 0; i < e.length; ) {
      var n = e.indexOf("=", i);
      if (n === -1)
        break;
      var o = e.indexOf(";", i);
      if (o === -1)
        o = e.length;
      else if (o < n) {
        i = e.lastIndexOf(";", n - 1) + 1;
        continue;
      }
      var c = e.slice(i, n).trim();
      if (a[c] === void 0) {
        var h = e.slice(n + 1, o).trim();
        h.charCodeAt(0) === 34 && (h = h.slice(1, -1)), a[c] = ke(h, r);
      }
      i = o + 1;
    }
    return a;
  }
  __name(be, "be");
  function Pe(e, t, a) {
    var s = a || {}, r = s.encode || Se;
    if (typeof r != "function")
      throw new TypeError("option encode is invalid");
    if (!E.test(e))
      throw new TypeError("argument name is invalid");
    var i = r(t);
    if (i && !E.test(i))
      throw new TypeError("argument val is invalid");
    var n = e + "=" + i;
    if (s.maxAge != null) {
      var o = s.maxAge - 0;
      if (isNaN(o) || !isFinite(o))
        throw new TypeError("option maxAge is invalid");
      n += "; Max-Age=" + Math.floor(o);
    }
    if (s.domain) {
      if (!E.test(s.domain))
        throw new TypeError("option domain is invalid");
      n += "; Domain=" + s.domain;
    }
    if (s.path) {
      if (!E.test(s.path))
        throw new TypeError("option path is invalid");
      n += "; Path=" + s.path;
    }
    if (s.expires) {
      var c = s.expires;
      if (!Ce(c) || isNaN(c.valueOf()))
        throw new TypeError("option expires is invalid");
      n += "; Expires=" + c.toUTCString();
    }
    if (s.httpOnly && (n += "; HttpOnly"), s.secure && (n += "; Secure"), s.priority) {
      var h = typeof s.priority == "string" ? s.priority.toLowerCase() : s.priority;
      switch (h) {
        case "low":
          n += "; Priority=Low";
          break;
        case "medium":
          n += "; Priority=Medium";
          break;
        case "high":
          n += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (s.sameSite) {
      var p = typeof s.sameSite == "string" ? s.sameSite.toLowerCase() : s.sameSite;
      switch (p) {
        case true:
          n += "; SameSite=Strict";
          break;
        case "lax":
          n += "; SameSite=Lax";
          break;
        case "strict":
          n += "; SameSite=Strict";
          break;
        case "none":
          n += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return n;
  }
  __name(Pe, "Pe");
  function ve(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(ve, "ve");
  function Se(e) {
    return encodeURIComponent(e);
  }
  __name(Se, "Se");
  function Ce(e) {
    return Re.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(Ce, "Ce");
  function ke(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(ke, "ke");
});
l();
u();
d();
l();
u();
d();
l();
u();
d();
var b = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
l();
u();
d();
l();
u();
d();
l();
u();
d();
l();
u();
d();
var q = V($());
function C(e, t, a) {
  if (t == null)
    return { match: null, captureGroupKeys: [] };
  let s = a ? "" : "i", r = [];
  return { match: (0, q.default)(`%${e}%${s}`, r).exec(t), captureGroupKeys: r };
}
__name(C, "C");
function P(e, t, a, { namedOnly: s } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (r, i) => {
    let n = a.indexOf(i);
    return s && n === -1 ? r : (n === -1 ? t[parseInt(i, 10)] : t[n + 1]) || "";
  });
}
__name(P, "P");
function j(e, { url: t, cookies: a, headers: s, routeDest: r }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? I(e.value, s.get(e.key), r) : { valid: s.has(e.key) };
    case "cookie": {
      let i = a[e.key];
      return i && e.value !== void 0 ? I(e.value, i, r) : { valid: i !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? I(e.value, t.searchParams.get(e.key), r) : { valid: t.searchParams.has(e.key) };
  }
}
__name(j, "j");
function I(e, t, a) {
  let { match: s, captureGroupKeys: r } = C(e, t);
  return a && s && r.length ? { valid: !!s, newRouteDest: P(a, s, r, { namedOnly: true }) } : { valid: !!s };
}
__name(I, "I");
l();
u();
d();
function D(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", b), new Request(e, { headers: t });
}
__name(D, "D");
l();
u();
d();
function _(e, t, a) {
  let s = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [r, i] of s) {
    let n = r.toLowerCase(), o = a?.match ? P(i, a.match, a.captureGroupKeys) : i;
    n === "set-cookie" ? e.append(n, o) : e.set(n, o);
  }
}
__name(_, "_");
function v(e) {
  return /^https?:\/\//.test(e);
}
__name(v, "v");
function w(e, t) {
  for (let [a, s] of t.entries()) {
    let r = /^nxtP(.+)$/.exec(a), i = /^nxtI(.+)$/.exec(a);
    r?.[1] ? (e.set(a, s), e.set(r[1], s)) : i?.[1] ? e.set(i[1], s.replace(/(\(\.+\))+/, "")) : (!e.has(a) || !!s && !e.getAll(a).includes(s)) && e.append(a, s);
  }
}
__name(w, "w");
function L(e, t) {
  let a = new URL(t, e.url);
  return w(a.searchParams, new URL(e.url).searchParams), a.pathname = a.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(a, e);
}
__name(L, "L");
function S(e) {
  return new Response(e.body, e);
}
__name(S, "S");
function A(e) {
  return e.split(",").map((t) => {
    let [a, s] = t.split(";"), r = parseFloat((s ?? "q=1").replace(/q *= */gi, ""));
    return [a.trim(), isNaN(r) ? 1 : r];
  }).sort((t, a) => a[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(A, "A");
l();
u();
d();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function k(e, { request: t, assetsFetcher: a, ctx: s }, { path: r, searchParams: i }) {
  let n, o = new URL(t.url);
  w(o.searchParams, i);
  let c = new Request(o, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let h = await import(e.entrypoint);
        try {
          n = await h.default(c, s);
        } catch (p) {
          let y = p;
          throw y.name === "TypeError" && y.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : p;
        }
        break;
      }
      case "override": {
        n = S(await a.fetch(L(c, e.path ?? r))), e.headers && _(n.headers, e.headers);
        break;
      }
      case "static": {
        n = await a.fetch(L(c, r));
        break;
      }
      default:
        n = new Response("Not Found", { status: 404 });
    }
  } catch (h) {
    return console.error(h), new Response("Internal Server Error", { status: 500 });
  }
  return S(n);
}
__name(k, "k");
function B(e, t) {
  let a = "^//?(?:", s = ")/(.*)$";
  return !e.startsWith(a) || !e.endsWith(s) ? false : e.slice(a.length, -s.length).split("|").every((i) => t.has(i));
}
__name(B, "B");
l();
u();
d();
function de(e, { protocol: t, hostname: a, port: s, pathname: r }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(a).test(e.hostname) || s && !new RegExp(s).test(e.port) || r && !new RegExp(r).test(e.pathname));
}
__name(de, "de");
function he(e, t) {
  if (e.method !== "GET")
    return;
  let { origin: a, searchParams: s } = new URL(e.url), r = s.get("url"), i = Number.parseInt(s.get("w") ?? "", 10), n = Number.parseInt(s.get("q") ?? "75", 10);
  if (!r || Number.isNaN(i) || Number.isNaN(n) || !t?.sizes?.includes(i) || n < 0 || n > 100)
    return;
  let o = new URL(r, a);
  if (o.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG)
    return;
  let c = r.startsWith("//"), h = r.startsWith("/") && !c;
  if (!h && !t?.domains?.includes(o.hostname) && !t?.remotePatterns?.find((R) => de(o, R)))
    return;
  let p = e.headers.get("Accept") ?? "", y = t?.formats?.find((R) => p.includes(R))?.replace("image/", "");
  return { isRelative: h, imageUrl: o, options: { width: i, quality: n, format: y } };
}
__name(he, "he");
function pe(e, t, a) {
  let s = new Headers();
  if (a?.contentSecurityPolicy && s.set("Content-Security-Policy", a.contentSecurityPolicy), a?.contentDispositionType) {
    let i = t.pathname.split("/").pop(), n = i ? `${a.contentDispositionType}; filename="${i}"` : a.contentDispositionType;
    s.set("Content-Disposition", n);
  }
  e.headers.has("Cache-Control") || s.set("Cache-Control", `public, max-age=${a?.minimumCacheTTL ?? 60}`);
  let r = S(e);
  return _(r.headers, s), r;
}
__name(pe, "pe");
async function G(e, { buildOutput: t, assetsFetcher: a, imagesConfig: s }) {
  let r = he(e, s);
  if (!r)
    return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: i, imageUrl: n } = r, c = await (i && n.pathname in t ? a.fetch.bind(a) : fetch)(n);
  return pe(c, n, s);
}
__name(G, "G");
l();
u();
d();
l();
u();
d();
var fe = "x-vercel-cache-tags";
var me = "x-next-cache-soft-tags";
var ge = Symbol.for("__cloudflare-request-context__");
async function z(e) {
  let t = `https://${b}/v1/suspense-cache/`;
  if (!e.url.startsWith(t))
    return null;
  try {
    let a = new URL(e.url), s = await ye();
    if (a.pathname === "/v1/suspense-cache/revalidate") {
      let i = a.searchParams.get("tags")?.split(",") ?? [];
      for (let n of i)
        await s.revalidateTag(n);
      return new Response(null, { status: 200 });
    }
    let r = a.pathname.replace("/v1/suspense-cache/", "");
    if (!r.length)
      return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let i = K(e, me), n = await s.get(r, { softTags: i });
        return n ? new Response(JSON.stringify(n.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (n.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let i = globalThis[ge], n = /* @__PURE__ */ __name(async () => {
          let o = await e.json();
          o.data.tags === void 0 && (o.tags ??= K(e, fe) ?? []), await s.set(r, o);
        }, "n");
        return i ? i.ctx.waitUntil(n()) : await n(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (a) {
    return console.error(a), new Response("Error handling cache request", { status: 500 });
  }
}
__name(z, "z");
async function ye() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? W("kv") : W("cache-api");
}
__name(ye, "ye");
async function W(e) {
  let t = await import(`./__next-on-pages-dist__/cache/${e}.js`);
  return new t.default();
}
__name(W, "W");
function K(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(K, "K");
function X() {
  globalThis[J] || (_e(), globalThis[J] = true);
}
__name(X, "X");
function _e() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let a = new Request(...t), s = await we(a);
    return s || (s = await z(a), s) ? s : (xe(a), e(a));
  };
}
__name(_e, "_e");
async function we(e) {
  if (e.url.startsWith("blob:"))
    try {
      let a = (await import(`./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`)).default, s = { async arrayBuffer() {
        return a;
      }, get body() {
        return new ReadableStream({ start(r) {
          let i = Buffer.from(a);
          r.enqueue(i), r.close();
        } });
      }, async text() {
        return Buffer.from(a).toString();
      }, async json() {
        let r = Buffer.from(a);
        return JSON.stringify(r.toString());
      }, async blob() {
        return new Blob(a);
      } };
      return s.clone = () => ({ ...s }), s;
    } catch {
    }
  return null;
}
__name(we, "we");
function xe(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(xe, "xe");
var J = Symbol.for("next-on-pages fetch patch");
l();
u();
d();
var Q = V(Z());
var M = /* @__PURE__ */ __name(class {
  constructor(t, a, s, r, i) {
    this.routes = t;
    this.output = a;
    this.reqCtx = s;
    this.url = new URL(s.request.url), this.cookies = (0, Q.parse)(s.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), w(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = i?.find((n) => n.domain === this.url.hostname), this.locales = new Set(r.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: a, checkIntercept: s }) {
    let r = C(t.src, this.path, t.caseSensitive);
    if (!r.match || t.methods && !t.methods.map((n) => n.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase()))
      return;
    let i = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((n) => {
      let o = j(n, i);
      return o.newRouteDest && (i.routeDest = o.newRouteDest), !o.valid;
    }) && !t.missing?.find((n) => j(n, i).valid) && !(a && t.status !== this.status)) {
      if (s && t.dest) {
        let n = /\/(\(\.+\))+/, o = n.test(t.dest), c = n.test(this.path);
        if (o && !c)
          return;
      }
      return { routeMatch: r, routeDest: i.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let a = "x-middleware-override-headers", s = t.headers.get(a);
    if (s) {
      let c = new Set(s.split(",").map((h) => h.trim()));
      for (let h of c.keys()) {
        let p = `x-middleware-request-${h}`, y = t.headers.get(p);
        this.reqCtx.request.headers.get(h) !== y && (y ? this.reqCtx.request.headers.set(h, y) : this.reqCtx.request.headers.delete(h)), t.headers.delete(p);
      }
      t.headers.delete(a);
    }
    let r = "x-middleware-rewrite", i = t.headers.get(r);
    if (i) {
      let c = new URL(i, this.url), h = this.url.hostname !== c.hostname;
      this.path = h ? `${c}` : c.pathname, w(this.searchParams, c.searchParams), t.headers.delete(r);
    }
    let n = "x-middleware-next";
    t.headers.get(n) ? t.headers.delete(n) : !i && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), _(this.reqCtx.request.headers, t.headers), _(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t)
      return true;
    let a = t && this.output[t];
    if (!a || a.type !== "middleware")
      return this.status = 500, false;
    let s = await k(a, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), s.status === 500 ? (this.status = s.status, false) : (this.processMiddlewareResp(s), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, a, s) {
    !t.headers || (_(this.headers.normal, t.headers, { match: a, captureGroupKeys: s }), t.important && _(this.headers.important, t.headers, { match: a, captureGroupKeys: s }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, a, s) {
    if (!t.dest)
      return this.path;
    let r = this.path, i = t.dest;
    this.wildcardMatch && /\$wildcard/.test(i) && (i = i.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = P(i, a, s);
    let n = /\/index\.rsc$/i.test(this.path), o = /^\/(?:index)?$/i.test(r), c = /^\/__index\.prefetch\.rsc$/i.test(r);
    n && !o && !c && (this.path = r);
    let h = /\.rsc$/i.test(this.path), p = /\.prefetch\.rsc$/i.test(this.path), y = this.path in this.output;
    h && !p && !y && (this.path = this.path.replace(/\.rsc/i, ""));
    let R = new URL(this.path, this.url);
    return w(this.searchParams, R.searchParams), v(this.path) || (this.path = R.pathname), r;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location"))
      return;
    let { locale: { redirect: s, cookie: r } } = t, i = r && this.cookies[r], n = A(i ?? ""), o = A(this.reqCtx.request.headers.get("accept-language") ?? ""), p = [...n, ...o].map((y) => s[y]).filter(Boolean)[0];
    if (p) {
      !this.path.startsWith(p) && (this.headers.normal.set("location", p), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, a) {
    return !this.locales || a !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, a) {
    let s = this.getLocaleFriendlyRoute(a, t), { routeMatch: r, routeDest: i } = this.checkRouteMatch(s, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, n = { ...s, dest: i };
    if (!r?.match || n.middlewarePath && this.middlewareInvoked.includes(n.middlewarePath))
      return "skip";
    let { match: o, captureGroupKeys: c } = r;
    if (this.applyRouteOverrides(n), this.applyLocaleRedirects(n), !await this.runRouteMiddleware(n.middlewarePath))
      return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation)
      return "done";
    this.applyRouteHeaders(n, o, c), this.applyRouteStatus(n);
    let p = this.applyRouteDest(n, o, c);
    if (n.check && !v(this.path))
      if (p === this.path) {
        if (t !== "miss")
          return this.checkPhase(O(t));
        this.status = 404;
      } else if (t === "miss") {
        if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output))
          return this.checkPhase("filesystem");
        this.status === 404 && (this.status = void 0);
      } else
        return this.checkPhase("none");
    return !n.continue || n.status && n.status >= 300 && n.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50)
      return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let a = true;
    for (let i of this.routes[t]) {
      let n = await this.checkRoute(t, i);
      if (n === "error")
        return "error";
      if (n === "done") {
        a = false;
        break;
      }
    }
    if (t === "hit" || v(this.path) || this.headers.normal.has("location") || !!this.body)
      return "done";
    if (t === "none")
      for (let i of this.locales) {
        let n = new RegExp(`/${i}(/.*)`), c = this.path.match(n)?.[1];
        if (c && c in this.output) {
          this.path = c;
          break;
        }
      }
    let s = this.path in this.output;
    if (!s && this.path.endsWith("/")) {
      let i = this.path.replace(/\/$/, "");
      s = i in this.output, s && (this.path = i);
    }
    if (t === "miss" && !s) {
      let i = !this.status || this.status < 400;
      this.status = i ? 404 : this.status;
    }
    let r = "miss";
    return s || t === "miss" || t === "error" ? r = "hit" : a && (r = O(t)), this.checkPhase(r);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let a = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), a;
  }
}, "M");
async function Y(e, t, a, s) {
  let r = new M(t.routes, a, e, s, t.wildcard), i = await ee(r);
  return Ee(e, i, a);
}
__name(Y, "Y");
async function ee(e, t = "none", a = false) {
  return await e.run(t) === "error" || !a && e.status && e.status >= 400 ? ee(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(ee, "ee");
async function Ee(e, { path: t = "/404", status: a, headers: s, searchParams: r, body: i }, n) {
  let o = s.normal.get("location");
  if (o) {
    if (o !== s.middlewareLocation) {
      let p = [...r.keys()].length ? `?${r.toString()}` : "";
      s.normal.set("location", `${o ?? "/"}${p}`);
    }
    return new Response(null, { status: a, headers: s.normal });
  }
  let c;
  if (i !== void 0)
    c = new Response(i, { status: a });
  else if (v(t)) {
    let p = new URL(t);
    w(p.searchParams, r), c = await fetch(p, e.request);
  } else
    c = await k(n[t], e, { path: t, status: a, headers: s, searchParams: r });
  let h = s.normal;
  return _(h, c.headers), _(h, s.important), c = new Response(c.body, { ...c, status: a || c.status, headers: h }), c;
}
__name(Ee, "Ee");
l();
u();
d();
function te() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Me };
}
__name(te, "te");
function Me(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t)
    return t;
  let a = Te();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, a), a;
}
__name(Me, "Me");
function Te() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: (t, a) => e.has(a) ? e.get(a) : Reflect.get(globalThis, a), set: (t, a, s) => Ie.has(a) ? Reflect.set(globalThis, a, s) : (e.set(a, s), true) });
}
__name(Te, "Te");
var Ie = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var ms = { async fetch(e, t, a) {
  te(), X();
  let s = await __ALSes_PROMISE__;
  if (!s) {
    let n = new URL(e.url), o = await t.ASSETS.fetch(`${n.protocol}//${n.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = o.ok ? o.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: r, requestContextAsyncLocalStorage: i } = s;
  return r.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: b }, async () => i.run({ env: t, ctx: a, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image"))
      return G(e, { buildOutput: m, assetsFetcher: t.ASSETS, imagesConfig: f.images });
    let o = D(e);
    return Y({ request: o, ctx: a, assetsFetcher: t.ASSETS }, f, m, g);
  }));
} };
export {
  ms as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.8401438713353917.mjs.map

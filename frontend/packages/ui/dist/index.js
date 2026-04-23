import { jsx as u, jsxs as m } from "react/jsx-runtime";
import f, { useState as v } from "react";
var s = { exports: {} }, p = {};
var _;
function C() {
  if (_) return p;
  _ = 1;
  var e = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return p.c = function(t) {
    return e.H.useMemoCache(t);
  }, p;
}
var h = {};
var d;
function E() {
  return d || (d = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    h.c = function(t) {
      var n = e.H;
      return n === null && console.error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      ), n.useMemoCache(t);
    };
  })()), h;
}
var R;
function N() {
  return R || (R = 1, process.env.NODE_ENV === "production" ? s.exports = C() : s.exports = E()), s.exports;
}
var S = N();
const b = "_container_1mc1p_1", x = {
  container: b
};
function k() {
  const e = S.c(10), [t, n] = v(0);
  let c;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (c = /* @__PURE__ */ u("h1", { children: "Example!" }), e[0] = c) : c = e[0];
  let o, r, i;
  e[1] !== t ? (o = /* @__PURE__ */ m("h2", { children: [
    "Counter: ",
    t
  ] }), r = /* @__PURE__ */ u("button", { onClick: () => n(t + 1), children: "Increment" }), i = /* @__PURE__ */ u("button", { onClick: () => n(t - 1), children: "Decrement" }), e[1] = t, e[2] = o, e[3] = r, e[4] = i) : (o = e[2], r = e[3], i = e[4]);
  let a;
  e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (a = /* @__PURE__ */ u("button", { onClick: () => n(0), children: "Reset" }), e[5] = a) : a = e[5];
  let l;
  return e[6] !== o || e[7] !== r || e[8] !== i ? (l = /* @__PURE__ */ m("div", { className: x.container, children: [
    c,
    /* @__PURE__ */ m("div", { children: [
      o,
      r,
      i,
      a
    ] })
  ] }), e[6] = o, e[7] = r, e[8] = i, e[9] = l) : l = e[9], l;
}
export {
  k as Example
};

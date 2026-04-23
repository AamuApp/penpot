const A = globalThis, {
  Array: ga,
  ArrayBuffer: lr,
  Date: ya,
  FinalizationRegistry: At,
  Float32Array: _a,
  JSON: va,
  Map: Me,
  Math: ba,
  Number: Fo,
  Object: Do,
  Promise: wa,
  Proxy: Ir,
  Reflect: xa,
  RegExp: Ye,
  Set: Mt,
  String: ye,
  Symbol: wt,
  Uint8Array: Xr,
  WeakMap: De,
  WeakSet: Lt
} = globalThis, {
  // The feral Error constructor is safe for internal use, but must not be
  // revealed to post-lockdown code in any compartment including the start
  // compartment since in V8 at least it bears stack inspection capabilities.
  Error: ce,
  RangeError: Sa,
  ReferenceError: Zt,
  SyntaxError: Kt,
  TypeError: b,
  AggregateError: Zr
} = globalThis, {
  assign: Yt,
  create: K,
  defineProperties: z,
  entries: ge,
  freeze: v,
  getOwnPropertyDescriptor: te,
  getOwnPropertyDescriptors: Ue,
  getOwnPropertyNames: Pt,
  getPrototypeOf: Z,
  is: Tr,
  keys: Uo,
  prototype: wn,
  preventExtensions: Ea,
  setPrototypeOf: ur,
  values: jo,
  fromEntries: Jt,
  hasOwn: ee
} = Do, {
  species: Gr,
  toStringTag: et,
  iterator: Le,
  matchAll: Bo,
  unscopables: ka,
  keyFor: Aa,
  for: Pa
} = wt, { isInteger: Ia } = Fo, { stringify: zo } = va, { defineProperty: Ta } = Do, B = (t, e, r) => {
  const n = Ta(t, e, r);
  if (n !== t)
    throw b(
      `Please report that the original defineProperty silently failed to set ${zo(
        ye(e)
      )}. (SES_DEFINE_PROPERTY_FAILED_SILENTLY)`
    );
  return n;
}, {
  apply: le,
  construct: dr,
  get: Ca,
  getOwnPropertyDescriptor: $a,
  has: Zo,
  isExtensible: Ra,
  ownKeys: Ge,
  preventExtensions: Na,
  set: Go
} = xa, { isArray: pt, prototype: xe } = ga, { prototype: fr } = lr, { prototype: Ft } = Me, { prototype: Cr } = RegExp, { prototype: Xt } = Mt, { prototype: je } = ye, { prototype: $r } = De, { prototype: Ho } = Lt, { prototype: Rr } = Function, { prototype: Vo } = wa, { prototype: Wo } = Z(
  // eslint-disable-next-line no-empty-function, func-names
  function* () {
  }
), Hr = Z(
  // eslint-disable-next-line @endo/no-polymorphic-call
  Z(xe.values())
), qo = Z(Xr.prototype), { bind: Qr } = Rr, I = Qr.bind(Qr.call), gt = I(xe.filter), Xe = I(xe.forEach), Nr = I(xe.includes), Dt = I(xe.join), be = (
  /** @type {any} */
  I(xe.map)
), Or = (
  /** @type {any} */
  I(xe.flatMap)
), pr = I(xe.pop), oe = I(xe.push), Oa = I(xe.slice), Ko = I(xe.some), Yo = I(xe.sort), Ma = I(xe[Le]), La = I(fr.slice), Fa = I(
  // @ts-expect-error we know it is there on all conforming platforms
  te(fr, "byteLength").get
), Da = I(qo.set), pe = I(Ft.set), He = I(Ft.get), Mr = I(Ft.has), Ua = I(Ft.delete), ja = I(Ft.entries), Ba = I(Ft[Le]), xn = I(Xt.add);
I(Xt.delete);
const Gn = I(Xt.forEach), Sn = I(Xt.has), za = I(Xt[Le]), En = I(Cr.test), kn = I(Cr.exec), Za = I(Cr[Bo]), Jo = I(je.endsWith), Xo = I(je.includes), Ga = I(je.indexOf);
I(je.match);
const mr = I(Wo.next), Qo = I(Wo.throw), hr = (
  /** @type {any} */
  I(je.replace)
), Ha = I(je.search), An = I(je.slice), Pn = (
  /** @type {(thisArg: string, splitter: string | RegExp | { [Symbol.split](string: string, limit?: number): string[]; }, limit?: number) => string[]} */
  I(je.split)
), es = I(je.startsWith), Va = I(je[Le]), Wa = I($r.delete), j = I($r.get), xt = I($r.has), he = I($r.set), Lr = I(Ho.add), Qt = I(Ho.has), qa = I(Rr.toString), ts = I(Qr);
I(Vo.catch);
const rs = (
  /** @type {any} */
  I(Vo.then)
), Ka = At && I(At.prototype.register);
At && I(At.prototype.unregister);
const Ae = (t) => !t || typeof t != "object" && typeof t != "function", Fr = (t) => t instanceof ce, ns = (t) => t, en = eval, me = Function, Ya = () => {
  throw b('Cannot eval with evalTaming set to "no-eval" (SES_NO_EVAL)');
}, We = te(Error("er1"), "stack"), Vr = te(b("er2"), "stack");
let os, ss;
if (We && Vr && We.get)
  if (
    // In the v8 case as we understand it, all errors have an own stack
    // accessor property, but within the same realm, all these accessor
    // properties have the same getter and have the same setter.
    // This is therefore the case that we repair.
    typeof We.get == "function" && We.get === Vr.get && typeof We.set == "function" && We.set === Vr.set
  )
    os = v(We.get), ss = v(We.set);
  else
    throw b(
      "Unexpected Error own stack accessor functions (SES_UNEXPECTED_ERROR_OWN_STACK_ACCESSOR)"
    );
const Wr = os, Ja = ss, Xa = () => {
  try {
    return new me(
      "return (async function* AsyncGeneratorFunctionInstance() {})"
    )();
  } catch (t) {
    if (t.name === "SyntaxError")
      return;
    if (t.name === "EvalError")
      return async function* () {
      };
    throw t;
  }
}, tn = Xa();
function Qa() {
  return this;
}
if (Qa())
  throw b("SES failed to initialize, sloppy mode (SES_NO_SLOPPY)");
const as = globalThis, { Object: ei, Reflect: ti, Array: is, String: ri, JSON: ni, Error: oi } = as, { freeze: ct } = ei, { apply: si } = ti, In = (t) => (e, ...r) => si(t, e, r), ai = In(is.prototype.push), Hn = In(is.prototype.includes), ii = In(ri.prototype.split), st = ni.stringify, tr = (t, ...e) => {
  let r = t[0];
  for (let n = 0; n < e.length; n += 1)
    r = `${r}${e[n]}${t[n + 1]}`;
  throw oi(r);
}, cs = (t, e = !1) => {
  const r = [], n = (i, l, u = void 0) => {
    typeof i == "string" || tr`Environment option name ${st(i)} must be a string.`, typeof l == "string" || tr`Environment option default setting ${st(
      l
    )} must be a string.`;
    let f = l;
    const d = t.process || void 0, p = typeof d == "object" && d.env || void 0;
    if (typeof p == "object" && i in p) {
      e || ai(r, i);
      const m = p[i];
      typeof m == "string" || tr`Environment option named ${st(
        i
      )}, if present, must have a corresponding string value, got ${st(
        m
      )}`, f = m;
    }
    return u === void 0 || f === l || Hn(u, f) || tr`Unrecognized ${st(i)} value ${st(
      f
    )}. Expected one of ${st([l, ...u])}`, f;
  };
  ct(n);
  const o = (i) => {
    const l = n(i, "");
    return ct(l === "" ? [] : ii(l, ","));
  };
  ct(o);
  const s = (i, l) => Hn(o(i), l), c = () => ct([...r]);
  return ct(c), ct({
    getEnvironmentOption: n,
    getEnvironmentOptionsList: o,
    environmentOptionsListHas: s,
    getCapturedEnvironmentOptionNames: c
  });
};
ct(cs);
const {
  getEnvironmentOption: ie,
  getEnvironmentOptionsList: Cu,
  environmentOptionsListHas: $u
} = cs(as, !0), {
  ArrayBuffer: ci,
  Object: li,
  Reflect: ui,
  Symbol: di,
  TypeError: Bt,
  Uint8Array: rn,
  WeakMap: fi,
  // Capture structuredClone before it can be scuttled.
  structuredClone: Vn
  // eslint-disable-next-line no-restricted-globals
} = globalThis, { freeze: pi, defineProperty: ls, getPrototypeOf: mi, getOwnPropertyDescriptor: us } = li, { apply: mt, ownKeys: hi } = ui, { toStringTag: gi } = di, { prototype: Tn } = ci, { slice: yi, transfer: gr } = Tn, { get: Wn } = us(
  Tn,
  "byteLength"
), ds = mi(rn.prototype), { set: _i } = ds, { get: vi } = us(
  ds,
  "buffer"
), Dr = (t, e = void 0, r = void 0) => mt(yi, t, [e, r]);
let St;
gr ? St = (t) => mt(gr, t, []) : Vn ? St = (t) => (Dr(t, 0, 0), Vn(t, {
  transfer: [t]
})) : St = void 0;
const It = new fi();
for (const t of ["get", "has", "set"])
  ls(It, t, { value: It[t] });
const Re = (t) => {
  const e = It.get(t);
  if (e)
    return e;
  throw Bt("Not an emulated Immutable ArrayBuffer");
}, nn = {
  __proto__: Tn,
  get byteLength() {
    return mt(Wn, Re(this), []);
  },
  get detached() {
    return Re(this), !1;
  },
  get maxByteLength() {
    return mt(Wn, Re(this), []);
  },
  get resizable() {
    return Re(this), !1;
  },
  get immutable() {
    return Re(this), !0;
  },
  slice(t = void 0, e = void 0) {
    return Dr(Re(this), t, e);
  },
  sliceToImmutable(t = void 0, e = void 0) {
    return fs(Re(this), t, e);
  },
  resize(t = void 0) {
    throw Re(this), Bt("Cannot resize an immutable ArrayBuffer");
  },
  transfer(t = void 0) {
    throw Re(this), Bt("Cannot detach an immutable ArrayBuffer");
  },
  transferToFixedLength(t = void 0) {
    throw Re(this), Bt("Cannot detach an immutable ArrayBuffer");
  },
  transferToImmutable(t = void 0) {
    throw Re(this), Bt("Cannot detach an immutable ArrayBuffer");
  },
  /**
   * See https://github.com/endojs/endo/tree/master/packages/immutable-arraybuffer#purposeful-violation
   */
  [gi]: "ImmutableArrayBuffer"
};
for (const t of hi(nn))
  ls(nn, t, {
    enumerable: !1
  });
const Cn = (t) => {
  const e = (
    /** @type {ArrayBuffer} */
    /** @type {unknown} */
    {
      __proto__: nn
    }
  );
  return It.set(e, t), e;
};
pi(Cn);
const bi = (t) => It.has(t), fs = (t, e = void 0, r = void 0) => {
  let n = It.get(t);
  return n === void 0 && (n = t), Cn(
    Dr(n, e, r)
  );
};
let on;
St ? on = (t, e = void 0) => {
  if (e === void 0)
    t = St(t);
  else if (gr)
    t = mt(gr, t, [e]);
  else {
    t = St(t);
    const n = t.byteLength;
    if (e <= n)
      t = Dr(t, 0, e);
    else {
      const o = new rn(t), s = new rn(e);
      mt(_i, s, [o]), t = mt(vi, s, []);
    }
  }
  return Cn(t);
} : on = void 0;
const wi = on, {
  ArrayBuffer: xi,
  JSON: Si,
  Object: Ei,
  Reflect: ki
  // eslint-disable-next-line no-restricted-globals
} = globalThis, qn = wi, { getOwnPropertyDescriptors: Ai, defineProperties: Pi, defineProperty: Ii } = Ei, { ownKeys: ps } = ki, { prototype: ms } = xi, { stringify: Ti } = Si, yr = {
  /**
   * Creates an immutable slice of the given buffer.
   *
   * @this {ArrayBuffer} buffer The original buffer.
   * @param {number} [start] The start index.
   * @param {number} [end] The end index.
   * @returns {ArrayBuffer} The sliced immutable ArrayBuffer.
   */
  sliceToImmutable(t = void 0, e = void 0) {
    return fs(this, t, e);
  },
  /**
   * @this {ArrayBuffer}
   */
  get immutable() {
    return bi(this);
  },
  ...qn ? {
    /**
     * Transfer the contents to a new Immutable ArrayBuffer
     *
     * @this {ArrayBuffer} buffer The original buffer.
     * @param {number} [newLength] The start index.
     * @returns {ArrayBuffer} The sliced immutable ArrayBuffer.
     */
    transferToImmutable(t = void 0) {
      return qn(this, t);
    }
  } : {}
};
for (const t of ps(yr))
  Ii(yr, t, {
    enumerable: !1
  });
const Kn = ps(yr).filter(
  (t) => t in ms
);
Kn.length > 0 && console.warn(
  `About to overwrite ArrayBuffer.prototype properties ${Ti(Kn)}`
);
Pi(
  ms,
  Ai(yr)
);
const _r = (t) => (t = `${t}`, t.length >= 1 && Xo("aeiouAEIOU", t[0]) ? `an ${t}` : `a ${t}`);
v(_r);
const hs = (t, e = void 0) => {
  const r = new Mt(), n = (o, s) => {
    switch (typeof s) {
      case "object": {
        if (s === null)
          return null;
        if (Sn(r, s))
          return "[Seen]";
        if (xn(r, s), Fr(s))
          return `[${s.name}: ${s.message}]`;
        if (et in s)
          return `[${s[et]}]`;
        if (pt(s))
          return s;
        const c = Uo(s);
        if (c.length < 2)
          return s;
        let i = !0;
        for (let u = 1; u < c.length; u += 1)
          if (c[u - 1] >= c[u]) {
            i = !1;
            break;
          }
        if (i)
          return s;
        Yo(c);
        const l = be(c, (u) => [u, s[u]]);
        return Jt(l);
      }
      case "function":
        return `[Function ${s.name || "<anon>"}]`;
      case "string":
        return es(s, "[") ? `[${s}]` : s;
      case "undefined":
      case "symbol":
        return `[${ye(s)}]`;
      case "bigint":
        return `[${s}n]`;
      case "number":
        return Tr(s, NaN) ? "[NaN]" : s === 1 / 0 ? "[Infinity]" : s === -1 / 0 ? "[-Infinity]" : s;
      default:
        return s;
    }
  };
  try {
    return zo(t, n, e);
  } catch {
    return "[Something that failed to stringify]";
  }
};
v(hs);
const { Error: gs, TypeError: Ci, WeakMap: $i } = globalThis, { parse: Ri, stringify: Ni } = JSON, { isSafeInteger: Oi } = Number, { freeze: Ze } = Object, { toStringTag: Mi } = Symbol, ys = /* @__PURE__ */ Symbol("UNKNOWN_KEY"), _s = (t, e) => {
  const r = Ni(t);
  return Ri(r, e);
}, Li = (t, e) => Ze(e), Fi = (t) => _s(t, Li), Di = (t, e, r) => {
  const n = t?.next, o = { id: e, next: n, prev: t, data: r };
  return t.next = o, n.prev = o, o;
}, qr = (t, e, r = e.next) => {
  if (t === e || t === r) return;
  const { prev: n, next: o } = t;
  n.next = o, o.prev = n, t.prev = e, t.next = r, e.next = t, r.prev = t;
}, Yn = (t, e, r) => {
  if (e !== ys) {
    t.data.delete(e);
    return;
  }
  if (t.data.clear) {
    t.data.clear();
    return;
  }
  if (!r)
    throw gs("internal: makeMap is required with UNKNOWN_KEY");
  t.data = r();
}, Ui = Ze({
  totalQueryCount: 0,
  totalHitCount: 0
  // TODO?
  // * method-specific counts
  // * liveTouchStats/evictedTouchStats { count, sum, mean, min, max }
  //   * p50/p90/p95/p99 via Ben-Haim/Tom-Tov streaming histograms
}), vs = (t, e = {}) => {
  if (!Oi(t) || t < 0)
    throw Ci(
      "capacity must be a non-negative safe integer number <= 2**53 - 1"
    );
  const r = ((h) => {
    try {
      return h(), /** @type {any} */
      h;
    } catch {
      return () => new h();
    }
  })(e.makeMap ?? $i), n = (
    /** @type {any} */
    r().clear === void 0 ? "WeakCacheMap" : "CacheMap"
  ), o = r(), s = (
    /** @type {CacheMapCell<K, V>} */
    {
      id: 0,
      // next and prev are established below as self-referential.
      next: void 0,
      prev: void 0,
      data: {
        has: () => {
          throw gs("internal: sentinel head cell has no data");
        }
      }
    }
  );
  s.next = s, s.prev = s;
  let c = 0;
  const i = _s(Ui), l = () => Fi(i), u = (h) => {
    i.totalQueryCount += 1;
    const _ = o.get(h);
    if (_?.data.has(h))
      return i.totalHitCount += 1, qr(_, s), _;
  }, f = (h) => u(h) !== void 0;
  Ze(f);
  const d = (h) => u(h)?.data.get(h);
  Ze(d);
  const p = (h, _) => {
    let E = u(h);
    return E ? (E.data.set(h, _), g) : (c < t ? (E = Di(s, c + 1, r()), c += 1, E.data.set(h, _)) : t > 0 && (E = s.prev, Yn(
      /** @type {any} */
      E,
      ys,
      r
    ), E.data.set(h, _), qr(E, s)), E && o.set(h, E), g);
  };
  Ze(p);
  const { delete: m } = {
    /** @type {WeakMapAPI<K, V>['delete']} */
    delete: (h) => {
      const _ = o.get(h);
      return _?.data.has(h) ? (qr(_, s.prev), Yn(_, h), o.delete(h), !0) : (o.delete(h), !1);
    }
  };
  Ze(m);
  const g = (
    /** @type {WeakMapAPI<K, V>} */
    {
      has: f,
      get: d,
      set: p,
      delete: m,
      // eslint-disable-next-line jsdoc/check-types
      [
        /** @type {typeof Symbol.toStringTag} */
        Mi
      ]: n
    }
  );
  return Ze(g), Ze({ cache: g, getMetrics: l });
};
Ze(vs);
const { freeze: ir } = Object, { isSafeInteger: ji } = Number, Bi = 1e3, zi = 100, bs = (t = Bi, e = zi) => {
  if (!ji(e) || e < 1)
    throw TypeError(
      "argsPerErrorBudget must be a safe positive integer number"
    );
  const { cache: r } = vs(t), n = (s, c) => {
    const i = r.get(s);
    i !== void 0 ? (i.length >= e && i.shift(), i.push(c)) : r.set(s, [c]);
  };
  ir(n);
  const o = (s) => {
    const c = r.get(s);
    return r.delete(s), c;
  };
  return ir(o), ir({
    addLogArgs: n,
    takeLogArgsArray: o
  });
};
ir(bs);
const Tt = new De(), D = (t, e = void 0) => {
  const r = v({
    toString: v(() => hs(t, e))
  });
  return he(Tt, r, t), r;
};
v(D);
const Zi = v(/^[\w:-]( ?[\w:-])*$/), vr = (t, e = void 0) => {
  if (typeof t != "string" || !En(Zi, t))
    return D(t, e);
  const r = v({
    toString: v(() => t)
  });
  return he(Tt, r, t), r;
};
v(vr);
const Ur = new De(), ws = ({ template: t, args: e }) => {
  const r = [t[0]];
  for (let n = 0; n < e.length; n += 1) {
    const o = e[n];
    let s;
    xt(Tt, o) ? s = `${o}` : Fr(o) ? s = `(${_r(o.name)})` : s = `(${_r(typeof o)})`, oe(r, s, t[n + 1]);
  }
  return Dt(r, "");
}, xs = v({
  toString() {
    const t = j(Ur, this);
    return t === void 0 ? "[Not a DetailsToken]" : ws(t);
  }
});
v(xs.toString);
const ne = (t, ...e) => {
  const r = v({ __proto__: xs });
  return he(Ur, r, { template: t, args: e }), /** @type {DetailsToken} */
  /** @type {unknown} */
  r;
};
v(ne);
const Ss = (t, ...e) => (e = be(
  e,
  (r) => xt(Tt, r) ? r : D(r)
), ne(t, ...e));
v(Ss);
const Es = ({ template: t, args: e }) => {
  const r = [t[0]];
  for (let n = 0; n < e.length; n += 1) {
    let o = e[n];
    xt(Tt, o) && (o = j(Tt, o));
    const s = hr(pr(r) || "", / $/, "");
    s !== "" && oe(r, s);
    const c = hr(t[n + 1], /^ /, "");
    oe(r, o, c);
  }
  return r[r.length - 1] === "" && pr(r), r;
}, cr = new De();
let sn = 0;
const Jn = new De(), ks = (t, e = t.name) => {
  let r = j(Jn, t);
  return r !== void 0 || (sn += 1, r = `${e}#${sn}`, he(Jn, t, r)), r;
}, Gi = (t) => {
  const e = Ue(t), {
    name: r,
    message: n,
    errors: o = void 0,
    cause: s = void 0,
    stack: c = void 0,
    ...i
  } = e, l = Ge(i);
  if (l.length >= 1) {
    for (const f of l)
      delete t[f];
    const u = K(wn, i);
    jr(
      t,
      ne`originally with properties ${D(u)}`
    );
  }
  for (const u of Ge(t)) {
    const f = e[u];
    f && ee(f, "get") && B(t, u, {
      value: t[u]
      // invoke the getter to convert to data property
    });
  }
  v(t);
}, Oe = (t = ne`Assert failed`, e = A.Error, {
  errorName: r = void 0,
  cause: n = void 0,
  errors: o = void 0,
  sanitize: s = !0
} = {}) => {
  typeof t == "string" && (t = ne([t]));
  const c = j(Ur, t);
  if (c === void 0)
    throw b(`unrecognized details ${D(t)}`);
  const i = ws(c), l = n && { cause: n };
  let u;
  return typeof Zr < "u" && e === Zr ? u = Zr(o || [], i, l) : (u = /** @type {ErrorConstructor} */
  e(
    i,
    l
  ), o !== void 0 && B(u, "errors", {
    value: o,
    writable: !0,
    enumerable: !1,
    configurable: !0
  })), he(cr, u, Es(c)), r !== void 0 && ks(u, r), s && Gi(u), u;
};
v(Oe);
const { addLogArgs: Hi, takeLogArgsArray: Vi } = bs(), an = new De(), jr = (t, e) => {
  typeof e == "string" && (e = ne([e]));
  const r = j(Ur, e);
  if (r === void 0)
    throw b(`unrecognized details ${D(e)}`);
  const n = Es(r), o = j(an, t);
  if (o !== void 0)
    for (const s of o)
      s(t, n);
  else
    Hi(t, n);
};
v(jr);
const Wi = (t) => {
  if (!("stack" in t))
    return "";
  const e = `${t.stack}`, r = Ga(e, `
`);
  return es(e, " ") || r === -1 ? e : An(e, r + 1);
}, br = {
  getStackString: A.getStackString || Wi,
  tagError: (t) => ks(t),
  resetErrorTagNum: () => {
    sn = 0;
  },
  getMessageLogArgs: (t) => j(cr, t),
  takeMessageLogArgs: (t) => {
    const e = j(cr, t);
    return Wa(cr, t), e;
  },
  takeNoteLogArgsArray: (t, e) => {
    const r = Vi(t);
    if (e !== void 0) {
      const n = j(an, t);
      n ? oe(n, e) : he(an, t, [e]);
    }
    return r || [];
  }
};
v(br);
const Br = (t = void 0, e = !1) => {
  const r = e ? Ss : ne, n = r`Check failed`, o = (d = n, p = void 0, m = void 0) => {
    const g = Oe(d, p, m);
    throw t !== void 0 && t(g), g;
  };
  v(o);
  const s = (d, ...p) => o(r(d, ...p));
  function c(d, p = void 0, m = void 0, g = void 0) {
    d || o(p, m, g);
  }
  const i = (d, p, m = void 0, g = void 0, w = void 0) => {
    Tr(d, p) || o(
      m || r`Expected ${d} is same as ${p}`,
      g || Sa,
      w
    );
  };
  v(i);
  const l = (d, p, m) => {
    if (typeof d !== p) {
      if (typeof p == "string" || s`${D(p)} must be a string`, m === void 0) {
        const g = _r(p);
        m = r`${d} must be ${vr(g)}`;
      }
      o(m, b);
    }
  };
  v(l);
  const f = Yt(c, {
    error: Oe,
    fail: o,
    equal: i,
    typeof: l,
    string: (d, p = void 0) => l(d, "string", p),
    note: jr,
    details: r,
    Fail: s,
    quote: D,
    bare: vr,
    makeAssert: Br
  });
  return v(f);
};
v(Br);
const J = Br(), Xn = J.equal, As = te(
  qo,
  et
);
J(As);
const Ps = As.get;
J(Ps);
const qi = (t) => le(Ps, t, []) !== void 0, Ki = (t) => {
  const e = +ye(t);
  return Ia(e) && ye(e) === t;
}, Yi = (t) => {
  Ea(t), Xe(Ge(t), (e) => {
    const r = te(t, e);
    J(r), Ki(e) || B(t, e, {
      ...r,
      writable: !1,
      configurable: !1
    });
  });
}, Ji = () => {
  if (typeof A.harden == "function")
    return A.harden;
  const t = new Lt(), { harden: e } = {
    /**
     * @template T
     * @param {T} root
     * @returns {T}
     */
    harden(r) {
      const n = new Mt();
      function o(f) {
        if (Ae(f))
          return;
        const d = typeof f;
        if (d !== "object" && d !== "function")
          throw b(`Unexpected typeof: ${d}`);
        Qt(t, f) || Sn(n, f) || xn(n, f);
      }
      const s = (f) => {
        qi(f) ? Yi(f) : v(f);
        const d = Ue(f), p = Z(f);
        o(p), Xe(Ge(d), (m) => {
          const g = d[
            /** @type {string} */
            m
          ];
          ee(g, "value") ? o(g.value) : (o(g.get), o(g.set));
        });
      }, c = Wr === void 0 && Ja === void 0 ? (
        // On platforms without v8's error own stack accessor problem,
        // don't pay for any extra overhead.
        s
      ) : (f) => {
        if (Fr(f)) {
          const d = te(f, "stack");
          d && d.get === Wr && d.configurable && B(f, "stack", {
            // NOTE: Calls getter during harden, which seems dangerous.
            // But we're only calling the problematic getter whose
            // hazards we think we understand.
            // @ts-expect-error TS should know FERAL_STACK_GETTER
            // cannot be `undefined` here.
            // See https://github.com/endojs/endo/pull/2232#discussion_r1575179471
            value: le(Wr, f, [])
          });
        }
        return s(f);
      }, i = () => {
        Gn(n, c);
      }, l = (f) => {
        Lr(t, f);
      }, u = () => {
        Gn(n, l);
      };
      return o(r), i(), u(), r;
    }
  };
  return e;
}, Is = (t, e, r, n, { warn: o, error: s }) => {
  r || o(`Removing ${n}`);
  try {
    delete t[e];
  } catch (c) {
    if (ee(t, e)) {
      if (typeof t == "function" && e === "prototype" && (t.prototype = void 0, t.prototype === void 0)) {
        o(`Tolerating undeletable ${n} === undefined`);
        return;
      }
      s(`failed to delete ${n}`, c);
    } else
      s(`deleting ${n} threw`, c);
    throw c;
  }
}, Ts = {
  // *** Value Properties of the Global Object
  Infinity: 1 / 0,
  NaN: NaN,
  undefined: void 0
}, Cs = {
  // *** Function Properties of the Global Object
  isFinite: "isFinite",
  isNaN: "isNaN",
  parseFloat: "parseFloat",
  parseInt: "parseInt",
  decodeURI: "decodeURI",
  decodeURIComponent: "decodeURIComponent",
  encodeURI: "encodeURI",
  encodeURIComponent: "encodeURIComponent",
  // *** Constructor Properties of the Global Object
  Array: "Array",
  ArrayBuffer: "ArrayBuffer",
  BigInt: "BigInt",
  BigInt64Array: "BigInt64Array",
  BigUint64Array: "BigUint64Array",
  Boolean: "Boolean",
  DataView: "DataView",
  EvalError: "EvalError",
  // https://github.com/tc39/proposal-float16array
  Float16Array: "Float16Array",
  Float32Array: "Float32Array",
  Float64Array: "Float64Array",
  Int8Array: "Int8Array",
  Int16Array: "Int16Array",
  Int32Array: "Int32Array",
  Map: "Map",
  Number: "Number",
  Object: "Object",
  Promise: "Promise",
  Proxy: "Proxy",
  RangeError: "RangeError",
  ReferenceError: "ReferenceError",
  Set: "Set",
  String: "String",
  SyntaxError: "SyntaxError",
  TypeError: "TypeError",
  Uint8Array: "Uint8Array",
  Uint8ClampedArray: "Uint8ClampedArray",
  Uint16Array: "Uint16Array",
  Uint32Array: "Uint32Array",
  URIError: "URIError",
  WeakMap: "WeakMap",
  WeakSet: "WeakSet",
  // https://github.com/tc39/proposal-iterator-helpers
  Iterator: "Iterator",
  // https://github.com/tc39/proposal-async-iterator-helpers
  AsyncIterator: "AsyncIterator",
  // https://github.com/endojs/endo/issues/550
  AggregateError: "AggregateError",
  // https://github.com/tc39/proposal-explicit-resource-management
  // TODO DisposableStack, AsyncDisposableStack
  // DisposableStack: 'DisposableStack',
  // AsyncDisposableStack: 'AsyncDisposableStack',
  // https://tc39.es/proposal-shadowrealm/
  // TODO ShadowRealm
  // ShadowRealm: 'ShadowRealm',
  // *** Other Properties of the Global Object
  JSON: "JSON",
  Reflect: "Reflect",
  // *** Annex B
  escape: "escape",
  unescape: "unescape",
  // ESNext
  // https://github.com/tc39/proposal-source-phase-imports?tab=readme-ov-file#js-module-source
  ModuleSource: "ModuleSource",
  lockdown: "lockdown",
  harden: "harden",
  HandledPromise: "HandledPromise"
  // TODO: Until Promise.delegate (see below).
}, Qn = {
  // *** Constructor Properties of the Global Object
  Date: "%InitialDate%",
  Error: "%InitialError%",
  RegExp: "%InitialRegExp%",
  // Omit `Symbol`, because we want the original to appear on the
  // start compartment without passing through the permits mechanism, since
  // we want to preserve all its properties, even if we never heard of them.
  // Symbol: '%InitialSymbol%',
  // *** Other Properties of the Global Object
  Math: "%InitialMath%",
  // ESNext
  // From Error-stack proposal
  // Only on initial global. No corresponding
  // powerless form for other globals.
  getStackString: "%InitialGetStackString%"
  // TODO https://github.com/Agoric/SES-shim/issues/551
  // Need initial WeakRef and FinalizationGroup in
  // start compartment only.
  // TODO Temporal
  // https://github.com/tc39/proposal-temporal
  // Temporal: '%InitialTemporal%' // with Temporal.Now
}, $s = {
  // *** Constructor Properties of the Global Object
  Date: "%SharedDate%",
  Error: "%SharedError%",
  RegExp: "%SharedRegExp%",
  Symbol: "%SharedSymbol%",
  // *** Other Properties of the Global Object
  Math: "%SharedMath%"
  // TODO Temporal
  // https://github.com/tc39/proposal-temporal
  // Temporal: '%SharedTemporal%' // without Temporal.Now
}, Rs = [
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError
  // https://github.com/endojs/endo/issues/550
  // Commented out to accommodate platforms prior to AggregateError.
  // Instead, conditional push below.
  // AggregateError,
];
typeof AggregateError < "u" && oe(Rs, AggregateError);
const wr = {
  "[[Proto]]": "%FunctionPrototype%",
  length: "number",
  name: "string"
  // Do not specify "prototype" here, since only Function instances that can
  // be used as a constructor have a prototype property. For constructors,
  // since prototype properties are instance-specific, we define it there.
}, Xi = {
  // This property is not mentioned in ECMA 262, but is present in V8 and
  // necessary for lockdown to succeed.
  "[[Proto]]": "%AsyncFunctionPrototype%"
}, a = wr, eo = Xi, C = {
  get: a,
  set: "undefined"
}, Ne = {
  get: a,
  set: a
}, Qi = function() {
};
Xe(["caller", "arguments"], (t) => {
  try {
    Qi[t];
  } catch (e) {
    e.message === "Restricted in strict mode" && (wr[t] = Ne);
  }
});
const to = (t) => t === C || t === Ne;
function at(t) {
  return {
    // Properties of the NativeError Constructors
    "[[Proto]]": "%SharedError%",
    // NativeError.prototype
    prototype: t
  };
}
function it(t) {
  return {
    // Properties of the NativeError Prototype Objects
    "[[Proto]]": "%ErrorPrototype%",
    constructor: t,
    message: "string",
    name: "string",
    // Redundantly present only on v8. Safe to remove.
    toString: !1,
    // Superfluously present in some versions of V8.
    // https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-26.md#:~:text=However%2C%20Chrome%2093,and%20node%2016.11.
    cause: !1
  };
}
function Ee(t) {
  return {
    // Properties of the TypedArray Constructors
    "[[Proto]]": "%TypedArray%",
    BYTES_PER_ELEMENT: "number",
    prototype: t
  };
}
function ke(t) {
  return {
    // Properties of the TypedArray Prototype Objects
    "[[Proto]]": "%TypedArrayPrototype%",
    BYTES_PER_ELEMENT: "number",
    constructor: t
  };
}
const ro = {
  E: "number",
  LN10: "number",
  LN2: "number",
  LOG10E: "number",
  LOG2E: "number",
  PI: "number",
  SQRT1_2: "number",
  SQRT2: "number",
  "@@toStringTag": "string",
  abs: a,
  acos: a,
  acosh: a,
  asin: a,
  asinh: a,
  atan: a,
  atanh: a,
  atan2: a,
  cbrt: a,
  ceil: a,
  clz32: a,
  cos: a,
  cosh: a,
  exp: a,
  expm1: a,
  floor: a,
  fround: a,
  hypot: a,
  imul: a,
  log: a,
  log1p: a,
  log10: a,
  log2: a,
  max: a,
  min: a,
  pow: a,
  round: a,
  sign: a,
  sin: a,
  sinh: a,
  sqrt: a,
  tan: a,
  tanh: a,
  trunc: a,
  // https://github.com/tc39/proposal-float16array
  f16round: a,
  // https://github.com/tc39/proposal-math-sum
  sumPrecise: a,
  // See https://github.com/Moddable-OpenSource/moddable/issues/523
  idiv: !1,
  // See https://github.com/Moddable-OpenSource/moddable/issues/523
  idivmod: !1,
  // See https://github.com/Moddable-OpenSource/moddable/issues/523
  imod: !1,
  // See https://github.com/Moddable-OpenSource/moddable/issues/523
  imuldiv: !1,
  // See https://github.com/Moddable-OpenSource/moddable/issues/523
  irem: !1,
  // See https://github.com/Moddable-OpenSource/moddable/issues/523
  mod: !1,
  // See https://github.com/Moddable-OpenSource/moddable/issues/523#issuecomment-1942904505
  irandom: !1
}, xr = {
  // ECMA https://tc39.es/ecma262
  // The intrinsics object has no prototype to avoid conflicts.
  "[[Proto]]": null,
  // %ThrowTypeError%
  "%ThrowTypeError%": a,
  // *** The Global Object
  // *** Value Properties of the Global Object
  Infinity: "number",
  NaN: "number",
  undefined: "undefined",
  // *** Function Properties of the Global Object
  // eval
  "%UniqueEval%": a,
  isFinite: a,
  isNaN: a,
  parseFloat: a,
  parseInt: a,
  decodeURI: a,
  decodeURIComponent: a,
  encodeURI: a,
  encodeURIComponent: a,
  // *** Fundamental Objects
  Object: {
    // Properties of the Object Constructor
    "[[Proto]]": "%FunctionPrototype%",
    assign: a,
    create: a,
    defineProperties: a,
    defineProperty: a,
    entries: a,
    freeze: a,
    fromEntries: a,
    getOwnPropertyDescriptor: a,
    getOwnPropertyDescriptors: a,
    getOwnPropertyNames: a,
    getOwnPropertySymbols: a,
    getPrototypeOf: a,
    is: a,
    isExtensible: a,
    isFrozen: a,
    isSealed: a,
    keys: a,
    preventExtensions: a,
    prototype: "%ObjectPrototype%",
    seal: a,
    setPrototypeOf: a,
    values: a,
    // https://github.com/tc39/proposal-accessible-object-hasownproperty
    hasOwn: a,
    // https://github.com/tc39/proposal-array-grouping
    groupBy: a,
    // Seen on QuickJS
    __getClass: !1
  },
  "%ObjectPrototype%": {
    // Properties of the Object Prototype Object
    "[[Proto]]": null,
    constructor: "Object",
    hasOwnProperty: a,
    isPrototypeOf: a,
    propertyIsEnumerable: a,
    toLocaleString: a,
    toString: a,
    valueOf: a,
    // Annex B: Additional Properties of the Object.prototype Object
    // See note in header about the difference between [[Proto]] and --proto--
    // special notations.
    "--proto--": Ne,
    __defineGetter__: a,
    __defineSetter__: a,
    __lookupGetter__: a,
    __lookupSetter__: a
  },
  "%UniqueFunction%": {
    // Properties of the Function Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%FunctionPrototype%"
  },
  "%InertFunction%": {
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%FunctionPrototype%"
  },
  "%FunctionPrototype%": {
    apply: a,
    bind: a,
    call: a,
    constructor: "%InertFunction%",
    toString: a,
    "@@hasInstance": a,
    // proposed but not yet std. To be removed if there
    caller: !1,
    // proposed but not yet std. To be removed if there
    arguments: !1,
    // Seen on QuickJS. TODO grab getter for use by console
    fileName: !1,
    // Seen on QuickJS. TODO grab getter for use by console
    lineNumber: !1
  },
  Boolean: {
    // Properties of the Boolean Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%BooleanPrototype%"
  },
  "%BooleanPrototype%": {
    constructor: "Boolean",
    toString: a,
    valueOf: a
  },
  "%SharedSymbol%": {
    // Properties of the Symbol Constructor
    "[[Proto]]": "%FunctionPrototype%",
    asyncIterator: "symbol",
    for: a,
    hasInstance: "symbol",
    isConcatSpreadable: "symbol",
    iterator: "symbol",
    keyFor: a,
    match: "symbol",
    matchAll: "symbol",
    prototype: "%SymbolPrototype%",
    replace: "symbol",
    search: "symbol",
    species: "symbol",
    split: "symbol",
    toPrimitive: "symbol",
    toStringTag: "symbol",
    unscopables: "symbol",
    // https://github.com/tc39/proposal-explicit-resource-management
    asyncDispose: "symbol",
    // https://github.com/tc39/proposal-explicit-resource-management
    dispose: "symbol",
    // Seen at core-js https://github.com/zloirock/core-js#ecmascript-symbol
    useSimple: !1,
    // Seen at core-js https://github.com/zloirock/core-js#ecmascript-symbol
    useSetter: !1,
    // Seen on QuickJS
    operatorSet: !1
  },
  "%SymbolPrototype%": {
    // Properties of the Symbol Prototype Object
    constructor: "%SharedSymbol%",
    description: C,
    toString: a,
    valueOf: a,
    "@@toPrimitive": a,
    "@@toStringTag": "string"
  },
  "%InitialError%": {
    // Properties of the Error Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%ErrorPrototype%",
    // Non standard, v8 only, used by tap
    captureStackTrace: a,
    // Non standard, v8 only, used by tap, tamed to accessor
    stackTraceLimit: Ne,
    // Non standard, v8 only, used by several, tamed to accessor
    prepareStackTrace: Ne,
    // https://github.com/tc39/proposal-is-error
    isError: a
  },
  "%SharedError%": {
    // Properties of the Error Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%ErrorPrototype%",
    // Non standard, v8 only, used by tap
    captureStackTrace: a,
    // Non standard, v8 only, used by tap, tamed to accessor
    stackTraceLimit: Ne,
    // Non standard, v8 only, used by several, tamed to accessor
    prepareStackTrace: Ne,
    // https://github.com/tc39/proposal-is-error
    isError: a
  },
  "%ErrorPrototype%": {
    constructor: "%SharedError%",
    message: "string",
    name: "string",
    toString: a,
    // proposed de-facto, assumed TODO
    // Seen on FF Nightly 88.0a1
    at: !1,
    // Seen on FF and XS
    stack: Ne,
    // Superfluously present in some versions of V8.
    // https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-26.md#:~:text=However%2C%20Chrome%2093,and%20node%2016.11.
    cause: !1
  },
  // NativeError
  EvalError: at("%EvalErrorPrototype%"),
  RangeError: at("%RangeErrorPrototype%"),
  ReferenceError: at("%ReferenceErrorPrototype%"),
  SyntaxError: at("%SyntaxErrorPrototype%"),
  TypeError: at("%TypeErrorPrototype%"),
  URIError: at("%URIErrorPrototype%"),
  // https://github.com/endojs/endo/issues/550
  AggregateError: at("%AggregateErrorPrototype%"),
  // TODO SuppressedError
  // https://github.com/tc39/proposal-explicit-resource-management
  // SuppressedError: NativeError('%SuppressedErrorPrototype%'),
  "%EvalErrorPrototype%": it("EvalError"),
  "%RangeErrorPrototype%": it("RangeError"),
  "%ReferenceErrorPrototype%": it("ReferenceError"),
  "%SyntaxErrorPrototype%": it("SyntaxError"),
  "%TypeErrorPrototype%": it("TypeError"),
  "%URIErrorPrototype%": it("URIError"),
  // https://github.com/endojs/endo/issues/550
  "%AggregateErrorPrototype%": it("AggregateError"),
  // TODO AggregateError .errors
  // TODO SuppressedError
  // https://github.com/tc39/proposal-explicit-resource-management
  // '%SuppressedErrorPrototype%': NativeErrorPrototype('SuppressedError'),
  // TODO SuppressedError .error
  // TODO SuppressedError .suppressed
  // *** Numbers and Dates
  Number: {
    // Properties of the Number Constructor
    "[[Proto]]": "%FunctionPrototype%",
    EPSILON: "number",
    isFinite: a,
    isInteger: a,
    isNaN: a,
    isSafeInteger: a,
    MAX_SAFE_INTEGER: "number",
    MAX_VALUE: "number",
    MIN_SAFE_INTEGER: "number",
    MIN_VALUE: "number",
    NaN: "number",
    NEGATIVE_INFINITY: "number",
    parseFloat: a,
    parseInt: a,
    POSITIVE_INFINITY: "number",
    prototype: "%NumberPrototype%"
  },
  "%NumberPrototype%": {
    // Properties of the Number Prototype Object
    constructor: "Number",
    toExponential: a,
    toFixed: a,
    toLocaleString: a,
    toPrecision: a,
    toString: a,
    valueOf: a
  },
  BigInt: {
    // Properties of the BigInt Constructor
    "[[Proto]]": "%FunctionPrototype%",
    asIntN: a,
    asUintN: a,
    prototype: "%BigIntPrototype%",
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    bitLength: !1,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    fromArrayBuffer: !1,
    // Seen on QuickJS
    tdiv: !1,
    // Seen on QuickJS
    fdiv: !1,
    // Seen on QuickJS
    cdiv: !1,
    // Seen on QuickJS
    ediv: !1,
    // Seen on QuickJS
    tdivrem: !1,
    // Seen on QuickJS
    fdivrem: !1,
    // Seen on QuickJS
    cdivrem: !1,
    // Seen on QuickJS
    edivrem: !1,
    // Seen on QuickJS
    sqrt: !1,
    // Seen on QuickJS
    sqrtrem: !1,
    // Seen on QuickJS
    floorLog2: !1,
    // Seen on QuickJS
    ctz: !1
  },
  "%BigIntPrototype%": {
    constructor: "BigInt",
    toLocaleString: a,
    toString: a,
    valueOf: a,
    "@@toStringTag": "string"
  },
  "%InitialMath%": {
    ...ro,
    // `%InitialMath%.random()` has the standard unsafe behavior
    random: a
  },
  "%SharedMath%": {
    ...ro,
    // `%SharedMath%.random()` is tamed to always throw
    random: a
  },
  "%InitialDate%": {
    // Properties of the Date Constructor
    "[[Proto]]": "%FunctionPrototype%",
    now: a,
    parse: a,
    prototype: "%DatePrototype%",
    UTC: a
  },
  "%SharedDate%": {
    // Properties of the Date Constructor
    "[[Proto]]": "%FunctionPrototype%",
    // `%SharedDate%.now()` is tamed to always throw
    now: a,
    parse: a,
    prototype: "%DatePrototype%",
    UTC: a
  },
  "%DatePrototype%": {
    constructor: "%SharedDate%",
    getDate: a,
    getDay: a,
    getFullYear: a,
    getHours: a,
    getMilliseconds: a,
    getMinutes: a,
    getMonth: a,
    getSeconds: a,
    getTime: a,
    getTimezoneOffset: a,
    getUTCDate: a,
    getUTCDay: a,
    getUTCFullYear: a,
    getUTCHours: a,
    getUTCMilliseconds: a,
    getUTCMinutes: a,
    getUTCMonth: a,
    getUTCSeconds: a,
    setDate: a,
    setFullYear: a,
    setHours: a,
    setMilliseconds: a,
    setMinutes: a,
    setMonth: a,
    setSeconds: a,
    setTime: a,
    setUTCDate: a,
    setUTCFullYear: a,
    setUTCHours: a,
    setUTCMilliseconds: a,
    setUTCMinutes: a,
    setUTCMonth: a,
    setUTCSeconds: a,
    toDateString: a,
    toISOString: a,
    toJSON: a,
    toLocaleDateString: a,
    toLocaleString: a,
    toLocaleTimeString: a,
    toString: a,
    toTimeString: a,
    toUTCString: a,
    valueOf: a,
    "@@toPrimitive": a,
    // Annex B: Additional Properties of the Date.prototype Object
    getYear: a,
    setYear: a,
    toGMTString: a
  },
  // Text Processing
  String: {
    // Properties of the String Constructor
    "[[Proto]]": "%FunctionPrototype%",
    fromCharCode: a,
    fromCodePoint: a,
    prototype: "%StringPrototype%",
    raw: a,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    fromArrayBuffer: !1
  },
  "%StringPrototype%": {
    // Properties of the String Prototype Object
    length: "number",
    charAt: a,
    charCodeAt: a,
    codePointAt: a,
    concat: a,
    constructor: "String",
    endsWith: a,
    includes: a,
    indexOf: a,
    lastIndexOf: a,
    localeCompare: a,
    match: a,
    matchAll: a,
    normalize: a,
    padEnd: a,
    padStart: a,
    repeat: a,
    replace: a,
    replaceAll: a,
    // ES2021
    search: a,
    slice: a,
    split: a,
    startsWith: a,
    substring: a,
    toLocaleLowerCase: a,
    toLocaleUpperCase: a,
    toLowerCase: a,
    toString: a,
    toUpperCase: a,
    trim: a,
    trimEnd: a,
    trimStart: a,
    valueOf: a,
    "@@iterator": a,
    // Failed tc39 proposal
    // https://github.com/tc39/proposal-relative-indexing-method
    at: a,
    // https://github.com/tc39/proposal-is-usv-string
    isWellFormed: a,
    toWellFormed: a,
    unicodeSets: a,
    // Annex B: Additional Properties of the String.prototype Object
    substr: a,
    anchor: a,
    big: a,
    blink: a,
    bold: a,
    fixed: a,
    fontcolor: a,
    fontsize: a,
    italics: a,
    link: a,
    small: a,
    strike: a,
    sub: a,
    sup: a,
    trimLeft: a,
    trimRight: a,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    compare: !1,
    // Seen on QuickJS
    __quote: !1
  },
  "%StringIteratorPrototype%": {
    "[[Proto]]": "%IteratorPrototype%",
    next: a,
    "@@toStringTag": "string"
  },
  "%InitialRegExp%": {
    // Properties of the RegExp Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%RegExpPrototype%",
    "@@species": C,
    // https://github.com/tc39/proposal-regex-escaping
    escape: a,
    // The https://github.com/tc39/proposal-regexp-legacy-features
    // are all optional, unsafe, and omitted
    input: !1,
    $_: !1,
    lastMatch: !1,
    "$&": !1,
    lastParen: !1,
    "$+": !1,
    leftContext: !1,
    "$`": !1,
    rightContext: !1,
    "$'": !1,
    $1: !1,
    $2: !1,
    $3: !1,
    $4: !1,
    $5: !1,
    $6: !1,
    $7: !1,
    $8: !1,
    $9: !1
  },
  "%SharedRegExp%": {
    // Properties of the RegExp Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%RegExpPrototype%",
    "@@species": C,
    // https://github.com/tc39/proposal-regex-escaping
    escape: a
  },
  "%RegExpPrototype%": {
    // Properties of the RegExp Prototype Object
    constructor: "%SharedRegExp%",
    exec: a,
    dotAll: C,
    flags: C,
    global: C,
    hasIndices: C,
    ignoreCase: C,
    "@@match": a,
    "@@matchAll": a,
    multiline: C,
    "@@replace": a,
    "@@search": a,
    source: C,
    "@@split": a,
    sticky: C,
    test: a,
    toString: a,
    unicode: C,
    unicodeSets: C,
    // Annex B: Additional Properties of the RegExp.prototype Object
    compile: !1
    // UNSAFE and suppressed.
  },
  "%RegExpStringIteratorPrototype%": {
    // The %RegExpStringIteratorPrototype% Object
    "[[Proto]]": "%IteratorPrototype%",
    next: a,
    "@@toStringTag": "string"
  },
  // Indexed Collections
  Array: {
    // Properties of the Array Constructor
    "[[Proto]]": "%FunctionPrototype%",
    from: a,
    isArray: a,
    of: a,
    prototype: "%ArrayPrototype%",
    "@@species": C,
    // Failed tc39 proposal
    // https://tc39.es/proposal-relative-indexing-method/
    at: a,
    // https://tc39.es/proposal-array-from-async/
    fromAsync: a
  },
  "%ArrayPrototype%": {
    // Properties of the Array Prototype Object
    length: "number",
    concat: a,
    constructor: "Array",
    copyWithin: a,
    entries: a,
    every: a,
    fill: a,
    filter: a,
    find: a,
    findIndex: a,
    flat: a,
    flatMap: a,
    forEach: a,
    includes: a,
    indexOf: a,
    join: a,
    keys: a,
    lastIndexOf: a,
    map: a,
    pop: a,
    push: a,
    reduce: a,
    reduceRight: a,
    reverse: a,
    shift: a,
    slice: a,
    some: a,
    sort: a,
    splice: a,
    toLocaleString: a,
    toString: a,
    unshift: a,
    values: a,
    "@@iterator": a,
    "@@unscopables": {
      "[[Proto]]": null,
      copyWithin: "boolean",
      entries: "boolean",
      fill: "boolean",
      find: "boolean",
      findIndex: "boolean",
      flat: "boolean",
      flatMap: "boolean",
      includes: "boolean",
      keys: "boolean",
      values: "boolean",
      // Failed tc39 proposal
      // https://tc39.es/proposal-relative-indexing-method/
      // Seen on FF Nightly 88.0a1
      at: "boolean",
      // See https://github.com/tc39/proposal-array-find-from-last
      findLast: "boolean",
      findLastIndex: "boolean",
      // https://github.com/tc39/proposal-change-array-by-copy
      toReversed: "boolean",
      toSorted: "boolean",
      toSpliced: "boolean",
      with: "boolean",
      // https://github.com/tc39/proposal-array-grouping
      group: "boolean",
      groupToMap: "boolean",
      groupBy: "boolean"
    },
    // See https://github.com/tc39/proposal-array-find-from-last
    findLast: a,
    findLastIndex: a,
    // https://github.com/tc39/proposal-change-array-by-copy
    toReversed: a,
    toSorted: a,
    toSpliced: a,
    with: a,
    // https://github.com/tc39/proposal-array-grouping
    group: a,
    // Not in proposal? Where?
    groupToMap: a,
    // Not in proposal? Where?
    groupBy: a,
    // Failed tc39 proposal
    // https://tc39.es/proposal-relative-indexing-method/
    at: a
  },
  "%ArrayIteratorPrototype%": {
    // The %ArrayIteratorPrototype% Object
    "[[Proto]]": "%IteratorPrototype%",
    next: a,
    "@@toStringTag": "string"
  },
  // *** TypedArray Objects
  "%TypedArray%": {
    // Properties of the %TypedArray% Intrinsic Object
    "[[Proto]]": "%FunctionPrototype%",
    from: a,
    of: a,
    prototype: "%TypedArrayPrototype%",
    "@@species": C
  },
  "%TypedArrayPrototype%": {
    buffer: C,
    byteLength: C,
    byteOffset: C,
    constructor: "%TypedArray%",
    copyWithin: a,
    entries: a,
    every: a,
    fill: a,
    filter: a,
    find: a,
    findIndex: a,
    forEach: a,
    includes: a,
    indexOf: a,
    join: a,
    keys: a,
    lastIndexOf: a,
    length: C,
    map: a,
    reduce: a,
    reduceRight: a,
    reverse: a,
    set: a,
    slice: a,
    some: a,
    sort: a,
    subarray: a,
    toLocaleString: a,
    toString: a,
    values: a,
    "@@iterator": a,
    "@@toStringTag": C,
    // Failed tc39 proposal
    // https://tc39.es/proposal-relative-indexing-method/
    at: a,
    // See https://github.com/tc39/proposal-array-find-from-last
    findLast: a,
    findLastIndex: a,
    // https://github.com/tc39/proposal-change-array-by-copy
    toReversed: a,
    toSorted: a,
    with: a
  },
  // The TypedArray Constructors
  BigInt64Array: Ee("%BigInt64ArrayPrototype%"),
  BigUint64Array: Ee("%BigUint64ArrayPrototype%"),
  // https://github.com/tc39/proposal-float16array
  Float16Array: Ee("%Float16ArrayPrototype%"),
  Float32Array: Ee("%Float32ArrayPrototype%"),
  Float64Array: Ee("%Float64ArrayPrototype%"),
  Int16Array: Ee("%Int16ArrayPrototype%"),
  Int32Array: Ee("%Int32ArrayPrototype%"),
  Int8Array: Ee("%Int8ArrayPrototype%"),
  Uint16Array: Ee("%Uint16ArrayPrototype%"),
  Uint32Array: Ee("%Uint32ArrayPrototype%"),
  Uint8ClampedArray: Ee("%Uint8ClampedArrayPrototype%"),
  Uint8Array: {
    ...Ee("%Uint8ArrayPrototype%"),
    // https://github.com/tc39/proposal-arraybuffer-base64
    fromBase64: a,
    // https://github.com/tc39/proposal-arraybuffer-base64
    fromHex: a
  },
  "%BigInt64ArrayPrototype%": ke("BigInt64Array"),
  "%BigUint64ArrayPrototype%": ke("BigUint64Array"),
  // https://github.com/tc39/proposal-float16array
  "%Float16ArrayPrototype%": ke("Float16Array"),
  "%Float32ArrayPrototype%": ke("Float32Array"),
  "%Float64ArrayPrototype%": ke("Float64Array"),
  "%Int16ArrayPrototype%": ke("Int16Array"),
  "%Int32ArrayPrototype%": ke("Int32Array"),
  "%Int8ArrayPrototype%": ke("Int8Array"),
  "%Uint16ArrayPrototype%": ke("Uint16Array"),
  "%Uint32ArrayPrototype%": ke("Uint32Array"),
  "%Uint8ClampedArrayPrototype%": ke("Uint8ClampedArray"),
  "%Uint8ArrayPrototype%": {
    ...ke("Uint8Array"),
    // https://github.com/tc39/proposal-arraybuffer-base64
    setFromBase64: a,
    // https://github.com/tc39/proposal-arraybuffer-base64
    setFromHex: a,
    // https://github.com/tc39/proposal-arraybuffer-base64
    toBase64: a,
    // https://github.com/tc39/proposal-arraybuffer-base64
    toHex: a
  },
  // *** Keyed Collections
  Map: {
    // Properties of the Map Constructor
    "[[Proto]]": "%FunctionPrototype%",
    "@@species": C,
    prototype: "%MapPrototype%",
    // https://github.com/tc39/proposal-array-grouping
    groupBy: a
  },
  "%MapPrototype%": {
    clear: a,
    constructor: "Map",
    delete: a,
    entries: a,
    forEach: a,
    get: a,
    has: a,
    keys: a,
    set: a,
    size: C,
    values: a,
    "@@iterator": a,
    "@@toStringTag": "string"
  },
  "%MapIteratorPrototype%": {
    // The %MapIteratorPrototype% Object
    "[[Proto]]": "%IteratorPrototype%",
    next: a,
    "@@toStringTag": "string"
  },
  Set: {
    // Properties of the Set Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%SetPrototype%",
    "@@species": C,
    // Seen on QuickJS
    groupBy: !1
  },
  "%SetPrototype%": {
    add: a,
    clear: a,
    constructor: "Set",
    delete: a,
    entries: a,
    forEach: a,
    has: a,
    keys: a,
    size: C,
    values: a,
    "@@iterator": a,
    "@@toStringTag": "string",
    // See https://github.com/tc39/proposal-set-methods
    intersection: a,
    // See https://github.com/tc39/proposal-set-methods
    union: a,
    // See https://github.com/tc39/proposal-set-methods
    difference: a,
    // See https://github.com/tc39/proposal-set-methods
    symmetricDifference: a,
    // See https://github.com/tc39/proposal-set-methods
    isSubsetOf: a,
    // See https://github.com/tc39/proposal-set-methods
    isSupersetOf: a,
    // See https://github.com/tc39/proposal-set-methods
    isDisjointFrom: a
  },
  "%SetIteratorPrototype%": {
    // The %SetIteratorPrototype% Object
    "[[Proto]]": "%IteratorPrototype%",
    next: a,
    "@@toStringTag": "string"
  },
  WeakMap: {
    // Properties of the WeakMap Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%WeakMapPrototype%"
  },
  "%WeakMapPrototype%": {
    constructor: "WeakMap",
    delete: a,
    get: a,
    has: a,
    set: a,
    "@@toStringTag": "string"
  },
  WeakSet: {
    // Properties of the WeakSet Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%WeakSetPrototype%"
  },
  "%WeakSetPrototype%": {
    add: a,
    constructor: "WeakSet",
    delete: a,
    has: a,
    "@@toStringTag": "string"
  },
  // *** Structured Data
  ArrayBuffer: {
    // Properties of the ArrayBuffer Constructor
    "[[Proto]]": "%FunctionPrototype%",
    isView: a,
    prototype: "%ArrayBufferPrototype%",
    "@@species": C,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    fromString: !1,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    fromBigInt: !1
  },
  "%ArrayBufferPrototype%": {
    byteLength: C,
    constructor: "ArrayBuffer",
    slice: a,
    "@@toStringTag": "string",
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    concat: !1,
    // See https://github.com/tc39/proposal-resizablearraybuffer
    transfer: a,
    resize: a,
    resizable: C,
    maxByteLength: C,
    // https://github.com/tc39/proposal-arraybuffer-transfer
    transferToFixedLength: a,
    detached: C,
    // https://github.com/endojs/endo/pull/2309#issuecomment-2155513240
    // to be proposed
    transferToImmutable: a,
    sliceToImmutable: a,
    immutable: C
  },
  // If this exists, it is purely an artifact of how we currently shim
  // `transferToImmutable`. As natively implemented, there would be no
  // such extra prototype.
  "%ImmutableArrayBufferPrototype%": {
    "[[Proto]]": "%ArrayBufferPrototype%",
    byteLength: C,
    slice: a,
    // See https://github.com/endojs/endo/tree/master/packages/immutable-arraybuffer#purposeful-violation
    "@@toStringTag": "string",
    // See https://github.com/tc39/proposal-resizablearraybuffer
    transfer: a,
    resize: a,
    resizable: C,
    maxByteLength: C,
    // https://github.com/tc39/proposal-arraybuffer-transfer
    transferToFixedLength: a,
    detached: C,
    // https://github.com/endojs/endo/pull/2309#issuecomment-2155513240
    // to be proposed
    transferToImmutable: a,
    sliceToImmutable: a,
    immutable: C
  },
  // SharedArrayBuffer Objects
  SharedArrayBuffer: !1,
  // UNSAFE and purposely suppressed.
  "%SharedArrayBufferPrototype%": !1,
  // UNSAFE and purposely suppressed.
  DataView: {
    // Properties of the DataView Constructor
    "[[Proto]]": "%FunctionPrototype%",
    BYTES_PER_ELEMENT: "number",
    // Non std but undeletable on Safari.
    prototype: "%DataViewPrototype%"
  },
  "%DataViewPrototype%": {
    buffer: C,
    byteLength: C,
    byteOffset: C,
    constructor: "DataView",
    getBigInt64: a,
    getBigUint64: a,
    // https://github.com/tc39/proposal-float16array
    getFloat16: a,
    getFloat32: a,
    getFloat64: a,
    getInt8: a,
    getInt16: a,
    getInt32: a,
    getUint8: a,
    getUint16: a,
    getUint32: a,
    setBigInt64: a,
    setBigUint64: a,
    // https://github.com/tc39/proposal-float16array
    setFloat16: a,
    setFloat32: a,
    setFloat64: a,
    setInt8: a,
    setInt16: a,
    setInt32: a,
    setUint8: a,
    setUint16: a,
    setUint32: a,
    "@@toStringTag": "string"
  },
  // Atomics
  Atomics: !1,
  // UNSAFE and suppressed.
  JSON: {
    parse: a,
    stringify: a,
    "@@toStringTag": "string",
    // https://github.com/tc39/proposal-json-parse-with-source/
    rawJSON: a,
    isRawJSON: a
  },
  // *** Control Abstraction Objects
  // https://github.com/tc39/proposal-iterator-helpers
  Iterator: {
    // Properties of the Iterator Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%IteratorPrototype%",
    from: a,
    // https://github.com/tc39/proposal-joint-iteration
    zip: a,
    zipKeyed: a,
    // https://github.com/tc39/proposal-iterator-sequencing
    concat: a
  },
  "%IteratorPrototype%": {
    // The %IteratorPrototype% Object
    "@@iterator": a,
    // https://github.com/tc39/proposal-iterator-helpers
    constructor: "Iterator",
    map: a,
    filter: a,
    take: a,
    drop: a,
    flatMap: a,
    reduce: a,
    toArray: a,
    forEach: a,
    some: a,
    every: a,
    find: a,
    "@@toStringTag": "string",
    // https://github.com/tc39/proposal-async-iterator-helpers
    toAsync: a,
    // https://github.com/tc39/proposal-explicit-resource-management
    // See https://github.com/Moddable-OpenSource/moddable/issues/523#issuecomment-1942904505
    "@@dispose": !1
  },
  // https://github.com/tc39/proposal-iterator-helpers
  "%WrapForValidIteratorPrototype%": {
    "[[Proto]]": "%IteratorPrototype%",
    next: a,
    return: a
  },
  // https://github.com/tc39/proposal-iterator-helpers
  "%IteratorHelperPrototype%": {
    "[[Proto]]": "%IteratorPrototype%",
    next: a,
    return: a,
    "@@toStringTag": "string"
  },
  // https://github.com/tc39/proposal-async-iterator-helpers
  AsyncIterator: {
    // Properties of the Iterator Constructor
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%AsyncIteratorPrototype%",
    from: a
  },
  "%AsyncIteratorPrototype%": {
    // The %AsyncIteratorPrototype% Object
    "@@asyncIterator": a,
    // https://github.com/tc39/proposal-async-iterator-helpers
    constructor: "AsyncIterator",
    map: a,
    filter: a,
    take: a,
    drop: a,
    flatMap: a,
    reduce: a,
    toArray: a,
    forEach: a,
    some: a,
    every: a,
    find: a,
    "@@toStringTag": "string",
    // https://github.com/tc39/proposal-explicit-resource-management
    // See https://github.com/Moddable-OpenSource/moddable/issues/523#issuecomment-1942904505
    "@@asyncDispose": !1
  },
  // https://github.com/tc39/proposal-async-iterator-helpers
  "%WrapForValidAsyncIteratorPrototype%": {
    "[[Proto]]": "%AsyncIteratorPrototype%",
    next: a,
    return: a
  },
  // https://github.com/tc39/proposal-async-iterator-helpers
  "%AsyncIteratorHelperPrototype%": {
    "[[Proto]]": "%AsyncIteratorPrototype%",
    next: a,
    return: a,
    "@@toStringTag": "string"
  },
  "%InertGeneratorFunction%": {
    // Properties of the GeneratorFunction Constructor
    "[[Proto]]": "%InertFunction%",
    prototype: "%Generator%"
  },
  "%Generator%": {
    // Properties of the GeneratorFunction Prototype Object
    "[[Proto]]": "%FunctionPrototype%",
    constructor: "%InertGeneratorFunction%",
    prototype: "%GeneratorPrototype%",
    "@@toStringTag": "string"
  },
  "%InertAsyncGeneratorFunction%": {
    // Properties of the AsyncGeneratorFunction Constructor
    "[[Proto]]": "%InertFunction%",
    prototype: "%AsyncGenerator%"
  },
  "%AsyncGenerator%": {
    // Properties of the AsyncGeneratorFunction Prototype Object
    "[[Proto]]": "%FunctionPrototype%",
    constructor: "%InertAsyncGeneratorFunction%",
    prototype: "%AsyncGeneratorPrototype%",
    // length prop added here for React Native jsc-android
    // https://github.com/endojs/endo/issues/660
    // https://github.com/react-native-community/jsc-android-buildscripts/issues/181
    length: "number",
    "@@toStringTag": "string"
  },
  "%GeneratorPrototype%": {
    // Properties of the Generator Prototype Object
    "[[Proto]]": "%IteratorPrototype%",
    constructor: "%Generator%",
    next: a,
    return: a,
    throw: a,
    "@@toStringTag": "string"
  },
  "%AsyncGeneratorPrototype%": {
    // Properties of the AsyncGenerator Prototype Object
    "[[Proto]]": "%AsyncIteratorPrototype%",
    constructor: "%AsyncGenerator%",
    next: a,
    return: a,
    throw: a,
    "@@toStringTag": "string"
  },
  // TODO: To be replaced with Promise.delegate
  //
  // The HandledPromise global variable shimmed by `@agoric/eventual-send/shim`
  // implements an initial version of the eventual send specification at:
  // https://github.com/tc39/proposal-eventual-send
  //
  // We will likely change this to add a property to Promise called
  // Promise.delegate and put static methods on it, which will necessitate
  // another permits change to update to the current proposed standard.
  HandledPromise: {
    "[[Proto]]": "Promise",
    applyFunction: a,
    applyFunctionSendOnly: a,
    applyMethod: a,
    applyMethodSendOnly: a,
    get: a,
    getSendOnly: a,
    prototype: "%PromisePrototype%",
    resolve: a
  },
  // https://github.com/tc39/proposal-source-phase-imports?tab=readme-ov-file#js-module-source
  ModuleSource: {
    "[[Proto]]": "%AbstractModuleSource%",
    prototype: "%ModuleSourcePrototype%"
  },
  "%ModuleSourcePrototype%": {
    "[[Proto]]": "%AbstractModuleSourcePrototype%",
    constructor: "ModuleSource",
    "@@toStringTag": "string",
    // https://github.com/tc39/proposal-compartments
    bindings: C,
    needsImport: C,
    needsImportMeta: C,
    // @endo/module-source provides a legacy interface
    imports: C,
    exports: C,
    reexports: C
  },
  "%AbstractModuleSource%": {
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%AbstractModuleSourcePrototype%"
  },
  "%AbstractModuleSourcePrototype%": {
    constructor: "%AbstractModuleSource%"
  },
  Promise: {
    // Properties of the Promise Constructor
    "[[Proto]]": "%FunctionPrototype%",
    all: a,
    allSettled: a,
    // https://github.com/Agoric/SES-shim/issues/550
    any: a,
    prototype: "%PromisePrototype%",
    race: a,
    reject: a,
    resolve: a,
    // https://github.com/tc39/proposal-promise-with-resolvers
    withResolvers: a,
    "@@species": C,
    // https://github.com/tc39/proposal-promise-try
    try: a
  },
  "%PromisePrototype%": {
    // Properties of the Promise Prototype Object
    catch: a,
    constructor: "Promise",
    finally: a,
    then: a,
    "@@toStringTag": "string",
    // Non-standard, used in node to prevent async_hooks from breaking
    "UniqueSymbol(async_id_symbol)": Ne,
    "UniqueSymbol(trigger_async_id_symbol)": Ne,
    "UniqueSymbol(destroyed)": Ne
  },
  "%InertAsyncFunction%": {
    // Properties of the AsyncFunction Constructor
    "[[Proto]]": "%InertFunction%",
    prototype: "%AsyncFunctionPrototype%"
  },
  "%AsyncFunctionPrototype%": {
    // Properties of the AsyncFunction Prototype Object
    "[[Proto]]": "%FunctionPrototype%",
    constructor: "%InertAsyncFunction%",
    // length prop added here for React Native jsc-android
    // https://github.com/endojs/endo/issues/660
    // https://github.com/react-native-community/jsc-android-buildscripts/issues/181
    length: "number",
    "@@toStringTag": "string"
  },
  // Reflection
  Reflect: {
    // The Reflect Object
    // Not a function object.
    apply: a,
    construct: a,
    defineProperty: a,
    deleteProperty: a,
    get: a,
    getOwnPropertyDescriptor: a,
    getPrototypeOf: a,
    has: a,
    isExtensible: a,
    ownKeys: a,
    preventExtensions: a,
    set: a,
    setPrototypeOf: a,
    "@@toStringTag": "string"
  },
  Proxy: {
    // Properties of the Proxy Constructor
    "[[Proto]]": "%FunctionPrototype%",
    revocable: a
  },
  // Appendix B
  // Annex B: Additional Properties of the Global Object
  escape: a,
  unescape: a,
  // Proposed
  "%UniqueCompartment%": {
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%CompartmentPrototype%",
    toString: a
  },
  "%InertCompartment%": {
    "[[Proto]]": "%FunctionPrototype%",
    prototype: "%CompartmentPrototype%",
    toString: a
  },
  "%CompartmentPrototype%": {
    constructor: "%InertCompartment%",
    evaluate: a,
    globalThis: C,
    name: C,
    import: eo,
    load: eo,
    importNow: a,
    module: a,
    "@@toStringTag": "string"
  },
  lockdown: a,
  harden: { ...a, isFake: "boolean" },
  "%InitialGetStackString%": a
}, ec = (t) => typeof t == "function";
function tc(t, e, r) {
  if (ee(t, e)) {
    const n = te(t, e);
    if (!n || !Tr(n.value, r.value) || n.get !== r.get || n.set !== r.set || n.writable !== r.writable || n.enumerable !== r.enumerable || n.configurable !== r.configurable)
      throw b(`Conflicting definitions of ${e}`);
  }
  B(t, e, r);
}
function rc(t, e) {
  for (const [r, n] of ge(e))
    tc(t, r, n);
}
function Ns(t, e) {
  const r = { __proto__: null };
  for (const [n, o] of ge(e))
    ee(t, n) && (r[o] = t[n]);
  return r;
}
const Os = (t) => {
  const e = K(null);
  let r;
  const n = (l) => {
    rc(e, Ue(l));
  };
  v(n);
  const o = () => {
    for (const [l, u] of ge(e)) {
      if (Ae(u) || !ee(u, "prototype"))
        continue;
      const f = xr[l];
      if (typeof f != "object")
        throw b(`Expected permit object at permits.${l}`);
      const d = f.prototype;
      if (!d) {
        Is(
          u,
          "prototype",
          !1,
          `${l}.prototype`,
          t
        );
        continue;
      }
      if (typeof d != "string" || !ee(xr, d))
        throw b(`Unrecognized ${l}.prototype permits entry`);
      const p = u.prototype;
      if (ee(e, d)) {
        if (e[d] !== p)
          throw b(`Conflicting bindings of ${d}`);
        continue;
      }
      e[d] = p;
    }
  };
  v(o);
  const s = () => (v(e), r = new Lt(gt(jo(e), ec)), e);
  v(s);
  const c = (l) => {
    if (!r)
      throw b(
        "isPseudoNative can only be called after finalIntrinsics"
      );
    return Qt(r, l);
  };
  v(c);
  const i = {
    addIntrinsics: n,
    completePrototypes: o,
    finalIntrinsics: s,
    isPseudoNative: c
  };
  return v(i), n(Ts), n(Ns(A, Cs)), i;
}, nc = (t, e) => {
  const { addIntrinsics: r, finalIntrinsics: n } = Os(e);
  return r(Ns(t, $s)), n();
};
function oc(t, e, r) {
  const n = ["undefined", "boolean", "number", "string", "symbol"], o = new Me(
    wt ? be(
      gt(
        ge(xr["%SharedSymbol%"]),
        ([d, p]) => p === "symbol" && typeof wt[d] == "symbol"
      ),
      ([d]) => [wt[d], `@@${d}`]
    ) : []
  );
  function s(d, p) {
    if (typeof p == "string")
      return p;
    const m = He(o, p);
    if (typeof p == "symbol") {
      if (m)
        return m;
      {
        const g = Aa(p);
        return g !== void 0 ? `RegisteredSymbol(${g})` : `Unique${ye(p)}`;
      }
    }
    throw b(`Unexpected property name type ${d} ${p}`);
  }
  function c(d, p, m) {
    if (Ae(p))
      throw b(`Object expected: ${d}, ${ye(p)}, ${m}`);
    const g = Z(p);
    if (!(g === null && m === null)) {
      if (m !== void 0 && typeof m != "string")
        throw b(`Malformed permit ${d}.__proto__`);
      if (g !== t[m || "%ObjectPrototype%"])
        throw b(
          `Unexpected [[Prototype]] at ${d}.__proto__ (expected ${m || "%ObjectPrototype%"})`
        );
    }
  }
  function i(d, p, m, g) {
    if (typeof g == "object")
      return f(d, p, g), !0;
    if (g === !1)
      return !1;
    if (typeof g == "string") {
      if (m === "prototype" || m === "constructor") {
        if (ee(t, g)) {
          if (p !== t[g])
            throw b(`Does not match permit for ${d}`);
          return !0;
        }
      } else if (Nr(n, g)) {
        if (typeof p !== g)
          throw b(
            `At ${d} expected ${g} not ${typeof p}`
          );
        return !0;
      }
    }
    throw b(
      `Unexpected property ${m} with permit ${g} at ${d}`
    );
  }
  function l(d, p, m, g) {
    const w = te(p, m);
    if (!w)
      throw b(`Property ${m} not found at ${d}`);
    if (ee(w, "value")) {
      if (to(g))
        throw b(`Accessor expected at ${d}`);
      return i(d, w.value, m, g);
    }
    if (!to(g))
      throw b(`Accessor not expected at ${d}`);
    return i(`${d}<get>`, w.get, m, g.get) && i(`${d}<set>`, w.set, m, g.set);
  }
  function u(d, p, m) {
    const g = m === "__proto__" ? "--proto--" : m;
    if (ee(p, g))
      return p[g];
    if (typeof d == "function" && ee(wr, g))
      return wr[g];
  }
  function f(d, p, m) {
    if (p == null)
      return;
    const g = m["[[Proto]]"];
    c(d, p, g), typeof p == "function" && e(p);
    for (const w of Ge(p)) {
      const h = s(d, w), _ = `${d}.${h}`, E = u(p, m, h);
      (!E || !l(_, p, w, E)) && Is(p, w, E === !1, _, r);
    }
  }
  f("intrinsics", t, xr);
}
function sc() {
  try {
    me.prototype.constructor("return 1");
  } catch {
    return v({});
  }
  const t = {};
  function e(r, n, o) {
    let s;
    try {
      s = (0, eval)(o);
    } catch (l) {
      if (l instanceof Kt)
        return;
      throw l;
    }
    const c = Z(s), i = function() {
      throw b(
        "Function.prototype.constructor is not a valid constructor."
      );
    };
    z(i, {
      prototype: { value: c },
      name: {
        value: r,
        writable: !1,
        enumerable: !1,
        configurable: !0
      }
    }), z(c, {
      constructor: { value: i }
    }), i !== me.prototype.constructor && ur(i, me.prototype.constructor), t[n] = i;
  }
  return e("Function", "%InertFunction%", "(function(){})"), e(
    "GeneratorFunction",
    "%InertGeneratorFunction%",
    "(function*(){})"
  ), e(
    "AsyncFunction",
    "%InertAsyncFunction%",
    "(async function(){})"
  ), tn !== void 0 && e(
    "AsyncGeneratorFunction",
    "%InertAsyncGeneratorFunction%",
    "(async function*(){})"
  ), t;
}
function ac() {
  const t = ya, e = t.prototype, r = {
    /**
     * `%SharedDate%.now()` throw a `TypeError` starting with "secure mode".
     * See https://github.com/endojs/endo/issues/910#issuecomment-1581855420
     */
    now() {
      throw b("secure mode Calling %SharedDate%.now() throws");
    }
  }, n = ({ powers: c = "none" } = {}) => {
    let i;
    return c === "original" ? i = function(...u) {
      return new.target === void 0 ? le(t, void 0, u) : dr(t, u, new.target);
    } : i = function(...u) {
      if (new.target === void 0)
        throw b(
          "secure mode Calling %SharedDate% constructor as a function throws"
        );
      if (u.length === 0)
        throw b(
          "secure mode Calling new %SharedDate%() with no arguments throws"
        );
      return dr(t, u, new.target);
    }, z(i, {
      length: { value: 7 },
      prototype: {
        value: e,
        writable: !1,
        enumerable: !1,
        configurable: !1
      },
      parse: {
        value: t.parse,
        writable: !0,
        enumerable: !1,
        configurable: !0
      },
      UTC: {
        value: t.UTC,
        writable: !0,
        enumerable: !1,
        configurable: !0
      }
    }), i;
  }, o = n({ powers: "original" }), s = n({ powers: "none" });
  return z(o, {
    now: {
      value: t.now,
      writable: !0,
      enumerable: !1,
      configurable: !0
    }
  }), z(s, {
    now: {
      value: r.now,
      writable: !0,
      enumerable: !1,
      configurable: !0
    }
  }), z(e, {
    constructor: { value: s }
  }), {
    "%InitialDate%": o,
    "%SharedDate%": s
  };
}
function ic() {
  const t = ba, e = t, { random: r, ...n } = Ue(t), s = K(wn, {
    ...n,
    random: {
      value: {
        /**
         * `%SharedMath%.random()` throws a TypeError starting with "secure mode".
         * See https://github.com/endojs/endo/issues/910#issuecomment-1581855420
         */
        random() {
          throw b("secure mode %SharedMath%.random() throws");
        }
      }.random,
      writable: !0,
      enumerable: !1,
      configurable: !0
    }
  });
  return {
    "%InitialMath%": e,
    "%SharedMath%": s
  };
}
function cc(t = "safe") {
  const e = Ye.prototype, r = (s = {}) => {
    const c = function(...l) {
      return new.target === void 0 ? Ye(...l) : dr(Ye, l, new.target);
    };
    if (z(c, {
      length: { value: 2 },
      prototype: {
        value: e,
        writable: !1,
        enumerable: !1,
        configurable: !1
      }
    }), Gr) {
      const i = te(
        Ye,
        Gr
      );
      if (!i)
        throw b("no RegExp[Symbol.species] descriptor");
      z(c, {
        [Gr]: i
      });
    }
    return c;
  }, n = r(), o = r();
  return t !== "unsafe" && delete e.compile, z(e, {
    constructor: { value: o }
  }), {
    "%InitialRegExp%": n,
    "%SharedRegExp%": o
  };
}
const lc = {
  "%ObjectPrototype%": {
    toString: !0
  },
  "%FunctionPrototype%": {
    toString: !0
    // set by "rollup"
  },
  "%ErrorPrototype%": {
    name: !0
    // set by "precond", "ava", "node-fetch"
  },
  "%IteratorPrototype%": {
    toString: !0,
    // https://github.com/tc39/proposal-iterator-helpers
    constructor: !0,
    // https://github.com/tc39/proposal-iterator-helpers
    [et]: !0
  }
}, Ms = {
  "%ObjectPrototype%": {
    toString: !0,
    valueOf: !0
  },
  "%ArrayPrototype%": {
    toString: !0,
    push: !0,
    // set by "Google Analytics"
    concat: !0,
    // set by mobx generated code (old TS compiler?)
    [Le]: !0
    // set by mobx generated code (old TS compiler?)
  },
  // Function.prototype has no 'prototype' property to enable.
  // Function instances have their own 'name' and 'length' properties
  // which are configurable and non-writable. Thus, they are already
  // non-assignable anyway.
  "%FunctionPrototype%": {
    constructor: !0,
    // set by "regenerator-runtime"
    bind: !0,
    // set by "underscore", "express"
    toString: !0
    // set by "rollup"
  },
  "%ErrorPrototype%": {
    constructor: !0,
    // set by "fast-json-patch", "node-fetch"
    message: !0,
    name: !0,
    // set by "precond", "ava", "node-fetch", "node 14"
    toString: !0
    // set by "bluebird"
  },
  "%TypeErrorPrototype%": {
    constructor: !0,
    // set by "readable-stream"
    message: !0,
    // set by "tape"
    name: !0
    // set by "readable-stream", "node 14"
  },
  "%SyntaxErrorPrototype%": {
    message: !0,
    // to match TypeErrorPrototype.message
    name: !0
    // set by "node 14"
  },
  "%RangeErrorPrototype%": {
    message: !0,
    // to match TypeErrorPrototype.message
    name: !0
    // set by "node 14"
  },
  "%URIErrorPrototype%": {
    message: !0,
    // to match TypeErrorPrototype.message
    name: !0
    // set by "node 14"
  },
  "%EvalErrorPrototype%": {
    message: !0,
    // to match TypeErrorPrototype.message
    name: !0
    // set by "node 14"
  },
  "%ReferenceErrorPrototype%": {
    message: !0,
    // to match TypeErrorPrototype.message
    name: !0
    // set by "node 14"
  },
  // https://github.com/endojs/endo/issues/550
  "%AggregateErrorPrototype%": {
    message: !0,
    // to match TypeErrorPrototype.message
    name: !0
    // set by "node 14"?
  },
  "%PromisePrototype%": {
    constructor: !0
    // set by "core-js"
  },
  "%TypedArrayPrototype%": "*",
  // set by https://github.com/feross/buffer
  "%Generator%": {
    constructor: !0,
    name: !0,
    toString: !0
  },
  "%IteratorPrototype%": {
    toString: !0,
    // https://github.com/tc39/proposal-iterator-helpers
    constructor: !0,
    // https://github.com/tc39/proposal-iterator-helpers
    [et]: !0
  }
}, uc = {
  ...Ms,
  /**
   * Rollup (as used at least by vega) and webpack
   * (as used at least by regenerator) both turn exports into assignments
   * to a big `exports` object that inherits directly from
   * `Object.prototype`. Some of the exported names we've seen include
   * `hasOwnProperty`, `constructor`, and `toString`. But the strategy used
   * by rollup and webpack potentionally turns any exported name
   * into an assignment rejected by the override mistake. That's why
   * the `severe` enablements takes the extreme step of enabling
   * everything on `Object.prototype`.
   *
   * In addition, code doing inheritance manually will often override
   * the `constructor` property on the new prototype by assignment. We've
   * seen this several times.
   *
   * The cost of enabling all these is that they create a miserable debugging
   * experience specifically on Node.
   * https://github.com/Agoric/agoric-sdk/issues/2324
   * explains how it confused the Node console.
   *
   * (TODO Reexamine the vscode situation. I think it may have improved
   * since the following paragraph was written.)
   *
   * The vscode debugger's object inspector shows the own data properties of
   * an object, which is typically what you want, but also shows both getter
   * and setter for every accessor property whether inherited or own.
   * With the `'*'` setting here, all the properties inherited from
   * `Object.prototype` are accessors, creating an unusable display as seen
   * at As explained at
   * https://github.com/endojs/endo/blob/master/packages/ses/docs/lockdown.md#overridetaming-options
   * Open the triangles at the bottom of that section.
   */
  "%ObjectPrototype%": "*",
  /**
   * The widely used Buffer defined at https://github.com/feross/buffer
   * on initialization, manually creates the equivalent of a subclass of
   * `TypedArray`, which it then initializes by assignment. These assignments
   * include enough of the `TypeArray` methods that here, the `severe`
   * enablements just enable them all.
   */
  "%TypedArrayPrototype%": "*",
  /**
   * Needed to work with Immer before https://github.com/immerjs/immer/pull/914
   * is accepted.
   */
  "%MapPrototype%": "*",
  /**
   * Needed to work with Immer before https://github.com/immerjs/immer/pull/914
   * is accepted.
   */
  "%SetPrototype%": "*"
};
function dc(t, e, { warn: r }, n = []) {
  const o = new Mt(n);
  function s(f, d, p, m) {
    if ("value" in m && m.configurable) {
      const { value: g } = m, w = Sn(o, p), { get: h, set: _ } = te(
        {
          get [p]() {
            return g;
          },
          set [p](E) {
            if (d === this)
              throw b(
                `Cannot assign to read only property '${ye(
                  p
                )}' of '${f}'`
              );
            ee(this, p) ? this[p] = E : (w && r(b(`Override property ${p}`)), B(this, p, {
              value: E,
              writable: !0,
              enumerable: !0,
              configurable: !0
            }));
          }
        },
        p
      );
      B(h, "originalValue", {
        value: g,
        writable: !1,
        enumerable: !1,
        configurable: !1
      }), B(d, p, {
        get: h,
        set: _,
        enumerable: m.enumerable,
        configurable: m.configurable
      });
    }
  }
  function c(f, d, p) {
    const m = te(d, p);
    m && s(f, d, p, m);
  }
  function i(f, d) {
    const p = Ue(d);
    p && Xe(Ge(p), (m) => s(f, d, m, p[m]));
  }
  function l(f, d, p) {
    for (const m of Ge(p)) {
      const g = te(d, m);
      if (!g || g.get || g.set)
        continue;
      const w = `${f}.${ye(m)}`, h = p[m];
      if (h === !0)
        c(w, d, m);
      else if (h === "*")
        i(w, g.value);
      else if (!Ae(h))
        l(w, g.value, h);
      else
        throw b(`Unexpected override enablement plan ${w}`);
    }
  }
  let u;
  switch (e) {
    case "min": {
      u = lc;
      break;
    }
    case "moderate": {
      u = Ms;
      break;
    }
    case "severe": {
      u = uc;
      break;
    }
    default:
      throw b(`unrecognized overrideTaming ${e}`);
  }
  l("root", t, u);
}
const { Fail: cn, quote: Sr } = J, fc = /^(\w*[a-z])Locale([A-Z]\w*)$/, Ls = {
  // See https://tc39.es/ecma262/#sec-string.prototype.localecompare
  localeCompare(t) {
    if (this === null || this === void 0)
      throw b(
        'Cannot localeCompare with null or undefined "this" value'
      );
    const e = `${this}`, r = `${t}`;
    return e < r ? -1 : e > r ? 1 : (e === r || cn`expected ${Sr(e)} and ${Sr(r)} to compare`, 0);
  },
  toString() {
    return `${this}`;
  }
}, pc = Ls.localeCompare, mc = Ls.toString;
function hc(t, e = "safe") {
  if (e !== "unsafe") {
    B(ye.prototype, "localeCompare", {
      value: pc
    });
    for (const r of Pt(t)) {
      const n = t[r];
      if (!Ae(n))
        for (const o of Pt(n)) {
          const s = kn(fc, o);
          if (s) {
            typeof n[o] == "function" || cn`expected ${Sr(o)} to be a function`;
            const c = `${s[1]}${s[2]}`, i = n[c];
            typeof i == "function" || cn`function ${Sr(c)} not found`, B(n, o, { value: i });
          }
        }
    }
    B(Fo.prototype, "toLocaleString", {
      value: mc
    });
  }
}
const gc = (t) => ({
  eval(r) {
    return typeof r != "string" ? r : t(r);
  }
}).eval, { Fail: no } = J, yc = (t) => {
  const e = function(n) {
    const o = `${pr(arguments) || ""}`, s = `${Dt(arguments, ",")}`;
    new me(s, ""), new me(o);
    const c = `(function anonymous(${s}
) {
${o}
})`;
    return t(c);
  };
  return z(e, {
    // Ensure that any function created in any evaluator in a realm is an
    // instance of Function in any evaluator of the same realm.
    prototype: {
      value: me.prototype,
      writable: !1,
      enumerable: !1,
      configurable: !1
    }
  }), Z(me) === me.prototype || no`Function prototype is the same accross compartments`, Z(e) === me.prototype || no`Function constructor prototype is the same across compartments`, e;
}, _c = (t) => {
  B(
    t,
    ka,
    v(
      Yt(K(null), {
        set: v(() => {
          throw b(
            "Cannot set Symbol.unscopables of a Compartment's globalThis"
          );
        }),
        enumerable: !1,
        configurable: !1
      })
    )
  );
}, Fs = (t) => {
  for (const [e, r] of ge(Ts))
    B(t, e, {
      value: r,
      writable: !1,
      enumerable: !1,
      configurable: !1
    });
}, Ds = (t, {
  intrinsics: e,
  newGlobalPropertyNames: r,
  makeCompartmentConstructor: n,
  markVirtualizedNativeFunction: o,
  parentCompartment: s
}) => {
  for (const [i, l] of ge(Cs))
    ee(e, l) && B(t, i, {
      value: e[l],
      writable: !0,
      enumerable: !1,
      configurable: !0
    });
  for (const [i, l] of ge(r))
    ee(e, l) && B(t, i, {
      value: e[l],
      writable: !0,
      enumerable: !1,
      configurable: !0
    });
  const c = {
    globalThis: t
  };
  c.Compartment = v(
    n(
      n,
      e,
      o,
      {
        parentCompartment: s,
        enforceNew: !0
      }
    )
  );
  for (const [i, l] of ge(c))
    B(t, i, {
      value: l,
      writable: !0,
      enumerable: !1,
      configurable: !0
    }), typeof l == "function" && o(l);
}, ln = (t, e, r) => {
  {
    const n = v(gc(e));
    r(n), B(t, "eval", {
      value: n,
      writable: !0,
      enumerable: !1,
      configurable: !0
    });
  }
  {
    const n = v(yc(e));
    r(n), B(t, "Function", {
      value: n,
      writable: !0,
      enumerable: !1,
      configurable: !0
    });
  }
}, { Fail: vc, quote: Us } = J, js = v({ __proto__: null }), Bs = new Ir(
  js,
  v({
    get(t, e) {
      vc`Please report unexpected scope handler trap: ${Us(ye(e))}`;
    }
  })
), bc = {
  get(t, e) {
  },
  set(t, e, r) {
    throw Zt(`${ye(e)} is not defined`);
  },
  has(t, e) {
    return !0;
  },
  // note: this is likely a bug of safari
  // https://bugs.webkit.org/show_bug.cgi?id=195534
  getPrototypeOf(t) {
    return null;
  },
  // See https://github.com/endojs/endo/issues/1510
  // TODO: report as bug to v8 or Chrome, and record issue link here.
  getOwnPropertyDescriptor(t, e) {
    const r = Us(ye(e));
    console.warn(
      `getOwnPropertyDescriptor trap on scopeTerminatorHandler for ${r}`,
      b().stack
    );
  },
  // See https://github.com/endojs/endo/issues/1490
  // TODO Report bug to JSC or Safari
  ownKeys(t) {
    return [];
  }
}, zs = v(
  K(
    Bs,
    Ue(bc)
  )
), wc = new Ir(
  js,
  zs
), xc = v({ __proto__: null }), Zs = (t) => {
  const e = {
    // inherit scopeTerminator behavior
    ...zs,
    // Redirect set properties to the globalObject.
    set(o, s, c) {
      return Go(t, s, c);
    },
    // Always claim to have a potential property in order to be the recipient of a set
    has(o, s) {
      return !0;
    }
  }, r = v(
    K(
      Bs,
      Ue(e)
    )
  );
  return new Ir(
    xc,
    r
  );
};
v(Zs);
const { Fail: Sc } = J, Ec = () => {
  const t = K(null), e = v({
    eval: {
      get() {
        return delete t.eval, en;
      },
      enumerable: !1,
      configurable: !0
    }
  }), r = {
    evalScope: t,
    allowNextEvalToBeUnsafe() {
      const { revoked: n } = r;
      n !== null && Sc`a handler did not reset allowNextEvalToBeUnsafe ${n.err}`, z(t, e);
    },
    /** @type {null | { err: any }} */
    revoked: null
  };
  return r;
}, oo = "\\s*[@#]\\s*([a-zA-Z][a-zA-Z0-9]*)\\s*=\\s*([^\\s\\*]*)", kc = new Ye(
  `(?:\\s*//${oo}|/\\*${oo}\\s*\\*/)\\s*$`
), $n = (t) => {
  let e = "<unknown>";
  for (; t.length > 0; ) {
    const r = kn(kc, t);
    if (r === null)
      break;
    t = An(t, 0, t.length - r[0].length), r[3] === "sourceURL" ? e = r[4] : r[1] === "sourceURL" && (e = r[2]);
  }
  return e;
};
function Rn(t, e) {
  const r = Ha(t, e);
  if (r < 0)
    return -1;
  const n = t[r] === `
` ? 1 : 0;
  return Pn(An(t, 0, r), `
`).length + n;
}
const Gs = new Ye("(?:<!--|-->)", "g"), Hs = (t) => {
  const e = Rn(t, Gs);
  if (e < 0)
    return t;
  const r = $n(t);
  throw Kt(
    `Possible HTML comment rejected at ${r}:${e}. (SES_HTML_COMMENT_REJECTED)`
  );
}, Vs = (t) => hr(t, Gs, (r) => r[0] === "<" ? "< ! --" : "-- >"), Ws = new Ye(
  "(^|[^.]|\\.\\.\\.)\\bimport(\\s*(?:\\(|/[/*]))",
  "g"
), qs = (t) => {
  const e = Rn(t, Ws);
  if (e < 0)
    return t;
  const r = $n(t);
  throw Kt(
    `Possible import expression rejected at ${r}:${e}. (SES_IMPORT_REJECTED)`
  );
}, Ks = (t) => hr(t, Ws, (r, n, o) => `${n}__import__${o}`), Ac = new Ye(
  "(^|[^.])\\beval(\\s*\\()",
  "g"
), Ys = (t) => {
  const e = Rn(t, Ac);
  if (e < 0)
    return t;
  const r = $n(t);
  throw Kt(
    `Possible direct eval expression rejected at ${r}:${e}. (SES_EVAL_REJECTED)`
  );
}, Js = (t) => (t = Hs(t), t = qs(t), t), Xs = (t, e) => {
  for (let r = 0, n = e.length; r < n; r += 1) {
    const o = e[r];
    t = o(t);
  }
  return t;
};
v({
  rejectHtmlComments: v(Hs),
  evadeHtmlCommentTest: v(Vs),
  rejectImportExpressions: v(qs),
  evadeImportExpressionTest: v(Ks),
  rejectSomeDirectEvalExpressions: v(Ys),
  mandatoryTransforms: v(Js),
  applyTransforms: v(Xs)
});
const Pc = [
  // 11.6.2.1 Keywords
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
  // Also reserved when parsing strict mode code
  "let",
  "static",
  // 11.6.2.2 Future Reserved Words
  "enum",
  // Also reserved when parsing strict mode code
  "implements",
  "package",
  "protected",
  "interface",
  "private",
  "public",
  // Reserved but not mentioned in specs
  "await",
  "null",
  "true",
  "false",
  "this",
  "arguments"
], Ic = /^[a-zA-Z_$][\w$]*$/, so = (t) => t !== "eval" && !Nr(Pc, t) && En(Ic, t);
function ao(t, e) {
  const r = te(t, e);
  return r && //
  // The getters will not have .writable, don't let the falsyness of
  // 'undefined' trick us: test with === false, not ! . However descriptors
  // inherit from the (potentially poisoned) global object, so we might see
  // extra properties which weren't really there. Accessor properties have
  // 'get/set/enumerable/configurable', while data properties have
  // 'value/writable/enumerable/configurable'.
  r.configurable === !1 && r.writable === !1 && //
  // Checks for data properties because they're the only ones we can
  // optimize (accessors are most likely non-constant). Descriptors can't
  // can't have accessors and value properties at the same time, therefore
  // this check is sufficient. Using explicit own property deal with the
  // case where Object.prototype has been poisoned.
  ee(r, "value");
}
const Tc = (t, e = {}) => {
  const r = Pt(t), n = Pt(e), o = gt(
    n,
    (c) => so(c) && ao(e, c)
  );
  return {
    globalObjectConstants: gt(
      r,
      (c) => (
        // Can't define a constant: it would prevent a
        // lookup on the endowments.
        !Nr(n, c) && so(c) && ao(t, c)
      )
    ),
    moduleLexicalConstants: o
  };
};
function io(t, e) {
  return t.length === 0 ? "" : `const {${Dt(t, ",")}} = this.${e};`;
}
const Cc = (t) => {
  const { globalObjectConstants: e, moduleLexicalConstants: r } = Tc(
    t.globalObject,
    t.moduleLexicals
  ), n = io(
    e,
    "globalObject"
  ), o = io(
    r,
    "moduleLexicals"
  ), s = me(`
    with (this.scopeTerminator) {
      with (this.globalObject) {
        with (this.moduleLexicals) {
          with (this.evalScope) {
            ${n}
            ${o}
            return function() {
              'use strict';
              return eval(arguments[0]);
            };
          }
        }
      }
    }
  `);
  return le(s, t, []);
}, { Fail: $c } = J, Nn = ({
  globalObject: t,
  moduleLexicals: e = {},
  globalTransforms: r = [],
  sloppyGlobalsMode: n = !1
}) => {
  const o = n ? Zs(t) : wc, s = Ec(), { evalScope: c } = s, i = v({
    evalScope: c,
    moduleLexicals: e,
    globalObject: t,
    scopeTerminator: o
  });
  let l;
  const u = () => {
    l || (l = Cc(i));
  };
  return { safeEvaluate: (d, p) => {
    const { localTransforms: m = [] } = p || {};
    u(), d = Xs(
      d,
      Or(
        [m, r, [Js]],
        ns
      )
    );
    let g;
    try {
      return s.allowNextEvalToBeUnsafe(), le(l, t, [d]);
    } catch (w) {
      throw g = w, w;
    } finally {
      const w = "eval" in c;
      delete c.eval, w && (s.revoked = { err: g }, $c`handler did not reset allowNextEvalToBeUnsafe ${g}`);
    }
  } };
}, Rc = ") { [native code] }";
let Kr;
const Qs = () => {
  if (Kr === void 0) {
    const t = new Lt();
    B(Rr, "toString", {
      value: {
        toString() {
          const r = qa(this);
          return Jo(r, Rc) || !Qt(t, this) ? r : `function ${this.name}() { [native code] }`;
        }
      }.toString
    }), Kr = v(
      (r) => Lr(t, r)
    );
  }
  return Kr;
};
function Nc(t = "safe") {
  if (t === "unsafe")
    return;
  const e = A.process || void 0;
  if (typeof e == "object") {
    const r = te(e, "domain");
    if (r !== void 0 && r.get !== void 0)
      throw b(
        "SES failed to lockdown, Node.js domains have been initialized (SES_NO_DOMAINS)"
      );
    B(e, "domain", {
      value: null,
      configurable: !1,
      writable: !1,
      enumerable: !1
    });
  }
}
const Oc = () => {
  const t = {}, e = A.ModuleSource;
  if (e !== void 0) {
    let r = function() {
    };
    t.ModuleSource = e;
    const n = Z(e);
    n === Rr ? (ur(e, r), t["%AbstractModuleSource%"] = r, t["%AbstractModuleSourcePrototype%"] = r.prototype) : (t["%AbstractModuleSource%"] = n, t["%AbstractModuleSourcePrototype%"] = n.prototype);
    const o = e.prototype;
    o !== void 0 && (t["%ModuleSourcePrototype%"] = o, Z(o) === wn && ur(e.prototype, r.prototype));
  }
  return t;
}, ut = (t, e) => B(e, "name", { value: t }), On = v([
  ["debug", "debug"],
  // (fmt?, ...args) verbose level on Chrome
  ["log", "log"],
  // (fmt?, ...args) info level on Chrome
  ["info", "info"],
  // (fmt?, ...args)
  ["warn", "warn"],
  // (fmt?, ...args)
  ["error", "error"],
  // (fmt?, ...args)
  ["trace", "log"],
  // (fmt?, ...args)
  ["dirxml", "log"],
  // (fmt?, ...args)          but TS typed (...data)
  ["group", "log"],
  // (fmt?, ...args)           but TS typed (...label)
  ["groupCollapsed", "log"]
  // (fmt?, ...args)  but TS typed (...label)
]), Mn = v([
  ["assert", "error"],
  // (value, fmt?, ...args)
  ["timeLog", "log"],
  // (label?, ...args) no fmt string
  // Insensitive to whether any argument is an error. All arguments can pass
  // thru to baseConsole as is.
  ["clear", void 0],
  // ()
  ["count", "info"],
  // (label?)
  ["countReset", void 0],
  // (label?)
  ["dir", "log"],
  // (item, options?)
  ["groupEnd", "log"],
  // ()
  // In theory tabular data may be or contain an error. However, we currently
  // do not detect these and may never.
  ["table", "log"],
  // (tabularData, properties?)
  ["time", "info"],
  // (label?)
  ["timeEnd", "info"],
  // (label?)
  // Node Inspector only, MDN, and TypeScript, but not whatwg
  ["profile", void 0],
  // (label?)
  ["profileEnd", void 0],
  // (label?)
  ["timeStamp", void 0]
  // (label?)
]);
v([
  ...On,
  ...Mn
]);
const lt = {
  NOTE: "ERROR_NOTE:",
  MESSAGE: "ERROR_MESSAGE:",
  CAUSE: "cause:",
  ERRORS: "errors:"
};
v(lt);
const Ln = (t, e) => {
  if (!t)
    return;
  const { getStackString: r, tagError: n, takeMessageLogArgs: o, takeNoteLogArgsArray: s } = e, c = (h, _) => be(h, (T) => Fr(T) ? (oe(_, T), `(${n(T)})`) : T), i = (h, _, E, T, M) => {
    const N = n(_), U = E === lt.MESSAGE ? `${N}:` : `${N} ${E}`, H = c(T, M);
    t[h](U, ...H);
  }, l = (h, _, E = void 0) => {
    if (_.length === 0)
      return;
    if (_.length === 1 && E === void 0) {
      d(h, _[0]);
      return;
    }
    let T;
    _.length === 1 ? T = "Nested error" : T = `Nested ${_.length} errors`, E !== void 0 && (T = `${T} under ${E}`), t.group(T);
    try {
      for (const M of _)
        d(h, M);
    } finally {
      t.groupEnd && t.groupEnd();
    }
  }, u = new Lt(), f = (h) => (_, E) => {
    const T = [];
    i(h, _, lt.NOTE, E, T), l(h, T, n(_));
  }, d = (h, _) => {
    if (Qt(u, _))
      return;
    const E = n(_);
    Lr(u, _);
    const T = [], M = o(_), N = s(
      _,
      f(h)
    );
    M === void 0 ? t[h](`${E}:`, _.message) : i(
      h,
      _,
      lt.MESSAGE,
      M,
      T
    );
    let U = r(_);
    typeof U == "string" && U.length >= 1 && !Jo(U, `
`) && (U += `
`), t[h](U), _.cause && i(h, _, lt.CAUSE, [_.cause], T), _.errors && i(h, _, lt.ERRORS, _.errors, T);
    for (const H of N)
      i(h, _, lt.NOTE, H, T);
    l(h, T, E);
  }, p = be(On, ([h, _]) => {
    const E = ut(h, (...T) => {
      const M = [], N = c(T, M);
      t[h] && t[h](...N), l(h, M);
    });
    return [h, v(E)];
  }), m = gt(
    Mn,
    ([h, _]) => h in t
  ), g = be(m, ([h, _]) => {
    const E = ut(h, (...T) => {
      t[h](...T);
    });
    return [h, v(E)];
  }), w = Jt([...p, ...g]);
  return (
    /** @type {VirtualConsole} */
    v(w)
  );
};
v(Ln);
const Mc = (t, e, r) => {
  const [n, ...o] = Pn(t, e), s = Or(o, (c) => [e, ...r, c]);
  return ["", n, ...s];
}, ea = (t) => v((r) => {
  const n = [], o = (...i) => (n.length > 0 && (i = Or(
    i,
    (l) => typeof l == "string" && Xo(l, `
`) ? Mc(l, `
`, n) : [l]
  ), i = [...n, ...i]), r(...i)), s = Jt([
    ...be(On, ([i]) => [
      i,
      ut(i, (...l) => o(...l))
    ]),
    ...be(Mn, ([i]) => [
      i,
      ut(i, (...l) => o(i, ...l))
    ])
  ]);
  for (const i of ["group", "groupCollapsed"])
    s[i] ? s[i] = ut(i, (...l) => {
      l.length >= 1 && o(...l), oe(n, " ");
    }) : s[i] = ut(i, () => {
    });
  return s.groupEnd = ut(
    "groupEnd",
    s.groupEnd ? (...i) => {
      pr(n);
    } : () => {
    }
  ), harden(s), Ln(
    /** @type {VirtualConsole} */
    s,
    t
  );
});
v(ea);
const co = (t) => {
  if (At === void 0)
    return;
  let e = 0;
  const r = new Me(), n = (f) => {
    Ua(r, f);
  }, o = new De(), s = (f) => {
    if (Mr(r, f)) {
      const d = He(r, f);
      n(f), t(d);
    }
  }, c = new At(s);
  return {
    rejectionHandledHandler: (f) => {
      const d = j(o, f);
      n(d);
    },
    unhandledRejectionHandler: (f, d) => {
      e += 1;
      const p = e;
      pe(r, p, f), he(o, d, p), Ka(c, d, p, d);
    },
    processTerminationHandler: () => {
      for (const [f, d] of ja(r))
        n(f), t(d);
    }
  };
}, lo = (t) => {
  throw b(t);
}, uo = (t, e) => v((...r) => le(t, e, r)), Lc = (t = "safe", e = "platform", r = "report", n = void 0) => {
  let o;
  n === void 0 ? o = br : o = {
    ...br,
    getStackString: n
  };
  const s = (
    /** @type {VirtualConsole} */
    // eslint-disable-next-line no-nested-ternary
    typeof A.console < "u" ? A.console : typeof A.print == "function" ? (
      // Make a good-enough console for eshost (including only functions that
      // log at a specific level with no special argument interpretation).
      // https://console.spec.whatwg.org/#logging
      ((u) => v({ debug: u, log: u, info: u, warn: u, error: u }))(
        // eslint-disable-next-line no-undef
        uo(A.print)
      )
    ) : void 0
  );
  if (s && s.log)
    for (const u of ["warn", "error"])
      s[u] || B(s, u, {
        value: uo(s.log, s)
      });
  const c = (
    /** @type {VirtualConsole} */
    t === "unsafe" ? s : Ln(s, o)
  ), i = A.process || void 0;
  if (e !== "none" && typeof i == "object" && typeof i.on == "function") {
    let u;
    if (e === "platform" || e === "exit") {
      const { exit: f } = i;
      typeof f == "function" || lo("missing process.exit"), u = () => f(i.exitCode || -1);
    } else e === "abort" && (u = i.abort, typeof u == "function" || lo("missing process.abort"));
    i.on("uncaughtException", (f) => {
      c.error("SES_UNCAUGHT_EXCEPTION:", f), u && u();
    });
  }
  if (r !== "none" && typeof i == "object" && typeof i.on == "function") {
    const f = co((d) => {
      c.error("SES_UNHANDLED_REJECTION:", d);
    });
    f && (i.on("unhandledRejection", f.unhandledRejectionHandler), i.on("rejectionHandled", f.rejectionHandledHandler), i.on("exit", f.processTerminationHandler));
  }
  const l = A.window || void 0;
  if (e !== "none" && typeof l == "object" && typeof l.addEventListener == "function" && l.addEventListener("error", (u) => {
    u.preventDefault(), c.error("SES_UNCAUGHT_EXCEPTION:", u.error), (e === "exit" || e === "abort") && (l.location.href = "about:blank");
  }), r !== "none" && typeof l == "object" && typeof l.addEventListener == "function") {
    const f = co((d) => {
      c.error("SES_UNHANDLED_REJECTION:", d);
    });
    f && (l.addEventListener("unhandledrejection", (d) => {
      d.preventDefault(), f.unhandledRejectionHandler(d.reason, d.promise);
    }), l.addEventListener("rejectionhandled", (d) => {
      d.preventDefault(), f.rejectionHandledHandler(d.promise);
    }), l.addEventListener("beforeunload", (d) => {
      f.processTerminationHandler();
    }));
  }
  return { console: c };
}, Fc = [
  // suppress 'getThis' definitely
  "getTypeName",
  // suppress 'getFunction' definitely
  "getFunctionName",
  "getMethodName",
  "getFileName",
  "getLineNumber",
  "getColumnNumber",
  "getEvalOrigin",
  "isToplevel",
  "isEval",
  "isNative",
  "isConstructor",
  "isAsync",
  // suppress 'isPromiseAll' for now
  // suppress 'getPromiseIndex' for now
  // Additional names found by experiment, absent from
  // https://v8.dev/docs/stack-trace-api
  "getPosition",
  "getScriptNameOrSourceURL",
  "toString"
  // TODO replace to use only permitted info
], Dc = (t) => {
  const r = Jt(be(Fc, (n) => {
    const o = t[n];
    return [n, () => le(o, t, [])];
  }));
  return K(r, {});
}, Uc = (t) => be(t, Dc), jc = /\/node_modules\//, Bc = /^(?:node:)?internal\//, zc = /\/packages\/ses\/src\/error\/assert\.js$/, Zc = /\/packages\/eventual-send\/src\//, Gc = /\/packages\/ses-ava\/src\/ses-ava-test\.js$/, Hc = [
  jc,
  Bc,
  zc,
  Zc,
  Gc
], Vc = (t) => {
  if (!t)
    return !0;
  for (const e of Hc)
    if (En(e, t))
      return !1;
  return !0;
}, Wc = /^((?:.*[( ])?)[:/\w_-]*\/\.\.\.\/(.+)$/, qc = /^((?:.*[( ])?)\.\.\.\/(.+)$/, Kc = /^((?:.*[( ])?)[:/\w_-]*\/(packages\/.+)$/, Yc = /^((?:.*[( ])?)file:\/\/([^/].*)$/, Jc = [
  Wc,
  qc,
  Kc,
  Yc
], Xc = (t) => {
  for (const e of Jc) {
    const r = kn(e, t);
    if (r)
      return Dt(Oa(r, 1), "");
  }
  return t;
}, Qc = (t, e, r, n) => {
  if (r === "unsafe-debug")
    throw b(
      "internal: v8+unsafe-debug special case should already be done"
    );
  const o = t.captureStackTrace, s = n === "concise" || n === "omit-frames", c = n === "concise" || n === "shorten-paths", i = (w) => s ? Vc(w.getFileName()) : !0, l = (w) => {
    let h = `${w}`;
    return c && (h = Xc(h)), `
  at ${h}`;
  }, u = (w, h) => Dt(
    be(gt(h, i), l),
    ""
  ), f = new De(), d = {
    // The optional `optFn` argument is for cutting off the bottom of
    // the stack --- for capturing the stack only above the topmost
    // call to that function. Since this isn't the "real" captureStackTrace
    // but instead calls the real one, if no other cutoff is provided,
    // we cut this one off.
    captureStackTrace(w, h = d.captureStackTrace) {
      if (typeof o == "function") {
        le(o, t, [w, h]);
        return;
      }
      Go(w, "stack", "");
    },
    // Shim of proposed special power, to reside by default only
    // in the start compartment, for getting the stack traceback
    // string associated with an error.
    // See https://tc39.es/proposal-error-stacks/
    getStackString(w) {
      let h = j(f, w);
      if (h === void 0 && (w.stack, h = j(f, w), h || (h = { stackString: "" }, he(f, w, h))), h.stackString !== void 0)
        return h.stackString;
      const _ = u(w, h.callSites);
      return he(f, w, { stackString: _ }), _;
    },
    prepareStackTrace(w, h) {
      if (r === "unsafe") {
        const _ = u(w, h);
        return he(f, w, { stackString: _ }), `${w}${_}`;
      } else
        return he(f, w, { callSites: h }), "";
    }
  }, p = d.prepareStackTrace;
  t.prepareStackTrace = p;
  const m = new Lt([p]), g = (w) => {
    if (Qt(m, w))
      return w;
    const h = {
      prepareStackTrace(_, E) {
        return he(f, _, { callSites: E }), w(_, Uc(E));
      }
    };
    return Lr(m, h.prepareStackTrace), h.prepareStackTrace;
  };
  return z(e, {
    captureStackTrace: {
      value: d.captureStackTrace,
      writable: !0,
      enumerable: !1,
      configurable: !0
    },
    prepareStackTrace: {
      get() {
        return t.prepareStackTrace;
      },
      set(w) {
        if (typeof w == "function") {
          const h = g(w);
          t.prepareStackTrace = h;
        } else
          t.prepareStackTrace = p;
      },
      enumerable: !1,
      configurable: !0
    }
  }), d.getStackString;
}, fo = te(ce.prototype, "stack"), po = fo && fo.get, el = {
  getStackString(t) {
    return typeof po == "function" ? le(po, t, []) : "stack" in t ? `${t.stack}` : "";
  }
};
let rr = el.getStackString;
function tl(t = "safe", e = "concise") {
  const r = ce.prototype, { captureStackTrace: n } = ce, o = typeof n == "function" ? "v8" : "unknown", s = (l = {}) => {
    const u = function(...d) {
      let p;
      return new.target === void 0 ? p = le(ce, this, d) : p = dr(ce, d, new.target), o === "v8" && le(n, ce, [p, u]), p;
    };
    return z(u, {
      length: { value: 1 },
      prototype: {
        value: r,
        writable: !1,
        enumerable: !1,
        configurable: !1
      }
    }), u;
  }, c = s({}), i = s({});
  z(r, {
    constructor: { value: i }
  });
  for (const l of Rs)
    ur(l, i);
  if (z(c, {
    stackTraceLimit: {
      get() {
        if (typeof ce.stackTraceLimit == "number")
          return ce.stackTraceLimit;
      },
      set(l) {
        if (typeof l == "number" && typeof ce.stackTraceLimit == "number") {
          ce.stackTraceLimit = l;
          return;
        }
      },
      // WTF on v8 stackTraceLimit is enumerable
      enumerable: !1,
      configurable: !0
    }
  }), t === "unsafe-debug" && o === "v8") {
    z(c, {
      prepareStackTrace: {
        get() {
          return ce.prepareStackTrace;
        },
        set(u) {
          ce.prepareStackTrace = u;
        },
        enumerable: !1,
        configurable: !0
      },
      captureStackTrace: {
        value: ce.captureStackTrace,
        writable: !0,
        enumerable: !1,
        configurable: !0
      }
    });
    const l = Ue(c);
    return z(i, {
      stackTraceLimit: l.stackTraceLimit,
      prepareStackTrace: l.prepareStackTrace,
      captureStackTrace: l.captureStackTrace
    }), {
      "%InitialGetStackString%": rr,
      "%InitialError%": c,
      "%SharedError%": i
    };
  }
  return z(i, {
    stackTraceLimit: {
      get() {
      },
      set(l) {
      },
      enumerable: !1,
      configurable: !0
    }
  }), o === "v8" && z(i, {
    prepareStackTrace: {
      get() {
        return () => "";
      },
      set(l) {
      },
      enumerable: !1,
      configurable: !0
    },
    captureStackTrace: {
      value: (l, u) => {
        B(l, "stack", {
          value: ""
        });
      },
      writable: !1,
      enumerable: !1,
      configurable: !0
    }
  }), o === "v8" ? rr = Qc(
    ce,
    c,
    t,
    e
  ) : t === "unsafe" || t === "unsafe-debug" ? z(r, {
    stack: {
      get() {
        return rr(this);
      },
      set(l) {
        z(this, {
          stack: {
            value: l,
            writable: !0,
            enumerable: !0,
            configurable: !0
          }
        });
      }
    }
  }) : z(r, {
    stack: {
      get() {
        return `${this}`;
      },
      set(l) {
        z(this, {
          stack: {
            value: l,
            writable: !0,
            enumerable: !0,
            configurable: !0
          }
        });
      }
    }
  }), {
    "%InitialGetStackString%": rr,
    "%InitialError%": c,
    "%SharedError%": i
  };
}
const rl = () => {
}, nl = async (t, e, r) => {
  await null;
  const n = t(...e);
  let o = mr(n);
  for (; !o.done; )
    try {
      const s = await o.value;
      o = mr(n, s);
    } catch (s) {
      o = Qo(n, r(s));
    }
  return o.value;
}, ol = (t, e) => {
  const r = t(...e);
  let n = mr(r);
  for (; !n.done; )
    try {
      n = mr(r, n.value);
    } catch (o) {
      n = Qo(r, o);
    }
  return n.value;
}, sl = (t, e) => v({ compartment: t, specifier: e }), al = (t, e, r) => {
  const n = K(null);
  for (const o of t) {
    const s = e(o, r);
    n[o] = s;
  }
  return v(n);
}, jt = (t, e, r, n, o, s, c, i, l) => {
  const { resolveHook: u, name: f } = j(
    t,
    r
  ), { imports: d } = o;
  if (!pt(d) || Ko(d, (g) => typeof g != "string"))
    throw Oe(
      ne`Invalid module source: 'imports' must be an array of strings, got ${d} for module ${D(n)} of compartment ${D(f)}`
    );
  const p = al(d, u, n), m = v({
    compartment: r,
    moduleSource: o,
    moduleSpecifier: n,
    resolvedImports: p,
    importMeta: l
  });
  for (const g of jo(p))
    s(Et, [
      t,
      e,
      r,
      g,
      s,
      c,
      i
    ]);
  return m;
};
function* il(t, e, r, n, o, s, c) {
  const {
    importHook: i,
    importNowHook: l,
    moduleMap: u,
    moduleMapHook: f,
    moduleRecords: d,
    parentCompartment: p
  } = j(t, r);
  if (Mr(d, n))
    return He(d, n);
  let m = u[n];
  if (m === void 0 && f !== void 0 && (m = f(n)), m === void 0) {
    const g = s(i, l);
    if (g === void 0) {
      const w = s(
        "importHook",
        "importNowHook"
      );
      throw Oe(
        ne`${vr(w)} needed to load module ${D(
          n
        )} in compartment ${D(r.name)}`
      );
    }
    m = g(n), xt(e, m) || (m = yield m);
  }
  if (typeof m == "string")
    throw Oe(
      ne`Cannot map module ${D(n)} to ${D(
        m
      )} in parent compartment, use {source} module descriptor`,
      b
    );
  if (Ae(m))
    throw Oe(
      ne`module descriptor must be a string or object for specifier ${D(
        n
      )} in compartment ${D(r.name)}`
    );
  {
    let g = j(e, m);
    if (g !== void 0 && (m = g), m.namespace !== void 0) {
      if (typeof m.namespace == "string") {
        const {
          compartment: _ = p,
          namespace: E
        } = m;
        if (Ae(_) || !xt(t, _))
          throw Oe(
            ne`Invalid compartment in module descriptor for specifier ${D(n)} in compartment ${D(r.name)}`
          );
        const T = yield Et(
          t,
          e,
          _,
          E,
          o,
          s,
          c
        );
        return pe(d, n, T), T;
      }
      if (Ae(m.namespace))
        throw Oe(
          ne`Invalid compartment in module descriptor for specifier ${D(n)} in compartment ${D(r.name)}`
        );
      {
        const { namespace: _ } = m;
        if (g = j(e, _), g !== void 0)
          m = g;
        else {
          const E = Pt(_), N = jt(
            t,
            e,
            r,
            n,
            {
              imports: [],
              exports: E,
              execute(U) {
                for (const H of E)
                  U[H] = _[H];
              }
            },
            o,
            s,
            c,
            void 0
          );
          return pe(d, n, N), N;
        }
      }
    }
    if (m.source !== void 0)
      if (typeof m.source == "string") {
        const {
          source: _,
          specifier: E = n,
          compartment: T = p,
          importMeta: M = void 0
        } = m, N = yield Et(
          t,
          e,
          T,
          _,
          o,
          s,
          c
        ), { moduleSource: U } = N, H = jt(
          t,
          e,
          r,
          E,
          U,
          o,
          s,
          c,
          M
        );
        return pe(d, n, H), H;
      } else {
        const {
          source: _,
          specifier: E = n,
          importMeta: T
        } = m, M = jt(
          t,
          e,
          r,
          E,
          _,
          o,
          s,
          c,
          T
        );
        return pe(d, n, M), M;
      }
    if (m.archive !== void 0)
      throw Oe(
        ne`Unsupported archive module descriptor for specifier ${D(n)} in compartment ${D(r.name)}`
      );
    if (m.record !== void 0) {
      const {
        compartment: _ = r,
        specifier: E = n,
        record: T,
        importMeta: M
      } = m, N = jt(
        t,
        e,
        _,
        E,
        T,
        o,
        s,
        c,
        M
      );
      return pe(d, n, N), pe(d, E, N), N;
    }
    if (m.compartment !== void 0 && m.specifier !== void 0) {
      if (Ae(m.compartment) || !xt(t, m.compartment) || typeof m.specifier != "string")
        throw Oe(
          ne`Invalid compartment in module descriptor for specifier ${D(n)} in compartment ${D(r.name)}`
        );
      const _ = yield Et(
        t,
        e,
        m.compartment,
        m.specifier,
        o,
        s,
        c
      );
      return pe(d, n, _), _;
    }
    const h = jt(
      t,
      e,
      r,
      n,
      m,
      o,
      s,
      c
    );
    return pe(d, n, h), h;
  }
}
const Et = (t, e, r, n, o, s, c) => {
  const { name: i } = j(
    t,
    r
  );
  let l = He(c, r);
  l === void 0 && (l = new Me(), pe(c, r, l));
  let u = He(l, n);
  return u !== void 0 || (u = s(nl, ol)(
    il,
    [
      t,
      e,
      r,
      n,
      o,
      s,
      c
    ],
    (f) => {
      throw jr(
        f,
        ne`${f.message}, loading ${D(n)} in compartment ${D(
          i
        )}`
      ), f;
    }
  ), pe(l, n, u)), u;
}, cl = ({ errors: t = [], noAggregateErrors: e = !1 } = {}) => {
  const r = new Mt();
  return { enqueueJob: (s, c) => {
    xn(
      r,
      rs(s(...c), rl, (i) => {
        if (e)
          throw i;
        oe(t, i);
      })
    );
  }, drainQueue: async () => {
    await null;
    for (const s of r)
      await s;
  }, errors: t };
}, ll = ({ errors: t = [], noAggregateErrors: e = !1 } = {}) => {
  let r = [], n = [];
  const o = (c, i) => {
    oe(n, [c, i]);
  }, s = () => {
    for (const [c, i] of r)
      try {
        c(...i);
      } catch (l) {
        if (e)
          throw l;
        oe(t, l);
      }
    r = n, n = [], r.length > 0 && s();
  };
  return { enqueueJob: o, drainQueue: s, errors: t };
}, ta = ({ errors: t, errorPrefix: e }) => {
  if (t.length > 0) {
    const r = (
      /** @type {'' | 'verbose'} */
      ie("COMPARTMENT_LOAD_ERRORS", "", ["verbose"]) === "verbose"
    );
    throw b(
      `${e} (${t.length} underlying failures: ${Dt(
        be(t, (n) => n.message + (r ? n.stack : "")),
        ", "
      )}`
    );
  }
}, ul = (t, e) => e, dl = (t, e) => t, un = async (t, e, r, n, { noAggregateErrors: o = !1 } = {}) => {
  const { name: s } = j(
    t,
    r
  ), c = new Me(), { enqueueJob: i, drainQueue: l, errors: u } = cl({
    noAggregateErrors: o
  });
  i(Et, [
    t,
    e,
    r,
    n,
    i,
    dl,
    c
  ]), await l(), ta({
    errors: u,
    errorPrefix: `Failed to load module ${D(n)} in package ${D(
      s
    )}`
  });
}, fl = (t, e, r, n, { noAggregateErrors: o = !1 } = {}) => {
  const { name: s } = j(
    t,
    r
  ), c = new Me(), { enqueueJob: i, drainQueue: l, errors: u } = ll({
    noAggregateErrors: o
  });
  i(Et, [
    t,
    e,
    r,
    n,
    i,
    ul,
    c
  ]), l(), ta({
    errors: u,
    errorPrefix: `Failed to load module ${D(n)} in package ${D(
      s
    )}`
  });
}, { quote: vt } = J, pl = () => {
  let t = !1;
  const e = K(null, {
    // Make this appear like an ESM module namespace object.
    [et]: {
      value: "Module",
      writable: !1,
      enumerable: !1,
      configurable: !1
    }
  });
  return v({
    activate() {
      t = !0;
    },
    exportsTarget: e,
    exportsProxy: new Ir(e, {
      get(r, n, o) {
        if (!t)
          throw b(
            `Cannot get property ${vt(
              n
            )} of module exports namespace, the module has not yet begun to execute`
          );
        return Ca(e, n, o);
      },
      set(r, n, o) {
        throw b(
          `Cannot set property ${vt(n)} of module exports namespace`
        );
      },
      has(r, n) {
        if (!t)
          throw b(
            `Cannot check property ${vt(
              n
            )}, the module has not yet begun to execute`
          );
        return Zo(e, n);
      },
      deleteProperty(r, n) {
        throw b(
          `Cannot delete property ${vt(n)}s of module exports namespace`
        );
      },
      ownKeys(r) {
        if (!t)
          throw b(
            "Cannot enumerate keys, the module has not yet begun to execute"
          );
        return Ge(e);
      },
      getOwnPropertyDescriptor(r, n) {
        if (!t)
          throw b(
            `Cannot get own property descriptor ${vt(
              n
            )}, the module has not yet begun to execute`
          );
        return $a(e, n);
      },
      preventExtensions(r) {
        if (!t)
          throw b(
            "Cannot prevent extensions of module exports namespace, the module has not yet begun to execute"
          );
        return Na(e);
      },
      isExtensible() {
        if (!t)
          throw b(
            "Cannot check extensibility of module exports namespace, the module has not yet begun to execute"
          );
        return Ra(e);
      },
      getPrototypeOf(r) {
        return null;
      },
      setPrototypeOf(r, n) {
        throw b("Cannot set prototype of module exports namespace");
      },
      defineProperty(r, n, o) {
        throw b(
          `Cannot define property ${vt(n)} of module exports namespace`
        );
      },
      apply(r, n, o) {
        throw b(
          "Cannot call module exports namespace, it is not a function"
        );
      },
      construct(r, n) {
        throw b(
          "Cannot construct module exports namespace, it is not a constructor"
        );
      }
    })
  });
}, Fn = (t, e, r, n) => {
  const { deferredExports: o } = e;
  if (!Mr(o, n)) {
    const s = pl();
    he(
      r,
      s.exportsProxy,
      sl(t, n)
    ), pe(o, n, s);
  }
  return He(o, n);
}, ml = (t, e) => {
  const { sloppyGlobalsMode: r = !1, __moduleShimLexicals__: n = void 0 } = e;
  let o;
  if (n === void 0 && !r)
    ({ safeEvaluate: o } = t);
  else {
    let { globalTransforms: s } = t;
    const { globalObject: c } = t;
    let i;
    n !== void 0 && (s = void 0, i = K(
      null,
      Ue(n)
    )), { safeEvaluate: o } = Nn({
      globalObject: c,
      moduleLexicals: i,
      globalTransforms: s,
      sloppyGlobalsMode: r
    });
  }
  return { safeEvaluate: o };
}, ra = (t, e, r) => {
  if (typeof e != "string")
    throw b("first argument of evaluate() must be a string");
  const {
    transforms: n = [],
    __evadeHtmlCommentTest__: o = !1,
    __evadeImportExpressionTest__: s = !1,
    __rejectSomeDirectEvalExpressions__: c = !0
    // Note default on
  } = r, i = [...n];
  o === !0 && oe(i, Vs), s === !0 && oe(i, Ks), c === !0 && oe(i, Ys);
  const { safeEvaluate: l } = ml(
    t,
    r
  );
  return l(e, {
    localTransforms: i
  });
}, { quote: nr } = J, hl = (t, e, r, n, o, s) => {
  const { exportsProxy: c, exportsTarget: i, activate: l } = Fn(
    r,
    j(t, r),
    n,
    o
  ), u = K(null);
  if (e.exports) {
    if (!pt(e.exports) || Ko(e.exports, (d) => typeof d != "string"))
      throw b(
        `SES virtual module source "exports" property must be an array of strings for module ${o}`
      );
    Xe(e.exports, (d) => {
      let p = i[d];
      const m = [];
      B(i, d, {
        get: () => p,
        set: (h) => {
          p = h;
          for (const _ of m)
            _(h);
        },
        enumerable: !0,
        configurable: !1
      }), u[d] = (h) => {
        oe(m, h), h(p);
      };
    }), u["*"] = (d) => {
      d(i);
    };
  }
  const f = {
    activated: !1
  };
  return v({
    notifiers: u,
    exportsProxy: c,
    execute() {
      if (Zo(f, "errorFromExecute"))
        throw f.errorFromExecute;
      if (!f.activated) {
        l(), f.activated = !0;
        try {
          e.execute(i, r, s);
        } catch (d) {
          throw f.errorFromExecute = d, d;
        }
      }
    }
  });
}, gl = (t, e, r, n) => {
  const {
    compartment: o,
    moduleSpecifier: s,
    moduleSource: c,
    importMeta: i
  } = r, {
    reexports: l = [],
    __syncModuleProgram__: u,
    __fixedExportMap__: f = {},
    __liveExportMap__: d = {},
    __reexportMap__: p = {},
    __needsImport__: m = !1,
    __needsImportMeta__: g = !1,
    __syncModuleFunctor__: w
  } = c, h = j(t, o), { __shimTransforms__: _, resolveHook: E, importMetaHook: T, compartmentImport: M } = h, { exportsProxy: N, exportsTarget: U, activate: H } = Fn(
    o,
    h,
    e,
    s
  ), X = K(null), G = K(null), Y = K(null), Be = K(null), nt = K(null);
  i && Yt(nt, i), g && T && T(s, nt);
  let ze;
  m && (ze = async (de) => M(E(de, s)));
  const ue = K(null), Se = K(null);
  Xe(ge(f), ([de, [V]]) => {
    let W = ue[V];
    if (!W) {
      let se, ae = !0, ve = [];
      const re = () => {
        if (ae)
          throw Zt(`binding ${nr(V)} not yet initialized`);
        return se;
      }, Te = v((Ce) => {
        if (!ae)
          throw b(
            `Internal: binding ${nr(V)} already initialized`
          );
        se = Ce;
        const Zn = ve;
        ve = null, ae = !1;
        for (const $e of Zn || [])
          $e(Ce);
        return Ce;
      });
      W = {
        get: re,
        notify: (Ce) => {
          Ce !== Te && (ae ? oe(ve || [], Ce) : Ce(se));
        }
      }, ue[V] = W, Y[V] = Te;
    }
    X[de] = {
      get: W.get,
      set: void 0,
      enumerable: !0,
      configurable: !1
    }, Se[de] = W.notify;
  }), Xe(
    ge(d),
    ([de, [V, W]]) => {
      let se = ue[V];
      if (!se) {
        let ae, ve = !0;
        const re = [], Te = () => {
          if (ve)
            throw Zt(
              `binding ${nr(de)} not yet initialized`
            );
          return ae;
        }, _t = v(($e) => {
          ae = $e, ve = !1;
          for (const zr of re)
            zr($e);
        }), Ce = ($e) => {
          if (ve)
            throw Zt(`binding ${nr(V)} not yet initialized`);
          ae = $e;
          for (const zr of re)
            zr($e);
        };
        se = {
          get: Te,
          notify: ($e) => {
            $e !== _t && (oe(re, $e), ve || $e(ae));
          }
        }, ue[V] = se, W && B(G, V, {
          get: Te,
          set: Ce,
          enumerable: !0,
          configurable: !1
        }), Be[V] = _t;
      }
      X[de] = {
        get: se.get,
        set: void 0,
        enumerable: !0,
        configurable: !1
      }, Se[de] = se.notify;
    }
  );
  const er = (de) => {
    de(U);
  };
  Se["*"] = er;
  function Ut(de) {
    const V = K(null);
    V.default = !1;
    for (const [W, se] of de) {
      const ae = He(n, W);
      ae.execute();
      const { notifiers: ve } = ae;
      for (const [re, Te] of se) {
        const _t = ve[re];
        if (!_t)
          throw Kt(
            `The requested module '${W}' does not provide an export named '${re}'`
          );
        for (const Ce of Te)
          _t(Ce);
      }
      if (Nr(l, W))
        for (const [re, Te] of ge(
          ve
        ))
          V[re] === void 0 ? V[re] = Te : V[re] = !1;
      if (p[W])
        for (const [re, Te] of p[W])
          V[Te] = ve[re];
    }
    for (const [W, se] of ge(V))
      if (!Se[W] && se !== !1) {
        Se[W] = se;
        let ae;
        se((re) => ae = re), X[W] = {
          get() {
            return ae;
          },
          set: void 0,
          enumerable: !0,
          configurable: !1
        };
      }
    Xe(
      Yo(Uo(X)),
      (W) => B(U, W, X[W])
    ), v(U), H();
  }
  let yt;
  w !== void 0 ? yt = w : yt = ra(h, u, {
    globalObject: o.globalThis,
    transforms: _,
    __moduleShimLexicals__: G
  });
  let Ie = !1, ot;
  function ha() {
    if (yt) {
      const de = yt;
      yt = null;
      try {
        de(
          v({
            imports: v(Ut),
            onceVar: v(Y),
            liveVar: v(Be),
            import: ze,
            importMeta: nt
          })
        );
      } catch (V) {
        Ie = !0, ot = V;
      }
    }
    if (Ie)
      throw ot;
  }
  return v({
    notifiers: Se,
    exportsProxy: N,
    execute: ha
  });
}, { Fail: dt, quote: Q } = J, Dn = (t, e, r, n) => {
  const { name: o, moduleRecords: s } = j(
    t,
    r
  ), c = He(s, n);
  if (c === void 0)
    throw Zt(
      `Missing link to module ${Q(n)} from compartment ${Q(
        o
      )}`
    );
  return xl(t, e, c);
};
function yl(t) {
  return typeof t.__syncModuleProgram__ == "string";
}
function _l(t, e) {
  const { __fixedExportMap__: r, __liveExportMap__: n } = t;
  !Ae(r) || dt`Property '__fixedExportMap__' of a precompiled module source must be an object, got ${Q(
    r
  )}, for module ${Q(e)}`, !Ae(n) || dt`Property '__liveExportMap__' of a precompiled module source must be an object, got ${Q(
    n
  )}, for module ${Q(e)}`;
}
function vl(t) {
  return typeof t.execute == "function";
}
function bl(t, e) {
  const { exports: r } = t;
  pt(r) || dt`Invalid module source: 'exports' of a virtual module source must be an array, got ${Q(
    r
  )}, for module ${Q(e)}`;
}
function wl(t, e) {
  !Ae(t) || dt`Invalid module source: must be of type object, got ${Q(
    t
  )}, for module ${Q(e)}`;
  const { imports: r, exports: n, reexports: o = [] } = t;
  pt(r) || dt`Invalid module source: 'imports' must be an array, got ${Q(
    r
  )}, for module ${Q(e)}`, pt(n) || dt`Invalid module source: 'exports' must be an array, got ${Q(
    n
  )}, for module ${Q(e)}`, pt(o) || dt`Invalid module source: 'reexports' must be an array if present, got ${Q(
    o
  )}, for module ${Q(e)}`;
}
const xl = (t, e, r) => {
  const { compartment: n, moduleSpecifier: o, resolvedImports: s, moduleSource: c } = r, { instances: i } = j(t, n);
  if (Mr(i, o))
    return He(i, o);
  wl(c, o);
  const l = new Me();
  let u;
  if (yl(c))
    _l(c, o), u = gl(
      t,
      e,
      r,
      l
    );
  else if (vl(c))
    bl(c, o), u = hl(
      t,
      c,
      n,
      e,
      o,
      s
    );
  else
    throw b(`Invalid module source, got ${Q(c)}`);
  pe(i, o, u);
  for (const [f, d] of ge(s)) {
    const p = Dn(
      t,
      e,
      n,
      d
    );
    pe(l, f, p);
  }
  return u;
}, ft = new De(), fe = new De(), Un = function(e = {}, r = {}, n = {}) {
  throw b(
    "Compartment.prototype.constructor is not a valid constructor."
  );
}, mo = (t, e) => {
  const { execute: r, exportsProxy: n } = Dn(
    fe,
    ft,
    t,
    e
  );
  return r(), n;
}, jn = {
  constructor: Un,
  get globalThis() {
    return (
      /** @type {CompartmentFields} */
      j(fe, this).globalObject
    );
  },
  get name() {
    return (
      /** @type {CompartmentFields} */
      j(fe, this).name
    );
  },
  evaluate(t, e = {}) {
    const r = j(fe, this);
    return ra(r, t, e);
  },
  module(t) {
    if (typeof t != "string")
      throw b("first argument of module() must be a string");
    const { exportsProxy: e } = Fn(
      this,
      j(fe, this),
      ft,
      t
    );
    return e;
  },
  async import(t) {
    const { noNamespaceBox: e, noAggregateLoadErrors: r } = (
      /** @type {CompartmentFields} */
      j(fe, this)
    );
    if (typeof t != "string")
      throw b("first argument of import() must be a string");
    return rs(
      un(fe, ft, this, t, {
        noAggregateErrors: r
      }),
      () => {
        const n = mo(
          /** @type {Compartment} */
          this,
          t
        );
        return e ? n : { namespace: n };
      }
    );
  },
  async load(t) {
    if (typeof t != "string")
      throw b("first argument of load() must be a string");
    const { noAggregateLoadErrors: e } = (
      /** @type {CompartmentFields} */
      j(fe, this)
    );
    return un(fe, ft, this, t, {
      noAggregateErrors: e
    });
  },
  importNow(t) {
    if (typeof t != "string")
      throw b("first argument of importNow() must be a string");
    const { noAggregateLoadErrors: e } = (
      /** @type {CompartmentFields} */
      j(fe, this)
    );
    return fl(fe, ft, this, t, {
      noAggregateErrors: e
    }), mo(
      /** @type {Compartment} */
      this,
      t
    );
  }
};
z(jn, {
  [et]: {
    value: "Compartment",
    writable: !1,
    enumerable: !1,
    configurable: !0
  }
});
z(Un, {
  prototype: { value: jn }
});
const Sl = (...t) => {
  if (t.length === 0)
    return {};
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && "__options__" in t[0]) {
    const { __options__: e, ...r } = t[0];
    return J(
      e === !0,
      `Compartment constructor only supports true __options__ sigil, got ${e}`
    ), r;
  } else {
    const [
      e = (
        /** @type {Map<string, any>} */
        {}
      ),
      r = (
        /** @type {Map<string, ModuleDescriptor>} */
        {}
      ),
      n = {}
    ] = (
      /** @type {LegacyCompartmentOptionsArgs} */
      t
    );
    return Xn(
      n.modules,
      void 0,
      "Compartment constructor must receive either a module map argument or modules option, not both"
    ), Xn(
      n.globals,
      void 0,
      "Compartment constructor must receive either globals argument or option, not both"
    ), {
      ...n,
      globals: e,
      modules: r
    };
  }
}, dn = (t, e, r, { parentCompartment: n = void 0, enforceNew: o = !1 } = {}) => {
  function s(...c) {
    if (o && new.target === void 0)
      throw b(
        "Class constructor Compartment cannot be invoked without 'new'"
      );
    const {
      name: i = "<unknown>",
      transforms: l = [],
      __shimTransforms__: u = [],
      globals: f = {},
      modules: d = {},
      resolveHook: p,
      importHook: m,
      importNowHook: g,
      moduleMapHook: w,
      importMetaHook: h,
      __noNamespaceBox__: _ = !1,
      noAggregateLoadErrors: E = !1
    } = Sl(...c), T = Or(
      [l, u],
      ns
    ), M = { __proto__: null, ...f }, N = { __proto__: null, ...d }, U = new Me(), H = new Me(), X = new Me(), G = {}, Y = this;
    _c(G), Fs(G);
    const { safeEvaluate: Be } = Nn({
      globalObject: G,
      globalTransforms: T,
      sloppyGlobalsMode: !1
    });
    Ds(G, {
      intrinsics: e,
      newGlobalPropertyNames: $s,
      makeCompartmentConstructor: t,
      parentCompartment: this,
      markVirtualizedNativeFunction: r
    }), ln(
      G,
      Be,
      r
    ), Yt(G, M);
    const nt = async (ze) => {
      if (typeof p != "function")
        throw b(
          `Compartment does not support dynamic import: no configured resolveHook for compartment ${D(i)}`
        );
      await un(fe, ft, Y, ze, {
        noAggregateErrors: E
      });
      const { execute: ue, exportsProxy: Se } = Dn(
        fe,
        ft,
        Y,
        ze
      );
      return ue(), Se;
    };
    he(fe, this, {
      name: `${i}`,
      globalTransforms: T,
      globalObject: G,
      safeEvaluate: Be,
      resolveHook: p,
      importHook: m,
      importNowHook: g,
      moduleMap: N,
      moduleMapHook: w,
      importMetaHook: h,
      moduleRecords: U,
      __shimTransforms__: u,
      deferredExports: X,
      instances: H,
      parentCompartment: n,
      noNamespaceBox: _,
      compartmentImport: nt,
      noAggregateLoadErrors: E
    });
  }
  return s.prototype = jn, s;
};
function Yr(t) {
  return Z(t).constructor;
}
function El() {
  return arguments;
}
const kl = () => {
  const t = me.prototype.constructor, e = te(El(), "callee"), r = e && e.get, n = Va(new ye()), o = Z(n), s = Cr[Bo] && Za(/./), c = s && Z(s), i = Ma([]), l = Z(i), u = Z(_a), f = Ba(new Me()), d = Z(f), p = za(new Mt()), m = Z(p), g = Z(l);
  function* w() {
  }
  const h = Yr(w), _ = h.prototype;
  async function E() {
  }
  const T = Yr(E), M = {
    "%InertFunction%": t,
    "%ArrayIteratorPrototype%": l,
    "%InertAsyncFunction%": T,
    "%Generator%": _,
    "%InertGeneratorFunction%": h,
    "%IteratorPrototype%": g,
    "%MapIteratorPrototype%": d,
    "%RegExpStringIteratorPrototype%": c,
    "%SetIteratorPrototype%": m,
    "%StringIteratorPrototype%": o,
    "%ThrowTypeError%": r,
    "%TypedArray%": u,
    "%InertCompartment%": Un
  };
  if (tn !== void 0) {
    const X = Yr(
      tn
    ), G = X.prototype, Y = G.prototype, Be = Z(Y);
    Yt(M, {
      "%AsyncGenerator%": G,
      "%InertAsyncGeneratorFunction%": X,
      "%AsyncGeneratorPrototype%": Y,
      "%AsyncIteratorPrototype%": Be
    });
  }
  A.Iterator && (M["%IteratorHelperPrototype%"] = Z(
    // eslint-disable-next-line @endo/no-polymorphic-call
    A.Iterator.from([]).take(0)
  ), M["%WrapForValidIteratorPrototype%"] = Z(
    // eslint-disable-next-line @endo/no-polymorphic-call
    A.Iterator.from({
      next() {
        return { value: void 0 };
      }
    })
  )), A.AsyncIterator && (M["%AsyncIteratorHelperPrototype%"] = Z(
    // eslint-disable-next-line @endo/no-polymorphic-call
    A.AsyncIterator.from([]).take(0)
  ), M["%WrapForValidAsyncIteratorPrototype%"] = Z(
    // eslint-disable-next-line @endo/no-polymorphic-call
    A.AsyncIterator.from({ next() {
    } })
  ));
  const U = new lr(0).sliceToImmutable(), H = Z(U);
  return H !== lr.prototype && (M["%ImmutableArrayBufferPrototype%"] = H), M;
}, na = (t, e) => {
  if (e === "safe" || (Object.isExtensible = () => !1, Object.isFrozen = () => !0, Object.isSealed = () => !0, Reflect.isExtensible = () => !1, t.isFake))
    return t;
  const r = (n) => n;
  return r.isFake = !0, v(r);
};
v(na);
const Al = () => {
  const t = wt, e = t.prototype, r = ts(wt, void 0);
  z(e, {
    constructor: {
      value: r
      // leave other `constructor` attributes as is
    }
  });
  const n = ge(
    Ue(t)
  ), o = Jt(
    be(n, ([s, c]) => [
      s,
      { ...c, configurable: !0 }
    ])
  );
  return z(r, o), { "%SharedSymbol%": r };
}, Pl = (t) => {
  try {
    return t(), !1;
  } catch {
    return !0;
  }
}, ho = (t, e, r) => {
  if (t === void 0)
    return !1;
  const n = te(t, e);
  if (!n || "value" in n)
    return !1;
  const { get: o, set: s } = n;
  if (typeof o != "function" || typeof s != "function" || o() !== r || le(o, t, []) !== r)
    return !1;
  const c = "Seems to be a setter", i = { __proto__: null };
  if (le(s, i, [c]), i[e] !== c)
    return !1;
  const l = { __proto__: t };
  return le(s, l, [c]), l[e] !== c || !Pl(() => le(s, t, [r])) || "originalValue" in o || n.configurable === !1 ? !1 : (B(t, e, {
    value: r,
    writable: !0,
    enumerable: n.enumerable,
    configurable: !0
  }), !0);
}, Il = (t) => {
  ho(
    t["%IteratorPrototype%"],
    "constructor",
    t.Iterator
  ), ho(
    t["%IteratorPrototype%"],
    et,
    "Iterator"
  );
}, Tl = () => {
  const t = Hr[Le];
  B(Hr, Le, {
    configurable: !0,
    get() {
      return t;
    },
    set(e) {
      this !== Hr && (ee(this, Le) && (this[Le] = e), B(this, Le, {
        value: e,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }));
    }
  });
}, Cl = () => {
  if (typeof fr.transfer == "function")
    return {};
  const t = A.structuredClone;
  return typeof t != "function" ? {} : (B(fr, "transfer", {
    // @ts-expect-error
    value: {
      /**
       * @param {number} [newLength]
       */
      transfer(r = void 0) {
        const n = Fa(this);
        if (r === void 0 || r === n)
          return t(this, { transfer: [this] });
        if (typeof r != "number")
          throw b("transfer newLength if provided must be a number");
        if (r > n) {
          const o = new lr(r), s = new Xr(this), c = new Xr(o);
          return Da(c, s), t(this, { transfer: [this] }), o;
        } else {
          const o = La(this, 0, r);
          return t(this, { transfer: [this] }), o;
        }
      }
    }.transfer,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), {});
}, or = (t) => {
  let e = !1;
  const r = (...n) => {
    e ? t(" ", ...n) : t(...n);
  };
  return (
    /** @type {GroupReporter} */
    {
      warn(...n) {
        r(...n);
      },
      error(...n) {
        r(...n);
      },
      groupCollapsed(...n) {
        J(!e), t(...n), e = !0;
      },
      groupEnd() {
        e = !1;
      }
    }
  );
}, go = () => {
}, oa = (t) => {
  if (t === "none")
    return or(go);
  if (t === "console" || A.window === A || A.importScripts !== void 0)
    return console;
  if (A.console !== void 0) {
    const e = A.console, r = ts(e.error, e);
    return or(r);
  }
  return A.print !== void 0 ? or(A.print) : or(go);
}, yo = (t, e, r) => {
  const { warn: n, error: o, groupCollapsed: s, groupEnd: c } = e, i = s && c;
  let l = !1;
  try {
    return r({
      warn(...u) {
        i && !l && (s(t), l = !0), n(...u);
      },
      error(...u) {
        i && !l && (s(t), l = !0), o(...u);
      }
    });
  } finally {
    i && l && (c(), l = !1);
  }
}, { Fail: $l, details: _o, quote: Rl } = J;
let sr, ar;
const Nl = Ji(), Ol = () => {
  let t;
  try {
    t = me("return true")();
  } catch {
    t = !1;
  }
  let e;
  try {
    e = en("true");
  } catch {
    e = !1;
  }
  let r;
  return t && e && (r = me(
    "eval",
    "SES_changed",
    `        eval("SES_changed = true");
        return SES_changed;
      `
  )(en, !1), r || delete A.SES_changed), { functionAllowed: t, evalAllowed: e, directEvalAllowed: r };
}, sa = (t = {}) => {
  const {
    errorTaming: e = (
      /** @type {'safe' | 'unsafe' | 'unsafe-debug'} */
      ie("LOCKDOWN_ERROR_TAMING", "safe", ["unsafe", "unsafe-debug"])
    ),
    errorTrapping: r = (
      /** @type {'platform' | 'none' | 'report' | 'abort' | 'exit'} */
      ie("LOCKDOWN_ERROR_TRAPPING", "platform", [
        "none",
        "report",
        "abort",
        "exit"
      ])
    ),
    reporting: n = (
      /** @type {'platform' | 'console' | 'none'} */
      ie("LOCKDOWN_REPORTING", "platform", ["console", "none"])
    ),
    unhandledRejectionTrapping: o = (
      /** @type {'none' | 'report'} */
      ie("LOCKDOWN_UNHANDLED_REJECTION_TRAPPING", "report", ["none"])
    ),
    regExpTaming: s = (
      /** @type {'safe' | 'unsafe'} */
      ie("LOCKDOWN_REGEXP_TAMING", "safe", ["unsafe"])
    ),
    localeTaming: c = (
      /** @type {'safe' | 'unsafe'} */
      ie("LOCKDOWN_LOCALE_TAMING", "safe", ["unsafe"])
    ),
    consoleTaming: i = (
      /** @type {'unsafe' | 'safe'} */
      ie("LOCKDOWN_CONSOLE_TAMING", "safe", ["unsafe"])
    ),
    overrideTaming: l = (
      /** @type {'moderate' | 'min' | 'severe'} */
      ie("LOCKDOWN_OVERRIDE_TAMING", "moderate", ["min", "severe"])
    ),
    stackFiltering: u = (
      /** @type {'concise' | 'omit-frames' | 'shorten-paths' | 'verbose'} */
      ie("LOCKDOWN_STACK_FILTERING", "concise", [
        "omit-frames",
        "shorten-paths",
        "verbose"
      ])
    ),
    domainTaming: f = (
      /** @type {'safe' | 'unsafe'} */
      ie("LOCKDOWN_DOMAIN_TAMING", "safe", ["unsafe"])
    ),
    evalTaming: d = (
      /** @type {'safe-eval' | 'unsafe-eval' | 'no-eval'} */
      ie("LOCKDOWN_EVAL_TAMING", "safe-eval", [
        "unsafe-eval",
        "no-eval",
        // deprecated
        "safeEval",
        "unsafeEval",
        "noEval"
      ])
    ),
    overrideDebug: p = (
      /** @type {string[]} */
      gt(
        Pn(ie("LOCKDOWN_OVERRIDE_DEBUG", ""), ","),
        /** @param {string} debugName */
        (Ie) => Ie !== ""
      )
    ),
    legacyRegeneratorRuntimeTaming: m = (
      /** @type {'safe' | 'unsafe-ignore'} */
      ie("LOCKDOWN_LEGACY_REGENERATOR_RUNTIME_TAMING", "safe", [
        "unsafe-ignore"
      ])
    ),
    __hardenTaming__: g = (
      /** @type {'safe' | 'unsafe'} */
      ie("LOCKDOWN_HARDEN_TAMING", "safe", ["unsafe"])
    ),
    dateTaming: w,
    // deprecated
    mathTaming: h,
    // deprecated
    ..._
  } = t, E = Ge(_);
  E.length === 0 || $l`lockdown(): non supported option ${Rl(E)}`;
  const T = oa(n), { warn: M } = T;
  w !== void 0 && M(
    "SES The 'dateTaming' option is deprecated and does nothing. In the future specifying it will be an error."
  ), h !== void 0 && M(
    "SES The 'mathTaming' option is deprecated and does nothing. In the future specifying it will be an error."
  ), sr === void 0 || // eslint-disable-next-line @endo/no-polymorphic-call
  J.fail(
    _o`Already locked down at ${sr} (SES_ALREADY_LOCKED_DOWN)`,
    b
  ), sr = b("Prior lockdown (SES_ALREADY_LOCKED_DOWN)"), sr.stack;
  const { functionAllowed: N, evalAllowed: U, directEvalAllowed: H } = Ol();
  if (H === !1 && d === "safe-eval" && (N || U))
    throw b(
      "SES cannot initialize unless 'eval' is the original intrinsic 'eval', suitable for direct eval (dynamically scoped eval) (SES_DIRECT_EVAL)"
    );
  if (A.Function.prototype.constructor !== A.Function && // @ts-ignore harden is absent on globalThis type def.
  typeof A.harden == "function" && // @ts-ignore lockdown is absent on globalThis type def.
  typeof A.lockdown == "function" && A.Date.prototype.constructor !== A.Date && typeof A.Date.now == "function" && // @ts-ignore does not recognize that Date constructor is a special
  // Function.
  // eslint-disable-next-line @endo/no-polymorphic-call
  Tr(A.Date.prototype.constructor.now(), NaN))
    throw b(
      "Already locked down but not by this SES instance (SES_MULTIPLE_INSTANCES)"
    );
  Nc(f);
  const G = Qs(), { addIntrinsics: Y, completePrototypes: Be, finalIntrinsics: nt } = Os(T), ze = na(Nl, g);
  Y({ harden: ze }), Y(sc()), Y(ac()), Y(tl(e, u)), Y(ic()), Y(cc(s)), Y(Al()), Y(Cl()), Y(Oc()), Y(kl()), Be();
  const ue = nt(), Se = { __proto__: null };
  typeof A.Buffer == "function" && (Se.Buffer = A.Buffer);
  let er;
  e === "safe" && (er = ue["%InitialGetStackString%"]);
  const Ut = Lc(
    i,
    r,
    o,
    er
  );
  if (A.console = /** @type {Console} */
  Ut.console, typeof /** @type {any} */
  Ut.console._times == "object" && (Se.SafeMap = Z(
    // eslint-disable-next-line no-underscore-dangle
    /** @type {any} */
    Ut.console._times
  )), (e === "unsafe" || e === "unsafe-debug") && A.assert === J && (A.assert = Br(void 0, !0)), hc(ue, c), Il(ue), yo(
    "SES Removing unpermitted intrinsics",
    T,
    (Ie) => oc(
      ue,
      G,
      Ie
    )
  ), Fs(A), Ds(A, {
    intrinsics: ue,
    newGlobalPropertyNames: Qn,
    makeCompartmentConstructor: dn,
    markVirtualizedNativeFunction: G
  }), d === "no-eval" || // deprecated
  d === "noEval")
    ln(
      A,
      Ya,
      G
    );
  else if (d === "safe-eval" || // deprecated
  d === "safeEval") {
    const { safeEvaluate: Ie } = Nn({ globalObject: A });
    ln(
      A,
      Ie,
      G
    );
  }
  return () => {
    ar === void 0 || // eslint-disable-next-line @endo/no-polymorphic-call
    J.fail(
      _o`Already locked down at ${ar} (SES_ALREADY_LOCKED_DOWN)`,
      b
    ), ar = b(
      "Prior lockdown (SES_ALREADY_LOCKED_DOWN)"
    ), ar.stack, yo(
      "SES Enabling property overrides",
      T,
      (ot) => dc(
        ue,
        l,
        ot,
        p
      )
    ), m === "unsafe-ignore" && Tl();
    const Ie = {
      intrinsics: ue,
      hostIntrinsics: Se,
      globals: {
        // Harden evaluators
        Function: A.Function,
        eval: A.eval,
        // @ts-ignore Compartment does exist on globalThis
        Compartment: A.Compartment,
        // Harden Symbol
        Symbol: A.Symbol
      }
    };
    for (const ot of Pt(Qn))
      Ie.globals[ot] = A[ot];
    return ze(Ie), ze;
  };
};
A.lockdown = (t) => {
  const e = sa(t);
  A.harden = e();
};
A.repairIntrinsics = (t) => {
  const e = sa(t);
  A.hardenIntrinsics = () => {
    A.harden = e();
  };
};
const Ml = Qs(), Ll = oa("none");
A.Compartment = dn(
  dn,
  // Any reporting that would need to be done should have already been done
  // during `lockdown()`.
  // See https://github.com/endojs/endo/pull/2624#discussion_r1840979770
  nc(A, Ll),
  Ml,
  {
    enforceNew: !0
  }
);
A.assert = J;
const Fl = ea(br), Dl = Pa(
  "MAKE_CAUSAL_CONSOLE_FROM_LOGGER_KEY_FOR_SES_AVA"
);
A[Dl] = Fl;
const aa = (t) => {
  let e = 0, r = 0;
  if (t && window.DOMMatrixReadOnly) {
    const n = window.getComputedStyle(t), o = new DOMMatrixReadOnly(n.transform);
    e = o.m41, r = o.m42;
  }
  return { x: e, y: r };
}, Ul = (t, e = t, r) => {
  let n = { x: 0, y: 0 }, o = { x: 0, y: 0 };
  const s = (l) => {
    const { clientX: u, clientY: f } = l, d = u - o.x + n.x, p = f - o.y + n.y;
    e.style.transform = `translate(${d}px, ${p}px)`, r?.();
  }, c = () => {
    document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", c);
  }, i = (l) => {
    o = { x: l.clientX, y: l.clientY }, n = aa(e), document.addEventListener("mousemove", s), document.addEventListener("mouseup", c);
  };
  return t.addEventListener("mousedown", i), c;
}, jl = `:host{--spacing-4: .25rem;--spacing-8: calc(var(--spacing-4) * 2);--spacing-12: calc(var(--spacing-4) * 3);--spacing-16: calc(var(--spacing-4) * 4);--spacing-20: calc(var(--spacing-4) * 5);--spacing-24: calc(var(--spacing-4) * 6);--spacing-28: calc(var(--spacing-4) * 7);--spacing-32: calc(var(--spacing-4) * 8);--spacing-36: calc(var(--spacing-4) * 9);--spacing-40: calc(var(--spacing-4) * 10);--font-weight-regular: 400;--font-weight-bold: 500;--font-line-height-s: 1.2;--font-line-height-m: 1.4;--font-line-height-l: 1.5;--font-size-s: 12px;--font-size-m: 14px;--font-size-l: 16px}[data-theme]{background-color:var(--color-background-primary);color:var(--color-foreground-secondary)}::-webkit-resizer{display:none}.wrapper{position:absolute;inset-block-start:var(--modal-block-start);inset-inline-start:var(--modal-inline-start);z-index:1000;padding:10px;border-radius:15px;border:2px solid var(--color-background-quaternary);box-shadow:0 0 10px #0000004d;overflow:hidden;min-inline-size:25px;min-block-size:200px;resize:both}.wrapper:after{content:"";cursor:se-resize;inline-size:1rem;block-size:1rem;background-image:url("data:image/svg+xml,%3csvg%20width='16.022'%20xmlns='http://www.w3.org/2000/svg'%20height='16.022'%20viewBox='-0.011%20-0.011%2016.022%2016.022'%20fill='none'%3e%3cg%20data-testid='Group'%3e%3cg%20data-testid='Path'%3e%3cpath%20d='M.011%2015.917%2015.937-.011'%20class='fills'/%3e%3cg%20class='strokes'%3e%3cpath%20d='M.011%2015.917%2015.937-.011'%20style='fill:%20none;%20stroke-width:%201;%20stroke:%20rgb(111,%20111,%20111);%20stroke-opacity:%201;%20stroke-linecap:%20round;'%20class='stroke-shape'/%3e%3c/g%3e%3c/g%3e%3cg%20data-testid='Path'%3e%3cpath%20d='m11.207%2014.601%203.361-3.401'%20class='fills'/%3e%3cg%20class='strokes'%3e%3cpath%20d='m11.207%2014.601%203.361-3.401'%20style='fill:%20none;%20stroke-width:%201;%20stroke:%20rgb(111,%20111,%20111);%20stroke-opacity:%201;%20stroke-linecap:%20round;'%20class='stroke-shape'/%3e%3c/g%3e%3c/g%3e%3cg%20data-testid='Path'%3e%3cpath%20d='m4.884%2016.004%2011.112-11.17'%20class='fills'/%3e%3cg%20class='strokes'%3e%3cpath%20d='m4.884%2016.004%2011.112-11.17'%20style='fill:%20none;%20stroke-width:%201;%20stroke:%20rgb(111,%20111,%20111);%20stroke-opacity:%201;%20stroke-linecap:%20round;'%20class='stroke-shape'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e");background-position:center;right:5px;bottom:5px;pointer-events:none;position:absolute}.inner{padding:10px;cursor:grab;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;block-size:100%}.inner>*{flex:1}.inner>.header{flex:0}.header{align-items:center;display:flex;justify-content:space-between;border-block-end:2px solid var(--color-background-quaternary);padding-block-end:var(--spacing-4)}button{background:transparent;border:0;cursor:pointer;padding:0}h1{font-size:var(--font-size-s);font-weight:var(--font-weight-bold);margin:0;margin-inline-end:var(--spacing-4);-webkit-user-select:none;user-select:none}iframe{border:none;inline-size:100%;block-size:100%}`;
function Bl(t, e, r, n, o) {
  const s = document.createElement("plugin-modal");
  s.setTheme(r);
  const { width: c } = ia(s, n?.width, n?.height), i = {
    blockStart: 40,
    // To be able to resize the element as expected the position must be absolute from the right.
    // This value is the length of the window minus the width of the element plus the width of the design tab.
    inlineStart: window.innerWidth - c - 290
  };
  return s.style.setProperty(
    "--modal-block-start",
    `${i.blockStart}px`
  ), s.style.setProperty(
    "--modal-inline-start",
    `${i.inlineStart}px`
  ), s.setAttribute("title", t), s.setAttribute("iframe-src", e), o && s.setAttribute("allow-downloads", "true"), document.body.appendChild(s), s;
}
function ia(t, e = 335, r = 590) {
  const s = t.shadowRoot?.querySelector(".wrapper");
  let c = 0, i = 0;
  if (s) {
    const g = s.getBoundingClientRect();
    c = g.x, i = g.y;
  }
  const l = window.innerWidth - 40, u = window.innerHeight - 40;
  e = Math.min(e, l), r = Math.min(r, u), e = Math.max(e, 200), r = Math.max(r, 200);
  let f = 0;
  c + e > l && (f = l - (c + e));
  let d = 0;
  i + r > u && (d = u - (i + r));
  let { x: p, y: m } = aa(t.wrapper);
  return p = p + f, m = m + d, t.wrapper.style.transform = `translate(${p}px, ${m}px)`, t.wrapper.style.width = `${e}px`, t.wrapper.style.height = `${r}px`, { width: e, height: r };
}
const zl = `
<svg width="16"  height="16"xmlns="http://www.w3.org/2000/svg" fill="none"><g class="fills"><rect rx="0" ry="0" width="16" height="16" class="frame-background"/></g><g class="frame-children"><path d="M11.997 3.997 8 8l-3.997 4.003m-.006-8L8 8l4.003 3.997" class="fills"/><g class="strokes"><path d="M11.997 3.997 8 8l-3.997 4.003m-.006-8L8 8l4.003 3.997" style="fill: none; stroke-width: 1; stroke: rgb(143, 157, 163); stroke-opacity: 1; stroke-linecap: round;" class="stroke-shape"/></g></g></svg>`, Zl = 3;
class Gl extends HTMLElement {
  constructor() {
    super(), this.wrapper = document.createElement("div"), this.#e = document.createElement("div"), this.#t = null, this.attachShadow({ mode: "open" });
  }
  #e;
  #t;
  setTheme(e) {
    this.wrapper && this.wrapper.setAttribute("data-theme", e);
  }
  resize(e, r) {
    this.wrapper && ia(this, e, r);
  }
  disconnectedCallback() {
    this.#t?.();
  }
  calculateZIndex() {
    const e = document.querySelectorAll("plugin-modal"), r = Array.from(e).filter((o) => o !== this).map((o) => Number(o.style.zIndex)), n = Math.max(...r, Zl);
    this.style.zIndex = (n + 1).toString();
  }
  connectedCallback() {
    const e = this.getAttribute("title"), r = this.getAttribute("iframe-src"), n = this.getAttribute("allow-downloads") || !1;
    if (!e || !r)
      throw new Error("title and iframe-src attributes are required");
    if (!this.shadowRoot)
      throw new Error("Error creating shadow root");
    this.#e.classList.add("inner"), this.wrapper.classList.add("wrapper"), this.wrapper.style.maxInlineSize = "90vw", this.wrapper.style.maxBlockSize = "90vh", this.#t = Ul(this.#e, this.wrapper, () => {
      this.calculateZIndex();
    });
    const o = document.createElement("div");
    o.classList.add("header");
    const s = document.createElement("h1");
    s.textContent = e, o.appendChild(s);
    const c = document.createElement("button");
    c.setAttribute("type", "button"), c.innerHTML = `<div class="close">${zl}</div>`, c.addEventListener("click", () => {
      this.shadowRoot && this.shadowRoot.dispatchEvent(
        new CustomEvent("close", {
          composed: !0,
          bubbles: !0
        })
      );
    }), o.appendChild(c);
    const i = document.createElement("iframe");
    i.src = r, i.allow = "", i.sandbox.add(
      "allow-scripts",
      "allow-forms",
      "allow-modals",
      "allow-popups",
      "allow-popups-to-escape-sandbox",
      "allow-storage-access-by-user-activation",
      "allow-same-origin"
    ), n && i.sandbox.add("allow-downloads"), i.addEventListener("load", () => {
      this.shadowRoot?.dispatchEvent(
        new CustomEvent("load", {
          composed: !0,
          bubbles: !0
        })
      );
    }), this.addEventListener("message", (u) => {
      if (i.contentWindow)
        try {
          i.contentWindow.postMessage(u.detail, "*");
        } catch (f) {
          console.error(
            "plugin modal: failed to send message to iframe via postMessage.",
            f
          );
        }
    }), this.shadowRoot.appendChild(this.wrapper), this.wrapper.appendChild(this.#e), this.#e.appendChild(o), this.#e.appendChild(i);
    const l = document.createElement("style");
    l.textContent = jl, this.shadowRoot.appendChild(l), this.calculateZIndex();
  }
  size() {
    const e = Number(this.wrapper.style.width.replace("px", "") || "300"), r = Number(this.wrapper.style.height.replace("px", "") || "400");
    return { width: e, height: r };
  }
}
customElements.define("plugin-modal", Gl);
var F;
(function(t) {
  t.assertEqual = (o) => {
  };
  function e(o) {
  }
  t.assertIs = e;
  function r(o) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (o) => {
    const s = {};
    for (const c of o)
      s[c] = c;
    return s;
  }, t.getValidEnumValues = (o) => {
    const s = t.objectKeys(o).filter((i) => typeof o[o[i]] != "number"), c = {};
    for (const i of s)
      c[i] = o[i];
    return t.objectValues(c);
  }, t.objectValues = (o) => t.objectKeys(o).map(function(s) {
    return o[s];
  }), t.objectKeys = typeof Object.keys == "function" ? (o) => Object.keys(o) : (o) => {
    const s = [];
    for (const c in o)
      Object.prototype.hasOwnProperty.call(o, c) && s.push(c);
    return s;
  }, t.find = (o, s) => {
    for (const c of o)
      if (s(c))
        return c;
  }, t.isInteger = typeof Number.isInteger == "function" ? (o) => Number.isInteger(o) : (o) => typeof o == "number" && Number.isFinite(o) && Math.floor(o) === o;
  function n(o, s = " | ") {
    return o.map((c) => typeof c == "string" ? `'${c}'` : c).join(s);
  }
  t.joinValues = n, t.jsonStringifyReplacer = (o, s) => typeof s == "bigint" ? s.toString() : s;
})(F || (F = {}));
var vo;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(vo || (vo = {}));
const S = F.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), qe = (t) => {
  switch (typeof t) {
    case "undefined":
      return S.undefined;
    case "string":
      return S.string;
    case "number":
      return Number.isNaN(t) ? S.nan : S.number;
    case "boolean":
      return S.boolean;
    case "function":
      return S.function;
    case "bigint":
      return S.bigint;
    case "symbol":
      return S.symbol;
    case "object":
      return Array.isArray(t) ? S.array : t === null ? S.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? S.promise : typeof Map < "u" && t instanceof Map ? S.map : typeof Set < "u" && t instanceof Set ? S.set : typeof Date < "u" && t instanceof Date ? S.date : S.object;
    default:
      return S.unknown;
  }
}, y = F.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class Pe extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const r = e || function(s) {
      return s.message;
    }, n = { _errors: [] }, o = (s) => {
      for (const c of s.issues)
        if (c.code === "invalid_union")
          c.unionErrors.map(o);
        else if (c.code === "invalid_return_type")
          o(c.returnTypeError);
        else if (c.code === "invalid_arguments")
          o(c.argumentsError);
        else if (c.path.length === 0)
          n._errors.push(r(c));
        else {
          let i = n, l = 0;
          for (; l < c.path.length; ) {
            const u = c.path[l];
            l === c.path.length - 1 ? (i[u] = i[u] || { _errors: [] }, i[u]._errors.push(r(c))) : i[u] = i[u] || { _errors: [] }, i = i[u], l++;
          }
        }
    };
    return o(this), n;
  }
  static assert(e) {
    if (!(e instanceof Pe))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, F.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, n = [];
    for (const o of this.issues)
      if (o.path.length > 0) {
        const s = o.path[0];
        r[s] = r[s] || [], r[s].push(e(o));
      } else
        n.push(e(o));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
Pe.create = (t) => new Pe(t);
const Ht = (t, e) => {
  let r;
  switch (t.code) {
    case y.invalid_type:
      t.received === S.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case y.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, F.jsonStringifyReplacer)}`;
      break;
    case y.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${F.joinValues(t.keys, ", ")}`;
      break;
    case y.invalid_union:
      r = "Invalid input";
      break;
    case y.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${F.joinValues(t.options)}`;
      break;
    case y.invalid_enum_value:
      r = `Invalid enum value. Expected ${F.joinValues(t.options)}, received '${t.received}'`;
      break;
    case y.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case y.invalid_return_type:
      r = "Invalid function return type";
      break;
    case y.invalid_date:
      r = "Invalid date";
      break;
    case y.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : F.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case y.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case y.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case y.custom:
      r = "Invalid input";
      break;
    case y.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case y.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case y.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, F.assertNever(t);
  }
  return { message: r };
};
let Hl = Ht;
function fn() {
  return Hl;
}
const pn = (t) => {
  const { data: e, path: r, errorMaps: n, issueData: o } = t, s = [...r, ...o.path || []], c = {
    ...o,
    path: s
  };
  if (o.message !== void 0)
    return {
      ...o,
      path: s,
      message: o.message
    };
  let i = "";
  const l = n.filter((u) => !!u).slice().reverse();
  for (const u of l)
    i = u(c, { data: e, defaultError: i }).message;
  return {
    ...o,
    path: s,
    message: i
  };
};
function x(t, e) {
  const r = fn(), n = pn({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      r,
      // then global override map
      r === Ht ? void 0 : Ht
      // then global default map
    ].filter((o) => !!o)
  });
  t.common.issues.push(n);
}
class we {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const n = [];
    for (const o of r) {
      if (o.status === "aborted")
        return $;
      o.status === "dirty" && e.dirty(), n.push(o.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, r) {
    const n = [];
    for (const o of r) {
      const s = await o.key, c = await o.value;
      n.push({
        key: s,
        value: c
      });
    }
    return we.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const o of r) {
      const { key: s, value: c } = o;
      if (s.status === "aborted" || c.status === "aborted")
        return $;
      s.status === "dirty" && e.dirty(), c.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof c.value < "u" || o.alwaysSet) && (n[s.value] = c.value);
    }
    return { status: e.value, value: n };
  }
}
const $ = Object.freeze({
  status: "aborted"
}), zt = (t) => ({ status: "dirty", value: t }), _e = (t) => ({ status: "valid", value: t }), bo = (t) => t.status === "aborted", wo = (t) => t.status === "dirty", Ct = (t) => t.status === "valid", Er = (t) => typeof Promise < "u" && t instanceof Promise;
var k;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e?.message;
})(k || (k = {}));
class tt {
  constructor(e, r, n, o) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = n, this._key = o;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const xo = (t, e) => {
  if (Ct(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Pe(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function O(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: n, description: o } = t;
  if (e && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: o } : { errorMap: (c, i) => {
    const { message: l } = t;
    return c.code === "invalid_enum_value" ? { message: l ?? i.defaultError } : typeof i.data > "u" ? { message: l ?? n ?? i.defaultError } : c.code !== "invalid_type" ? { message: i.defaultError } : { message: l ?? r ?? i.defaultError };
  }, description: o };
}
class L {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return qe(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: qe(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new we(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: qe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (Er(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const n = this.safeParse(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(e, r) {
    const n = {
      common: {
        issues: [],
        async: r?.async ?? !1,
        contextualErrorMap: r?.errorMap
      },
      path: r?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: qe(e)
    }, o = this._parseSync({ data: e, path: n.path, parent: n });
    return xo(n, o);
  }
  "~validate"(e) {
    const r = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: qe(e)
    };
    if (!this["~standard"].async)
      try {
        const n = this._parseSync({ data: e, path: [], parent: r });
        return Ct(n) ? {
          value: n.value
        } : {
          issues: r.common.issues
        };
      } catch (n) {
        n?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), r.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: r }).then((n) => Ct(n) ? {
      value: n.value
    } : {
      issues: r.common.issues
    });
  }
  async parseAsync(e, r) {
    const n = await this.safeParseAsync(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(e, r) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: r?.errorMap,
        async: !0
      },
      path: r?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: qe(e)
    }, o = this._parse({ data: e, path: n.path, parent: n }), s = await (Er(o) ? o : Promise.resolve(o));
    return xo(n, s);
  }
  refine(e, r) {
    const n = (o) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(o) : r;
    return this._refinement((o, s) => {
      const c = e(o), i = () => s.addIssue({
        code: y.custom,
        ...n(o)
      });
      return typeof Promise < "u" && c instanceof Promise ? c.then((l) => l ? !0 : (i(), !1)) : c ? !0 : (i(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, o) => e(n) ? !0 : (o.addIssue(typeof r == "function" ? r(n, o) : r), !1));
  }
  _refinement(e) {
    return new Nt({
      schema: this,
      typeName: R.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (r) => this["~validate"](r)
    };
  }
  optional() {
    return Qe.create(this, this._def);
  }
  nullable() {
    return Ot.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Fe.create(this);
  }
  promise() {
    return qt.create(this, this._def);
  }
  or(e) {
    return Ar.create([this, e], this._def);
  }
  and(e) {
    return Pr.create(this, e, this._def);
  }
  transform(e) {
    return new Nt({
      ...O(this._def),
      schema: this,
      typeName: R.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new gn({
      ...O(this._def),
      innerType: this,
      defaultValue: r,
      typeName: R.ZodDefault
    });
  }
  brand() {
    return new mu({
      typeName: R.ZodBranded,
      type: this,
      ...O(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new yn({
      ...O(this._def),
      innerType: this,
      catchValue: r,
      typeName: R.ZodCatch
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Bn.create(this, e);
  }
  readonly() {
    return _n.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Vl = /^c[^\s-]{8,}$/i, Wl = /^[0-9a-z]+$/, ql = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Kl = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Yl = /^[a-z0-9_-]{21}$/i, Jl = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Xl = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Ql = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, eu = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Jr;
const tu = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ru = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, nu = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, ou = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, su = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, au = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ca = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", iu = new RegExp(`^${ca}$`);
function la(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const r = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${r}`;
}
function cu(t) {
  return new RegExp(`^${la(t)}$`);
}
function lu(t) {
  let e = `${ca}T${la(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function uu(t, e) {
  return !!((e === "v4" || !e) && tu.test(t) || (e === "v6" || !e) && nu.test(t));
}
function du(t, e) {
  if (!Jl.test(t))
    return !1;
  try {
    const [r] = t.split(".");
    if (!r)
      return !1;
    const n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), o = JSON.parse(atob(n));
    return !(typeof o != "object" || o === null || "typ" in o && o?.typ !== "JWT" || !o.alg || e && o.alg !== e);
  } catch {
    return !1;
  }
}
function fu(t, e) {
  return !!((e === "v4" || !e) && ru.test(t) || (e === "v6" || !e) && ou.test(t));
}
class Je extends L {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== S.string) {
      const s = this._getOrReturnCtx(e);
      return x(s, {
        code: y.invalid_type,
        expected: S.string,
        received: s.parsedType
      }), $;
    }
    const n = new we();
    let o;
    for (const s of this._def.checks)
      if (s.kind === "min")
        e.data.length < s.value && (o = this._getOrReturnCtx(e, o), x(o, {
          code: y.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "max")
        e.data.length > s.value && (o = this._getOrReturnCtx(e, o), x(o, {
          code: y.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "length") {
        const c = e.data.length > s.value, i = e.data.length < s.value;
        (c || i) && (o = this._getOrReturnCtx(e, o), c ? x(o, {
          code: y.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : i && x(o, {
          code: y.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), n.dirty());
      } else if (s.kind === "email")
        Ql.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
          validation: "email",
          code: y.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "emoji")
        Jr || (Jr = new RegExp(eu, "u")), Jr.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
          validation: "emoji",
          code: y.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "uuid")
        Kl.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
          validation: "uuid",
          code: y.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "nanoid")
        Yl.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
          validation: "nanoid",
          code: y.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid")
        Vl.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
          validation: "cuid",
          code: y.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid2")
        Wl.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
          validation: "cuid2",
          code: y.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "ulid")
        ql.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
          validation: "ulid",
          code: y.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "url")
        try {
          new URL(e.data);
        } catch {
          o = this._getOrReturnCtx(e, o), x(o, {
            validation: "url",
            code: y.invalid_string,
            message: s.message
          }), n.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
        validation: "regex",
        code: y.invalid_string,
        message: s.message
      }), n.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), n.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "datetime" ? lu(s).test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.invalid_string,
        validation: "datetime",
        message: s.message
      }), n.dirty()) : s.kind === "date" ? iu.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.invalid_string,
        validation: "date",
        message: s.message
      }), n.dirty()) : s.kind === "time" ? cu(s).test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.invalid_string,
        validation: "time",
        message: s.message
      }), n.dirty()) : s.kind === "duration" ? Xl.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
        validation: "duration",
        code: y.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "ip" ? uu(e.data, s.version) || (o = this._getOrReturnCtx(e, o), x(o, {
        validation: "ip",
        code: y.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "jwt" ? du(e.data, s.alg) || (o = this._getOrReturnCtx(e, o), x(o, {
        validation: "jwt",
        code: y.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "cidr" ? fu(e.data, s.version) || (o = this._getOrReturnCtx(e, o), x(o, {
        validation: "cidr",
        code: y.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64" ? su.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
        validation: "base64",
        code: y.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64url" ? au.test(e.data) || (o = this._getOrReturnCtx(e, o), x(o, {
        validation: "base64url",
        code: y.invalid_string,
        message: s.message
      }), n.dirty()) : F.assertNever(s);
    return { status: n.value, value: e.data };
  }
  _regex(e, r, n) {
    return this.refinement((o) => e.test(o), {
      validation: r,
      code: y.invalid_string,
      ...k.errToObj(n)
    });
  }
  _addCheck(e) {
    return new Je({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...k.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...k.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...k.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...k.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...k.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...k.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...k.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...k.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...k.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...k.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...k.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...k.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...k.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      offset: e?.offset ?? !1,
      local: e?.local ?? !1,
      ...k.errToObj(e?.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      ...k.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...k.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...k.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r?.position,
      ...k.errToObj(r?.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...k.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...k.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...k.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...k.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...k.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, k.errToObj(e));
  }
  trim() {
    return new Je({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Je({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Je({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
Je.create = (t) => new Je({
  checks: [],
  typeName: R.ZodString,
  coerce: t?.coerce ?? !1,
  ...O(t)
});
function pu(t, e) {
  const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, o = r > n ? r : n, s = Number.parseInt(t.toFixed(o).replace(".", "")), c = Number.parseInt(e.toFixed(o).replace(".", ""));
  return s % c / 10 ** o;
}
class $t extends L {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== S.number) {
      const s = this._getOrReturnCtx(e);
      return x(s, {
        code: y.invalid_type,
        expected: S.number,
        received: s.parsedType
      }), $;
    }
    let n;
    const o = new we();
    for (const s of this._def.checks)
      s.kind === "int" ? F.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), o.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), o.dirty()) : s.kind === "multipleOf" ? pu(e.data, s.value) !== 0 && (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), o.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.not_finite,
        message: s.message
      }), o.dirty()) : F.assertNever(s);
    return { status: o.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, k.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, k.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, k.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, k.toString(r));
  }
  setLimit(e, r, n, o) {
    return new $t({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: k.toString(o)
        }
      ]
    });
  }
  _addCheck(e) {
    return new $t({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: k.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: k.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: k.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: k.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: k.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: k.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: k.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: k.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: k.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && F.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
$t.create = (t) => new $t({
  checks: [],
  typeName: R.ZodNumber,
  coerce: t?.coerce || !1,
  ...O(t)
});
class Vt extends L {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== S.bigint)
      return this._getInvalidInput(e);
    let n;
    const o = new we();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), o.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), x(n, {
        code: y.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), o.dirty()) : F.assertNever(s);
    return { status: o.value, value: e.data };
  }
  _getInvalidInput(e) {
    const r = this._getOrReturnCtx(e);
    return x(r, {
      code: y.invalid_type,
      expected: S.bigint,
      received: r.parsedType
    }), $;
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, k.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, k.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, k.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, k.toString(r));
  }
  setLimit(e, r, n, o) {
    return new Vt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: k.toString(o)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Vt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: k.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: k.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: k.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: k.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: k.toString(r)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
Vt.create = (t) => new Vt({
  checks: [],
  typeName: R.ZodBigInt,
  coerce: t?.coerce ?? !1,
  ...O(t)
});
class mn extends L {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== S.boolean) {
      const n = this._getOrReturnCtx(e);
      return x(n, {
        code: y.invalid_type,
        expected: S.boolean,
        received: n.parsedType
      }), $;
    }
    return _e(e.data);
  }
}
mn.create = (t) => new mn({
  typeName: R.ZodBoolean,
  coerce: t?.coerce || !1,
  ...O(t)
});
class kr extends L {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== S.date) {
      const s = this._getOrReturnCtx(e);
      return x(s, {
        code: y.invalid_type,
        expected: S.date,
        received: s.parsedType
      }), $;
    }
    if (Number.isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return x(s, {
        code: y.invalid_date
      }), $;
    }
    const n = new we();
    let o;
    for (const s of this._def.checks)
      s.kind === "min" ? e.data.getTime() < s.value && (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), n.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (o = this._getOrReturnCtx(e, o), x(o, {
        code: y.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), n.dirty()) : F.assertNever(s);
    return {
      status: n.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new kr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: k.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: k.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
kr.create = (t) => new kr({
  checks: [],
  coerce: t?.coerce || !1,
  typeName: R.ZodDate,
  ...O(t)
});
class So extends L {
  _parse(e) {
    if (this._getType(e) !== S.symbol) {
      const n = this._getOrReturnCtx(e);
      return x(n, {
        code: y.invalid_type,
        expected: S.symbol,
        received: n.parsedType
      }), $;
    }
    return _e(e.data);
  }
}
So.create = (t) => new So({
  typeName: R.ZodSymbol,
  ...O(t)
});
class Eo extends L {
  _parse(e) {
    if (this._getType(e) !== S.undefined) {
      const n = this._getOrReturnCtx(e);
      return x(n, {
        code: y.invalid_type,
        expected: S.undefined,
        received: n.parsedType
      }), $;
    }
    return _e(e.data);
  }
}
Eo.create = (t) => new Eo({
  typeName: R.ZodUndefined,
  ...O(t)
});
class ko extends L {
  _parse(e) {
    if (this._getType(e) !== S.null) {
      const n = this._getOrReturnCtx(e);
      return x(n, {
        code: y.invalid_type,
        expected: S.null,
        received: n.parsedType
      }), $;
    }
    return _e(e.data);
  }
}
ko.create = (t) => new ko({
  typeName: R.ZodNull,
  ...O(t)
});
class Ao extends L {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return _e(e.data);
  }
}
Ao.create = (t) => new Ao({
  typeName: R.ZodAny,
  ...O(t)
});
class kt extends L {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return _e(e.data);
  }
}
kt.create = (t) => new kt({
  typeName: R.ZodUnknown,
  ...O(t)
});
class rt extends L {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return x(r, {
      code: y.invalid_type,
      expected: S.never,
      received: r.parsedType
    }), $;
  }
}
rt.create = (t) => new rt({
  typeName: R.ZodNever,
  ...O(t)
});
class Po extends L {
  _parse(e) {
    if (this._getType(e) !== S.undefined) {
      const n = this._getOrReturnCtx(e);
      return x(n, {
        code: y.invalid_type,
        expected: S.void,
        received: n.parsedType
      }), $;
    }
    return _e(e.data);
  }
}
Po.create = (t) => new Po({
  typeName: R.ZodVoid,
  ...O(t)
});
class Fe extends L {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e), o = this._def;
    if (r.parsedType !== S.array)
      return x(r, {
        code: y.invalid_type,
        expected: S.array,
        received: r.parsedType
      }), $;
    if (o.exactLength !== null) {
      const c = r.data.length > o.exactLength.value, i = r.data.length < o.exactLength.value;
      (c || i) && (x(r, {
        code: c ? y.too_big : y.too_small,
        minimum: i ? o.exactLength.value : void 0,
        maximum: c ? o.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: o.exactLength.message
      }), n.dirty());
    }
    if (o.minLength !== null && r.data.length < o.minLength.value && (x(r, {
      code: y.too_small,
      minimum: o.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.minLength.message
    }), n.dirty()), o.maxLength !== null && r.data.length > o.maxLength.value && (x(r, {
      code: y.too_big,
      maximum: o.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((c, i) => o.type._parseAsync(new tt(r, c, r.path, i)))).then((c) => we.mergeArray(n, c));
    const s = [...r.data].map((c, i) => o.type._parseSync(new tt(r, c, r.path, i)));
    return we.mergeArray(n, s);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new Fe({
      ...this._def,
      minLength: { value: e, message: k.toString(r) }
    });
  }
  max(e, r) {
    return new Fe({
      ...this._def,
      maxLength: { value: e, message: k.toString(r) }
    });
  }
  length(e, r) {
    return new Fe({
      ...this._def,
      exactLength: { value: e, message: k.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Fe.create = (t, e) => new Fe({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: R.ZodArray,
  ...O(e)
});
function bt(t) {
  if (t instanceof q) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = Qe.create(bt(n));
    }
    return new q({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Fe ? new Fe({
    ...t._def,
    type: bt(t.element)
  }) : t instanceof Qe ? Qe.create(bt(t.unwrap())) : t instanceof Ot ? Ot.create(bt(t.unwrap())) : t instanceof Ve ? Ve.create(t.items.map((e) => bt(e))) : t;
}
class q extends L {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = F.objectKeys(e);
    return this._cached = { shape: e, keys: r }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== S.object) {
      const u = this._getOrReturnCtx(e);
      return x(u, {
        code: y.invalid_type,
        expected: S.object,
        received: u.parsedType
      }), $;
    }
    const { status: n, ctx: o } = this._processInputParams(e), { shape: s, keys: c } = this._getCached(), i = [];
    if (!(this._def.catchall instanceof rt && this._def.unknownKeys === "strip"))
      for (const u in o.data)
        c.includes(u) || i.push(u);
    const l = [];
    for (const u of c) {
      const f = s[u], d = o.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: f._parse(new tt(o, d, o.path, u)),
        alwaysSet: u in o.data
      });
    }
    if (this._def.catchall instanceof rt) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const f of i)
          l.push({
            key: { status: "valid", value: f },
            value: { status: "valid", value: o.data[f] }
          });
      else if (u === "strict")
        i.length > 0 && (x(o, {
          code: y.unrecognized_keys,
          keys: i
        }), n.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const f of i) {
        const d = o.data[f];
        l.push({
          key: { status: "valid", value: f },
          value: u._parse(
            new tt(o, d, o.path, f)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: f in o.data
        });
      }
    }
    return o.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const f of l) {
        const d = await f.key, p = await f.value;
        u.push({
          key: d,
          value: p,
          alwaysSet: f.alwaysSet
        });
      }
      return u;
    }).then((u) => we.mergeObjectSync(n, u)) : we.mergeObjectSync(n, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return k.errToObj, new q({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, n) => {
          const o = this._def.errorMap?.(r, n).message ?? n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: k.errToObj(e).message ?? o
          } : {
            message: o
          };
        }
      } : {}
    });
  }
  strip() {
    return new q({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new q({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new q({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new q({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: R.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new q({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    for (const n of F.objectKeys(e))
      e[n] && this.shape[n] && (r[n] = this.shape[n]);
    return new q({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    for (const n of F.objectKeys(this.shape))
      e[n] || (r[n] = this.shape[n]);
    return new q({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return bt(this);
  }
  partial(e) {
    const r = {};
    for (const n of F.objectKeys(this.shape)) {
      const o = this.shape[n];
      e && !e[n] ? r[n] = o : r[n] = o.optional();
    }
    return new q({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    for (const n of F.objectKeys(this.shape))
      if (e && !e[n])
        r[n] = this.shape[n];
      else {
        let s = this.shape[n];
        for (; s instanceof Qe; )
          s = s._def.innerType;
        r[n] = s;
      }
    return new q({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return ua(F.objectKeys(this.shape));
  }
}
q.create = (t, e) => new q({
  shape: () => t,
  unknownKeys: "strip",
  catchall: rt.create(),
  typeName: R.ZodObject,
  ...O(e)
});
q.strictCreate = (t, e) => new q({
  shape: () => t,
  unknownKeys: "strict",
  catchall: rt.create(),
  typeName: R.ZodObject,
  ...O(e)
});
q.lazycreate = (t, e) => new q({
  shape: t,
  unknownKeys: "strip",
  catchall: rt.create(),
  typeName: R.ZodObject,
  ...O(e)
});
class Ar extends L {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.options;
    function o(s) {
      for (const i of s)
        if (i.result.status === "valid")
          return i.result;
      for (const i of s)
        if (i.result.status === "dirty")
          return r.common.issues.push(...i.ctx.common.issues), i.result;
      const c = s.map((i) => new Pe(i.ctx.common.issues));
      return x(r, {
        code: y.invalid_union,
        unionErrors: c
      }), $;
    }
    if (r.common.async)
      return Promise.all(n.map(async (s) => {
        const c = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: r.data,
            path: r.path,
            parent: c
          }),
          ctx: c
        };
      })).then(o);
    {
      let s;
      const c = [];
      for (const l of n) {
        const u = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, f = l._parseSync({
          data: r.data,
          path: r.path,
          parent: u
        });
        if (f.status === "valid")
          return f;
        f.status === "dirty" && !s && (s = { result: f, ctx: u }), u.common.issues.length && c.push(u.common.issues);
      }
      if (s)
        return r.common.issues.push(...s.ctx.common.issues), s.result;
      const i = c.map((l) => new Pe(l));
      return x(r, {
        code: y.invalid_union,
        unionErrors: i
      }), $;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ar.create = (t, e) => new Ar({
  options: t,
  typeName: R.ZodUnion,
  ...O(e)
});
function hn(t, e) {
  const r = qe(t), n = qe(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === S.object && n === S.object) {
    const o = F.objectKeys(e), s = F.objectKeys(t).filter((i) => o.indexOf(i) !== -1), c = { ...t, ...e };
    for (const i of s) {
      const l = hn(t[i], e[i]);
      if (!l.valid)
        return { valid: !1 };
      c[i] = l.data;
    }
    return { valid: !0, data: c };
  } else if (r === S.array && n === S.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const o = [];
    for (let s = 0; s < t.length; s++) {
      const c = t[s], i = e[s], l = hn(c, i);
      if (!l.valid)
        return { valid: !1 };
      o.push(l.data);
    }
    return { valid: !0, data: o };
  } else return r === S.date && n === S.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Pr extends L {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), o = (s, c) => {
      if (bo(s) || bo(c))
        return $;
      const i = hn(s.value, c.value);
      return i.valid ? ((wo(s) || wo(c)) && r.dirty(), { status: r.value, value: i.data }) : (x(n, {
        code: y.invalid_intersection_types
      }), $);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([s, c]) => o(s, c)) : o(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
Pr.create = (t, e, r) => new Pr({
  left: t,
  right: e,
  typeName: R.ZodIntersection,
  ...O(r)
});
class Ve extends L {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== S.array)
      return x(n, {
        code: y.invalid_type,
        expected: S.array,
        received: n.parsedType
      }), $;
    if (n.data.length < this._def.items.length)
      return x(n, {
        code: y.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), $;
    !this._def.rest && n.data.length > this._def.items.length && (x(n, {
      code: y.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const s = [...n.data].map((c, i) => {
      const l = this._def.items[i] || this._def.rest;
      return l ? l._parse(new tt(n, c, n.path, i)) : null;
    }).filter((c) => !!c);
    return n.common.async ? Promise.all(s).then((c) => we.mergeArray(r, c)) : we.mergeArray(r, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Ve({
      ...this._def,
      rest: e
    });
  }
}
Ve.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Ve({
    items: t,
    typeName: R.ZodTuple,
    rest: null,
    ...O(e)
  });
};
class Io extends L {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== S.map)
      return x(n, {
        code: y.invalid_type,
        expected: S.map,
        received: n.parsedType
      }), $;
    const o = this._def.keyType, s = this._def.valueType, c = [...n.data.entries()].map(([i, l], u) => ({
      key: o._parse(new tt(n, i, n.path, [u, "key"])),
      value: s._parse(new tt(n, l, n.path, [u, "value"]))
    }));
    if (n.common.async) {
      const i = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of c) {
          const u = await l.key, f = await l.value;
          if (u.status === "aborted" || f.status === "aborted")
            return $;
          (u.status === "dirty" || f.status === "dirty") && r.dirty(), i.set(u.value, f.value);
        }
        return { status: r.value, value: i };
      });
    } else {
      const i = /* @__PURE__ */ new Map();
      for (const l of c) {
        const u = l.key, f = l.value;
        if (u.status === "aborted" || f.status === "aborted")
          return $;
        (u.status === "dirty" || f.status === "dirty") && r.dirty(), i.set(u.value, f.value);
      }
      return { status: r.value, value: i };
    }
  }
}
Io.create = (t, e, r) => new Io({
  valueType: e,
  keyType: t,
  typeName: R.ZodMap,
  ...O(r)
});
class Wt extends L {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== S.set)
      return x(n, {
        code: y.invalid_type,
        expected: S.set,
        received: n.parsedType
      }), $;
    const o = this._def;
    o.minSize !== null && n.data.size < o.minSize.value && (x(n, {
      code: y.too_small,
      minimum: o.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: o.minSize.message
    }), r.dirty()), o.maxSize !== null && n.data.size > o.maxSize.value && (x(n, {
      code: y.too_big,
      maximum: o.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: o.maxSize.message
    }), r.dirty());
    const s = this._def.valueType;
    function c(l) {
      const u = /* @__PURE__ */ new Set();
      for (const f of l) {
        if (f.status === "aborted")
          return $;
        f.status === "dirty" && r.dirty(), u.add(f.value);
      }
      return { status: r.value, value: u };
    }
    const i = [...n.data.values()].map((l, u) => s._parse(new tt(n, l, n.path, u)));
    return n.common.async ? Promise.all(i).then((l) => c(l)) : c(i);
  }
  min(e, r) {
    return new Wt({
      ...this._def,
      minSize: { value: e, message: k.toString(r) }
    });
  }
  max(e, r) {
    return new Wt({
      ...this._def,
      maxSize: { value: e, message: k.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Wt.create = (t, e) => new Wt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: R.ZodSet,
  ...O(e)
});
class Gt extends L {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== S.function)
      return x(r, {
        code: y.invalid_type,
        expected: S.function,
        received: r.parsedType
      }), $;
    function n(i, l) {
      return pn({
        data: i,
        path: r.path,
        errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, fn(), Ht].filter((u) => !!u),
        issueData: {
          code: y.invalid_arguments,
          argumentsError: l
        }
      });
    }
    function o(i, l) {
      return pn({
        data: i,
        path: r.path,
        errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, fn(), Ht].filter((u) => !!u),
        issueData: {
          code: y.invalid_return_type,
          returnTypeError: l
        }
      });
    }
    const s = { errorMap: r.common.contextualErrorMap }, c = r.data;
    if (this._def.returns instanceof qt) {
      const i = this;
      return _e(async function(...l) {
        const u = new Pe([]), f = await i._def.args.parseAsync(l, s).catch((m) => {
          throw u.addIssue(n(l, m)), u;
        }), d = await Reflect.apply(c, this, f);
        return await i._def.returns._def.type.parseAsync(d, s).catch((m) => {
          throw u.addIssue(o(d, m)), u;
        });
      });
    } else {
      const i = this;
      return _e(function(...l) {
        const u = i._def.args.safeParse(l, s);
        if (!u.success)
          throw new Pe([n(l, u.error)]);
        const f = Reflect.apply(c, this, u.data), d = i._def.returns.safeParse(f, s);
        if (!d.success)
          throw new Pe([o(f, d.error)]);
        return d.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Gt({
      ...this._def,
      args: Ve.create(e).rest(kt.create())
    });
  }
  returns(e) {
    return new Gt({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, r, n) {
    return new Gt({
      args: e || Ve.create([]).rest(kt.create()),
      returns: r || kt.create(),
      typeName: R.ZodFunction,
      ...O(n)
    });
  }
}
class To extends L {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
To.create = (t, e) => new To({
  getter: t,
  typeName: R.ZodLazy,
  ...O(e)
});
class Co extends L {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return x(r, {
        received: r.data,
        code: y.invalid_literal,
        expected: this._def.value
      }), $;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Co.create = (t, e) => new Co({
  value: t,
  typeName: R.ZodLiteral,
  ...O(e)
});
function ua(t, e) {
  return new Rt({
    values: t,
    typeName: R.ZodEnum,
    ...O(e)
  });
}
class Rt extends L {
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return x(r, {
        expected: F.joinValues(n),
        received: r.parsedType,
        code: y.invalid_type
      }), $;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return x(r, {
        received: r.data,
        code: y.invalid_enum_value,
        options: n
      }), $;
    }
    return _e(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e, r = this._def) {
    return Rt.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return Rt.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
Rt.create = ua;
class $o extends L {
  _parse(e) {
    const r = F.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== S.string && n.parsedType !== S.number) {
      const o = F.objectValues(r);
      return x(n, {
        expected: F.joinValues(o),
        received: n.parsedType,
        code: y.invalid_type
      }), $;
    }
    if (this._cache || (this._cache = new Set(F.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const o = F.objectValues(r);
      return x(n, {
        received: n.data,
        code: y.invalid_enum_value,
        options: o
      }), $;
    }
    return _e(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
$o.create = (t, e) => new $o({
  values: t,
  typeName: R.ZodNativeEnum,
  ...O(e)
});
class qt extends L {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== S.promise && r.common.async === !1)
      return x(r, {
        code: y.invalid_type,
        expected: S.promise,
        received: r.parsedType
      }), $;
    const n = r.parsedType === S.promise ? r.data : Promise.resolve(r.data);
    return _e(n.then((o) => this._def.type.parseAsync(o, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
qt.create = (t, e) => new qt({
  type: t,
  typeName: R.ZodPromise,
  ...O(e)
});
class Nt extends L {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === R.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), o = this._def.effect || null, s = {
      addIssue: (c) => {
        x(n, c), c.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), o.type === "preprocess") {
      const c = o.transform(n.data, s);
      if (n.common.async)
        return Promise.resolve(c).then(async (i) => {
          if (r.value === "aborted")
            return $;
          const l = await this._def.schema._parseAsync({
            data: i,
            path: n.path,
            parent: n
          });
          return l.status === "aborted" ? $ : l.status === "dirty" || r.value === "dirty" ? zt(l.value) : l;
        });
      {
        if (r.value === "aborted")
          return $;
        const i = this._def.schema._parseSync({
          data: c,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? $ : i.status === "dirty" || r.value === "dirty" ? zt(i.value) : i;
      }
    }
    if (o.type === "refinement") {
      const c = (i) => {
        const l = o.refinement(i, s);
        if (n.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return i;
      };
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? $ : (i.status === "dirty" && r.dirty(), c(i.value), { status: r.value, value: i.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => i.status === "aborted" ? $ : (i.status === "dirty" && r.dirty(), c(i.value).then(() => ({ status: r.value, value: i.value }))));
    }
    if (o.type === "transform")
      if (n.common.async === !1) {
        const c = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!Ct(c))
          return $;
        const i = o.transform(c.value, s);
        if (i instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: i };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((c) => Ct(c) ? Promise.resolve(o.transform(c.value, s)).then((i) => ({
          status: r.value,
          value: i
        })) : $);
    F.assertNever(o);
  }
}
Nt.create = (t, e, r) => new Nt({
  schema: t,
  typeName: R.ZodEffects,
  effect: e,
  ...O(r)
});
Nt.createWithPreprocess = (t, e, r) => new Nt({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: R.ZodEffects,
  ...O(r)
});
class Qe extends L {
  _parse(e) {
    return this._getType(e) === S.undefined ? _e(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Qe.create = (t, e) => new Qe({
  innerType: t,
  typeName: R.ZodOptional,
  ...O(e)
});
class Ot extends L {
  _parse(e) {
    return this._getType(e) === S.null ? _e(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ot.create = (t, e) => new Ot({
  innerType: t,
  typeName: R.ZodNullable,
  ...O(e)
});
class gn extends L {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return r.parsedType === S.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
gn.create = (t, e) => new gn({
  innerType: t,
  typeName: R.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...O(e)
});
class yn extends L {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, o = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return Er(o) ? o.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Pe(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: o.status === "valid" ? o.value : this._def.catchValue({
        get error() {
          return new Pe(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
yn.create = (t, e) => new yn({
  innerType: t,
  typeName: R.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...O(e)
});
class Ro extends L {
  _parse(e) {
    if (this._getType(e) !== S.nan) {
      const n = this._getOrReturnCtx(e);
      return x(n, {
        code: y.invalid_type,
        expected: S.nan,
        received: n.parsedType
      }), $;
    }
    return { status: "valid", value: e.data };
  }
}
Ro.create = (t) => new Ro({
  typeName: R.ZodNaN,
  ...O(t)
});
class mu extends L {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = r.data;
    return this._def.type._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Bn extends L {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? $ : s.status === "dirty" ? (r.dirty(), zt(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const o = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return o.status === "aborted" ? $ : o.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: o.value
      }) : this._def.out._parseSync({
        data: o.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(e, r) {
    return new Bn({
      in: e,
      out: r,
      typeName: R.ZodPipeline
    });
  }
}
class _n extends L {
  _parse(e) {
    const r = this._def.innerType._parse(e), n = (o) => (Ct(o) && (o.value = Object.freeze(o.value)), o);
    return Er(r) ? r.then((o) => n(o)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
_n.create = (t, e) => new _n({
  innerType: t,
  typeName: R.ZodReadonly,
  ...O(e)
});
var R;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(R || (R = {}));
const Ke = Je.create, No = $t.create, hu = mn.create;
kt.create;
rt.create;
const gu = Fe.create, da = q.create;
Ar.create;
Pr.create;
Ve.create;
const vn = Gt.create, zn = Rt.create;
qt.create;
Qe.create;
Ot.create;
const yu = da({
  pluginId: Ke(),
  name: Ke(),
  host: Ke().url(),
  code: Ke(),
  icon: Ke().optional(),
  description: Ke().max(200).optional(),
  permissions: gu(
    zn([
      "content:read",
      "content:write",
      "library:read",
      "library:write",
      "user:read",
      "comment:read",
      "comment:write",
      "allow:downloads",
      "allow:localstorage"
    ])
  )
});
function fa(t, e) {
  return new URL(e, t).toString();
}
function _u(t) {
  return fetch(t).then((e) => e.json()).then((e) => {
    if (!yu.safeParse(e).success)
      throw new Error("Invalid plugin manifest");
    return e;
  }).catch((e) => {
    throw console.error(e), e;
  });
}
function Oo(t) {
  return !t.host && !t.code.startsWith("http") ? Promise.resolve(t.code) : fetch(fa(t.host, t.code)).then((e) => {
    if (e.ok)
      return e.text();
    throw new Error("Failed to load plugin code");
  });
}
const pa = da({
  width: No().positive(),
  height: No().positive()
}), vu = vn().args(
  Ke(),
  Ke(),
  zn(["dark", "light"]),
  pa.optional(),
  hu().optional()
).implement((t, e, r, n, o) => Bl(t, e, r, n, o));
async function bu(t, e, r, n) {
  let o = await Oo(e), s = !1, c = !1, i = null, l = [];
  const u = /* @__PURE__ */ new Set(), f = !!e.permissions.find(
    (N) => N === "allow:downloads"
  ), d = t.addListener("themechange", (N) => {
    i?.setTheme(N);
  }), p = t.addListener("finish", () => {
    w(), t?.removeListener(p);
  });
  let m = [];
  const g = () => {
    M(d), m.forEach((N) => {
      M(N);
    }), l = [], m = [];
  }, w = () => {
    g(), u.forEach(clearTimeout), u.clear(), i && (i.removeEventListener("close", w), i.remove(), i = null), c = !0, r();
  }, h = async () => {
    if (!s) {
      s = !0;
      return;
    }
    g(), o = await Oo(e), n(o);
  }, _ = (N, U, H) => {
    const X = t.theme, G = fa(e.host, U);
    i?.getAttribute("iframe-src") !== G && (i = vu(N, G, X, H, f), i.setTheme(X), i.addEventListener("close", w, {
      once: !0
    }), i.addEventListener("load", h));
  }, E = (N) => {
    l.push(N);
  }, T = (N, U, H) => {
    const X = t.addListener(
      N,
      (...G) => {
        c || U(...G);
      },
      H
    );
    return m.push(X), X;
  }, M = (N) => {
    t.removeListener(N);
  };
  return {
    close: w,
    destroyListener: M,
    openModal: _,
    resizeModal: (N, U) => {
      pa.parse({ width: N, height: U }), i && i.resize(N, U);
    },
    getModal: () => i,
    registerListener: T,
    registerMessageCallback: E,
    sendMessage: (N) => {
      l.forEach((U) => U(N));
    },
    get manifest() {
      return e;
    },
    get context() {
      return t;
    },
    get timeouts() {
      return u;
    },
    get code() {
      return o;
    }
  };
}
const wu = [
  "finish",
  "pagechange",
  "filechange",
  "selectionchange",
  "themechange",
  "shapechange",
  "contentsave"
];
function xu(t) {
  const e = (n) => {
    if (!t.manifest.permissions.includes(n))
      throw new Error(`Permission ${n} is not granted`);
  };
  return {
    penpot: {
      ui: {
        open: (n, o, s) => {
          t.openModal(n, o, s);
        },
        get size() {
          return t.getModal()?.size() || null;
        },
        resize: (n, o) => t.resizeModal(n, o),
        sendMessage(n) {
          let o;
          try {
            o = structuredClone(n);
          } catch (c) {
            console.error(
              "plugin sendMessage: the message could not be cloned. Ensure the message does not contain functions, DOM nodes, or other non-serializable values.",
              c
            );
            return;
          }
          const s = new CustomEvent("message", {
            detail: o
          });
          t.getModal()?.dispatchEvent(s);
        },
        onMessage: (n) => {
          vn().parse(n), t.registerMessageCallback(n);
        }
      },
      utils: {
        geometry: {
          center(n) {
            return window.app.plugins.public_utils.centerShapes(n);
          }
        },
        types: {
          isBoard(n) {
            return n.type === "board";
          },
          isGroup(n) {
            return n.type === "group";
          },
          isMask(n) {
            return n.type === "group" && n.isMask();
          },
          isBool(n) {
            return n.type === "boolean";
          },
          isRectangle(n) {
            return n.type === "rectangle";
          },
          isPath(n) {
            return n.type === "path";
          },
          isText(n) {
            return n.type === "text";
          },
          isEllipse(n) {
            return n.type === "ellipse";
          },
          isSVG(n) {
            return n.type === "svg-raw";
          },
          isVariantContainer(n) {
            return n.type === "board" && n.isVariantContainer();
          },
          isVariantComponent(n) {
            return n.isVariant();
          }
        }
      },
      closePlugin: () => {
        t.close();
      },
      on(n, o, s) {
        return zn(wu).parse(n), vn().parse(o), e("content:read"), t.registerListener(n, o, s);
      },
      off(n) {
        t.destroyListener(n);
      },
      // Penpot State API
      get root() {
        return e("content:read"), t.context.root;
      },
      get currentFile() {
        return e("content:read"), t.context.currentFile;
      },
      get currentPage() {
        return e("content:read"), t.context.currentPage;
      },
      get selection() {
        return e("content:read"), t.context.selection;
      },
      set selection(n) {
        e("content:read"), t.context.selection = n;
      },
      get viewport() {
        return t.context.viewport;
      },
      get history() {
        return t.context.history;
      },
      get library() {
        return e("library:read"), t.context.library;
      },
      get fonts() {
        return e("content:read"), t.context.fonts;
      },
      get flags() {
        return t.context.flags;
      },
      get currentUser() {
        return e("user:read"), t.context.currentUser;
      },
      get activeUsers() {
        return e("user:read"), t.context.activeUsers;
      },
      shapesColors(n) {
        return e("content:read"), t.context.shapesColors(n);
      },
      replaceColor(n, o, s) {
        return e("content:write"), t.context.replaceColor(n, o, s);
      },
      get theme() {
        return t.context.theme;
      },
      get localStorage() {
        return e("allow:localstorage"), t.context.localStorage;
      },
      createBoard() {
        return e("content:write"), t.context.createBoard();
      },
      createRectangle() {
        return e("content:write"), t.context.createRectangle();
      },
      createEllipse() {
        return e("content:write"), t.context.createEllipse();
      },
      createText(n) {
        return e("content:write"), t.context.createText(n);
      },
      createPath() {
        return e("content:write"), t.context.createPath();
      },
      createBoolean(n, o) {
        return e("content:write"), t.context.createBoolean(n, o);
      },
      createShapeFromSvg(n) {
        return e("content:write"), t.context.createShapeFromSvg(n);
      },
      createShapeFromSvgWithImages(n) {
        return e("content:write"), t.context.createShapeFromSvgWithImages(n);
      },
      group(n) {
        return e("content:write"), t.context.group(n);
      },
      ungroup(n, ...o) {
        e("content:write"), t.context.ungroup(n, ...o);
      },
      uploadMediaUrl(n, o) {
        return e("content:write"), t.context.uploadMediaUrl(n, o);
      },
      uploadMediaData(n, o, s) {
        return e("content:write"), t.context.uploadMediaData(n, o, s);
      },
      generateMarkup(n, o) {
        return e("content:read"), t.context.generateMarkup(n, o);
      },
      generateStyle(n, o) {
        return e("content:read"), t.context.generateStyle(n, o);
      },
      generateFontFaces(n) {
        return e("content:read"), t.context.generateFontFaces(n);
      },
      openViewer() {
        e("content:read"), t.context.openViewer();
      },
      createPage() {
        return e("content:write"), t.context.createPage();
      },
      openPage(n, o) {
        e("content:read"), t.context.openPage(n, o ?? !1);
      },
      alignHorizontal(n, o) {
        e("content:write"), t.context.alignHorizontal(n, o);
      },
      alignVertical(n, o) {
        e("content:write"), t.context.alignVertical(n, o);
      },
      distributeHorizontal(n) {
        e("content:write"), t.context.distributeHorizontal(n);
      },
      distributeVertical(n) {
        e("content:write"), t.context.distributeVertical(n);
      },
      flatten(n) {
        return e("content:write"), t.context.flatten(n);
      }
    }
  };
}
let Mo = !1;
const P = {
  hardenIntrinsics: () => {
    Mo || (Mo = !0, hardenIntrinsics());
  },
  createCompartment: (t) => new Compartment(t),
  harden: (t) => harden(t),
  safeReturn(t) {
    return t == null ? t : harden(t);
  }
};
function Su(t) {
  P.hardenIntrinsics();
  const e = xu(t), r = {
    get(i, l, u) {
      const f = Reflect.get(i, l, u);
      return typeof f == "function" ? function(...d) {
        const p = f.apply(i, d);
        return P.safeReturn(p);
      } : P.safeReturn(f);
    }
  }, n = new Proxy(e.penpot, r), o = (i, l) => {
    const u = {
      ...l,
      credentials: "omit",
      headers: {
        ...l?.headers,
        Authorization: ""
      }
    };
    return fetch(i, u).then((f) => {
      const d = {
        ok: f.ok,
        status: f.status,
        statusText: f.statusText,
        url: f.url,
        text: f.text.bind(f),
        json: f.json.bind(f)
      };
      return P.safeReturn(d);
    });
  }, s = {
    penpot: n,
    fetch: P.harden(o),
    setTimeout: P.harden(
      (...[i, l]) => {
        const u = setTimeout(() => {
          i();
        }, l);
        return t.timeouts.add(u), P.safeReturn(u);
      }
    ),
    clearTimeout: P.harden((i) => {
      clearTimeout(i), t.timeouts.delete(i);
    }),
    /**
     * GLOBAL FUNCTIONS ACCESIBLE TO PLUGINS
     **/
    isFinite: P.harden(isFinite),
    isNaN: P.harden(isNaN),
    parseFloat: P.harden(parseFloat),
    parseInt: P.harden(parseInt),
    decodeURI: P.harden(decodeURI),
    decodeURIComponent: P.harden(decodeURIComponent),
    encodeURI: P.harden(encodeURI),
    encodeURIComponent: P.harden(encodeURIComponent),
    Object: P.harden(Object),
    Boolean: P.harden(Boolean),
    Symbol: P.harden(Symbol),
    Number: P.harden(Number),
    BigInt: P.harden(BigInt),
    Math: P.harden(Math),
    Date: P.harden(Date),
    String: P.harden(String),
    RegExp: P.harden(RegExp),
    Array: P.harden(Array),
    Int8Array: P.harden(Int8Array),
    Uint8Array: P.harden(Uint8Array),
    Uint8ClampedArray: P.harden(Uint8ClampedArray),
    Int16Array: P.harden(Int16Array),
    Uint16Array: P.harden(Uint16Array),
    Int32Array: P.harden(Int32Array),
    Uint32Array: P.harden(Uint32Array),
    BigInt64Array: P.harden(BigInt64Array),
    BigUint64Array: P.harden(BigUint64Array),
    Float32Array: P.harden(Float32Array),
    Float64Array: P.harden(Float64Array),
    Map: P.harden(Map),
    Set: P.harden(Set),
    WeakMap: P.harden(WeakMap),
    WeakSet: P.harden(WeakSet),
    ArrayBuffer: P.harden(ArrayBuffer),
    DataView: P.harden(DataView),
    Atomics: P.harden(Atomics),
    JSON: P.harden(JSON),
    Promise: P.harden(Promise),
    Proxy: P.harden(Proxy),
    Intl: P.harden(Intl),
    // Window properties
    console: P.harden(window.console),
    devicePixelRatio: window.devicePixelRatio,
    atob: P.harden(window.atob.bind(null)),
    btoa: P.harden(window.btoa.bind(null)),
    structuredClone: P.harden(window.structuredClone)
  }, c = P.createCompartment(s);
  return {
    evaluate: () => {
      c.evaluate(t.code);
    },
    cleanGlobalThis: () => {
      Object.keys(s).forEach((i) => {
        delete c.globalThis[i];
      });
    },
    compartment: c
  };
}
async function Eu(t, e, r) {
  const n = async () => {
    try {
      s.evaluate();
    } catch (c) {
      console.error(c), o.close();
    }
  }, o = await bu(
    t,
    e,
    function() {
      s.cleanGlobalThis(), r();
    },
    function() {
      n();
    }
  ), s = Su(o);
  return n(), {
    plugin: o,
    manifest: e,
    compartment: s
  };
}
let ht = [], bn = null;
function ku(t) {
  bn = t;
}
const Lo = () => {
  ht.forEach((t) => {
    t.plugin.close();
  }), ht = [];
};
window.addEventListener("message", (t) => {
  try {
    for (const e of ht)
      e.plugin.sendMessage(t.data);
  } catch (e) {
    console.error(e);
  }
});
const Au = async function(t, e) {
  try {
    const r = bn && bn(t.pluginId);
    if (!r)
      return;
    Lo();
    const n = await Eu(
      P.harden(r),
      t,
      () => {
        ht = ht.filter((o) => o !== n), e && e();
      }
    );
    ht.push(n);
  } catch (r) {
    Lo(), console.error(r);
  }
}, ma = async function(t, e) {
  Au(t, e);
}, Pu = async function(t) {
  const e = await _u(t);
  ma(e);
}, Iu = function(t) {
  const e = ht.find((r) => r.manifest.pluginId === t);
  e && e.plugin.close();
};
console.log("%c[PLUGINS] Loading plugin system", "color: #008d7c");
repairIntrinsics({
  evalTaming: "unsafeEval",
  stackFiltering: "verbose",
  errorTaming: "unsafe",
  consoleTaming: "unsafe",
  errorTrapping: "none",
  unhandledRejectionTrapping: "none"
});
const Tu = globalThis, Ru = (t) => {
  try {
    console.log("%c[PLUGINS] Initialize runtime", "color: #008d7c"), ku(t), Tu.ɵcontext = t(
      "00000000-0000-0000-0000-000000000000"
    ), globalThis.ɵloadPlugin = ma, globalThis.ɵloadPluginByUrl = Pu, globalThis.ɵunloadPlugin = Iu;
  } catch (e) {
    console.error(e);
  }
};
export {
  Ru as initPluginsRuntime
};
//# sourceMappingURL=index.js.map

import e, { createContext as t, forwardRef as n, useCallback as r, useContext as i, useEffect as a, useMemo as o, useReducer as s, useRef as c, useState as l } from "react";
import u, { flushSync as d } from "react-dom";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/chain.mjs
function m(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useLayoutEffect.mjs
var h = typeof document < "u" ? e.useLayoutEffect : () => {}, g = {
	prefix: String(Math.round(Math.random() * 1e10)),
	current: 0
}, ee = /*#__PURE__*/ e.createContext(g), te = /*#__PURE__*/ e.createContext(!1), ne = !!(typeof window < "u" && window.document && window.document.createElement), re = /* @__PURE__ */ new WeakMap();
function ie(t = !1) {
	let n = i(ee), r = c(null);
	if (r.current === null && !t) {
		let t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;
		if (t) {
			let e = re.get(t);
			e == null ? re.set(t, {
				id: n.current,
				state: t.memoizedState
			}) : t.memoizedState !== e.state && (n.current = e.id, re.delete(t));
		}
		r.current = ++n.current;
	}
	return r.current;
}
function ae(e) {
	let t = i(ee);
	t === g && !ne && process.env.NODE_ENV !== "production" && console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
	let n = ie(!!e), r = t === g && process.env.NODE_ENV === "test" ? "react-aria" : `react-aria${t.prefix}`;
	return e || `${r}-${n}`;
}
function oe(t) {
	let n = e.useId(), [r] = l(_()), i = r || process.env.NODE_ENV === "test" ? "react-aria" : `react-aria${g.prefix}`;
	return t || `${i}-${n}`;
}
var se = typeof e.useId == "function" ? oe : ae;
function ce() {
	return !1;
}
function le() {
	return !0;
}
function ue(e) {
	return () => {};
}
function _() {
	return typeof e.useSyncExternalStore == "function" ? e.useSyncExternalStore(ue, ce, le) : i(te);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useValueEffect.mjs
function de(e) {
	let [t, n] = l(e), i = c(t), a = c(null), o = c(() => {
		if (!a.current) return;
		let e = a.current.next();
		if (e.done) {
			a.current = null;
			return;
		}
		i.current === e.value ? o.current() : n(e.value);
	});
	return h(() => {
		i.current = t, a.current && o.current();
	}), [t, r((e) => {
		a.current = e(i.current), o.current();
	}, [o])];
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useId.mjs
var fe = !!(typeof window < "u" && window.document && window.document.createElement), v = /* @__PURE__ */ new Map(), y;
typeof FinalizationRegistry < "u" && (y = new FinalizationRegistry((e) => {
	v.delete(e);
}));
var pe = /* @__PURE__ */ new WeakMap();
function me(e) {
	let [t, n] = l(e), r = c(null), i = se(t), o = c(null), s = pe.get(o);
	if (y && s !== i && (s != null && y.unregister(o), y.register(o, i, o), pe.set(o, i)), fe) {
		let e = v.get(i);
		e && !e.includes(r) ? e.push(r) : v.set(i, [r]);
	}
	return h(() => {
		let e = i;
		return () => {
			y && (y.unregister(o), pe.delete(o)), v.delete(e);
		};
	}, [i]), a(() => {
		let e = r.current;
		return e && n(e), () => {
			e && (r.current = null);
		};
	}), i;
}
function he(e, t) {
	if (e === t) return e;
	let n = v.get(e);
	if (n) return n.forEach((e) => e.current = t), t;
	let r = v.get(t);
	return r ? (r.forEach((t) => t.current = e), e) : t;
}
function ge(e = []) {
	let t = me(), [n, i] = de(t), a = r(() => {
		i(function* () {
			yield t, yield document.getElementById(t) ? t : void 0;
		});
	}, [t, i]);
	return h(a, [
		t,
		a,
		...e
	]), n;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/mergeRefs.mjs
function _e(...e) {
	return e.length === 1 && e[0] ? e[0] : (t) => {
		let n = !1, r = e.map((e) => {
			let r = ve(e, t);
			return n ||= typeof r == "function", r;
		});
		if (n) return () => {
			r.forEach((t, n) => {
				typeof t == "function" ? t() : ve(e[n], null);
			});
		};
	};
}
function ve(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
//#endregion
//#region ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function ye(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = ye(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function be() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ye(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/mergeProps.mjs
function b(...e) {
	let t = { ...e[0] };
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		for (let e in r) {
			let n = t[e], i = r[e];
			typeof n == "function" && typeof i == "function" && e[0] === "o" && e[1] === "n" && e.charCodeAt(2) >= 65 && e.charCodeAt(2) <= 90 ? t[e] = m(n, i) : (e === "className" || e === "UNSAFE_className") && typeof n == "string" && typeof i == "string" ? t[e] = be(n, i) : e === "id" && n && i ? t.id = he(n, i) : e === "ref" && n && i ? t.ref = _e(n, i) : t[e] = i === void 0 ? n : i;
		}
	}
	return t;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useObjectRef.mjs
function xe(e) {
	let t = c(null), n = c(void 0), i = r((t) => {
		if (typeof e == "function") {
			let n = e, r = n(t);
			return () => {
				typeof r == "function" ? r() : n(null);
			};
		}
		if (e) return e.current = t, () => {
			e.current = null;
		};
	}, [e]);
	return o(() => ({
		get current() {
			return t.current;
		},
		set current(e) {
			t.current = e, n.current &&= (n.current(), void 0), e != null && (n.current = i(e));
		}
	}), [i]);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria-components@1.20.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria-components/dist/private/utils.mjs
var Se = Symbol("default");
function Ce({ values: t, children: n }) {
	for (let [r, i] of t) n = /*#__PURE__*/ e.createElement(r.Provider, { value: i }, n);
	return n;
}
function we(e) {
	let { className: t, style: n, children: r, defaultClassName: i, defaultChildren: a, defaultStyle: s, values: c, render: l } = e;
	return o(() => {
		let e, o, u;
		return e = typeof t == "function" ? t({
			...c,
			defaultClassName: i
		}) : t, o = typeof n == "function" ? n({
			...c,
			defaultStyle: s || {}
		}) : n, u = typeof r == "function" ? r({
			...c,
			defaultChildren: a
		}) : r ?? a, {
			className: e ?? i,
			style: o || s ? {
				...s,
				...o
			} : void 0,
			children: u ?? a,
			"data-rac": "",
			render: l ? (e) => l(e, c) : void 0
		};
	}, [
		t,
		n,
		r,
		i,
		a,
		s,
		c,
		l
	]);
}
function Te(e, t) {
	let n = i(e);
	if (t === null) return null;
	if (n && typeof n == "object" && "slots" in n && n.slots) {
		let e = t || Se;
		if (!n.slots[e]) {
			let e = new Intl.ListFormat().format(Object.keys(n.slots).map((e) => `"${e}"`)), r = t ? `Invalid slot "${t}".` : "A slot prop is required.";
			throw Error(`${r} Valid slot names are ${e}.`);
		}
		return n.slots[e];
	}
	return n;
}
function Ee(e, t, n) {
	let { ref: r, ...i } = Te(n, e.slot) || {}, a = xe(o(() => _e(t, r), [t, r])), s = b(i, e);
	return "style" in i && i.style && "style" in e && e.style && (s.style = typeof i.style == "function" || typeof e.style == "function" ? (t) => {
		let n = typeof i.style == "function" ? i.style(t) : i.style, r = {
			...t.defaultStyle,
			...n
		}, a = typeof e.style == "function" ? e.style({
			...t,
			defaultStyle: r
		}) : e.style;
		return {
			...r,
			...a
		};
	} : {
		...i.style,
		...e.style
	}), [s, a];
}
function De(t, n, r) {
	let { render: i, ...a } = n, s = c(null), l = o(() => _e(r, s), [r, s]);
	h(() => {
		process.env.NODE_ENV !== "production" && i && (s.current ? s.current.localName !== t && console.warn(`Unexpected DOM element returned by custom \`render\` function. Expected <${t}>, got <${s.current.localName}>. This may break the component behavior and accessibility.`) : console.warn("Ref was not connected to DOM element returned by custom `render` function. Did you forget to pass through or merge the `ref`?"));
	}, [t, i]);
	let u = {
		...a,
		ref: l
	};
	return i ? i(u, void 0) : /*#__PURE__*/ e.createElement(t, u);
}
var Oe = {}, ke = new Proxy({}, { get(e, t) {
	if (typeof t != "string") return;
	let r = Oe[t];
	return r || (r = /*#__PURE__*/ n(De.bind(null, t)), Oe[t] = r), r;
} }), x = (e) => je(e) ? e.document : Me(e) ? e : e?.ownerDocument ?? (typeof document < "u" ? document : void 0), S = (e) => x(e)?.defaultView ?? (typeof window < "u" ? window : void 0);
function Ae(e) {
	return typeof e == "object" && !!e && "nodeType" in e && typeof e.nodeType == "number";
}
function je(e) {
	return typeof e == "object" && !!e && "window" in e && e.window === e;
}
function Me(e) {
	return Ae(e) && e.nodeType === 9;
}
function Ne(e) {
	return Ae(e) && e.nodeType === 11 && "host" in e;
}
//#endregion
//#region ../../node_modules/.pnpm/react-stately@3.49.0_react@19.2.8/node_modules/react-stately/dist/private/flags/flags.mjs
var Pe = !1;
function C() {
	return Pe;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/shadowdom/DOMFunctions.mjs
function w(e, t) {
	if (!C()) return t && e ? e.contains(t) : !1;
	if (!e || !t) return !1;
	let n = t;
	for (; n !== null;) {
		if (n === e) return !0;
		n = typeof n.assignedElements != "function" && n.assignedSlot?.parentNode ? n.assignedSlot.parentNode : Ne(n) ? n.host : n.parentNode;
	}
	return !1;
}
var T = (e = document) => {
	if (!C()) return e.activeElement;
	let t = e.activeElement;
	for (; t && "shadowRoot" in t && t.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
	return t;
};
function E(e) {
	if (C() && e.target instanceof Element && e.target.shadowRoot) {
		if ("composedPath" in e) return e.composedPath()[0] ?? null;
		if ("composedPath" in e.nativeEvent) return e.nativeEvent.composedPath()[0] ?? null;
	}
	return e.target;
}
function Fe(e) {
	if (!e) return !1;
	let t = e.getRootNode(), n = S(e);
	if (!(t instanceof n.Document || t instanceof n.ShadowRoot)) return !1;
	let r = t.activeElement;
	return r != null && e.contains(r);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/focusWithoutScrolling.mjs
function Ie(e) {
	if (Re()) e.focus({ preventScroll: !0 });
	else {
		let t = ze(e);
		e.focus(), Be(t);
	}
}
var Le = null;
function Re() {
	if (Le == null) {
		Le = !1;
		try {
			document.createElement("div").focus({ get preventScroll() {
				return Le = !0, !0;
			} });
		} catch {}
	}
	return Le;
}
function ze(e) {
	let t = e.parentNode, n = [], r = document.scrollingElement || document.documentElement;
	for (; t instanceof HTMLElement && t !== r;) (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && n.push({
		element: t,
		scrollTop: t.scrollTop,
		scrollLeft: t.scrollLeft
	}), t = t.parentNode;
	return r instanceof HTMLElement && n.push({
		element: r,
		scrollTop: r.scrollTop,
		scrollLeft: r.scrollLeft
	}), n;
}
function Be(e) {
	for (let { element: t, scrollTop: n, scrollLeft: r } of e) t.scrollTop = n, t.scrollLeft = r;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/isElementVisible.mjs
var Ve = typeof Element < "u" && "checkVisibility" in Element.prototype;
function He(e) {
	let t = S(e);
	if (!(e instanceof t.HTMLElement) && !(e instanceof t.SVGElement)) return !1;
	let { display: n, visibility: r } = e.style, i = n !== "none" && r !== "hidden" && r !== "collapse";
	if (i) {
		let { getComputedStyle: t } = S(e), { display: n, visibility: r } = t(e);
		i = n !== "none" && r !== "hidden" && r !== "collapse";
	}
	return i;
}
function Ue(e, t) {
	return !e.hasAttribute("hidden") && !e.hasAttribute("data-react-aria-prevent-focus") && (e.nodeName === "DETAILS" && t && t.nodeName !== "SUMMARY" ? e.hasAttribute("open") : !0);
}
function We(e, t) {
	return Ve ? e.checkVisibility({ visibilityProperty: !0 }) && !e.closest("[data-react-aria-prevent-focus]") : e.nodeName !== "#comment" && He(e) && Ue(e, t) && (!e.parentElement || We(e.parentElement, e));
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/isFocusable.mjs
var Ge = [
	"input:not([disabled]):not([type=hidden])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"a[href]",
	"area[href]",
	"summary",
	"iframe",
	"object",
	"embed",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable^=\"false\"])",
	"permission"
], Ke = Ge.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
Ge.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");
var qe = Ge.join(":not([hidden]):not([tabindex=\"-1\"]),");
function Je(e, t) {
	return e.matches(Ke) && !Xe(e) && (t?.skipVisibilityCheck || We(e));
}
function Ye(e) {
	return e.matches(qe) && We(e) && !Xe(e);
}
function Xe(e) {
	let t = e;
	for (; t != null;) {
		if (t instanceof S(t).HTMLElement && t.inert) return !0;
		t = t.parentElement;
	}
	return !1;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/utils.mjs
function Ze(e) {
	let t = e;
	return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {}, t;
}
function Qe(e, t) {
	Object.defineProperty(e, "target", { value: t }), Object.defineProperty(e, "currentTarget", { value: t });
}
function $e(e) {
	let t = c({
		isFocused: !1,
		observer: null
	});
	return h(() => {
		let e = t.current;
		return () => {
			e.observer &&= (e.observer.disconnect(), null);
		};
	}, []), r((n) => {
		let r = E(n);
		if (r instanceof HTMLButtonElement || r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement || r instanceof HTMLSelectElement) {
			t.current.isFocused = !0;
			let n = r;
			n.addEventListener("focusout", (r) => {
				if (t.current.isFocused = !1, n.disabled) {
					let t = Ze(r);
					e?.(t);
				}
				t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
			}, { once: !0 }), t.current.observer = new MutationObserver(() => {
				if (t.current.isFocused && n.disabled) {
					t.current.observer?.disconnect();
					let e = n === T() ? null : T();
					n.dispatchEvent(new FocusEvent("blur", { relatedTarget: e })), n.dispatchEvent(new FocusEvent("focusout", {
						bubbles: !0,
						relatedTarget: e
					}));
				}
			}), t.current.observer.observe(n, {
				attributes: !0,
				attributeFilter: ["disabled"]
			});
		}
	}, [e]);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/platform.mjs
function et(e) {
	if (typeof window > "u" || window.navigator == null) return !1;
	let t = window.navigator.userAgentData?.brands;
	return Array.isArray(t) && t.some((t) => e.test(t.brand)) || e.test(window.navigator.userAgent);
}
function tt(e) {
	return typeof window < "u" && window.navigator != null && e.test(window.navigator.userAgentData?.platform || window.navigator.platform);
}
function D(e) {
	if (process.env.NODE_ENV === "test") return e;
	let t = null;
	return () => (t ??= e(), t);
}
var O = D(function() {
	return tt(/^Mac/i);
}), nt = D(function() {
	return tt(/^iPhone/i);
}), rt = D(function() {
	return tt(/^iPad/i) || O() && navigator.maxTouchPoints > 1;
}), k = D(function() {
	return nt() || rt();
});
D(function() {
	return O() || k();
});
var A = D(function() {
	return et(/AppleWebKit/i) && (k() || !it());
});
D(function() {
	return A() && !it() && !ot();
});
var it = D(function() {
	return et(/Chrome|CriOS|CrMo/i);
}), at = D(function() {
	return et(/Android/i);
}), ot = D(function() {
	return et(/(Firefox|FxiOS)/i);
});
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/isVirtualEvent.mjs
function st(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : at() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/openLink.mjs
function j(e, t, n = !0) {
	let { metaKey: r, ctrlKey: i, altKey: a, shiftKey: o } = t;
	!A() && ot() && window.event?.type?.startsWith("key") && e.target === "_blank" && (O() ? r = !0 : i = !0);
	let s = A() && O() && !rt() && process.env.NODE_ENV !== "test" ? new KeyboardEvent("keydown", {
		keyIdentifier: "Enter",
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o
	}) : new MouseEvent("click", {
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o,
		detail: 1,
		bubbles: !0,
		cancelable: !0
	});
	j.isOpening = n, Ie(e), e.dispatchEvent(s), j.isOpening = !1;
}
j.isOpening = !1;
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/useFocusVisible.mjs
var M = null, ct = /* @__PURE__ */ new Set(), N = /* @__PURE__ */ new Map(), P = !1, lt = !1;
function ut(e, t) {
	for (let n of ct) n(e, t);
}
function dt(e) {
	return !(e.metaKey || !O() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function ft(e) {
	P = !0, !j.isOpening && dt(e) && (M = "keyboard", ut("keyboard", e));
}
function F(e) {
	M = "pointer", "pointerType" in e && e.pointerType, (e.type === "mousedown" || e.type === "pointerdown") && (P = !0, ut("pointer", e));
}
function pt(e) {
	!j.isOpening && st(e) && (P = !0, M = "virtual");
}
function mt(e) {
	let t = S(E(e)), n = x(E(e));
	E(e) === t || E(e) === n || !e.isTrusted || (!P && !lt && (M = "virtual", ut("virtual", e)), P = !1, lt = !1);
}
function ht() {
	P = !1, lt = !0;
}
function gt(e) {
	if (typeof window > "u" || typeof document > "u") return;
	let t = S(e), n = x(e);
	if (N.get(t)) return;
	let r = t.HTMLElement.prototype.focus;
	Reflect.defineProperty(t.HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: function() {
			P = !0, r.apply(this, arguments);
		}
	}), n.addEventListener("keydown", ft, !0), n.addEventListener("keyup", ft, !0), n.addEventListener("click", pt, !0), t.addEventListener("focus", mt, !0), t.addEventListener("blur", ht, !1), typeof PointerEvent < "u" ? (n.addEventListener("pointerdown", F, !0), n.addEventListener("pointermove", F, !0), n.addEventListener("pointerup", F, !0)) : process.env.NODE_ENV === "test" && (n.addEventListener("mousedown", F, !0), n.addEventListener("mousemove", F, !0), n.addEventListener("mouseup", F, !0)), t.addEventListener("beforeunload", () => {
		_t(e);
	}, { once: !0 }), N.set(t, { focus: r });
}
var _t = (e, t) => {
	let n = S(e), r = x(e);
	t && r.removeEventListener("DOMContentLoaded", t), N.has(n) && (Reflect.defineProperty(n.HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: N.get(n).focus
	}), r.removeEventListener("keydown", ft, !0), r.removeEventListener("keyup", ft, !0), r.removeEventListener("click", pt, !0), n.removeEventListener("focus", mt, !0), n.removeEventListener("blur", ht, !1), typeof PointerEvent < "u" ? (r.removeEventListener("pointerdown", F, !0), r.removeEventListener("pointermove", F, !0), r.removeEventListener("pointerup", F, !0)) : process.env.NODE_ENV === "test" && (r.removeEventListener("mousedown", F, !0), r.removeEventListener("mousemove", F, !0), r.removeEventListener("mouseup", F, !0)), N.delete(n));
};
function vt(e) {
	let t = x(e), n;
	return t.readyState === "loading" ? (n = () => {
		gt(e);
	}, t.addEventListener("DOMContentLoaded", n)) : gt(e), () => _t(e, n);
}
typeof document < "u" && vt();
function yt() {
	return M;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/keyboard.mjs
var bt = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function I(e) {
	return e instanceof HTMLInputElement && !bt.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useEffectEvent.mjs
var xt = e.useInsertionEffect ?? h;
function St(e) {
	let t = c(null);
	return xt(() => {
		t.current = e;
	}, [e]), r((...e) => {
		let n = t.current;
		return n?.(...e);
	}, []);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useLabels.mjs
function Ct(e, t) {
	let { id: n, "aria-label": r, "aria-labelledby": i } = e;
	return n = me(n), i && r ? i = [.../* @__PURE__ */ new Set([n, ...i.trim().split(/\s+/)])].join(" ") : i &&= i.trim().split(/\s+/).join(" "), !r && !i && t && (r = t), {
		id: n,
		"aria-label": r,
		"aria-labelledby": i
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/i18n/utils.mjs
var wt = /* @__PURE__ */ new Set([
	"Arab",
	"Syrc",
	"Samr",
	"Mand",
	"Thaa",
	"Mend",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Hebr"
]), Tt = /* @__PURE__ */ new Set([
	"ae",
	"ar",
	"arc",
	"bcc",
	"bqi",
	"ckb",
	"dv",
	"fa",
	"glk",
	"he",
	"ku",
	"mzn",
	"nqo",
	"pnb",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function Et(e) {
	if (Intl.Locale) {
		let t = new Intl.Locale(e).maximize(), n = typeof t.getTextInfo == "function" ? t.getTextInfo() : t.textInfo;
		if (n) return n.direction === "rtl";
		if (t.script) return wt.has(t.script);
	}
	let t = e.split("-")[0];
	return Tt.has(t);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/i18n/useDefaultLocale.mjs
var Dt = Symbol.for("react-aria.i18n.locale");
function Ot() {
	let e = typeof window < "u" && window[Dt] || typeof navigator < "u" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([e]);
	} catch {
		e = "en-US";
	}
	return {
		locale: e,
		direction: Et(e) ? "rtl" : "ltr"
	};
}
var kt = Ot(), L = /* @__PURE__ */ new Set();
function At() {
	kt = Ot();
	for (let e of L) e(kt);
}
function jt() {
	let e = _(), [t, n] = l(kt);
	return a(() => (L.size === 0 && window.addEventListener("languagechange", At), L.add(n), () => {
		L.delete(n), L.size === 0 && window.removeEventListener("languagechange", At);
	}), []), e ? {
		locale: typeof window < "u" && window[Dt] || "en-US",
		direction: "ltr"
	} : t;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/i18n/I18nProvider.mjs
var Mt = /*#__PURE__*/ e.createContext(null);
function Nt() {
	let e = jt();
	return i(Mt) || e;
}
//#endregion
//#region ../../node_modules/.pnpm/@internationalized+string@3.2.10/node_modules/@internationalized/string/dist/private/LocalizedStringDictionary.mjs
var Pt = Symbol.for("react-aria.i18n.locale"), Ft = Symbol.for("react-aria.i18n.strings"), It = void 0, Lt = class e {
	constructor(e, t = "en-US") {
		this.strings = Object.fromEntries(Object.entries(e).filter(([, e]) => e)), this.defaultLocale = t;
	}
	getStringForLocale(e, t) {
		let n = this.getStringsForLocale(t)[e];
		if (!n) throw Error(`Could not find intl message ${e} in ${t} locale`);
		return n;
	}
	getStringsForLocale(e) {
		let t = this.strings[e];
		return t || (t = Rt(e, this.strings, this.defaultLocale), this.strings[e] = t), t;
	}
	static getGlobalDictionaryForPackage(t) {
		if (typeof window > "u") return null;
		let n = window[Pt];
		if (It === void 0) {
			let t = window[Ft];
			if (!t) return null;
			It = {};
			for (let r in t) It[r] = new e({ [n]: t[r] }, n);
		}
		let r = It?.[t];
		if (!r) throw Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
		return r;
	}
};
function Rt(e, t, n = "en-US") {
	if (t[e]) return t[e];
	let r = zt(e), i = Bt(e);
	if (i && t[`${r}-${i}`]) return t[`${r}-${i}`];
	if (t[r]) return t[r];
	for (let e in t) if (e.startsWith(r + "-")) return t[e];
	return t[n];
}
function zt(e) {
	return Intl.Locale ? new Intl.Locale(e).language : e.split("-")[0];
}
function Bt(e) {
	if (Intl.Locale) return new Intl.Locale(e).script;
}
//#endregion
//#region ../../node_modules/.pnpm/@internationalized+string@3.2.10/node_modules/@internationalized/string/dist/private/LocalizedStringFormatter.mjs
var Vt = /* @__PURE__ */ new Map(), Ht = /* @__PURE__ */ new Map(), Ut = class {
	constructor(e, t) {
		this.locale = e, this.strings = t;
	}
	format(e, t) {
		let n = this.strings.getStringForLocale(e, this.locale);
		return typeof n == "function" ? n(t, this) : n;
	}
	plural(e, t, n = "cardinal") {
		let r = t["=" + e];
		if (r) return typeof r == "function" ? r() : r;
		let i = this.locale + ":" + n, a = Vt.get(i);
		return a || (a = new Intl.PluralRules(this.locale, { type: n }), Vt.set(i, a)), r = t[a.select(e)] || t.other, typeof r == "function" ? r() : r;
	}
	number(e) {
		let t = Ht.get(this.locale);
		return t || (t = new Intl.NumberFormat(this.locale), Ht.set(this.locale, t)), t.format(e);
	}
	select(e, t) {
		let n = e[t] || e.other;
		return typeof n == "function" ? n() : n;
	}
}, Wt = /* @__PURE__ */ new WeakMap();
function Gt(e) {
	let t = Wt.get(e);
	return t || (t = new Lt(e), Wt.set(e, t)), t;
}
function Kt(e, t) {
	return t && Lt.getGlobalDictionaryForPackage(t) || Gt(e);
}
function qt(e, t) {
	let { locale: n } = Nt(), r = Kt(e, t);
	return o(() => new Ut(n, r), [n, r]);
}
//#endregion
//#region ../../node_modules/.pnpm/react-stately@3.49.0_react@19.2.8/node_modules/react-stately/dist/private/utils/useControlledState.mjs
var Jt = typeof document < "u" ? e.useInsertionEffect ?? e.useLayoutEffect : () => {};
function Yt(e, t, n) {
	let [i, o] = l(e || t), u = c(i), d = c(e !== void 0), f = e !== void 0;
	a(() => {
		let e = d.current;
		e !== f && process.env.NODE_ENV !== "production" && console.warn(`WARN: A component changed from ${e ? "controlled" : "uncontrolled"} to ${f ? "controlled" : "uncontrolled"}.`), d.current = f;
	}, [f]);
	let p = f ? e : i;
	Jt(() => {
		u.current = p;
	});
	let [, m] = s(() => ({}), {});
	return [p, r((e, ...t) => {
		let r = typeof e == "function" ? e(u.current) : e;
		Object.is(u.current, r) || (u.current = r, o(r), m(), n?.(r, ...t));
	}, [n])];
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/collections/BaseCollection.mjs
var Xt = class {
	constructor(e) {
		this.value = null, this.level = 0, this.hasChildNodes = !1, this.rendered = null, this.textValue = "", this["aria-label"] = void 0, this.index = 0, this.parentKey = null, this.prevKey = null, this.nextKey = null, this.firstChildKey = null, this.lastChildKey = null, this.props = {}, this.colSpan = null, this.colIndex = null, this.type = this.constructor.type, this.key = e;
	}
	get childNodes() {
		throw Error("childNodes is not supported");
	}
	clone() {
		let e = new this.constructor(this.key);
		return e.value = this.value, e.level = this.level, e.hasChildNodes = this.hasChildNodes, e.rendered = this.rendered, e.textValue = this.textValue, e["aria-label"] = this["aria-label"], e.index = this.index, e.parentKey = this.parentKey, e.prevKey = this.prevKey, e.nextKey = this.nextKey, e.firstChildKey = this.firstChildKey, e.lastChildKey = this.lastChildKey, e.props = this.props, e.render = this.render, e.colSpan = this.colSpan, e.colIndex = this.colIndex, e;
	}
	filter(e, t, n) {
		let r = this.clone();
		return t.addDescendants(r, e), r;
	}
}, Zt = class extends Xt {
	filter(e, t, n) {
		let [r, i] = Qt(e, t, this.firstChildKey, n), a = this.clone();
		return a.firstChildKey = r, a.lastChildKey = i, a;
	}
};
(class extends Xt {
	static {
		this.type = "header";
	}
}), class extends Xt {
	static {
		this.type = "loader";
	}
}, class extends Zt {
	static {
		this.type = "item";
	}
	filter(e, t, n) {
		if (n(this.textValue, this)) {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
}, class extends Zt {
	static {
		this.type = "section";
	}
	filter(e, t, n) {
		let r = super.filter(e, t, n);
		if (r && r.lastChildKey !== null) {
			let t = e.getItem(r.lastChildKey);
			if (t && t.type !== "header") return r;
		}
		return null;
	}
};
function Qt(e, t, n, r) {
	if (n == null) return [null, null];
	let i = null, a = null, o = e.getItem(n);
	for (; o != null;) {
		let n = o.filter(e, t, r);
		n != null && (n.nextKey = null, a && (n.prevKey = a.key, a.nextKey = n.key), i ??= n, t.addNode(n), a = n), o = o.nextKey == null ? null : e.getItem(o.nextKey);
	}
	if (a && a.type === "separator") {
		let e = a.prevKey;
		t.removeNode(a.key), e == null ? a = null : (a = t.getItem(e), a.nextKey = null);
	}
	return [i?.key ?? null, a?.key ?? null];
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/runAfterTransition.mjs
var R = /* @__PURE__ */ new Map(), $t = /* @__PURE__ */ new Set();
function en() {
	if (typeof window > "u") return;
	function e(e) {
		return "propertyName" in e;
	}
	let t = (t) => {
		let r = E(t);
		if (!e(t) || !r) return;
		let i = R.get(r);
		i || (i = /* @__PURE__ */ new Set(), R.set(r, i), r.addEventListener("transitioncancel", n, { once: !0 })), i.add(t.propertyName);
	}, n = (t) => {
		let r = E(t);
		if (!e(t) || !r) return;
		let i = R.get(r);
		if (i && (i.delete(t.propertyName), i.size === 0 && (r.removeEventListener("transitioncancel", n), R.delete(r)), R.size === 0)) {
			for (let e of $t) e();
			$t.clear();
		}
	};
	document.body.addEventListener("transitionrun", t), document.body.addEventListener("transitionend", n);
}
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", en) : en());
function tn() {
	for (let [e] of R) "isConnected" in e && !e.isConnected && R.delete(e);
}
function nn(e) {
	requestAnimationFrame(() => {
		tn(), R.size === 0 ? e() : $t.add(e);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/focusSafely.mjs
function rn(e) {
	if (!e.isConnected) return;
	let t = x(e);
	if (yt() === "virtual") {
		let n = T(t);
		nn(() => {
			let r = T(t);
			(r === n || r === t.body) && e.isConnected && Ie(e);
		});
	} else Ie(e);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/createEventHandler.mjs
function an(e) {
	if (e) return (t) => {
		let n = !0;
		e({
			...t,
			preventDefault() {
				t.preventDefault();
			},
			isDefaultPrevented() {
				return t.isDefaultPrevented();
			},
			stopPropagation() {
				n && process.env.NODE_ENV !== "production" ? console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.") : n = !0;
			},
			continuePropagation() {
				n = !1, typeof t.continuePropagation == "function" && t.continuePropagation();
			},
			isPropagationStopped() {
				return n;
			}
		}), n && !(typeof t.isPropagationStopped == "function" && t.isPropagationStopped()) && t.stopPropagation();
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/createKeyboardShortcutHandler.mjs
var on = /* @__PURE__ */ new Set([
	"shift",
	"alt",
	"control",
	"meta",
	"mod"
]), sn = [
	"Alt",
	"Control",
	"Meta",
	"Shift"
];
function cn(e) {
	let t = /* @__PURE__ */ new Set();
	return e.alt && t.add("Alt"), e.shift && t.add("Shift"), e.ctrl && t.add("Control"), e.meta && t.add("Meta"), e.mod && t.add(O() ? "Meta" : "Control"), t;
}
function ln(e) {
	let t = /* @__PURE__ */ new Set();
	return e.altKey && t.add("Alt"), e.ctrlKey && t.add("Control"), e.metaKey && t.add("Meta"), e.shiftKey && t.add("Shift"), t;
}
function un(e) {
	return sn.filter((t) => e.has(t));
}
function dn(e) {
	let t = e.split("+").reduce((e, t) => {
		let n = t.toLowerCase();
		return on.has(n) ? n === "shift" ? e.shift = !0 : n === "alt" ? e.alt = !0 : n === "control" ? e.ctrl = !0 : n === "meta" ? e.meta = !0 : n === "mod" && (e.mod = !0) : e.key = t, e;
	}, {
		shift: !1,
		alt: !1,
		ctrl: !1,
		meta: !1,
		mod: !1,
		key: ""
	});
	if (t.key === "") throw Error(`Invalid keyboard shortcut: "${e}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);
	return t;
}
function fn(e) {
	return e.toLowerCase();
}
var pn = {
	space: " ",
	esc: "escape",
	del: "delete",
	ins: "insert",
	left: "arrowleft",
	right: "arrowright",
	up: "arrowup",
	down: "arrowdown",
	pageup: "pageup",
	pagedown: "pagedown"
};
function mn(e) {
	let t = fn(e);
	return pn[t] ?? t;
}
function hn(e) {
	let t = un(cn(e)), n = mn(e.key);
	return t.length > 0 ? `${t.join("+")}+${n}` : n;
}
function gn(e) {
	let t = un(ln(e)), n = fn(e.key);
	return (t.length > 0 ? `${t.join("+")}+` : "") + n;
}
function _n(e) {
	let t = /* @__PURE__ */ new Map();
	for (let [n, r] of Object.entries(e)) {
		let e = dn(n);
		t.set(hn(e), r);
	}
	return (e) => {
		let n = gn(e), r = t.get(n), i = r?.(e);
		i === void 0 && r !== void 0 ? i = {
			shouldContinuePropagation: !1,
			shouldPreventDefault: !0
		} : typeof i == "boolean" && (i = {
			shouldContinuePropagation: !i,
			shouldPreventDefault: i
		}), i?.shouldPreventDefault && e.preventDefault(), (!r || i?.shouldContinuePropagation) && e.continuePropagation();
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/useKeyboard.mjs
function vn(e) {
	let { shortcuts: t, allowRepeats: n = !1, allowComposing: r = !1 } = e, i, a;
	if (t) {
		let o = _n(t), s = an((e) => {
			if (!w(e.currentTarget, E(e))) {
				e.continuePropagation();
				return;
			}
			if (e.nativeEvent?.repeat && !n || e.nativeEvent?.isComposing && !r) {
				e.continuePropagation();
				return;
			}
			o(e);
		}), c = an((e) => {
			if (!w(e.currentTarget, E(e))) {
				e.continuePropagation();
				return;
			}
			if (e.nativeEvent?.repeat && !n || e.nativeEvent?.isComposing && !r) {
				e.continuePropagation();
				return;
			}
			e.continuePropagation();
		});
		i = e.onKeyDown ? m(e.onKeyDown, s) : s, a = e.onKeyUp ? m(e.onKeyUp, c) : c;
	} else i = an(e.onKeyDown), a = an(e.onKeyUp);
	return { keyboardProps: e.isDisabled ? {} : {
		onKeyDown: i,
		onKeyUp: a
	} };
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useSyncRef.mjs
function yn(e, t) {
	h(() => {
		if (e && e.ref && t) return e.ref.current = t.current, () => {
			e.ref && (e.ref.current = null);
		};
	});
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/useFocusable.mjs
var bn = /*#__PURE__*/ e.createContext(null), xn = /* @__PURE__ */ new Set(["id"]), Sn = /* @__PURE__ */ new Set([
	"aria-label",
	"aria-labelledby",
	"aria-describedby",
	"aria-details"
]), Cn = /* @__PURE__ */ new Set([
	"href",
	"hrefLang",
	"target",
	"rel",
	"download",
	"ping",
	"referrerPolicy"
]), wn = /* @__PURE__ */ new Set([
	"dir",
	"lang",
	"hidden",
	"inert",
	"translate"
]), Tn = /* @__PURE__ */ new Set(/* @__PURE__ */ "onClick.onAuxClick.onContextMenu.onDoubleClick.onMouseDown.onMouseEnter.onMouseLeave.onMouseMove.onMouseOut.onMouseOver.onMouseUp.onTouchCancel.onTouchEnd.onTouchMove.onTouchStart.onPointerDown.onPointerMove.onPointerUp.onPointerCancel.onPointerEnter.onPointerLeave.onPointerOver.onPointerOut.onGotPointerCapture.onLostPointerCapture.onScroll.onWheel.onAnimationStart.onAnimationEnd.onAnimationIteration.onTransitionCancel.onTransitionEnd.onTransitionRun.onTransitionStart".split(".")), En = /^(data-.*)$/;
function Dn(e, t = {}) {
	let { labelable: n, isLink: r, global: i, events: a = i, propNames: o } = t, s = {};
	for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (xn.has(t) || n && Sn.has(t) || r && Cn.has(t) || i && wn.has(t) || a && (Tn.has(t) || t.endsWith("Capture") && Tn.has(t.slice(0, -7))) || o?.has(t) || En.test(t)) && (s[t] = e[t]);
	return s;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/getNonce.mjs
function On(e) {
	return e?.defaultView?.__webpack_nonce__ || globalThis.__webpack_nonce__ || void 0;
}
var kn = /* @__PURE__ */ new WeakMap();
function An(e) {
	let t = e ?? (typeof document < "u" ? document : void 0);
	if (!t) return On(t);
	if (kn.has(t)) return kn.get(t);
	let n = t.querySelector("meta[property=\"csp-nonce\"]"), r = n && n instanceof S(n).HTMLMetaElement && (n.nonce || n.content) || On(t) || void 0;
	return r !== void 0 && kn.set(t, r), r;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/context.mjs
var jn = e.createContext({ register: () => {} });
jn.displayName = "PressResponderContext";
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useGlobalListeners.mjs
function Mn() {
	let e = c(/* @__PURE__ */ new Map()), t = r((t, n, r, i) => {
		let a = i?.once ? (...t) => {
			e.current.delete(r), r(...t);
		} : r;
		e.current.set(r, {
			type: n,
			eventTarget: t,
			fn: a,
			options: i
		}), t.addEventListener(n, a, i);
	}, []), n = r((t, n, r, i) => {
		let a = e.current.get(r)?.fn || r;
		t.removeEventListener(n, a, i), e.current.delete(r);
	}, []), i = r(() => {
		e.current.forEach((e, t) => {
			n(e.eventTarget, e.type, t, e.options);
		});
	}, [n]);
	return a(() => i, [i]), {
		addGlobalListener: t,
		removeGlobalListener: n,
		removeAllGlobalListeners: i
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/useFocusWithin.mjs
function Nn(e) {
	let { isDisabled: t, onBlurWithin: n, onFocusWithin: i, onFocusWithinChange: a } = e, o = c({ isFocusWithin: !1 }), { addGlobalListener: s, removeAllGlobalListeners: l } = Mn(), u = r((e) => {
		w(e.currentTarget, E(e)) && o.current.isFocusWithin && !w(e.currentTarget, e.relatedTarget) && (o.current.isFocusWithin = !1, l(), n && n(e), a && a(!1));
	}, [
		n,
		a,
		o,
		l
	]), d = $e(u), f = r((e) => {
		if (!w(e.currentTarget, E(e))) return;
		let t = E(e), n = x(t), r = T(n);
		if (!o.current.isFocusWithin && r === t) {
			i && i(e), a && a(!0), o.current.isFocusWithin = !0, d(e);
			let t = e.currentTarget;
			s(n, "focus", (e) => {
				let r = E(e);
				if (o.current.isFocusWithin && !w(t, r)) {
					let e = new n.defaultView.FocusEvent("blur", { relatedTarget: r });
					Qe(e, t);
					let i = Ze(e);
					u(i);
				}
			}, { capture: !0 });
		}
	}, [
		i,
		a,
		d,
		s,
		u
	]);
	return t ? { focusWithinProps: {
		onFocus: void 0,
		onBlur: void 0
	} } : { focusWithinProps: {
		onFocus: f,
		onBlur: u
	} };
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria-components@1.20.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria-components/dist/private/Button.mjs
var Pn = /*#__PURE__*/ t({}), Fn = /*#__PURE__*/ t({}), In = /*#__PURE__*/ t({});
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/isScrollable.mjs
function Ln(e, t) {
	if (!e) return !1;
	let n = window.getComputedStyle(e), r = document.scrollingElement || document.documentElement, i = /(auto|scroll)/.test(n.overflow + n.overflowX + n.overflowY);
	return e === r && n.overflow !== "hidden" && (i = !0), i && t && (i = e.scrollHeight !== e.clientHeight || e.scrollWidth !== e.clientWidth), i;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/getScrollParent.mjs
function Rn(e, t) {
	let n = e;
	for (Ln(n, t) && (n = n.parentElement); n && !Ln(n, t);) n = n.parentElement;
	return n || document.scrollingElement || document.documentElement;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/visually-hidden/VisuallyHidden.mjs
var zn = {
	border: 0,
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	width: "1px",
	whiteSpace: "nowrap"
};
function Bn(e = {}) {
	let { style: t, isFocusable: n } = e, [r, i] = l(!1), { focusWithinProps: a } = Nn({
		isDisabled: !n,
		onFocusWithinChange: (e) => i(e)
	}), s = o(() => r ? t : t ? {
		...zn,
		...t
	} : zn, [r]);
	return { visuallyHiddenProps: {
		...a,
		style: s
	} };
}
function Vn(t) {
	let { children: n, elementType: r = "div", isFocusable: i, style: a, ...o } = t, { visuallyHiddenProps: s } = Bn(t);
	return /*#__PURE__*/ e.createElement(r, b(o, s), n);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/shadowdom/ShadowTreeWalker.mjs
var Hn = class {
	constructor(e, t, n, r) {
		this._walkerStack = [], this._currentSetFor = /* @__PURE__ */ new Set(), this._acceptNode = (e) => {
			if (e.nodeType === Node.ELEMENT_NODE) {
				let t = e.shadowRoot;
				if (t) {
					let e = this._doc.createTreeWalker(t, this.whatToShow, { acceptNode: this._acceptNode });
					return this._walkerStack.unshift(e), NodeFilter.FILTER_ACCEPT;
				}
				if (typeof this.filter == "function") return this.filter(e);
				if (this.filter?.acceptNode) return this.filter.acceptNode(e);
				if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.FILTER_SKIP;
		}, this._doc = e, this.root = t, this.filter = r ?? null, this.whatToShow = n ?? NodeFilter.SHOW_ALL, this._currentNode = t, this._walkerStack.unshift(e.createTreeWalker(t, n, this._acceptNode));
		let i = t.shadowRoot;
		if (i) {
			let e = this._doc.createTreeWalker(i, this.whatToShow, { acceptNode: this._acceptNode });
			this._walkerStack.unshift(e);
		}
	}
	get currentNode() {
		return this._currentNode;
	}
	set currentNode(e) {
		if (!w(this.root, e)) throw Error("Cannot set currentNode to a node that is not contained by the root node.");
		let t = [], n = e, r = e;
		for (this._currentNode = e; n && n !== this.root;) if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			let e = n, i = this._doc.createTreeWalker(e, this.whatToShow, { acceptNode: this._acceptNode });
			t.push(i), i.currentNode = r, this._currentSetFor.add(i), n = r = e.host;
		} else n = n.parentNode;
		let i = this._doc.createTreeWalker(this.root, this.whatToShow, { acceptNode: this._acceptNode });
		t.push(i), i.currentNode = r, this._currentSetFor.add(i), this._walkerStack = t;
	}
	get doc() {
		return this._doc;
	}
	firstChild() {
		let e = this.currentNode, t = this.nextNode();
		return w(e, t) ? (t && (this.currentNode = t), t) : (this.currentNode = e, null);
	}
	lastChild() {
		let e = this._walkerStack[0].lastChild();
		return e && (this.currentNode = e), e;
	}
	nextNode() {
		let e = this._walkerStack[0].nextNode();
		if (e) {
			if (e.shadowRoot) {
				let t;
				if (typeof this.filter == "function" ? t = this.filter(e) : this.filter?.acceptNode && (t = this.filter.acceptNode(e)), t === NodeFilter.FILTER_ACCEPT) return this.currentNode = e, e;
				let n = this.nextNode();
				return n && (this.currentNode = n), n;
			}
			return e && (this.currentNode = e), e;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.nextNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	previousNode() {
		let e = this._walkerStack[0];
		if (e.currentNode === e.root) {
			if (this._currentSetFor.has(e)) {
				if (this._currentSetFor.delete(e), this._walkerStack.length > 1) {
					this._walkerStack.shift();
					let e = this.previousNode();
					return e && (this.currentNode = e), e;
				}
				return null;
			}
			return null;
		}
		let t = e.previousNode();
		if (t) {
			if (t.shadowRoot) {
				let e;
				if (typeof this.filter == "function" ? e = this.filter(t) : this.filter?.acceptNode && (e = this.filter.acceptNode(t)), e === NodeFilter.FILTER_ACCEPT) return t && (this.currentNode = t), t;
				let n = this.lastChild();
				return n && (this.currentNode = n), n;
			}
			return t && (this.currentNode = t), t;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.previousNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	nextSibling() {
		return null;
	}
	previousSibling() {
		return null;
	}
	parentNode() {
		return null;
	}
};
function Un(e, t, n, r) {
	return C() ? new Hn(e, t, n, r) : e.createTreeWalker(t, n, r);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/focus/FocusScope.mjs
var Wn = /*#__PURE__*/ e.createContext(null), Gn = "react-aria-focus-scope-restore", z = null;
function Kn(t) {
	let { children: n, contain: r, restoreFocus: s, autoFocus: l } = t, u = c(null), d = c(null), f = c([]), { parentNode: p } = i(Wn) || {}, m = o(() => new cr({ scopeRef: f }), [f]);
	h(() => {
		let e = p || K.root;
		if (K.getTreeNode(e.scopeRef) && z && !$n(z, e.scopeRef)) {
			let t = K.getTreeNode(z);
			t && (e = t);
		}
		e.addChild(m), K.addNode(m);
	}, [m, p]), h(() => {
		let e = K.getTreeNode(f);
		e && (e.contain = !!r);
	}, [r]), h(() => {
		let e = u.current?.nextSibling, t = [], n = (e) => e.stopPropagation();
		for (; e && e !== d.current;) t.push(e), e.addEventListener(Gn, n), e = e.nextSibling;
		return f.current = t, () => {
			for (let e of t) e.removeEventListener(Gn, n);
		};
	}, [n]), rr(f, s, r), Xn(f, r), ar(f, s, r), nr(f, l), a(() => {
		let e = T(x(f.current ? f.current[0] : void 0)), t = null;
		if (H(e, f.current)) {
			for (let n of K.traverse()) n.scopeRef && H(e, n.scopeRef.current) && (t = n);
			t === K.getTreeNode(f) && (z = t.scopeRef);
		}
	}, [f]), h(() => () => {
		let e = K.getTreeNode(f)?.parent?.scopeRef ?? null;
		(f === z || $n(f, z)) && (!e || K.getTreeNode(e)) && (z = e), K.removeTreeNode(f);
	}, [f]);
	let g = o(() => qn(f), []), ee = o(() => ({
		focusManager: g,
		parentNode: m
	}), [m, g]);
	return /*#__PURE__*/ e.createElement(Wn.Provider, { value: ee }, /*#__PURE__*/ e.createElement("span", {
		"data-focus-scope-start": !0,
		hidden: !0,
		ref: u
	}), n, /*#__PURE__*/ e.createElement("span", {
		"data-focus-scope-end": !0,
		hidden: !0,
		ref: d
	}));
}
function qn(e) {
	return {
		focusNext(t = {}) {
			let n = e.current, { from: r, tabbable: i, wrap: a, accept: o } = t, s = r || T(x(n[0] ?? void 0)), c = n[0].previousElementSibling, l = G(B(n), {
				tabbable: i,
				accept: o
			}, n);
			l.currentNode = H(s, n) ? s : c;
			let u = l.nextNode();
			return !u && a && (l.currentNode = c, u = l.nextNode()), u && W(u, !0), u;
		},
		focusPrevious(t = {}) {
			let n = e.current, { from: r, tabbable: i, wrap: a, accept: o } = t, s = r || T(x(n[0] ?? void 0)), c = n[n.length - 1].nextElementSibling, l = G(B(n), {
				tabbable: i,
				accept: o
			}, n);
			l.currentNode = H(s, n) ? s : c;
			let u = l.previousNode();
			return !u && a && (l.currentNode = c, u = l.previousNode()), u && W(u, !0), u;
		},
		focusFirst(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = G(B(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[0].previousElementSibling;
			let o = a.nextNode();
			return o && W(o, !0), o;
		},
		focusLast(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = G(B(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[n.length - 1].nextElementSibling;
			let o = a.previousNode();
			return o && W(o, !0), o;
		}
	};
}
function B(e) {
	return e[0].parentElement;
}
function V(e) {
	let t = K.getTreeNode(z);
	for (; t && t.scopeRef !== e;) {
		if (t.contain) return !1;
		t = t.parent;
	}
	return !0;
}
function Jn(e) {
	if (!e.form) return Array.from(x(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter((e) => !e.form);
	let t = e.form.elements.namedItem(e.name), n = S(e);
	return t instanceof n.RadioNodeList ? Array.from(t).filter((e) => e instanceof n.HTMLInputElement) : t instanceof n.HTMLInputElement ? [t] : [];
}
function Yn(e) {
	if (e.checked) return !0;
	let t = Jn(e);
	return t.length > 0 && !t.some((e) => e.checked);
}
function Xn(e, t) {
	let n = c(void 0), r = c(void 0);
	h(() => {
		let i = e.current;
		if (!t) {
			r.current &&= (cancelAnimationFrame(r.current), void 0);
			return;
		}
		let a = x(i ? i[0] : void 0), o = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !V(e) || t.isComposing) return;
			let n = T(a), r = e.current;
			if (!r || !H(n, r)) return;
			let i = G(B(r), { tabbable: !0 }, r);
			if (!n) return;
			i.currentNode = n;
			let o = t.shiftKey ? i.previousNode() : i.nextNode();
			o ||= (i.currentNode = t.shiftKey ? r[r.length - 1].nextElementSibling : r[0].previousElementSibling, t.shiftKey ? i.previousNode() : i.nextNode()), t.preventDefault(), o && (W(o, !0), o instanceof S(o).HTMLInputElement && o.select());
		}, s = (t) => {
			(!z || $n(z, e)) && H(E(t), e.current) ? (z = e, n.current = E(t)) : V(e) && !U(E(t), e) ? n.current ? W(n.current) : z && z.current && tr(z.current) : V(e) && (n.current = E(t));
		}, c = (t) => {
			r.current && cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
				let r = yt(), i = (r === "virtual" || r === null) && at() && it(), o = T(a);
				if (!i && o && V(e) && !U(o, e)) {
					z = e;
					let r = E(t);
					r && r.isConnected ? (n.current = r, W(n.current)) : z.current && tr(z.current);
				}
			});
		};
		return a.addEventListener("keydown", o, !1), a.addEventListener("focusin", s, !1), i?.forEach((e) => e.addEventListener("focusin", s, !1)), i?.forEach((e) => e.addEventListener("focusout", c, !1)), () => {
			a.removeEventListener("keydown", o, !1), a.removeEventListener("focusin", s, !1), i?.forEach((e) => e.removeEventListener("focusin", s, !1)), i?.forEach((e) => e.removeEventListener("focusout", c, !1));
		};
	}, [e, t]), h(() => () => {
		r.current && cancelAnimationFrame(r.current);
	}, [r]);
}
function Zn(e) {
	return U(e);
}
function H(e, t) {
	return !e || !t ? !1 : t.some((t) => w(t, e));
}
function U(e, t = null) {
	if (e instanceof Element && e.closest("[data-react-aria-top-layer]")) return !0;
	for (let { scopeRef: n } of K.traverse(K.getTreeNode(t))) if (n && H(e, n.current)) return !0;
	return !1;
}
function Qn(e) {
	return U(e, z);
}
function $n(e, t) {
	let n = K.getTreeNode(t)?.parent;
	for (; n;) {
		if (n.scopeRef === e) return !0;
		n = n.parent;
	}
	return !1;
}
function W(e, t = !1) {
	if (e != null && !t) try {
		rn(e);
	} catch {}
	else if (e != null) try {
		e.focus();
	} catch {}
}
function er(e, t = !0) {
	let n = e[0].previousElementSibling, r = B(e), i = G(r, { tabbable: t }, e);
	i.currentNode = n;
	let a = i.nextNode();
	return t && !a && (r = B(e), i = G(r, { tabbable: !1 }, e), i.currentNode = n, a = i.nextNode()), a;
}
function tr(e, t = !0) {
	W(er(e, t));
}
function nr(t, n) {
	let r = e.useRef(n);
	a(() => {
		r.current && (z = t, !H(T(x(t.current ? t.current[0] : void 0)), z.current) && t.current && tr(t.current)), r.current = !1;
	}, [t]);
}
function rr(e, t, n) {
	h(() => {
		if (t || n) return;
		let r = e.current, i = x(r ? r[0] : void 0), a = (t) => {
			let n = E(t);
			H(n, e.current) ? z = e : Zn(n) || (z = null);
		};
		return i.addEventListener("focusin", a, !1), r?.forEach((e) => e.addEventListener("focusin", a, !1)), () => {
			i.removeEventListener("focusin", a, !1), r?.forEach((e) => e.removeEventListener("focusin", a, !1));
		};
	}, [
		e,
		t,
		n
	]);
}
function ir(e) {
	let t = K.getTreeNode(z);
	for (; t && t.scopeRef !== e;) {
		if (t.nodeToRestore) return !1;
		t = t.parent;
	}
	return t?.scopeRef === e;
}
function ar(e, t, n) {
	let r = c(typeof document < "u" ? T(x(e.current ? e.current[0] : void 0)) : null);
	h(() => {
		let r = e.current, i = x(r ? r[0] : void 0);
		if (!t || n) return;
		let a = () => {
			(!z || $n(z, e)) && H(T(i), e.current) && (z = e);
		};
		return i.addEventListener("focusin", a, !1), r?.forEach((e) => e.addEventListener("focusin", a, !1)), () => {
			i.removeEventListener("focusin", a, !1), r?.forEach((e) => e.removeEventListener("focusin", a, !1));
		};
	}, [e, n]), h(() => {
		let r = x(e.current ? e.current[0] : void 0);
		if (!t) return;
		let i = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !V(e) || t.isComposing) return;
			let n = r.activeElement;
			if (!U(n, e) || !ir(e)) return;
			let i = K.getTreeNode(e);
			if (!i) return;
			let a = i.nodeToRestore, o = G(r.body, { tabbable: !0 });
			o.currentNode = n;
			let s = t.shiftKey ? o.previousNode() : o.nextNode();
			if ((!a || !a.isConnected || a === r.body) && (a = void 0, i.nodeToRestore = void 0), (!s || !U(s, e)) && a) {
				o.currentNode = a;
				do
					s = t.shiftKey ? o.previousNode() : o.nextNode();
				while (U(s, e));
				t.preventDefault(), t.stopPropagation(), s ? W(s, !0) : Zn(a) ? W(a, !0) : n.blur();
			}
		};
		return n || r.addEventListener("keydown", i, !0), () => {
			n || r.removeEventListener("keydown", i, !0);
		};
	}, [
		e,
		t,
		n
	]), h(() => {
		let n = x(e.current ? e.current[0] : void 0);
		if (!t) return;
		let i = K.getTreeNode(e);
		if (i) return i.nodeToRestore = r.current ?? void 0, () => {
			let r = K.getTreeNode(e);
			if (!r) return;
			let i = r.nodeToRestore, a = T(n);
			if (t && i && (a && U(a, e) || a === n.body && ir(e))) {
				let t = K.clone();
				requestAnimationFrame(() => {
					if (n.activeElement === n.body) {
						let n = t.getTreeNode(e);
						for (; n;) {
							if (n.nodeToRestore && n.nodeToRestore.isConnected) {
								or(n.nodeToRestore);
								return;
							}
							n = n.parent;
						}
						for (n = t.getTreeNode(e); n;) {
							if (n.scopeRef && n.scopeRef.current && K.getTreeNode(n.scopeRef)) {
								or(er(n.scopeRef.current, !0));
								return;
							}
							n = n.parent;
						}
					}
				});
			}
		};
	}, [e, t]);
}
function or(e) {
	e.dispatchEvent(new CustomEvent(Gn, {
		bubbles: !0,
		cancelable: !0
	})) && W(e);
}
function G(e, t, n) {
	let r = t?.tabbable ? Ye : Je, i = x(e?.nodeType === Node.ELEMENT_NODE ? e : null), a = Un(i, e || i, NodeFilter.SHOW_ELEMENT, { acceptNode(e) {
		return w(t?.from, e) || t?.tabbable && e.tagName === "INPUT" && e.getAttribute("type") === "radio" && (!Yn(e) || a.currentNode.tagName === "INPUT" && a.currentNode.type === "radio" && a.currentNode.name === e.name) ? NodeFilter.FILTER_REJECT : r(e) && (!n || H(e, n)) && (!t?.accept || t.accept(e)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	return t?.from && (a.currentNode = t.from), a;
}
var sr = class e {
	constructor() {
		this.fastMap = /* @__PURE__ */ new Map(), this.root = new cr({ scopeRef: null }), this.fastMap.set(null, this.root);
	}
	get size() {
		return this.fastMap.size;
	}
	getTreeNode(e) {
		return this.fastMap.get(e);
	}
	addTreeNode(e, t, n) {
		let r = this.fastMap.get(t ?? null);
		if (!r) return;
		let i = new cr({ scopeRef: e });
		r.addChild(i), i.parent = r, this.fastMap.set(e, i), n && (i.nodeToRestore = n);
	}
	addNode(e) {
		this.fastMap.set(e.scopeRef, e);
	}
	removeTreeNode(e) {
		if (e === null) return;
		let t = this.fastMap.get(e);
		if (!t) return;
		let n = t.parent;
		for (let e of this.traverse()) e !== t && t.nodeToRestore && e.nodeToRestore && t.scopeRef && t.scopeRef.current && H(e.nodeToRestore, t.scopeRef.current) && (e.nodeToRestore = t.nodeToRestore);
		let r = t.children;
		n && (n.removeChild(t), r.size > 0 && r.forEach((e) => n && n.addChild(e))), this.fastMap.delete(t.scopeRef);
	}
	*traverse(e = this.root) {
		if (e.scopeRef != null && (yield e), e.children.size > 0) for (let t of e.children) yield* this.traverse(t);
	}
	clone() {
		let t = new e();
		for (let e of this.traverse()) t.addTreeNode(e.scopeRef, e.parent?.scopeRef ?? null, e.nodeToRestore);
		return t;
	}
}, cr = class {
	constructor(e) {
		this.children = /* @__PURE__ */ new Set(), this.contain = !1, this.scopeRef = e.scopeRef;
	}
	addChild(e) {
		this.children.add(e), e.parent = this;
	}
	removeChild(e) {
		this.children.delete(e), e.parent = void 0;
	}
}, K = new sr(), lr = typeof HTMLElement < "u" && "inert" in HTMLElement.prototype;
function ur(e) {
	return e.dataset.liveAnnouncer === "true" || e.dataset.reactAriaTopLayer !== void 0;
}
var q = /* @__PURE__ */ new WeakMap(), J = [];
function dr(e, t) {
	let n = S(e?.[0]), r = t instanceof n.Element ? { root: t } : t, i = r?.root ?? document.body, a = r?.shouldUseInert && lr, o = new Set(e), s = /* @__PURE__ */ new Set(), c = (e) => a && e instanceof n.HTMLElement ? e.inert : e.getAttribute("aria-hidden") === "true", l = (e, t) => {
		a && e instanceof n.HTMLElement ? e.inert = t : t ? e.setAttribute("aria-hidden", "true") : (e.removeAttribute("aria-hidden"), e instanceof n.HTMLElement && (e.inert = !1));
	}, u = /* @__PURE__ */ new Set();
	if (C()) {
		let t = i.getRootNode();
		for (let n of e) {
			let e = n.getRootNode();
			for (; Ne(e) && e !== t;) u.add(e), e = e.host.getRootNode();
		}
	}
	let d = (e) => {
		for (let t of e.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) o.add(t);
		let t = (e) => {
			if (s.has(e) || o.has(e) || e.parentElement && s.has(e.parentElement) && e.parentElement.getAttribute("role") !== "row") return NodeFilter.FILTER_REJECT;
			for (let t of o) if (w(e, t)) return NodeFilter.FILTER_SKIP;
			return NodeFilter.FILTER_ACCEPT;
		}, n = Un(x(e), e, NodeFilter.SHOW_ELEMENT, { acceptNode: t }), r = t(e);
		if (r === NodeFilter.FILTER_ACCEPT && f(e), r !== NodeFilter.FILTER_REJECT) {
			let e = n.nextNode();
			for (; e != null;) f(e), e = n.nextNode();
		}
	}, f = (e) => {
		let t = q.get(e) ?? 0;
		c(e) && t === 0 || (t === 0 && l(e, !0), s.add(e), q.set(e, t + 1));
	};
	J.length && J[J.length - 1].disconnect(), d(i);
	let p = new MutationObserver((e) => {
		for (let t of e) if (t.type === "childList") {
			if (t.target.isConnected && ![...o, ...s].some((e) => w(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && ur(e) ? o.add(e) : e instanceof Element && d(e);
			if (C()) {
				for (let e of u) if (!e.isConnected) {
					p.disconnect();
					break;
				}
			}
		}
	});
	p.observe(i, {
		childList: !0,
		subtree: !0
	});
	let m = /* @__PURE__ */ new Set();
	if (C()) for (let e of u) {
		let t = new MutationObserver((e) => {
			for (let t of e) if (t.type === "childList") {
				if (t.target.isConnected && ![...o, ...s].some((e) => w(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && ur(e) ? o.add(e) : e instanceof Element && d(e);
				if (C()) {
					for (let e of u) if (!e.isConnected) {
						p.disconnect();
						break;
					}
				}
			}
		});
		t.observe(e, {
			childList: !0,
			subtree: !0
		}), m.add(t);
	}
	let h = {
		visibleNodes: o,
		hiddenNodes: s,
		observe() {
			p.observe(i, {
				childList: !0,
				subtree: !0
			});
		},
		disconnect() {
			p.disconnect();
		}
	};
	return J.push(h), () => {
		if (p.disconnect(), C()) for (let e of m) e.disconnect();
		for (let e of s) {
			let t = q.get(e);
			t != null && (t === 1 ? (l(e, !1), q.delete(e)) : q.set(e, t - 1));
		}
		h === J[J.length - 1] ? (J.pop(), J.length && J[J.length - 1].observe()) : J.splice(J.indexOf(h), 1);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/useCloseOnScroll.mjs
var fr = /* @__PURE__ */ new WeakMap();
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/useInteractOutside.mjs
function pr(e) {
	let { ref: t, onInteractOutside: n, isDisabled: r, onInteractOutsideStart: i } = e, o = c({
		isPointerDown: !1,
		ignoreEmulatedMouseEvents: !1
	}), s = St((e) => {
		n && mr(e, t) && (i && i(e), o.current.isPointerDown = !0);
	}), l = St((e) => {
		n && n(e);
	});
	a(() => {
		let e = o.current;
		if (r) return;
		let n = t.current, i = x(n);
		if (typeof PointerEvent < "u") {
			let n = (n) => {
				e.isPointerDown && mr(n, t) && l(n), e.isPointerDown = !1;
			};
			return i.addEventListener("pointerdown", s, !0), i.addEventListener("click", n, !0), () => {
				i.removeEventListener("pointerdown", s, !0), i.removeEventListener("click", n, !0);
			};
		}
		if (process.env.NODE_ENV === "test") {
			let n = (n) => {
				e.ignoreEmulatedMouseEvents ? e.ignoreEmulatedMouseEvents = !1 : e.isPointerDown && mr(n, t) && l(n), e.isPointerDown = !1;
			}, r = (n) => {
				e.ignoreEmulatedMouseEvents = !0, e.isPointerDown && mr(n, t) && l(n), e.isPointerDown = !1;
			};
			return i.addEventListener("mousedown", s, !0), i.addEventListener("mouseup", n, !0), i.addEventListener("touchstart", s, !0), i.addEventListener("touchend", r, !0), () => {
				i.removeEventListener("mousedown", s, !0), i.removeEventListener("mouseup", n, !0), i.removeEventListener("touchstart", s, !0), i.removeEventListener("touchend", r, !0);
			};
		}
	}, [t, r]);
}
function mr(e, t) {
	if (e.button > 0) return !1;
	let n = E(e);
	if (n) {
		let e = n.ownerDocument;
		if (!e || !w(e.documentElement, n) || n.closest("[data-react-aria-top-layer]")) return !1;
	}
	return t.current ? !e.composedPath().includes(t.current) : !1;
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/useOverlay.mjs
var Y = [];
function hr(e, t) {
	let { onClose: n, shouldCloseOnBlur: r, isOpen: i, isDismissable: o = !1, isKeyboardDismissDisabled: s = !1, shouldCloseOnInteractOutside: l } = e, u = c(void 0);
	a(() => {
		if (i && !Y.includes(t)) return Y.push(t), () => {
			let e = Y.indexOf(t);
			e >= 0 && Y.splice(e, 1);
		};
	}, [i, t]);
	let d = () => {
		Y[Y.length - 1] === t && n && n();
	}, f = (e) => {
		let n = Y[Y.length - 1];
		u.current = n, (!l || l(E(e))) && n === t && e.stopPropagation();
	}, p = (e) => {
		(!l || l(E(e))) && (Y[Y.length - 1] === t && e.stopPropagation(), u.current === t && d()), u.current = void 0;
	}, { keyboardProps: m } = vn({ shortcuts: { Escape: () => {
		if (!s) {
			d();
			return;
		}
		return !1;
	} } });
	pr({
		ref: t,
		onInteractOutside: o && i ? p : void 0,
		onInteractOutsideStart: f
	});
	let { focusWithinProps: h } = Nn({
		isDisabled: !r,
		onBlurWithin: (e) => {
			!e.relatedTarget || Qn(e.relatedTarget) || (!l || l(e.relatedTarget)) && n?.();
		}
	});
	return {
		overlayProps: {
			...m,
			...h
		},
		underlayProps: {}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/usePreventScroll.mjs
var X = typeof document < "u" && window.visualViewport, gr = 0, _r;
function vr(e = {}) {
	let { isDisabled: t } = e;
	h(() => {
		if (!t) return gr++, gr === 1 && (_r = k() && A() ? br() : yr()), () => {
			gr--, gr === 0 && _r();
		};
	}, [t]);
}
function yr() {
	let e = window.innerWidth - document.documentElement.clientWidth;
	return m(e > 0 && ("scrollbarGutter" in document.documentElement.style ? xr(document.documentElement, "scrollbarGutter", "stable") : xr(document.documentElement, "paddingRight", `${e}px`)), xr(document.documentElement, "overflow", "hidden"));
}
function br() {
	let e = xr(document.documentElement, "overflow", "hidden"), t, n = !1, r = (e) => {
		let r = E(e);
		t = Ln(r) ? r : Rn(r, !0), n = !1;
		let i = r.ownerDocument.defaultView.getSelection();
		i && !i.isCollapsed && i.containsNode(r, !0) && (n = !0), e.composedPath().some((e) => e instanceof HTMLInputElement && e.type === "range") && (n = !0), "selectionStart" in r && "selectionEnd" in r && r.selectionStart < r.selectionEnd && r.ownerDocument.activeElement === r && (n = !0);
	}, i = document.createElement("style"), a = An();
	a && (i.nonce = a), i.textContent = "@layer {\n  * {\n    overscroll-behavior: contain;\n  }\n}", document.head.prepend(i);
	let o = (e) => {
		if (!(e.touches.length === 2 || n)) {
			if (!t || t === document.documentElement || t === document.body) {
				e.preventDefault();
				return;
			}
			t.scrollHeight === t.clientHeight && t.scrollWidth === t.clientWidth && e.preventDefault();
		}
	}, s = (e) => {
		let t = E(e), n = e.relatedTarget;
		n && I(n) ? (n.focus({ preventScroll: !0 }), Cr(n, I(t))) : n || (t.parentElement?.closest("[tabindex]"))?.focus({ preventScroll: !0 });
	}, c = HTMLElement.prototype.focus;
	HTMLElement.prototype.focus = function(e) {
		let t = T(), n = t != null && I(t);
		c.call(this, {
			...e,
			preventScroll: !0
		}), (!e || !e.preventScroll) && Cr(this, n);
	};
	let l = m(Sr(document, "touchstart", r, {
		passive: !1,
		capture: !0
	}), Sr(document, "touchmove", o, {
		passive: !1,
		capture: !0
	}), Sr(document, "blur", s, !0));
	return () => {
		e(), l(), i.remove(), HTMLElement.prototype.focus = c;
	};
}
function xr(e, t, n) {
	let r = e.style[t];
	return e.style[t] = n, () => {
		e.style[t] = r;
	};
}
function Sr(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
function Cr(e, t) {
	t || !X ? wr(e) : X.addEventListener("resize", () => wr(e), { once: !0 });
}
function wr(e) {
	let t = document.scrollingElement || document.documentElement, n = e;
	for (; n && n !== t;) {
		let e = Rn(n);
		if (e !== document.documentElement && e !== document.body && e !== n) {
			let t = e.getBoundingClientRect(), r = n.getBoundingClientRect();
			if (r.top < t.top || r.bottom > t.top + n.clientHeight) {
				let n = t.bottom;
				X && (n = Math.min(n, X.offsetTop + X.height));
				let i = r.top - t.top - ((n - t.top) / 2 - r.height / 2);
				e.scrollTo({
					top: Math.max(0, Math.min(e.scrollHeight - e.clientHeight, e.scrollTop + i)),
					behavior: "smooth"
				});
			}
		}
		n = e.parentElement;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/ar-AE.mjs
var Tr = {};
Tr = { dismiss: "تجاهل" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/bg-BG.mjs
var Er = {};
Er = { dismiss: "Отхвърляне" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/cs-CZ.mjs
var Dr = {};
Dr = { dismiss: "Odstranit" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/da-DK.mjs
var Or = {};
Or = { dismiss: "Luk" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/de-DE.mjs
var kr = {};
kr = { dismiss: "Schließen" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/el-GR.mjs
var Ar = {};
Ar = { dismiss: "Απόρριψη" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/en-US.mjs
var jr = {};
jr = { dismiss: "Dismiss" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/es-ES.mjs
var Mr = {};
Mr = { dismiss: "Descartar" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/et-EE.mjs
var Nr = {};
Nr = { dismiss: "Lõpeta" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/fi-FI.mjs
var Pr = {};
Pr = { dismiss: "Hylkää" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/fr-FR.mjs
var Fr = {};
Fr = { dismiss: "Rejeter" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/he-IL.mjs
var Ir = {};
Ir = { dismiss: "התעלם" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/hr-HR.mjs
var Lr = {};
Lr = { dismiss: "Odbaci" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/hu-HU.mjs
var Rr = {};
Rr = { dismiss: "Elutasítás" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/it-IT.mjs
var zr = {};
zr = { dismiss: "Ignora" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/ja-JP.mjs
var Br = {};
Br = { dismiss: "閉じる" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/ko-KR.mjs
var Vr = {};
Vr = { dismiss: "무시" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/lt-LT.mjs
var Hr = {};
Hr = { dismiss: "Atmesti" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/lv-LV.mjs
var Ur = {};
Ur = { dismiss: "Nerādīt" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/nb-NO.mjs
var Wr = {};
Wr = { dismiss: "Lukk" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/nl-NL.mjs
var Gr = {};
Gr = { dismiss: "Negeren" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/pl-PL.mjs
var Kr = {};
Kr = { dismiss: "Zignoruj" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/pt-BR.mjs
var qr = {};
qr = { dismiss: "Descartar" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/pt-PT.mjs
var Jr = {};
Jr = { dismiss: "Dispensar" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/ro-RO.mjs
var Yr = {};
Yr = { dismiss: "Revocare" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/ru-RU.mjs
var Xr = {};
Xr = { dismiss: "Пропустить" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/sk-SK.mjs
var Zr = {};
Zr = { dismiss: "Zrušiť" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/sl-SI.mjs
var Qr = {};
Qr = { dismiss: "Opusti" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/sr-SP.mjs
var $r = {};
$r = { dismiss: "Odbaci" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/sv-SE.mjs
var ei = {};
ei = { dismiss: "Avvisa" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/tr-TR.mjs
var ti = {};
ti = { dismiss: "Kapat" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/uk-UA.mjs
var ni = {};
ni = { dismiss: "Скасувати" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/zh-CN.mjs
var ri = {};
ri = { dismiss: "取消" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/intl/overlays/zh-TW.mjs
var ii = {};
ii = { dismiss: "關閉" };
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/intlStrings.mjs
var ai = {};
ai = {
	"ar-AE": Tr,
	"bg-BG": Er,
	"cs-CZ": Dr,
	"da-DK": Or,
	"de-DE": kr,
	"el-GR": Ar,
	"en-US": jr,
	"es-ES": Mr,
	"et-EE": Nr,
	"fi-FI": Pr,
	"fr-FR": Fr,
	"he-IL": Ir,
	"hr-HR": Lr,
	"hu-HU": Rr,
	"it-IT": zr,
	"ja-JP": Br,
	"ko-KR": Vr,
	"lt-LT": Hr,
	"lv-LV": Ur,
	"nb-NO": Wr,
	"nl-NL": Gr,
	"pl-PL": Kr,
	"pt-BR": qr,
	"pt-PT": Jr,
	"ro-RO": Yr,
	"ru-RU": Xr,
	"sk-SK": Zr,
	"sl-SI": Qr,
	"sr-SP": $r,
	"sv-SE": ei,
	"tr-TR": ti,
	"uk-UA": ni,
	"zh-CN": ri,
	"zh-TW": ii
};
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/DismissButton.mjs
function oi(e) {
	return e && e.__esModule ? e.default : e;
}
function si(t) {
	let { onDismiss: n, ...r } = t, i = Ct(r, qt(oi(ai), "@react-aria/overlays").format("dismiss")), a = () => {
		n && n();
	};
	return /*#__PURE__*/ e.createElement(Vn, null, /*#__PURE__*/ e.createElement("button", {
		...i,
		tabIndex: -1,
		onClick: a,
		style: {
			width: 1,
			height: 1
		}
	}));
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/interactions/PressResponder.mjs
var ci = /*#__PURE__*/ e.forwardRef(({ children: t, ...n }, r) => {
	let o = c(!1), s = i(jn), l = b(s || {}, {
		...n,
		register() {
			o.current = !0, s && s.register();
		}
	});
	return l.ref = xe(r || s?.ref), yn(s, l.ref), a(() => {
		o.current ||= (process.env.NODE_ENV !== "production" && console.warn("A PressResponder was rendered without a pressable child. Either call the usePress hook, or wrap your DOM node with <Pressable> component."), !0);
	}, []), /*#__PURE__*/ e.createElement(jn.Provider, { value: l }, t);
});
function li({ children: t }) {
	let n = o(() => ({ register: () => {} }), []);
	return /*#__PURE__*/ e.createElement(jn.Provider, { value: n }, t);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/PortalProvider.mjs
var ui = /*#__PURE__*/ t({});
function di() {
	return i(ui) ?? {};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/Overlay.mjs
var fi = /*#__PURE__*/ e.createContext(null);
function pi(t) {
	let n = _(), { portalContainer: r = n ? null : document.body, isExiting: i } = t, [a, s] = l(!1), c = o(() => ({
		contain: a,
		setContain: s
	}), [a, s]), { getContainer: d } = di();
	if (!t.portalContainer && d && (r = d()), !r) return null;
	let f = t.children;
	return t.disableFocusManagement || (f = /*#__PURE__*/ e.createElement(Kn, {
		restoreFocus: !0,
		contain: (t.shouldContainFocus || a) && !i
	}, f)), f = /*#__PURE__*/ e.createElement(fi.Provider, { value: c }, /*#__PURE__*/ e.createElement(li, null, /*#__PURE__*/ e.createElement(bn.Provider, { value: null }, f))), /*#__PURE__*/ u.createPortal(f, r);
}
function mi() {
	let e = i(fi)?.setContain;
	h(() => {
		e?.(!0);
	}, [e]);
}
//#endregion
//#region ../../node_modules/.pnpm/react-stately@3.49.0_react@19.2.8/node_modules/react-stately/dist/private/overlays/useOverlayTriggerState.mjs
function hi(e) {
	let [t, n] = Yt(e.isOpen, e.defaultOpen || !1, e.onOpenChange), [i, a] = l(null);
	return {
		isOpen: t,
		setOpen: n,
		open: r(() => {
			n(!0);
		}, [n]),
		close: r(() => {
			n(!1);
		}, [n]),
		toggle: r(() => {
			n(!t);
		}, [n, t]),
		point: i,
		setPoint: a
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/animation.mjs
function gi(e, t = !0) {
	let [n, i] = l(!0), a = n && t;
	return h(() => {
		if (a && e.current && "getAnimations" in e.current) for (let t of e.current.getAnimations()) t instanceof CSSTransition && t.cancel();
	}, [e, a]), vi(e, a, r(() => i(!1), [])), a;
}
function _i(e, t) {
	let [n, i] = l(t ? "open" : "closed");
	switch (n) {
		case "open":
			t || i("exiting");
			break;
		case "closed":
		case "exiting": t && i("open");
	}
	let a = n === "exiting";
	return vi(e, a, r(() => {
		i((e) => e === "exiting" ? "closed" : e);
	}, [])), a;
}
function vi(e, t, n) {
	h(() => {
		if (t && e.current) {
			if (!("getAnimations" in e.current)) {
				n();
				return;
			}
			let t = e.current.getAnimations();
			if (t.length === 0) {
				n();
				return;
			}
			let r = !1;
			return Promise.allSettled(t.map((e) => e.finished)).then(() => {
				r || d(() => {
					n();
				});
			}), () => {
				r = !0;
			};
		}
	}, [
		e,
		t,
		n
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria-components@1.20.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria-components/dist/private/Popover.mjs
var yi = /*#__PURE__*/ t(null);
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/useOverlayTrigger.mjs
function bi(e, t, n) {
	let { type: r } = e, { isOpen: i } = t;
	a(() => {
		n && n.current && fr.set(n.current, t.close);
	});
	let o;
	r === "menu" ? o = !0 : r === "listbox" && (o = "listbox");
	let s = me();
	return {
		triggerProps: {
			"aria-haspopup": o,
			"aria-expanded": i,
			"aria-controls": i ? s : void 0,
			onPress: t.toggle
		},
		overlayProps: { id: s }
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-stately@3.49.0_react@19.2.8/node_modules/react-stately/dist/private/menu/useMenuTriggerState.mjs
function xi(e) {
	let t = hi(e), [n, r] = l(null), [i, a] = l([]), o = () => {
		a([]), t.close();
	}, s = (e, t) => {
		a((n) => t > n.length ? n : [...n.slice(0, t), e]);
	}, c = (e, t) => {
		a((n) => n[t] === e ? n.slice(0, t) : n);
	};
	return {
		focusStrategy: n,
		...t,
		open(e = null) {
			r(e), t.open();
		},
		toggle(e = null) {
			r(e), t.toggle();
		},
		close() {
			o();
		},
		expandedKeysStack: i,
		openSubmenu: s,
		closeSubmenu: c
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria-components@1.20.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria-components/dist/private/Menu.mjs
var Si = /*#__PURE__*/ t(null);
(class extends Xt {
	static {
		this.type = "submenutrigger";
	}
	filter(e, t, n) {
		let r = e.getItem(this.firstChildKey);
		if (r && n(r.textValue, this)) {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
});
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/dialog/useDialog.mjs
function Ci(e, t) {
	let { role: n = "dialog" } = e, r = ge();
	r = e["aria-label"] ? void 0 : r;
	let i = ge();
	i = n === "alertdialog" && !e["aria-describedby"] ? i : void 0;
	let o = c(!1);
	a(() => {
		if (t.current && !Fe(t.current)) {
			rn(t.current);
			let e = setTimeout(() => {
				(T() === t.current || T() === document.body) && (o.current = !0, t.current && (t.current.blur(), rn(t.current)), o.current = !1);
			}, 500);
			return () => {
				clearTimeout(e);
			};
		}
	}, [t]), mi();
	let s = c(!1);
	a(() => {
		if (process.env.NODE_ENV !== "production" && !s.current && t.current) {
			let e = t.current, n = e.hasAttribute("aria-label"), r = e.hasAttribute("aria-labelledby");
			!n && !r && (console.warn("A dialog must have a title for accessibility. Either provide an aria-label or aria-labelledby prop, or render a heading element inside the dialog."), s.current = !0);
		}
	});
	let l = e["aria-describedby"] ?? i;
	return {
		dialogProps: {
			...Dn(e, { labelable: !0 }),
			role: n,
			tabIndex: -1,
			"aria-labelledby": e["aria-labelledby"] ?? r,
			"aria-describedby": l,
			onBlur: (e) => {
				o.current && e.stopPropagation();
			}
		},
		titleProps: { id: r },
		contentProps: { id: i }
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria-components@1.20.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria-components/dist/private/Dialog.mjs
var wi = /*#__PURE__*/ t(null), Z = /*#__PURE__*/ t(null);
function Ti(t) {
	let n = xi(t), r = c(null), { triggerProps: i, overlayProps: a } = bi({ type: "dialog" }, n, r);
	return i.id = me(), a["aria-labelledby"] = i.id, /*#__PURE__*/ e.createElement(Ce, { values: [
		[Z, n],
		[Si, n],
		[wi, a],
		[yi, {
			trigger: "DialogTrigger",
			triggerRef: r,
			id: a.id,
			"aria-labelledby": a["aria-labelledby"]
		}]
	] }, /*#__PURE__*/ e.createElement(ci, {
		...i,
		ref: r,
		isPressed: n.isOpen
	}, t.children));
}
var Ei = /*#__PURE__*/ n(function(t, n) {
	let r = t["aria-labelledby"];
	[t, n] = Ee(t, n, wi);
	let { dialogProps: a, titleProps: o, contentProps: s } = Ci({
		...t,
		"aria-labelledby": r
	}, n), c = i(Z);
	!a["aria-label"] && !a["aria-labelledby"] && (t["aria-labelledby"] ? a["aria-labelledby"] = t["aria-labelledby"] : process.env.NODE_ENV !== "production" && console.warn("If a Dialog does not contain a <Heading slot=\"title\">, it must have an aria-label or aria-labelledby attribute for accessibility."));
	let l = we({
		defaultClassName: "react-aria-Dialog",
		className: t.className,
		style: t.style,
		children: t.children,
		values: { close: c?.close || (() => {}) }
	}), u = Dn(t, { global: !0 });
	return /*#__PURE__*/ e.createElement(ke.section, {
		...b(u, l, a),
		render: t.render,
		ref: n,
		slot: t.slot || void 0
	}, /*#__PURE__*/ e.createElement(Ce, { values: [
		[Fn, { slots: {
			[Se]: {},
			title: {
				...o,
				level: 2
			}
		} }],
		[In, { slots: {
			[Se]: {},
			description: s
		} }],
		[Pn, { slots: {
			[Se]: {},
			close: { onPress: () => c?.close() }
		} }]
	] }, l.children));
});
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/overlays/useModalOverlay.mjs
function Di(e, t, n) {
	let { overlayProps: r, underlayProps: i } = hr({
		...e,
		isOpen: t.isOpen,
		onClose: t.close
	}, n);
	return vr({ isDisabled: !t.isOpen }), mi(), a(() => {
		if (t.isOpen && n.current) return dr([n.current], { shouldUseInert: !0 });
	}, [t.isOpen, n]), {
		modalProps: b(r),
		underlayProps: i
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria@3.51.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria/dist/private/utils/useViewportSize.mjs
var Q = typeof document < "u" && window.visualViewport;
function Oi() {
	let e = _(), [t, n] = l(() => e ? {
		width: 0,
		height: 0
	} : ki());
	return a(() => {
		let e = (e) => {
			n((t) => e.width === t.width && e.height === t.height ? t : e);
		}, t = () => {
			Q && Q.scale > 1 || e(ki());
		}, r, i = (t) => {
			Q && Q.scale > 1 || I(E(t)) && (r = requestAnimationFrame(() => {
				let t = T();
				(!t || !I(t)) && e({
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				});
			}));
		};
		return e(ki()), k() && A() && window.addEventListener("blur", i, !0), Q ? Q.addEventListener("resize", t) : window.addEventListener("resize", t), () => {
			cancelAnimationFrame(r), k() && A() && window.removeEventListener("blur", i, !0), Q ? Q.removeEventListener("resize", t) : window.removeEventListener("resize", t);
		};
	}, []), t;
}
function ki() {
	return {
		width: Q ? Math.min(Q.width * Q.scale, document.documentElement.clientWidth) : document.documentElement.clientWidth,
		height: Q ? Q.height * Q.scale : document.documentElement.clientHeight
	};
}
//#endregion
//#region ../../node_modules/.pnpm/react-aria-components@1.20.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-aria-components/dist/private/Modal.mjs
var Ai = /*#__PURE__*/ t(null), ji = /*#__PURE__*/ t(null), Mi = /*#__PURE__*/ n(function(t, n) {
	if (i(ji)) {
		if (process.env.NODE_ENV !== "production" && (t.onOpenChange || t.defaultOpen !== void 0 || t.isOpen !== void 0)) {
			let e = /* @__PURE__ */ new Set([
				"isDismissable",
				"isKeyboardDismissDisabled",
				"isOpen",
				"defaultOpen",
				"onOpenChange",
				"isEntering",
				"isExiting",
				"UNSTABLE_portalContainer",
				"shouldCloseOnInteractOutside"
			]), n = Object.keys(t).filter((t) => e.has(t));
			console.warn(`This modal is already wrapped in a ModalOverlay, props [${n.join(", ")}] should be placed on the ModalOverlay instead.`);
		}
		return /*#__PURE__*/ e.createElement(Ii, {
			...t,
			modalRef: n
		}, t.children);
	}
	let { isDismissable: r, isKeyboardDismissDisabled: a, isOpen: o, defaultOpen: s, onOpenChange: c, children: l, isEntering: u, isExiting: d, UNSTABLE_portalContainer: f, shouldCloseOnInteractOutside: p, ...m } = t;
	return /*#__PURE__*/ e.createElement(Pi, {
		isDismissable: r,
		isKeyboardDismissDisabled: a,
		isOpen: o,
		defaultOpen: s,
		onOpenChange: c,
		isEntering: u,
		isExiting: d,
		UNSTABLE_portalContainer: f,
		shouldCloseOnInteractOutside: p
	}, /*#__PURE__*/ e.createElement(Ii, {
		...m,
		modalRef: n
	}, l));
});
function Ni(t, n) {
	[t, n] = Ee(t, n, Ai);
	let r = i(Z), a = hi(t), o = t.isOpen != null || t.defaultOpen != null || !r ? a : r;
	o === r && process.env.NODE_ENV !== "production" && (t.onOpenChange || t.defaultOpen !== void 0 || t.isOpen !== void 0) && console.warn("This modals state is controlled by a trigger, place onOpenChange on the trigger instead.");
	let s = xe(n), l = c(null), u = _i(s, o.isOpen), d = _i(l, o.isOpen), f = u || d || t.isExiting || !1, p = _();
	return !o.isOpen && !f || p ? null : /*#__PURE__*/ e.createElement(Fi, {
		...t,
		state: o,
		isExiting: f,
		overlayRef: s,
		modalRef: l
	});
}
var Pi = /*#__PURE__*/ n(Ni);
function Fi({ UNSTABLE_portalContainer: t, ...n }) {
	let r = n.modalRef, { state: i } = n, { modalProps: a, underlayProps: o } = Di(n, i, r), s = gi(n.overlayRef) || n.isEntering || !1, c = we({
		...n,
		defaultClassName: "react-aria-ModalOverlay",
		values: {
			isEntering: s,
			isExiting: n.isExiting,
			state: i
		}
	}), l = Oi(), u, d;
	if (typeof document < "u") {
		let e = Ln(document.body) ? document.body : document.scrollingElement || document.documentElement, t = e.getBoundingClientRect().width % 1, n = e.getBoundingClientRect().height % 1;
		u = e.scrollWidth - t, d = e.scrollHeight - n;
	}
	let f = {
		...c.style,
		"--visual-viewport-width": l.width + "px",
		"--visual-viewport-height": l.height + "px",
		"--page-width": u === void 0 ? void 0 : u + "px",
		"--page-height": d === void 0 ? void 0 : d + "px"
	};
	return /*#__PURE__*/ e.createElement(pi, {
		isExiting: n.isExiting,
		portalContainer: t
	}, /*#__PURE__*/ e.createElement(ke.div, {
		...b(Dn(n, { global: !0 }), o),
		...c,
		style: f,
		ref: n.overlayRef,
		"data-entering": s || void 0,
		"data-exiting": n.isExiting || void 0
	}, /*#__PURE__*/ e.createElement(Ce, { values: [[ji, {
		modalProps: a,
		modalRef: r,
		isExiting: n.isExiting,
		isDismissable: n.isDismissable
	}], [Z, i]] }, c.children)));
}
function Ii(t) {
	let { modalProps: n, modalRef: r, isExiting: a, isDismissable: s } = i(ji), c = i(Z), l = xe(o(() => _e(t.modalRef, r), [t.modalRef, r])), u = gi(l), d = we({
		...t,
		defaultClassName: "react-aria-Modal",
		values: {
			isEntering: u,
			isExiting: a,
			state: c
		}
	});
	return /*#__PURE__*/ e.createElement(ke.div, {
		...b(Dn(t, { global: !0 }), n),
		...d,
		ref: l,
		"data-entering": u || void 0,
		"data-exiting": a || void 0
	}, s && /*#__PURE__*/ e.createElement(si, { onDismiss: c.close }), d.children);
}
var $ = {
	overlay: "_overlay_mve08_1",
	"overlay-fade-in": "_overlay-fade-in_mve08_1",
	"overlay-fade-out": "_overlay-fade-out_mve08_1",
	modal: "_modal_mve08_17",
	"modal-zoom-in": "_modal-zoom-in_mve08_1",
	"modal-zoom-out": "_modal-zoom-out_mve08_1",
	modalSmall: "_modalSmall_mve08_36",
	modalMedium: "_modalMedium_mve08_40",
	modalLarge: "_modalLarge_mve08_44",
	modalXlarge: "_modalXlarge_mve08_48",
	dialog: "_dialog_mve08_52"
}, Li = t(null);
function Ri() {
	return i(Li);
}
function zi({ isOpen: e, onOpenChange: t, children: n, trigger: r, isDismissable: i = !0, size: a = "medium", className: o }) {
	let s = a === "small" ? $.modalSmall : a === "large" ? $.modalLarge : a === "xlarge" ? $.modalXlarge : $.modalMedium;
	return /* @__PURE__ */ p(Ti, {
		isOpen: e,
		onOpenChange: t,
		children: [r, /* @__PURE__ */ f(Pi, {
			className: $.overlay,
			isDismissable: i,
			children: /* @__PURE__ */ f(Mi, {
				className: `${$.modal} ${s} ${o ?? ""}`,
				children: /* @__PURE__ */ f(Ei, {
					className: $.dialog,
					children: ({ close: e }) => /* @__PURE__ */ f(Li.Provider, {
						value: e,
						children: n
					})
				})
			})
		})]
	});
}
//#endregion
export { Ri as n, zi as t };

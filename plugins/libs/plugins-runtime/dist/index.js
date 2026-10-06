import "ses";
//#region src/lib/parse-translate.ts
var e = (e) => {
	let t = 0, n = 0;
	if (e instanceof Element && window.DOMMatrixReadOnly) {
		let r = window.getComputedStyle(e), i = new DOMMatrixReadOnly(r.transform);
		t = i.m41, n = i.m42;
	}
	return {
		x: t,
		y: n
	};
}, t = (t, n = t, r, i) => {
	let a = {
		x: 0,
		y: 0
	}, o = {
		x: 0,
		y: 0
	}, s = null, c = !1, l = () => {
		c && (c = !1, s = null, i?.end?.());
	}, u = (e) => {
		if (!c || e.pointerId !== s) return;
		let { clientX: t, clientY: i } = e, l = t - o.x + a.x, u = i - o.y + a.y;
		n.style.transform = `translate(${l}px, ${u}px)`, r?.();
	}, d = (e) => {
		e.pointerId === s && (t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), l());
	}, f = (e) => {
		e.pointerId === s && l();
	}, p = (e) => {
		e.pointerId === s && l();
	}, m = (r) => {
		r.button === 0 && (r.target instanceof Element && r.target.closest("button") || (r.preventDefault(), o = {
			x: r.clientX,
			y: r.clientY
		}, a = e(n), c = !0, s = r.pointerId, i?.start?.(), t.setPointerCapture(r.pointerId)));
	};
	return t.addEventListener("pointerdown", m), t.addEventListener("pointermove", u), t.addEventListener("pointerup", d), t.addEventListener("pointercancel", f), t.addEventListener("lostpointercapture", p), () => {
		t.removeEventListener("pointerdown", m), t.removeEventListener("pointermove", u), t.removeEventListener("pointerup", d), t.removeEventListener("pointercancel", f), t.removeEventListener("lostpointercapture", p), l();
	};
}, n = ":host{--spacing-4:.25rem;--spacing-8:calc(var(--spacing-4) * 2);--spacing-12:calc(var(--spacing-4) * 3);--spacing-16:calc(var(--spacing-4) * 4);--spacing-20:calc(var(--spacing-4) * 5);--spacing-24:calc(var(--spacing-4) * 6);--spacing-28:calc(var(--spacing-4) * 7);--spacing-32:calc(var(--spacing-4) * 8);--spacing-36:calc(var(--spacing-4) * 9);--spacing-40:calc(var(--spacing-4) * 10);--font-weight-regular:400;--font-weight-bold:500;--font-line-height-s:1.2;--font-line-height-m:1.4;--font-line-height-l:1.5;--font-size-s:12px;--font-size-m:14px;--font-size-l:16px}[data-theme]{background-color:var(--color-background-primary);color:var(--color-foreground-secondary)}::-webkit-resizer{display:none}.wrapper{z-index:1000;border:2px solid var(--color-background-quaternary);resize:both;-webkit-user-select:none;user-select:none;border-radius:15px;min-block-size:200px;min-inline-size:25px;padding:10px;position:absolute;inset-block-start:var(--modal-block-start);inset-inline-start:var(--modal-inline-start);overflow:hidden;box-shadow:0 0 10px #0000004d}.wrapper:after{content:\"\";cursor:se-resize;pointer-events:none;background-image:url(\"data:image/svg+xml,%3csvg%20width='16.022'%20xmlns='http://www.w3.org/2000/svg'%20height='16.022'%20viewBox='-0.011%20-0.011%2016.022%2016.022'%20fill='none'%3e%3cg%20data-testid='Group'%3e%3cg%20data-testid='Path'%3e%3cpath%20d='M.011%2015.917%2015.937-.011'%20class='fills'/%3e%3cg%20class='strokes'%3e%3cpath%20d='M.011%2015.917%2015.937-.011'%20style='fill:%20none;%20stroke-width:%201;%20stroke:%20rgb(111,%20111,%20111);%20stroke-opacity:%201;%20stroke-linecap:%20round;'%20class='stroke-shape'/%3e%3c/g%3e%3c/g%3e%3cg%20data-testid='Path'%3e%3cpath%20d='m11.207%2014.601%203.361-3.401'%20class='fills'/%3e%3cg%20class='strokes'%3e%3cpath%20d='m11.207%2014.601%203.361-3.401'%20style='fill:%20none;%20stroke-width:%201;%20stroke:%20rgb(111,%20111,%20111);%20stroke-opacity:%201;%20stroke-linecap:%20round;'%20class='stroke-shape'/%3e%3c/g%3e%3c/g%3e%3cg%20data-testid='Path'%3e%3cpath%20d='m4.884%2016.004%2011.112-11.17'%20class='fills'/%3e%3cg%20class='strokes'%3e%3cpath%20d='m4.884%2016.004%2011.112-11.17'%20style='fill:%20none;%20stroke-width:%201;%20stroke:%20rgb(111,%20111,%20111);%20stroke-opacity:%201;%20stroke-linecap:%20round;'%20class='stroke-shape'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e\");background-position:50%;block-size:1rem;inline-size:1rem;position:absolute;bottom:5px;right:5px}.inner{box-sizing:border-box;flex-direction:column;block-size:100%;padding:10px;display:flex;overflow:hidden}.inner>*{flex:1}.inner>.header{flex:0}.header{border-block-end:2px solid var(--color-background-quaternary);cursor:grab;touch-action:none;justify-content:space-between;align-items:center;padding-block-end:var(--spacing-4);display:flex}.wrapper.is-dragging .header{cursor:grabbing}button{cursor:pointer;background:0 0;border:0;padding:0}h1{font-size:var(--font-size-s);font-weight:var(--font-weight-bold);margin:0;margin-inline-end:var(--spacing-4)}iframe{border:none;block-size:100%;inline-size:100%}";
//#endregion
//#region src/lib/create-modal.ts
function r(e, t, n, r, a, o, s) {
	let c = document.createElement("plugin-modal");
	c.setTheme(n);
	let { width: l } = i(c, r?.width, r?.height), u = {
		blockStart: 40,
		inlineStart: window.innerWidth - l - 290
	};
	return r?.hidden && c.style.setProperty("display", "none"), c.style.setProperty("--modal-block-start", `${u.blockStart}px`), c.style.setProperty("--modal-inline-start", `${u.inlineStart}px`), c.setAttribute("title", e), c.setAttribute("iframe-src", t), a && c.setAttribute("allow-downloads", "true"), o && c.setAttribute("allow-clipboard-read", "true"), s && c.setAttribute("allow-clipboard-write", "true"), document.body.appendChild(c), c;
}
function i(t, n = 335, r = 590) {
	let i = t.shadowRoot?.querySelector(".wrapper"), a = 0, o = 0;
	if (i) {
		let e = i.getBoundingClientRect();
		a = e.x, o = e.y;
	}
	let s = window.innerWidth - 40, c = window.innerHeight - 40;
	n = Math.min(n, s), r = Math.min(r, c), n = Math.max(n, 200), r = Math.max(r, 200);
	let l = 0;
	a + n > s && (l = s - (a + n));
	let u = 0;
	o + r > c && (u = c - (o + r));
	let { x: d, y: f } = e(t.wrapper);
	return d += l, f += u, t.wrapper.style.transform = `translate(${d}px, ${f}px)`, t.wrapper.style.width = `${n}px`, t.wrapper.style.height = `${r}px`, {
		width: n,
		height: r
	};
}
//#endregion
//#region src/lib/modal/plugin-modal.ts
var a = "\n<svg width=\"16\"  height=\"16\"xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><g class=\"fills\"><rect rx=\"0\" ry=\"0\" width=\"16\" height=\"16\" class=\"frame-background\"/></g><g class=\"frame-children\"><path d=\"M11.997 3.997 8 8l-3.997 4.003m-.006-8L8 8l4.003 3.997\" class=\"fills\"/><g class=\"strokes\"><path d=\"M11.997 3.997 8 8l-3.997 4.003m-.006-8L8 8l4.003 3.997\" style=\"fill: none; stroke-width: 1; stroke: rgb(143, 157, 163); stroke-opacity: 1; stroke-linecap: round;\" class=\"stroke-shape\"/></g></g></svg>", o = 300, s = "--z-index-set", c = class extends HTMLElement {
	constructor() {
		super(), this.wrapper = document.createElement("div"), this.#e = document.createElement("div"), this.#t = null, this.attachShadow({ mode: "open" });
	}
	#e;
	#t;
	setTheme(e) {
		this.wrapper && this.wrapper.setAttribute("data-theme", e);
	}
	resize(e, t) {
		this.wrapper && i(this, e, t);
	}
	disconnectedCallback() {
		this.#t?.();
	}
	calculateZIndex() {
		let e = document.querySelectorAll("plugin-modal"), t = Array.from(e).filter((e) => e !== this).map((e) => Number(e.style.zIndex)), n = getComputedStyle(this).getPropertyValue(s).trim(), r = Number(n), i = Number.isFinite(r) && r > 0 ? r : o, a = Math.max(...t, i);
		this.style.zIndex = (a + 1).toString();
	}
	connectedCallback() {
		let e = this.getAttribute("title"), r = this.getAttribute("iframe-src"), i = this.getAttribute("allow-downloads") || !1, o = this.getAttribute("allow-clipboard-read") || !1, s = this.getAttribute("allow-clipboard-write") || !1;
		if (!e || !r) throw Error("title and iframe-src attributes are required");
		if (!this.shadowRoot) throw Error("Error creating shadow root");
		this.#e.classList.add("inner"), this.wrapper.classList.add("wrapper"), this.wrapper.style.maxInlineSize = "90vw", this.wrapper.style.maxBlockSize = "90vh";
		let c = document.createElement("div");
		c.classList.add("header");
		let l = document.createElement("h1");
		l.textContent = e, c.appendChild(l);
		let u = document.createElement("button");
		u.setAttribute("type", "button"), u.innerHTML = `<div class="close">${a}</div>`, u.addEventListener("click", () => {
			this.shadowRoot && this.shadowRoot.dispatchEvent(new CustomEvent("close", {
				composed: !0,
				bubbles: !0
			}));
		}), c.appendChild(u);
		let d = document.createElement("iframe");
		d.src = r;
		let f = [];
		o && f.push("clipboard-read"), s && f.push("clipboard-write"), d.allow = f.join("; "), d.sandbox.add("allow-scripts", "allow-forms", "allow-modals", "allow-popups", "allow-popups-to-escape-sandbox", "allow-storage-access-by-user-activation", "allow-same-origin"), i && d.sandbox.add("allow-downloads"), d.addEventListener("load", () => {
			this.shadowRoot?.dispatchEvent(new CustomEvent("load", {
				composed: !0,
				bubbles: !0
			}));
		}), this.#t = t(c, this.wrapper, () => {
			this.calculateZIndex();
		}, {
			start: () => {
				this.wrapper.classList.add("is-dragging");
			},
			end: () => {
				this.wrapper.classList.remove("is-dragging");
			}
		}), this.addEventListener("message", (e) => {
			if (d.contentWindow) try {
				d.contentWindow.postMessage(e.detail, "*");
			} catch (e) {
				console.error("plugin modal: failed to send message to iframe via postMessage.", e);
			}
		}), this.shadowRoot.appendChild(this.wrapper), this.wrapper.appendChild(this.#e), this.#e.appendChild(c), this.#e.appendChild(d);
		let p = document.createElement("style");
		p.textContent = n, this.shadowRoot.appendChild(p), this.calculateZIndex();
	}
	size() {
		return {
			width: Number(this.wrapper.style.width.replace("px", "") || "300"),
			height: Number(this.wrapper.style.height.replace("px", "") || "400")
		};
	}
};
customElements.define("plugin-modal", c);
//#endregion
//#region ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var l;
(function(e) {
	e.assertEqual = (e) => {};
	function t(e) {}
	e.assertIs = t;
	function n(e) {
		throw Error();
	}
	e.assertNever = n, e.arrayToEnum = (e) => {
		let t = {};
		for (let n of e) t[n] = n;
		return t;
	}, e.getValidEnumValues = (t) => {
		let n = e.objectKeys(t).filter((e) => typeof t[t[e]] != "number"), r = {};
		for (let e of n) r[e] = t[e];
		return e.objectValues(r);
	}, e.objectValues = (t) => e.objectKeys(t).map(function(e) {
		return t[e];
	}), e.objectKeys = typeof Object.keys == "function" ? (e) => Object.keys(e) : (e) => {
		let t = [];
		for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
		return t;
	}, e.find = (e, t) => {
		for (let n of e) if (t(n)) return n;
	}, e.isInteger = typeof Number.isInteger == "function" ? (e) => Number.isInteger(e) : (e) => typeof e == "number" && Number.isFinite(e) && Math.floor(e) === e;
	function r(e, t = " | ") {
		return e.map((e) => typeof e == "string" ? `'${e}'` : e).join(t);
	}
	e.joinValues = r, e.jsonStringifyReplacer = (e, t) => typeof t == "bigint" ? t.toString() : t;
})(l ||= {});
var u;
(function(e) {
	e.mergeShapes = (e, t) => ({
		...e,
		...t
	});
})(u ||= {});
var d = l.arrayToEnum([
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
]), f = (e) => {
	switch (typeof e) {
		case "undefined": return d.undefined;
		case "string": return d.string;
		case "number": return Number.isNaN(e) ? d.nan : d.number;
		case "boolean": return d.boolean;
		case "function": return d.function;
		case "bigint": return d.bigint;
		case "symbol": return d.symbol;
		case "object": return Array.isArray(e) ? d.array : e === null ? d.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? d.promise : typeof Map < "u" && e instanceof Map ? d.map : typeof Set < "u" && e instanceof Set ? d.set : typeof Date < "u" && e instanceof Date ? d.date : d.object;
		default: return d.unknown;
	}
}, p = l.arrayToEnum([
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
]), m = class e extends Error {
	get errors() {
		return this.issues;
	}
	constructor(e) {
		super(), this.issues = [], this.addIssue = (e) => {
			this.issues = [...this.issues, e];
		}, this.addIssues = (e = []) => {
			this.issues = [...this.issues, ...e];
		};
		let t = new.target.prototype;
		Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
	}
	format(e) {
		let t = e || function(e) {
			return e.message;
		}, n = { _errors: [] }, r = (e) => {
			for (let i of e.issues) if (i.code === "invalid_union") i.unionErrors.map(r);
			else if (i.code === "invalid_return_type") r(i.returnTypeError);
			else if (i.code === "invalid_arguments") r(i.argumentsError);
			else if (i.path.length === 0) n._errors.push(t(i));
			else {
				let e = n, r = 0;
				for (; r < i.path.length;) {
					let n = i.path[r];
					r === i.path.length - 1 ? (e[n] = e[n] || { _errors: [] }, e[n]._errors.push(t(i))) : e[n] = e[n] || { _errors: [] }, e = e[n], r++;
				}
			}
		};
		return r(this), n;
	}
	static assert(t) {
		if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, l.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(e = (e) => e.message) {
		let t = {}, n = [];
		for (let r of this.issues) if (r.path.length > 0) {
			let n = r.path[0];
			t[n] = t[n] || [], t[n].push(e(r));
		} else n.push(e(r));
		return {
			formErrors: n,
			fieldErrors: t
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
m.create = (e) => new m(e);
//#endregion
//#region ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var h = (e, t) => {
	let n;
	switch (e.code) {
		case p.invalid_type:
			n = e.received === d.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
			break;
		case p.invalid_literal:
			n = `Invalid literal value, expected ${JSON.stringify(e.expected, l.jsonStringifyReplacer)}`;
			break;
		case p.unrecognized_keys:
			n = `Unrecognized key(s) in object: ${l.joinValues(e.keys, ", ")}`;
			break;
		case p.invalid_union:
			n = "Invalid input";
			break;
		case p.invalid_union_discriminator:
			n = `Invalid discriminator value. Expected ${l.joinValues(e.options)}`;
			break;
		case p.invalid_enum_value:
			n = `Invalid enum value. Expected ${l.joinValues(e.options)}, received '${e.received}'`;
			break;
		case p.invalid_arguments:
			n = "Invalid function arguments";
			break;
		case p.invalid_return_type:
			n = "Invalid function return type";
			break;
		case p.invalid_date:
			n = "Invalid date";
			break;
		case p.invalid_string:
			typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : l.assertNever(e.validation) : n = e.validation === "regex" ? "Invalid" : `Invalid ${e.validation}`;
			break;
		case p.too_small:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" || e.type === "bigint" ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
			break;
		case p.too_big:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
			break;
		case p.custom:
			n = "Invalid input";
			break;
		case p.invalid_intersection_types:
			n = "Intersection results could not be merged";
			break;
		case p.not_multiple_of:
			n = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case p.not_finite:
			n = "Number must be finite";
			break;
		default: n = t.defaultError, l.assertNever(e);
	}
	return { message: n };
}, ee = h;
function g() {
	return ee;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
var _ = (e) => {
	let { data: t, path: n, errorMaps: r, issueData: i } = e, a = [...n, ...i.path || []], o = {
		...i,
		path: a
	};
	if (i.message !== void 0) return {
		...i,
		path: a,
		message: i.message
	};
	let s = "", c = r.filter((e) => !!e).slice().reverse();
	for (let e of c) s = e(o, {
		data: t,
		defaultError: s
	}).message;
	return {
		...i,
		path: a,
		message: s
	};
};
function v(e, t) {
	let n = g(), r = _({
		issueData: t,
		data: e.data,
		path: e.path,
		errorMaps: [
			e.common.contextualErrorMap,
			e.schemaErrorMap,
			n,
			n === h ? void 0 : h
		].filter((e) => !!e)
	});
	e.common.issues.push(r);
}
var y = class e {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		this.value === "valid" && (this.value = "dirty");
	}
	abort() {
		this.value !== "aborted" && (this.value = "aborted");
	}
	static mergeArray(e, t) {
		let n = [];
		for (let r of t) {
			if (r.status === "aborted") return b;
			r.status === "dirty" && e.dirty(), n.push(r.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
	static async mergeObjectAsync(t, n) {
		let r = [];
		for (let e of n) {
			let t = await e.key, n = await e.value;
			r.push({
				key: t,
				value: n
			});
		}
		return e.mergeObjectSync(t, r);
	}
	static mergeObjectSync(e, t) {
		let n = {};
		for (let r of t) {
			let { key: t, value: i } = r;
			if (t.status === "aborted" || i.status === "aborted") return b;
			t.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), t.value !== "__proto__" && (i.value !== void 0 || r.alwaysSet) && (n[t.value] = i.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
}, b = Object.freeze({ status: "aborted" }), x = (e) => ({
	status: "dirty",
	value: e
}), S = (e) => ({
	status: "valid",
	value: e
}), te = (e) => e.status === "aborted", ne = (e) => e.status === "dirty", C = (e) => e.status === "valid", re = (e) => typeof Promise < "u" && e instanceof Promise, w;
(function(e) {
	e.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, e.toString = (e) => typeof e == "string" ? e : e?.message;
})(w ||= {});
//#endregion
//#region ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
var T = class {
	constructor(e, t, n, r) {
		this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
	}
	get path() {
		return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
	}
}, ie = (e, t) => {
	if (C(t)) return {
		success: !0,
		data: t.value
	};
	if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			let t = new m(e.common.issues);
			return this._error = t, this._error;
		}
	};
};
function E(e) {
	if (!e) return {};
	let { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
	if (t && (n || r)) throw Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
	return t ? {
		errorMap: t,
		description: i
	} : {
		errorMap: (t, i) => {
			let { message: a } = e;
			return t.code === "invalid_enum_value" ? { message: a ?? i.defaultError } : i.data === void 0 ? { message: a ?? r ?? i.defaultError } : t.code === "invalid_type" ? { message: a ?? n ?? i.defaultError } : { message: i.defaultError };
		},
		description: i
	};
}
var D = class {
	get description() {
		return this._def.description;
	}
	_getType(e) {
		return f(e.data);
	}
	_getOrReturnCtx(e, t) {
		return t || {
			common: e.parent.common,
			data: e.data,
			parsedType: f(e.data),
			schemaErrorMap: this._def.errorMap,
			path: e.path,
			parent: e.parent
		};
	}
	_processInputParams(e) {
		return {
			status: new y(),
			ctx: {
				common: e.parent.common,
				data: e.data,
				parsedType: f(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		};
	}
	_parseSync(e) {
		let t = this._parse(e);
		if (re(t)) throw Error("Synchronous parse encountered promise.");
		return t;
	}
	_parseAsync(e) {
		let t = this._parse(e);
		return Promise.resolve(t);
	}
	parse(e, t) {
		let n = this.safeParse(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	safeParse(e, t) {
		let n = {
			common: {
				issues: [],
				async: t?.async ?? !1,
				contextualErrorMap: t?.errorMap
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: f(e)
		};
		return ie(n, this._parseSync({
			data: e,
			path: n.path,
			parent: n
		}));
	}
	"~validate"(e) {
		let t = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: f(e)
		};
		if (!this["~standard"].async) try {
			let n = this._parseSync({
				data: e,
				path: [],
				parent: t
			});
			return C(n) ? { value: n.value } : { issues: t.common.issues };
		} catch (e) {
			e?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
				issues: [],
				async: !0
			};
		}
		return this._parseAsync({
			data: e,
			path: [],
			parent: t
		}).then((e) => C(e) ? { value: e.value } : { issues: t.common.issues });
	}
	async parseAsync(e, t) {
		let n = await this.safeParseAsync(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	async safeParseAsync(e, t) {
		let n = {
			common: {
				issues: [],
				contextualErrorMap: t?.errorMap,
				async: !0
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: f(e)
		}, r = this._parse({
			data: e,
			path: n.path,
			parent: n
		});
		return ie(n, await (re(r) ? r : Promise.resolve(r)));
	}
	refine(e, t) {
		let n = (e) => typeof t == "string" || t === void 0 ? { message: t } : typeof t == "function" ? t(e) : t;
		return this._refinement((t, r) => {
			let i = e(t), a = () => r.addIssue({
				code: p.custom,
				...n(t)
			});
			return typeof Promise < "u" && i instanceof Promise ? i.then((e) => e ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
		});
	}
	refinement(e, t) {
		return this._refinement((n, r) => e(n) ? !0 : (r.addIssue(typeof t == "function" ? t(n, r) : t), !1));
	}
	_refinement(e) {
		return new W({
			schema: this,
			typeName: X.ZodEffects,
			effect: {
				type: "refinement",
				refinement: e
			}
		});
	}
	superRefine(e) {
		return this._refinement(e);
	}
	constructor(e) {
		this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (e) => this["~validate"](e)
		};
	}
	optional() {
		return G.create(this, this._def);
	}
	nullable() {
		return K.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return N.create(this);
	}
	promise() {
		return U.create(this, this._def);
	}
	or(e) {
		return I.create([this, e], this._def);
	}
	and(e) {
		return ze.create(this, e, this._def);
	}
	transform(e) {
		return new W({
			...E(this._def),
			schema: this,
			typeName: X.ZodEffects,
			effect: {
				type: "transform",
				transform: e
			}
		});
	}
	default(e) {
		let t = typeof e == "function" ? e : () => e;
		return new q({
			...E(this._def),
			innerType: this,
			defaultValue: t,
			typeName: X.ZodDefault
		});
	}
	brand() {
		return new Ke({
			typeName: X.ZodBranded,
			type: this,
			...E(this._def)
		});
	}
	catch(e) {
		let t = typeof e == "function" ? e : () => e;
		return new J({
			...E(this._def),
			innerType: this,
			catchValue: t,
			typeName: X.ZodCatch
		});
	}
	describe(e) {
		let t = this.constructor;
		return new t({
			...this._def,
			description: e
		});
	}
	pipe(e) {
		return qe.create(this, e);
	}
	readonly() {
		return Y.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}, ae = /^c[^\s-]{8,}$/i, oe = /^[0-9a-z]+$/, se = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ce = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, le = /^[a-z0-9_-]{21}$/i, ue = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, de = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, fe = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, pe = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", me, he = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ge = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, _e = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, ve = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, ye = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, be = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, xe = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Se = RegExp(`^${xe}$`);
function Ce(e) {
	let t = "[0-5]\\d";
	e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision ?? (t = `${t}(\\.\\d+)?`);
	let n = e.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function we(e) {
	return RegExp(`^${Ce(e)}$`);
}
function Te(e) {
	let t = `${xe}T${Ce(e)}`, n = [];
	return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, RegExp(`^${t}$`);
}
function Ee(e, t) {
	return !!((t === "v4" || !t) && he.test(e) || (t === "v6" || !t) && _e.test(e));
}
function De(e, t) {
	if (!ue.test(e)) return !1;
	try {
		let [n] = e.split(".");
		if (!n) return !1;
		let r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), i = JSON.parse(atob(r));
		return !(typeof i != "object" || !i || "typ" in i && i?.typ !== "JWT" || !i.alg || t && i.alg !== t);
	} catch {
		return !1;
	}
}
function Oe(e, t) {
	return !!((t === "v4" || !t) && ge.test(e) || (t === "v6" || !t) && ve.test(e));
}
var O = class e extends D {
	_parse(e) {
		if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== d.string) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.string,
				received: t.parsedType
			}), b;
		}
		let t = new y(), n;
		for (let r of this._def.checks) if (r.kind === "min") e.data.length < r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.too_small,
			minimum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "max") e.data.length > r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.too_big,
			maximum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "length") {
			let i = e.data.length > r.value, a = e.data.length < r.value;
			(i || a) && (n = this._getOrReturnCtx(e, n), i ? v(n, {
				code: p.too_big,
				maximum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}) : a && v(n, {
				code: p.too_small,
				minimum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}), t.dirty());
		} else if (r.kind === "email") fe.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "email",
			code: p.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "emoji") me ||= new RegExp(pe, "u"), me.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "emoji",
			code: p.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "uuid") ce.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "uuid",
			code: p.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "nanoid") le.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "nanoid",
			code: p.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid") ae.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "cuid",
			code: p.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid2") oe.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "cuid2",
			code: p.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "ulid") se.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "ulid",
			code: p.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "url") try {
			new URL(e.data);
		} catch {
			n = this._getOrReturnCtx(e, n), v(n, {
				validation: "url",
				code: p.invalid_string,
				message: r.message
			}), t.dirty();
		}
		else r.kind === "regex" ? (r.regex.lastIndex = 0, r.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "regex",
			code: p.invalid_string,
			message: r.message
		}), t.dirty())) : r.kind === "trim" ? e.data = e.data.trim() : r.kind === "includes" ? e.data.includes(r.value, r.position) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.invalid_string,
			validation: {
				includes: r.value,
				position: r.position
			},
			message: r.message
		}), t.dirty()) : r.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : r.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : r.kind === "startsWith" ? e.data.startsWith(r.value) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.invalid_string,
			validation: { startsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "endsWith" ? e.data.endsWith(r.value) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.invalid_string,
			validation: { endsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "datetime" ? Te(r).test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.invalid_string,
			validation: "datetime",
			message: r.message
		}), t.dirty()) : r.kind === "date" ? Se.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.invalid_string,
			validation: "date",
			message: r.message
		}), t.dirty()) : r.kind === "time" ? we(r).test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.invalid_string,
			validation: "time",
			message: r.message
		}), t.dirty()) : r.kind === "duration" ? de.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "duration",
			code: p.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "ip" ? Ee(e.data, r.version) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "ip",
			code: p.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "jwt" ? De(e.data, r.alg) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "jwt",
			code: p.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "cidr" ? Oe(e.data, r.version) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "cidr",
			code: p.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64" ? ye.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "base64",
			code: p.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64url" ? be.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "base64url",
			code: p.invalid_string,
			message: r.message
		}), t.dirty()) : l.assertNever(r);
		return {
			status: t.value,
			value: e.data
		};
	}
	_regex(e, t, n) {
		return this.refinement((t) => e.test(t), {
			validation: t,
			code: p.invalid_string,
			...w.errToObj(n)
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	email(e) {
		return this._addCheck({
			kind: "email",
			...w.errToObj(e)
		});
	}
	url(e) {
		return this._addCheck({
			kind: "url",
			...w.errToObj(e)
		});
	}
	emoji(e) {
		return this._addCheck({
			kind: "emoji",
			...w.errToObj(e)
		});
	}
	uuid(e) {
		return this._addCheck({
			kind: "uuid",
			...w.errToObj(e)
		});
	}
	nanoid(e) {
		return this._addCheck({
			kind: "nanoid",
			...w.errToObj(e)
		});
	}
	cuid(e) {
		return this._addCheck({
			kind: "cuid",
			...w.errToObj(e)
		});
	}
	cuid2(e) {
		return this._addCheck({
			kind: "cuid2",
			...w.errToObj(e)
		});
	}
	ulid(e) {
		return this._addCheck({
			kind: "ulid",
			...w.errToObj(e)
		});
	}
	base64(e) {
		return this._addCheck({
			kind: "base64",
			...w.errToObj(e)
		});
	}
	base64url(e) {
		return this._addCheck({
			kind: "base64url",
			...w.errToObj(e)
		});
	}
	jwt(e) {
		return this._addCheck({
			kind: "jwt",
			...w.errToObj(e)
		});
	}
	ip(e) {
		return this._addCheck({
			kind: "ip",
			...w.errToObj(e)
		});
	}
	cidr(e) {
		return this._addCheck({
			kind: "cidr",
			...w.errToObj(e)
		});
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
			precision: e?.precision === void 0 ? null : e?.precision,
			offset: e?.offset ?? !1,
			local: e?.local ?? !1,
			...w.errToObj(e?.message)
		});
	}
	date(e) {
		return this._addCheck({
			kind: "date",
			message: e
		});
	}
	time(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "time",
			precision: null,
			message: e
		}) : this._addCheck({
			kind: "time",
			precision: e?.precision === void 0 ? null : e?.precision,
			...w.errToObj(e?.message)
		});
	}
	duration(e) {
		return this._addCheck({
			kind: "duration",
			...w.errToObj(e)
		});
	}
	regex(e, t) {
		return this._addCheck({
			kind: "regex",
			regex: e,
			...w.errToObj(t)
		});
	}
	includes(e, t) {
		return this._addCheck({
			kind: "includes",
			value: e,
			position: t?.position,
			...w.errToObj(t?.message)
		});
	}
	startsWith(e, t) {
		return this._addCheck({
			kind: "startsWith",
			value: e,
			...w.errToObj(t)
		});
	}
	endsWith(e, t) {
		return this._addCheck({
			kind: "endsWith",
			value: e,
			...w.errToObj(t)
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e,
			...w.errToObj(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e,
			...w.errToObj(t)
		});
	}
	length(e, t) {
		return this._addCheck({
			kind: "length",
			value: e,
			...w.errToObj(t)
		});
	}
	nonempty(e) {
		return this.min(1, w.errToObj(e));
	}
	trim() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new e({
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
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
O.create = (e) => new O({
	checks: [],
	typeName: X.ZodString,
	coerce: e?.coerce ?? !1,
	...E(e)
});
function ke(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, i = n > r ? n : r;
	return Number.parseInt(e.toFixed(i).replace(".", "")) % Number.parseInt(t.toFixed(i).replace(".", "")) / 10 ** i;
}
var Ae = class e extends D {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
	}
	_parse(e) {
		if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== d.number) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.number,
				received: t.parsedType
			}), b;
		}
		let t, n = new y();
		for (let r of this._def.checks) r.kind === "int" ? l.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.invalid_type,
			expected: "integer",
			received: "float",
			message: r.message
		}), n.dirty()) : r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.too_small,
			minimum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.too_big,
			maximum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? ke(e.data, r.value) !== 0 && (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : r.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.not_finite,
			message: r.message
		}), n.dirty()) : l.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, w.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, w.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, w.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, w.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: w.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	int(e) {
		return this._addCheck({
			kind: "int",
			message: w.toString(e)
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: w.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: w.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: w.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: w.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: w.toString(t)
		});
	}
	finite(e) {
		return this._addCheck({
			kind: "finite",
			message: w.toString(e)
		});
	}
	safe(e) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: -(2 ** 53 - 1),
			message: w.toString(e)
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: 2 ** 53 - 1,
			message: w.toString(e)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && l.isInteger(e.value));
	}
	get isFinite() {
		let e = null, t = null;
		for (let n of this._def.checks) if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return !0;
		else n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
		return Number.isFinite(t) && Number.isFinite(e);
	}
};
Ae.create = (e) => new Ae({
	checks: [],
	typeName: X.ZodNumber,
	coerce: e?.coerce || !1,
	...E(e)
});
var je = class e extends D {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte;
	}
	_parse(e) {
		if (this._def.coerce) try {
			e.data = BigInt(e.data);
		} catch {
			return this._getInvalidInput(e);
		}
		if (this._getType(e) !== d.bigint) return this._getInvalidInput(e);
		let t, n = new y();
		for (let r of this._def.checks) r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.too_small,
			type: "bigint",
			minimum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.too_big,
			type: "bigint",
			maximum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: p.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : l.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	_getInvalidInput(e) {
		let t = this._getOrReturnCtx(e);
		return v(t, {
			code: p.invalid_type,
			expected: d.bigint,
			received: t.parsedType
		}), b;
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, w.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, w.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, w.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, w.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: w.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: w.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: w.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: w.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: w.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: w.toString(t)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
je.create = (e) => new je({
	checks: [],
	typeName: X.ZodBigInt,
	coerce: e?.coerce ?? !1,
	...E(e)
});
var Me = class extends D {
	_parse(e) {
		if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== d.boolean) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.boolean,
				received: t.parsedType
			}), b;
		}
		return S(e.data);
	}
};
Me.create = (e) => new Me({
	typeName: X.ZodBoolean,
	coerce: e?.coerce || !1,
	...E(e)
});
var Ne = class e extends D {
	_parse(e) {
		if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== d.date) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.date,
				received: t.parsedType
			}), b;
		}
		if (Number.isNaN(e.data.getTime())) return v(this._getOrReturnCtx(e), { code: p.invalid_date }), b;
		let t = new y(), n;
		for (let r of this._def.checks) r.kind === "min" ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.too_small,
			message: r.message,
			inclusive: !0,
			exact: !1,
			minimum: r.value,
			type: "date"
		}), t.dirty()) : r.kind === "max" ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: p.too_big,
			message: r.message,
			inclusive: !0,
			exact: !1,
			maximum: r.value,
			type: "date"
		}), t.dirty()) : l.assertNever(r);
		return {
			status: t.value,
			value: new Date(e.data.getTime())
		};
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e.getTime(),
			message: w.toString(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e.getTime(),
			message: w.toString(t)
		});
	}
	get minDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
	get maxDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
};
Ne.create = (e) => new Ne({
	checks: [],
	coerce: e?.coerce || !1,
	typeName: X.ZodDate,
	...E(e)
});
var Pe = class extends D {
	_parse(e) {
		if (this._getType(e) !== d.symbol) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.symbol,
				received: t.parsedType
			}), b;
		}
		return S(e.data);
	}
};
Pe.create = (e) => new Pe({
	typeName: X.ZodSymbol,
	...E(e)
});
var k = class extends D {
	_parse(e) {
		if (this._getType(e) !== d.undefined) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.undefined,
				received: t.parsedType
			}), b;
		}
		return S(e.data);
	}
};
k.create = (e) => new k({
	typeName: X.ZodUndefined,
	...E(e)
});
var A = class extends D {
	_parse(e) {
		if (this._getType(e) !== d.null) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.null,
				received: t.parsedType
			}), b;
		}
		return S(e.data);
	}
};
A.create = (e) => new A({
	typeName: X.ZodNull,
	...E(e)
});
var Fe = class extends D {
	constructor() {
		super(...arguments), this._any = !0;
	}
	_parse(e) {
		return S(e.data);
	}
};
Fe.create = (e) => new Fe({
	typeName: X.ZodAny,
	...E(e)
});
var j = class extends D {
	constructor() {
		super(...arguments), this._unknown = !0;
	}
	_parse(e) {
		return S(e.data);
	}
};
j.create = (e) => new j({
	typeName: X.ZodUnknown,
	...E(e)
});
var M = class extends D {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return v(t, {
			code: p.invalid_type,
			expected: d.never,
			received: t.parsedType
		}), b;
	}
};
M.create = (e) => new M({
	typeName: X.ZodNever,
	...E(e)
});
var Ie = class extends D {
	_parse(e) {
		if (this._getType(e) !== d.undefined) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.void,
				received: t.parsedType
			}), b;
		}
		return S(e.data);
	}
};
Ie.create = (e) => new Ie({
	typeName: X.ZodVoid,
	...E(e)
});
var N = class e extends D {
	_parse(e) {
		let { ctx: t, status: n } = this._processInputParams(e), r = this._def;
		if (t.parsedType !== d.array) return v(t, {
			code: p.invalid_type,
			expected: d.array,
			received: t.parsedType
		}), b;
		if (r.exactLength !== null) {
			let e = t.data.length > r.exactLength.value, i = t.data.length < r.exactLength.value;
			(e || i) && (v(t, {
				code: e ? p.too_big : p.too_small,
				minimum: i ? r.exactLength.value : void 0,
				maximum: e ? r.exactLength.value : void 0,
				type: "array",
				inclusive: !0,
				exact: !0,
				message: r.exactLength.message
			}), n.dirty());
		}
		if (r.minLength !== null && t.data.length < r.minLength.value && (v(t, {
			code: p.too_small,
			minimum: r.minLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.minLength.message
		}), n.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (v(t, {
			code: p.too_big,
			maximum: r.maxLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.maxLength.message
		}), n.dirty()), t.common.async) return Promise.all([...t.data].map((e, n) => r.type._parseAsync(new T(t, e, t.path, n)))).then((e) => y.mergeArray(n, e));
		let i = [...t.data].map((e, n) => r.type._parseSync(new T(t, e, t.path, n)));
		return y.mergeArray(n, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, n) {
		return new e({
			...this._def,
			minLength: {
				value: t,
				message: w.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxLength: {
				value: t,
				message: w.toString(n)
			}
		});
	}
	length(t, n) {
		return new e({
			...this._def,
			exactLength: {
				value: t,
				message: w.toString(n)
			}
		});
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
N.create = (e, t) => new N({
	type: e,
	minLength: null,
	maxLength: null,
	exactLength: null,
	typeName: X.ZodArray,
	...E(t)
});
function P(e) {
	if (e instanceof F) {
		let t = {};
		for (let n in e.shape) {
			let r = e.shape[n];
			t[n] = G.create(P(r));
		}
		return new F({
			...e._def,
			shape: () => t
		});
	}
	return e instanceof N ? new N({
		...e._def,
		type: P(e.element)
	}) : e instanceof G ? G.create(P(e.unwrap())) : e instanceof K ? K.create(P(e.unwrap())) : e instanceof R ? R.create(e.items.map((e) => P(e))) : e;
}
var F = class e extends D {
	constructor() {
		super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape(), t = l.objectKeys(e);
		return this._cached = {
			shape: e,
			keys: t
		}, this._cached;
	}
	_parse(e) {
		if (this._getType(e) !== d.object) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.object,
				received: t.parsedType
			}), b;
		}
		let { status: t, ctx: n } = this._processInputParams(e), { shape: r, keys: i } = this._getCached(), a = [];
		if (!(this._def.catchall instanceof M && this._def.unknownKeys === "strip")) for (let e in n.data) i.includes(e) || a.push(e);
		let o = [];
		for (let e of i) {
			let t = r[e], i = n.data[e];
			o.push({
				key: {
					status: "valid",
					value: e
				},
				value: t._parse(new T(n, i, n.path, e)),
				alwaysSet: e in n.data
			});
		}
		if (this._def.catchall instanceof M) {
			let e = this._def.unknownKeys;
			if (e === "passthrough") for (let e of a) o.push({
				key: {
					status: "valid",
					value: e
				},
				value: {
					status: "valid",
					value: n.data[e]
				}
			});
			else if (e === "strict") a.length > 0 && (v(n, {
				code: p.unrecognized_keys,
				keys: a
			}), t.dirty());
			else if (e !== "strip") throw Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			let e = this._def.catchall;
			for (let t of a) {
				let r = n.data[t];
				o.push({
					key: {
						status: "valid",
						value: t
					},
					value: e._parse(new T(n, r, n.path, t)),
					alwaysSet: t in n.data
				});
			}
		}
		return n.common.async ? Promise.resolve().then(async () => {
			let e = [];
			for (let t of o) {
				let n = await t.key, r = await t.value;
				e.push({
					key: n,
					value: r,
					alwaysSet: t.alwaysSet
				});
			}
			return e;
		}).then((e) => y.mergeObjectSync(t, e)) : y.mergeObjectSync(t, o);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return w.errToObj, new e({
			...this._def,
			unknownKeys: "strict",
			...t === void 0 ? {} : { errorMap: (e, n) => {
				let r = this._def.errorMap?.(e, n).message ?? n.defaultError;
				return e.code === "unrecognized_keys" ? { message: w.errToObj(t).message ?? r } : { message: r };
			} }
		});
	}
	strip() {
		return new e({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new e({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(t) {
		return new e({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...t
			})
		});
	}
	merge(t) {
		return new e({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...t._def.shape()
			}),
			typeName: X.ZodObject
		});
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	catchall(t) {
		return new e({
			...this._def,
			catchall: t
		});
	}
	pick(t) {
		let n = {};
		for (let e of l.objectKeys(t)) t[e] && this.shape[e] && (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	omit(t) {
		let n = {};
		for (let e of l.objectKeys(this.shape)) t[e] || (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	deepPartial() {
		return P(this);
	}
	partial(t) {
		let n = {};
		for (let e of l.objectKeys(this.shape)) {
			let r = this.shape[e];
			n[e] = t && !t[e] ? r : r.optional();
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	required(t) {
		let n = {};
		for (let e of l.objectKeys(this.shape)) if (t && !t[e]) n[e] = this.shape[e];
		else {
			let t = this.shape[e];
			for (; t instanceof G;) t = t._def.innerType;
			n[e] = t;
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	keyof() {
		return We(l.objectKeys(this.shape));
	}
};
F.create = (e, t) => new F({
	shape: () => e,
	unknownKeys: "strip",
	catchall: M.create(),
	typeName: X.ZodObject,
	...E(t)
}), F.strictCreate = (e, t) => new F({
	shape: () => e,
	unknownKeys: "strict",
	catchall: M.create(),
	typeName: X.ZodObject,
	...E(t)
}), F.lazycreate = (e, t) => new F({
	shape: e,
	unknownKeys: "strip",
	catchall: M.create(),
	typeName: X.ZodObject,
	...E(t)
});
var I = class extends D {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = this._def.options;
		function r(e) {
			for (let t of e) if (t.result.status === "valid") return t.result;
			for (let n of e) if (n.result.status === "dirty") return t.common.issues.push(...n.ctx.common.issues), n.result;
			let n = e.map((e) => new m(e.ctx.common.issues));
			return v(t, {
				code: p.invalid_union,
				unionErrors: n
			}), b;
		}
		if (t.common.async) return Promise.all(n.map(async (e) => {
			let n = {
				...t,
				common: {
					...t.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await e._parseAsync({
					data: t.data,
					path: t.path,
					parent: n
				}),
				ctx: n
			};
		})).then(r);
		{
			let e, r = [];
			for (let i of n) {
				let n = {
					...t,
					common: {
						...t.common,
						issues: []
					},
					parent: null
				}, a = i._parseSync({
					data: t.data,
					path: t.path,
					parent: n
				});
				if (a.status === "valid") return a;
				a.status === "dirty" && !e && (e = {
					result: a,
					ctx: n
				}), n.common.issues.length && r.push(n.common.issues);
			}
			if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
			let i = r.map((e) => new m(e));
			return v(t, {
				code: p.invalid_union,
				unionErrors: i
			}), b;
		}
	}
	get options() {
		return this._def.options;
	}
};
I.create = (e, t) => new I({
	options: e,
	typeName: X.ZodUnion,
	...E(t)
});
var L = (e) => e instanceof z ? L(e.schema) : e instanceof W ? L(e.innerType()) : e instanceof B ? [e.value] : e instanceof V ? e.options : e instanceof H ? l.objectValues(e.enum) : e instanceof q ? L(e._def.innerType) : e instanceof k ? [void 0] : e instanceof A ? [null] : e instanceof G ? [void 0, ...L(e.unwrap())] : e instanceof K ? [null, ...L(e.unwrap())] : e instanceof Ke || e instanceof Y ? L(e.unwrap()) : e instanceof J ? L(e._def.innerType) : [], Le = class e extends D {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== d.object) return v(t, {
			code: p.invalid_type,
			expected: d.object,
			received: t.parsedType
		}), b;
		let n = this.discriminator, r = t.data[n], i = this.optionsMap.get(r);
		return i ? t.common.async ? i._parseAsync({
			data: t.data,
			path: t.path,
			parent: t
		}) : i._parseSync({
			data: t.data,
			path: t.path,
			parent: t
		}) : (v(t, {
			code: p.invalid_union_discriminator,
			options: Array.from(this.optionsMap.keys()),
			path: [n]
		}), b);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(t, n, r) {
		let i = /* @__PURE__ */ new Map();
		for (let e of n) {
			let n = L(e.shape[t]);
			if (!n.length) throw Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
			for (let r of n) {
				if (i.has(r)) throw Error(`Discriminator property ${String(t)} has duplicate value ${String(r)}`);
				i.set(r, e);
			}
		}
		return new e({
			typeName: X.ZodDiscriminatedUnion,
			discriminator: t,
			options: n,
			optionsMap: i,
			...E(r)
		});
	}
};
function Re(e, t) {
	let n = f(e), r = f(t);
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (n === d.object && r === d.object) {
		let n = l.objectKeys(t), r = l.objectKeys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = Re(e[n], t[n]);
			if (!r.valid) return { valid: !1 };
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (n === d.array && r === d.array) {
		if (e.length !== t.length) return { valid: !1 };
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Re(i, a);
			if (!o.valid) return { valid: !1 };
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return n === d.date && r === d.date && +e == +t ? {
		valid: !0,
		data: e
	} : { valid: !1 };
}
var ze = class extends D {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = (e, r) => {
			if (te(e) || te(r)) return b;
			let i = Re(e.value, r.value);
			return i.valid ? ((ne(e) || ne(r)) && t.dirty(), {
				status: t.value,
				value: i.data
			}) : (v(n, { code: p.invalid_intersection_types }), b);
		};
		return n.common.async ? Promise.all([this._def.left._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		})]).then(([e, t]) => r(e, t)) : r(this._def.left._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}));
	}
};
ze.create = (e, t, n) => new ze({
	left: e,
	right: t,
	typeName: X.ZodIntersection,
	...E(n)
});
var R = class e extends D {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== d.array) return v(n, {
			code: p.invalid_type,
			expected: d.array,
			received: n.parsedType
		}), b;
		if (n.data.length < this._def.items.length) return v(n, {
			code: p.too_small,
			minimum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), b;
		!this._def.rest && n.data.length > this._def.items.length && (v(n, {
			code: p.too_big,
			maximum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), t.dirty());
		let r = [...n.data].map((e, t) => {
			let r = this._def.items[t] || this._def.rest;
			return r ? r._parse(new T(n, e, n.path, t)) : null;
		}).filter((e) => !!e);
		return n.common.async ? Promise.all(r).then((e) => y.mergeArray(t, e)) : y.mergeArray(t, r);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new e({
			...this._def,
			rest: t
		});
	}
};
R.create = (e, t) => {
	if (!Array.isArray(e)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new R({
		items: e,
		typeName: X.ZodTuple,
		rest: null,
		...E(t)
	});
};
var Be = class e extends D {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== d.object) return v(n, {
			code: p.invalid_type,
			expected: d.object,
			received: n.parsedType
		}), b;
		let r = [], i = this._def.keyType, a = this._def.valueType;
		for (let e in n.data) r.push({
			key: i._parse(new T(n, e, n.path, e)),
			value: a._parse(new T(n, n.data[e], n.path, e)),
			alwaysSet: e in n.data
		});
		return n.common.async ? y.mergeObjectAsync(t, r) : y.mergeObjectSync(t, r);
	}
	get element() {
		return this._def.valueType;
	}
	static create(t, n, r) {
		return n instanceof D ? new e({
			keyType: t,
			valueType: n,
			typeName: X.ZodRecord,
			...E(r)
		}) : new e({
			keyType: O.create(),
			valueType: t,
			typeName: X.ZodRecord,
			...E(n)
		});
	}
}, Ve = class extends D {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== d.map) return v(n, {
			code: p.invalid_type,
			expected: d.map,
			received: n.parsedType
		}), b;
		let r = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([e, t], a) => ({
			key: r._parse(new T(n, e, n.path, [a, "key"])),
			value: i._parse(new T(n, t, n.path, [a, "value"]))
		}));
		if (n.common.async) {
			let e = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (let n of a) {
					let r = await n.key, i = await n.value;
					if (r.status === "aborted" || i.status === "aborted") return b;
					(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
				}
				return {
					status: t.value,
					value: e
				};
			});
		}
		{
			let e = /* @__PURE__ */ new Map();
			for (let n of a) {
				let r = n.key, i = n.value;
				if (r.status === "aborted" || i.status === "aborted") return b;
				(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
			}
			return {
				status: t.value,
				value: e
			};
		}
	}
};
Ve.create = (e, t, n) => new Ve({
	valueType: t,
	keyType: e,
	typeName: X.ZodMap,
	...E(n)
});
var He = class e extends D {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== d.set) return v(n, {
			code: p.invalid_type,
			expected: d.set,
			received: n.parsedType
		}), b;
		let r = this._def;
		r.minSize !== null && n.data.size < r.minSize.value && (v(n, {
			code: p.too_small,
			minimum: r.minSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.minSize.message
		}), t.dirty()), r.maxSize !== null && n.data.size > r.maxSize.value && (v(n, {
			code: p.too_big,
			maximum: r.maxSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.maxSize.message
		}), t.dirty());
		let i = this._def.valueType;
		function a(e) {
			let n = /* @__PURE__ */ new Set();
			for (let r of e) {
				if (r.status === "aborted") return b;
				r.status === "dirty" && t.dirty(), n.add(r.value);
			}
			return {
				status: t.value,
				value: n
			};
		}
		let o = [...n.data.values()].map((e, t) => i._parse(new T(n, e, n.path, t)));
		return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
	}
	min(t, n) {
		return new e({
			...this._def,
			minSize: {
				value: t,
				message: w.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxSize: {
				value: t,
				message: w.toString(n)
			}
		});
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
He.create = (e, t) => new He({
	valueType: e,
	minSize: null,
	maxSize: null,
	typeName: X.ZodSet,
	...E(t)
});
var Ue = class e extends D {
	constructor() {
		super(...arguments), this.validate = this.implement;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== d.function) return v(t, {
			code: p.invalid_type,
			expected: d.function,
			received: t.parsedType
		}), b;
		function n(e, n) {
			return _({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					g(),
					h
				].filter((e) => !!e),
				issueData: {
					code: p.invalid_arguments,
					argumentsError: n
				}
			});
		}
		function r(e, n) {
			return _({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					g(),
					h
				].filter((e) => !!e),
				issueData: {
					code: p.invalid_return_type,
					returnTypeError: n
				}
			});
		}
		let i = { errorMap: t.common.contextualErrorMap }, a = t.data;
		if (this._def.returns instanceof U) {
			let e = this;
			return S(async function(...t) {
				let o = new m([]), s = await e._def.args.parseAsync(t, i).catch((e) => {
					throw o.addIssue(n(t, e)), o;
				}), c = await Reflect.apply(a, this, s);
				return await e._def.returns._def.type.parseAsync(c, i).catch((e) => {
					throw o.addIssue(r(c, e)), o;
				});
			});
		}
		{
			let e = this;
			return S(function(...t) {
				let o = e._def.args.safeParse(t, i);
				if (!o.success) throw new m([n(t, o.error)]);
				let s = Reflect.apply(a, this, o.data), c = e._def.returns.safeParse(s, i);
				if (!c.success) throw new m([r(s, c.error)]);
				return c.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...t) {
		return new e({
			...this._def,
			args: R.create(t).rest(j.create())
		});
	}
	returns(t) {
		return new e({
			...this._def,
			returns: t
		});
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
	static create(t, n, r) {
		return new e({
			args: t || R.create([]).rest(j.create()),
			returns: n || j.create(),
			typeName: X.ZodFunction,
			...E(r)
		});
	}
}, z = class extends D {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({
			data: t.data,
			path: t.path,
			parent: t
		});
	}
};
z.create = (e, t) => new z({
	getter: e,
	typeName: X.ZodLazy,
	...E(t)
});
var B = class extends D {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				received: t.data,
				code: p.invalid_literal,
				expected: this._def.value
			}), b;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
	get value() {
		return this._def.value;
	}
};
B.create = (e, t) => new B({
	value: e,
	typeName: X.ZodLiteral,
	...E(t)
});
function We(e, t) {
	return new V({
		values: e,
		typeName: X.ZodEnum,
		...E(t)
	});
}
var V = class e extends D {
	_parse(e) {
		if (typeof e.data != "string") {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return v(t, {
				expected: l.joinValues(n),
				received: t.parsedType,
				code: p.invalid_type
			}), b;
		}
		if (this._cache ||= new Set(this._def.values), !this._cache.has(e.data)) {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return v(t, {
				received: t.data,
				code: p.invalid_enum_value,
				options: n
			}), b;
		}
		return S(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	extract(t, n = this._def) {
		return e.create(t, {
			...this._def,
			...n
		});
	}
	exclude(t, n = this._def) {
		return e.create(this.options.filter((e) => !t.includes(e)), {
			...this._def,
			...n
		});
	}
};
V.create = We;
var H = class extends D {
	_parse(e) {
		let t = l.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
		if (n.parsedType !== d.string && n.parsedType !== d.number) {
			let e = l.objectValues(t);
			return v(n, {
				expected: l.joinValues(e),
				received: n.parsedType,
				code: p.invalid_type
			}), b;
		}
		if (this._cache ||= new Set(l.getValidEnumValues(this._def.values)), !this._cache.has(e.data)) {
			let e = l.objectValues(t);
			return v(n, {
				received: n.data,
				code: p.invalid_enum_value,
				options: e
			}), b;
		}
		return S(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
H.create = (e, t) => new H({
	values: e,
	typeName: X.ZodNativeEnum,
	...E(t)
});
var U = class extends D {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return t.parsedType !== d.promise && t.common.async === !1 ? (v(t, {
			code: p.invalid_type,
			expected: d.promise,
			received: t.parsedType
		}), b) : S((t.parsedType === d.promise ? t.data : Promise.resolve(t.data)).then((e) => this._def.type.parseAsync(e, {
			path: t.path,
			errorMap: t.common.contextualErrorMap
		})));
	}
};
U.create = (e, t) => new U({
	type: e,
	typeName: X.ZodPromise,
	...E(t)
});
var W = class extends D {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === X.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = this._def.effect || null, i = {
			addIssue: (e) => {
				v(n, e), e.fatal ? t.abort() : t.dirty();
			},
			get path() {
				return n.path;
			}
		};
		if (i.addIssue = i.addIssue.bind(i), r.type === "preprocess") {
			let e = r.transform(n.data, i);
			if (n.common.async) return Promise.resolve(e).then(async (e) => {
				if (t.value === "aborted") return b;
				let r = await this._def.schema._parseAsync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? b : r.status === "dirty" || t.value === "dirty" ? x(r.value) : r;
			});
			{
				if (t.value === "aborted") return b;
				let r = this._def.schema._parseSync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? b : r.status === "dirty" || t.value === "dirty" ? x(r.value) : r;
			}
		}
		if (r.type === "refinement") {
			let e = (e) => {
				let t = r.refinement(e, i);
				if (n.common.async) return Promise.resolve(t);
				if (t instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return e;
			};
			if (n.common.async === !1) {
				let r = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? b : (r.status === "dirty" && t.dirty(), e(r.value), {
					status: t.value,
					value: r.value
				});
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((n) => n.status === "aborted" ? b : (n.status === "dirty" && t.dirty(), e(n.value).then(() => ({
				status: t.value,
				value: n.value
			}))));
		}
		if (r.type === "transform") {
			if (n.common.async === !1) {
				let e = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				if (!C(e)) return b;
				let a = r.transform(e.value, i);
				if (a instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
				return {
					status: t.value,
					value: a
				};
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((e) => C(e) ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
				status: t.value,
				value: e
			})) : b);
		}
		l.assertNever(r);
	}
};
W.create = (e, t, n) => new W({
	schema: e,
	typeName: X.ZodEffects,
	effect: t,
	...E(n)
}), W.createWithPreprocess = (e, t, n) => new W({
	schema: t,
	effect: {
		type: "preprocess",
		transform: e
	},
	typeName: X.ZodEffects,
	...E(n)
});
var G = class extends D {
	_parse(e) {
		return this._getType(e) === d.undefined ? S(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
G.create = (e, t) => new G({
	innerType: e,
	typeName: X.ZodOptional,
	...E(t)
});
var K = class extends D {
	_parse(e) {
		return this._getType(e) === d.null ? S(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
K.create = (e, t) => new K({
	innerType: e,
	typeName: X.ZodNullable,
	...E(t)
});
var q = class extends D {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return t.parsedType === d.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
q.create = (e, t) => new q({
	innerType: e,
	typeName: X.ZodDefault,
	defaultValue: typeof t.default == "function" ? t.default : () => t.default,
	...E(t)
});
var J = class extends D {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = {
			...t,
			common: {
				...t.common,
				issues: []
			}
		}, r = this._def.innerType._parse({
			data: n.data,
			path: n.path,
			parent: { ...n }
		});
		return re(r) ? r.then((e) => ({
			status: "valid",
			value: e.status === "valid" ? e.value : this._def.catchValue({
				get error() {
					return new m(n.common.issues);
				},
				input: n.data
			})
		})) : {
			status: "valid",
			value: r.status === "valid" ? r.value : this._def.catchValue({
				get error() {
					return new m(n.common.issues);
				},
				input: n.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
J.create = (e, t) => new J({
	innerType: e,
	typeName: X.ZodCatch,
	catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
	...E(t)
});
var Ge = class extends D {
	_parse(e) {
		if (this._getType(e) !== d.nan) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: p.invalid_type,
				expected: d.nan,
				received: t.parsedType
			}), b;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
};
Ge.create = (e) => new Ge({
	typeName: X.ZodNaN,
	...E(e)
});
var Ke = class extends D {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return this._def.type._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	unwrap() {
		return this._def.type;
	}
}, qe = class e extends D {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.common.async) return (async () => {
			let e = await this._def.in._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? b : e.status === "dirty" ? (t.dirty(), x(e.value)) : this._def.out._parseAsync({
				data: e.value,
				path: n.path,
				parent: n
			});
		})();
		{
			let e = this._def.in._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? b : e.status === "dirty" ? (t.dirty(), {
				status: "dirty",
				value: e.value
			}) : this._def.out._parseSync({
				data: e.value,
				path: n.path,
				parent: n
			});
		}
	}
	static create(t, n) {
		return new e({
			in: t,
			out: n,
			typeName: X.ZodPipeline
		});
	}
}, Y = class extends D {
	_parse(e) {
		let t = this._def.innerType._parse(e), n = (e) => (C(e) && (e.value = Object.freeze(e.value)), e);
		return re(t) ? t.then((e) => n(e)) : n(t);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Y.create = (e, t) => new Y({
	innerType: e,
	typeName: X.ZodReadonly,
	...E(t)
}), F.lazycreate;
var X;
(function(e) {
	e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(X ||= {});
var Z = O.create, Je = Ae.create;
Ge.create, je.create;
var Ye = Me.create;
Ne.create, Pe.create, k.create, A.create, Fe.create, j.create, M.create, Ie.create;
var Xe = N.create, Ze = F.create;
F.strictCreate, I.create, Le.create, ze.create, R.create, Be.create, Ve.create, He.create;
var Qe = Ue.create;
z.create, B.create;
var $e = V.create;
H.create, U.create, W.create, G.create, K.create, W.createWithPreprocess, qe.create;
//#endregion
//#region src/lib/models/manifest.schema.ts
var et = Ze({
	pluginId: Z(),
	name: Z(),
	host: Z().url(),
	code: Z(),
	icon: Z().optional(),
	version: Je().optional(),
	description: Z().max(200).optional(),
	permissions: Xe($e([
		"content:read",
		"content:write",
		"library:read",
		"library:write",
		"user:read",
		"comment:read",
		"comment:write",
		"allow:downloads",
		"allow:localstorage",
		"clipboard:read",
		"clipboard:write"
	]))
});
//#endregion
//#region src/lib/parse-manifest.ts
function tt(e, t) {
	return new URL(t, e);
}
function nt(e, t, n) {
	let r = tt(e.host, t);
	for (let [e, t] of Object.entries(n)) r.searchParams.has(e) || r.searchParams.set(e, t);
	if (e.version === void 0 || e.version === 1) return r.toString();
	if (e.version === 2) {
		let e = r.searchParams.toString();
		return r.search = "", r.hash = `/?${e}`, r.toString();
	}
	throw Error("invalid manifest version");
}
function rt(e) {
	return fetch(e).then((e) => e.json()).then((e) => {
		if (!et.safeParse(e).success) throw Error("Invalid plugin manifest");
		return e;
	}).catch((e) => {
		throw console.error(e), e;
	});
}
function it(e) {
	return !e.host && !e.code.startsWith("http") ? Promise.resolve(e.code) : fetch(tt(e.host, e.code)).then((e) => {
		if (e.ok) return e.text();
		throw Error("Failed to load plugin code");
	});
}
//#endregion
//#region src/lib/models/open-ui-options.schema.ts
var at = Ze({
	width: Je().positive(),
	height: Je().positive(),
	hidden: Ye().optional()
}), ot = Qe().args(Z(), Z(), $e(["dark", "light"]), at.optional(), Ye().optional(), Ye().optional(), Ye().optional()).implement((e, t, n, i, a, o, s) => r(e, t, n, i, a, o, s));
//#endregion
//#region src/lib/validate-url.ts
function st() {
	let e = globalThis.penpotPublicURI;
	if (e) try {
		return new URL(e).origin;
	} catch {}
	return globalThis.location.origin;
}
function ct(e) {
	try {
		return new URL(e).origin === st();
	} catch {
		return !1;
	}
}
function lt(e, t) {
	if (!ct(t) && new URL(e).origin === st()) throw Error(`Plugin UI URL must not point to Penpot's own domain: ${e}`);
}
//#endregion
//#region src/lib/plugin-manager.ts
async function ut(e, t, n, r) {
	let i = await it(t), a = !1, o = !1, s = null, c = [], l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), d = !!t.permissions.find((e) => e === "allow:downloads"), f = !!t.permissions.find((e) => e === "clipboard:read"), p = !!t.permissions.find((e) => e === "clipboard:write"), m = e.addListener("themechange", (e) => {
		s?.setTheme(e);
	}), h = e.addListener("finish", () => {
		_(), e?.removeListener(h);
	}), ee = [], g = () => {
		S(m), ee.forEach((e) => {
			S(e);
		}), c = [], ee = [];
	}, _ = () => {
		g(), l.forEach(clearTimeout), l.clear(), u.forEach(clearInterval), u.clear(), s &&= (s.removeEventListener("close", _), s.remove(), null), o = !0, n();
	}, v = async () => {
		if (!a) {
			a = !0;
			return;
		}
		g(), i = await it(t), r(i);
	}, y = (n, r, i) => {
		let a = e.theme, o = nt(t, r, { theme: a });
		lt(o, t.host), s?.getAttribute("iframe-src") !== o && (s = ot(n, o, a, i, d, f, p), s.setTheme(a), s.addEventListener("close", _, { once: !0 }), s.addEventListener("load", v));
	}, b = (e) => {
		c.push(e);
	}, x = (t, n, r) => {
		let i = e.addListener(t, (...e) => {
			o || n(...e);
		}, r);
		return ee.push(i), i;
	}, S = (t) => {
		e.removeListener(t);
	};
	return {
		close: _,
		destroyListener: S,
		openModal: y,
		resizeModal: (e, t) => {
			at.parse({
				width: e,
				height: t
			}), s && s.resize(e, t);
		},
		getModal: () => s,
		registerListener: x,
		registerMessageCallback: b,
		sendMessage: (e) => {
			c.forEach((t) => t(e));
		},
		get manifest() {
			return t;
		},
		get context() {
			return e;
		},
		get timeouts() {
			return l;
		},
		get intervals() {
			return u;
		},
		get code() {
			return i;
		}
	};
}
//#endregion
//#region src/lib/api/index.ts
var dt = [
	"finish",
	"pagechange",
	"filechange",
	"selectionchange",
	"themechange",
	"shapechange",
	"contentsave"
];
function ft(e) {
	let t = (t) => {
		if (!e.manifest.permissions.includes(t)) throw Error(`Permission ${t} is not granted`);
	};
	return { penpot: {
		ui: {
			open: (t, n, r) => {
				e.openModal(t, n, r);
			},
			get size() {
				return e.getModal()?.size() || null;
			},
			resize: (t, n) => e.resizeModal(t, n),
			sendMessage(t, n = !1) {
				let r;
				try {
					r = structuredClone(t);
				} catch (e) {
					let t = "plugin sendMessage: the message could not be cloned. Ensure the message does not contain functions, DOM nodes, or other non-serializable values.";
					if (n) throw Error(t + " Original error: " + (e instanceof Error ? e.message : String(e)), { cause: e });
					console.error(t, e);
					return;
				}
				let i = new CustomEvent("message", { detail: r });
				e.getModal()?.dispatchEvent(i);
			},
			onMessage: (t) => {
				Qe().parse(t), e.registerMessageCallback(t);
			}
		},
		utils: {
			geometry: { center(e) {
				return window.app.plugins.public_utils.centerShapes(e);
			} },
			types: {
				isBoard(e) {
					return e.type === "board";
				},
				isGroup(e) {
					return e.type === "group";
				},
				isMask(e) {
					return e.type === "group" && e.isMask();
				},
				isBool(e) {
					return e.type === "boolean";
				},
				isRectangle(e) {
					return e.type === "rectangle";
				},
				isPath(e) {
					return e.type === "path";
				},
				isText(e) {
					return e.type === "text";
				},
				isEllipse(e) {
					return e.type === "ellipse";
				},
				isSVG(e) {
					return e.type === "svg-raw";
				},
				isVariantContainer(e) {
					return e.type === "board" && e.isVariantContainer();
				},
				isVariantComponent(e) {
					return e.isVariant();
				}
			}
		},
		closePlugin: () => {
			e.close();
		},
		on(n, r, i) {
			return $e(dt).parse(n), Qe().parse(r), t("content:read"), e.registerListener(n, r, i);
		},
		off(t) {
			e.destroyListener(t);
		},
		get version() {
			return e.context.version;
		},
		get root() {
			return t("content:read"), e.context.root;
		},
		get currentFile() {
			return t("content:read"), e.context.currentFile;
		},
		get currentPage() {
			return t("content:read"), e.context.currentPage;
		},
		get selection() {
			return t("content:read"), e.context.selection;
		},
		set selection(n) {
			t("content:read"), e.context.selection = n;
		},
		get viewport() {
			return e.context.viewport;
		},
		get history() {
			return e.context.history;
		},
		get library() {
			return t("library:read"), e.context.library;
		},
		get fonts() {
			return t("content:read"), e.context.fonts;
		},
		get flags() {
			return e.context.flags;
		},
		get currentUser() {
			return t("user:read"), e.context.currentUser;
		},
		get activeUsers() {
			return t("user:read"), e.context.activeUsers;
		},
		shapesColors(n) {
			return t("content:read"), e.context.shapesColors(n);
		},
		replaceColor(n, r, i) {
			return t("content:write"), e.context.replaceColor(n, r, i);
		},
		get theme() {
			return e.context.theme;
		},
		get localStorage() {
			return t("allow:localstorage"), e.context.localStorage;
		},
		createBoard() {
			return t("content:write"), e.context.createBoard();
		},
		createRectangle() {
			return t("content:write"), e.context.createRectangle();
		},
		createEllipse() {
			return t("content:write"), e.context.createEllipse();
		},
		createText(n) {
			return t("content:write"), e.context.createText(n);
		},
		createPath() {
			return t("content:write"), e.context.createPath();
		},
		createBoolean(n, r) {
			return t("content:write"), e.context.createBoolean(n, r);
		},
		createShapeFromSvg(n) {
			return t("content:write"), e.context.createShapeFromSvg(n);
		},
		createShapeFromSvgWithImages(n) {
			return t("content:write"), e.context.createShapeFromSvgWithImages(n);
		},
		group(n) {
			return t("content:write"), e.context.group(n);
		},
		ungroup(n, ...r) {
			t("content:write"), e.context.ungroup(n, ...r);
		},
		uploadMediaUrl(n, r) {
			return t("content:write"), e.context.uploadMediaUrl(n, r);
		},
		uploadMediaData(n, r, i) {
			return t("content:write"), e.context.uploadMediaData(n, r, i);
		},
		generateMarkup(n, r) {
			return t("content:read"), e.context.generateMarkup(n, r);
		},
		generateStyle(n, r) {
			return t("content:read"), e.context.generateStyle(n, r);
		},
		generateFontFaces(n) {
			return t("content:read"), e.context.generateFontFaces(n);
		},
		openViewer() {
			t("content:read"), e.context.openViewer();
		},
		createPage() {
			return t("content:write"), e.context.createPage();
		},
		openPage(n, r) {
			return t("content:read"), e.context.openPage(n, r ?? !1);
		},
		alignHorizontal(n, r) {
			t("content:write"), e.context.alignHorizontal(n, r);
		},
		alignVertical(n, r) {
			t("content:write"), e.context.alignVertical(n, r);
		},
		distributeHorizontal(n) {
			t("content:write"), e.context.distributeHorizontal(n);
		},
		distributeVertical(n) {
			t("content:write"), e.context.distributeVertical(n);
		},
		flatten(n) {
			return t("content:write"), e.context.flatten(n);
		},
		createVariantFromComponents(n) {
			return t("content:write"), e.context.createVariantFromComponents(n);
		},
		waitForLayoutUpdate(n) {
			return t("content:read"), e.context.waitForLayoutUpdate(n);
		}
	} };
}
//#endregion
//#region src/lib/ses.ts
var pt = !1, Q = {
	hardenIntrinsics: () => {
		pt || (pt = !0, hardenIntrinsics());
	},
	createCompartment: (e) => new Compartment(e),
	harden: (e) => harden(e),
	safeReturn(e) {
		return e == null ? e : harden(e);
	}
}, mt = /* @__PURE__ */ new WeakMap();
function ht(e) {
	return typeof e == "object" && e ? mt.has(e) : !1;
}
function gt(e) {
	typeof e == "object" && e && mt.set(e, !0);
}
function _t(e) {
	return function(...t) {
		try {
			let n = e(...t);
			return n instanceof Promise ? n.catch((e) => {
				throw gt(e), e;
			}) : n;
		} catch (e) {
			throw gt(e), e;
		}
	};
}
function vt(e, t) {
	Q.hardenIntrinsics();
	let n = ft(e), r = {
		penpot: new Proxy(n.penpot, { get(e, t, n) {
			let r = Reflect.get(e, t, n);
			return typeof r == "function" ? function(...t) {
				let n = r.apply(e, t);
				return Q.safeReturn(n);
			} : Q.safeReturn(r);
		} }),
		fetch: Q.harden((e, t) => {
			let n = {
				...t,
				credentials: "omit",
				headers: {
					...t?.headers,
					Authorization: ""
				}
			};
			return fetch(e, n).then((e) => {
				let t = {
					ok: e.ok,
					status: e.status,
					statusText: e.statusText,
					url: e.url,
					text: e.text.bind(e),
					json: e.json.bind(e)
				};
				return Q.safeReturn(t);
			});
		}),
		setTimeout: Q.harden((...[t, n]) => {
			let r = _t(typeof t == "function" ? t : () => {}), i = setTimeout(r, n);
			return e.timeouts.add(i), Q.safeReturn(i);
		}),
		clearTimeout: Q.harden((t) => {
			clearTimeout(t), e.timeouts.delete(t);
		}),
		setInterval: Q.harden((...[t, n]) => {
			let r = _t(typeof t == "function" ? t : () => {}), i = setInterval(r, n);
			return e.intervals.add(i), Q.safeReturn(i);
		}),
		clearInterval: Q.harden((t) => {
			clearInterval(t), e.intervals.delete(t);
		}),
		isFinite: Q.harden(isFinite),
		isNaN: Q.harden(isNaN),
		parseFloat: Q.harden(parseFloat),
		parseInt: Q.harden(parseInt),
		decodeURI: Q.harden(decodeURI),
		decodeURIComponent: Q.harden(decodeURIComponent),
		encodeURI: Q.harden(encodeURI),
		encodeURIComponent: Q.harden(encodeURIComponent),
		Object: Q.harden(Object),
		Boolean: Q.harden(Boolean),
		Symbol: Q.harden(Symbol),
		Number: Q.harden(Number),
		BigInt: Q.harden(BigInt),
		Math: Q.harden(Math),
		Date: Q.harden(Date),
		String: Q.harden(String),
		RegExp: Q.harden(RegExp),
		Array: Q.harden(Array),
		Int8Array: Q.harden(Int8Array),
		Uint8Array: Q.harden(Uint8Array),
		Uint8ClampedArray: Q.harden(Uint8ClampedArray),
		Int16Array: Q.harden(Int16Array),
		Uint16Array: Q.harden(Uint16Array),
		Int32Array: Q.harden(Int32Array),
		Uint32Array: Q.harden(Uint32Array),
		BigInt64Array: Q.harden(BigInt64Array),
		BigUint64Array: Q.harden(BigUint64Array),
		Float32Array: Q.harden(Float32Array),
		Float64Array: Q.harden(Float64Array),
		Map: Q.harden(Map),
		Set: Q.harden(Set),
		WeakMap: Q.harden(WeakMap),
		WeakSet: Q.harden(WeakSet),
		ArrayBuffer: Q.harden(ArrayBuffer),
		DataView: Q.harden(DataView),
		Atomics: Q.harden(Atomics),
		JSON: Q.harden(JSON),
		Promise: Q.harden(Promise),
		Proxy: Q.harden(Proxy),
		Intl: Q.harden(Intl),
		console: Q.harden(window.console),
		devicePixelRatio: window.devicePixelRatio,
		atob: Q.harden(window.atob.bind(null)),
		btoa: Q.harden(window.btoa.bind(null)),
		structuredClone: Q.harden(window.structuredClone)
	};
	t && (r = Object.assign(r, t));
	let i = Q.createCompartment(r);
	return {
		evaluate: () => {
			i.evaluate(e.code);
		},
		cleanGlobalThis: () => {
			Object.keys(r).forEach((e) => {
				delete i.globalThis[e];
			});
		},
		compartment: i
	};
}
//#endregion
//#region src/lib/create-plugin.ts
async function yt(e, t, n, r) {
	let i = async () => {
		try {
			o.evaluate();
		} catch (e) {
			throw gt(e), a.close(), e;
		}
	}, a = await ut(e, t, function() {
		o.cleanGlobalThis(), n();
	}, function() {
		i();
	}), o = vt(a, r);
	return await i(), {
		plugin: a,
		manifest: t,
		compartment: o
	};
}
//#endregion
//#region src/lib/load-plugin.ts
var $ = [], bt = null;
function xt(e) {
	bt = e;
}
var St = () => {
	$.forEach((e) => {
		e.manifest?.allowBackground || e.plugin.close();
	}), $ = [];
};
window.addEventListener("message", (e) => {
	try {
		for (let t of $) t.plugin.sendMessage(e.data);
	} catch (e) {
		console.error(e);
	}
});
var Ct = async function(e, t, n) {
	try {
		let r = bt && bt(e.pluginId);
		if (!r) return;
		St();
		let i = await yt(Q.harden(r), e, () => {
			$ = $.filter((e) => e !== i), t && t();
		}, n);
		$.push(i);
	} catch (e) {
		throw St(), e;
	}
}, wt = async function(e, t, n) {
	await Ct(e, t, n);
}, Tt = async function(e) {
	await wt(await rt(e));
}, Et = function(e) {
	let t = $.find((t) => t.manifest.pluginId === e);
	t && t.plugin.close();
};
console.log("%c[PLUGINS] Loading plugin system", "color: #008d7c"), repairIntrinsics({
	evalTaming: "unsafeEval",
	stackFiltering: "verbose",
	errorTaming: "unsafe",
	consoleTaming: "unsafe",
	errorTrapping: "none",
	unhandledRejectionTrapping: "none"
});
var Dt = globalThis, Ot = (e) => {
	try {
		console.log("%c[PLUGINS] Initialize runtime", "color: #008d7c"), xt(e), Dt.ɵcontext = e("00000000-0000-0000-0000-000000000000"), globalThis.ɵloadPlugin = wt, globalThis.ɵloadPluginByUrl = Tt, globalThis.ɵunloadPlugin = Et;
	} catch (e) {
		console.error(e);
	}
};
//#endregion
export { Ot as initPluginsRuntime, ht as isPluginError };

//# sourceMappingURL=index.js.map
//#region wdp-front-end-framework-sample/node_modules/@wdp-api/bim-api/dist/index.es.js
var $i = Object.defineProperty;
var Vi = (o, r, n) => r in o ? $i(o, r, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : o[r] = n;
var se = (o, r, n) => Vi(o, typeof r != "symbol" ? r + "" : r, n);
var Bs = class {
	constructor(r, n) {
		se(this, "subject");
		se(this, "level");
		this.subject = r, this.level = n ?? 10;
	}
	log(r, n, ...s) {
		if (typeof (s == null ? void 0 : s[0]) == "string" && s[0].match(/\%[sodif]?/gi)) {
			const a = s.shift(), u = /* @__PURE__ */ new Date();
			console.log(`${n}%c[${u.toLocaleTimeString()}.${u.getMilliseconds()}]::: %c${a}`, `color: ${r}`, "color: unset", ...s);
		} else for (const a of s) {
			const u = /* @__PURE__ */ new Date();
			console.log(`${n}%c[${u.toLocaleTimeString()}.${u.getMilliseconds()}]:::`, `color: ${r}`, a);
		}
	}
	error(r, ...n) {
		this.level !== 0 && (console.group(`%c${this.subject} %c ${r}`, "color: black; border-radius: 3px 0 0 3px; padding: 2px 2px 1px 10px; background: #ff4d4f", "border-radius: 0 3px 3px 0; padding: 2px 10px 1px 2px; background: #ff4d4f20"), this.log("#ff4d4f", "⭕", ...n), console.groupEnd());
	}
	info(r, ...n) {
		console.groupCollapsed(`%c${this.subject} %c ${r}`, "color: black; border-radius: 3px 0 0 3px; padding: 2px 2px 1px 10px; background: #00dc82", "border-radius: 0 3px 3px 0; padding: 2px 10px 1px 2px; background: #00dc8220"), this.log("#00dc82", "🚀", ...n), console.groupEnd();
	}
	warn(r, ...n) {
		console.group(`%c${this.subject} %c ${r}`, "color: black; border-radius: 3px 0 0 3px; padding: 2px 2px 1px 10px; background: #faad14", "border-radius: 0 3px 3px 0; padding: 2px 10px 1px 2px; background: #faad1420"), this.log("#faad14", "🔥", ...n), console.groupEnd();
	}
	lowLevel(r, ...n) {
		this.level < 1 || this.info(r, ...n);
	}
	highLevel(r, ...n) {
		this.level < 3 || this.warn(r, ...n);
	}
};
var Wi = (o) => !!o && o.constructor === Symbol, _n = Array.isArray, Ji = (o) => !!o && o.constructor === Object, Ms = (o) => !!(o && o.constructor && o.call && o.apply), vr = (o) => {
	try {
		return Number(o) === o;
	} catch {
		return !1;
	}
}, Xi = (o) => Object.prototype.toString.call(o) === "[object Date]", H = (o) => {
	if (o === !0 || o === !1 || o == null) return !0;
	if (vr(o)) return o === 0;
	if (Xi(o)) return isNaN(o.getTime());
	if (Ms(o) || Wi(o)) return !1;
	const r = o.length;
	if (vr(r)) return r === 0;
	const n = o.size;
	return vr(n) ? n === 0 : Object.keys(o).length === 0;
}, wt = (o, r) => {
	if (Object.is(o, r)) return !0;
	if (o instanceof Date && r instanceof Date) return o.getTime() === r.getTime();
	if (o instanceof RegExp && r instanceof RegExp) return o.toString() === r.toString();
	if (typeof o != "object" || o === null || typeof r != "object" || r === null) return !1;
	const n = Reflect.ownKeys(o), s = Reflect.ownKeys(r);
	if (n.length !== s.length) return !1;
	for (let a = 0; a < n.length; a++) if (!Reflect.has(r, n[a]) || !wt(o[n[a]], r[n[a]])) return !1;
	return !0;
};
function Yi(o, r) {
	if (!o || !o.length) return {};
	const n = Ms(r) ? r : _n(r) ? (s, a) => r[a] : (s, a) => r;
	return o.reduce((s, a, u) => (s[a] = n(a, u), s), {});
}
var Qi = (o, r, n) => o ? o.reduce((s, a, u) => (n(a, u) && s.push(r(a, u)), s), []) : [], Zi = (o, r) => {
	const n = o.reduce((s, a) => {
		const u = r(a);
		return s[u] || (s[u] = a), s;
	}, {});
	return Object.values(n);
}, We = (o, r) => !o || !r ? o ?? r ?? {} : Object.entries({
	...o,
	...r
}).reduce((n, [s, a]) => ({
	...n,
	[s]: Ji(o[s]) ? We(o[s], a) : a
}), {});
function Ls(o, r) {
	return function() {
		return o.apply(r, arguments);
	};
}
var { toString: eo } = Object.prototype, { getPrototypeOf: Rr } = Object, Cn = /* @__PURE__ */ ((o) => (r) => {
	const n = eo.call(r);
	return o[n] || (o[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Oe = (o) => (o = o.toLowerCase(), (r) => Cn(r) === o), In = (o) => (r) => typeof r === o, { isArray: St } = Array, Gt = In("undefined");
function to(o) {
	return o !== null && !Gt(o) && o.constructor !== null && !Gt(o.constructor) && Ie(o.constructor.isBuffer) && o.constructor.isBuffer(o);
}
var Fs = Oe("ArrayBuffer");
function no(o) {
	let r;
	return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? r = ArrayBuffer.isView(o) : r = o && o.buffer && Fs(o.buffer), r;
}
var ro = In("string"), Ie = In("function"), Gs = In("number"), xn = (o) => o !== null && typeof o == "object", so = (o) => o === !0 || o === !1, wn = (o) => {
	if (Cn(o) !== "object") return !1;
	const r = Rr(o);
	return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in o) && !(Symbol.iterator in o);
}, io = Oe("Date"), oo = Oe("File"), ao = Oe("Blob"), co = Oe("FileList"), uo = (o) => xn(o) && Ie(o.pipe), lo = (o) => {
	let r;
	return o && (typeof FormData == "function" && o instanceof FormData || Ie(o.append) && ((r = Cn(o)) === "formdata" || r === "object" && Ie(o.toString) && o.toString() === "[object FormData]"));
}, fo = Oe("URLSearchParams"), [ho, po, mo, yo] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(Oe), go = (o) => o.trim ? o.trim() : o.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Kt(o, r, { allOwnKeys: n = !1 } = {}) {
	if (o === null || typeof o > "u") return;
	let s, a;
	if (typeof o != "object" && (o = [o]), St(o)) for (s = 0, a = o.length; s < a; s++) r.call(null, o[s], s, o);
	else {
		const u = n ? Object.getOwnPropertyNames(o) : Object.keys(o), d = u.length;
		let h;
		for (s = 0; s < d; s++) h = u[s], r.call(null, o[h], h, o);
	}
}
function Ks(o, r) {
	r = r.toLowerCase();
	const n = Object.keys(o);
	let s = n.length, a;
	for (; s-- > 0;) if (a = n[s], r === a.toLowerCase()) return a;
	return null;
}
var ot = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, qs = (o) => !Gt(o) && o !== ot;
function Pr() {
	const { caseless: o } = qs(this) && this || {}, r = {}, n = (s, a) => {
		const u = o && Ks(r, a) || a;
		wn(r[u]) && wn(s) ? r[u] = Pr(r[u], s) : wn(s) ? r[u] = Pr({}, s) : St(s) ? r[u] = s.slice() : r[u] = s;
	};
	for (let s = 0, a = arguments.length; s < a; s++) arguments[s] && Kt(arguments[s], n);
	return r;
}
var bo = (o, r, n, { allOwnKeys: s } = {}) => (Kt(r, (a, u) => {
	n && Ie(a) ? o[u] = Ls(a, n) : o[u] = a;
}, { allOwnKeys: s }), o), vo = (o) => (o.charCodeAt(0) === 65279 && (o = o.slice(1)), o), wo = (o, r, n, s) => {
	o.prototype = Object.create(r.prototype, s), o.prototype.constructor = o, Object.defineProperty(o, "super", { value: r.prototype }), n && Object.assign(o.prototype, n);
}, So = (o, r, n, s) => {
	let a, u, d;
	const h = {};
	if (r = r || {}, o == null) return r;
	do {
		for (a = Object.getOwnPropertyNames(o), u = a.length; u-- > 0;) d = a[u], (!s || s(d, o, r)) && !h[d] && (r[d] = o[d], h[d] = !0);
		o = n !== !1 && Rr(o);
	} while (o && (!n || n(o, r)) && o !== Object.prototype);
	return r;
}, Ao = (o, r, n) => {
	o = String(o), (n === void 0 || n > o.length) && (n = o.length), n -= r.length;
	const s = o.indexOf(r, n);
	return s !== -1 && s === n;
}, _o = (o) => {
	if (!o) return null;
	if (St(o)) return o;
	let r = o.length;
	if (!Gs(r)) return null;
	const n = new Array(r);
	for (; r-- > 0;) n[r] = o[r];
	return n;
}, Eo = /* @__PURE__ */ ((o) => (r) => o && r instanceof o)(typeof Uint8Array < "u" && Rr(Uint8Array)), Po = (o, r) => {
	const s = (o && o[Symbol.iterator]).call(o);
	let a;
	for (; (a = s.next()) && !a.done;) {
		const u = a.value;
		r.call(o, u[0], u[1]);
	}
}, Co = (o, r) => {
	let n;
	const s = [];
	for (; (n = o.exec(r)) !== null;) s.push(n);
	return s;
}, Io = Oe("HTMLFormElement"), xo = (o) => o.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, s, a) {
	return s.toUpperCase() + a;
}), bs = (({ hasOwnProperty: o }) => (r, n) => o.call(r, n))(Object.prototype), ko = Oe("RegExp"), Us = (o, r) => {
	const n = Object.getOwnPropertyDescriptors(o), s = {};
	Kt(n, (a, u) => {
		let d;
		(d = r(a, u, o)) !== !1 && (s[u] = d || a);
	}), Object.defineProperties(o, s);
}, Oo = (o) => {
	Us(o, (r, n) => {
		if (Ie(o) && [
			"arguments",
			"caller",
			"callee"
		].indexOf(n) !== -1) return !1;
		const s = o[n];
		if (Ie(s)) {
			if (r.enumerable = !1, "writable" in r) {
				r.writable = !1;
				return;
			}
			r.set || (r.set = () => {
				throw Error("Can not rewrite read-only method '" + n + "'");
			});
		}
	});
}, No = (o, r) => {
	const n = {}, s = (a) => {
		a.forEach((u) => {
			n[u] = !0;
		});
	};
	return St(o) ? s(o) : s(String(o).split(r)), n;
}, Do = () => {}, Ro = (o, r) => o != null && Number.isFinite(o = +o) ? o : r, wr = "abcdefghijklmnopqrstuvwxyz", vs = "0123456789", Hs = {
	DIGIT: vs,
	ALPHA: wr,
	ALPHA_DIGIT: wr + wr.toUpperCase() + vs
}, To = (o = 16, r = Hs.ALPHA_DIGIT) => {
	let n = "";
	const { length: s } = r;
	for (; o--;) n += r[Math.random() * s | 0];
	return n;
};
function jo(o) {
	return !!(o && Ie(o.append) && o[Symbol.toStringTag] === "FormData" && o[Symbol.iterator]);
}
var Bo = (o) => {
	const r = new Array(10), n = (s, a) => {
		if (xn(s)) {
			if (r.indexOf(s) >= 0) return;
			if (!("toJSON" in s)) {
				r[a] = s;
				const u = St(s) ? [] : {};
				return Kt(s, (d, h) => {
					const b = n(d, a + 1);
					!Gt(b) && (u[h] = b);
				}), r[a] = void 0, u;
			}
		}
		return s;
	};
	return n(o, 0);
}, Mo = Oe("AsyncFunction"), Lo = (o) => o && (xn(o) || Ie(o)) && Ie(o.then) && Ie(o.catch), zs = ((o, r) => o ? setImmediate : r ? ((n, s) => (ot.addEventListener("message", ({ source: a, data: u }) => {
	a === ot && u === n && s.length && s.shift()();
}, !1), (a) => {
	s.push(a), ot.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", Ie(ot.postMessage)), N = {
	isArray: St,
	isArrayBuffer: Fs,
	isBuffer: to,
	isFormData: lo,
	isArrayBufferView: no,
	isString: ro,
	isNumber: Gs,
	isBoolean: so,
	isObject: xn,
	isPlainObject: wn,
	isReadableStream: ho,
	isRequest: po,
	isResponse: mo,
	isHeaders: yo,
	isUndefined: Gt,
	isDate: io,
	isFile: oo,
	isBlob: ao,
	isRegExp: ko,
	isFunction: Ie,
	isStream: uo,
	isURLSearchParams: fo,
	isTypedArray: Eo,
	isFileList: co,
	forEach: Kt,
	merge: Pr,
	extend: bo,
	trim: go,
	stripBOM: vo,
	inherits: wo,
	toFlatObject: So,
	kindOf: Cn,
	kindOfTest: Oe,
	endsWith: Ao,
	toArray: _o,
	forEachEntry: Po,
	matchAll: Co,
	isHTMLForm: Io,
	hasOwnProperty: bs,
	hasOwnProp: bs,
	reduceDescriptors: Us,
	freezeMethods: Oo,
	toObjectSet: No,
	toCamelCase: xo,
	noop: Do,
	toFiniteNumber: Ro,
	findKey: Ks,
	global: ot,
	isContextDefined: qs,
	ALPHABET: Hs,
	generateString: To,
	isSpecCompliantForm: jo,
	toJSONObject: Bo,
	isAsyncFn: Mo,
	isThenable: Lo,
	setImmediate: zs,
	asap: typeof queueMicrotask < "u" ? queueMicrotask.bind(ot) : typeof process < "u" && process.nextTick || zs
};
function Y(o, r, n, s, a) {
	Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (/* @__PURE__ */ new Error()).stack, this.message = o, this.name = "AxiosError", r && (this.code = r), n && (this.config = n), s && (this.request = s), a && (this.response = a, this.status = a.status ? a.status : null);
}
N.inherits(Y, Error, { toJSON: function() {
	return {
		message: this.message,
		name: this.name,
		description: this.description,
		number: this.number,
		fileName: this.fileName,
		lineNumber: this.lineNumber,
		columnNumber: this.columnNumber,
		stack: this.stack,
		config: N.toJSONObject(this.config),
		code: this.code,
		status: this.status
	};
} });
var $s = Y.prototype, Vs = {};
[
	"ERR_BAD_OPTION_VALUE",
	"ERR_BAD_OPTION",
	"ECONNABORTED",
	"ETIMEDOUT",
	"ERR_NETWORK",
	"ERR_FR_TOO_MANY_REDIRECTS",
	"ERR_DEPRECATED",
	"ERR_BAD_RESPONSE",
	"ERR_BAD_REQUEST",
	"ERR_CANCELED",
	"ERR_NOT_SUPPORT",
	"ERR_INVALID_URL"
].forEach((o) => {
	Vs[o] = { value: o };
});
Object.defineProperties(Y, Vs);
Object.defineProperty($s, "isAxiosError", { value: !0 });
Y.from = (o, r, n, s, a, u) => {
	const d = Object.create($s);
	return N.toFlatObject(o, d, function(b) {
		return b !== Error.prototype;
	}, (h) => h !== "isAxiosError"), Y.call(d, o.message, r, n, s, a), d.cause = o, d.name = o.name, u && Object.assign(d, u), d;
};
var Go = null;
function Cr(o) {
	return N.isPlainObject(o) || N.isArray(o);
}
function Ws(o) {
	return N.endsWith(o, "[]") ? o.slice(0, -2) : o;
}
function ws(o, r, n) {
	return o ? o.concat(r).map(function(a, u) {
		return a = Ws(a), !n && u ? "[" + a + "]" : a;
	}).join(n ? "." : "") : r;
}
function Ko(o) {
	return N.isArray(o) && !o.some(Cr);
}
var qo = N.toFlatObject(N, {}, null, function(r) {
	return /^is[A-Z]/.test(r);
});
function kn(o, r, n) {
	if (!N.isObject(o)) throw new TypeError("target must be an object");
	r = r || new FormData(), n = N.toFlatObject(n, {
		metaTokens: !0,
		dots: !1,
		indexes: !1
	}, !1, function(V, U) {
		return !N.isUndefined(U[V]);
	});
	const s = n.metaTokens, a = n.visitor || P, u = n.dots, d = n.indexes, b = (n.Blob || typeof Blob < "u" && Blob) && N.isSpecCompliantForm(r);
	if (!N.isFunction(a)) throw new TypeError("visitor must be a function");
	function y(B) {
		if (B === null) return "";
		if (N.isDate(B)) return B.toISOString();
		if (!b && N.isBlob(B)) throw new Y("Blob is not supported. Use a Buffer instead.");
		return N.isArrayBuffer(B) || N.isTypedArray(B) ? b && typeof Blob == "function" ? new Blob([B]) : Buffer.from(B) : B;
	}
	function P(B, V, U) {
		let te = B;
		if (B && !U && typeof B == "object") {
			if (N.endsWith(V, "{}")) V = s ? V : V.slice(0, -2), B = JSON.stringify(B);
			else if (N.isArray(B) && Ko(B) || (N.isFileList(B) || N.endsWith(V, "[]")) && (te = N.toArray(B))) return V = Ws(V), te.forEach(function(le, _e) {
				!(N.isUndefined(le) || le === null) && r.append(d === !0 ? ws([V], _e, u) : d === null ? V : V + "[]", y(le));
			}), !1;
		}
		return Cr(B) ? !0 : (r.append(ws(U, V, u), y(B)), !1);
	}
	const D = [], M = Object.assign(qo, {
		defaultVisitor: P,
		convertValue: y,
		isVisitable: Cr
	});
	function z(B, V) {
		if (!N.isUndefined(B)) {
			if (D.indexOf(B) !== -1) throw Error("Circular reference detected in " + V.join("."));
			D.push(B), N.forEach(B, function(te, ae) {
				(!(N.isUndefined(te) || te === null) && a.call(r, te, N.isString(ae) ? ae.trim() : ae, V, M)) === !0 && z(te, V ? V.concat(ae) : [ae]);
			}), D.pop();
		}
	}
	if (!N.isObject(o)) throw new TypeError("data must be an object");
	return z(o), r;
}
function Ss(o) {
	const r = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+",
		"%00": "\0"
	};
	return encodeURIComponent(o).replace(/[!'()~]|%20|%00/g, function(s) {
		return r[s];
	});
}
function Tr(o, r) {
	this._pairs = [], o && kn(o, this, r);
}
var Js = Tr.prototype;
Js.append = function(r, n) {
	this._pairs.push([r, n]);
};
Js.toString = function(r) {
	const n = r ? function(s) {
		return r.call(this, s, Ss);
	} : Ss;
	return this._pairs.map(function(a) {
		return n(a[0]) + "=" + n(a[1]);
	}, "").join("&");
};
function Uo(o) {
	return encodeURIComponent(o).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Xs(o, r, n) {
	if (!r) return o;
	const s = n && n.encode || Uo;
	N.isFunction(n) && (n = { serialize: n });
	const a = n && n.serialize;
	let u;
	if (a ? u = a(r, n) : u = N.isURLSearchParams(r) ? r.toString() : new Tr(r, n).toString(s), u) {
		const d = o.indexOf("#");
		d !== -1 && (o = o.slice(0, d)), o += (o.indexOf("?") === -1 ? "?" : "&") + u;
	}
	return o;
}
var As = class {
	constructor() {
		this.handlers = [];
	}
	/**
	* Add a new interceptor to the stack
	*
	* @param {Function} fulfilled The function to handle `then` for a `Promise`
	* @param {Function} rejected The function to handle `reject` for a `Promise`
	*
	* @return {Number} An ID used to remove interceptor later
	*/
	use(r, n, s) {
		return this.handlers.push({
			fulfilled: r,
			rejected: n,
			synchronous: s ? s.synchronous : !1,
			runWhen: s ? s.runWhen : null
		}), this.handlers.length - 1;
	}
	/**
	* Remove an interceptor from the stack
	*
	* @param {Number} id The ID that was returned by `use`
	*
	* @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
	*/
	eject(r) {
		this.handlers[r] && (this.handlers[r] = null);
	}
	/**
	* Clear all interceptors from the stack
	*
	* @returns {void}
	*/
	clear() {
		this.handlers && (this.handlers = []);
	}
	/**
	* Iterate over all the registered interceptors
	*
	* This method is particularly useful for skipping over any
	* interceptors that may have become `null` calling `eject`.
	*
	* @param {Function} fn The function to call for each interceptor
	*
	* @returns {void}
	*/
	forEach(r) {
		N.forEach(this.handlers, function(s) {
			s !== null && r(s);
		});
	}
};
var Ys = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1
}, Vo = {
	isBrowser: !0,
	classes: {
		URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : Tr,
		FormData: typeof FormData < "u" ? FormData : null,
		Blob: typeof Blob < "u" ? Blob : null
	},
	protocols: [
		"http",
		"https",
		"file",
		"blob",
		"url",
		"data"
	]
}, jr = typeof window < "u" && typeof document < "u", Ir = typeof navigator == "object" && navigator || void 0, Wo = jr && (!Ir || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(Ir.product) < 0), Jo = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Xo = jr && window.location.href || "http://localhost", Ae = {
	.../* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
		__proto__: null,
		hasBrowserEnv: jr,
		hasStandardBrowserEnv: Wo,
		hasStandardBrowserWebWorkerEnv: Jo,
		navigator: Ir,
		origin: Xo
	}, Symbol.toStringTag, { value: "Module" })),
	...Vo
};
function Qo(o, r) {
	return kn(o, new Ae.classes.URLSearchParams(), Object.assign({ visitor: function(n, s, a, u) {
		return Ae.isNode && N.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : u.defaultVisitor.apply(this, arguments);
	} }, r));
}
function Zo(o) {
	return N.matchAll(/\w+|\[(\w*)]/g, o).map((r) => r[0] === "[]" ? "" : r[1] || r[0]);
}
function ea(o) {
	const r = {}, n = Object.keys(o);
	let s;
	const a = n.length;
	let u;
	for (s = 0; s < a; s++) u = n[s], r[u] = o[u];
	return r;
}
function Qs(o) {
	function r(n, s, a, u) {
		let d = n[u++];
		if (d === "__proto__") return !0;
		const h = Number.isFinite(+d), b = u >= n.length;
		return d = !d && N.isArray(a) ? a.length : d, b ? (N.hasOwnProp(a, d) ? a[d] = [a[d], s] : a[d] = s, !h) : ((!a[d] || !N.isObject(a[d])) && (a[d] = []), r(n, s, a[d], u) && N.isArray(a[d]) && (a[d] = ea(a[d])), !h);
	}
	if (N.isFormData(o) && N.isFunction(o.entries)) {
		const n = {};
		return N.forEachEntry(o, (s, a) => {
			r(Zo(s), a, n, 0);
		}), n;
	}
	return null;
}
function ta(o, r, n) {
	if (N.isString(o)) try {
		return (r || JSON.parse)(o), N.trim(o);
	} catch (s) {
		if (s.name !== "SyntaxError") throw s;
	}
	return (0, JSON.stringify)(o);
}
var qt = {
	transitional: Ys,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(r, n) {
		const s = n.getContentType() || "", a = s.indexOf("application/json") > -1, u = N.isObject(r);
		if (u && N.isHTMLForm(r) && (r = new FormData(r)), N.isFormData(r)) return a ? JSON.stringify(Qs(r)) : r;
		if (N.isArrayBuffer(r) || N.isBuffer(r) || N.isStream(r) || N.isFile(r) || N.isBlob(r) || N.isReadableStream(r)) return r;
		if (N.isArrayBufferView(r)) return r.buffer;
		if (N.isURLSearchParams(r)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), r.toString();
		let h;
		if (u) {
			if (s.indexOf("application/x-www-form-urlencoded") > -1) return Qo(r, this.formSerializer).toString();
			if ((h = N.isFileList(r)) || s.indexOf("multipart/form-data") > -1) {
				const b = this.env && this.env.FormData;
				return kn(h ? { "files[]": r } : r, b && new b(), this.formSerializer);
			}
		}
		return u || a ? (n.setContentType("application/json", !1), ta(r)) : r;
	}],
	transformResponse: [function(r) {
		const n = this.transitional || qt.transitional, s = n && n.forcedJSONParsing, a = this.responseType === "json";
		if (N.isResponse(r) || N.isReadableStream(r)) return r;
		if (r && N.isString(r) && (s && !this.responseType || a)) {
			const d = !(n && n.silentJSONParsing) && a;
			try {
				return JSON.parse(r);
			} catch (h) {
				if (d) throw h.name === "SyntaxError" ? Y.from(h, Y.ERR_BAD_RESPONSE, this, null, this.response) : h;
			}
		}
		return r;
	}],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: Ae.classes.FormData,
		Blob: Ae.classes.Blob
	},
	validateStatus: function(r) {
		return r >= 200 && r < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
N.forEach([
	"delete",
	"get",
	"head",
	"post",
	"put",
	"patch"
], (o) => {
	qt.headers[o] = {};
});
var na = N.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]), ra = (o) => {
	const r = {};
	let n, s, a;
	return o && o.split(`
`).forEach(function(d) {
		a = d.indexOf(":"), n = d.substring(0, a).trim().toLowerCase(), s = d.substring(a + 1).trim(), !(!n || r[n] && na[n]) && (n === "set-cookie" ? r[n] ? r[n].push(s) : r[n] = [s] : r[n] = r[n] ? r[n] + ", " + s : s);
	}), r;
}, _s = Symbol("internals");
function Ft(o) {
	return o && String(o).trim().toLowerCase();
}
function Sn(o) {
	return o === !1 || o == null ? o : N.isArray(o) ? o.map(Sn) : String(o);
}
function sa(o) {
	const r = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let s;
	for (; s = n.exec(o);) r[s[1]] = s[2];
	return r;
}
var ia = (o) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(o.trim());
function Sr(o, r, n, s, a) {
	if (N.isFunction(s)) return s.call(this, r, n);
	if (a && (r = n), !!N.isString(r)) {
		if (N.isString(s)) return r.indexOf(s) !== -1;
		if (N.isRegExp(s)) return s.test(r);
	}
}
function oa(o) {
	return o.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (r, n, s) => n.toUpperCase() + s);
}
function aa(o, r) {
	const n = N.toCamelCase(" " + r);
	[
		"get",
		"set",
		"has"
	].forEach((s) => {
		Object.defineProperty(o, s + n, {
			value: function(a, u, d) {
				return this[s].call(this, r, a, u, d);
			},
			configurable: !0
		});
	});
}
var Pe = class {
	constructor(r) {
		r && this.set(r);
	}
	set(r, n, s) {
		const a = this;
		function u(h, b, y) {
			const P = Ft(b);
			if (!P) throw new Error("header name must be a non-empty string");
			const D = N.findKey(a, P);
			(!D || a[D] === void 0 || y === !0 || y === void 0 && a[D] !== !1) && (a[D || b] = Sn(h));
		}
		const d = (h, b) => N.forEach(h, (y, P) => u(y, P, b));
		if (N.isPlainObject(r) || r instanceof this.constructor) d(r, n);
		else if (N.isString(r) && (r = r.trim()) && !ia(r)) d(ra(r), n);
		else if (N.isHeaders(r)) for (const [h, b] of r.entries()) u(b, h, s);
		else r != null && u(n, r, s);
		return this;
	}
	get(r, n) {
		if (r = Ft(r), r) {
			const s = N.findKey(this, r);
			if (s) {
				const a = this[s];
				if (!n) return a;
				if (n === !0) return sa(a);
				if (N.isFunction(n)) return n.call(this, a, s);
				if (N.isRegExp(n)) return n.exec(a);
				throw new TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(r, n) {
		if (r = Ft(r), r) {
			const s = N.findKey(this, r);
			return !!(s && this[s] !== void 0 && (!n || Sr(this, this[s], s, n)));
		}
		return !1;
	}
	delete(r, n) {
		const s = this;
		let a = !1;
		function u(d) {
			if (d = Ft(d), d) {
				const h = N.findKey(s, d);
				h && (!n || Sr(s, s[h], h, n)) && (delete s[h], a = !0);
			}
		}
		return N.isArray(r) ? r.forEach(u) : u(r), a;
	}
	clear(r) {
		const n = Object.keys(this);
		let s = n.length, a = !1;
		for (; s--;) {
			const u = n[s];
			(!r || Sr(this, this[u], u, r, !0)) && (delete this[u], a = !0);
		}
		return a;
	}
	normalize(r) {
		const n = this, s = {};
		return N.forEach(this, (a, u) => {
			const d = N.findKey(s, u);
			if (d) {
				n[d] = Sn(a), delete n[u];
				return;
			}
			const h = r ? oa(u) : String(u).trim();
			h !== u && delete n[u], n[h] = Sn(a), s[h] = !0;
		}), this;
	}
	concat(...r) {
		return this.constructor.concat(this, ...r);
	}
	toJSON(r) {
		const n = /* @__PURE__ */ Object.create(null);
		return N.forEach(this, (s, a) => {
			s != null && s !== !1 && (n[a] = r && N.isArray(s) ? s.join(", ") : s);
		}), n;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([r, n]) => r + ": " + n).join(`
`);
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(r) {
		return r instanceof this ? r : new this(r);
	}
	static concat(r, ...n) {
		const s = new this(r);
		return n.forEach((a) => s.set(a)), s;
	}
	static accessor(r) {
		const s = (this[_s] = this[_s] = { accessors: {} }).accessors, a = this.prototype;
		function u(d) {
			const h = Ft(d);
			s[h] || (aa(a, d), s[h] = !0);
		}
		return N.isArray(r) ? r.forEach(u) : u(r), this;
	}
};
Pe.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]);
N.reduceDescriptors(Pe.prototype, ({ value: o }, r) => {
	let n = r[0].toUpperCase() + r.slice(1);
	return {
		get: () => o,
		set(s) {
			this[n] = s;
		}
	};
});
N.freezeMethods(Pe);
function Ar(o, r) {
	const n = this || qt, s = r || n, a = Pe.from(s.headers);
	let u = s.data;
	return N.forEach(o, function(h) {
		u = h.call(n, u, a.normalize(), r ? r.status : void 0);
	}), a.normalize(), u;
}
function Zs(o) {
	return !!(o && o.__CANCEL__);
}
function At(o, r, n) {
	Y.call(this, o ?? "canceled", Y.ERR_CANCELED, r, n), this.name = "CanceledError";
}
N.inherits(At, Y, { __CANCEL__: !0 });
function ei(o, r, n) {
	const s = n.config.validateStatus;
	!n.status || !s || s(n.status) ? o(n) : r(new Y("Request failed with status code " + n.status, [Y.ERR_BAD_REQUEST, Y.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n));
}
function ca(o) {
	const r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(o);
	return r && r[1] || "";
}
function ua(o, r) {
	o = o || 10;
	const n = new Array(o), s = new Array(o);
	let a = 0, u = 0, d;
	return r = r !== void 0 ? r : 1e3, function(b) {
		const y = Date.now(), P = s[u];
		d || (d = y), n[a] = b, s[a] = y;
		let D = u, M = 0;
		for (; D !== a;) M += n[D++], D = D % o;
		if (a = (a + 1) % o, a === u && (u = (u + 1) % o), y - d < r) return;
		const z = P && y - P;
		return z ? Math.round(M * 1e3 / z) : void 0;
	};
}
function la(o, r) {
	let n = 0, s = 1e3 / r, a, u;
	const d = (y, P = Date.now()) => {
		n = P, a = null, u && (clearTimeout(u), u = null), o.apply(null, y);
	};
	return [(...y) => {
		const P = Date.now(), D = P - n;
		D >= s ? d(y, P) : (a = y, u || (u = setTimeout(() => {
			u = null, d(a);
		}, s - D)));
	}, () => a && d(a)];
}
var En = (o, r, n = 3) => {
	let s = 0;
	const a = ua(50, 250);
	return la((u) => {
		const d = u.loaded, h = u.lengthComputable ? u.total : void 0, b = d - s, y = a(b), P = d <= h;
		s = d;
		o({
			loaded: d,
			total: h,
			progress: h ? d / h : void 0,
			bytes: b,
			rate: y || void 0,
			estimated: y && h && P ? (h - d) / y : void 0,
			event: u,
			lengthComputable: h != null,
			[r ? "download" : "upload"]: !0
		});
	}, n);
}, Es = (o, r) => {
	const n = o != null;
	return [(s) => r[0]({
		lengthComputable: n,
		total: o,
		loaded: s
	}), r[1]];
}, Ps = (o) => (...r) => N.asap(() => o(...r)), da = Ae.hasStandardBrowserEnv ? /* @__PURE__ */ ((o, r) => (n) => (n = new URL(n, Ae.origin), o.protocol === n.protocol && o.host === n.host && (r || o.port === n.port)))(new URL(Ae.origin), Ae.navigator && /(msie|trident)/i.test(Ae.navigator.userAgent)) : () => !0, fa = Ae.hasStandardBrowserEnv ? {
	write(o, r, n, s, a, u) {
		const d = [o + "=" + encodeURIComponent(r)];
		N.isNumber(n) && d.push("expires=" + new Date(n).toGMTString()), N.isString(s) && d.push("path=" + s), N.isString(a) && d.push("domain=" + a), u === !0 && d.push("secure"), document.cookie = d.join("; ");
	},
	read(o) {
		const r = document.cookie.match(new RegExp("(^|;\\s*)(" + o + ")=([^;]*)"));
		return r ? decodeURIComponent(r[3]) : null;
	},
	remove(o) {
		this.write(o, "", Date.now() - 864e5);
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
function ha(o) {
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(o);
}
function pa(o, r) {
	return r ? o.replace(/\/?\/$/, "") + "/" + r.replace(/^\/+/, "") : o;
}
function ti(o, r) {
	return o && !ha(r) ? pa(o, r) : r;
}
var Cs = (o) => o instanceof Pe ? { ...o } : o;
function ct(o, r) {
	r = r || {};
	const n = {};
	function s(y, P, D, M) {
		return N.isPlainObject(y) && N.isPlainObject(P) ? N.merge.call({ caseless: M }, y, P) : N.isPlainObject(P) ? N.merge({}, P) : N.isArray(P) ? P.slice() : P;
	}
	function a(y, P, D, M) {
		if (N.isUndefined(P)) {
			if (!N.isUndefined(y)) return s(void 0, y, D, M);
		} else return s(y, P, D, M);
	}
	function u(y, P) {
		if (!N.isUndefined(P)) return s(void 0, P);
	}
	function d(y, P) {
		if (N.isUndefined(P)) {
			if (!N.isUndefined(y)) return s(void 0, y);
		} else return s(void 0, P);
	}
	function h(y, P, D) {
		if (D in r) return s(y, P);
		if (D in o) return s(void 0, y);
	}
	const b = {
		url: u,
		method: u,
		data: u,
		baseURL: d,
		transformRequest: d,
		transformResponse: d,
		paramsSerializer: d,
		timeout: d,
		timeoutMessage: d,
		withCredentials: d,
		withXSRFToken: d,
		adapter: d,
		responseType: d,
		xsrfCookieName: d,
		xsrfHeaderName: d,
		onUploadProgress: d,
		onDownloadProgress: d,
		decompress: d,
		maxContentLength: d,
		maxBodyLength: d,
		beforeRedirect: d,
		transport: d,
		httpAgent: d,
		httpsAgent: d,
		cancelToken: d,
		socketPath: d,
		responseEncoding: d,
		validateStatus: h,
		headers: (y, P, D) => a(Cs(y), Cs(P), D, !0)
	};
	return N.forEach(Object.keys(Object.assign({}, o, r)), function(P) {
		const D = b[P] || a, M = D(o[P], r[P], P);
		N.isUndefined(M) && D !== h || (n[P] = M);
	}), n;
}
var ni = (o) => {
	const r = ct({}, o);
	let { data: n, withXSRFToken: s, xsrfHeaderName: a, xsrfCookieName: u, headers: d, auth: h } = r;
	r.headers = d = Pe.from(d), r.url = Xs(ti(r.baseURL, r.url), o.params, o.paramsSerializer), h && d.set("Authorization", "Basic " + btoa((h.username || "") + ":" + (h.password ? unescape(encodeURIComponent(h.password)) : "")));
	let b;
	if (N.isFormData(n)) {
		if (Ae.hasStandardBrowserEnv || Ae.hasStandardBrowserWebWorkerEnv) d.setContentType(void 0);
		else if ((b = d.getContentType()) !== !1) {
			const [y, ...P] = b ? b.split(";").map((D) => D.trim()).filter(Boolean) : [];
			d.setContentType([y || "multipart/form-data", ...P].join("; "));
		}
	}
	if (Ae.hasStandardBrowserEnv && (s && N.isFunction(s) && (s = s(r)), s || s !== !1 && da(r.url))) {
		const y = a && u && fa.read(u);
		y && d.set(a, y);
	}
	return r;
}, ya = typeof XMLHttpRequest < "u" && function(o) {
	return new Promise(function(n, s) {
		const a = ni(o);
		let u = a.data;
		const d = Pe.from(a.headers).normalize();
		let { responseType: h, onUploadProgress: b, onDownloadProgress: y } = a, P, D, M, z, B;
		function V() {
			z && z(), B && B(), a.cancelToken && a.cancelToken.unsubscribe(P), a.signal && a.signal.removeEventListener("abort", P);
		}
		let U = new XMLHttpRequest();
		U.open(a.method.toUpperCase(), a.url, !0), U.timeout = a.timeout;
		function te() {
			if (!U) return;
			const le = Pe.from("getAllResponseHeaders" in U && U.getAllResponseHeaders());
			ei(function(de) {
				n(de), V();
			}, function(de) {
				s(de), V();
			}, {
				data: !h || h === "text" || h === "json" ? U.responseText : U.response,
				status: U.status,
				statusText: U.statusText,
				headers: le,
				config: o,
				request: U
			}), U = null;
		}
		"onloadend" in U ? U.onloadend = te : U.onreadystatechange = function() {
			!U || U.readyState !== 4 || U.status === 0 && !(U.responseURL && U.responseURL.indexOf("file:") === 0) || setTimeout(te);
		}, U.onabort = function() {
			U && (s(new Y("Request aborted", Y.ECONNABORTED, o, U)), U = null);
		}, U.onerror = function() {
			s(new Y("Network Error", Y.ERR_NETWORK, o, U)), U = null;
		}, U.ontimeout = function() {
			let _e = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
			const be = a.transitional || Ys;
			a.timeoutErrorMessage && (_e = a.timeoutErrorMessage), s(new Y(_e, be.clarifyTimeoutError ? Y.ETIMEDOUT : Y.ECONNABORTED, o, U)), U = null;
		}, u === void 0 && d.setContentType(null), "setRequestHeader" in U && N.forEach(d.toJSON(), function(_e, be) {
			U.setRequestHeader(be, _e);
		}), N.isUndefined(a.withCredentials) || (U.withCredentials = !!a.withCredentials), h && h !== "json" && (U.responseType = a.responseType), y && ([M, B] = En(y, !0), U.addEventListener("progress", M)), b && U.upload && ([D, z] = En(b), U.upload.addEventListener("progress", D), U.upload.addEventListener("loadend", z)), (a.cancelToken || a.signal) && (P = (le) => {
			U && (s(!le || le.type ? new At(null, o, U) : le), U.abort(), U = null);
		}, a.cancelToken && a.cancelToken.subscribe(P), a.signal && (a.signal.aborted ? P() : a.signal.addEventListener("abort", P)));
		const ae = ca(a.url);
		if (ae && Ae.protocols.indexOf(ae) === -1) {
			s(new Y("Unsupported protocol " + ae + ":", Y.ERR_BAD_REQUEST, o));
			return;
		}
		U.send(u || null);
	});
}, ga = (o, r) => {
	const { length: n } = o = o ? o.filter(Boolean) : [];
	if (r || n) {
		let s = new AbortController(), a;
		const u = function(y) {
			if (!a) {
				a = !0, h();
				const P = y instanceof Error ? y : this.reason;
				s.abort(P instanceof Y ? P : new At(P instanceof Error ? P.message : P));
			}
		};
		let d = r && setTimeout(() => {
			d = null, u(new Y(`timeout ${r} of ms exceeded`, Y.ETIMEDOUT));
		}, r);
		const h = () => {
			o && (d && clearTimeout(d), d = null, o.forEach((y) => {
				y.unsubscribe ? y.unsubscribe(u) : y.removeEventListener("abort", u);
			}), o = null);
		};
		o.forEach((y) => y.addEventListener("abort", u));
		const { signal: b } = s;
		return b.unsubscribe = () => N.asap(h), b;
	}
}, ba = function* (o, r) {
	let n = o.byteLength;
	if (n < r) {
		yield o;
		return;
	}
	let s = 0, a;
	for (; s < n;) a = s + r, yield o.slice(s, a), s = a;
}, va = async function* (o, r) {
	for await (const n of wa(o)) yield* ba(n, r);
}, wa = async function* (o) {
	if (o[Symbol.asyncIterator]) {
		yield* o;
		return;
	}
	const r = o.getReader();
	try {
		for (;;) {
			const { done: n, value: s } = await r.read();
			if (n) break;
			yield s;
		}
	} finally {
		await r.cancel();
	}
}, Is = (o, r, n, s) => {
	const a = va(o, r);
	let u = 0, d, h = (b) => {
		d || (d = !0, s && s(b));
	};
	return new ReadableStream({
		async pull(b) {
			try {
				const { done: y, value: P } = await a.next();
				if (y) {
					h(), b.close();
					return;
				}
				let D = P.byteLength;
				if (n) n(u += D);
				b.enqueue(new Uint8Array(P));
			} catch (y) {
				throw h(y), y;
			}
		},
		cancel(b) {
			return h(b), a.return();
		}
	}, { highWaterMark: 2 });
}, On = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ri = On && typeof ReadableStream == "function", Sa = On && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((o) => (r) => o.encode(r))(new TextEncoder()) : async (o) => new Uint8Array(await new Response(o).arrayBuffer())), si = (o, ...r) => {
	try {
		return !!o(...r);
	} catch {
		return !1;
	}
}, Aa = ri && si(() => {
	let o = !1;
	const r = new Request(Ae.origin, {
		body: new ReadableStream(),
		method: "POST",
		get duplex() {
			return o = !0, "half";
		}
	}).headers.has("Content-Type");
	return o && !r;
}), xs = 64 * 1024, xr = ri && si(() => N.isReadableStream(new Response("").body)), Pn = { stream: xr && ((o) => o.body) };
On && ((o) => {
	[
		"text",
		"arrayBuffer",
		"blob",
		"formData",
		"stream"
	].forEach((r) => {
		!Pn[r] && (Pn[r] = N.isFunction(o[r]) ? (n) => n[r]() : (n, s) => {
			throw new Y(`Response type '${r}' is not supported`, Y.ERR_NOT_SUPPORT, s);
		});
	});
})(new Response());
var _a = async (o) => {
	if (o == null) return 0;
	if (N.isBlob(o)) return o.size;
	if (N.isSpecCompliantForm(o)) return (await new Request(Ae.origin, {
		method: "POST",
		body: o
	}).arrayBuffer()).byteLength;
	if (N.isArrayBufferView(o) || N.isArrayBuffer(o)) return o.byteLength;
	if (N.isURLSearchParams(o) && (o = o + ""), N.isString(o)) return (await Sa(o)).byteLength;
}, Ea = async (o, r) => {
	return N.toFiniteNumber(o.getContentLength()) ?? _a(r);
}, kr = {
	http: Go,
	xhr: ya,
	fetch: On && (async (o) => {
		let { url: r, method: n, data: s, signal: a, cancelToken: u, timeout: d, onDownloadProgress: h, onUploadProgress: b, responseType: y, headers: P, withCredentials: D = "same-origin", fetchOptions: M } = ni(o);
		y = y ? (y + "").toLowerCase() : "text";
		let z = ga([a, u && u.toAbortSignal()], d), B;
		const V = z && z.unsubscribe && (() => {
			z.unsubscribe();
		});
		let U;
		try {
			if (b && Aa && n !== "get" && n !== "head" && (U = await Ea(P, s)) !== 0) {
				let be = new Request(r, {
					method: "POST",
					body: s,
					duplex: "half"
				}), me;
				if (N.isFormData(s) && (me = be.headers.get("content-type")) && P.setContentType(me), be.body) {
					const [de, Je] = Es(U, En(Ps(b)));
					s = Is(be.body, xs, de, Je);
				}
			}
			N.isString(D) || (D = D ? "include" : "omit");
			const te = "credentials" in Request.prototype;
			B = new Request(r, {
				...M,
				signal: z,
				method: n.toUpperCase(),
				headers: P.normalize().toJSON(),
				body: s,
				duplex: "half",
				credentials: te ? D : void 0
			});
			let ae = await fetch(B);
			const le = xr && (y === "stream" || y === "response");
			if (xr && (h || le && V)) {
				const be = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((Ht) => {
					be[Ht] = ae[Ht];
				});
				const me = N.toFiniteNumber(ae.headers.get("content-length")), [de, Je] = h && Es(me, En(Ps(h), !0)) || [];
				ae = new Response(Is(ae.body, xs, de, () => {
					Je && Je(), V && V();
				}), be);
			}
			y = y || "text";
			let _e = await Pn[N.findKey(Pn, y) || "text"](ae, o);
			return !le && V && V(), await new Promise((be, me) => {
				ei(be, me, {
					data: _e,
					headers: Pe.from(ae.headers),
					status: ae.status,
					statusText: ae.statusText,
					config: o,
					request: B
				});
			});
		} catch (te) {
			throw V && V(), te && te.name === "TypeError" && /fetch/i.test(te.message) ? Object.assign(new Y("Network Error", Y.ERR_NETWORK, o, B), { cause: te.cause || te }) : Y.from(te, te && te.code, o, B);
		}
	})
};
N.forEach(kr, (o, r) => {
	if (o) {
		try {
			Object.defineProperty(o, "name", { value: r });
		} catch {}
		Object.defineProperty(o, "adapterName", { value: r });
	}
});
var ks = (o) => `- ${o}`, Ca = (o) => N.isFunction(o) || o === null || o === !1, ii = {
	getAdapter: (o) => {
		o = N.isArray(o) ? o : [o];
		const { length: r } = o;
		let n, s;
		const a = {};
		for (let u = 0; u < r; u++) {
			n = o[u];
			let d;
			if (s = n, !Ca(n) && (s = kr[(d = String(n)).toLowerCase()], s === void 0)) throw new Y(`Unknown adapter '${d}'`);
			if (s) break;
			a[d || "#" + u] = s;
		}
		if (!s) {
			const u = Object.entries(a).map(([h, b]) => `adapter ${h} ` + (b === !1 ? "is not supported by the environment" : "is not available in the build"));
			throw new Y("There is no suitable adapter to dispatch the request " + (r ? u.length > 1 ? `since :
` + u.map(ks).join(`
`) : " " + ks(u[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT");
		}
		return s;
	},
	adapters: kr
};
function _r(o) {
	if (o.cancelToken && o.cancelToken.throwIfRequested(), o.signal && o.signal.aborted) throw new At(null, o);
}
function Os(o) {
	return _r(o), o.headers = Pe.from(o.headers), o.data = Ar.call(o, o.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(o.method) !== -1 && o.headers.setContentType("application/x-www-form-urlencoded", !1), ii.getAdapter(o.adapter || qt.adapter)(o).then(function(s) {
		return _r(o), s.data = Ar.call(o, o.transformResponse, s), s.headers = Pe.from(s.headers), s;
	}, function(s) {
		return Zs(s) || (_r(o), s && s.response && (s.response.data = Ar.call(o, o.transformResponse, s.response), s.response.headers = Pe.from(s.response.headers))), Promise.reject(s);
	});
}
var oi = "1.7.9", Nn = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((o, r) => {
	Nn[o] = function(s) {
		return typeof s === o || "a" + (r < 1 ? "n " : " ") + o;
	};
});
var Ns = {};
Nn.transitional = function(r, n, s) {
	function a(u, d) {
		return "[Axios v" + oi + "] Transitional option '" + u + "'" + d + (s ? ". " + s : "");
	}
	return (u, d, h) => {
		if (r === !1) throw new Y(a(d, " has been removed" + (n ? " in " + n : "")), Y.ERR_DEPRECATED);
		return n && !Ns[d] && (Ns[d] = !0, console.warn(a(d, " has been deprecated since v" + n + " and will be removed in the near future"))), r ? r(u, d, h) : !0;
	};
};
Nn.spelling = function(r) {
	return (n, s) => (console.warn(`${s} is likely a misspelling of ${r}`), !0);
};
function Ia(o, r, n) {
	if (typeof o != "object") throw new Y("options must be an object", Y.ERR_BAD_OPTION_VALUE);
	const s = Object.keys(o);
	let a = s.length;
	for (; a-- > 0;) {
		const u = s[a], d = r[u];
		if (d) {
			const h = o[u], b = h === void 0 || d(h, u, o);
			if (b !== !0) throw new Y("option " + u + " must be " + b, Y.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (n !== !0) throw new Y("Unknown option " + u, Y.ERR_BAD_OPTION);
	}
}
var An = {
	assertOptions: Ia,
	validators: Nn
}, Te = An.validators;
var at = class {
	constructor(r) {
		this.defaults = r, this.interceptors = {
			request: new As(),
			response: new As()
		};
	}
	/**
	* Dispatch a request
	*
	* @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
	* @param {?Object} config
	*
	* @returns {Promise} The Promise to be fulfilled
	*/
	async request(r, n) {
		try {
			return await this._request(r, n);
		} catch (s) {
			if (s instanceof Error) {
				let a = {};
				Error.captureStackTrace ? Error.captureStackTrace(a) : a = /* @__PURE__ */ new Error();
				const u = a.stack ? a.stack.replace(/^.+\n/, "") : "";
				try {
					s.stack ? u && !String(s.stack).endsWith(u.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + u) : s.stack = u;
				} catch {}
			}
			throw s;
		}
	}
	_request(r, n) {
		typeof r == "string" ? (n = n || {}, n.url = r) : n = r || {}, n = ct(this.defaults, n);
		const { transitional: s, paramsSerializer: a, headers: u } = n;
		s !== void 0 && An.assertOptions(s, {
			silentJSONParsing: Te.transitional(Te.boolean),
			forcedJSONParsing: Te.transitional(Te.boolean),
			clarifyTimeoutError: Te.transitional(Te.boolean)
		}, !1), a != null && (N.isFunction(a) ? n.paramsSerializer = { serialize: a } : An.assertOptions(a, {
			encode: Te.function,
			serialize: Te.function
		}, !0)), An.assertOptions(n, {
			baseUrl: Te.spelling("baseURL"),
			withXsrfToken: Te.spelling("withXSRFToken")
		}, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
		let d = u && N.merge(u.common, u[n.method]);
		u && N.forEach([
			"delete",
			"get",
			"head",
			"post",
			"put",
			"patch",
			"common"
		], (B) => {
			delete u[B];
		}), n.headers = Pe.concat(d, u);
		const h = [];
		let b = !0;
		this.interceptors.request.forEach(function(V) {
			typeof V.runWhen == "function" && V.runWhen(n) === !1 || (b = b && V.synchronous, h.unshift(V.fulfilled, V.rejected));
		});
		const y = [];
		this.interceptors.response.forEach(function(V) {
			y.push(V.fulfilled, V.rejected);
		});
		let P, D = 0, M;
		if (!b) {
			const B = [Os.bind(this), void 0];
			for (B.unshift.apply(B, h), B.push.apply(B, y), M = B.length, P = Promise.resolve(n); D < M;) P = P.then(B[D++], B[D++]);
			return P;
		}
		M = h.length;
		let z = n;
		for (D = 0; D < M;) {
			const B = h[D++], V = h[D++];
			try {
				z = B(z);
			} catch (U) {
				V.call(this, U);
				break;
			}
		}
		try {
			P = Os.call(this, z);
		} catch (B) {
			return Promise.reject(B);
		}
		for (D = 0, M = y.length; D < M;) P = P.then(y[D++], y[D++]);
		return P;
	}
	getUri(r) {
		r = ct(this.defaults, r);
		return Xs(ti(r.baseURL, r.url), r.params, r.paramsSerializer);
	}
};
N.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(r) {
	at.prototype[r] = function(n, s) {
		return this.request(ct(s || {}, {
			method: r,
			url: n,
			data: (s || {}).data
		}));
	};
});
N.forEach([
	"post",
	"put",
	"patch"
], function(r) {
	function n(s) {
		return function(u, d, h) {
			return this.request(ct(h || {}, {
				method: r,
				headers: s ? { "Content-Type": "multipart/form-data" } : {},
				url: u,
				data: d
			}));
		};
	}
	at.prototype[r] = n(), at.prototype[r + "Form"] = n(!0);
});
var xa = class ai {
	constructor(r) {
		if (typeof r != "function") throw new TypeError("executor must be a function.");
		let n;
		this.promise = new Promise(function(u) {
			n = u;
		});
		const s = this;
		this.promise.then((a) => {
			if (!s._listeners) return;
			let u = s._listeners.length;
			for (; u-- > 0;) s._listeners[u](a);
			s._listeners = null;
		}), this.promise.then = (a) => {
			let u;
			const d = new Promise((h) => {
				s.subscribe(h), u = h;
			}).then(a);
			return d.cancel = function() {
				s.unsubscribe(u);
			}, d;
		}, r(function(u, d, h) {
			s.reason || (s.reason = new At(u, d, h), n(s.reason));
		});
	}
	/**
	* Throws a `CanceledError` if cancellation has been requested.
	*/
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	/**
	* Subscribe to the cancel signal
	*/
	subscribe(r) {
		if (this.reason) {
			r(this.reason);
			return;
		}
		this._listeners ? this._listeners.push(r) : this._listeners = [r];
	}
	/**
	* Unsubscribe from the cancel signal
	*/
	unsubscribe(r) {
		if (!this._listeners) return;
		const n = this._listeners.indexOf(r);
		n !== -1 && this._listeners.splice(n, 1);
	}
	toAbortSignal() {
		const r = new AbortController(), n = (s) => {
			r.abort(s);
		};
		return this.subscribe(n), r.signal.unsubscribe = () => this.unsubscribe(n), r.signal;
	}
	/**
	* Returns an object that contains a new `CancelToken` and a function that, when called,
	* cancels the `CancelToken`.
	*/
	static source() {
		let r;
		return {
			token: new ai(function(a) {
				r = a;
			}),
			cancel: r
		};
	}
};
function ka(o) {
	return function(n) {
		return o.apply(null, n);
	};
}
function Oa(o) {
	return N.isObject(o) && o.isAxiosError === !0;
}
var Or = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511
};
Object.entries(Or).forEach(([o, r]) => {
	Or[r] = o;
});
function ci(o) {
	const r = new at(o), n = Ls(at.prototype.request, r);
	return N.extend(n, at.prototype, r, { allOwnKeys: !0 }), N.extend(n, r, null, { allOwnKeys: !0 }), n.create = function(a) {
		return ci(ct(o, a));
	}, n;
}
var pe = ci(qt);
pe.Axios = at;
pe.CanceledError = At;
pe.CancelToken = xa;
pe.isCancel = Zs;
pe.VERSION = oi;
pe.toFormData = kn;
pe.AxiosError = Y;
pe.Cancel = pe.CanceledError;
pe.all = function(r) {
	return Promise.all(r);
};
pe.spread = ka;
pe.isAxiosError = Oa;
pe.mergeConfig = ct;
pe.AxiosHeaders = Pe;
pe.formToJSON = (o) => Qs(N.isHTMLForm(o) ? new FormData(o) : o);
pe.getAdapter = ii.getAdapter;
pe.HttpStatusCode = Or;
pe.default = pe;
var { Axios: nc, AxiosError: rc, CanceledError: sc, isCancel: ic, CancelToken: oc, VERSION: ac, all: cc, Cancel: uc, isAxiosError: lc, spread: dc, toFormData: fc, AxiosHeaders: hc, HttpStatusCode: Ds, formToJSON: pc, getAdapter: mc, mergeConfig: yc } = pe, Na = [
	"SUCCESS",
	200,
	"0000",
	"success"
], Da = [Ds.Created, Ds.Ok], ie = pe.create();
ie.interceptors.request.use((o) => {
	var r, n;
	return H(o.baseURL) ? Promise.reject("proxy is empty, please setting first") : ((r = o.headers) != null && r.hasContentType() || o.headers.setContentType("application/json", !0), ((n = o.method) == null ? void 0 : n.toUpperCase()) === "GET" && (o.params = (o == null ? void 0 : o.params) ?? (o == null ? void 0 : o.data), o == null || delete o.data), !o.headers.hasAuthorization() && !o.headers.has("x-render-order") ? Promise.reject("Request is not authorized") : o);
}, (o) => Promise.reject(o));
ie.interceptors.response.use((o) => {
	const { data: r, status: n } = o, s = o.config;
	return Da.includes(n) ? s != null && s.customize ? r : Na.includes(r == null ? void 0 : r.status) ? (r == null ? void 0 : r.result) ?? r : Promise.reject(r) : Promise.reject(o);
}, (o) => {
	var n;
	const r = (o == null ? void 0 : o.response) ?? o;
	return (r == null ? void 0 : r.code) ?? (r == null ? void 0 : r.statusCode) ?? r?.status, ((n = r == null ? void 0 : r.data) == null ? void 0 : n.message) ?? (r == null ? void 0 : r.message) ?? (r == null ? void 0 : r.statusText) ?? r?.statusMessage, Promise.reject((r == null ? void 0 : r.data) ?? r);
});
var Rs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ra(o) {
	return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var ui = { exports: {} };
(function(o, r) {
	(function(n, s) {
		o.exports = s();
	})(Rs, function() {
		var n = function(e, t) {
			return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, c) {
				i.__proto__ = c;
			} || function(i, c) {
				for (var l in c) Object.prototype.hasOwnProperty.call(c, l) && (i[l] = c[l]);
			})(e, t);
		}, s = function() {
			return (s = Object.assign || function(e) {
				for (var t, i = 1, c = arguments.length; i < c; i++) for (var l in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
				return e;
			}).apply(this, arguments);
		};
		function a(e, t, i) {
			for (var c, l = 0, f = t.length; l < f; l++) !c && l in t || ((c = c || Array.prototype.slice.call(t, 0, l))[l] = t[l]);
			return e.concat(c || Array.prototype.slice.call(t));
		}
		var u = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : Rs, d = Object.keys, h = Array.isArray;
		function b(e, t) {
			return typeof t != "object" || d(t).forEach(function(i) {
				e[i] = t[i];
			}), e;
		}
		typeof Promise > "u" || u.Promise || (u.Promise = Promise);
		var y = Object.getPrototypeOf, P = {}.hasOwnProperty;
		function D(e, t) {
			return P.call(e, t);
		}
		function M(e, t) {
			typeof t == "function" && (t = t(y(e))), (typeof Reflect > "u" ? d : Reflect.ownKeys)(t).forEach(function(i) {
				B(e, i, t[i]);
			});
		}
		var z = Object.defineProperty;
		function B(e, t, i, c) {
			z(e, t, b(i && D(i, "get") && typeof i.get == "function" ? {
				get: i.get,
				set: i.set,
				configurable: !0
			} : {
				value: i,
				configurable: !0,
				writable: !0
			}, c));
		}
		function V(e) {
			return { from: function(t) {
				return e.prototype = Object.create(t.prototype), B(e.prototype, "constructor", e), { extend: M.bind(null, e.prototype) };
			} };
		}
		var U = Object.getOwnPropertyDescriptor, te = [].slice;
		function ae(e, t, i) {
			return te.call(e, t, i);
		}
		function le(e, t) {
			return t(e);
		}
		function _e(e) {
			if (!e) throw new Error("Assertion Failed");
		}
		function be(e) {
			u.setImmediate ? setImmediate(e) : setTimeout(e, 0);
		}
		function me(e, t) {
			if (typeof t == "string" && D(e, t)) return e[t];
			if (!t) return e;
			if (typeof t != "string") {
				for (var i = [], c = 0, l = t.length; c < l; ++c) {
					var f = me(e, t[c]);
					i.push(f);
				}
				return i;
			}
			var p = t.indexOf(".");
			if (p !== -1) {
				var m = e[t.substr(0, p)];
				return m == null ? void 0 : me(m, t.substr(p + 1));
			}
		}
		function de(e, t, i) {
			if (e && t !== void 0 && !("isFrozen" in Object && Object.isFrozen(e))) if (typeof t != "string" && "length" in t) {
				_e(typeof i != "string" && "length" in i);
				for (var c = 0, l = t.length; c < l; ++c) de(e, t[c], i[c]);
			} else {
				var f, p, m = t.indexOf(".");
				m !== -1 ? (f = t.substr(0, m), (p = t.substr(m + 1)) === "" ? i === void 0 ? h(e) && !isNaN(parseInt(f)) ? e.splice(f, 1) : delete e[f] : e[f] = i : de(m = !(m = e[f]) || !D(e, f) ? e[f] = {} : m, p, i)) : i === void 0 ? h(e) && !isNaN(parseInt(t)) ? e.splice(t, 1) : delete e[t] : e[t] = i;
			}
		}
		function Je(e) {
			var t, i = {};
			for (t in e) D(e, t) && (i[t] = e[t]);
			return i;
		}
		var Ht = [].concat;
		function Br(e) {
			return Ht.apply([], e);
		}
		var Me = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(Br([
			8,
			16,
			32,
			64
		].map(function(e) {
			return [
				"Int",
				"Uint",
				"Float"
			].map(function(t) {
				return t + e + "Array";
			});
		}))).filter(function(e) {
			return u[e];
		}), Mr = new Set(Me.map(function(e) {
			return u[e];
		})), _t = null;
		function Ge(e) {
			return _t = /* @__PURE__ */ new WeakMap(), e = function t(i) {
				if (!i || typeof i != "object") return i;
				var c = _t.get(i);
				if (c) return c;
				if (h(i)) {
					c = [], _t.set(i, c);
					for (var l = 0, f = i.length; l < f; ++l) c.push(t(i[l]));
				} else if (Mr.has(i.constructor)) c = i;
				else {
					var p, m = y(i);
					for (p in c = m === Object.prototype ? {} : Object.create(m), _t.set(i, c), i) D(i, p) && (c[p] = t(i[p]));
				}
				return c;
			}(e), _t = null, e;
		}
		var fi = {}.toString;
		function Dn(e) {
			return fi.call(e).slice(8, -1);
		}
		var Rn = typeof Symbol < "u" ? Symbol.iterator : "@@iterator", hi = typeof Rn == "symbol" ? function(e) {
			var t;
			return e != null && (t = e[Rn]) && t.apply(e);
		} : function() {
			return null;
		};
		function Xe(e, t) {
			return t = e.indexOf(t), 0 <= t && e.splice(t, 1), 0 <= t;
		}
		var lt = {};
		function je(e) {
			var t, i, c, l;
			if (arguments.length === 1) {
				if (h(e)) return e.slice();
				if (this === lt && typeof e == "string") return [e];
				if (l = hi(e)) {
					for (i = []; !(c = l.next()).done;) i.push(c.value);
					return i;
				}
				if (e == null) return [e];
				if (typeof (t = e.length) != "number") return [e];
				for (i = new Array(t); t--;) i[t] = e[t];
				return i;
			}
			for (t = arguments.length, i = new Array(t); t--;) i[t] = arguments[t];
			return i;
		}
		var Tn = typeof Symbol < "u" ? function(e) {
			return e[Symbol.toStringTag] === "AsyncFunction";
		} : function() {
			return !1;
		}, Ct = [
			"Unknown",
			"Constraint",
			"Data",
			"TransactionInactive",
			"ReadOnly",
			"Version",
			"NotFound",
			"InvalidState",
			"InvalidAccess",
			"Abort",
			"Timeout",
			"QuotaExceeded",
			"Syntax",
			"DataClone"
		], xe = [
			"Modify",
			"Bulk",
			"OpenFailed",
			"VersionChange",
			"Schema",
			"Upgrade",
			"InvalidTable",
			"MissingAPI",
			"NoSuchDatabase",
			"InvalidArgument",
			"SubTransaction",
			"Unsupported",
			"Internal",
			"DatabaseClosed",
			"PrematureCommit",
			"ForeignAwait"
		].concat(Ct), pi = {
			VersionChanged: "Database version changed by other database connection",
			DatabaseClosed: "Database has been closed",
			Abort: "Transaction aborted",
			TransactionInactive: "Transaction has already completed or failed",
			MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
		};
		function dt(e, t) {
			this.name = e, this.message = t;
		}
		function Lr(e, t) {
			return e + ". Errors: " + Object.keys(t).map(function(i) {
				return t[i].toString();
			}).filter(function(i, c, l) {
				return l.indexOf(i) === c;
			}).join(`
`);
		}
		function zt(e, t, i, c) {
			this.failures = t, this.failedKeys = c, this.successCount = i, this.message = Lr(e, t);
		}
		function ft(e, t) {
			this.name = "BulkError", this.failures = Object.keys(t).map(function(i) {
				return t[i];
			}), this.failuresByPos = t, this.message = Lr(e, this.failures);
		}
		V(dt).from(Error).extend({ toString: function() {
			return this.name + ": " + this.message;
		} }), V(zt).from(dt), V(ft).from(dt);
		var jn = xe.reduce(function(e, t) {
			return e[t] = t + "Error", e;
		}, {}), mi = dt, W = xe.reduce(function(e, t) {
			var i = t + "Error";
			function c(l, f) {
				this.name = i, l ? typeof l == "string" ? (this.message = "".concat(l).concat(f ? `
 ` + f : ""), this.inner = f || null) : typeof l == "object" && (this.message = "".concat(l.name, " ").concat(l.message), this.inner = l) : (this.message = pi[t] || i, this.inner = null);
			}
			return V(c).from(mi), e[t] = c, e;
		}, {});
		W.Syntax = SyntaxError, W.Type = TypeError, W.Range = RangeError;
		var Fr = Ct.reduce(function(e, t) {
			return e[t + "Error"] = W[t], e;
		}, {}), $t = xe.reduce(function(e, t) {
			return [
				"Syntax",
				"Type",
				"Range"
			].indexOf(t) === -1 && (e[t + "Error"] = W[t]), e;
		}, {});
		function oe() {}
		function Et(e) {
			return e;
		}
		function yi(e, t) {
			return e == null || e === Et ? t : function(i) {
				return t(e(i));
			};
		}
		function Ye(e, t) {
			return function() {
				e.apply(this, arguments), t.apply(this, arguments);
			};
		}
		function gi(e, t) {
			return e === oe ? t : function() {
				var i = e.apply(this, arguments);
				i !== void 0 && (arguments[0] = i);
				var c = this.onsuccess, l = this.onerror;
				this.onsuccess = null, this.onerror = null;
				var f = t.apply(this, arguments);
				return c && (this.onsuccess = this.onsuccess ? Ye(c, this.onsuccess) : c), l && (this.onerror = this.onerror ? Ye(l, this.onerror) : l), f !== void 0 ? f : i;
			};
		}
		function bi(e, t) {
			return e === oe ? t : function() {
				e.apply(this, arguments);
				var i = this.onsuccess, c = this.onerror;
				this.onsuccess = this.onerror = null, t.apply(this, arguments), i && (this.onsuccess = this.onsuccess ? Ye(i, this.onsuccess) : i), c && (this.onerror = this.onerror ? Ye(c, this.onerror) : c);
			};
		}
		function vi(e, t) {
			return e === oe ? t : function(i) {
				var c = e.apply(this, arguments);
				b(i, c);
				var l = this.onsuccess, f = this.onerror;
				return this.onsuccess = null, this.onerror = null, i = t.apply(this, arguments), l && (this.onsuccess = this.onsuccess ? Ye(l, this.onsuccess) : l), f && (this.onerror = this.onerror ? Ye(f, this.onerror) : f), c === void 0 ? i === void 0 ? void 0 : i : b(c, i);
			};
		}
		function wi(e, t) {
			return e === oe ? t : function() {
				return t.apply(this, arguments) !== !1 && e.apply(this, arguments);
			};
		}
		function Bn(e, t) {
			return e === oe ? t : function() {
				var i = e.apply(this, arguments);
				if (i && typeof i.then == "function") {
					for (var c = this, l = arguments.length, f = new Array(l); l--;) f[l] = arguments[l];
					return i.then(function() {
						return t.apply(c, f);
					});
				}
				return t.apply(this, arguments);
			};
		}
		$t.ModifyError = zt, $t.DexieError = dt, $t.BulkError = ft;
		var Ne = typeof location < "u" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
		function Gr(e) {
			Ne = e;
		}
		var Pt = {}, Kr = 100, Me = typeof Promise > "u" ? [] : function() {
			var e = Promise.resolve();
			if (typeof crypto > "u" || !crypto.subtle) return [
				e,
				y(e),
				e
			];
			var t = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
			return [
				t,
				y(t),
				e
			];
		}(), Ct = Me[0], xe = Me[1], Me = Me[2], xe = xe && xe.then, It = Ct && Ct.constructor, Mn = !!Me, xt = function(e, t) {
			kt.push([e, t]), Vt && (queueMicrotask(Ai), Vt = !1);
		}, Ln = !0, Vt = !0, Qe = [], Wt = [], Fn = Et, Ke = {
			id: "global",
			global: !0,
			ref: 0,
			unhandleds: [],
			onunhandled: oe,
			pgp: !1,
			env: {},
			finalize: oe
		}, $ = Ke, kt = [], Ze = 0, Jt = [];
		function q(e) {
			if (typeof this != "object") throw new TypeError("Promises must be constructed via new");
			this._listeners = [], this._lib = !1;
			var t = this._PSD = $;
			if (typeof e != "function") {
				if (e !== Pt) throw new TypeError("Not a function");
				this._state = arguments[1], this._value = arguments[2], this._state === !1 && Kn(this, this._value);
				return;
			}
			this._state = null, this._value = null, ++t.ref, function i(c, l) {
				try {
					l(function(f) {
						if (c._state === null) {
							if (f === c) throw new TypeError("A promise cannot be resolved with itself.");
							var p = c._lib && ht();
							f && typeof f.then == "function" ? i(c, function(m, S) {
								f instanceof q ? f._then(m, S) : f.then(m, S);
							}) : (c._state = !0, c._value = f, Ur(c)), p && pt();
						}
					}, Kn.bind(null, c));
				} catch (f) {
					Kn(c, f);
				}
			}(this, e);
		}
		var Gn = {
			get: function() {
				var e = $, t = Zt;
				function i(c, l) {
					var f = this, p = !e.global && (e !== $ || t !== Zt), m = p && !Ue(), S = new q(function(v, E) {
						qn(f, new qr(zr(c, e, p, m), zr(l, e, p, m), v, E, e));
					});
					return this._consoleTask && (S._consoleTask = this._consoleTask), S;
				}
				return i.prototype = Pt, i;
			},
			set: function(e) {
				B(this, "then", e && e.prototype === Pt ? Gn : {
					get: function() {
						return e;
					},
					set: Gn.set
				});
			}
		};
		function qr(e, t, i, c, l) {
			this.onFulfilled = typeof e == "function" ? e : null, this.onRejected = typeof t == "function" ? t : null, this.resolve = i, this.reject = c, this.psd = l;
		}
		function Kn(e, t) {
			var i, c;
			Wt.push(t), e._state === null && (i = e._lib && ht(), t = Fn(t), e._state = !1, e._value = t, c = e, Qe.some(function(l) {
				return l._value === c._value;
			}) || Qe.push(c), Ur(e), i && pt());
		}
		function Ur(e) {
			var t = e._listeners;
			e._listeners = [];
			for (var i = 0, c = t.length; i < c; ++i) qn(e, t[i]);
			var l = e._PSD;
			--l.ref || l.finalize(), Ze === 0 && (++Ze, xt(function() {
				--Ze == 0 && Un();
			}, []));
		}
		function qn(e, t) {
			if (e._state !== null) {
				var i = e._state ? t.onFulfilled : t.onRejected;
				if (i === null) return (e._state ? t.resolve : t.reject)(e._value);
				++t.psd.ref, ++Ze, xt(Si, [
					i,
					e,
					t
				]);
			} else e._listeners.push(t);
		}
		function Si(e, t, i) {
			try {
				var c, l = t._value;
				!t._state && Wt.length && (Wt = []), c = Ne && t._consoleTask ? t._consoleTask.run(function() {
					return e(l);
				}) : e(l), t._state || Wt.indexOf(l) !== -1 || function(f) {
					for (var p = Qe.length; p;) if (Qe[--p]._value === f._value) return Qe.splice(p, 1);
				}(t), i.resolve(c);
			} catch (f) {
				i.reject(f);
			} finally {
				--Ze == 0 && Un(), --i.psd.ref || i.psd.finalize();
			}
		}
		function Ai() {
			et(Ke, function() {
				ht() && pt();
			});
		}
		function ht() {
			var e = Ln;
			return Vt = Ln = !1, e;
		}
		function pt() {
			var e, t, i;
			do
				for (; 0 < kt.length;) for (e = kt, kt = [], i = e.length, t = 0; t < i; ++t) {
					var c = e[t];
					c[0].apply(null, c[1]);
				}
			while (0 < kt.length);
			Vt = Ln = !0;
		}
		function Un() {
			var e = Qe;
			Qe = [], e.forEach(function(c) {
				c._PSD.onunhandled.call(null, c._value, c);
			});
			for (var t = Jt.slice(0), i = t.length; i;) t[--i]();
		}
		function Xt(e) {
			return new q(Pt, !1, e);
		}
		function ue(e, t) {
			var i = $;
			return function() {
				var c = ht(), l = $;
				try {
					return He(i, !0), e.apply(this, arguments);
				} catch (f) {
					t && t(f);
				} finally {
					He(l, !1), c && pt();
				}
			};
		}
		M(q.prototype, {
			then: Gn,
			_then: function(e, t) {
				qn(this, new qr(null, null, e, t, $));
			},
			catch: function(e) {
				if (arguments.length === 1) return this.then(null, e);
				var t = e, i = arguments[1];
				return typeof t == "function" ? this.then(null, function(c) {
					return (c instanceof t ? i : Xt)(c);
				}) : this.then(null, function(c) {
					return (c && c.name === t ? i : Xt)(c);
				});
			},
			finally: function(e) {
				return this.then(function(t) {
					return q.resolve(e()).then(function() {
						return t;
					});
				}, function(t) {
					return q.resolve(e()).then(function() {
						return Xt(t);
					});
				});
			},
			timeout: function(e, t) {
				var i = this;
				return e < Infinity ? new q(function(c, l) {
					var f = setTimeout(function() {
						return l(new W.Timeout(t));
					}, e);
					i.then(c, l).finally(clearTimeout.bind(null, f));
				}) : this;
			}
		}), typeof Symbol < "u" && Symbol.toStringTag && B(q.prototype, Symbol.toStringTag, "Dexie.Promise"), Ke.env = Hr(), M(q, {
			all: function() {
				var e = je.apply(null, arguments).map(en);
				return new q(function(t, i) {
					e.length === 0 && t([]);
					var c = e.length;
					e.forEach(function(l, f) {
						return q.resolve(l).then(function(p) {
							e[f] = p, --c || t(e);
						}, i);
					});
				});
			},
			resolve: function(e) {
				return e instanceof q ? e : e && typeof e.then == "function" ? new q(function(t, i) {
					e.then(t, i);
				}) : new q(Pt, !0, e);
			},
			reject: Xt,
			race: function() {
				var e = je.apply(null, arguments).map(en);
				return new q(function(t, i) {
					e.map(function(c) {
						return q.resolve(c).then(t, i);
					});
				});
			},
			PSD: {
				get: function() {
					return $;
				},
				set: function(e) {
					return $ = e;
				}
			},
			totalEchoes: { get: function() {
				return Zt;
			} },
			newPSD: qe,
			usePSD: et,
			scheduler: {
				get: function() {
					return xt;
				},
				set: function(e) {
					xt = e;
				}
			},
			rejectionMapper: {
				get: function() {
					return Fn;
				},
				set: function(e) {
					Fn = e;
				}
			},
			follow: function(e, t) {
				return new q(function(i, c) {
					return qe(function(l, f) {
						var p = $;
						p.unhandleds = [], p.onunhandled = f, p.finalize = Ye(function() {
							var m, S = this;
							m = function() {
								S.unhandleds.length === 0 ? l() : f(S.unhandleds[0]);
							}, Jt.push(function v() {
								m(), Jt.splice(Jt.indexOf(v), 1);
							}), ++Ze, xt(function() {
								--Ze == 0 && Un();
							}, []);
						}, p.finalize), e();
					}, t, i, c);
				});
			}
		}), It && (It.allSettled && B(q, "allSettled", function() {
			var e = je.apply(null, arguments).map(en);
			return new q(function(t) {
				e.length === 0 && t([]);
				var i = e.length, c = new Array(i);
				e.forEach(function(l, f) {
					return q.resolve(l).then(function(p) {
						return c[f] = {
							status: "fulfilled",
							value: p
						};
					}, function(p) {
						return c[f] = {
							status: "rejected",
							reason: p
						};
					}).then(function() {
						return --i || t(c);
					});
				});
			});
		}), It.any && typeof AggregateError < "u" && B(q, "any", function() {
			var e = je.apply(null, arguments).map(en);
			return new q(function(t, i) {
				e.length === 0 && i(/* @__PURE__ */ new AggregateError([]));
				var c = e.length, l = new Array(c);
				e.forEach(function(f, p) {
					return q.resolve(f).then(function(m) {
						return t(m);
					}, function(m) {
						l[p] = m, --c || i(new AggregateError(l));
					});
				});
			});
		}));
		var ye = {
			awaits: 0,
			echoes: 0,
			id: 0
		}, _i = 0, Yt = [], Qt = 0, Zt = 0, Ei = 0;
		function qe(e, t, i, c) {
			var l = $, f = Object.create(l);
			return f.parent = l, f.ref = 0, f.global = !1, f.id = ++Ei, Ke.env, f.env = Mn ? {
				Promise: q,
				PromiseProp: {
					value: q,
					configurable: !0,
					writable: !0
				},
				all: q.all,
				race: q.race,
				allSettled: q.allSettled,
				any: q.any,
				resolve: q.resolve,
				reject: q.reject
			} : {}, t && b(f, t), ++l.ref, f.finalize = function() {
				--this.parent.ref || this.parent.finalize();
			}, c = et(f, e, i, c), f.ref === 0 && f.finalize(), c;
		}
		function mt() {
			return ye.id || (ye.id = ++_i), ++ye.awaits, ye.echoes += Kr, ye.id;
		}
		function Ue() {
			return !!ye.awaits && (--ye.awaits == 0 && (ye.id = 0), ye.echoes = ye.awaits * Kr, !0);
		}
		function en(e) {
			return ye.echoes && e && e.constructor === It ? (mt(), e.then(function(t) {
				return Ue(), t;
			}, function(t) {
				return Ue(), fe(t);
			})) : e;
		}
		function Pi() {
			var e = Yt[Yt.length - 1];
			Yt.pop(), He(e, !1);
		}
		function He(e, t) {
			var i, c = $;
			(t ? !ye.echoes || Qt++ && e === $ : !Qt || --Qt && e === $) || queueMicrotask(t ? (function(l) {
				++Zt, ye.echoes && --ye.echoes != 0 || (ye.echoes = ye.awaits = ye.id = 0), Yt.push($), He(l, !0);
			}).bind(null, e) : Pi), e !== $ && ($ = e, c === Ke && (Ke.env = Hr()), Mn && (i = Ke.env.Promise, t = e.env, (c.global || e.global) && (Object.defineProperty(u, "Promise", t.PromiseProp), i.all = t.all, i.race = t.race, i.resolve = t.resolve, i.reject = t.reject, t.allSettled && (i.allSettled = t.allSettled), t.any && (i.any = t.any))));
		}
		function Hr() {
			var e = u.Promise;
			return Mn ? {
				Promise: e,
				PromiseProp: Object.getOwnPropertyDescriptor(u, "Promise"),
				all: e.all,
				race: e.race,
				allSettled: e.allSettled,
				any: e.any,
				resolve: e.resolve,
				reject: e.reject
			} : {};
		}
		function et(e, t, i, c, l) {
			var f = $;
			try {
				return He(e, !0), t(i, c, l);
			} finally {
				He(f, !1);
			}
		}
		function zr(e, t, i, c) {
			return typeof e != "function" ? e : function() {
				var l = $;
				i && mt(), He(t, !0);
				try {
					return e.apply(this, arguments);
				} finally {
					He(l, !1), c && queueMicrotask(Ue);
				}
			};
		}
		function Hn(e) {
			Promise === It && ye.echoes === 0 ? Qt === 0 ? e() : enqueueNativeMicroTask(e) : setTimeout(e, 0);
		}
		("" + xe).indexOf("[native code]") === -1 && (mt = Ue = oe);
		var fe = q.reject, tt = "￿", Be = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", $r = "String expected.", yt = [], tn = "__dbnames", zn = "readonly", $n = "readwrite";
		function nt(e, t) {
			return e ? t ? function() {
				return e.apply(this, arguments) && t.apply(this, arguments);
			} : e : t;
		}
		var Vr = {
			type: 3,
			lower: -Infinity,
			lowerOpen: !1,
			upper: [[]],
			upperOpen: !1
		};
		function nn(e) {
			return typeof e != "string" || /\./.test(e) ? function(t) {
				return t;
			} : function(t) {
				return t[e] === void 0 && e in t && delete (t = Ge(t))[e], t;
			};
		}
		function Wr() {
			throw W.Type();
		}
		function re(e, t) {
			try {
				var i = Jr(e), c = Jr(t);
				if (i !== c) return i === "Array" ? 1 : c === "Array" ? -1 : i === "binary" ? 1 : c === "binary" ? -1 : i === "string" ? 1 : c === "string" ? -1 : i === "Date" ? 1 : c !== "Date" ? NaN : -1;
				switch (i) {
					case "number":
					case "Date":
					case "string": return t < e ? 1 : e < t ? -1 : 0;
					case "binary": return function(l, f) {
						for (var p = l.length, m = f.length, S = p < m ? p : m, v = 0; v < S; ++v) if (l[v] !== f[v]) return l[v] < f[v] ? -1 : 1;
						return p === m ? 0 : p < m ? -1 : 1;
					}(Xr(e), Xr(t));
					case "Array": return function(l, f) {
						for (var p = l.length, m = f.length, S = p < m ? p : m, v = 0; v < S; ++v) {
							var E = re(l[v], f[v]);
							if (E !== 0) return E;
						}
						return p === m ? 0 : p < m ? -1 : 1;
					}(e, t);
				}
			} catch {}
			return NaN;
		}
		function Jr(e) {
			var t = typeof e;
			return t != "object" ? t : ArrayBuffer.isView(e) ? "binary" : (e = Dn(e), e === "ArrayBuffer" ? "binary" : e);
		}
		function Xr(e) {
			return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(e);
		}
		var Yr = (ce.prototype._trans = function(e, t, i) {
			var c = this._tx || $.trans, l = this.name, f = Ne && typeof console < "u" && console.createTask && console.createTask("Dexie: ".concat(e === "readonly" ? "read" : "write", " ").concat(this.name));
			function p(v, E, g) {
				if (!g.schema[l]) throw new W.NotFound("Table " + l + " not part of transaction");
				return t(g.idbtrans, g);
			}
			var m = ht();
			try {
				var S = c && c.db._novip === this.db._novip ? c === $.trans ? c._promise(e, p, i) : qe(function() {
					return c._promise(e, p, i);
				}, {
					trans: c,
					transless: $.transless || $
				}) : function v(E, g, C, w) {
					if (E.idbdb && (E._state.openComplete || $.letThrough || E._vip)) {
						var _ = E._createTransaction(g, C, E._dbSchema);
						try {
							_.create(), E._state.PR1398_maxLoop = 3;
						} catch (I) {
							return I.name === jn.InvalidState && E.isOpen() && 0 < --E._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), E.close({ disableAutoOpen: !1 }), E.open().then(function() {
								return v(E, g, C, w);
							})) : fe(I);
						}
						return _._promise(g, function(I, A) {
							return qe(function() {
								return $.trans = _, w(I, A, _);
							});
						}).then(function(I) {
							if (g === "readwrite") try {
								_.idbtrans.commit();
							} catch {}
							return g === "readonly" ? I : _._completion.then(function() {
								return I;
							});
						});
					}
					if (E._state.openComplete) return fe(new W.DatabaseClosed(E._state.dbOpenError));
					if (!E._state.isBeingOpened) {
						if (!E._state.autoOpen) return fe(new W.DatabaseClosed());
						E.open().catch(oe);
					}
					return E._state.dbReadyPromise.then(function() {
						return v(E, g, C, w);
					});
				}(this.db, e, [this.name], p);
				return f && (S._consoleTask = f, S = S.catch(function(v) {
					return console.trace(v), fe(v);
				})), S;
			} finally {
				m && pt();
			}
		}, ce.prototype.get = function(e, t) {
			var i = this;
			return e && e.constructor === Object ? this.where(e).first(t) : e == null ? fe(new W.Type("Invalid argument to Table.get()")) : this._trans("readonly", function(c) {
				return i.core.get({
					trans: c,
					key: e
				}).then(function(l) {
					return i.hook.reading.fire(l);
				});
			}).then(t);
		}, ce.prototype.where = function(e) {
			if (typeof e == "string") return new this.db.WhereClause(this, e);
			if (h(e)) return new this.db.WhereClause(this, "[".concat(e.join("+"), "]"));
			var t = d(e);
			if (t.length === 1) return this.where(t[0]).equals(e[t[0]]);
			var i = this.schema.indexes.concat(this.schema.primKey).filter(function(S) {
				if (S.compound && t.every(function(E) {
					return 0 <= S.keyPath.indexOf(E);
				})) {
					for (var v = 0; v < t.length; ++v) if (t.indexOf(S.keyPath[v]) === -1) return !1;
					return !0;
				}
				return !1;
			}).sort(function(S, v) {
				return S.keyPath.length - v.keyPath.length;
			})[0];
			if (i && this.db._maxKey !== tt) {
				var p = i.keyPath.slice(0, t.length);
				return this.where(p).equals(p.map(function(v) {
					return e[v];
				}));
			}
			!i && Ne && console.warn("The query ".concat(JSON.stringify(e), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(t.join("+"), "]"));
			var c = this.schema.idxByName, l = this.db._deps.indexedDB;
			function f(S, v) {
				return l.cmp(S, v) === 0;
			}
			var m = t.reduce(function(C, v) {
				var E = C[0], g = C[1], C = c[v], w = e[v];
				return [E || C, E || !C ? nt(g, C && C.multi ? function(_) {
					return _ = me(_, v), h(_) && _.some(function(I) {
						return f(w, I);
					});
				} : function(_) {
					return f(w, me(_, v));
				}) : g];
			}, [null, null]), p = m[0], m = m[1];
			return p ? this.where(p.name).equals(e[p.keyPath]).filter(m) : i ? this.filter(m) : this.where(t).equals("");
		}, ce.prototype.filter = function(e) {
			return this.toCollection().and(e);
		}, ce.prototype.count = function(e) {
			return this.toCollection().count(e);
		}, ce.prototype.offset = function(e) {
			return this.toCollection().offset(e);
		}, ce.prototype.limit = function(e) {
			return this.toCollection().limit(e);
		}, ce.prototype.each = function(e) {
			return this.toCollection().each(e);
		}, ce.prototype.toArray = function(e) {
			return this.toCollection().toArray(e);
		}, ce.prototype.toCollection = function() {
			return new this.db.Collection(new this.db.WhereClause(this));
		}, ce.prototype.orderBy = function(e) {
			return new this.db.Collection(new this.db.WhereClause(this, h(e) ? "[".concat(e.join("+"), "]") : e));
		}, ce.prototype.reverse = function() {
			return this.toCollection().reverse();
		}, ce.prototype.mapToClass = function(e) {
			var t, i = this.db, c = this.name;
			function l() {
				return t !== null && t.apply(this, arguments) || this;
			}
			(this.schema.mappedClass = e).prototype instanceof Wr && (function(S, v) {
				if (typeof v != "function" && v !== null) throw new TypeError("Class extends value " + String(v) + " is not a constructor or null");
				function E() {
					this.constructor = S;
				}
				n(S, v), S.prototype = v === null ? Object.create(v) : (E.prototype = v.prototype, new E());
			}(l, t = e), Object.defineProperty(l.prototype, "db", {
				get: function() {
					return i;
				},
				enumerable: !1,
				configurable: !0
			}), l.prototype.table = function() {
				return c;
			}, e = l);
			for (var f = /* @__PURE__ */ new Set(), p = e.prototype; p; p = y(p)) Object.getOwnPropertyNames(p).forEach(function(S) {
				return f.add(S);
			});
			function m(S) {
				if (!S) return S;
				var v, E = Object.create(e.prototype);
				for (v in S) if (!f.has(v)) try {
					E[v] = S[v];
				} catch {}
				return E;
			}
			return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = m, this.hook("reading", m), e;
		}, ce.prototype.defineClass = function() {
			return this.mapToClass(function(e) {
				b(this, e);
			});
		}, ce.prototype.add = function(e, t) {
			var i = this, c = this.schema.primKey, l = c.auto, f = c.keyPath, p = e;
			return f && l && (p = nn(f)(e)), this._trans("readwrite", function(m) {
				return i.core.mutate({
					trans: m,
					type: "add",
					keys: t != null ? [t] : null,
					values: [p]
				});
			}).then(function(m) {
				return m.numFailures ? q.reject(m.failures[0]) : m.lastResult;
			}).then(function(m) {
				if (f) try {
					de(e, f, m);
				} catch {}
				return m;
			});
		}, ce.prototype.update = function(e, t) {
			return typeof e != "object" || h(e) ? this.where(":id").equals(e).modify(t) : (e = me(e, this.schema.primKey.keyPath), e === void 0 ? fe(new W.InvalidArgument("Given object does not contain its primary key")) : this.where(":id").equals(e).modify(t));
		}, ce.prototype.put = function(e, t) {
			var i = this, c = this.schema.primKey, l = c.auto, f = c.keyPath, p = e;
			return f && l && (p = nn(f)(e)), this._trans("readwrite", function(m) {
				return i.core.mutate({
					trans: m,
					type: "put",
					values: [p],
					keys: t != null ? [t] : null
				});
			}).then(function(m) {
				return m.numFailures ? q.reject(m.failures[0]) : m.lastResult;
			}).then(function(m) {
				if (f) try {
					de(e, f, m);
				} catch {}
				return m;
			});
		}, ce.prototype.delete = function(e) {
			var t = this;
			return this._trans("readwrite", function(i) {
				return t.core.mutate({
					trans: i,
					type: "delete",
					keys: [e]
				});
			}).then(function(i) {
				return i.numFailures ? q.reject(i.failures[0]) : void 0;
			});
		}, ce.prototype.clear = function() {
			var e = this;
			return this._trans("readwrite", function(t) {
				return e.core.mutate({
					trans: t,
					type: "deleteRange",
					range: Vr
				});
			}).then(function(t) {
				return t.numFailures ? q.reject(t.failures[0]) : void 0;
			});
		}, ce.prototype.bulkGet = function(e) {
			var t = this;
			return this._trans("readonly", function(i) {
				return t.core.getMany({
					keys: e,
					trans: i
				}).then(function(c) {
					return c.map(function(l) {
						return t.hook.reading.fire(l);
					});
				});
			});
		}, ce.prototype.bulkAdd = function(e, t, i) {
			var c = this, l = Array.isArray(t) ? t : void 0, f = (i = i || (l ? void 0 : t)) ? i.allKeys : void 0;
			return this._trans("readwrite", function(p) {
				var v = c.schema.primKey, m = v.auto, v = v.keyPath;
				if (v && l) throw new W.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
				if (l && l.length !== e.length) throw new W.InvalidArgument("Arguments objects and keys must have the same length");
				var S = e.length, v = v && m ? e.map(nn(v)) : e;
				return c.core.mutate({
					trans: p,
					type: "add",
					keys: l,
					values: v,
					wantResults: f
				}).then(function(_) {
					var g = _.numFailures, C = _.results, w = _.lastResult, _ = _.failures;
					if (g === 0) return f ? C : w;
					throw new ft("".concat(c.name, ".bulkAdd(): ").concat(g, " of ").concat(S, " operations failed"), _);
				});
			});
		}, ce.prototype.bulkPut = function(e, t, i) {
			var c = this, l = Array.isArray(t) ? t : void 0, f = (i = i || (l ? void 0 : t)) ? i.allKeys : void 0;
			return this._trans("readwrite", function(p) {
				var v = c.schema.primKey, m = v.auto, v = v.keyPath;
				if (v && l) throw new W.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
				if (l && l.length !== e.length) throw new W.InvalidArgument("Arguments objects and keys must have the same length");
				var S = e.length, v = v && m ? e.map(nn(v)) : e;
				return c.core.mutate({
					trans: p,
					type: "put",
					keys: l,
					values: v,
					wantResults: f
				}).then(function(_) {
					var g = _.numFailures, C = _.results, w = _.lastResult, _ = _.failures;
					if (g === 0) return f ? C : w;
					throw new ft("".concat(c.name, ".bulkPut(): ").concat(g, " of ").concat(S, " operations failed"), _);
				});
			});
		}, ce.prototype.bulkUpdate = function(e) {
			var t = this, i = this.core, c = e.map(function(p) {
				return p.key;
			}), l = e.map(function(p) {
				return p.changes;
			}), f = [];
			return this._trans("readwrite", function(p) {
				return i.getMany({
					trans: p,
					keys: c,
					cache: "clone"
				}).then(function(m) {
					var S = [], v = [];
					e.forEach(function(g, C) {
						var w = g.key, _ = g.changes, I = m[C];
						if (I) {
							for (var A = 0, x = Object.keys(_); A < x.length; A++) {
								var k = x[A], O = _[k];
								if (k === t.schema.primKey.keyPath) {
									if (re(O, w) !== 0) throw new W.Constraint("Cannot update primary key in bulkUpdate()");
								} else de(I, k, O);
							}
							f.push(C), S.push(w), v.push(I);
						}
					});
					var E = S.length;
					return i.mutate({
						trans: p,
						type: "put",
						keys: S,
						values: v,
						updates: {
							keys: c,
							changeSpecs: l
						}
					}).then(function(g) {
						var C = g.numFailures, w = g.failures;
						if (C === 0) return E;
						for (var _ = 0, I = Object.keys(w); _ < I.length; _++) {
							var A, x = I[_], k = f[Number(x)];
							k != null && (A = w[x], delete w[x], w[k] = A);
						}
						throw new ft("".concat(t.name, ".bulkUpdate(): ").concat(C, " of ").concat(E, " operations failed"), w);
					});
				});
			});
		}, ce.prototype.bulkDelete = function(e) {
			var t = this, i = e.length;
			return this._trans("readwrite", function(c) {
				return t.core.mutate({
					trans: c,
					type: "delete",
					keys: e
				});
			}).then(function(p) {
				var l = p.numFailures, f = p.lastResult, p = p.failures;
				if (l === 0) return f;
				throw new ft("".concat(t.name, ".bulkDelete(): ").concat(l, " of ").concat(i, " operations failed"), p);
			});
		}, ce);
		function ce() {}
		function Ot(e) {
			function t(p, m) {
				if (m) {
					for (var S = arguments.length, v = new Array(S - 1); --S;) v[S - 1] = arguments[S];
					return i[p].subscribe.apply(null, v), e;
				}
				if (typeof p == "string") return i[p];
			}
			var i = {};
			t.addEventType = f;
			for (var c = 1, l = arguments.length; c < l; ++c) f(arguments[c]);
			return t;
			function f(p, m, S) {
				if (typeof p != "object") {
					var v;
					m = m || wi;
					var E = {
						subscribers: [],
						fire: S = S || oe,
						subscribe: function(g) {
							E.subscribers.indexOf(g) === -1 && (E.subscribers.push(g), E.fire = m(E.fire, g));
						},
						unsubscribe: function(g) {
							E.subscribers = E.subscribers.filter(function(C) {
								return C !== g;
							}), E.fire = E.subscribers.reduce(m, S);
						}
					};
					return i[p] = t[p] = E;
				}
				d(v = p).forEach(function(g) {
					var C = v[g];
					if (h(C)) f(g, v[g][0], v[g][1]);
					else {
						if (C !== "asap") throw new W.InvalidArgument("Invalid event config");
						var w = f(g, Et, function() {
							for (var _ = arguments.length, I = new Array(_); _--;) I[_] = arguments[_];
							w.subscribers.forEach(function(A) {
								be(function() {
									A.apply(null, I);
								});
							});
						});
					}
				});
			}
		}
		function Nt(e, t) {
			return V(t).from({ prototype: e }), t;
		}
		function gt(e, t) {
			return !(e.filter || e.algorithm || e.or) && (t ? e.justLimit : !e.replayFilter);
		}
		function Vn(e, t) {
			e.filter = nt(e.filter, t);
		}
		function Wn(e, t, i) {
			var c = e.replayFilter;
			e.replayFilter = c ? function() {
				return nt(c(), t());
			} : t, e.justLimit = i && !c;
		}
		function rn(e, t) {
			if (e.isPrimKey) return t.primaryKey;
			var i = t.getIndexByKeyPath(e.index);
			if (!i) throw new W.Schema("KeyPath " + e.index + " on object store " + t.name + " is not indexed");
			return i;
		}
		function Qr(e, t, i) {
			var c = rn(e, t.schema);
			return t.openCursor({
				trans: i,
				values: !e.keysOnly,
				reverse: e.dir === "prev",
				unique: !!e.unique,
				query: {
					index: c,
					range: e.range
				}
			});
		}
		function sn(e, t, i, c) {
			var l = e.replayFilter ? nt(e.filter, e.replayFilter()) : e.filter;
			if (e.or) {
				var f = {}, p = function(m, S, v) {
					var E, g;
					l && !l(S, v, function(C) {
						return S.stop(C);
					}, function(C) {
						return S.fail(C);
					}) || ((g = "" + (E = S.primaryKey)) == "[object ArrayBuffer]" && (g = "" + new Uint8Array(E)), D(f, g) || (f[g] = !0, t(m, S, v)));
				};
				return Promise.all([e.or._iterate(p, i), Zr(Qr(e, c, i), e.algorithm, p, !e.keysOnly && e.valueMapper)]);
			}
			return Zr(Qr(e, c, i), nt(e.algorithm, l), t, !e.keysOnly && e.valueMapper);
		}
		function Zr(e, t, i, c) {
			var l = ue(c ? function(f, p, m) {
				return i(c(f), p, m);
			} : i);
			return e.then(function(f) {
				if (f) return f.start(function() {
					var p = function() {
						return f.continue();
					};
					t && !t(f, function(m) {
						return p = m;
					}, function(m) {
						f.stop(m), p = oe;
					}, function(m) {
						f.fail(m), p = oe;
					}) || l(f.value, f, function(m) {
						return p = m;
					}), p();
				});
			});
		}
		var Me = Symbol(), Dt = (es.prototype.execute = function(e) {
			if (this.add !== void 0) {
				var t = this.add;
				if (h(t)) return a(a([], h(e) ? e : [], !0), t).sort();
				if (typeof t == "number") return (Number(e) || 0) + t;
				if (typeof t == "bigint") try {
					return BigInt(e) + t;
				} catch {
					return BigInt(0) + t;
				}
				throw new TypeError("Invalid term ".concat(t));
			}
			if (this.remove !== void 0) {
				var i = this.remove;
				if (h(i)) return h(e) ? e.filter(function(c) {
					return !i.includes(c);
				}).sort() : [];
				if (typeof i == "number") return Number(e) - i;
				if (typeof i == "bigint") try {
					return BigInt(e) - i;
				} catch {
					return BigInt(0) - i;
				}
				throw new TypeError("Invalid subtrahend ".concat(i));
			}
			return t = (t = this.replacePrefix) === null || t === void 0 ? void 0 : t[0], t && typeof e == "string" && e.startsWith(t) ? this.replacePrefix[1] + e.substring(t.length) : e;
		}, es);
		function es(e) {
			Object.assign(this, e);
		}
		var Ci = (ne.prototype._read = function(e, t) {
			var i = this._ctx;
			return i.error ? i.table._trans(null, fe.bind(null, i.error)) : i.table._trans("readonly", e).then(t);
		}, ne.prototype._write = function(e) {
			var t = this._ctx;
			return t.error ? t.table._trans(null, fe.bind(null, t.error)) : t.table._trans("readwrite", e, "locked");
		}, ne.prototype._addAlgorithm = function(e) {
			var t = this._ctx;
			t.algorithm = nt(t.algorithm, e);
		}, ne.prototype._iterate = function(e, t) {
			return sn(this._ctx, e, t, this._ctx.table.core);
		}, ne.prototype.clone = function(e) {
			var t = Object.create(this.constructor.prototype), i = Object.create(this._ctx);
			return e && b(i, e), t._ctx = i, t;
		}, ne.prototype.raw = function() {
			return this._ctx.valueMapper = null, this;
		}, ne.prototype.each = function(e) {
			var t = this._ctx;
			return this._read(function(i) {
				return sn(t, e, i, t.table.core);
			});
		}, ne.prototype.count = function(e) {
			var t = this;
			return this._read(function(i) {
				var c = t._ctx, l = c.table.core;
				if (gt(c, !0)) return l.count({
					trans: i,
					query: {
						index: rn(c, l.schema),
						range: c.range
					}
				}).then(function(p) {
					return Math.min(p, c.limit);
				});
				var f = 0;
				return sn(c, function() {
					return ++f, !1;
				}, i, l).then(function() {
					return f;
				});
			}).then(e);
		}, ne.prototype.sortBy = function(e, t) {
			var i = e.split(".").reverse(), c = i[0], l = i.length - 1;
			function f(S, v) {
				return v ? f(S[i[v]], v - 1) : S[c];
			}
			var p = this._ctx.dir === "next" ? 1 : -1;
			function m(S, v) {
				return S = f(S, l), v = f(v, l), S < v ? -p : v < S ? p : 0;
			}
			return this.toArray(function(S) {
				return S.sort(m);
			}).then(t);
		}, ne.prototype.toArray = function(e) {
			var t = this;
			return this._read(function(i) {
				var c = t._ctx;
				if (c.dir === "next" && gt(c, !0) && 0 < c.limit) {
					var l = c.valueMapper, f = rn(c, c.table.core.schema);
					return c.table.core.query({
						trans: i,
						limit: c.limit,
						values: !0,
						query: {
							index: f,
							range: c.range
						}
					}).then(function(m) {
						return m = m.result, l ? m.map(l) : m;
					});
				}
				var p = [];
				return sn(c, function(m) {
					return p.push(m);
				}, i, c.table.core).then(function() {
					return p;
				});
			}, e);
		}, ne.prototype.offset = function(e) {
			var t = this._ctx;
			return e <= 0 || (t.offset += e, gt(t) ? Wn(t, function() {
				var i = e;
				return function(c, l) {
					return i === 0 || (i === 1 ? --i : l(function() {
						c.advance(i), i = 0;
					}), !1);
				};
			}) : Wn(t, function() {
				var i = e;
				return function() {
					return --i < 0;
				};
			})), this;
		}, ne.prototype.limit = function(e) {
			return this._ctx.limit = Math.min(this._ctx.limit, e), Wn(this._ctx, function() {
				var t = e;
				return function(i, c, l) {
					return --t <= 0 && c(l), 0 <= t;
				};
			}, !0), this;
		}, ne.prototype.until = function(e, t) {
			return Vn(this._ctx, function(i, c, l) {
				return !e(i.value) || (c(l), t);
			}), this;
		}, ne.prototype.first = function(e) {
			return this.limit(1).toArray(function(t) {
				return t[0];
			}).then(e);
		}, ne.prototype.last = function(e) {
			return this.reverse().first(e);
		}, ne.prototype.filter = function(e) {
			var t;
			return Vn(this._ctx, function(i) {
				return e(i.value);
			}), (t = this._ctx).isMatch = nt(t.isMatch, e), this;
		}, ne.prototype.and = function(e) {
			return this.filter(e);
		}, ne.prototype.or = function(e) {
			return new this.db.WhereClause(this._ctx.table, e, this);
		}, ne.prototype.reverse = function() {
			return this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
		}, ne.prototype.desc = function() {
			return this.reverse();
		}, ne.prototype.eachKey = function(e) {
			var t = this._ctx;
			return t.keysOnly = !t.isMatch, this.each(function(i, c) {
				e(c.key, c);
			});
		}, ne.prototype.eachUniqueKey = function(e) {
			return this._ctx.unique = "unique", this.eachKey(e);
		}, ne.prototype.eachPrimaryKey = function(e) {
			var t = this._ctx;
			return t.keysOnly = !t.isMatch, this.each(function(i, c) {
				e(c.primaryKey, c);
			});
		}, ne.prototype.keys = function(e) {
			var t = this._ctx;
			t.keysOnly = !t.isMatch;
			var i = [];
			return this.each(function(c, l) {
				i.push(l.key);
			}).then(function() {
				return i;
			}).then(e);
		}, ne.prototype.primaryKeys = function(e) {
			var t = this._ctx;
			if (t.dir === "next" && gt(t, !0) && 0 < t.limit) return this._read(function(c) {
				var l = rn(t, t.table.core.schema);
				return t.table.core.query({
					trans: c,
					values: !1,
					limit: t.limit,
					query: {
						index: l,
						range: t.range
					}
				});
			}).then(function(c) {
				return c.result;
			}).then(e);
			t.keysOnly = !t.isMatch;
			var i = [];
			return this.each(function(c, l) {
				i.push(l.primaryKey);
			}).then(function() {
				return i;
			}).then(e);
		}, ne.prototype.uniqueKeys = function(e) {
			return this._ctx.unique = "unique", this.keys(e);
		}, ne.prototype.firstKey = function(e) {
			return this.limit(1).keys(function(t) {
				return t[0];
			}).then(e);
		}, ne.prototype.lastKey = function(e) {
			return this.reverse().firstKey(e);
		}, ne.prototype.distinct = function() {
			var e = this._ctx, e = e.index && e.table.schema.idxByName[e.index];
			if (!e || !e.multi) return this;
			var t = {};
			return Vn(this._ctx, function(l) {
				var c = l.primaryKey.toString(), l = D(t, c);
				return t[c] = !0, !l;
			}), this;
		}, ne.prototype.modify = function(e) {
			var t = this, i = this._ctx;
			return this._write(function(c) {
				var l, f, p = typeof e == "function" ? e : (l = d(e), f = l.length, function(A) {
					for (var x = !1, k = 0; k < f; ++k) {
						var O = l[k], R = e[O], T = me(A, O);
						R instanceof Dt ? (de(A, O, R.execute(T)), x = !0) : T !== R && (de(A, O, R), x = !0);
					}
					return x;
				});
				function m(A, O) {
					var k = O.failures, O = O.numFailures;
					_ += A - O;
					for (var R = 0, T = d(k); R < T.length; R++) {
						var G = T[R];
						w.push(k[G]);
					}
				}
				var S = i.table.core, v = S.schema.primaryKey, E = v.outbound, g = v.extractKey, C = t.db._options.modifyChunkSize || 200, w = [], _ = 0, I = [];
				return t.clone().primaryKeys().then(function(A) {
					function x(O) {
						var R = Math.min(C, A.length - O);
						return S.getMany({
							trans: c,
							keys: A.slice(O, O + R),
							cache: "immutable"
						}).then(function(T) {
							for (var G = [], j = [], F = E ? [] : null, K = [], L = 0; L < R; ++L) {
								var J = T[L], X = {
									value: Ge(J),
									primKey: A[O + L]
								};
								p.call(X, X.value, X) !== !1 && (X.value == null ? K.push(A[O + L]) : E || re(g(J), g(X.value)) === 0 ? (j.push(X.value), E && F.push(A[O + L])) : (K.push(A[O + L]), G.push(X.value)));
							}
							return Promise.resolve(0 < G.length && S.mutate({
								trans: c,
								type: "add",
								values: G
							}).then(function(ee) {
								for (var Q in ee.failures) K.splice(parseInt(Q), 1);
								m(G.length, ee);
							})).then(function() {
								return (0 < j.length || k && typeof e == "object") && S.mutate({
									trans: c,
									type: "put",
									keys: F,
									values: j,
									criteria: k,
									changeSpec: typeof e != "function" && e,
									isAdditionalChunk: 0 < O
								}).then(function(ee) {
									return m(j.length, ee);
								});
							}).then(function() {
								return (0 < K.length || k && e === Jn) && S.mutate({
									trans: c,
									type: "delete",
									keys: K,
									criteria: k,
									isAdditionalChunk: 0 < O
								}).then(function(ee) {
									return m(K.length, ee);
								});
							}).then(function() {
								return A.length > O + R && x(O + C);
							});
						});
					}
					var k = gt(i) && i.limit === Infinity && (typeof e != "function" || e === Jn) && {
						index: i.index,
						range: i.range
					};
					return x(0).then(function() {
						if (0 < w.length) throw new zt("Error modifying one or more objects", w, _, I);
						return A.length;
					});
				});
			});
		}, ne.prototype.delete = function() {
			var e = this._ctx, t = e.range;
			return gt(e) && (e.isPrimKey || t.type === 3) ? this._write(function(i) {
				var c = e.table.core.schema.primaryKey, l = t;
				return e.table.core.count({
					trans: i,
					query: {
						index: c,
						range: l
					}
				}).then(function(f) {
					return e.table.core.mutate({
						trans: i,
						type: "deleteRange",
						range: l
					}).then(function(p) {
						var m = p.failures;
						if (p.lastResult, p.results, p = p.numFailures, p) throw new zt("Could not delete some values", Object.keys(m).map(function(S) {
							return m[S];
						}), f - p);
						return f - p;
					});
				});
			}) : this.modify(Jn);
		}, ne);
		function ne() {}
		var Jn = function(e, t) {
			return t.value = null;
		};
		function Ii(e, t) {
			return e < t ? -1 : e === t ? 0 : 1;
		}
		function xi(e, t) {
			return t < e ? -1 : e === t ? 0 : 1;
		}
		function Ce(e, t, i) {
			return e = e instanceof ns ? new e.Collection(e) : e, e._ctx.error = new (i || TypeError)(t), e;
		}
		function bt(e) {
			return new e.Collection(e, function() {
				return ts("");
			}).limit(0);
		}
		function on(e, t, i, c) {
			var l, f, p, m, S, v, E, g = i.length;
			if (!i.every(function(_) {
				return typeof _ == "string";
			})) return Ce(e, $r);
			function C(_) {
				l = _ === "next" ? function(A) {
					return A.toUpperCase();
				} : function(A) {
					return A.toLowerCase();
				}, f = _ === "next" ? function(A) {
					return A.toLowerCase();
				} : function(A) {
					return A.toUpperCase();
				}, p = _ === "next" ? Ii : xi;
				var I = i.map(function(A) {
					return {
						lower: f(A),
						upper: l(A)
					};
				}).sort(function(A, x) {
					return p(A.lower, x.lower);
				});
				m = I.map(function(A) {
					return A.upper;
				}), S = I.map(function(A) {
					return A.lower;
				}), E = (v = _) === "next" ? "" : c;
			}
			C("next"), e = new e.Collection(e, function() {
				return ze(m[0], S[g - 1] + c);
			}), e._ondirectionchange = function(_) {
				C(_);
			};
			var w = 0;
			return e._addAlgorithm(function(_, I, A) {
				var x = _.key;
				if (typeof x != "string") return !1;
				var k = f(x);
				if (t(k, S, w)) return !0;
				for (var O = null, R = w; R < g; ++R) {
					var T = function(G, j, F, K, L, J) {
						for (var X = Math.min(G.length, K.length), ee = -1, Q = 0; Q < X; ++Q) {
							var ke = j[Q];
							if (ke !== K[Q]) return L(G[Q], F[Q]) < 0 ? G.substr(0, Q) + F[Q] + F.substr(Q + 1) : L(G[Q], K[Q]) < 0 ? G.substr(0, Q) + K[Q] + F.substr(Q + 1) : 0 <= ee ? G.substr(0, ee) + j[ee] + F.substr(ee + 1) : null;
							L(G[Q], ke) < 0 && (ee = Q);
						}
						return X < K.length && J === "next" ? G + F.substr(G.length) : X < G.length && J === "prev" ? G.substr(0, F.length) : ee < 0 ? null : G.substr(0, ee) + K[ee] + F.substr(ee + 1);
					}(x, k, m[R], S[R], p, v);
					T === null && O === null ? w = R + 1 : (O === null || 0 < p(O, T)) && (O = T);
				}
				return I(O !== null ? function() {
					_.continue(O + E);
				} : A), !1;
			}), e;
		}
		function ze(e, t, i, c) {
			return {
				type: 2,
				lower: e,
				upper: t,
				lowerOpen: i,
				upperOpen: c
			};
		}
		function ts(e) {
			return {
				type: 1,
				lower: e,
				upper: e
			};
		}
		var ns = (Object.defineProperty(ge.prototype, "Collection", {
			get: function() {
				return this._ctx.table.db.Collection;
			},
			enumerable: !1,
			configurable: !0
		}), ge.prototype.between = function(e, t, i, c) {
			i = i !== !1, c = c === !0;
			try {
				return 0 < this._cmp(e, t) || this._cmp(e, t) === 0 && (i || c) && (!i || !c) ? bt(this) : new this.Collection(this, function() {
					return ze(e, t, !i, !c);
				});
			} catch {
				return Ce(this, Be);
			}
		}, ge.prototype.equals = function(e) {
			return e == null ? Ce(this, Be) : new this.Collection(this, function() {
				return ts(e);
			});
		}, ge.prototype.above = function(e) {
			return e == null ? Ce(this, Be) : new this.Collection(this, function() {
				return ze(e, void 0, !0);
			});
		}, ge.prototype.aboveOrEqual = function(e) {
			return e == null ? Ce(this, Be) : new this.Collection(this, function() {
				return ze(e, void 0, !1);
			});
		}, ge.prototype.below = function(e) {
			return e == null ? Ce(this, Be) : new this.Collection(this, function() {
				return ze(void 0, e, !1, !0);
			});
		}, ge.prototype.belowOrEqual = function(e) {
			return e == null ? Ce(this, Be) : new this.Collection(this, function() {
				return ze(void 0, e);
			});
		}, ge.prototype.startsWith = function(e) {
			return typeof e != "string" ? Ce(this, $r) : this.between(e, e + tt, !0, !0);
		}, ge.prototype.startsWithIgnoreCase = function(e) {
			return e === "" ? this.startsWith(e) : on(this, function(t, i) {
				return t.indexOf(i[0]) === 0;
			}, [e], tt);
		}, ge.prototype.equalsIgnoreCase = function(e) {
			return on(this, function(t, i) {
				return t === i[0];
			}, [e], "");
		}, ge.prototype.anyOfIgnoreCase = function() {
			var e = je.apply(lt, arguments);
			return e.length === 0 ? bt(this) : on(this, function(t, i) {
				return i.indexOf(t) !== -1;
			}, e, "");
		}, ge.prototype.startsWithAnyOfIgnoreCase = function() {
			var e = je.apply(lt, arguments);
			return e.length === 0 ? bt(this) : on(this, function(t, i) {
				return i.some(function(c) {
					return t.indexOf(c) === 0;
				});
			}, e, tt);
		}, ge.prototype.anyOf = function() {
			var e = this, t = je.apply(lt, arguments), i = this._cmp;
			try {
				t.sort(i);
			} catch {
				return Ce(this, Be);
			}
			if (t.length === 0) return bt(this);
			var c = new this.Collection(this, function() {
				return ze(t[0], t[t.length - 1]);
			});
			c._ondirectionchange = function(f) {
				i = f === "next" ? e._ascending : e._descending, t.sort(i);
			};
			var l = 0;
			return c._addAlgorithm(function(f, p, m) {
				for (var S = f.key; 0 < i(S, t[l]);) if (++l === t.length) return p(m), !1;
				return i(S, t[l]) === 0 || (p(function() {
					f.continue(t[l]);
				}), !1);
			}), c;
		}, ge.prototype.notEqual = function(e) {
			return this.inAnyRange([[-Infinity, e], [e, this.db._maxKey]], {
				includeLowers: !1,
				includeUppers: !1
			});
		}, ge.prototype.noneOf = function() {
			var e = je.apply(lt, arguments);
			if (e.length === 0) return new this.Collection(this);
			try {
				e.sort(this._ascending);
			} catch {
				return Ce(this, Be);
			}
			var t = e.reduce(function(i, c) {
				return i ? i.concat([[i[i.length - 1][1], c]]) : [[-Infinity, c]];
			}, null);
			return t.push([e[e.length - 1], this.db._maxKey]), this.inAnyRange(t, {
				includeLowers: !1,
				includeUppers: !1
			});
		}, ge.prototype.inAnyRange = function(x, t) {
			var i = this, c = this._cmp, l = this._ascending, f = this._descending, p = this._min, m = this._max;
			if (x.length === 0) return bt(this);
			if (!x.every(function(k) {
				return k[0] !== void 0 && k[1] !== void 0 && l(k[0], k[1]) <= 0;
			})) return Ce(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", W.InvalidArgument);
			var S = !t || t.includeLowers !== !1, v = t && t.includeUppers === !0, E, g = l;
			function C(k, O) {
				return g(k[0], O[0]);
			}
			try {
				(E = x.reduce(function(k, O) {
					for (var R = 0, T = k.length; R < T; ++R) {
						var G = k[R];
						if (c(O[0], G[1]) < 0 && 0 < c(O[1], G[0])) {
							G[0] = p(G[0], O[0]), G[1] = m(G[1], O[1]);
							break;
						}
					}
					return R === T && k.push(O), k;
				}, [])).sort(C);
			} catch {
				return Ce(this, Be);
			}
			var w = 0, _ = v ? function(k) {
				return 0 < l(k, E[w][1]);
			} : function(k) {
				return 0 <= l(k, E[w][1]);
			}, I = S ? function(k) {
				return 0 < f(k, E[w][0]);
			} : function(k) {
				return 0 <= f(k, E[w][0]);
			}, A = _, x = new this.Collection(this, function() {
				return ze(E[0][0], E[E.length - 1][1], !S, !v);
			});
			return x._ondirectionchange = function(k) {
				g = k === "next" ? (A = _, l) : (A = I, f), E.sort(C);
			}, x._addAlgorithm(function(k, O, R) {
				for (var T, G = k.key; A(G);) if (++w === E.length) return O(R), !1;
				return !_(T = G) && !I(T) || (i._cmp(G, E[w][1]) === 0 || i._cmp(G, E[w][0]) === 0 || O(function() {
					g === l ? k.continue(E[w][0]) : k.continue(E[w][1]);
				}), !1);
			}), x;
		}, ge.prototype.startsWithAnyOf = function() {
			var e = je.apply(lt, arguments);
			return e.every(function(t) {
				return typeof t == "string";
			}) ? e.length === 0 ? bt(this) : this.inAnyRange(e.map(function(t) {
				return [t, t + tt];
			})) : Ce(this, "startsWithAnyOf() only works with strings");
		}, ge);
		function ge() {}
		function De(e) {
			return ue(function(t) {
				return Rt(t), e(t.target.error), !1;
			});
		}
		function Rt(e) {
			e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault();
		}
		var Tt = "storagemutated", Xn = "x-storagemutated-1", $e = Ot(null, Tt), ki = (Re.prototype._lock = function() {
			return _e(!$.global), ++this._reculock, this._reculock !== 1 || $.global || ($.lockOwnerFor = this), this;
		}, Re.prototype._unlock = function() {
			if (_e(!$.global), --this._reculock == 0) for ($.global || ($.lockOwnerFor = null); 0 < this._blockedFuncs.length && !this._locked();) {
				var e = this._blockedFuncs.shift();
				try {
					et(e[1], e[0]);
				} catch {}
			}
			return this;
		}, Re.prototype._locked = function() {
			return this._reculock && $.lockOwnerFor !== this;
		}, Re.prototype.create = function(e) {
			var t = this;
			if (!this.mode) return this;
			var i = this.db.idbdb, c = this.db._state.dbOpenError;
			if (_e(!this.idbtrans), !e && !i) switch (c && c.name) {
				case "DatabaseClosedError": throw new W.DatabaseClosed(c);
				case "MissingAPIError": throw new W.MissingAPI(c.message, c);
				default: throw new W.OpenFailed(c);
			}
			if (!this.active) throw new W.TransactionInactive();
			return _e(this._completion._state === null), (e = this.idbtrans = e || (this.db.core || i).transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })).onerror = ue(function(l) {
				Rt(l), t._reject(e.error);
			}), e.onabort = ue(function(l) {
				Rt(l), t.active && t._reject(new W.Abort(e.error)), t.active = !1, t.on("abort").fire(l);
			}), e.oncomplete = ue(function() {
				t.active = !1, t._resolve(), "mutatedParts" in e && $e.storagemutated.fire(e.mutatedParts);
			}), this;
		}, Re.prototype._promise = function(e, t, i) {
			var c = this;
			if (e === "readwrite" && this.mode !== "readwrite") return fe(new W.ReadOnly("Transaction is readonly"));
			if (!this.active) return fe(new W.TransactionInactive());
			if (this._locked()) return new q(function(f, p) {
				c._blockedFuncs.push([function() {
					c._promise(e, t, i).then(f, p);
				}, $]);
			});
			if (i) return qe(function() {
				var f = new q(function(p, m) {
					c._lock();
					var S = t(p, m, c);
					S && S.then && S.then(p, m);
				});
				return f.finally(function() {
					return c._unlock();
				}), f._lib = !0, f;
			});
			var l = new q(function(f, p) {
				var m = t(f, p, c);
				m && m.then && m.then(f, p);
			});
			return l._lib = !0, l;
		}, Re.prototype._root = function() {
			return this.parent ? this.parent._root() : this;
		}, Re.prototype.waitFor = function(e) {
			var t, i = this._root(), c = q.resolve(e);
			i._waitingFor ? i._waitingFor = i._waitingFor.then(function() {
				return c;
			}) : (i._waitingFor = c, i._waitingQueue = [], t = i.idbtrans.objectStore(i.storeNames[0]), function f() {
				for (++i._spinCount; i._waitingQueue.length;) i._waitingQueue.shift()();
				i._waitingFor && (t.get(-Infinity).onsuccess = f);
			}());
			var l = i._waitingFor;
			return new q(function(f, p) {
				c.then(function(m) {
					return i._waitingQueue.push(ue(f.bind(null, m)));
				}, function(m) {
					return i._waitingQueue.push(ue(p.bind(null, m)));
				}).finally(function() {
					i._waitingFor === l && (i._waitingFor = null);
				});
			});
		}, Re.prototype.abort = function() {
			this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new W.Abort()));
		}, Re.prototype.table = function(e) {
			var t = this._memoizedTables || (this._memoizedTables = {});
			if (D(t, e)) return t[e];
			var i = this.schema[e];
			if (!i) throw new W.NotFound("Table " + e + " not part of transaction");
			return i = new this.db.Table(e, i, this), i.core = this.db.core.table(e), t[e] = i;
		}, Re);
		function Re() {}
		function Yn(e, t, i, c, l, f, p) {
			return {
				name: e,
				keyPath: t,
				unique: i,
				multi: c,
				auto: l,
				compound: f,
				src: (i && !p ? "&" : "") + (c ? "*" : "") + (l ? "++" : "") + rs(t)
			};
		}
		function rs(e) {
			return typeof e == "string" ? e : e ? "[" + [].join.call(e, "+") + "]" : "";
		}
		function Qn(e, t, i) {
			return {
				name: e,
				primKey: t,
				indexes: i,
				mappedClass: null,
				idxByName: (c = function(l) {
					return [l.name, l];
				}, i.reduce(function(l, f, p) {
					return p = c(f, p), p && (l[p[0]] = p[1]), l;
				}, {}))
			};
			var c;
		}
		var jt = function(e) {
			try {
				return e.only([[]]), jt = function() {
					return [[]];
				}, [[]];
			} catch {
				return jt = function() {
					return tt;
				}, tt;
			}
		};
		function Zn(e) {
			return e == null ? function() {} : typeof e == "string" ? (t = e).split(".").length === 1 ? function(i) {
				return i[t];
			} : function(i) {
				return me(i, t);
			} : function(i) {
				return me(i, e);
			};
			var t;
		}
		function ss(e) {
			return [].slice.call(e);
		}
		var Oi = 0;
		function Bt(e) {
			return e == null ? ":id" : typeof e == "string" ? e : "[".concat(e.join("+"), "]");
		}
		function Ni(e, t, S) {
			function c(A) {
				if (A.type === 3) return null;
				if (A.type === 4) throw new Error("Cannot convert never type to IDBKeyRange");
				var w = A.lower, _ = A.upper, I = A.lowerOpen, A = A.upperOpen;
				return w === void 0 ? _ === void 0 ? null : t.upperBound(_, !!A) : _ === void 0 ? t.lowerBound(w, !!I) : t.bound(w, _, !!I, !!A);
			}
			function l(C) {
				var w, _ = C.name;
				return {
					name: _,
					schema: C,
					mutate: function(I) {
						var A = I.trans, x = I.type, k = I.keys, O = I.values, R = I.range;
						return new Promise(function(T, G) {
							T = ue(T);
							var j = A.objectStore(_), F = j.keyPath == null, K = x === "put" || x === "add";
							if (!K && x !== "delete" && x !== "deleteRange") throw new Error("Invalid operation type: " + x);
							var L, J = (k || O || { length: 1 }).length;
							if (k && O && k.length !== O.length) throw new Error("Given keys array must have same length as given values array.");
							if (J === 0) return T({
								numFailures: 0,
								failures: {},
								results: [],
								lastResult: void 0
							});
							function X(Ee) {
								++ke, Rt(Ee);
							}
							var ee = [], Q = [], ke = 0;
							if (x === "deleteRange") {
								if (R.type === 4) return T({
									numFailures: ke,
									failures: Q,
									results: [],
									lastResult: void 0
								});
								R.type === 3 ? ee.push(L = j.clear()) : ee.push(L = j.delete(c(R)));
							} else {
								var F = K ? F ? [O, k] : [O, null] : [k, null], Z = F[0], we = F[1];
								if (K) for (var Se = 0; Se < J; ++Se) ee.push(L = we && we[Se] !== void 0 ? j[x](Z[Se], we[Se]) : j[x](Z[Se])), L.onerror = X;
								else for (Se = 0; Se < J; ++Se) ee.push(L = j[x](Z[Se])), L.onerror = X;
							}
							function vn(Ee) {
								Ee = Ee.target.result, ee.forEach(function(it, br) {
									return it.error != null && (Q[br] = it.error);
								}), T({
									numFailures: ke,
									failures: Q,
									results: x === "delete" ? k : ee.map(function(it) {
										return it.result;
									}),
									lastResult: Ee
								});
							}
							L.onerror = function(Ee) {
								X(Ee), vn(Ee);
							}, L.onsuccess = vn;
						});
					},
					getMany: function(I) {
						var A = I.trans, x = I.keys;
						return new Promise(function(k, O) {
							k = ue(k);
							for (var R, T = A.objectStore(_), G = x.length, j = new Array(G), F = 0, K = 0, L = function(ee) {
								ee = ee.target, j[ee._pos] = ee.result, ++K === F && k(j);
							}, J = De(O), X = 0; X < G; ++X) x[X] != null && ((R = T.get(x[X]))._pos = X, R.onsuccess = L, R.onerror = J, ++F);
							F === 0 && k(j);
						});
					},
					get: function(I) {
						var A = I.trans, x = I.key;
						return new Promise(function(k, O) {
							k = ue(k);
							var R = A.objectStore(_).get(x);
							R.onsuccess = function(T) {
								return k(T.target.result);
							}, R.onerror = De(O);
						});
					},
					query: (w = v, function(I) {
						return new Promise(function(A, x) {
							A = ue(A);
							var k, O, R, F = I.trans, T = I.values, G = I.limit, L = I.query, j = G === Infinity ? void 0 : G, K = L.index, L = L.range, F = F.objectStore(_), K = K.isPrimaryKey ? F : F.index(K.name), L = c(L);
							if (G === 0) return A({ result: [] });
							w ? ((j = T ? K.getAll(L, j) : K.getAllKeys(L, j)).onsuccess = function(J) {
								return A({ result: J.target.result });
							}, j.onerror = De(x)) : (k = 0, O = !T && "openKeyCursor" in K ? K.openKeyCursor(L) : K.openCursor(L), R = [], O.onsuccess = function(J) {
								var X = O.result;
								return X ? (R.push(T ? X.value : X.primaryKey), ++k === G ? A({ result: R }) : void X.continue()) : A({ result: R });
							}, O.onerror = De(x));
						});
					}),
					openCursor: function(I) {
						var A = I.trans, x = I.values, k = I.query, O = I.reverse, R = I.unique;
						return new Promise(function(T, G) {
							T = ue(T);
							var K = k.index, j = k.range, F = A.objectStore(_), F = K.isPrimaryKey ? F : F.index(K.name), K = O ? R ? "prevunique" : "prev" : R ? "nextunique" : "next", L = !x && "openKeyCursor" in F ? F.openKeyCursor(c(j), K) : F.openCursor(c(j), K);
							L.onerror = De(G), L.onsuccess = ue(function(J) {
								var X, ee, Q, ke, Z = L.result;
								Z ? (Z.___id = ++Oi, Z.done = !1, X = Z.continue.bind(Z), ee = (ee = Z.continuePrimaryKey) && ee.bind(Z), Q = Z.advance.bind(Z), ke = function() {
									throw new Error("Cursor not stopped");
								}, Z.trans = A, Z.stop = Z.continue = Z.continuePrimaryKey = Z.advance = function() {
									throw new Error("Cursor not started");
								}, Z.fail = ue(G), Z.next = function() {
									var we = this, Se = 1;
									return this.start(function() {
										return Se-- ? we.continue() : we.stop();
									}).then(function() {
										return we;
									});
								}, Z.start = function(we) {
									function Se() {
										if (L.result) try {
											we();
										} catch (Ee) {
											Z.fail(Ee);
										}
										else Z.done = !0, Z.start = function() {
											throw new Error("Cursor behind last entry");
										}, Z.stop();
									}
									var vn = new Promise(function(Ee, it) {
										Ee = ue(Ee), L.onerror = De(it), Z.fail = it, Z.stop = function(br) {
											Z.stop = Z.continue = Z.continuePrimaryKey = Z.advance = ke, Ee(br);
										};
									});
									return L.onsuccess = ue(function(Ee) {
										L.onsuccess = Se, Se();
									}), Z.continue = X, Z.continuePrimaryKey = ee, Z.advance = Q, Se(), vn;
								}, T(Z)) : T(null);
							}, G);
						});
					},
					count: function(I) {
						var A = I.query, x = I.trans, k = A.index, O = A.range;
						return new Promise(function(R, T) {
							var G = x.objectStore(_), j = k.isPrimaryKey ? G : G.index(k.name), G = c(O), j = G ? j.count(G) : j.count();
							j.onsuccess = ue(function(F) {
								return R(F.target.result);
							}), j.onerror = De(T);
						});
					}
				};
			}
			var f, p, m, E = (p = S, m = ss((f = e).objectStoreNames), {
				schema: {
					name: f.name,
					tables: m.map(function(C) {
						return p.objectStore(C);
					}).map(function(C) {
						var w = C.keyPath, A = C.autoIncrement, _ = h(w), I = {}, A = {
							name: C.name,
							primaryKey: {
								name: null,
								isPrimaryKey: !0,
								outbound: w == null,
								compound: _,
								keyPath: w,
								autoIncrement: A,
								unique: !0,
								extractKey: Zn(w)
							},
							indexes: ss(C.indexNames).map(function(x) {
								return C.index(x);
							}).map(function(R) {
								var k = R.name, O = R.unique, T = R.multiEntry, R = R.keyPath, T = {
									name: k,
									compound: h(R),
									keyPath: R,
									unique: O,
									multiEntry: T,
									extractKey: Zn(R)
								};
								return I[Bt(R)] = T;
							}),
							getIndexByKeyPath: function(x) {
								return I[Bt(x)];
							}
						};
						return I[":id"] = A.primaryKey, w != null && (I[Bt(w)] = A.primaryKey), A;
					})
				},
				hasGetAll: 0 < m.length && "getAll" in p.objectStore(m[0]) && !(typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
			}), S = E.schema, v = E.hasGetAll, E = S.tables.map(l), g = {};
			return E.forEach(function(C) {
				return g[C.name] = C;
			}), {
				stack: "dbcore",
				transaction: e.transaction.bind(e),
				table: function(C) {
					if (!g[C]) throw new Error("Table '".concat(C, "' not found"));
					return g[C];
				},
				MIN_KEY: -Infinity,
				MAX_KEY: jt(t),
				schema: S
			};
		}
		function Di(e, t, i, c) {
			var l = i.IDBKeyRange;
			return i.indexedDB, { dbcore: (c = Ni(t, l, c), e.dbcore.reduce(function(f, p) {
				return p = p.create, s(s({}, f), p(f));
			}, c)) };
		}
		function an(e, c) {
			var i = c.db, c = Di(e._middlewares, i, e._deps, c);
			e.core = c.dbcore, e.tables.forEach(function(l) {
				var f = l.name;
				e.core.schema.tables.some(function(p) {
					return p.name === f;
				}) && (l.core = e.core.table(f), e[f] instanceof e.Table && (e[f].core = l.core));
			});
		}
		function cn(e, t, i, c) {
			i.forEach(function(l) {
				var f = c[l];
				t.forEach(function(p) {
					var m = function S(v, E) {
						return U(v, E) || (v = y(v)) && S(v, E);
					}(p, l);
					(!m || "value" in m && m.value === void 0) && (p === e.Transaction.prototype || p instanceof e.Transaction ? B(p, l, {
						get: function() {
							return this.table(l);
						},
						set: function(S) {
							z(this, l, {
								value: S,
								writable: !0,
								configurable: !0,
								enumerable: !0
							});
						}
					}) : p[l] = new e.Table(l, f));
				});
			});
		}
		function er(e, t) {
			t.forEach(function(i) {
				for (var c in i) i[c] instanceof e.Table && delete i[c];
			});
		}
		function Ri(e, t) {
			return e._cfg.version - t._cfg.version;
		}
		function Ti(e, t, i, c) {
			var l = e._dbSchema;
			i.objectStoreNames.contains("$meta") && !l.$meta && (l.$meta = Qn("$meta", os("")[0], []), e._storeNames.push("$meta"));
			var f = e._createTransaction("readwrite", e._storeNames, l);
			f.create(i), f._completion.catch(c);
			var p = f._reject.bind(f), m = $.transless || $;
			qe(function() {
				return $.trans = f, $.transless = m, t !== 0 ? (an(e, i), v = t, ((S = f).storeNames.includes("$meta") ? S.table("$meta").get("version").then(function(E) {
					return E ?? v;
				}) : q.resolve(v)).then(function(E) {
					return C = E, w = f, _ = i, I = [], E = (g = e)._versions, A = g._dbSchema = ln(0, g.idbdb, _), (E = E.filter(function(x) {
						return x._cfg.version >= C;
					})).length !== 0 ? (E.forEach(function(x) {
						I.push(function() {
							var k = A, O = x._cfg.dbschema;
							dn(g, k, _), dn(g, O, _), A = g._dbSchema = O;
							var R = tr(k, O);
							R.add.forEach(function(K) {
								nr(_, K[0], K[1].primKey, K[1].indexes);
							}), R.change.forEach(function(K) {
								if (K.recreate) throw new W.Upgrade("Not yet support for changing primary key");
								var L = _.objectStore(K.name);
								K.add.forEach(function(J) {
									return un(L, J);
								}), K.change.forEach(function(J) {
									L.deleteIndex(J.name), un(L, J);
								}), K.del.forEach(function(J) {
									return L.deleteIndex(J);
								});
							});
							var T = x._cfg.contentUpgrade;
							if (T && x._cfg.version > C) {
								an(g, _), w._memoizedTables = {};
								var G = Je(O);
								R.del.forEach(function(K) {
									G[K] = k[K];
								}), er(g, [g.Transaction.prototype]), cn(g, [g.Transaction.prototype], d(G), G), w.schema = G;
								var j, F = Tn(T);
								return F && mt(), R = q.follow(function() {
									var K;
									(j = T(w)) && F && (K = Ue.bind(null, null), j.then(K, K));
								}), j && typeof j.then == "function" ? q.resolve(j) : R.then(function() {
									return j;
								});
							}
						}), I.push(function(k) {
							var O = x._cfg.dbschema, R = k;
							[].slice.call(R.db.objectStoreNames).forEach(function(G) {
								return O[G] == null && R.db.deleteObjectStore(G);
							}), er(g, [g.Transaction.prototype]), cn(g, [g.Transaction.prototype], g._storeNames, g._dbSchema), w.schema = g._dbSchema;
						}), I.push(function(k) {
							g.idbdb.objectStoreNames.contains("$meta") && (Math.ceil(g.idbdb.version / 10) === x._cfg.version ? (g.idbdb.deleteObjectStore("$meta"), delete g._dbSchema.$meta, g._storeNames = g._storeNames.filter(function(O) {
								return O !== "$meta";
							})) : k.objectStore("$meta").put(x._cfg.version, "version"));
						});
					}), function x() {
						return I.length ? q.resolve(I.shift()(w.idbtrans)).then(x) : q.resolve();
					}().then(function() {
						is(A, _);
					})) : q.resolve();
					var g, C, w, _, I, A;
				}).catch(p)) : (d(l).forEach(function(E) {
					nr(i, E, l[E].primKey, l[E].indexes);
				}), an(e, i), void q.follow(function() {
					return e.on.populate.fire(f);
				}).catch(p));
				var S, v;
			});
		}
		function ji(e, t) {
			is(e._dbSchema, t), t.db.version % 10 != 0 || t.objectStoreNames.contains("$meta") || t.db.createObjectStore("$meta").add(Math.ceil(t.db.version / 10 - 1), "version");
			var i = ln(0, e.idbdb, t);
			dn(e, e._dbSchema, t);
			for (var c = 0, l = tr(i, e._dbSchema).change; c < l.length; c++) {
				var f = function(p) {
					if (p.change.length || p.recreate) return console.warn("Unable to patch indexes of table ".concat(p.name, " because it has changes on the type of index or primary key.")), { value: void 0 };
					var m = t.objectStore(p.name);
					p.add.forEach(function(S) {
						Ne && console.debug("Dexie upgrade patch: Creating missing index ".concat(p.name, ".").concat(S.src)), un(m, S);
					});
				}(l[c]);
				if (typeof f == "object") return f.value;
			}
		}
		function tr(e, t) {
			var i, c = {
				del: [],
				add: [],
				change: []
			};
			for (i in e) t[i] || c.del.push(i);
			for (i in t) {
				var l = e[i], f = t[i];
				if (l) {
					var p = {
						name: i,
						def: f,
						recreate: !1,
						del: [],
						add: [],
						change: []
					};
					if ("" + (l.primKey.keyPath || "") != "" + (f.primKey.keyPath || "") || l.primKey.auto !== f.primKey.auto) p.recreate = !0, c.change.push(p);
					else {
						var m = l.idxByName, S = f.idxByName, v = void 0;
						for (v in m) S[v] || p.del.push(v);
						for (v in S) {
							var E = m[v], g = S[v];
							E ? E.src !== g.src && p.change.push(g) : p.add.push(g);
						}
						(0 < p.del.length || 0 < p.add.length || 0 < p.change.length) && c.change.push(p);
					}
				} else c.add.push([i, f]);
			}
			return c;
		}
		function nr(e, t, i, c) {
			var l = e.db.createObjectStore(t, i.keyPath ? {
				keyPath: i.keyPath,
				autoIncrement: i.auto
			} : { autoIncrement: i.auto });
			return c.forEach(function(f) {
				return un(l, f);
			}), l;
		}
		function is(e, t) {
			d(e).forEach(function(i) {
				t.db.objectStoreNames.contains(i) || (Ne && console.debug("Dexie: Creating missing table", i), nr(t, i, e[i].primKey, e[i].indexes));
			});
		}
		function un(e, t) {
			e.createIndex(t.name, t.keyPath, {
				unique: t.unique,
				multiEntry: t.multi
			});
		}
		function ln(e, t, i) {
			var c = {};
			return ae(t.objectStoreNames, 0).forEach(function(l) {
				for (var f = i.objectStore(l), p = Yn(rs(v = f.keyPath), v || "", !0, !1, !!f.autoIncrement, v && typeof v != "string", !0), m = [], S = 0; S < f.indexNames.length; ++S) {
					var E = f.index(f.indexNames[S]), v = E.keyPath, E = Yn(E.name, v, !!E.unique, !!E.multiEntry, !1, v && typeof v != "string", !1);
					m.push(E);
				}
				c[l] = Qn(l, p, m);
			}), c;
		}
		function dn(e, t, i) {
			for (var c = i.db.objectStoreNames, l = 0; l < c.length; ++l) {
				var f = c[l], p = i.objectStore(f);
				e._hasGetAll = "getAll" in p;
				for (var m = 0; m < p.indexNames.length; ++m) {
					var S = p.indexNames[m], v = p.index(S).keyPath, E = typeof v == "string" ? v : "[" + ae(v).join("+") + "]";
					!t[f] || (v = t[f].idxByName[E]) && (v.name = S, delete t[f].idxByName[E], t[f].idxByName[S] = v);
				}
			}
			typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && u.WorkerGlobalScope && u instanceof u.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (e._hasGetAll = !1);
		}
		function os(e) {
			return e.split(",").map(function(t, i) {
				var c = (t = t.trim()).replace(/([&*]|\+\+)/g, ""), l = /^\[/.test(c) ? c.match(/^\[(.*)\]$/)[1].split("+") : c;
				return Yn(c, l || null, /\&/.test(t), /\*/.test(t), /\+\+/.test(t), h(l), i === 0);
			});
		}
		var Bi = (fn.prototype._parseStoresSpec = function(e, t) {
			d(e).forEach(function(i) {
				if (e[i] !== null) {
					var c = os(e[i]), l = c.shift();
					if (l.unique = !0, l.multi) throw new W.Schema("Primary key cannot be multi-valued");
					c.forEach(function(f) {
						if (f.auto) throw new W.Schema("Only primary key can be marked as autoIncrement (++)");
						if (!f.keyPath) throw new W.Schema("Index must have a name and cannot be an empty string");
					}), t[i] = Qn(i, l, c);
				}
			});
		}, fn.prototype.stores = function(i) {
			var t = this.db;
			this._cfg.storesSource = this._cfg.storesSource ? b(this._cfg.storesSource, i) : i;
			var i = t._versions, c = {}, l = {};
			return i.forEach(function(f) {
				b(c, f._cfg.storesSource), l = f._cfg.dbschema = {}, f._parseStoresSpec(c, l);
			}), t._dbSchema = l, er(t, [
				t._allTables,
				t,
				t.Transaction.prototype
			]), cn(t, [
				t._allTables,
				t,
				t.Transaction.prototype,
				this._cfg.tables
			], d(l), l), t._storeNames = d(l), this;
		}, fn.prototype.upgrade = function(e) {
			return this._cfg.contentUpgrade = Bn(this._cfg.contentUpgrade || oe, e), this;
		}, fn);
		function fn() {}
		function rr(e, t) {
			var i = e._dbNamesDB;
			return i || (i = e._dbNamesDB = new Le(tn, {
				addons: [],
				indexedDB: e,
				IDBKeyRange: t
			})).version(1).stores({ dbnames: "name" }), i.table("dbnames");
		}
		function sr(e) {
			return e && typeof e.databases == "function";
		}
		function ir(e) {
			return qe(function() {
				return $.letThrough = !0, e();
			});
		}
		function or(e) {
			return !("from" in e);
		}
		var ve = function(e, t) {
			if (!this) {
				var i = new ve();
				return e && "d" in e && b(i, e), i;
			}
			b(this, arguments.length ? {
				d: 1,
				from: e,
				to: 1 < arguments.length ? t : e
			} : { d: 0 });
		};
		function Mt(e, t, i) {
			var c = re(t, i);
			if (!isNaN(c)) {
				if (0 < c) throw RangeError();
				if (or(e)) return b(e, {
					from: t,
					to: i,
					d: 1
				});
				var l = e.l, c = e.r;
				if (re(i, e.from) < 0) return l ? Mt(l, t, i) : e.l = {
					from: t,
					to: i,
					d: 1,
					l: null,
					r: null
				}, as(e);
				if (0 < re(t, e.to)) return c ? Mt(c, t, i) : e.r = {
					from: t,
					to: i,
					d: 1,
					l: null,
					r: null
				}, as(e);
				re(t, e.from) < 0 && (e.from = t, e.l = null, e.d = c ? c.d + 1 : 1), 0 < re(i, e.to) && (e.to = i, e.r = null, e.d = e.l ? e.l.d + 1 : 1), i = !e.r, l && !e.l && Lt(e, l), c && i && Lt(e, c);
			}
		}
		function Lt(e, t) {
			or(t) || function i(c, S) {
				var f = S.from, p = S.to, m = S.l, S = S.r;
				Mt(c, f, p), m && i(c, m), S && i(c, S);
			}(e, t);
		}
		function hn(e, t) {
			var i = ar(t), c = i.next();
			if (c.done) return !1;
			for (var l = c.value, f = ar(e), p = f.next(l.from), m = p.value; !c.done && !p.done;) {
				if (re(m.from, l.to) <= 0 && 0 <= re(m.to, l.from)) return !0;
				re(l.from, m.from) < 0 ? l = (c = i.next(m.from)).value : m = (p = f.next(l.from)).value;
			}
			return !1;
		}
		function ar(e) {
			var t = or(e) ? null : {
				s: 0,
				n: e
			};
			return { next: function(i) {
				for (var c = 0 < arguments.length; t;) switch (t.s) {
					case 0: if (t.s = 1, c) for (; t.n.l && re(i, t.n.from) < 0;) t = {
						up: t,
						n: t.n.l,
						s: 1
					};
					else for (; t.n.l;) t = {
						up: t,
						n: t.n.l,
						s: 1
					};
					case 1: if (t.s = 2, !c || re(i, t.n.to) <= 0) return {
						value: t.n,
						done: !1
					};
					case 2: if (t.n.r) {
						t.s = 3, t = {
							up: t,
							n: t.n.r,
							s: 0
						};
						continue;
					}
					case 3: t = t.up;
				}
				return { done: !0 };
			} };
		}
		function as(e) {
			var t, i, c = (((t = e.r) === null || t === void 0 ? void 0 : t.d) || 0) - (((i = e.l) === null || i === void 0 ? void 0 : i.d) || 0), l = 1 < c ? "r" : c < -1 ? "l" : "";
			l && (t = l == "r" ? "l" : "r", i = s({}, e), c = e[l], e.from = c.from, e.to = c.to, e[l] = c[l], i[l] = c[t], (e[t] = i).d = cs(i)), e.d = cs(e);
		}
		function cs(i) {
			var t = i.r, i = i.l;
			return (t ? i ? Math.max(t.d, i.d) : t.d : i ? i.d : 0) + 1;
		}
		function pn(e, t) {
			return d(t).forEach(function(i) {
				e[i] ? Lt(e[i], t[i]) : e[i] = function c(l) {
					var f, p, m = {};
					for (f in l) D(l, f) && (p = l[f], m[f] = !p || typeof p != "object" || Mr.has(p.constructor) ? p : c(p));
					return m;
				}(t[i]);
			}), e;
		}
		function cr(e, t) {
			return e.all || t.all || Object.keys(e).some(function(i) {
				return t[i] && hn(t[i], e[i]);
			});
		}
		M(ve.prototype, ((xe = {
			add: function(e) {
				return Lt(this, e), this;
			},
			addKey: function(e) {
				return Mt(this, e, e), this;
			},
			addKeys: function(e) {
				var t = this;
				return e.forEach(function(i) {
					return Mt(t, i, i);
				}), this;
			}
		})[Rn] = function() {
			return ar(this);
		}, xe));
		var rt = {}, ur = {}, lr = !1;
		function mn(e) {
			pn(ur, e), lr || (lr = !0, setTimeout(function() {
				lr = !1, dr(ur, !(ur = {}));
			}, 0));
		}
		function dr(e, t) {
			t === void 0 && (t = !1);
			var i = /* @__PURE__ */ new Set();
			if (e.all) for (var c = 0, l = Object.values(rt); c < l.length; c++) us(p = l[c], e, i, t);
			else for (var f in e) {
				var p, m = /^idb\:\/\/(.*)\/(.*)\//.exec(f);
				m && (f = m[1], m = m[2], (p = rt["idb://".concat(f, "/").concat(m)]) && us(p, e, i, t));
			}
			i.forEach(function(S) {
				return S();
			});
		}
		function us(e, t, i, c) {
			for (var l = [], f = 0, p = Object.entries(e.queries.query); f < p.length; f++) {
				for (var m = p[f], S = m[0], v = [], E = 0, g = m[1]; E < g.length; E++) {
					var C = g[E];
					cr(t, C.obsSet) ? C.subscribers.forEach(function(A) {
						return i.add(A);
					}) : c && v.push(C);
				}
				c && l.push([S, v]);
			}
			if (c) for (var w = 0, _ = l; w < _.length; w++) {
				var I = _[w], S = I[0], v = I[1];
				e.queries.query[S] = v;
			}
		}
		function Mi(e) {
			var t = e._state, i = e._deps.indexedDB;
			if (t.isBeingOpened || e.idbdb) return t.dbReadyPromise.then(function() {
				return t.dbOpenError ? fe(t.dbOpenError) : e;
			});
			t.isBeingOpened = !0, t.dbOpenError = null, t.openComplete = !1;
			var c = t.openCanceller, l = Math.round(10 * e.verno), f = !1;
			function p() {
				if (t.openCanceller !== c) throw new W.DatabaseClosed("db.open() was cancelled");
			}
			function m() {
				return new q(function(C, w) {
					if (p(), !i) throw new W.MissingAPI();
					var _ = e.name, I = t.autoSchema || !l ? i.open(_) : i.open(_, l);
					if (!I) throw new W.MissingAPI();
					I.onerror = De(w), I.onblocked = ue(e._fireOnBlocked), I.onupgradeneeded = ue(function(A) {
						var x;
						E = I.transaction, t.autoSchema && !e._options.allowEmptyDB ? (I.onerror = Rt, E.abort(), I.result.close(), (x = i.deleteDatabase(_)).onsuccess = x.onerror = ue(function() {
							w(new W.NoSuchDatabase("Database ".concat(_, " doesnt exist")));
						})) : (E.onerror = De(w), A = A.oldVersion > Math.pow(2, 62) ? 0 : A.oldVersion, g = A < 1, e.idbdb = I.result, f && ji(e, E), Ti(e, A / 10, E, w));
					}, w), I.onsuccess = ue(function() {
						E = null;
						var A, x, k, O, R, T = e.idbdb = I.result, G = ae(T.objectStoreNames);
						if (0 < G.length) try {
							var j = T.transaction((O = G).length === 1 ? O[0] : O, "readonly");
							if (t.autoSchema) x = T, k = j, (A = e).verno = x.version / 10, k = A._dbSchema = ln(0, x, k), A._storeNames = ae(x.objectStoreNames, 0), cn(A, [A._allTables], d(k), k);
							else if (dn(e, e._dbSchema, j), ((R = tr(ln(0, (R = e).idbdb, j), R._dbSchema)).add.length || R.change.some(function(F) {
								return F.add.length || F.change.length;
							})) && !f) return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."), T.close(), l = T.version + 1, f = !0, C(m());
							an(e, j);
						} catch {}
						yt.push(e), T.onversionchange = ue(function(F) {
							t.vcFired = !0, e.on("versionchange").fire(F);
						}), T.onclose = ue(function(F) {
							e.on("close").fire(F);
						}), g && (R = e._deps, j = _, T = R.indexedDB, R = R.IDBKeyRange, sr(T) || j === tn || rr(T, R).put({ name: j }).catch(oe)), C();
					}, w);
				}).catch(function(C) {
					switch (C == null ? void 0 : C.name) {
						case "UnknownError":
							if (0 < t.PR1398_maxLoop) return t.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), m();
							break;
						case "VersionError": if (0 < l) return l = 0, m();
					}
					return q.reject(C);
				});
			}
			var S, v = t.dbReadyResolve, E = null, g = !1;
			return q.race([c, (typeof navigator > "u" ? q.resolve() : !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(C) {
				function w() {
					return indexedDB.databases().finally(C);
				}
				S = setInterval(w, 100), w();
			}).finally(function() {
				return clearInterval(S);
			}) : Promise.resolve()).then(m)]).then(function() {
				return p(), t.onReadyBeingFired = [], q.resolve(ir(function() {
					return e.on.ready.fire(e.vip);
				})).then(function C() {
					if (0 < t.onReadyBeingFired.length) {
						var w = t.onReadyBeingFired.reduce(Bn, oe);
						return t.onReadyBeingFired = [], q.resolve(ir(function() {
							return w(e.vip);
						})).then(C);
					}
				});
			}).finally(function() {
				t.openCanceller === c && (t.onReadyBeingFired = null, t.isBeingOpened = !1);
			}).catch(function(C) {
				t.dbOpenError = C;
				try {
					E && E.abort();
				} catch {}
				return c === t.openCanceller && e._close(), fe(C);
			}).finally(function() {
				t.openComplete = !0, v();
			}).then(function() {
				var C;
				return g && (C = {}, e.tables.forEach(function(w) {
					w.schema.indexes.forEach(function(_) {
						_.name && (C["idb://".concat(e.name, "/").concat(w.name, "/").concat(_.name)] = new ve(-Infinity, [[[]]]));
					}), C["idb://".concat(e.name, "/").concat(w.name, "/")] = C["idb://".concat(e.name, "/").concat(w.name, "/:dels")] = new ve(-Infinity, [[[]]]);
				}), $e(Tt).fire(C), dr(C, !0)), e;
			});
		}
		function fr(e) {
			function t(f) {
				return e.next(f);
			}
			var i = l(t), c = l(function(f) {
				return e.throw(f);
			});
			function l(f) {
				return function(S) {
					var m = f(S), S = m.value;
					return m.done ? S : S && typeof S.then == "function" ? S.then(i, c) : h(S) ? Promise.all(S).then(i, c) : i(S);
				};
			}
			return l(t)();
		}
		function yn(e, t, i) {
			for (var c = h(e) ? e.slice() : [e], l = 0; l < i; ++l) c.push(t);
			return c;
		}
		var Li = {
			stack: "dbcore",
			name: "VirtualIndexMiddleware",
			level: 1,
			create: function(e) {
				return s(s({}, e), { table: function(t) {
					var i = e.table(t), c = i.schema, l = {}, f = [];
					function p(g, C, w) {
						var _ = Bt(g), I = l[_] = l[_] || [], A = g == null ? 0 : typeof g == "string" ? 1 : g.length, x = 0 < C, x = s(s({}, w), {
							name: x ? "".concat(_, "(virtual-from:").concat(w.name, ")") : w.name,
							lowLevelIndex: w,
							isVirtual: x,
							keyTail: C,
							keyLength: A,
							extractKey: Zn(g),
							unique: !x && w.unique
						});
						return I.push(x), x.isPrimaryKey || f.push(x), 1 < A && p(A === 2 ? g[0] : g.slice(0, A - 1), C + 1, w), I.sort(function(k, O) {
							return k.keyTail - O.keyTail;
						}), x;
					}
					t = p(c.primaryKey.keyPath, 0, c.primaryKey), l[":id"] = [t];
					for (var m = 0, S = c.indexes; m < S.length; m++) {
						var v = S[m];
						p(v.keyPath, 0, v);
					}
					function E(g) {
						var C, w = g.query.index;
						return w.isVirtual ? s(s({}, g), { query: {
							index: w.lowLevelIndex,
							range: (C = g.query.range, w = w.keyTail, {
								type: C.type === 1 ? 2 : C.type,
								lower: yn(C.lower, C.lowerOpen ? e.MAX_KEY : e.MIN_KEY, w),
								lowerOpen: !0,
								upper: yn(C.upper, C.upperOpen ? e.MIN_KEY : e.MAX_KEY, w),
								upperOpen: !0
							})
						} }) : g;
					}
					return s(s({}, i), {
						schema: s(s({}, c), {
							primaryKey: t,
							indexes: f,
							getIndexByKeyPath: function(g) {
								return (g = l[Bt(g)]) && g[0];
							}
						}),
						count: function(g) {
							return i.count(E(g));
						},
						query: function(g) {
							return i.query(E(g));
						},
						openCursor: function(g) {
							var C = g.query.index, w = C.keyTail, _ = C.isVirtual, I = C.keyLength;
							return _ ? i.openCursor(E(g)).then(function(x) {
								return x && A(x);
							}) : i.openCursor(g);
							function A(x) {
								return Object.create(x, {
									continue: { value: function(k) {
										k != null ? x.continue(yn(k, g.reverse ? e.MAX_KEY : e.MIN_KEY, w)) : g.unique ? x.continue(x.key.slice(0, I).concat(g.reverse ? e.MIN_KEY : e.MAX_KEY, w)) : x.continue();
									} },
									continuePrimaryKey: { value: function(k, O) {
										x.continuePrimaryKey(yn(k, e.MAX_KEY, w), O);
									} },
									primaryKey: { get: function() {
										return x.primaryKey;
									} },
									key: { get: function() {
										var k = x.key;
										return I === 1 ? k[0] : k.slice(0, I);
									} },
									value: { get: function() {
										return x.value;
									} }
								});
							}
						}
					});
				} });
			}
		};
		function hr(e, t, i, c) {
			return i = i || {}, c = c || "", d(e).forEach(function(l) {
				var f, p, m;
				D(t, l) ? (f = e[l], p = t[l], typeof f == "object" && typeof p == "object" && f && p ? (m = Dn(f)) !== Dn(p) ? i[c + l] = t[l] : m === "Object" ? hr(f, p, i, c + l + ".") : f !== p && (i[c + l] = t[l]) : f !== p && (i[c + l] = t[l])) : i[c + l] = void 0;
			}), d(t).forEach(function(l) {
				D(e, l) || (i[c + l] = t[l]);
			}), i;
		}
		function pr(e, t) {
			return t.type === "delete" ? t.keys : t.keys || t.values.map(e.extractKey);
		}
		var Fi = {
			stack: "dbcore",
			name: "HooksMiddleware",
			level: 2,
			create: function(e) {
				return s(s({}, e), { table: function(t) {
					var i = e.table(t), c = i.schema.primaryKey;
					return s(s({}, i), { mutate: function(l) {
						var f = $.trans, p = f.table(t).hook, m = p.deleting, S = p.creating, v = p.updating;
						switch (l.type) {
							case "add":
								if (S.fire === oe) break;
								return f._promise("readwrite", function() {
									return E(l);
								}, !0);
							case "put":
								if (S.fire === oe && v.fire === oe) break;
								return f._promise("readwrite", function() {
									return E(l);
								}, !0);
							case "delete":
								if (m.fire === oe) break;
								return f._promise("readwrite", function() {
									return E(l);
								}, !0);
							case "deleteRange":
								if (m.fire === oe) break;
								return f._promise("readwrite", function() {
									return function g(C, w, _) {
										return i.query({
											trans: C,
											values: !1,
											query: {
												index: c,
												range: w
											},
											limit: _
										}).then(function(I) {
											var A = I.result;
											return E({
												type: "delete",
												keys: A,
												trans: C
											}).then(function(x) {
												return 0 < x.numFailures ? Promise.reject(x.failures[0]) : A.length < _ ? {
													failures: [],
													numFailures: 0,
													lastResult: void 0
												} : g(C, s(s({}, w), {
													lower: A[A.length - 1],
													lowerOpen: !0
												}), _);
											});
										});
									}(l.trans, l.range, 1e4);
								}, !0);
						}
						return i.mutate(l);
						function E(g) {
							var C, w, _, I = $.trans, A = g.keys || pr(c, g);
							if (!A) throw new Error("Keys missing");
							return (g = g.type === "add" || g.type === "put" ? s(s({}, g), { keys: A }) : s({}, g)).type !== "delete" && (g.values = a([], g.values)), g.keys && (g.keys = a([], g.keys)), C = i, _ = A, ((w = g).type === "add" ? Promise.resolve([]) : C.getMany({
								trans: w.trans,
								keys: _,
								cache: "immutable"
							})).then(function(x) {
								var k = A.map(function(O, R) {
									var T, G, j, F = x[R], K = {
										onerror: null,
										onsuccess: null
									};
									return g.type === "delete" ? m.fire.call(K, O, F, I) : g.type === "add" || F === void 0 ? (T = S.fire.call(K, O, g.values[R], I), O == null && T != null && (g.keys[R] = O = T, c.outbound || de(g.values[R], c.keyPath, O))) : (T = hr(F, g.values[R]), (G = v.fire.call(K, T, O, F, I)) && (j = g.values[R], Object.keys(G).forEach(function(L) {
										D(j, L) ? j[L] = G[L] : de(j, L, G[L]);
									}))), K;
								});
								return i.mutate(g).then(function(O) {
									for (var R = O.failures, T = O.results, G = O.numFailures, O = O.lastResult, j = 0; j < A.length; ++j) {
										var F = (T || A)[j], K = k[j];
										F == null ? K.onerror && K.onerror(R[j]) : K.onsuccess && K.onsuccess(g.type === "put" && x[j] ? g.values[j] : F);
									}
									return {
										failures: R,
										results: T,
										numFailures: G,
										lastResult: O
									};
								}).catch(function(O) {
									return k.forEach(function(R) {
										return R.onerror && R.onerror(O);
									}), Promise.reject(O);
								});
							});
						}
					} });
				} });
			}
		};
		function ls(e, t, i) {
			try {
				if (!t || t.keys.length < e.length) return null;
				for (var c = [], l = 0, f = 0; l < t.keys.length && f < e.length; ++l) re(t.keys[l], e[f]) === 0 && (c.push(i ? Ge(t.values[l]) : t.values[l]), ++f);
				return c.length === e.length ? c : null;
			} catch {
				return null;
			}
		}
		var Gi = {
			stack: "dbcore",
			level: -1,
			create: function(e) {
				return { table: function(t) {
					var i = e.table(t);
					return s(s({}, i), {
						getMany: function(c) {
							if (!c.cache) return i.getMany(c);
							var l = ls(c.keys, c.trans._cache, c.cache === "clone");
							return l ? q.resolve(l) : i.getMany(c).then(function(f) {
								return c.trans._cache = {
									keys: c.keys,
									values: c.cache === "clone" ? Ge(f) : f
								}, f;
							});
						},
						mutate: function(c) {
							return c.type !== "add" && (c.trans._cache = null), i.mutate(c);
						}
					});
				} };
			}
		};
		function ds(e, t) {
			return e.trans.mode === "readonly" && !!e.subscr && !e.trans.explicit && e.trans.db._options.cache !== "disabled" && !t.schema.primaryKey.outbound;
		}
		function fs(e, t) {
			switch (e) {
				case "query": return t.values && !t.unique;
				case "get":
				case "getMany":
				case "count":
				case "openCursor": return !1;
			}
		}
		var Ki = {
			stack: "dbcore",
			level: 0,
			name: "Observability",
			create: function(e) {
				var t = e.schema.name, i = new ve(e.MIN_KEY, e.MAX_KEY);
				return s(s({}, e), {
					transaction: function(c, l, f) {
						if ($.subscr && l !== "readonly") throw new W.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat($.querier));
						return e.transaction(c, l, f);
					},
					table: function(c) {
						var l = e.table(c), f = l.schema, p = f.primaryKey, g = f.indexes, m = p.extractKey, S = p.outbound, v = p.autoIncrement && g.filter(function(w) {
							return w.compound && w.keyPath.includes(p.keyPath);
						}), E = s(s({}, l), { mutate: function(w) {
							function _(L) {
								return L = "idb://".concat(t, "/").concat(c, "/").concat(L), O[L] || (O[L] = new ve());
							}
							var I, A, x, k = w.trans, O = w.mutatedParts || (w.mutatedParts = {}), R = _(""), T = _(":dels"), G = w.type, K = w.type === "deleteRange" ? [w.range] : w.type === "delete" ? [w.keys] : w.values.length < 50 ? [pr(p, w).filter(function(L) {
								return L;
							}), w.values] : [], j = K[0], F = K[1], K = w.trans._cache;
							return h(j) ? (R.addKeys(j), (K = G === "delete" || j.length === F.length ? ls(j, K) : null) || T.addKeys(j), (K || F) && (I = _, A = K, x = F, f.indexes.forEach(function(L) {
								var J = I(L.name || "");
								function X(Q) {
									return Q != null ? L.extractKey(Q) : null;
								}
								function ee(Q) {
									return L.multiEntry && h(Q) ? Q.forEach(function(ke) {
										return J.addKey(ke);
									}) : J.addKey(Q);
								}
								(A || x).forEach(function(Q, we) {
									var Z = A && X(A[we]), we = x && X(x[we]);
									re(Z, we) !== 0 && (Z != null && ee(Z), we != null && ee(we));
								});
							}))) : j ? (F = {
								from: j.lower,
								to: j.upper
							}, T.add(F), R.add(F)) : (R.add(i), T.add(i), f.indexes.forEach(function(L) {
								return _(L.name).add(i);
							})), l.mutate(w).then(function(L) {
								return !j || w.type !== "add" && w.type !== "put" || (R.addKeys(L.results), v && v.forEach(function(J) {
									var X = w.values.map(function(Q) {
										return J.extractKey(Q);
									}), ee = J.keyPath.findIndex(function(Q) {
										return Q === p.keyPath;
									});
									L.results.forEach(function(Q) {
										return X[ee] = Q;
									}), _(J.name).addKeys(X);
								})), k.mutatedParts = pn(k.mutatedParts || {}, O), L;
							});
						} }), g = function(_) {
							var I = _.query, _ = I.index, I = I.range;
							return [_, new ve((_ = I.lower) !== null && _ !== void 0 ? _ : e.MIN_KEY, (I = I.upper) !== null && I !== void 0 ? I : e.MAX_KEY)];
						}, C = {
							get: function(w) {
								return [p, new ve(w.key)];
							},
							getMany: function(w) {
								return [p, new ve().addKeys(w.keys)];
							},
							count: g,
							query: g,
							openCursor: g
						};
						return d(C).forEach(function(w) {
							E[w] = function(_) {
								var I = $.subscr, A = !!I, x = ds($, l) && fs(w, _) ? _.obsSet = {} : I;
								if (A) {
									var k = function(F) {
										return F = "idb://".concat(t, "/").concat(c, "/").concat(F), x[F] || (x[F] = new ve());
									}, O = k(""), R = k(":dels"), I = C[w](_), A = I[0], I = I[1];
									if ((w === "query" && A.isPrimaryKey && !_.values ? R : k(A.name || "")).add(I), !A.isPrimaryKey) {
										if (w !== "count") {
											var T = w === "query" && S && _.values && l.query(s(s({}, _), { values: !1 }));
											return l[w].apply(this, arguments).then(function(F) {
												if (w === "query") {
													if (S && _.values) return T.then(function(X) {
														return X = X.result, O.addKeys(X), F;
													});
													var K = _.values ? F.result.map(m) : F.result;
													(_.values ? O : R).addKeys(K);
												} else if (w === "openCursor") {
													var L = F, J = _.values;
													return L && Object.create(L, {
														key: { get: function() {
															return R.addKey(L.primaryKey), L.key;
														} },
														primaryKey: { get: function() {
															var X = L.primaryKey;
															return R.addKey(X), X;
														} },
														value: { get: function() {
															return J && O.addKey(L.primaryKey), L.value;
														} }
													});
												}
												return F;
											});
										}
										R.add(i);
									}
								}
								return l[w].apply(this, arguments);
							};
						}), E;
					}
				});
			}
		};
		function hs(e, t, i) {
			if (i.numFailures === 0) return t;
			if (t.type === "deleteRange") return null;
			var c = t.keys ? t.keys.length : "values" in t && t.values ? t.values.length : 1;
			return i.numFailures === c ? null : (t = s({}, t), h(t.keys) && (t.keys = t.keys.filter(function(l, f) {
				return !(f in i.failures);
			})), "values" in t && h(t.values) && (t.values = t.values.filter(function(l, f) {
				return !(f in i.failures);
			})), t);
		}
		function mr(e, t) {
			return i = e, ((c = t).lower === void 0 || (c.lowerOpen ? 0 < re(i, c.lower) : 0 <= re(i, c.lower))) && (e = e, (t = t).upper === void 0 || (t.upperOpen ? re(e, t.upper) < 0 : re(e, t.upper) <= 0));
			var i, c;
		}
		function ps(e, t, C, c, l, f) {
			if (!C || C.length === 0) return e;
			var p = t.query.index, m = p.multiEntry, S = t.query.range, v = c.schema.primaryKey.extractKey, E = p.extractKey, g = (p.lowLevelIndex || p).extractKey, C = C.reduce(function(w, _) {
				var I = w, A = _.type === "add" || _.type === "put" ? _.values.filter(function(R) {
					return R = E(R), m && h(R) ? R.some(function(T) {
						return mr(T, S);
					}) : mr(R, S);
				}).map(function(R) {
					return R = Ge(R), f && Object.freeze(R), R;
				}) : [];
				switch (_.type) {
					case "add":
						I = w.concat(t.values ? A : A.map(function(T) {
							return v(T);
						}));
						break;
					case "put":
						var x = new ve().addKeys(_.values.map(function(T) {
							return v(T);
						})), I = w.filter(function(T) {
							return T = t.values ? v(T) : T, !hn(new ve(T), x);
						}).concat(t.values ? A : A.map(function(T) {
							return v(T);
						}));
						break;
					case "delete":
						var k = new ve().addKeys(_.keys);
						I = w.filter(function(T) {
							return T = t.values ? v(T) : T, !hn(new ve(T), k);
						});
						break;
					case "deleteRange":
						var O = _.range;
						I = w.filter(function(T) {
							return !mr(v(T), O);
						});
				}
				return I;
			}, e);
			return C === e ? e : (C.sort(function(w, _) {
				return re(g(w), g(_)) || re(v(w), v(_));
			}), t.limit && t.limit < Infinity && (C.length > t.limit ? C.length = t.limit : e.length === t.limit && C.length < t.limit && (l.dirty = !0)), f ? Object.freeze(C) : C);
		}
		function ms(e, t) {
			return re(e.lower, t.lower) === 0 && re(e.upper, t.upper) === 0 && !!e.lowerOpen == !!t.lowerOpen && !!e.upperOpen == !!t.upperOpen;
		}
		function qi(e, t) {
			return function(i, c, l, f) {
				if (i === void 0) return c !== void 0 ? -1 : 0;
				if (c === void 0) return 1;
				if ((c = re(i, c)) === 0) {
					if (l && f) return 0;
					if (l) return 1;
					if (f) return -1;
				}
				return c;
			}(e.lower, t.lower, e.lowerOpen, t.lowerOpen) <= 0 && 0 <= function(i, c, l, f) {
				if (i === void 0) return c !== void 0 ? 1 : 0;
				if (c === void 0) return -1;
				if ((c = re(i, c)) === 0) {
					if (l && f) return 0;
					if (l) return -1;
					if (f) return 1;
				}
				return c;
			}(e.upper, t.upper, e.upperOpen, t.upperOpen);
		}
		function Ui(e, t, i, c) {
			e.subscribers.add(i), c.addEventListener("abort", function() {
				var l, f;
				e.subscribers.delete(i), e.subscribers.size === 0 && (l = e, f = t, setTimeout(function() {
					l.subscribers.size === 0 && Xe(f, l);
				}, 3e3));
			});
		}
		var Hi = {
			stack: "dbcore",
			level: 0,
			name: "Cache",
			create: function(e) {
				var t = e.schema.name;
				return s(s({}, e), {
					transaction: function(i, c, l) {
						var f, p, m = e.transaction(i, c, l);
						return c === "readwrite" && (p = (f = new AbortController()).signal, l = function(S) {
							return function() {
								if (f.abort(), c === "readwrite") {
									for (var v = /* @__PURE__ */ new Set(), E = 0, g = i; E < g.length; E++) {
										var C = g[E], w = rt["idb://".concat(t, "/").concat(C)];
										if (w) {
											var _ = e.table(C), I = w.optimisticOps.filter(function(J) {
												return J.trans === m;
											});
											if (m._explicit && S && m.mutatedParts) for (var A = 0, x = Object.values(w.queries.query); A < x.length; A++) for (var k = 0, O = (G = x[A]).slice(); k < O.length; k++) cr((j = O[k]).obsSet, m.mutatedParts) && (Xe(G, j), j.subscribers.forEach(function(J) {
												return v.add(J);
											}));
											else if (0 < I.length) {
												w.optimisticOps = w.optimisticOps.filter(function(J) {
													return J.trans !== m;
												});
												for (var R = 0, T = Object.values(w.queries.query); R < T.length; R++) for (var G, j, F, K = 0, L = (G = T[R]).slice(); K < L.length; K++) (j = L[K]).res != null && m.mutatedParts && (S && !j.dirty ? (F = Object.isFrozen(j.res), F = ps(j.res, j.req, I, _, j, F), j.dirty ? (Xe(G, j), j.subscribers.forEach(function(J) {
													return v.add(J);
												})) : F !== j.res && (j.res = F, j.promise = q.resolve({ result: F }))) : (j.dirty && Xe(G, j), j.subscribers.forEach(function(J) {
													return v.add(J);
												})));
											}
										}
									}
									v.forEach(function(J) {
										return J();
									});
								}
							};
						}, m.addEventListener("abort", l(!1), { signal: p }), m.addEventListener("error", l(!1), { signal: p }), m.addEventListener("complete", l(!0), { signal: p })), m;
					},
					table: function(i) {
						var c = e.table(i), l = c.schema.primaryKey;
						return s(s({}, c), {
							mutate: function(f) {
								var p = $.trans;
								if (l.outbound || p.db._options.cache === "disabled" || p.explicit) return c.mutate(f);
								var m = rt["idb://".concat(t, "/").concat(i)];
								return m ? (p = c.mutate(f), f.type !== "add" && f.type !== "put" || !(50 <= f.values.length || pr(l, f).some(function(S) {
									return S == null;
								})) ? (m.optimisticOps.push(f), f.mutatedParts && mn(f.mutatedParts), p.then(function(S) {
									0 < S.numFailures && (Xe(m.optimisticOps, f), (S = hs(0, f, S)) && m.optimisticOps.push(S), f.mutatedParts && mn(f.mutatedParts));
								}), p.catch(function() {
									Xe(m.optimisticOps, f), f.mutatedParts && mn(f.mutatedParts);
								})) : p.then(function(S) {
									var v = hs(0, s(s({}, f), { values: f.values.map(function(w, g) {
										var C, w = (C = l.keyPath) !== null && C !== void 0 && C.includes(".") ? Ge(w) : s({}, w);
										return de(w, l.keyPath, S.results[g]), w;
									}) }), S);
									m.optimisticOps.push(v), queueMicrotask(function() {
										return f.mutatedParts && mn(f.mutatedParts);
									});
								}), p) : c.mutate(f);
							},
							query: function(f) {
								if (!ds($, c) || !fs("query", f)) return c.query(f);
								var p = ((v = $.trans) === null || v === void 0 ? void 0 : v.db._options.cache) === "immutable", g = $, m = g.requery, S = g.signal, v = function(_, I, A, x) {
									var k = rt["idb://".concat(_, "/").concat(I)];
									if (!k) return [];
									if (!(I = k.queries[A])) return [
										null,
										!1,
										k,
										null
									];
									var O = I[(x.query ? x.query.index.name : null) || ""];
									if (!O) return [
										null,
										!1,
										k,
										null
									];
									switch (A) {
										case "query":
											var R = O.find(function(T) {
												return T.req.limit === x.limit && T.req.values === x.values && ms(T.req.query.range, x.query.range);
											});
											return R ? [
												R,
												!0,
												k,
												O
											] : [
												O.find(function(T) {
													return ("limit" in T.req ? T.req.limit : Infinity) >= x.limit && (!x.values || T.req.values) && qi(T.req.query.range, x.query.range);
												}),
												!1,
												k,
												O
											];
										case "count": return R = O.find(function(T) {
											return ms(T.req.query.range, x.query.range);
										}), [
											R,
											!!R,
											k,
											O
										];
									}
								}(t, i, "query", f), E = v[0], g = v[1], C = v[2], w = v[3];
								return E && g ? E.obsSet = f.obsSet : (g = c.query(f).then(function(_) {
									var I = _.result;
									if (E && (E.res = I), p) {
										for (var A = 0, x = I.length; A < x; ++A) Object.freeze(I[A]);
										Object.freeze(I);
									} else _.result = Ge(I);
									return _;
								}).catch(function(_) {
									return w && E && Xe(w, E), Promise.reject(_);
								}), E = {
									obsSet: f.obsSet,
									promise: g,
									subscribers: /* @__PURE__ */ new Set(),
									type: "query",
									req: f,
									dirty: !1
								}, w ? w.push(E) : (w = [E], (C = C || (rt["idb://".concat(t, "/").concat(i)] = {
									queries: {
										query: {},
										count: {}
									},
									objs: /* @__PURE__ */ new Map(),
									optimisticOps: [],
									unsignaledParts: {}
								})).queries.query[f.query.index.name || ""] = w)), Ui(E, w, m, S), E.promise.then(function(_) {
									return { result: ps(_.result, f, C == null ? void 0 : C.optimisticOps, c, E, p) };
								});
							}
						});
					}
				});
			}
		};
		function gn(e, t) {
			return new Proxy(e, { get: function(i, c, l) {
				return c === "db" ? t : Reflect.get(i, c, l);
			} });
		}
		var Le = (he.prototype.version = function(e) {
			if (isNaN(e) || e < .1) throw new W.Type("Given version is not a positive number");
			if (e = Math.round(10 * e) / 10, this.idbdb || this._state.isBeingOpened) throw new W.Schema("Cannot add version when database is open");
			this.verno = Math.max(this.verno, e);
			var t = this._versions, i = t.filter(function(c) {
				return c._cfg.version === e;
			})[0];
			return i || (i = new this.Version(e), t.push(i), t.sort(Ri), i.stores({}), this._state.autoSchema = !1, i);
		}, he.prototype._whenReady = function(e) {
			var t = this;
			return this.idbdb && (this._state.openComplete || $.letThrough || this._vip) ? e() : new q(function(i, c) {
				if (t._state.openComplete) return c(new W.DatabaseClosed(t._state.dbOpenError));
				if (!t._state.isBeingOpened) {
					if (!t._state.autoOpen) return void c(new W.DatabaseClosed());
					t.open().catch(oe);
				}
				t._state.dbReadyPromise.then(i, c);
			}).then(e);
		}, he.prototype.use = function(e) {
			var t = e.stack, i = e.create, c = e.level, l = e.name;
			return l && this.unuse({
				stack: t,
				name: l
			}), e = this._middlewares[t] || (this._middlewares[t] = []), e.push({
				stack: t,
				create: i,
				level: c ?? 10,
				name: l
			}), e.sort(function(f, p) {
				return f.level - p.level;
			}), this;
		}, he.prototype.unuse = function(e) {
			var t = e.stack, i = e.name, c = e.create;
			return t && this._middlewares[t] && (this._middlewares[t] = this._middlewares[t].filter(function(l) {
				return c ? l.create !== c : !!i && l.name !== i;
			})), this;
		}, he.prototype.open = function() {
			var e = this;
			return et(Ke, function() {
				return Mi(e);
			});
		}, he.prototype._close = function() {
			var e = this._state, t = yt.indexOf(this);
			if (0 <= t && yt.splice(t, 1), this.idbdb) {
				try {
					this.idbdb.close();
				} catch {}
				this.idbdb = null;
			}
			e.isBeingOpened || (e.dbReadyPromise = new q(function(i) {
				e.dbReadyResolve = i;
			}), e.openCanceller = new q(function(i, c) {
				e.cancelOpen = c;
			}));
		}, he.prototype.close = function(i) {
			var t = (i === void 0 ? { disableAutoOpen: !0 } : i).disableAutoOpen, i = this._state;
			t ? (i.isBeingOpened && i.cancelOpen(new W.DatabaseClosed()), this._close(), i.autoOpen = !1, i.dbOpenError = new W.DatabaseClosed()) : (this._close(), i.autoOpen = this._options.autoOpen || i.isBeingOpened, i.openComplete = !1, i.dbOpenError = null);
		}, he.prototype.delete = function(e) {
			var t = this;
			e === void 0 && (e = { disableAutoOpen: !0 });
			var i = 0 < arguments.length && typeof arguments[0] != "object", c = this._state;
			return new q(function(l, f) {
				function p() {
					t.close(e);
					var m = t._deps.indexedDB.deleteDatabase(t.name);
					m.onsuccess = ue(function() {
						var S = t._deps, v = t.name, E = S.indexedDB;
						S = S.IDBKeyRange, sr(E) || v === tn || rr(E, S).delete(v).catch(oe), l();
					}), m.onerror = De(f), m.onblocked = t._fireOnBlocked;
				}
				if (i) throw new W.InvalidArgument("Invalid closeOptions argument to db.delete()");
				c.isBeingOpened ? c.dbReadyPromise.then(p) : p();
			});
		}, he.prototype.backendDB = function() {
			return this.idbdb;
		}, he.prototype.isOpen = function() {
			return this.idbdb !== null;
		}, he.prototype.hasBeenClosed = function() {
			var e = this._state.dbOpenError;
			return e && e.name === "DatabaseClosed";
		}, he.prototype.hasFailed = function() {
			return this._state.dbOpenError !== null;
		}, he.prototype.dynamicallyOpened = function() {
			return this._state.autoSchema;
		}, Object.defineProperty(he.prototype, "tables", {
			get: function() {
				var e = this;
				return d(this._allTables).map(function(t) {
					return e._allTables[t];
				});
			},
			enumerable: !1,
			configurable: !0
		}), he.prototype.transaction = function() {
			var e = (function(t, i, c) {
				var l = arguments.length;
				if (l < 2) throw new W.InvalidArgument("Too few arguments");
				for (var f = new Array(l - 1); --l;) f[l - 1] = arguments[l];
				return c = f.pop(), [
					t,
					Br(f),
					c
				];
			}).apply(this, arguments);
			return this._transaction.apply(this, e);
		}, he.prototype._transaction = function(e, t, i) {
			var c = this, l = $.trans;
			l && l.db === this && e.indexOf("!") === -1 || (l = null);
			var f, p, m = e.indexOf("?") !== -1;
			e = e.replace("!", "").replace("?", "");
			try {
				if (p = t.map(function(v) {
					if (v = v instanceof c.Table ? v.name : v, typeof v != "string") throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
					return v;
				}), e == "r" || e === zn) f = zn;
				else {
					if (e != "rw" && e != $n) throw new W.InvalidArgument("Invalid transaction mode: " + e);
					f = $n;
				}
				if (l) {
					if (l.mode === zn && f === $n) {
						if (!m) throw new W.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
						l = null;
					}
					l && p.forEach(function(v) {
						if (l && l.storeNames.indexOf(v) === -1) {
							if (!m) throw new W.SubTransaction("Table " + v + " not included in parent transaction.");
							l = null;
						}
					}), m && l && !l.active && (l = null);
				}
			} catch (v) {
				return l ? l._promise(null, function(E, g) {
					g(v);
				}) : fe(v);
			}
			var S = (function v(E, g, C, w, _) {
				return q.resolve().then(function() {
					var I = $.transless || $, A = E._createTransaction(g, C, E._dbSchema, w);
					if (A.explicit = !0, I = {
						trans: A,
						transless: I
					}, w) A.idbtrans = w.idbtrans;
					else try {
						A.create(), A.idbtrans._explicit = !0, E._state.PR1398_maxLoop = 3;
					} catch (O) {
						return O.name === jn.InvalidState && E.isOpen() && 0 < --E._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), E.close({ disableAutoOpen: !1 }), E.open().then(function() {
							return v(E, g, C, null, _);
						})) : fe(O);
					}
					var x, k = Tn(_);
					return k && mt(), I = q.follow(function() {
						var O;
						(x = _.call(A, A)) && (k ? (O = Ue.bind(null, null), x.then(O, O)) : typeof x.next == "function" && typeof x.throw == "function" && (x = fr(x)));
					}, I), (x && typeof x.then == "function" ? q.resolve(x).then(function(O) {
						return A.active ? O : fe(new W.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
					}) : I.then(function() {
						return x;
					})).then(function(O) {
						return w && A._resolve(), A._completion.then(function() {
							return O;
						});
					}).catch(function(O) {
						return A._reject(O), fe(O);
					});
				});
			}).bind(null, this, f, p, l, i);
			return l ? l._promise(f, S, "lock") : $.trans ? et($.transless, function() {
				return c._whenReady(S);
			}) : this._whenReady(S);
		}, he.prototype.table = function(e) {
			if (!D(this._allTables, e)) throw new W.InvalidTable("Table ".concat(e, " does not exist"));
			return this._allTables[e];
		}, he);
		function he(e, t) {
			var i = this;
			this._middlewares = {}, this.verno = 0;
			var c = he.dependencies;
			this._options = t = s({
				addons: he.addons,
				autoOpen: !0,
				indexedDB: c.indexedDB,
				IDBKeyRange: c.IDBKeyRange,
				cache: "cloned"
			}, t), this._deps = {
				indexedDB: t.indexedDB,
				IDBKeyRange: t.IDBKeyRange
			}, c = t.addons, this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
			var l, f, p, m, S, v = {
				dbOpenError: null,
				isBeingOpened: !1,
				onReadyBeingFired: null,
				openComplete: !1,
				dbReadyResolve: oe,
				dbReadyPromise: null,
				cancelOpen: oe,
				openCanceller: null,
				autoSchema: !0,
				PR1398_maxLoop: 3,
				autoOpen: t.autoOpen
			};
			v.dbReadyPromise = new q(function(g) {
				v.dbReadyResolve = g;
			}), v.openCanceller = new q(function(g, C) {
				v.cancelOpen = C;
			}), this._state = v, this.name = e, this.on = Ot(this, "populate", "blocked", "versionchange", "close", { ready: [Bn, oe] }), this.on.ready.subscribe = le(this.on.ready.subscribe, function(g) {
				return function(C, w) {
					he.vip(function() {
						var _, I = i._state;
						I.openComplete ? (I.dbOpenError || q.resolve().then(C), w && g(C)) : I.onReadyBeingFired ? (I.onReadyBeingFired.push(C), w && g(C)) : (g(C), _ = i, w || g(function A() {
							_.on.ready.unsubscribe(C), _.on.ready.unsubscribe(A);
						}));
					});
				};
			}), this.Collection = (l = this, Nt(Ci.prototype, function(x, A) {
				this.db = l;
				var w = Vr, _ = null;
				if (A) try {
					w = A();
				} catch (k) {
					_ = k;
				}
				var I = x._ctx, A = I.table, x = A.hook.reading.fire;
				this._ctx = {
					table: A,
					index: I.index,
					isPrimKey: !I.index || A.schema.primKey.keyPath && I.index === A.schema.primKey.name,
					range: w,
					keysOnly: !1,
					dir: "next",
					unique: "",
					algorithm: null,
					filter: null,
					replayFilter: null,
					justLimit: !0,
					isMatch: null,
					offset: 0,
					limit: Infinity,
					error: _,
					or: I.or,
					valueMapper: x !== Et ? x : null
				};
			})), this.Table = (f = this, Nt(Yr.prototype, function(g, C, w) {
				this.db = f, this._tx = w, this.name = g, this.schema = C, this.hook = f._allTables[g] ? f._allTables[g].hook : Ot(null, {
					creating: [gi, oe],
					reading: [yi, Et],
					updating: [vi, oe],
					deleting: [bi, oe]
				});
			})), this.Transaction = (p = this, Nt(ki.prototype, function(g, C, w, _, I) {
				var A = this;
				this.db = p, this.mode = g, this.storeNames = C, this.schema = w, this.chromeTransactionDurability = _, this.idbtrans = null, this.on = Ot(this, "complete", "error", "abort"), this.parent = I || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new q(function(x, k) {
					A._resolve = x, A._reject = k;
				}), this._completion.then(function() {
					A.active = !1, A.on.complete.fire();
				}, function(x) {
					var k = A.active;
					return A.active = !1, A.on.error.fire(x), A.parent ? A.parent._reject(x) : k && A.idbtrans && A.idbtrans.abort(), fe(x);
				});
			})), this.Version = (m = this, Nt(Bi.prototype, function(g) {
				this.db = m, this._cfg = {
					version: g,
					storesSource: null,
					dbschema: {},
					tables: {},
					contentUpgrade: null
				};
			})), this.WhereClause = (S = this, Nt(ns.prototype, function(g, C, w) {
				if (this.db = S, this._ctx = {
					table: g,
					index: C === ":id" ? null : C,
					or: w
				}, this._cmp = this._ascending = re, this._descending = function(_, I) {
					return re(I, _);
				}, this._max = function(_, I) {
					return 0 < re(_, I) ? _ : I;
				}, this._min = function(_, I) {
					return re(_, I) < 0 ? _ : I;
				}, this._IDBKeyRange = S._deps.IDBKeyRange, !this._IDBKeyRange) throw new W.MissingAPI();
			})), this.on("versionchange", function(g) {
				0 < g.newVersion ? console.warn("Another connection wants to upgrade database '".concat(i.name, "'. Closing db now to resume the upgrade.")) : console.warn("Another connection wants to delete database '".concat(i.name, "'. Closing db now to resume the delete request.")), i.close({ disableAutoOpen: !1 });
			}), this.on("blocked", function(g) {
				!g.newVersion || g.newVersion < g.oldVersion ? console.warn("Dexie.delete('".concat(i.name, "') was blocked")) : console.warn("Upgrade '".concat(i.name, "' blocked by other connection holding version ").concat(g.oldVersion / 10));
			}), this._maxKey = jt(t.IDBKeyRange), this._createTransaction = function(g, C, w, _) {
				return new i.Transaction(g, C, w, i._options.chromeTransactionDurability, _);
			}, this._fireOnBlocked = function(g) {
				i.on("blocked").fire(g), yt.filter(function(C) {
					return C.name === i.name && C !== i && !C._state.vcFired;
				}).map(function(C) {
					return C.on("versionchange").fire(g);
				});
			}, this.use(Gi), this.use(Hi), this.use(Ki), this.use(Li), this.use(Fi);
			var E = new Proxy(this, { get: function(g, C, w) {
				if (C === "_vip") return !0;
				if (C === "table") return function(I) {
					return gn(i.table(I), E);
				};
				var _ = Reflect.get(g, C, w);
				return _ instanceof Yr ? gn(_, E) : C === "tables" ? _.map(function(I) {
					return gn(I, E);
				}) : C === "_createTransaction" ? function() {
					return gn(_.apply(this, arguments), E);
				} : _;
			} });
			this.vip = E, c.forEach(function(g) {
				return g(i);
			});
		}
		var bn, xe = typeof Symbol < "u" && "observable" in Symbol ? Symbol.observable : "@@observable", zi = (yr.prototype.subscribe = function(e, t, i) {
			return this._subscribe(e && typeof e != "function" ? e : {
				next: e,
				error: t,
				complete: i
			});
		}, yr.prototype[xe] = function() {
			return this;
		}, yr);
		function yr(e) {
			this._subscribe = e;
		}
		try {
			bn = {
				indexedDB: u.indexedDB || u.mozIndexedDB || u.webkitIndexedDB || u.msIndexedDB,
				IDBKeyRange: u.IDBKeyRange || u.webkitIDBKeyRange
			};
		} catch {
			bn = {
				indexedDB: null,
				IDBKeyRange: null
			};
		}
		function ys(e) {
			var t, i = !1, c = new zi(function(l) {
				var f = Tn(e), p, m = !1, S = {}, v = {}, E = {
					get closed() {
						return m;
					},
					unsubscribe: function() {
						m || (m = !0, p && p.abort(), g && $e.storagemutated.unsubscribe(w));
					}
				};
				l.start && l.start(E);
				var g = !1, C = function() {
					return Hn(_);
				}, w = function(I) {
					pn(S, I), cr(v, S) && C();
				}, _ = function() {
					var I, A, x;
					!m && bn.indexedDB && (S = {}, I = {}, p && p.abort(), p = new AbortController(), x = function(k) {
						var O = ht();
						try {
							f && mt();
							var R = qe(e, k);
							return R = f ? R.finally(Ue) : R;
						} finally {
							O && pt();
						}
					}(A = {
						subscr: I,
						signal: p.signal,
						requery: C,
						querier: e,
						trans: null
					}), Promise.resolve(x).then(function(k) {
						i = !0, t = k, m || A.signal.aborted || (S = {}, function(O) {
							for (var R in O) if (D(O, R)) return;
							return 1;
						}(v = I) || g || ($e(Tt, w), g = !0), Hn(function() {
							return !m && l.next && l.next(k);
						}));
					}, function(k) {
						i = !1, ["DatabaseClosedError", "AbortError"].includes(k == null ? void 0 : k.name) || m || Hn(function() {
							m || l.error && l.error(k);
						});
					}));
				};
				return setTimeout(C, 0), E;
			});
			return c.hasValue = function() {
				return i;
			}, c.getValue = function() {
				return t;
			}, c;
		}
		var st = Le;
		function gr(e) {
			var t = Ve;
			try {
				Ve = !0, $e.storagemutated.fire(e), dr(e, !0);
			} finally {
				Ve = t;
			}
		}
		M(st, s(s({}, $t), {
			delete: function(e) {
				return new st(e, { addons: [] }).delete();
			},
			exists: function(e) {
				return new st(e, { addons: [] }).open().then(function(t) {
					return t.close(), !0;
				}).catch("NoSuchDatabaseError", function() {
					return !1;
				});
			},
			getDatabaseNames: function(e) {
				try {
					return t = st.dependencies, i = t.indexedDB, t = t.IDBKeyRange, (sr(i) ? Promise.resolve(i.databases()).then(function(c) {
						return c.map(function(l) {
							return l.name;
						}).filter(function(l) {
							return l !== tn;
						});
					}) : rr(i, t).toCollection().primaryKeys()).then(e);
				} catch {
					return fe(new W.MissingAPI());
				}
				var t, i;
			},
			defineClass: function() {
				return function(e) {
					b(this, e);
				};
			},
			ignoreTransaction: function(e) {
				return $.trans ? et($.transless, e) : e();
			},
			vip: ir,
			async: function(e) {
				return function() {
					try {
						var t = fr(e.apply(this, arguments));
						return t && typeof t.then == "function" ? t : q.resolve(t);
					} catch (i) {
						return fe(i);
					}
				};
			},
			spawn: function(e, t, i) {
				try {
					var c = fr(e.apply(i, t || []));
					return c && typeof c.then == "function" ? c : q.resolve(c);
				} catch (l) {
					return fe(l);
				}
			},
			currentTransaction: { get: function() {
				return $.trans || null;
			} },
			waitFor: function(e, t) {
				return t = q.resolve(typeof e == "function" ? st.ignoreTransaction(e) : e).timeout(t || 6e4), $.trans ? $.trans.waitFor(t) : t;
			},
			Promise: q,
			debug: {
				get: function() {
					return Ne;
				},
				set: function(e) {
					Gr(e);
				}
			},
			derive: V,
			extend: b,
			props: M,
			override: le,
			Events: Ot,
			on: $e,
			liveQuery: ys,
			extendObservabilitySet: pn,
			getByKeyPath: me,
			setByKeyPath: de,
			delByKeyPath: function(e, t) {
				typeof t == "string" ? de(e, t, void 0) : "length" in t && [].map.call(t, function(i) {
					de(e, i, void 0);
				});
			},
			shallowClone: Je,
			deepClone: Ge,
			getObjectDiff: hr,
			cmp: re,
			asap: be,
			minKey: -Infinity,
			addons: [],
			connections: yt,
			errnames: jn,
			dependencies: bn,
			cache: rt,
			semVer: "4.0.7",
			version: "4.0.7".split(".").map(function(e) {
				return parseInt(e);
			}).reduce(function(e, t, i) {
				return e + t / Math.pow(10, 2 * i);
			})
		})), st.maxKey = jt(st.dependencies.IDBKeyRange), typeof dispatchEvent < "u" && typeof addEventListener < "u" && ($e(Tt, function(e) {
			Ve || (e = new CustomEvent(Xn, { detail: e }), Ve = !0, dispatchEvent(e), Ve = !1);
		}), addEventListener(Xn, function(e) {
			e = e.detail, Ve || gr(e);
		}));
		var vt, Ve = !1, gs = function() {};
		return typeof BroadcastChannel < "u" && ((gs = function() {
			(vt = new BroadcastChannel(Xn)).onmessage = function(e) {
				return e.data && gr(e.data);
			};
		})(), typeof vt.unref == "function" && vt.unref(), $e(Tt, function(e) {
			Ve || vt.postMessage(e);
		})), typeof addEventListener < "u" && (addEventListener("pagehide", function(e) {
			if (!Le.disableBfCache && e.persisted) {
				Ne && console.debug("Dexie: handling persisted pagehide"), vt?.close();
				for (var t = 0, i = yt; t < i.length; t++) i[t].close({ disableAutoOpen: !1 });
			}
		}), addEventListener("pageshow", function(e) {
			!Le.disableBfCache && e.persisted && (Ne && console.debug("Dexie: handling persisted pageshow"), gs(), gr({ all: new ve(-Infinity, [[]]) }));
		})), q.rejectionMapper = function(e, t) {
			return !e || e instanceof dt || e instanceof TypeError || e instanceof SyntaxError || !e.name || !Fr[e.name] ? e : (t = new Fr[e.name](t || e.message, e), "stack" in e && B(t, "stack", { get: function() {
				return this.inner.stack;
			} }), t);
		}, Gr(Ne), s(Le, Object.freeze({
			__proto__: null,
			Dexie: Le,
			liveQuery: ys,
			Entity: Wr,
			cmp: re,
			PropModSymbol: Me,
			PropModification: Dt,
			replacePrefix: function(e, t) {
				return new Dt({ replacePrefix: [e, t] });
			},
			add: function(e) {
				return new Dt({ add: e });
			},
			remove: function(e) {
				return new Dt({ remove: e });
			},
			default: Le,
			RangeSet: ve,
			mergeRanges: Lt,
			rangesOverlap: hn
		}), { default: Le }), Le;
	});
})(ui);
var Ta = ui.exports;
var Nr = /* @__PURE__ */ Ra(Ta), Ts = Symbol.for("Dexie"), Dr = globalThis[Ts] || (globalThis[Ts] = Nr);
if (Nr.semVer !== Dr.semVer) throw new Error(`Two different versions of Dexie loaded in the same app: ${Nr.semVer} and ${Dr.semVer}`);
var js = (o) => {
	o.version(1).stores({ parent: "[seedId+nodeId],parentId" }), o.isOpen() || o.open();
}, ja = () => {
	const o = new Dr("daas-api", {
		cache: "immutable",
		autoOpen: !1
	});
	return sessionStorage.getItem("daas-sdk") ? js(o) : o.delete().then(() => {
		sessionStorage.setItem("daas-sdk", (/* @__PURE__ */ new Date()).toISOString()), js(o);
	}), o;
};
var Ba = class {
	constructor(r) {
		se(this, "filepath");
		se(this, "config", {});
		se(this, "logger", new Bs("DaaS Api"));
		se(this, "db", ja());
		this.config = We({
			token: "token",
			type: "localStorage"
		}, r), this.SetProxy((r == null ? void 0 : r.proxy) ?? ""), this.UpdateAxiosConfig();
	}
	UpdateAxiosConfig() {
		var r, n, s, a, u;
		if ((r = this.config) != null && r.order ? ie.defaults.headers["x-render-order"] = this.config.order : delete ie.defaults.headers["x-render-order"], (n = this.config) != null && n.token) {
			let d;
			switch (this.config.type) {
				case "localStorage":
					d = localStorage.getItem(this.config.token);
					break;
				case "sessionStorage":
					d = sessionStorage.getItem(this.config.token);
					break;
				case "cookie":
					d = (u = (a = (s = document.cookie.split(";")) == null ? void 0 : s.map((h) => Yi(["key", "value"], h.trim().split("=")))) == null ? void 0 : a.find((h) => h.key === this.config.token)) == null ? void 0 : u.value;
					break;
				case "custom":
					d = this.config.token;
					break;
			}
			H(d) || (ie.defaults.headers.Authorization = `Bearer ${d}`);
		} else delete ie.defaults.headers.Authorization;
	}
	SetToken(r) {
		this.config.token = r, this.UpdateAxiosConfig();
	}
	SetType(r) {
		this.config.type = r, this.UpdateAxiosConfig();
	}
	SetProxy(r) {
		let n;
		if (r.startsWith("http")) {
			const s = new URL(r);
			s.pathname.startsWith("/Renderers") ? n = `${s.protocol}//${s.host}` : n = `${s.protocol}//${s.host}${s.pathname.replace("/Renderers/Any/order", "")}`;
		} else n = r.replace("/Renderers/Any/order", ""), n = n.startsWith("/") ? n : `/${n}`;
		ie.defaults.baseURL = n;
	}
	SetOrder(r) {
		this.config.order = r, this.UpdateAxiosConfig();
	}
	GenerationModelInfo(r) {
		var n;
		return {
			assetId: (r == null ? void 0 : r.assetId) ?? (r == null ? void 0 : r.id),
			assetName: (r == null ? void 0 : r.assetName) ?? (r == null ? void 0 : r.name),
			ext: r == null ? void 0 : r.originalAssetExt,
			seedId: r == null ? void 0 : r.seedId,
			size: r == null ? void 0 : r.size,
			type: ((n = this.config) == null ? void 0 : n.category) ?? (r == null ? void 0 : r.subAssetType),
			version: (r == null ? void 0 : r.assetVersion) ?? (r == null ? void 0 : r.seedVersion),
			custom: (r == null ? void 0 : r.custom) ?? {}
		};
	}
	GenerationAssetInfo(r) {
		return {
			assetId: (r == null ? void 0 : r.assetId) ?? (r == null ? void 0 : r.id),
			assetName: (r == null ? void 0 : r.assetName) ?? (r == null ? void 0 : r.name),
			assetNameEn: (r == null ? void 0 : r.assetNameEn) ?? (r == null ? void 0 : r.assetName),
			category: r == null ? void 0 : r.category,
			categoryEn: (r == null ? void 0 : r.categoryEn) ?? (r == null ? void 0 : r.category),
			seedId: r == null ? void 0 : r.seedId,
			size: r == null ? void 0 : r.size,
			thumbnails: r == null ? void 0 : r.thumbnails,
			type: r == null ? void 0 : r.subAssetType,
			version: (r == null ? void 0 : r.assetVersion) ?? (r == null ? void 0 : r.seedVersion),
			custom: (r == null ? void 0 : r.custom) ?? {}
		};
	}
	GenerationPagination(r) {
		const n = We({
			pageNumber: 1,
			pageSize: 20
		}, r);
		return n.pageNumber = (n == null ? void 0 : n.pageNumber) > 0 ? n.pageNumber : 1, n.pageSize = (n == null ? void 0 : n.pageSize) > 0 ? n.pageSize : 20, n;
	}
	async GenerationAll(r, n, s, a, u) {
		let d = s;
		const h = [];
		for (; a > d;) d++, h.push(u.call(this, {
			...n,
			pageNumber: d
		}));
		if (!H(h)) {
			const b = performance.now(), y = await Promise.all(h);
			for (const P of y) H(P.result.data) || r.push(...P.result.data);
			this.logger.highLevel("GetAll", u.name, n, `${performance.now() - b}ms`);
		}
	}
	async GenerationChildrenByLocation(r, n, s, a, u, d) {
		var y, P, D;
		let h = (y = n == null ? void 0 : n.children) == null ? void 0 : y[0], b = r == null ? void 0 : r.find((M) => M.nodeId === h.nodeId);
		for (; h && b && !(h != null && h.isLeaf || (h == null ? void 0 : h.nodeId) === a);) {
			if (!(b != null && b.children)) {
				const M = await this.GetNodeTree({
					seedId: s,
					fetchAll: !0,
					nodeId: h.nodeId,
					hideNodes: u,
					visibleNodes: d
				});
				if (!M.success) break;
				b.children = M.result;
			}
			h = (P = h == null ? void 0 : h.children) == null ? void 0 : P[0], b = (D = b == null ? void 0 : b.children) == null ? void 0 : D.find((M) => M.nodeId === (h == null ? void 0 : h.nodeId));
		}
	}
	async ComputeNodeVisible(r, { hideNodes: n, visibleNodes: s }) {
		const { nodeId: a, seedId: u, parentId: d } = r;
		if (!a || !u) return !0;
		if (!H(n)) {
			if (!!(s != null && s.find((P) => P == a || P == d))) return !0;
			if (!!(n != null && n.find((P) => P == a || P == d))) return !1;
			const { result: y = [] } = await this.GetNodeParentId({
				nodeId: a,
				seedId: u
			});
			y.reverse();
			for (const P of y) {
				if (!!(s != null && s.find((z) => z == P || z == d))) return !0;
				if (!!(n != null && n.find((z) => z == P || z == d))) return !1;
			}
		}
		return !0;
	}
	ComputeSeedId(r) {
		return {
			seedId: r,
			version: "",
			stageProduct: ""
		};
	}
	async GetAssetList(r) {
		const { assetName: n, fetchAll: s, pageNumber: a, pageSize: u, apiVersion: d } = this.GenerationPagination(r), h = {
			assetName: n,
			pageNumber: a,
			pageSize: u
		};
		return d && (h.apiVersion = d), new Promise((b) => ie.post("/v3/daas/seed/model/official/list", h).then(async (y) => {
			const P = ((y == null ? void 0 : y.data) ?? []).map((D) => this.GenerationAssetInfo(D));
			s ? (await this.GenerationAll(P, {
				assetName: n,
				pageSize: u
			}, y.pageNumber, y.totalPage, this.GetAssetList), b({
				result: P,
				success: !0
			})) : b({
				result: {
					...y,
					data: P
				},
				success: !0
			});
		}).catch((y) => b({
			message: (y == null ? void 0 : y.message) ?? y,
			success: !1
		})));
	}
	async GetModelList(r) {
		const { assetName: n, fetchAll: s, pageNumber: a, pageSize: u, apiVersion: d } = this.GenerationPagination(r), h = {
			assetName: n,
			pageNumber: a,
			pageSize: u
		};
		return d && (h.apiVersion = d), new Promise((b) => ie.post("/v1/daas/seed/model/personal/list", h).then(async (y) => {
			const P = ((y == null ? void 0 : y.data) ?? []).filter((D) => {
				var M, z;
				return (D == null ? void 0 : D.isHierarchy) || ((z = (M = D == null ? void 0 : D.features) == null ? void 0 : M.filter((B) => B.eName === "StaticMesh_Hierarchy")) == null ? void 0 : z.length) > 0;
			}).map((D) => this.GenerationModelInfo(D));
			s ? (await this.GenerationAll(P, {
				assetName: n,
				pageSize: u
			}, y.pageNumber, y.totalPage, this.GetModelList), b({
				result: P,
				success: !0
			})) : b({
				result: {
					...y,
					data: P
				},
				success: !0
			});
		}).catch((y) => b({
			message: (y == null ? void 0 : y.message) ?? y,
			success: !1
		})));
	}
	/** @deprecated */
	async GetInfoByAssetId(r) {
		return H(r) ? {
			message: "assetId is empty",
			success: !1
		} : new Promise((n) => {
			ie.get(`/v1/daas/asset/model/info/${r}`).then((s) => n({
				result: s,
				success: !0
			})).catch((s) => n({
				message: s == null ? void 0 : s.message,
				success: !1
			}));
		});
	}
	/** @deprecated */
	async GetInfoBySeedId(r) {
		return H(r) ? {
			message: "seedId is empty",
			success: !1
		} : new Promise((n) => {
			ie.post("/v1/daas/asset/info-by-seedid", {
				seedId: r,
				version: "latest"
			}).then((s) => n({
				result: this.GenerationModelInfo(s),
				success: !0
			})).catch((s) => n({
				message: (s == null ? void 0 : s.message) ?? s,
				success: !1
			}));
		});
	}
	/** @deprecated */
	async GetInfoBySeedIdV2(r) {
		return H(r) ? {
			message: "seedId is empty",
			success: !1
		} : new Promise((n) => {
			ie.post("/v1/daas/asset/list-info-by-seedid", {
				seedId: r,
				version: "latest"
			}).then((s) => {
				var a;
				return n({
					success: !0,
					result: this.GenerationModelInfo((a = s == null ? void 0 : s.data) == null ? void 0 : a[0])
				});
			}).catch((s) => n({
				message: (s == null ? void 0 : s.message) ?? s,
				success: !1
			}));
		});
	}
	async GetNodeTree(r) {
		const { seedId: n, fetchAll: s, nodeId: a, pageNumber: u, pageSize: d, hideNodes: h, visibleNodes: b } = this.GenerationPagination(r);
		return H(n) ? {
			message: "seedId is empty",
			success: !1
		} : new Promise((y) => {
			ie.post("/v1/daas/asset/bim/elements/tree", {
				seedId: this.ComputeSeedId(n),
				nodeId: `${(r == null ? void 0 : r.nodeId) ?? ""}`,
				pageNumber: u,
				pageSize: d
			}).then(async (P) => {
				var M;
				const D = ((M = P == null ? void 0 : P.data) == null ? void 0 : M.children) ?? [];
				for (const z of D) z.bVisible = await this.ComputeNodeVisible({
					nodeId: z.nodeId,
					seedId: n,
					parentId: a
				}, {
					hideNodes: h,
					visibleNodes: b
				});
				s ? (await this.GenerationAll(D, {
					seedId: n,
					nodeId: a,
					pageSize: d
				}, P.pageNumber, P.totalPage, this.GetNodeTree), y({
					result: D,
					success: !0
				})) : y({
					result: {
						...P,
						data: D
					},
					success: !0
				});
			}).catch((P) => y({
				message: (P == null ? void 0 : P.message) ?? P,
				success: !1
			}));
		});
	}
	async GetNodeRoot(r) {
		return H(r) ? {
			message: "seedId is empty",
			success: !1
		} : new Promise((n) => {
			ie.post("/v1/daas/asset/bim/elements/tree", {
				seedId: this.ComputeSeedId(r),
				nodeId: "",
				pageNumber: 1,
				pageSize: 1
			}).then(async (s) => {
				const a = (s == null ? void 0 : s.data) ?? {};
				a == null || delete a.children, n({
					success: !0,
					result: a
				});
			}).catch((s) => n({
				message: (s == null ? void 0 : s.message) ?? s,
				success: !1
			}));
		});
	}
	async GetNodeList(r) {
		const { seedId: n, depth: s, nodeId: a } = r;
		return H(n) ? {
			message: "seedId is empty",
			success: !1
		} : new Promise((u) => ie.post("/v1/daas/asset/bim/elements/tree/list", {
			seedId: this.ComputeSeedId(n),
			depth: `${s ?? 5}`,
			nodeId: `${a}`
		}).then((d) => u({
			result: d,
			success: !0
		})).catch((d) => u({
			message: (d == null ? void 0 : d.message) ?? d,
			success: !1
		})));
	}
	async GetNodeListByProperty(r) {
		const { seedId: n, properties: s } = r;
		return H(n) ? {
			message: "seedId is empty",
			success: !1
		} : H(s) ? {
			message: "properties is empty",
			success: !1
		} : new Promise((a) => ie.post("/v1/daas/asset/bim/elements/node/list", {
			seedId: this.ComputeSeedId(n),
			properties: s
		}).then((u) => a({
			result: u,
			success: !0
		})).catch((u) => a({
			message: (u == null ? void 0 : u.message) ?? u,
			success: !1
		})));
	}
	async GetNodeListBySearch(r) {
		const { seedId: n, fetchAll: s, keyword: a, pageNumber: u, pageSize: d, keywordType: h = 1 } = this.GenerationPagination(r);
		return H(a) ? {
			message: "keyword is empty",
			result: [],
			success: !1
		} : H(n) ? {
			message: "seedId is empty",
			result: [],
			success: !1
		} : new Promise((b) => {
			ie.post("/v1/daas/asset/bim/elements/search", {
				seedId: this.ComputeSeedId(n),
				keyword: a,
				pageNumber: u,
				pageSize: d,
				keywordType: h
			}).then(async (y) => {
				if (s) {
					const P = (y == null ? void 0 : y.data) ?? [];
					await this.GenerationAll(P, {
						seedId: n,
						keyword: a,
						pageSize: d
					}, y.pageNumber, y.totalPage, this.GetNodeListBySearch), b({
						result: P,
						success: !0
					});
				} else b({
					result: y,
					success: !0
				});
			}).catch((y) => b({
				message: (y == null ? void 0 : y.message) ?? y,
				success: !1
			}));
		});
	}
	async GetNodeTreeBySearch(r) {
		var z;
		const { seedId: n, keyword: s, hideNodes: a, visibleNodes: u } = this.GenerationPagination(r);
		if (H(n)) return {
			message: "seedId is empty",
			success: !1
		};
		if (H(s)) return {
			message: "keyword is empty",
			success: !1
		};
		const d = await this.GetNodeListBySearch(r);
		if (!d.success) return d;
		if (H(d.result)) return {
			success: !0,
			result: {
				data: [],
				keys: []
			}
		};
		const h = await this.GetNodeTree({
			seedId: n,
			fetchAll: !0,
			hideNodes: a,
			visibleNodes: u
		}), b = (h == null ? void 0 : h.result) ?? [], y = performance.now(), P = ((z = d == null ? void 0 : d.result) == null ? void 0 : z.data) ?? (d == null ? void 0 : d.result) ?? [], D = Zi(P, (B) => B.path);
		for (const B of D) {
			const { result: V, success: U } = await this.GetNodeLocation({
				seedId: n,
				nodeId: B.nodeId
			});
			U && await this.GenerationChildrenByLocation(b, V, n, B.nodeId, a, u);
		}
		const M = Qi(P, (B) => B.nodeId, (B) => B.nodeLabel.length > 0);
		return this.logger.highLevel("node tree search", b, M, performance.now() - y), {
			result: {
				data: b,
				keys: M
			},
			success: !0
		};
	}
	async GetNodeTreeById(r) {
		const { seedId: n, nodeId: s, hideNodes: a, visibleNodes: u } = r;
		if (H(n)) return {
			message: "seedId is empty",
			success: !1
		};
		if (H(s)) return {
			message: "nodeId is empty",
			success: !1
		};
		const [d, h] = await Promise.all([this.GetNodeLocation({
			seedId: n,
			nodeId: s
		}), this.GetNodeTree({
			seedId: n,
			fetchAll: !0,
			hideNodes: a,
			visibleNodes: u
		})]), b = (h == null ? void 0 : h.result) ?? [];
		if (!d.success) return {
			...d,
			result: { children: b }
		};
		const y = performance.now();
		return await this.GenerationChildrenByLocation(b, d.result, n, "", a, u), this.logger.highLevel("node tree by id", d == null ? void 0 : d.result, b, performance.now() - y), {
			result: {
				...d.result,
				children: b
			},
			success: !0
		};
	}
	async GetNodeParentId(r) {
		var d, h, b;
		const { seedId: n, nodeId: s } = r;
		if (H(n)) return {
			message: "seedId is empty",
			success: !1
		};
		if (H(s)) return {
			message: "nodeId is empty",
			success: !1
		};
		const a = await this.db.parent.get({
			seedId: n,
			nodeId: s
		}), u = [];
		if (a != null && a.parentId) u.push(...a.parentId);
		else {
			const y = await this.GetNodeLocation({
				seedId: n,
				nodeId: s
			});
			if (!y.success) return {
				...y,
				result: u
			};
			let P = (h = (d = y.result) == null ? void 0 : d.children) == null ? void 0 : h[0];
			for (; P && (P == null ? void 0 : P.nodeId) !== s;) u.push(P.nodeId), P = (b = P == null ? void 0 : P.children) == null ? void 0 : b[0];
			this.db.parent.put({
				seedId: n,
				nodeId: s,
				parentId: u
			});
		}
		return {
			result: u,
			success: !0
		};
	}
	async GetNodeInfo(r) {
		const { seedId: n, nodeId: s } = r;
		return H(n) ? {
			message: "seedId is empty",
			success: !1
		} : H(s) ? {
			message: "nodeId is empty",
			success: !1
		} : new Promise((a) => {
			ie.get(`/v1/daas/asset/bim/elements/seed/node/properties/${n}/${s}`).then((u) => {
				var d;
				u != null && u.status ? a({
					message: "node isnot leaf root or no data",
					result: [],
					success: !1
				}) : a({
					result: (d = u == null ? void 0 : u[0]) == null ? void 0 : d.items,
					success: !0
				});
			}).catch((u) => a({
				message: (u == null ? void 0 : u.message) ?? u,
				success: !1
			}));
		});
	}
	async GetNodeLocation(r) {
		const { seedId: n, nodeId: s } = r;
		return H(n) ? {
			message: "seedId is empty",
			success: !1
		} : H(s) ? {
			message: "nodeId is empty",
			success: !1
		} : new Promise((a) => {
			ie.post("/v1/daas/asset/bim/elements/location", {
				seedId: this.ComputeSeedId(n),
				nodeId: `${s}`
			}).then((u) => {
				u != null && u.children ? a({
					result: u,
					success: !0
				}) : a({
					message: "unknown node, please confirm if the node is correct",
					success: !1
				});
			}).catch((u) => a({
				message: (u == null ? void 0 : u.message) ?? u,
				success: !1
			}));
		});
	}
	async GetModelsByMetadata(r) {
		const { seedIds: n, properties: s } = r;
		return H(n) ? {
			message: "seedIds is empty",
			success: !1
		} : new Promise((a) => {
			ie.post("/v1/daas/asset/list-by-metadata", {
				seedIds: n,
				properties: s
			}).then((u) => {
				u != null && u.status ? a({
					message: "no corresponding data available",
					success: !1
				}) : a({
					success: !0,
					result: (u == null ? void 0 : u.data) ?? u
				});
			}).catch((u) => a({
				message: (u == null ? void 0 : u.message) ?? u,
				success: !1
			}));
		});
	}
	async GetNodesByProperties(r) {
		const { seedIds: n, properties: s, type: a = "element", disableDetails: u = !1 } = r;
		return H(n) ? {
			message: "seedIds is empty",
			success: !1
		} : new Promise((d) => {
			ie.post("/v1/daas/asset/bim/elements/node/group-list", {
				seedIds: n,
				properties: s,
				type: a,
				disableDetails: u
			}).then((h) => {
				h != null && h.status ? d({
					message: "no corresponding data available",
					success: !1
				}) : d({
					success: !0,
					result: h
				});
			}).catch((h) => d({
				message: (h == null ? void 0 : h.message) ?? h,
				success: !1
			}));
		});
	}
	async GetNodeStruct(r) {
		const { seedId: n, nodeIds: s = [], orgIds: a = [], type: u = "" } = r;
		return H(n) ? {
			message: "seedId is empty",
			success: !1
		} : H(s) && H(a) ? {
			message: "nodeId or orgId is empty",
			success: !1
		} : new Promise((d) => ie.post("/v1/daas/asset/bim/elements/node/information", {
			seedId: this.ComputeSeedId(n),
			orgId: a,
			nodeId: s,
			type: u
		}).then((h) => {
			h != null && h.status ? d({
				message: "no corresponding data available",
				success: !1
			}) : d({
				success: !0,
				result: H(h) ? [] : h
			});
		}).catch((h) => d({
			message: (h == null ? void 0 : h.message) ?? h,
			success: !1
		})));
	}
	async GetPing() {
		return new Promise((r) => ie.get("/ping").then((n) => r({
			result: n,
			success: !0
		})).catch((n) => r({
			message: (n == null ? void 0 : n.messages) ?? (n == null ? void 0 : n.message) ?? n,
			success: !1
		})));
	}
	async GetFileUploadPath() {
		return new Promise((r) => ie.get("/api/v1/daas/asset/path/prefix").then((n) => r({
			result: n == null ? void 0 : n.pathPrefix,
			success: !0
		})).catch((n) => r({
			message: (n == null ? void 0 : n.messages) ?? (n == null ? void 0 : n.message) ?? n,
			success: !1
		})));
	}
	async PostFileToServer(r) {
		const n = new FormData();
		for (const s in r) n.append(s, r[s]);
		return new Promise((s) => ie.post("/api/v1/daas/asset/model/upload", n, { headers: { "Content-Type": "multipart/form-data" } }).then((a) => s({
			result: a,
			success: !0
		})).catch((a) => s({
			message: (a == null ? void 0 : a.messages) ?? (a == null ? void 0 : a.message) ?? a,
			success: !1
		})));
	}
	async FileUpload(r) {
		if (!this.filepath) {
			const u = await this.GetFileUploadPath();
			if (!u.success) return u;
			this.filepath = u.result;
		}
		const n = {
			assetName: r.name,
			file: r,
			lastChunk: !0,
			offset: 0,
			part: 0,
			path: `${this.filepath}${r.name}`,
			size: r.size,
			totalPart: 1
		}, s = 4 * 1024 ** 2, a = performance.now();
		if (r.size > s) {
			const u = Math.ceil(r.size / s);
			n.totalPart = u;
			for (let d = 0; d < u; d++) {
				const h = r.slice(d * s, (d + 1) * s), b = Object.assign({}, n, {
					file: h,
					lastChunk: d + 1 === u,
					offset: d * s,
					part: d,
					size: h.size
				}), { result: y } = await this.PostFileToServer(b), { assetId: P, assetName: D } = y;
				await this.TriggerFileTransform(P, D);
			}
		} else {
			const { result: u } = await this.PostFileToServer(n), { assetId: d, assetName: h } = u;
			await this.TriggerFileTransform(d, h);
		}
		return this.logger.highLevel("FileUpload", performance.now() - a), {
			message: "OK",
			success: !0
		};
	}
	async TriggerFileTransform(r, n) {
		return new Promise((s) => ie.post("/api/v1/daas/pipeline/dispatching", {
			assetId: r,
			assetName: n
		}).then((a) => s({
			result: a,
			success: !0
		})).catch((a) => s({
			message: (a == null ? void 0 : a.messages) ?? (a == null ? void 0 : a.message) ?? a,
			success: !1
		})));
	}
	async GetFileTransformTaskList(r) {
		const { fetchAll: n, pageNumber: s, pageSize: a, taskId: u } = this.GenerationPagination(r);
		return new Promise((d) => ie.post("/api/v1/daas/pipeline/task/asset/personal/list", {
			pageNumber: s,
			pageSize: a,
			status: [
				"OTHER",
				"FAILED",
				"QUEUING",
				"STOPPED",
				"RUNNING"
			],
			taskId: u
		}).then(async (h) => {
			const b = (h == null ? void 0 : h.pipelines) ?? [];
			n ? (await this.GenerationAll(b, {
				pageSize: a,
				taskId: u
			}, h.pageNumber, h.totalPage, this.GetFileTransformTaskList), d({
				result: b,
				success: !0
			})) : d({
				result: {
					data: b,
					pageNumber: (h == null ? void 0 : h.pageNumber) ?? 1,
					total: (h == null ? void 0 : h.total) ?? 0,
					totalPage: (h == null ? void 0 : h.totalPage) ?? 1
				},
				success: !0
			});
		}).catch((h) => d({
			message: (h == null ? void 0 : h.messages) ?? (h == null ? void 0 : h.message) ?? h,
			success: !1
		})));
	}
	async GetFileTransformTaskByAssetId(r) {
		return r ? new Promise((n) => ie.get(`/api/v1/daas/pipeline/task/asset/${r}`, { data: {
			pageNumber: 1,
			pageSize: 10
		} }).then((s) => n({
			result: s,
			success: !0
		})).catch((s) => n({
			message: (s == null ? void 0 : s.messages) ?? (s == null ? void 0 : s.message) ?? s,
			success: !1
		}))) : {
			message: "assetId is empty",
			success: !1
		};
	}
	async GetFileTransformTaskById(r) {
		return r ? new Promise((n) => ie.get(`/api/v1/daas/pipeline/task/${r}`).then((s) => n({
			result: s,
			success: !0
		})).catch((s) => n({
			message: (s == null ? void 0 : s.messages) ?? (s == null ? void 0 : s.message) ?? s,
			success: !1
		}))) : {
			message: "taskId is empty",
			success: !1
		};
	}
};
var ut = class {
	constructor() {
		se(this, "obj");
	}
	handleDaaSApi() {
		var n, s, a, u;
		return new Ba(We({
			order: (n = this.obj) == null ? void 0 : n.order,
			proxy: (s = this.obj) == null ? void 0 : s.url,
			category: "Hierarchy"
		}, (u = (a = this.obj) == null ? void 0 : a.DCP) == null ? void 0 : u.DaaS));
	}
	handleLogger(r) {
		var n;
		return new Bs(`BIM SDK ${r ?? ""}`.trim(), (n = this.obj) == null ? void 0 : n.debugMode);
	}
	handleEventResponse({ obj: r, objs: n }, s) {
		const { success: a, result: u, message: d } = s;
		let h;
		a === !1 ? h = {
			success: a,
			result: u,
			message: d
		} : h = {
			success: a ?? !0,
			result: {
				...u,
				tag: "BIM"
			}
		}, r?.func(h);
		for (const b of n) b?.func(h);
	}
};
var Er = (o, r) => {
	for (const n of Reflect.ownKeys(r)) n !== "constructor" && n !== "prototype" && n !== "name" && Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(r, n) || /* @__PURE__ */ Object.create(null));
}, Ut = (o, ...r) => {
	class n extends o {
		constructor(a, u) {
			super(a, u);
			for (const d of r) Er(this, new d(a));
		}
	}
	for (const s of r) Er(n, s), Er(n.prototype, s.prototype);
	return n;
};
var Fe = class {
	async BimUpdate(r, n = !1, s = !1) {
		if (n && !(await this.Active()).success) return {
			message: "Model active failed",
			success: !1
		};
		s && await this.obj.Transaction.Start({
			transactionName: "bim-api",
			bTransactionGroup: !1,
			bCanUndo: !0,
			bCanCommit: !0
		});
		const a = await this.Update(r, { bimUpdate: !0 });
		return s && await this.obj.Transaction.Commit(), a.success && n && await this.handleActiveAction(n), a;
	}
	async BimSendData(r, n = !1) {
		return this.obj ? n && !(await this.Active()).success ? {
			message: "Model active failed",
			success: !1
		} : r ? await r.call(this) : {
			success: !0,
			message: "OK"
		} : {
			message: "Object is empty",
			success: !1
		};
	}
	async handleActiveAction(r = !0) {
		const { result: n } = await this.obj.Scene.Model.Hierarchy.Get();
		for (const s of n) s != null && s.object && (s.object.eid === this.eid ? s.object.setActiveData({ isActive: r }) : s.object.setActiveData({ isActive: !1 }));
	}
};
var gc = class extends ut {
	constructor() {
		super();
		se(this, "install", async () => {
			const n = await Promise.resolve().then(() => $a), s = await Promise.resolve().then(() => Ja), a = await Promise.resolve().then(() => Va), u = await Promise.resolve().then(() => Qa), d = await Promise.resolve().then(() => Xa);
			return {
				info: {
					des: "BIM/DCP js sdk to control user's 3D Model",
					name: "BIM/DCP API",
					version: "2.1.1"
				},
				list: [
					{
						factory: n.default,
						name: "DCP"
					},
					{
						factory: s.default,
						name: "DcpSave",
						category: "DCP",
						object: a.default,
						type: "DCPSaveEntity"
					},
					{
						category: "Model",
						factory: u.default,
						name: "Hierarchy",
						object: d.default,
						type: "HierarchyMeshEntity"
					}
				]
			};
		});
		this.handleLogger().warn("Install", "version: 2.1.1", `updated: ${(/* @__PURE__ */ new Date(1769736952226)).toISOString()}`);
	}
};
var Ma = class extends Fe {
	async GetNodeRoot() {
		return await this.handleDaaSApi().GetNodeRoot(this.seedId);
	}
	async GetNodeTree(r, n) {
		const { fetchAll: s, pageSize: a, pageNumber: u } = n ?? {}, d = await this.handleDaaSApi().GetNodeTree({
			nodeId: r,
			seedId: this.seedId,
			fetchAll: !wt(s, !1),
			pageSize: a,
			pageNumber: u,
			...this.DCPNodeStateAtom
		});
		return this.handleLogger().highLevel("GetNodeTree", d), d;
	}
	async GetNodeTreeBySearch(r, n) {
		const { fetchAll: s, pageSize: a, pageNumber: u, keywordType: d = 1 } = n ?? {}, h = await this.handleDaaSApi().GetNodeTreeBySearch({
			seedId: this.seedId,
			keyword: r,
			keywordType: d,
			fetchAll: !wt(s, !1),
			pageSize: a,
			pageNumber: u,
			...this.DCPNodeStateAtom
		});
		return this.handleLogger().highLevel("GetNodeTreeBySearch", h), h;
	}
	async GetNodeListBySearch(r, n) {
		const { fetchAll: s, pageSize: a, pageNumber: u, keywordType: d = 1 } = n ?? {}, h = await this.handleDaaSApi().GetNodeListBySearch({
			seedId: this.seedId,
			keyword: r,
			keywordType: d,
			fetchAll: !wt(s, !1),
			pageSize: a,
			pageNumber: u
		});
		return this.handleLogger().highLevel("GetNodeListBySearch", h), h;
	}
	/** @deprecated */
	async GetNodeAttr(r) {
		return await this.handleDaaSApi().GetNodeInfo({
			seedId: this.seedId,
			nodeId: r
		});
	}
	async GetNodeInfo(r) {
		return await this.handleDaaSApi().GetNodeInfo({
			seedId: this.seedId,
			nodeId: r
		});
	}
	async GetNodeTreeById(r) {
		const n = await this.handleDaaSApi().GetNodeTreeById({
			seedId: this.seedId,
			nodeId: r,
			...this.DCPNodeStateAtom
		});
		return this.handleLogger().highLevel("GetNodeTreeById", n), n;
	}
	async GetNodeParentId(r) {
		return await this.handleDaaSApi().GetNodeParentId({
			seedId: this.seedId,
			nodeId: r
		});
	}
	async GetNodeStruct(r, n) {
		var h, b;
		const { success: s, message: a, result: u } = await this.handleDaaSApi().GetNodeStruct({
			seedId: this.seedId,
			...r,
			type: n
		});
		if (!s) return {
			success: s,
			message: a,
			result: u
		};
		const d = n ? _n(n) ? n : [n] : ["element", "space"];
		return {
			success: !0,
			result: (b = (h = (u == null ? void 0 : u.data) ?? u) == null ? void 0 : h.filter((y) => H(y == null ? void 0 : y.type) ? d.includes(y.type) : !0)) == null ? void 0 : b.map((y) => y.nodeId)
		};
	}
};
var La = class extends Fe {
	constructor() {
		super(...arguments);
		se(this, "className", "Hierarchy");
		se(this, "AssetAtom", {
			seedId: null,
			assetId: null
		});
		se(this, "HierarchyMeshEntityAtom", { isActive: !1 });
	}
	get seedId() {
		return this.AssetAtom.seedId;
	}
	get assetId() {
		return this.AssetAtom.assetId;
	}
	get assetName() {
		var n;
		return ((n = this == null ? void 0 : this.BasicInfoAtom) == null ? void 0 : n.entityName) ?? this.assetId;
	}
	get isActive() {
		return this.HierarchyMeshEntityAtom.isActive;
	}
	setAssetData(n) {
		this.handleAssetAtom(this.AssetAtom, n);
	}
	handleAssetAtom(n, s) {
		const a = Object.keys(s);
		for (const u of a) u === "assetId" && (n.assetId = s[u]), u === "seedId" && (n.seedId = s[u]);
	}
	setActiveData(n) {
		this.handleActiveAtom(this.HierarchyMeshEntityAtom, n);
	}
	handleActiveAtom(n, s) {
		const a = (s == null ? void 0 : s.HierarchyMeshEntityAtom) ?? s, u = Object.keys(a);
		for (const d of u) d === "isActive" && (n.isActive = a[d]);
	}
	async GetSeedId() {
		return {
			message: "",
			result: this.seedId,
			success: !0
		};
	}
	async SetSeedId(n) {
		const s = await this.Update({ seedId: n });
		return s.success && this.setAssetData({ seedId: n }), s;
	}
	async GetAssetId() {
		if (H(this.assetId)) {
			const { result: n, success: s } = await this.handleDaaSApi().GetInfoBySeedIdV2(this.AssetAtom.seedId);
			if (!s && !(n != null && n.assetId)) return {
				success: !1,
				message: "assetId not found."
			};
			this.setAssetData({ assetId: n.assetId });
		}
		return {
			success: !0,
			result: this.assetId
		};
	}
	async Active(n = !0) {
		const s = await this.StartApi("DCPModelAPIRegister", "DcpModelActive", {
			status: n,
			eid: this.eid
		});
		if (s.success) await this.handleActiveAction(n);
		else {
			const a = await this.IsActive();
			a.success || this.handleLogger().error("BIM Active failed", s, a), a.result && n && (await this.handleActiveAction(n), s.success = !0);
		}
		return s;
	}
	async IsActive() {
		var s;
		const n = await this.StartApi("DCPModelAPIRegister", "DcpGetModelActived");
		return n.success ? {
			message: "",
			result: ((s = n == null ? void 0 : n.result) == null ? void 0 : s.eid) === this.eid,
			success: !0
		} : n;
	}
	async SetFocus(n = {
		distanceFactor: .5,
		flyTime: 0,
		rotation: {
			pitch: -30,
			yaw: 0
		}
	}) {
		var s, a;
		return n.entity = [this], await ((a = (s = this == null ? void 0 : this.obj) == null ? void 0 : s.CameraControl) == null ? void 0 : a.Focus(n));
	}
	async SetGround(n) {
		return await this.SnapTo({ calculateCoordZ: {
			coordZOffset: (n == null ? void 0 : n.offset) ?? 0,
			coordZRef: (n == null ? void 0 : n.type) ?? "surface"
		} });
	}
	async SetGizmo(n) {
		switch (n) {
			case "center": {
				const s = await this.obj.Scene.GetBoundingBox([this]);
				if (s.success) {
					const a = await this.obj.Tools.Coordinate.GISToCartesian([this.location]);
					if (!a.success) return {
						success: !1,
						message: ""
					};
					const u = a.result.to[0], d = s.result.entitiesBound.center[0] - u[0], h = s.result.entitiesBound.center[1] - u[1], b = s.result.entitiesBound.center[2] - u[2];
					return await this.Update({ pivotOffset: [
						d,
						h,
						b
					] });
				}
				break;
			}
			case "reset": return await this.Update({ pivotOffset: [
				0,
				0,
				0
			] });
			default: return await this.Update({ pivotOffset: n });
		}
		return {
			success: !1,
			message: ""
		};
	}
	async StartModelSection(n) {
		return this.BimSendData(async () => {
			const s = We({
				coordZRef: "ground",
				strokeColor: "CF4300FF",
				strokeWeight: 1,
				invert: !1,
				showLocation: !0,
				transform: {
					location: [
						0,
						0,
						0
					],
					rotator: {
						pitch: 0,
						yaw: 0,
						roll: 0
					},
					size: [
						50,
						50,
						50
					]
				}
			}, n);
			return await this.StartApi("DCPSectionAPIRegister", "StartModelSection", {
				eid: this.eid,
				status: !0,
				...s
			});
		});
	}
	async ResetModelSection() {
		return this.BimSendData(async () => await this.StartApi("DCPSectionAPIRegister", "ResetModelSection", { eid: this.eid }));
	}
	async EndModelSection() {
		return this.BimSendData(async () => await this.StartApi("DCPSectionAPIRegister", "EndModelSection", { eid: this.eid }));
	}
};
var Fa = class extends Fe {
	constructor() {
		super(...arguments);
		se(this, "GraphicsAtom", {
			bLoadGraphics: !0,
			bCastShadow: !0
		});
	}
	setGraphicsData(n) {
		this.handleGraphicsAtom(this.GraphicsAtom, (n == null ? void 0 : n.GraphicsAtom) ?? n);
	}
	handleGraphicsAtom(n, s) {
		const a = Object.keys(s);
		for (const u of a) (u === "bLoadGraphics" || u === "tempLoad") && (n.bLoadGraphics = s[u]), (u === "bCastShadow" || u === "castShadow") && (n.bCastShadow = s[u]);
	}
	get tempLoad() {
		return this.GraphicsAtom.bLoadGraphics;
	}
	set tempLoad(n) {
		this.Update({ GraphicsAtom: { bLoadGraphics: n } });
	}
	get castShadow() {
		return this.GraphicsAtom.bCastShadow;
	}
	set castShadow(n) {
		this.Update({ GraphicsAtom: { bCastShadow: n } });
	}
};
var Ga = class extends Fe {
	constructor() {
		super(...arguments);
		se(this, "DCPBuildingLayerAtom", {
			buildingLayers: { layers: [] },
			isEnabled: !1
		});
		se(this, "BuildingSettingAtom", {});
	}
	get isDisassembly() {
		return this.DCPBuildingLayerAtom.isEnabled;
	}
	set isDisassembly(n) {
		this.DCPBuildingLayerAtom.isEnabled = n;
	}
	setBuildLayerData(n) {
		this.handleBuildLayerAtom(this.DCPBuildingLayerAtom, n);
	}
	handleBuildLayerAtom(n, s) {
		const a = (s == null ? void 0 : s.DCPBuildingLayerAtom) ?? s, u = Object.keys(a);
		for (const d of u) d === "buildingLayers" && (n.buildingLayers = a[d]), d === "isEnabled" && (n.isEnabled = a[d]);
	}
	handleBuildSettingAtom(n, s) {
		const a = (s == null ? void 0 : s.BuildingSettingAtom) ?? s, u = Object.keys(a);
		for (const d of u) d === "Direction" && (n.Direction = a[d]), d === "MoveTime" && (n.MoveTime = a[d]), d === "Distance" && (n.MoveTime = a[d]), d === "Height" && (n.MoveTime = a[d]);
	}
	async SetDisassembly() {
		return this.obj ? this.BimSendData(async () => (this.isDisassembly ? (await this.StartApi("DCPBuildingLayerAPIRegister", "DcpEndBuildingLayer")).success && (this.isDisassembly = !1, await this.StartApi("DCPSwitchAPIRegister", "DcpClickBuildingLayer", {
			bOpen: !1,
			eid: this.eid
		})) : (await this.StartApi("DCPBuildingLayerAPIRegister", "DcpStartBuildingLayer", { eid: this.eid })).success && (this.isDisassembly = !0, await this.StartApi("DCPSwitchAPIRegister", "DcpClickBuildingLayer", {
			bOpen: !0,
			eid: this.eid
		})), {
			success: !0,
			result: this.GetData()
		})) : {
			message: "Object is empty",
			success: !1
		};
	}
	async EndBuildingLayer() {
		return this.obj ? this.BimSendData(async () => ((await this.StartApi("DCPBuildingLayerAPIRegister", "DcpEndBuildingLayer")).success && (this.isDisassembly = !1, await this.StartApi("DCPSwitchAPIRegister", "DcpClickBuildingLayer", {
			bOpen: !1,
			eid: this.eid
		})), {
			success: !0,
			result: this.GetData()
		})) : {
			message: "Object is empty",
			success: !1
		};
	}
	async StartBuildingLayer() {
		return this.obj ? this.BimSendData(async () => ((await this.StartApi("DCPBuildingLayerAPIRegister", "DcpStartBuildingLayer", { eid: this.eid })).success && (this.isDisassembly = !0, await this.StartApi("DCPSwitchAPIRegister", "DcpClickBuildingLayer", {
			bOpen: !0,
			eid: this.eid
		})), {
			success: !0,
			result: this.GetData()
		})) : {
			message: "Object is empty",
			success: !1
		};
	}
	async SetBuildSetting(n) {
		return this.handleBuildSettingAtom(this.BuildingSettingAtom, n), {
			success: !0,
			result: this.BuildingSettingAtom
		};
	}
	async ResetBuildLayers() {
		if (!this.obj) return {
			message: "Object is empty",
			success: !1
		};
		const n = { layers: [] }, s = await this.BimUpdate({ buildingLayers: n }, !1);
		return s.success && this.setBuildLayerData({ buildingLayers: n }), s;
	}
};
var Ka = class extends Fe {
	constructor() {
		super(...arguments);
		se(this, "MaterialAtom", {
			changedMaterialInfo: [],
			bReceivesDecals: !0
		});
		se(this, "materialEntities", []);
	}
	get material() {
		return this.materialEntities;
	}
	set material(n) {
		this.materialEntities = n;
	}
	get changedMaterialInfo() {
		return this.MaterialAtom.changedMaterialInfo;
	}
	set changedMaterialInfo(n) {
		this.Update({ changedMaterialInfo: n });
	}
	get bReceivesDecals() {
		return this.MaterialAtom.bReceivesDecals;
	}
	set bReceivesDecals(n) {
		this.Update({ bReceivesDecals: n });
	}
	async GetChangedMaterialInfo() {
		return {
			message: "",
			result: this.MaterialAtom.changedMaterialInfo,
			success: !0
		};
	}
	async SetChangedMaterialInfo(n) {
		return await this.Update({ changedMaterialInfo: n });
	}
	async GetbReceivesDecals() {
		return {
			message: "",
			result: this.MaterialAtom.bReceivesDecals,
			success: !0
		};
	}
	async SetbReceivesDecals(n) {
		return await this.Update({ bReceivesDecals: n });
	}
	/**
	* Retrieves material information based on changed material IDs.
	* Returns an array of material objects if successful, otherwise returns an error message.
	* @returns {Promise<ResultType>} Promise containing material data or an error message.
	*/
	async GetMaterial() {
		var s, a, u;
		if (this.MaterialAtom.changedMaterialInfo.length <= 0) return {
			message: "material is empty",
			success: !1
		};
		const n = [];
		for (let d = 0; d < this.MaterialAtom.changedMaterialInfo.length; d++) {
			const h = await ((u = (a = (s = this.obj) == null ? void 0 : s.DataModel) == null ? void 0 : a.Material) == null ? void 0 : u.Get(this.MaterialAtom.changedMaterialInfo[d].mIEid));
			h.success && n.push(h.result.object);
		}
		return this.material = n, {
			message: "",
			result: this.material,
			success: !0
		};
	}
	handleLockedAtom(n, s) {
		const a = Object.keys(s);
		for (const u of a) u === "bLocked" && (n.bLocked = s[u]);
	}
	handleEntityOutlinerAtom(n, s) {
		const a = Object.keys(s);
		for (const u of a) u === "index" && (n.index = s[u]);
	}
};
var qa = class extends Fe {
	constructor() {
		super(...arguments);
		se(this, "DCPNodeStateAtom", {
			hideNodes: [],
			visibleNodes: [],
			rootId: null
		});
	}
	get rootNodeId() {
		return this.DCPNodeStateAtom.rootId;
	}
	set rootNodeId(n) {
		this.DCPNodeStateAtom.rootId = n;
	}
	get hideNodeIds() {
		return this.DCPNodeStateAtom.hideNodes;
	}
	set hideNodeIds(n) {
		this.DCPNodeStateAtom.hideNodes = n;
	}
	setNodeStateData(n) {
		this.handleNodeStateAtom(this.DCPNodeStateAtom, n);
	}
	handleNodeStateAtom(n, s) {
		const a = (s == null ? void 0 : s.DCPNodeStateAtom) ?? s, u = Object.keys(a);
		for (const d of u) d === "hideNodes" && (n.hideNodes = a[d]), d === "visibleNodes" && (n.visibleNodes = a[d]);
	}
	async SetNodeFocus(n, s) {
		return H(n) ? {
			message: "NodeId is empty",
			success: !1
		} : this.BimSendData(async () => {
			const a = We({
				eid: this.eid,
				nodeId: `${n}`,
				cameraParams: {
					distanceFactor: .8,
					flyTime: 0,
					rotation: {
						pitch: -30,
						yaw: 0
					}
				}
			}, { cameraParams: s == null ? void 0 : s.cameraParams });
			return await this.StartApi("DCPNodeAPIRegister", "DcpNodeFocus", a);
		});
	}
	async SetNodeVisibility(n, s = !0) {
		if (!this.obj) return {
			message: "Object is empty",
			success: !1
		};
		if (H(n)) return {
			message: "NodeId is empty",
			success: !1
		};
		const a = {
			hideNodes: this.DCPNodeStateAtom.hideNodes,
			visibleNodes: this.DCPNodeStateAtom.visibleNodes
		}, u = _n(n) ? n : [n];
		s ? (a.visibleNodes.push(...u), a.hideNodes = a.hideNodes.filter((h) => !a.visibleNodes.includes(h) && !a.visibleNodes.includes(`${h}`)), H(a.hideNodes) && (a.visibleNodes = [])) : (a.hideNodes.push(...u), a.visibleNodes = a.visibleNodes.filter((h) => !a.hideNodes.includes(h) && !a.hideNodes.includes(`${h}`)));
		const d = await this.BimUpdate({ DCPNodeStateAtom: a }, !1);
		return d.success && this.setNodeStateData(a), d;
	}
	async SetNodeShowAll() {
		if (!this.obj) return {
			message: "Object is empty",
			success: !1
		};
		const n = {
			hideNodes: [],
			visibleNodes: []
		}, s = await this.BimUpdate({ DCPNodeStateAtom: n }, !1);
		return s.success && this.setNodeStateData(n), s;
	}
	async SetOtherNodesVisibility(n, s = !0) {
		if (!this.obj) return {
			message: "Object is empty",
			success: !1
		};
		if (H(n)) return {
			message: "NodeId is empty",
			success: !1
		};
		if (!this.rootNodeId) {
			const { success: d, result: h } = await this.GetNodeRoot();
			if (!d) return {
				success: !1,
				message: "Root nodeId is empty"
			};
			this.rootNodeId = h.nodeId;
		}
		const a = {
			hideNodes: [],
			visibleNodes: []
		};
		s ? (a.hideNodes = [`${this.rootNodeId}`], a.visibleNodes = _n(n) ? n : [n]) : (a.hideNodes = [], a.visibleNodes = []);
		const u = await this.BimUpdate({ DCPNodeStateAtom: a }, !1);
		return u.success && this.setNodeStateData(a), u;
	}
	async GetNodeTransform(n, s = "center") {
		var a;
		return H(n) ? {
			message: "NodeId is empty",
			success: !1
		} : await this.StartApi("DCPNodeAPIRegister", "DcpGetNodeTransform", {
			eid: (a = this.model) == null ? void 0 : a.eid,
			nodeId: `${n}`,
			coordType: s
		});
	}
	async GetNodeLocation(n, s = "center") {
		return H(n) ? {
			message: "NodeId is empty",
			success: !1
		} : this.BimSendData(async () => {
			var u;
			const a = await this.GetNodeTransform(n, s);
			return a.success && (a.result = (u = a == null ? void 0 : a.result) == null ? void 0 : u.location), a;
		});
	}
	async GetNodeCoord({ nodeId: n, coordType: s = "center" }) {
		return await this.GetNodeLocation(n, s);
	}
	async SetNodeHighLight(n, s = !0, a = !0, u) {
		return H(n) ? {
			message: "NodeId is empty",
			success: !1
		} : this.BimSendData(async () => {
			var h, b, y, P, D;
			let d = {
				eid: this.eid,
				exclusion: a,
				hightlight: s,
				nodeId: `${n}`
			};
			return u !== void 0 && (d = We(d, {
				hitKeys: ["highLightStyle"],
				highLightStyle: {
					color: u != null && u.color ? u.color.replace("#", "") : "000000",
					opacity: (u == null ? void 0 : u.opacity) ?? .5,
					opacityScale: .1,
					bCanBeOccluded: (u == null ? void 0 : u.bCanBeOccluded) ?? !1,
					outlineStyle: {
						bOutline: ((h = u == null ? void 0 : u.outlineStyle) == null ? void 0 : h.bOutline) ?? !1,
						color: (b = u == null ? void 0 : u.outlineStyle) != null && b.color ? u.outlineStyle.color.replace("#", "") : "021000",
						lineWidth: ((y = u == null ? void 0 : u.outlineStyle) == null ? void 0 : y.lineWidth) ?? .5,
						brightness: ((P = u == null ? void 0 : u.outlineStyle) == null ? void 0 : P.brightness) ?? 10,
						mode: ((D = u == null ? void 0 : u.outlineStyle) == null ? void 0 : D.mode) ?? "Flowing"
					}
				}
			})), await this.StartApi("DCPNodeAPIRegister", "DcpSetNodeHighlight", d);
		});
	}
	async ClearNodeHighlight() {
		return this.BimSendData(async () => await this.StartApi("DCPNodeAPIRegister", "DcpClearNodeHighlight", { eid: this.eid }));
	}
	async SetNodeDefaultHighLightStyle(n, s) {
		return this.obj ? this.obj.DCP.SetNodeDefaultHighLightStyle(n, s) : {
			message: "Object is empty",
			success: !1
		};
	}
	async GetNodeDefaultHighLightStyle() {
		return this.obj ? this.obj.DCP.GetNodeDefaultHighLightStyle() : {
			message: "Object is empty",
			success: !1
		};
	}
	async SetNodeIsolate(n) {
		return this.BimSendData(async () => await this.StartApi("DCPNodeAPIRegister", "DcpNodeIsolate", {
			eid: this.eid,
			nodeId: `${n}`
		}));
	}
	async SetRoomHighLight(n) {
		var u, d, h, b;
		let s = (n == null ? void 0 : n.roomIds) ?? [];
		if (H(s)) return {
			message: "roomIds is empty",
			success: !1
		};
		const a = {
			eid: this.eid,
			roomIds: s,
			isVisible: (n == null ? void 0 : n.bVisible) ?? !0,
			color: ((d = (u = n == null ? void 0 : n.colorStyle) == null ? void 0 : u.color) == null ? void 0 : d.replace("#", "")) ?? "00ffff",
			opacity: ((h = n == null ? void 0 : n.colorStyle) == null ? void 0 : h.opacity) ?? .5,
			bCanBeOccluded: ((b = n == null ? void 0 : n.colorStyle) == null ? void 0 : b.bCanBeOccluded) ?? !1
		};
		return this.BimSendData(async () => await this.StartApi("DCPNodeAPIRegister", "DcpRoomHighlight", a));
	}
	async SetRoomFocus(n) {
		var u, d;
		let s = (n == null ? void 0 : n.roomIds) ?? [];
		if (H(s)) return {
			message: "roomIds is empty",
			success: !1
		};
		const a = {
			eid: this.eid,
			roomIds: s,
			cameraParams: {
				distanceFactor: (n == null ? void 0 : n.distanceFactor) ?? .8,
				flyTime: (n == null ? void 0 : n.flyTime) ?? 1,
				rotation: {
					pitch: ((u = n == null ? void 0 : n.rotation) == null ? void 0 : u.pitch) ?? -30,
					yaw: ((d = n == null ? void 0 : n.rotation) == null ? void 0 : d.yaw) ?? 0
				}
			}
		};
		return this.BimSendData(async () => await this.StartApi("DCPNodeAPIRegister", "DcpRoomFocus", a));
	}
	async SetNodeLocation(n, s) {
		const a = {
			eid: this.eid,
			nodeId: `${n}`,
			location: s
		};
		return this.BimSendData(async () => await this.StartApi("DCPNodeAPIRegister", "DcpSetNodeLocation", a));
	}
};
var Ua = class extends Fe {
	constructor() {
		super(...arguments);
		se(this, "DCPMaterialEditorAtom", { nodeIdToMaterial: {} });
	}
	setNodeMaterialData(n) {
		this.handleNodeMaterialAtom(this.DCPMaterialEditorAtom, n);
	}
	handleNodeMaterialAtom(n, s) {
		const a = (s == null ? void 0 : s.DCPMaterialEditorAtom) ?? s, u = Object.keys(a);
		for (const d of u) d === "nodeIdToMaterial" && (n.nodeIdToMaterial = a[d]);
	}
};
var Ha = class extends ut {
	constructor() {
		super(...arguments);
		se(this, "NodeLevelAtom", {
			click: -1,
			mouseOut: -1,
			mouseEnter: -1
		});
		se(this, "NodeClickEventAtom", {
			highlight: !1,
			bVisible: !1
		});
	}
	async SetDefaultEvent(n = !0) {
		let s;
		return n ? (await this.SetGizmo(!0), s = await this.obj.Setting.SetDefaultActionSetting({ selectionMode: "New" })) : s = await this.obj.Setting.SetMode("Runtime"), s;
	}
	async SetGizmo(n = !0) {
		return this.obj ? await this.obj.Setting.SetGizmoSetting({
			gizmoState: n ? "Enable" : "Disable",
			gizmoCoordinateSystem: "World"
		}) : {
			message: "Object is empty",
			success: !1
		};
	}
	async SetNodeClickEnable(n) {
		return this.obj ? await this.obj.System.ToggleAPIEventChannel([{
			eventName: "OnComponentClicked",
			bOpen: n
		}]) : {
			message: "Object is empty",
			success: !1
		};
	}
	async SetNodeClickEvent(n = !0, s = !1) {
		if (!this.obj) return {
			message: "Object is empty",
			success: !1
		};
		const a = n || s;
		return this.NodeClickEventAtom.highlight = n, this.NodeClickEventAtom.bVisible = s, await this.SetNodeClickEnable(a);
	}
	async SetNodeLevel(n) {
		return Object.assign(this.NodeLevelAtom, n), {
			success: !0,
			result: "OK"
		};
	}
	async ClearNodeHighlight() {
		return this.obj ? await this.StartApi("DCPNodeAPIRegister", "DcpClearNodeHighlight") : {
			message: "Object is empty",
			success: !1
		};
	}
	async handleBuildingRollbackEvent({ result: n }) {
		var u, d;
		this.handleLogger().warn("rollback", n);
		const s = (n == null ? void 0 : n.buildingStates) ?? [];
		if (s.length === 0) return;
		const a = await this.obj.Scene.Model.Hierarchy.Get();
		if (a != null && a.result) for (const h of a.result) {
			if (!((u = h == null ? void 0 : h.object) != null && u.eid)) continue;
			const b = s.find((y) => {
				var P;
				return (y == null ? void 0 : y.eid) === ((P = h == null ? void 0 : h.object) == null ? void 0 : P.eid);
			});
			b && ((d = h.object) == null || d.setBuildLayerData({ isEnabled: (b == null ? void 0 : b.isBreak) ?? !1 }));
		}
	}
	async handleNodeClickEvent({ result: n }, s, a) {
		var b, y, P, D;
		const { eid: u, nodeid: d } = n;
		if (!u || !d) {
			this.handleEventResponse(a, {
				result: n,
				success: !1,
				message: "Eid is non-existent"
			});
			return;
		}
		const h = await this.obj.Scene.Model.Hierarchy.Get();
		if (h != null && h.result) {
			for (const M of h.result) if (((b = M == null ? void 0 : M.object) == null ? void 0 : b.eid) === u) {
				const z = {
					object: M.object,
					nodeId: d
				};
				if (await this.resetDcpNodeEventNodeLevel("click", z, d), this.NodeClickEventAtom.highlight ? await ((y = z.object) == null ? void 0 : y.SetNodeHighLight(z.nodeId, !0, !0)) : this.NodeClickEventAtom.bVisible && await ((P = z.object) == null ? void 0 : P.SetNodeVisibility(z.nodeId, !1)), s) {
					const B = await ((D = z.object) == null ? void 0 : D.GetNodeLocation(z.nodeId));
					B.success && B != null && B.result && (z.position = B.result);
				}
				this.handleEventResponse(a, {
					result: z,
					success: !0
				});
				break;
			}
		}
	}
	async handleNodeHoverEvent({ event_name: n, result: s }, a) {
		var b;
		const { eid: u, nodeid: d } = s;
		if (!u || !d) {
			this.handleEventResponse(a, {
				result: s,
				success: !1,
				message: "Eid is non-existent"
			});
			return;
		}
		const h = await this.obj.Scene.Model.Hierarchy.Get();
		if (h != null && h.result) {
			for (const y of h.result) if (((b = y == null ? void 0 : y.object) == null ? void 0 : b.eid) === u) {
				const P = {
					object: y.object,
					nodeId: d
				};
				n === "OnMouseEnterComponent" ? await this.resetDcpNodeEventNodeLevel("mouseEnter", P, d) : n === "OnMouseOutComponent" && await this.resetDcpNodeEventNodeLevel("mouseOut", P, d), this.handleEventResponse(a, {
					result: P,
					success: !0
				});
				break;
			}
		}
	}
	async resetDcpNodeEventNodeLevel(n, s, a) {
		var d;
		const u = await s.object.GetNodeParentId(a);
		u.success && (s.nodeIds = u.result, s.nodeIds.push(a)), Number(this.NodeLevelAtom[n]) > 0 && (s.nodeId = ((d = s == null ? void 0 : s.nodeIds) == null ? void 0 : d[this.NodeLevelAtom[n] - 1]) ?? a);
	}
};
var za = class {
	static extendsCore(r, n) {
		return class extends Ut(r, ut, Ha) {
			constructor(u) {
				var d;
				super(u);
				se(this, "VersionAtom", {
					build: 1769736952226,
					isReady: !1,
					sdkVersion: "2.1.1"
				});
				se(this, "savedEid", null);
				se(this, "DaaS", {
					token: "token",
					type: "localStorage"
				});
				se(this, "handleCheckVersion", async () => {
					var u, d;
					if (!this.isReady) {
						const { success: h, result: b } = await this.obj.Renderer.GetStats();
						if (!h || !b || this.isReady) return;
						const y = await this.StartApi("DCPInitAPIRegister", "DcpIsReady");
						y.success && (this.handleLogger().lowLevel("BIM isReady Check", y == null ? void 0 : y.result), this.VersionAtom.isReady = (u = y == null ? void 0 : y.result) == null ? void 0 : u.already, this.VersionAtom.apiVersion = (d = y == null ? void 0 : y.result) == null ? void 0 : d.apiVersion, await this.initSubmodule());
					}
				});
				this.obj = u, (d = u == null ? void 0 : u.Renderer) == null || d.RegisterSceneEvents([
					{
						name: "DcpAlreadyEvent_private_BIM",
						func: async ({ result: h }) => {
							this.handleLogger().lowLevel("BIM isReady Event", h), h != null && h.already && (this.VersionAtom.isReady = h.already, this.VersionAtom.apiVersion = h.apiVersion, this.savedEid = h == null ? void 0 : h.saveEntityEid, await this.initSubmodule());
						},
						sync: !0
					},
					{
						func: async ({ result: h, success: b }, y) => {
							(h == null ? void 0 : h.progress) === 100 && await this.handleCheckVersion(), this.handleEventResponse(y, {
								result: h,
								success: b
							});
						},
						name: "OnWdpSceneIsReady_private_BIM",
						sync: !0
					},
					{
						func: async ({ result: h }) => {
							const b = await this.obj.Scene.Model.Hierarchy.Get();
							if (b != null && b.result) for (const y of b.result) y != null && y.object && (y.object.eid === h.eid ? y.object.setActiveData({ isActive: h.active }) : y.object.setActiveData({ isActive: !1 }));
						},
						name: "DcpModelActiveForUpdate_private_BIM",
						sync: !0
					},
					{
						func: (h) => this.handleBuildingRollbackEvent(h),
						name: "DcpBuildingStateChanges_private_BIM",
						sync: !0
					},
					{
						func: (h, b) => this.handleNodeClickEvent(h, !0, b),
						name: "OnComponentClicked_private_BIM",
						sync: !0
					},
					{
						func: (h, b) => this.handleNodeClickEvent(h, !1, b),
						name: "OnNodeClicked_private_BIM",
						sync: !0
					},
					{
						func: (h, b) => this.handleNodeHoverEvent(h, b),
						name: "OnMouseEnterComponent_private_BIM",
						sync: !0
					},
					{
						func: (h, b) => this.handleNodeHoverEvent(h, b),
						name: "OnMouseOutComponent_private_BIM",
						sync: !0
					}
				]), this.handleCheckVersion();
			}
			get IsReady() {
				return this.VersionAtom.isReady;
			}
			get isReady() {
				return this.VersionAtom.isReady;
			}
			get sdkVersion() {
				return this.VersionAtom.sdkVersion;
			}
			get apiVersion() {
				var u;
				return ((u = this.VersionAtom) == null ? void 0 : u.apiVersion) ?? null;
			}
			async GetVersion() {
				return {
					result: this.VersionAtom,
					success: !0
				};
			}
			async GetModelList(u, d) {
				if (!this.obj) return {
					message: "Object is empty",
					success: !1
				};
				const { fetchAll: h, pageNumber: b, pageSize: y } = d ?? {}, P = await this.handleDaaSApi().GetModelList({
					assetName: u,
					fetchAll: wt(h, !0),
					pageNumber: b,
					pageSize: y,
					apiVersion: "2.1.1"
				});
				return this.handleLogger().highLevel("GetModelList", P), P;
			}
			async GetAssetList(u, d) {
				if (!this.obj) return {
					message: "Object is empty",
					success: !1
				};
				const { fetchAll: h, pageNumber: b, pageSize: y } = d ?? {}, P = await this.handleDaaSApi().GetAssetList({
					assetName: u,
					fetchAll: wt(h, !0),
					pageNumber: b,
					pageSize: y,
					apiVersion: "2.1.1"
				});
				return this.handleLogger().highLevel("GetAssetList", P), P;
			}
			async GetOfflineList() {
				const { result: u, success: d, message: h } = await this.obj.Scene.GetByTypes(["Hierarchy"]);
				if (!d) return {
					success: d,
					message: h
				};
				const b = [];
				return u != null && u.Hierarchy && b.push(...u.Hierarchy), this.handleLogger().highLevel("GetOfflineList", b), {
					success: !0,
					result: b
				};
			}
			async SetNodeDefaultHighLightStyle(u, d) {
				var h;
				return await ((h = this.handleSaveEntity()) == null ? void 0 : h.SetNodeHighlightStyle(u, d));
			}
			async GetNodeDefaultHighLightStyle() {
				var u;
				return await ((u = this.handleSaveEntity()) == null ? void 0 : u.GetNodeHighlightStyle());
			}
			async GetModelsByMetadata(u) {
				var D;
				const d = await this.GetOfflineList();
				if (!d.success && ((D = d == null ? void 0 : d.result) == null ? void 0 : D.length) < 1) return {
					success: !1,
					message: "Not found model"
				};
				const h = [];
				for (const M of d.result) h.push({
					seedId: M.seedId,
					version: "0.0.1",
					stageProduct: ""
				});
				const b = await this.handleDaaSApi().GetModelsByMetadata({
					properties: u,
					seedIds: h
				});
				if (!b.success || H(b == null ? void 0 : b.result)) return b;
				const y = b.result.map((M) => M.seedId), P = [];
				for (const M of d.result) y.includes(M.seedId) && P.push({ object: M });
				return {
					success: !0,
					result: P
				};
			}
			async GetNodesByProperties(u, d) {
				var z, B, V, U;
				const h = await this.GetOfflineList();
				if (!h.success && ((z = h == null ? void 0 : h.result) == null ? void 0 : z.length) < 1) return {
					success: !1,
					message: "Not found model"
				};
				const b = [];
				for (const te of h.result) b.push({
					seedId: te.seedId,
					version: "0.0.1",
					stageProduct: ""
				});
				const y = {
					seedIds: b,
					properties: u
				};
				d != null && d.type && (y.type = d.type), d != null && d.disableDetails && (y.disableDetails = d.disableDetails);
				const P = await this.handleDaaSApi().GetNodesByProperties(y);
				if (!P.success || H(P == null ? void 0 : P.result)) return P;
				const D = /* @__PURE__ */ new Map();
				for (const te of P.result) {
					const ae = {
						nodeId: te.nodeId,
						assetId: te.assetId,
						details: te.details || null
					};
					D.set(te.seedId, ae);
				}
				const M = [];
				for (const te of h.result) D.has(te.seedId) && M.push({
					object: te,
					assetId: (B = D.get(te.seedId)) == null ? void 0 : B.assetId,
					nodeIds: (V = D.get(te.seedId)) == null ? void 0 : V.nodeId,
					details: (U = D.get(te.seedId)) == null ? void 0 : U.details
				});
				return {
					success: !0,
					result: M
				};
			}
			async GetByProperties(u, d) {
				const { success: h, result: b, message: y } = await this.GetNodesByProperties(u, d);
				if (h) {
					const P = [];
					for (const D of b) (d == null ? void 0 : d.type) === "space" ? P.push({
						object: D.object,
						roomIds: D.nodeIds,
						assetId: D.assetId,
						details: D.details
					}) : P.push({
						object: D.object,
						nodeIds: D.nodeIds,
						assetId: D.assetId,
						details: D.details
					});
					return {
						success: !0,
						result: P
					};
				}
				return {
					success: h,
					result: b,
					message: y
				};
			}
			SetToken(u) {
				this.DaaS.token = u;
			}
			SetType(u) {
				this.DaaS.type = u;
			}
			SetProxy(u) {
				var d;
				this.DaaS.proxy = H(u) ? (d = this.obj) == null ? void 0 : d.url : u;
			}
			async initSubmodule() {
				var y, P, D, M;
				if (!this.savedEid) {
					const z = await this.obj.Scene.GetByTypes(["DcpSave"]);
					this.savedEid = (M = (D = (P = (y = z == null ? void 0 : z.result) == null ? void 0 : y.entityTypeToEids) == null ? void 0 : P.DCPSaveEntity) == null ? void 0 : D.eids) == null ? void 0 : M[0];
				}
				if (H(this.savedEid)) return {
					success: !1,
					message: "BIM global eid is empty, please restart Scene"
				};
				const u = await this.RequestEntity.GetEntitiesData([`${this.savedEid}`]);
				if (!u.success) return {
					success: !1,
					message: "Eid is non-existent"
				};
				const d = new this.DcpSave.ObjectClass({
					eid: this.savedEid,
					...u.result.entitiesData[0]
				});
				this.DcpSave.addToMap(`${this.savedEid}`, { object: d }), d.setObj(this.obj);
				const { success: h, result: b } = await d.GetNodeHighlightStyle();
				(!h || !b.color) && await d.SetNodeHighlightStyle("00FFFF");
			}
			handleSaveEntity() {
				var d, h;
				const u = (d = Array.from(this.DcpSave.objectMap.keys())) == null ? void 0 : d[0];
				return H(u) ? null : (h = this.DcpSave.objectMap.get(u)) == null ? void 0 : h.object;
			}
		};
	}
};
var $a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: za
}, Symbol.toStringTag, { value: "Module" }));
var li = class {
	static extendsCore(r) {
		return class extends Ut(r, ut, Fe) {
			constructor(a) {
				super();
				se(this, "DCPEffectAtom", {
					bimHighlightStyle: {
						color: null,
						opacity: 0,
						opacityScale: .1,
						bCanBeOccluded: !1
					},
					dCPEffectSettingNames: {}
				});
				se(this, "DCPCommonAtom", {
					openNodeResponse: !1,
					openNodeHover: !1
				});
				se(this, "DCPTilesAtom", { cesiumFileMap: {} });
				se(this, "DCPAssetAtom", { idToAssetInfo: {} });
				this.oType = "DcpSave", this.type = "DCPSaveEntity", this.setObjAtom(this), a && (this.SetData(a), this.addNewScheme = {
					EntityType: this.type,
					...this.generateAtomData(a)
				});
			}
			GetData() {
				return {
					...super.GetData(),
					...this.DCPEffectAtom,
					...this.DCPCommonAtom,
					...this.DCPTilesAtom,
					...this.DCPAssetAtom
				};
			}
			SetData(a) {
				this.setEid(a), this.setDcpEffectData(a), this.setDcpCommonData(a), this.setDcpTilesData(a), this.setDcpAssetData(a);
			}
			generateAtomData(a) {
				const u = {}, d = {};
				this.handleDcpEffectAtom(d, a), H(d) || (u.DCPEffectAtom = d);
				const h = {};
				this.handleDcpCommonAtom(h, a), H(h) || (u.DCPCommonAtom = h);
				const b = {};
				this.handleDcpTilesAtom(b, a), H(b) || (u.DCPTilesAtom = b);
				const y = {};
				return this.handleDcpAssetAtom(y, a), H(y) || (u.DCPAssetAtom = y), u;
			}
			setDcpEffectData(a) {
				this.handleDcpEffectAtom(this.DCPEffectAtom, a);
			}
			setDcpCommonData(a) {
				this.handleDcpCommonAtom(this.DCPCommonAtom, a);
			}
			setDcpTilesData(a) {
				this.handleDcpTilesAtom(this.DCPTilesAtom, a);
			}
			setDcpAssetData(a) {
				this.handleDcpAssetAtom(this.DCPAssetAtom, a);
			}
			handleDcpEffectAtom(a, u) {
				const d = (u == null ? void 0 : u.DCPEffectAtom) ?? (u == null ? void 0 : u.effect) ?? u, h = Object.keys(d);
				for (const b of h) b === "dCPEffectSettingNames" && (a.dCPEffectSettingNames = d[b]), b === "bimHighlightStyle" && (a.bimHighlightStyle = d[b]);
			}
			handleDcpCommonAtom(a, u) {
				const d = (u == null ? void 0 : u.DCPCommonAtom) ?? (u == null ? void 0 : u.common) ?? u, h = Object.keys(d);
				for (const b of h) b === "openNodeResponse" && (a.openNodeResponse = d[b]), b === "openNodeHover" && (a.openNodeHover = d[b]);
			}
			handleDcpTilesAtom(a, u) {
				const d = (u == null ? void 0 : u.DCPTilesAtom) ?? (u == null ? void 0 : u.tiles) ?? u, h = Object.keys(d);
				for (const b of h) b === "cesiumFileMap" && (a.cesiumFileMap = d[b]);
			}
			handleDcpAssetAtom(a, u) {
				const d = (u == null ? void 0 : u.DCPAssetAtom) ?? (u == null ? void 0 : u.asset) ?? u, h = Object.keys(d);
				for (const b of h) b === "idToAssetInfo" && (a.idToAssetInfo = d[b]);
			}
			async SetNodeHighlightStyle(a, u) {
				if (!this.obj) return {
					message: "Object is empty",
					success: !1
				};
				if (!this.eid) return {
					message: "Eid is non-existent",
					success: !1
				};
				const d = { effect: { bimHighlightStyle: {
					color: a.replace("#", ""),
					opacity: (u == null ? void 0 : u.opacity) ?? .5,
					opacityScale: .1,
					bCanBeOccluded: (u == null ? void 0 : u.bCanBeOccluded) ?? !1
				} } };
				return await this.BimUpdate(d, !1, !0);
			}
			async GetNodeHighlightStyle() {
				return this.obj ? this.eid ? {
					success: !0,
					result: this.DCPEffectAtom.bimHighlightStyle
				} : {
					message: "Eid is non-existent",
					success: !1
				} : {
					message: "Object is empty",
					success: !1
				};
			}
		};
	}
};
var Va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: li
}, Symbol.toStringTag, { value: "Module" }));
var Wa = class {
	static extendsCore(r, n) {
		return class extends Ut(r, ut) {
			constructor(a) {
				super(a, li.extendsCore(n)), this.obj = a, this.setType("DCPSaveEntity");
			}
		};
	}
};
var Ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: Wa
}, Symbol.toStringTag, { value: "Module" }));
var di = class {
	static extendsCore(r) {
		return class extends Ut(r, ut, Fe, La, Ma, Ka, Fa, Ga, qa, Ua) {
			constructor(s) {
				super(), this.oType = "Hierarchy", this.type = "HierarchyMeshEntity", this.setObjAtom(this), s && (this.SetData(s), this.addNewScheme = {
					EntityType: this.type,
					...this.generateAtomData(s)
				});
			}
			SetData(s) {
				this.setEid(s), this.setTransformData(s), this.setAssetData(s), this.setBasicData(s), this.setVisibleData(s), this.setGraphicsData(s), this.setActiveData(s), this.setBuildLayerData(s), this.setNodeStateData(s), this.setNodeMaterialData(s), s.changedMaterialInfo !== void 0 && (this.MaterialAtom.changedMaterialInfo = s.changedMaterialInfo), s.bReceivesDecals !== void 0 && (this.MaterialAtom.bReceivesDecals = s.bReceivesDecals);
			}
			GetData() {
				return {
					...super.GetData(),
					...this.AssetAtom,
					...this.MaterialAtom,
					...this.ActiveAtom,
					...this.GraphicsAtom,
					DCPBuildingLayerAtom: this.DCPBuildingLayerAtom,
					DCPNodeStateAtom: this.DCPNodeStateAtom,
					DCPMaterialEditorAtom: this.DCPMaterialEditorAtom
				};
			}
			generateAtomData(s) {
				const a = {}, u = {};
				this.handleBasicAtom(u, s), H(u) || (a.BasicInfoAtom = u);
				const d = {};
				this.handleTransformAtom(d, s), H(d) || (a.TransformAtom = d);
				const h = {};
				this.handleVisibleAtom(h, s), H(h) || (a.VisibleAtom = h);
				const b = {};
				this.handleAssetAtom(b, s), H(b) || (a.AssetAtom = b);
				const y = {};
				s.changedMaterialInfo !== void 0 && (y.changedMaterialInfo = s.changedMaterialInfo), s.bReceivesDecals !== void 0 && (y.bReceivesDecals = s.bReceivesDecals), H(y) || (a.MaterialAtom = y);
				const P = {};
				this.handleGraphicsAtom(P, s), H(P) || (a.GraphicsAtom = P);
				const D = {};
				this.handleLockedAtom(D, s), H(D) || (a.EntityFlagAtom = D);
				const M = {};
				this.handleEntityOutlinerAtom(M, s), H(M) || (a.EntityOutlinerAtom = M);
				const z = {};
				this.handleBuildLayerAtom(z, s), H(z) || (a.DCPBuildingLayerAtom = z);
				const B = {};
				this.handleNodeMaterialAtom(B, s), H(B) || (a.DCPMaterialEditorAtom = B);
				const V = {};
				this.handleNodeStateAtom(V, s), H(V) || (a.DCPNodeStateAtom = V);
				const U = {};
				return this.handleActiveAtom(U, s), H(U) || (a.HierarchyMeshEntityAtom = U), a;
			}
			async Delete() {
				return !this.obj || !this.eid ? {
					message: "Object is empty",
					success: !1
				} : (this.isDisassembly && await this.SetDisassembly(), await super.Delete());
			}
		};
	}
};
var Xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: di
}, Symbol.toStringTag, { value: "Module" }));
var Ya = class {
	static extendsCore(r, n) {
		return class extends Ut(r, ut) {
			constructor(a) {
				super(a, di.extendsCore(n)), this.obj = a, this.setType("Hierarchy");
			}
			async Add(a, u) {
				var b, y, P, D;
				const d = { ...a.addNewScheme };
				let h = u;
				return (b = d == null ? void 0 : d.TransformAtom) != null && b.location || await ((D = (P = (y = this.obj) == null ? void 0 : y.CameraControl) == null ? void 0 : P.GetCameraInfo()) == null ? void 0 : D.then((M) => {
					var z;
					M.success && (z = M == null ? void 0 : M.result) != null && z.location && (M.result.location.splice(2, 1, 0), a.addNewScheme = We(d, { TransformAtom: { location: M.result.location } }), a.SetData({ location: M.result.location }), h = { calculateCoordZ: {
						coordZRef: "surface",
						coordZOffset: 0
					} }), this.handleLogger().highLevel("auto load camera info", M == null ? void 0 : M.result);
				})), this.handleLogger().highLevel("Hierarchy Add Prepare", a), await super.Add(a, h);
			}
		};
	}
};
var Qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: Ya
}, Symbol.toStringTag, { value: "Module" }));
//#endregion
export { gc as default };

//# sourceMappingURL=@wdp-api_bim-api.js.map
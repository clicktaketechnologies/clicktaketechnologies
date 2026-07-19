const RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "..";
const ASSET_PREFIX = "/";
/**
 * This file contains runtime types and functions that are shared between all
 * TurboPack ECMAScript runtimes.
 *
 * It will be prepended to the runtime code of each runtime.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-types.d.ts" />
const REEXPORTED_OBJECTS = new WeakMap();
/**
 * Constructs the `__turbopack_context__` object for a module.
 */ function Context(module, exports) {
    this.m = module;
    // We need to store this here instead of accessing it from the module object to:
    // 1. Make it available to factories directly, since we rewrite `this` to
    //    `__turbopack_context__.e` in CJS modules.
    // 2. Support async modules which rewrite `module.exports` to a promise, so we
    //    can still access the original exports object from functions like
    //    `esmExport`
    // Ideally we could find a new approach for async modules and drop this property altogether.
    this.e = exports;
}
const contextPrototype = Context.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
}
function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
        // This is invoked when a module is merged into another module, thus it wasn't invoked via
        // instantiateModule and the cache entry wasn't created yet.
        module = createModuleObject(id);
        moduleCache[id] = module;
    }
    return module;
}
/**
 * Creates the module object. Only done here to ensure all module objects have the same shape.
 */ function createModuleObject(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined
    };
}
const BindingTag_Value = 0;
/**
 * Adds the getters to the exports object.
 */ function esm(exports, bindings) {
    defineProp(exports, '__esModule', {
        value: true
    });
    if (toStringTag) defineProp(exports, toStringTag, {
        value: 'Module'
    });
    let i = 0;
    while(i < bindings.length){
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === 'number') {
            if (tagOrFunction === BindingTag_Value) {
                defineProp(exports, propName, {
                    value: bindings[i++],
                    enumerable: true,
                    writable: false
                });
            } else {
                throw new Error(`unexpected tag: ${tagOrFunction}`);
            }
        } else {
            const getterFn = tagOrFunction;
            if (typeof bindings[i] === 'function') {
                const setterFn = bindings[i++];
                defineProp(exports, propName, {
                    get: getterFn,
                    set: setterFn,
                    enumerable: true
                });
            } else {
                defineProp(exports, propName, {
                    get: getterFn,
                    enumerable: true
                });
            }
        }
    }
    Object.seal(exports);
}
/**
 * Makes the module an ESM with exports
 */ function esmExport(bindings, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings);
}
contextPrototype.s = esmExport;
function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module, reexportedObjects = []);
        module.exports = module.namespaceObject = new Proxy(exports, {
            get (target, prop) {
                if (hasOwnProperty.call(target, prop) || prop === 'default' || prop === '__esModule') {
                    return Reflect.get(target, prop);
                }
                for (const obj of reexportedObjects){
                    const value = Reflect.get(obj, prop);
                    if (value !== undefined) return value;
                }
                return undefined;
            },
            ownKeys (target) {
                const keys = Reflect.ownKeys(target);
                for (const obj of reexportedObjects){
                    for (const key of Reflect.ownKeys(obj)){
                        if (key !== 'default' && !keys.includes(key)) keys.push(key);
                    }
                }
                return keys;
            }
        });
    }
    return reexportedObjects;
}
/**
 * Dynamically exports properties from an object
 */ function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === 'object' && object !== null) {
        reexportedObjects.push(object);
    }
}
contextPrototype.j = dynamicExport;
function exportValue(value, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = value;
}
contextPrototype.v = exportValue;
function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
}
contextPrototype.n = exportNamespace;
function createGetter(obj, key) {
    return ()=>obj[key];
}
/**
 * @returns prototype of the object
 */ const getProto = Object.getPrototypeOf ? (obj)=>Object.getPrototypeOf(obj) : (obj)=>obj.__proto__;
/** Prototypes that are not expanded for exports */ const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto)
];
/**
 * @param raw
 * @param ns
 * @param allowExportDefault
 *   * `false`: will have the raw module as default export
 *   * `true`: will have the default property as default export
 */ function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for(let current = raw; (typeof current === 'object' || typeof current === 'function') && !LEAF_PROTOTYPES.includes(current); current = getProto(current)){
        for (const key of Object.getOwnPropertyNames(current)){
            bindings.push(key, createGetter(raw, key));
            if (defaultLocation === -1 && key === 'default') {
                defaultLocation = bindings.length - 1;
            }
        }
    }
    // this is not really correct
    // we should set the `default` getter if the imported module is a `.cjs file`
    if (!(allowExportDefault && defaultLocation >= 0)) {
        // Replace the binding with one for the namespace itself in order to preserve iteration order.
        if (defaultLocation >= 0) {
            // Replace the getter with the value
            bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
            bindings.push('default', BindingTag_Value, raw);
        }
    }
    esm(ns, bindings);
    return ns;
}
function createNS(raw) {
    if (typeof raw === 'function') {
        return function(...args) {
            return raw.apply(this, args);
        };
    } else {
        return Object.create(null);
    }
}
function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);
    // any ES module has to have `module.namespaceObject` defined.
    if (module.namespaceObject) return module.namespaceObject;
    // only ESM can be an async module, so we don't need to worry about exports being a promise here.
    const raw = module.exports;
    return module.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
}
contextPrototype.i = esmImport;
function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
}
contextPrototype.A = asyncLoader;
// Add a simple runtime require so that environments without one can still pass
// `typeof require` CommonJS checks so that exports are correctly registered.
const runtimeRequire = // @ts-ignore
typeof require === 'function' ? require : function require1() {
    throw new Error('Unexpected use of runtime require');
};
contextPrototype.t = runtimeRequire;
function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
}
contextPrototype.r = commonJsRequire;
/**
 * Remove fragments and query parameters since they are never part of the context map keys
 *
 * This matches how we parse patterns at resolving time.  Arguably we should only do this for
 * strings passed to `import` but the resolve does it for `import` and `require` and so we do
 * here as well.
 */ function parseRequest(request) {
    // Per the URI spec fragments can contain `?` characters, so we should trim it off first
    // https://datatracker.ietf.org/doc/html/rfc3986#section-3.5
    const hashIndex = request.indexOf('#');
    if (hashIndex !== -1) {
        request = request.substring(0, hashIndex);
    }
    const queryIndex = request.indexOf('?');
    if (queryIndex !== -1) {
        request = request.substring(0, queryIndex);
    }
    return request;
}
/**
 * `require.context` and require/import expression runtime.
 */ function moduleContext(map) {
    function moduleContext(id) {
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    }
    moduleContext.keys = ()=>{
        return Object.keys(map);
    };
    moduleContext.resolve = (id)=>{
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    };
    moduleContext.import = async (id)=>{
        return await moduleContext(id);
    };
    return moduleContext;
}
contextPrototype.f = moduleContext;
/**
 * Returns the path of a chunk defined by its data.
 */ function getChunkPath(chunkData) {
    return typeof chunkData === 'string' ? chunkData : chunkData.path;
}
function isPromise(maybePromise) {
    return maybePromise != null && typeof maybePromise === 'object' && 'then' in maybePromise && typeof maybePromise.then === 'function';
}
function isAsyncModuleExt(obj) {
    return turbopackQueues in obj;
}
function createPromise() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        reject = rej;
        resolve = res;
    });
    return {
        promise,
        resolve: resolve,
        reject: reject
    };
}
// Load the CompressedmoduleFactories of a chunk into the `moduleFactories` Map.
// The CompressedModuleFactories format is
// - 1 or more module ids
// - a module factory function
// So walking this is a little complex but the flat structure is also fast to
// traverse, we can use `typeof` operators to distinguish the two cases.
function installCompressedModuleFactories(chunkModules, offset, moduleFactories, newModuleId) {
    let i = offset;
    while(i < chunkModules.length){
        let moduleId = chunkModules[i];
        let end = i + 1;
        // Find our factory function
        while(end < chunkModules.length && typeof chunkModules[end] !== 'function'){
            end++;
        }
        if (end === chunkModules.length) {
            throw new Error('malformed chunk format, expected a factory function');
        }
        // Each chunk item has a 'primary id' and optional additional ids. If the primary id is already
        // present we know all the additional ids are also present, so we don't need to check.
        if (!moduleFactories.has(moduleId)) {
            const moduleFactoryFn = chunkModules[end];
            applyModuleFactoryName(moduleFactoryFn);
            newModuleId?.(moduleId);
            for(; i < end; i++){
                moduleId = chunkModules[i];
                moduleFactories.set(moduleId, moduleFactoryFn);
            }
        }
        i = end + 1; // end is pointing at the last factory advance to the next id or the end of the array.
    }
}
// everything below is adapted from webpack
// https://github.com/webpack/webpack/blob/6be4065ade1e252c1d8dcba4af0f43e32af1bdc1/lib/runtime/AsyncModuleRuntimeModule.js#L13
const turbopackQueues = Symbol('turbopack queues');
const turbopackExports = Symbol('turbopack exports');
const turbopackError = Symbol('turbopack error');
function resolveQueue(queue) {
    if (queue && queue.status !== 1) {
        queue.status = 1;
        queue.forEach((fn)=>fn.queueCount--);
        queue.forEach((fn)=>fn.queueCount-- ? fn.queueCount++ : fn());
    }
}
function wrapDeps(deps) {
    return deps.map((dep)=>{
        if (dep !== null && typeof dep === 'object') {
            if (isAsyncModuleExt(dep)) return dep;
            if (isPromise(dep)) {
                const queue = Object.assign([], {
                    status: 0
                });
                const obj = {
                    [turbopackExports]: {},
                    [turbopackQueues]: (fn)=>fn(queue)
                };
                dep.then((res)=>{
                    obj[turbopackExports] = res;
                    resolveQueue(queue);
                }, (err)=>{
                    obj[turbopackError] = err;
                    resolveQueue(queue);
                });
                return obj;
            }
        }
        return {
            [turbopackExports]: dep,
            [turbopackQueues]: ()=>{}
        };
    });
}
function asyncModule(body, hasAwait) {
    const module = this.m;
    const queue = hasAwait ? Object.assign([], {
        status: -1
    }) : undefined;
    const depQueues = new Set();
    const { resolve, reject, promise: rawPromise } = createPromise();
    const promise = Object.assign(rawPromise, {
        [turbopackExports]: module.exports,
        [turbopackQueues]: (fn)=>{
            queue && fn(queue);
            depQueues.forEach(fn);
            promise['catch'](()=>{});
        }
    });
    const attributes = {
        get () {
            return promise;
        },
        set (v) {
            // Calling `esmExport` leads to this.
            if (v !== promise) {
                promise[turbopackExports] = v;
            }
        }
    };
    Object.defineProperty(module, 'exports', attributes);
    Object.defineProperty(module, 'namespaceObject', attributes);
    function handleAsyncDependencies(deps) {
        const currentDeps = wrapDeps(deps);
        const getResult = ()=>currentDeps.map((d)=>{
                if (d[turbopackError]) throw d[turbopackError];
                return d[turbopackExports];
            });
        const { promise, resolve } = createPromise();
        const fn = Object.assign(()=>resolve(getResult), {
            queueCount: 0
        });
        function fnQueue(q) {
            if (q !== queue && !depQueues.has(q)) {
                depQueues.add(q);
                if (q && q.status === 0) {
                    fn.queueCount++;
                    q.push(fn);
                }
            }
        }
        currentDeps.map((dep)=>dep[turbopackQueues](fnQueue));
        return fn.queueCount ? promise : getResult();
    }
    function asyncResult(err) {
        if (err) {
            reject(promise[turbopackError] = err);
        } else {
            resolve(promise[turbopackExports]);
        }
        resolveQueue(queue);
    }
    body(handleAsyncDependencies, asyncResult);
    if (queue && queue.status === -1) {
        queue.status = 0;
    }
}
contextPrototype.a = asyncModule;
/**
 * A pseudo "fake" URL object to resolve to its relative path.
 *
 * When UrlRewriteBehavior is set to relative, calls to the `new URL()` will construct url without base using this
 * runtime function to generate context-agnostic urls between different rendering context, i.e ssr / client to avoid
 * hydration mismatch.
 *
 * This is based on webpack's existing implementation:
 * https://github.com/webpack/webpack/blob/87660921808566ef3b8796f8df61bd79fc026108/lib/runtime/RelativeUrlRuntimeModule.js
 */ const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, 'x:/');
    const values = {};
    for(const key in realUrl)values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, '');
    values.origin = values.protocol = '';
    values.toString = values.toJSON = (..._args)=>inputUrl;
    for(const key in values)Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
    });
};
relativeURL.prototype = URL.prototype;
contextPrototype.U = relativeURL;
/**
 * Utility function to ensure all variants of an enum are handled.
 */ function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
}
/**
 * A stub function to make `require` available but non-functional in ESM.
 */ function requireStub(_moduleId) {
    throw new Error('dynamic usage of require is not supported');
}
contextPrototype.z = requireStub;
// Make `globalThis` available to the module in a way that cannot be shadowed by a local variable.
contextPrototype.g = globalThis;
function applyModuleFactoryName(factory) {
    // Give the module factory a nice name to improve stack traces.
    Object.defineProperty(factory, 'name', {
        value: 'module evaluation'
    });
}
/// <reference path="../shared/runtime-utils.ts" />
/// A 'base' utilities to support runtime can have externals.
/// Currently this is for node.js / edge runtime both.
/// If a fn requires node.js specific behavior, it should be placed in `node-external-utils` instead.
async function externalImport(id) {
    let raw;
    try {
        switch (id) {
  case "next/dist/compiled/@vercel/og/index.node.js":
    raw = await import("next/dist/compiled/@vercel/og/index.edge.js");
    break;
  default:
    raw = await import(id);
};
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (raw && raw.__esModule && raw.default && 'default' in raw.default) {
        return interopEsm(raw.default, createNS(raw), true);
    }
    return raw;
}
contextPrototype.y = externalImport;
function externalRequire(id, thunk, esm = false) {
    let raw;
    try {
        raw = thunk();
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (!esm || raw.__esModule) {
        return raw;
    }
    return interopEsm(raw, createNS(raw), true);
}
externalRequire.resolve = (id, options)=>{
    return require.resolve(id, options);
};
contextPrototype.x = externalRequire;
/* eslint-disable @typescript-eslint/no-unused-vars */ const path = require('path');
const relativePathToRuntimeRoot = path.relative(RUNTIME_PUBLIC_PATH, '.');
// Compute the relative path to the `distDir`.
const relativePathToDistRoot = path.join(relativePathToRuntimeRoot, RELATIVE_ROOT_PATH);
const RUNTIME_ROOT = path.resolve(__filename, relativePathToRuntimeRoot);
// Compute the absolute path to the root, by stripping distDir from the absolute path to this file.
const ABSOLUTE_ROOT = path.resolve(__filename, relativePathToDistRoot);
/**
 * Returns an absolute path to the given module path.
 * Module path should be relative, either path to a file or a directory.
 *
 * This fn allows to calculate an absolute path for some global static values, such as
 * `__dirname` or `import.meta.url` that Turbopack will not embeds in compile time.
 * See ImportMetaBinding::code_generation for the usage.
 */ function resolveAbsolutePath(modulePath) {
    if (modulePath) {
        return path.join(ABSOLUTE_ROOT, modulePath);
    }
    return ABSOLUTE_ROOT;
}
Context.prototype.P = resolveAbsolutePath;
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
function readWebAssemblyAsResponse(path) {
    const { createReadStream } = require('fs');
    const { Readable } = require('stream');
    const stream = createReadStream(path);
    // @ts-ignore unfortunately there's a slight type mismatch with the stream.
    return new Response(Readable.toWeb(stream), {
        headers: {
            'content-type': 'application/wasm'
        }
    });
}
async function compileWebAssemblyFromPath(path) {
    const response = readWebAssemblyAsResponse(path);
    return await WebAssembly.compileStreaming(response);
}
async function instantiateWebAssemblyFromPath(path, importsObj) {
    const response = readWebAssemblyAsResponse(path);
    const { instance } = await WebAssembly.instantiateStreaming(response, importsObj);
    return instance.exports;
}
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
/// <reference path="../shared-node/base-externals-utils.ts" />
/// <reference path="../shared-node/node-externals-utils.ts" />
/// <reference path="../shared-node/node-wasm-utils.ts" />
var SourceType = /*#__PURE__*/ function(SourceType) {
    /**
   * The module was instantiated because it was included in an evaluated chunk's
   * runtime.
   * SourceData is a ChunkPath.
   */ SourceType[SourceType["Runtime"] = 0] = "Runtime";
    /**
   * The module was instantiated because a parent module imported it.
   * SourceData is a ModuleId.
   */ SourceType[SourceType["Parent"] = 1] = "Parent";
    return SourceType;
}(SourceType || {});
process.env.TURBOPACK = '1';
const nodeContextPrototype = Context.prototype;
const url = require('url');
const moduleFactories = new Map();
nodeContextPrototype.M = moduleFactories;
const moduleCache = Object.create(null);
nodeContextPrototype.c = moduleCache;
/**
 * Returns an absolute path to the given module's id.
 */ function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    const exportedPath = exported?.default ?? exported;
    if (typeof exportedPath !== 'string') {
        return exported;
    }
    const strippedAssetPrefix = exportedPath.slice(ASSET_PREFIX.length);
    const resolved = path.resolve(RUNTIME_ROOT, strippedAssetPrefix);
    return url.pathToFileURL(resolved).href;
}
nodeContextPrototype.R = resolvePathFromModule;
function loadRuntimeChunk(sourcePath, chunkData) {
    if (typeof chunkData === 'string') {
        loadRuntimeChunkPath(sourcePath, chunkData);
    } else {
        loadRuntimeChunkPath(sourcePath, chunkData.path);
    }
}
const loadedChunks = new Set();
const unsupportedLoadChunk = Promise.resolve(undefined);
const loadedChunk = Promise.resolve(undefined);
const chunkCache = new Map();
function clearChunkCache() {
    chunkCache.clear();
}
function loadRuntimeChunkPath(sourcePath, chunkPath) {
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return;
    }
    if (loadedChunks.has(chunkPath)) {
        return;
    }
    try {
        const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
        const chunkModules = requireChunk(chunkPath);
        installCompressedModuleFactories(chunkModules, 0, moduleFactories);
        loadedChunks.add(chunkPath);
    } catch (cause) {
        let errorMessage = `Failed to load chunk ${chunkPath}`;
        if (sourcePath) {
            errorMessage += ` from runtime for chunk ${sourcePath}`;
        }
        const error = new Error(errorMessage, {
            cause
        });
        error.name = 'ChunkLoadError';
        throw error;
    }
}
function loadChunkAsync(chunkData) {
    const chunkPath = typeof chunkData === 'string' ? chunkData : chunkData.path;
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return unsupportedLoadChunk;
    }
    let entry = chunkCache.get(chunkPath);
    if (entry === undefined) {
        try {
            // resolve to an absolute path to simplify `require` handling
            const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
            // TODO: consider switching to `import()` to enable concurrent chunk loading and async file io
            // However this is incompatible with hot reloading (since `import` doesn't use the require cache)
            const chunkModules = requireChunk(chunkPath);
            installCompressedModuleFactories(chunkModules, 0, moduleFactories);
            entry = loadedChunk;
        } catch (cause) {
            const errorMessage = `Failed to load chunk ${chunkPath} from module ${this.m.id}`;
            const error = new Error(errorMessage, {
                cause
            });
            error.name = 'ChunkLoadError';
            // Cache the failure promise, future requests will also get this same rejection
            entry = Promise.reject(error);
        }
        chunkCache.set(chunkPath, entry);
    }
    // TODO: Return an instrumented Promise that React can use instead of relying on referential equality.
    return entry;
}
contextPrototype.l = loadChunkAsync;
function loadChunkAsyncByUrl(chunkUrl) {
    const path1 = url.fileURLToPath(new URL(chunkUrl, RUNTIME_ROOT));
    return loadChunkAsync.call(this, path1);
}
contextPrototype.L = loadChunkAsyncByUrl;
async function loadWebAssembly(chunkPath, _edgeModule, imports) {
  const mod = await loadWasmChunk(chunkPath);
  const { exports } = await WebAssembly.instantiate(mod, imports);
  return exports;
}
contextPrototype.w = loadWebAssembly;
function loadWebAssemblyModule(chunkPath, _edgeModule) {
  return loadWasmChunk(chunkPath);
}
contextPrototype.u = loadWebAssemblyModule;
function getWorkerBlobURL(_chunks) {
    throw new Error('Worker blobs are not implemented yet for Node.js');
}
nodeContextPrototype.b = getWorkerBlobURL;
function instantiateModule(id, sourceType, sourceData) {
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== 'function') {
        // This can happen if modules incorrectly handle HMR disposes/updates,
        // e.g. when they keep a `setTimeout` around which still executes old code
        // and contains e.g. a `require("something")` call.
        let instantiationReason;
        switch(sourceType){
            case 0:
                instantiationReason = `as a runtime entry of chunk ${sourceData}`;
                break;
            case 1:
                instantiationReason = `because it was required from module ${sourceData}`;
                break;
            default:
                invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
        }
        throw new Error(`Module ${id} was instantiated ${instantiationReason}, but the module factory is not available.`);
    }
    const module1 = createModuleObject(id);
    const exports = module1.exports;
    moduleCache[id] = module1;
    const context = new Context(module1, exports);
    // NOTE(alexkirsz) This can fail when the module encounters a runtime error.
    try {
        moduleFactory(context, module1, exports);
    } catch (error) {
        module1.error = error;
        throw error;
    }
    module1.loaded = true;
    if (module1.namespaceObject && module1.exports !== module1.namespaceObject) {
        // in case of a circular dependency: cjs1 -> esm2 -> cjs1
        interopEsm(module1.exports, module1.namespaceObject);
    }
    return module1;
}
/**
 * Retrieves a module from the cache, or instantiate it if it is not cached.
 */ // @ts-ignore
function getOrInstantiateModuleFromParent(id, sourceModule) {
    const module1 = moduleCache[id];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateModule(id, 1, sourceModule.id);
}
/**
 * Instantiates a runtime module.
 */ function instantiateRuntimeModule(chunkPath, moduleId) {
    return instantiateModule(moduleId, 0, chunkPath);
}
/**
 * Retrieves a module from the cache, or instantiate it as a runtime module if it is not cached.
 */ // @ts-ignore TypeScript doesn't separate this module space from the browser runtime
function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module1 = moduleCache[moduleId];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateRuntimeModule(chunkPath, moduleId);
}
const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Checks if a given path/URL ends with .js, optionally followed by ?query or #fragment.
 */ function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
}
module.exports = (sourcePath)=>({
        m: (id)=>getOrInstantiateRuntimeModule(sourcePath, id),
        c: (chunkData)=>loadRuntimeChunk(sourcePath, chunkData)
    });


//# sourceMappingURL=%5Bturbopack%5D_runtime.js.map

  function requireChunk(chunkPath) {
    switch(chunkPath) {
      case "server/chunks/ssr/[root-of-the-server]__630a6869._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__630a6869._.js");
      case "server/chunks/ssr/[root-of-the-server]__8f68004d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__8f68004d._.js");
      case "server/chunks/ssr/[root-of-the-server]__a36c45d7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a36c45d7._.js");
      case "server/chunks/ssr/[root-of-the-server]__d61addef._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__d61addef._.js");
      case "server/chunks/ssr/[turbopack]_runtime.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js");
      case "server/chunks/ssr/_5f8a7a6c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_5f8a7a6c._.js");
      case "server/chunks/ssr/_f2eb383e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f2eb383e._.js");
      case "server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js");
      case "server/chunks/ssr/node_modules_@radix-ui_7d37248f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@radix-ui_7d37248f._.js");
      case "server/chunks/ssr/node_modules_a3500606._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_a3500606._.js");
      case "server/chunks/ssr/node_modules_ea845e5f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_ea845e5f._.js");
      case "server/chunks/ssr/node_modules_eee573be._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_eee573be._.js");
      case "server/chunks/ssr/node_modules_framer-motion_dist_es_render_components_motion_proxy_mjs_b72b0714._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_framer-motion_dist_es_render_components_motion_proxy_mjs_b72b0714._.js");
      case "server/chunks/ssr/node_modules_next_920e7746._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_920e7746._.js");
      case "server/chunks/ssr/node_modules_next_dist_174ae28d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_174ae28d._.js");
      case "server/chunks/ssr/node_modules_next_dist_2e5d1b2c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_2e5d1b2c._.js");
      case "server/chunks/ssr/node_modules_next_dist_4b9a0874._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_4b9a0874._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_2fffaa3a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_2fffaa3a._.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_036c91c3.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_036c91c3.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_eedfc1fd._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_eedfc1fd._.js");
      case "server/chunks/ssr/src_components_61494556._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_61494556._.js");
      case "server/chunks/ssr/src_lib_utils_ts_095f128f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_utils_ts_095f128f._.js");
      case "server/chunks/ssr/[root-of-the-server]__3f8add5b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__3f8add5b._.js");
      case "server/chunks/ssr/[root-of-the-server]__b9356576._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__b9356576._.js");
      case "server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js");
      case "server/chunks/ssr/node_modules_next_dist_08570d7f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_08570d7f._.js");
      case "server/chunks/ssr/[root-of-the-server]__2022e13e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2022e13e._.js");
      case "server/chunks/ssr/[root-of-the-server]__6a248ed7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__6a248ed7._.js");
      case "server/chunks/ssr/[root-of-the-server]__96c9a873._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__96c9a873._.js");
      case "server/chunks/ssr/[root-of-the-server]__eb9fe190._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__eb9fe190._.js");
      case "server/chunks/ssr/[root-of-the-server]__efd22fba._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__efd22fba._.js");
      case "server/chunks/ssr/_2258c3f4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_2258c3f4._.js");
      case "server/chunks/ssr/_434c8c4e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_434c8c4e._.js");
      case "server/chunks/ssr/_next-internal_server_app_about_page_actions_6fff35e4.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_about_page_actions_6fff35e4.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_ece394eb.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_ece394eb.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js");
      case "server/chunks/ssr/[root-of-the-server]__bd261f64._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__bd261f64._.js");
      case "server/chunks/ssr/[root-of-the-server]__e7a09c96._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e7a09c96._.js");
      case "server/chunks/ssr/_12a5f0ec._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_12a5f0ec._.js");
      case "server/chunks/ssr/_3e550043._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_3e550043._.js");
      case "server/chunks/ssr/_57f33439._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_57f33439._.js");
      case "server/chunks/ssr/_c43619f8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_c43619f8._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_cms_page_actions_09532ca9.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_cms_page_actions_09532ca9.js");
      case "server/chunks/ssr/node_modules_e39b87d7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_e39b87d7._.js");
      case "server/chunks/ssr/node_modules_next_dist_fb290741._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_fb290741._.js");
      case "server/chunks/ssr/node_modules_sonner_dist_index_mjs_1addfdea._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sonner_dist_index_mjs_1addfdea._.js");
      case "server/chunks/ssr/src_app_admin_layout_tsx_07d69fb5._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_layout_tsx_07d69fb5._.js");
      case "server/chunks/ssr/[root-of-the-server]__134f793f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__134f793f._.js");
      case "server/chunks/ssr/_31d37445._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_31d37445._.js");
      case "server/chunks/ssr/_c21a620b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_c21a620b._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_create-admin_page_actions_6481470c.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_create-admin_page_actions_6481470c.js");
      case "server/chunks/ssr/[root-of-the-server]__ac3295de._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__ac3295de._.js");
      case "server/chunks/ssr/_3042b9bf._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_3042b9bf._.js");
      case "server/chunks/ssr/_c9bb7c3a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_c9bb7c3a._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_crm_page_actions_c43f6227.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_crm_page_actions_c43f6227.js");
      case "server/chunks/ssr/[root-of-the-server]__044ae3dc._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__044ae3dc._.js");
      case "server/chunks/ssr/[root-of-the-server]__2075b379._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2075b379._.js");
      case "server/chunks/ssr/[root-of-the-server]__9d1d62c0._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__9d1d62c0._.js");
      case "server/chunks/ssr/[root-of-the-server]__be947d5a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__be947d5a._.js");
      case "server/chunks/ssr/[root-of-the-server]__e83df906._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e83df906._.js");
      case "server/chunks/ssr/[root-of-the-server]__f6244135._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__f6244135._.js");
      case "server/chunks/ssr/_02e1a474._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_02e1a474._.js");
      case "server/chunks/ssr/_6252056c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_6252056c._.js");
      case "server/chunks/ssr/_c3d20c4c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_c3d20c4c._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_email_page_actions_6b175953.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_email_page_actions_6b175953.js");
      case "server/chunks/ssr/node_modules_@aws-sdk_s3-request-presigner_dist-es_getSignedUrl_10ede675.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@aws-sdk_s3-request-presigner_dist-es_getSignedUrl_10ede675.js");
      case "server/chunks/ssr/node_modules_efb960bf._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_efb960bf._.js");
      case "server/chunks/ssr/src_app_admin_email_email-client_tsx_b232f3c7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_email_email-client_tsx_b232f3c7._.js");
      case "server/chunks/ssr/src_lib_providers_email_brevo_ts_73c84f3e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_brevo_ts_73c84f3e._.js");
      case "server/chunks/ssr/src_lib_providers_email_cloudflare-routing_ts_988a7593._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_cloudflare-routing_ts_988a7593._.js");
      case "server/chunks/ssr/src_lib_providers_email_elastic-email_ts_7838e3ce._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_elastic-email_ts_7838e3ce._.js");
      case "server/chunks/ssr/src_lib_providers_email_mailerlite_ts_567fc78b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_mailerlite_ts_567fc78b._.js");
      case "server/chunks/ssr/src_lib_providers_email_mailgun_ts_50ff4067._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_mailgun_ts_50ff4067._.js");
      case "server/chunks/ssr/src_lib_providers_email_mailjet_ts_053a0a9f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_mailjet_ts_053a0a9f._.js");
      case "server/chunks/ssr/src_lib_providers_email_mailtrap_ts_7e016489._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_mailtrap_ts_7e016489._.js");
      case "server/chunks/ssr/src_lib_providers_email_sender_ts_1e995099._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_sender_ts_1e995099._.js");
      case "server/chunks/ssr/src_lib_providers_email_zeptomail_ts_30f42871._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_email_zeptomail_ts_30f42871._.js");
      case "server/chunks/ssr/src_lib_providers_media_cloudflare_ts_8268f099._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_media_cloudflare_ts_8268f099._.js");
      case "server/chunks/ssr/src_lib_providers_media_imagekit_ts_15b1bb3b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_media_imagekit_ts_15b1bb3b._.js");
      case "server/chunks/ssr/src_lib_providers_media_twicpics_ts_2fec57f1._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_media_twicpics_ts_2fec57f1._.js");
      case "server/chunks/ssr/src_lib_providers_media_uploadcare_ts_33789567._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_media_uploadcare_ts_33789567._.js");
      case "server/chunks/ssr/src_lib_providers_storage_supabase_ts_7371f9ae._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_providers_storage_supabase_ts_7371f9ae._.js");
      case "server/chunks/ssr/[root-of-the-server]__ea154315._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__ea154315._.js");
      case "server/chunks/ssr/_9112f3c1._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_9112f3c1._.js");
      case "server/chunks/ssr/_e58428e4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_e58428e4._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_forgot-password_page_actions_90892c45.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_forgot-password_page_actions_90892c45.js");
      case "server/chunks/ssr/[root-of-the-server]__9d2c2976._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__9d2c2976._.js");
      case "server/chunks/ssr/_56938c19._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_56938c19._.js");
      case "server/chunks/ssr/_d45d8880._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_d45d8880._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_login_page_actions_0700d525.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_login_page_actions_0700d525.js");
      case "server/chunks/ssr/[root-of-the-server]__52e114cb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__52e114cb._.js");
      case "server/chunks/ssr/_46b9dca4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_46b9dca4._.js");
      case "server/chunks/ssr/_c2d1582f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_c2d1582f._.js");
      case "server/chunks/ssr/_d4e4e7a9._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_d4e4e7a9._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_page_actions_c7bd1b4f.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_page_actions_c7bd1b4f.js");
      case "server/chunks/ssr/[root-of-the-server]__544b7263._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__544b7263._.js");
      case "server/chunks/ssr/_5680cdb2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_5680cdb2._.js");
      case "server/chunks/ssr/_6af31e74._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_6af31e74._.js");
      case "server/chunks/ssr/_f02d36b4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f02d36b4._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_providers_page_actions_6bab0df2.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_providers_page_actions_6bab0df2.js");
      case "server/chunks/ssr/node_modules_next_dist_3bd4d890._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_3bd4d890._.js");
      case "server/chunks/ssr/src_app_admin_providers_providers-client_tsx_891b04f6._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_providers_providers-client_tsx_891b04f6._.js");
      case "server/chunks/ssr/[root-of-the-server]__e04b763b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e04b763b._.js");
      case "server/chunks/ssr/_710b5ab5._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_710b5ab5._.js");
      case "server/chunks/ssr/_bfb7c126._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_bfb7c126._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_roles_page_actions_26ed0c5d.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_roles_page_actions_26ed0c5d.js");
      case "server/chunks/ssr/src_app_admin_roles_rbac-client_tsx_b77c733c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_roles_rbac-client_tsx_b77c733c._.js");
      case "server/chunks/ssr/[root-of-the-server]__c4e2a9e8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__c4e2a9e8._.js");
      case "server/chunks/ssr/_611158d7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_611158d7._.js");
      case "server/chunks/ssr/_e2dad535._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_e2dad535._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_security_page_actions_8b9144d3.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_security_page_actions_8b9144d3.js");
      case "server/chunks/ssr/[root-of-the-server]__4e9ffd93._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__4e9ffd93._.js");
      case "server/chunks/ssr/_6928d7cb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_6928d7cb._.js");
      case "server/chunks/ssr/_ec083e9e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_ec083e9e._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_seo_page_actions_4e670411.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_seo_page_actions_4e670411.js");
      case "server/chunks/ssr/src_app_admin_seo_seo-client_tsx_280a8da5._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_seo_seo-client_tsx_280a8da5._.js");
      case "server/chunks/ssr/[root-of-the-server]__23220779._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__23220779._.js");
      case "server/chunks/ssr/_656e53c7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_656e53c7._.js");
      case "server/chunks/ssr/_a5014e95._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_a5014e95._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_services_page_actions_337eed56.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_services_page_actions_337eed56.js");
      case "server/chunks/ssr/src_app_admin_services_services-client_tsx_2ca26150._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_services_services-client_tsx_2ca26150._.js");
      case "server/chunks/ssr/[root-of-the-server]__2273a897._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2273a897._.js");
      case "server/chunks/ssr/_95cdb3cb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_95cdb3cb._.js");
      case "server/chunks/ssr/_9c051a27._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_9c051a27._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_settings_page_actions_d95b6266.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_settings_page_actions_d95b6266.js");
      case "server/chunks/ssr/[root-of-the-server]__766d07c2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__766d07c2._.js");
      case "server/chunks/ssr/_201cc6e2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_201cc6e2._.js");
      case "server/chunks/ssr/_65ce5f36._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_65ce5f36._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_team-careers_page_actions_f944af25.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_team-careers_page_actions_f944af25.js");
      case "server/chunks/ssr/src_app_admin_team-careers_team-careers-client_tsx_4bac32da._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_team-careers_team-careers-client_tsx_4bac32da._.js");
      case "server/chunks/ssr/[root-of-the-server]__99654bc8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__99654bc8._.js");
      case "server/chunks/ssr/_a6bd0e0e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_a6bd0e0e._.js");
      case "server/chunks/ssr/_dca1a384._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_dca1a384._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_theme_page_actions_933aec67.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_theme_page_actions_933aec67.js");
      case "server/chunks/ssr/[root-of-the-server]__87e2776d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__87e2776d._.js");
      case "server/chunks/ssr/_281e5989._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_281e5989._.js");
      case "server/chunks/ssr/_7591a35a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_7591a35a._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_typography_page_actions_088effe9.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_typography_page_actions_088effe9.js");
      case "server/chunks/[root-of-the-server]__09c3bdaf._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__09c3bdaf._.js");
      case "server/chunks/[root-of-the-server]__150b8d16._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__150b8d16._.js");
      case "server/chunks/[turbopack]_runtime.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[turbopack]_runtime.js");
      case "server/chunks/_1d2412bf._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_1d2412bf._.js");
      case "server/chunks/_next-internal_server_app_api_admin_backgrounds_route_actions_61a99003.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_backgrounds_route_actions_61a99003.js");
      case "server/chunks/node_modules_34cbb549._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/node_modules_34cbb549._.js");
      case "server/chunks/node_modules_next_dist_79f1aee4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_79f1aee4._.js");
      case "server/chunks/node_modules_next_f2da0d3e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/node_modules_next_f2da0d3e._.js");
      case "server/chunks/[root-of-the-server]__6da4a9a9._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__6da4a9a9._.js");
      case "server/chunks/_next-internal_server_app_api_admin_email_logs_route_actions_e64ad97d.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_email_logs_route_actions_e64ad97d.js");
      case "server/chunks/[root-of-the-server]__419204d2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__419204d2._.js");
      case "server/chunks/[root-of-the-server]__4223b97f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__4223b97f._.js");
      case "server/chunks/[root-of-the-server]__b3d070df._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__b3d070df._.js");
      case "server/chunks/[root-of-the-server]__ed884217._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__ed884217._.js");
      case "server/chunks/[root-of-the-server]__eed0d3ce._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__eed0d3ce._.js");
      case "server/chunks/[root-of-the-server]__f2eba228._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f2eba228._.js");
      case "server/chunks/_5dd6605f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_5dd6605f._.js");
      case "server/chunks/_next-internal_server_app_api_admin_email_providers_route_actions_e6c408ce.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_email_providers_route_actions_e6c408ce.js");
      case "server/chunks/node_modules_697b02d2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/node_modules_697b02d2._.js");
      case "server/chunks/node_modules_@aws-sdk_s3-request-presigner_dist-es_getSignedUrl_1f21fa81.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/node_modules_@aws-sdk_s3-request-presigner_dist-es_getSignedUrl_1f21fa81.js");
      case "server/chunks/src_lib_providers_email_brevo_ts_82cddad2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_brevo_ts_82cddad2._.js");
      case "server/chunks/src_lib_providers_email_cloudflare-routing_ts_9456850d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_cloudflare-routing_ts_9456850d._.js");
      case "server/chunks/src_lib_providers_email_elastic-email_ts_4c2586be._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_elastic-email_ts_4c2586be._.js");
      case "server/chunks/src_lib_providers_email_mailerlite_ts_86cf48e9._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_mailerlite_ts_86cf48e9._.js");
      case "server/chunks/src_lib_providers_email_mailgun_ts_5164954e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_mailgun_ts_5164954e._.js");
      case "server/chunks/src_lib_providers_email_mailjet_ts_65d1cd79._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_mailjet_ts_65d1cd79._.js");
      case "server/chunks/src_lib_providers_email_mailtrap_ts_f09005fa._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_mailtrap_ts_f09005fa._.js");
      case "server/chunks/src_lib_providers_email_sender_ts_35fe679f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_sender_ts_35fe679f._.js");
      case "server/chunks/src_lib_providers_email_zeptomail_ts_68d64e96._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_email_zeptomail_ts_68d64e96._.js");
      case "server/chunks/src_lib_providers_media_cloudflare_ts_154612dc._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_media_cloudflare_ts_154612dc._.js");
      case "server/chunks/src_lib_providers_media_imagekit_ts_bf573d6a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_media_imagekit_ts_bf573d6a._.js");
      case "server/chunks/src_lib_providers_media_twicpics_ts_a118dc5b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_media_twicpics_ts_a118dc5b._.js");
      case "server/chunks/src_lib_providers_media_uploadcare_ts_37baed62._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_media_uploadcare_ts_37baed62._.js");
      case "server/chunks/src_lib_providers_storage_supabase_ts_22951645._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_storage_supabase_ts_22951645._.js");
      case "server/chunks/[root-of-the-server]__30300bda._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__30300bda._.js");
      case "server/chunks/_next-internal_server_app_api_admin_email_send-test_route_actions_7dea3586.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_email_send-test_route_actions_7dea3586.js");
      case "server/chunks/[root-of-the-server]__3d830e22._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__3d830e22._.js");
      case "server/chunks/_next-internal_server_app_api_admin_emails_route_actions_e2155cbd.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_emails_route_actions_e2155cbd.js");
      case "server/chunks/[root-of-the-server]__a4897279._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__a4897279._.js");
      case "server/chunks/_next-internal_server_app_api_admin_forgot-password_route_actions_a3bf356f.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_forgot-password_route_actions_a3bf356f.js");
      case "server/chunks/[root-of-the-server]__43b50623._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__43b50623._.js");
      case "server/chunks/_next-internal_server_app_api_admin_leads_[id]_route_actions_ac31d5b9.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_leads_[id]_route_actions_ac31d5b9.js");
      case "server/chunks/[root-of-the-server]__64348edc._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__64348edc._.js");
      case "server/chunks/_next-internal_server_app_api_admin_leads_route_actions_9bce7760.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_leads_route_actions_9bce7760.js");
      case "server/chunks/[root-of-the-server]__f6cfcf4e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f6cfcf4e._.js");
      case "server/chunks/_next-internal_server_app_api_admin_nav-links_route_actions_2c1d1251.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_nav-links_route_actions_2c1d1251.js");
      case "server/chunks/[root-of-the-server]__7f91bf78._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__7f91bf78._.js");
      case "server/chunks/_next-internal_server_app_api_admin_pages_[id]_route_actions_7faae888.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_pages_[id]_route_actions_7faae888.js");
      case "server/chunks/[root-of-the-server]__f5bde312._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f5bde312._.js");
      case "server/chunks/_next-internal_server_app_api_admin_pages_route_actions_79662b9f.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_pages_route_actions_79662b9f.js");
      case "server/chunks/[root-of-the-server]__e4719431._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__e4719431._.js");
      case "server/chunks/_next-internal_server_app_api_admin_providers_[id]_route_actions_22e8472e.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_providers_[id]_route_actions_22e8472e.js");
      case "server/chunks/[root-of-the-server]__2f11a3a1._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__2f11a3a1._.js");
      case "server/chunks/_next-internal_server_app_api_admin_providers_failover_route_actions_48d77f80.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_providers_failover_route_actions_48d77f80.js");
      case "server/chunks/[root-of-the-server]__c37df37d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c37df37d._.js");
      case "server/chunks/_next-internal_server_app_api_admin_providers_health_route_actions_8ef6928d.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_providers_health_route_actions_8ef6928d.js");
      case "server/chunks/[root-of-the-server]__51b2f2f0._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__51b2f2f0._.js");
      case "server/chunks/_next-internal_server_app_api_admin_providers_route_actions_7fc65d33.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_providers_route_actions_7fc65d33.js");
      case "server/chunks/src_lib_providers_index_ts_b0ab9515._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/src_lib_providers_index_ts_b0ab9515._.js");
      case "server/chunks/[root-of-the-server]__9bbdab2d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__9bbdab2d._.js");
      case "server/chunks/_next-internal_server_app_api_admin_roles_[id]_route_actions_646be6ae.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_roles_[id]_route_actions_646be6ae.js");
      case "server/chunks/[root-of-the-server]__c8f7db58._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c8f7db58._.js");
      case "server/chunks/_next-internal_server_app_api_admin_roles_route_actions_8b74db16.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_roles_route_actions_8b74db16.js");
      case "server/chunks/[root-of-the-server]__0c7b750c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0c7b750c._.js");
      case "server/chunks/_next-internal_server_app_api_admin_security_route_actions_290d6bc6.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_security_route_actions_290d6bc6.js");
      case "server/chunks/[root-of-the-server]__f057992b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f057992b._.js");
      case "server/chunks/_next-internal_server_app_api_admin_seo_route_actions_ef239a83.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_seo_route_actions_ef239a83.js");
      case "server/chunks/[root-of-the-server]__63c42bff._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__63c42bff._.js");
      case "server/chunks/_next-internal_server_app_api_admin_services_[id]_route_actions_491a47f6.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_services_[id]_route_actions_491a47f6.js");
      case "server/chunks/[root-of-the-server]__45534df2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__45534df2._.js");
      case "server/chunks/_next-internal_server_app_api_admin_services_route_actions_94b08229.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_services_route_actions_94b08229.js");
      case "server/chunks/[root-of-the-server]__437de7fd._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__437de7fd._.js");
      case "server/chunks/_next-internal_server_app_api_admin_settings_route_actions_fd998405.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_settings_route_actions_fd998405.js");
      case "server/chunks/[root-of-the-server]__3bc62c2a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__3bc62c2a._.js");
      case "server/chunks/_next-internal_server_app_api_admin_team_route_actions_719188f3.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_team_route_actions_719188f3.js");
      case "server/chunks/[root-of-the-server]__1b2bf5ea._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__1b2bf5ea._.js");
      case "server/chunks/_next-internal_server_app_api_admin_themes_[id]_route_actions_72d7a168.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_themes_[id]_route_actions_72d7a168.js");
      case "server/chunks/[root-of-the-server]__c54f3625._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c54f3625._.js");
      case "server/chunks/_next-internal_server_app_api_admin_themes_route_actions_e600d002.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_themes_route_actions_e600d002.js");
      case "server/chunks/[root-of-the-server]__d9a42eb4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d9a42eb4._.js");
      case "server/chunks/_next-internal_server_app_api_admin_typography_route_actions_448ca674.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_typography_route_actions_448ca674.js");
      case "server/chunks/[root-of-the-server]__2ebc6bad._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__2ebc6bad._.js");
      case "server/chunks/_next-internal_server_app_api_admin_users_[id]_route_actions_b7a31f56.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_users_[id]_route_actions_b7a31f56.js");
      case "server/chunks/[root-of-the-server]__d9066f2e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d9066f2e._.js");
      case "server/chunks/_next-internal_server_app_api_admin_users_route_actions_595e9dd9.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_users_route_actions_595e9dd9.js");
      case "server/chunks/[root-of-the-server]__b11330c0._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__b11330c0._.js");
      case "server/chunks/_next-internal_server_app_api_auth_[___nextauth]_route_actions_1c865db8.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_[___nextauth]_route_actions_1c865db8.js");
      case "server/chunks/[root-of-the-server]__401ac955._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__401ac955._.js");
      case "server/chunks/[root-of-the-server]__5965b468._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__5965b468._.js");
      case "server/chunks/[root-of-the-server]__9b6a068a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__9b6a068a._.js");
      case "server/chunks/[root-of-the-server]__bc74ba97._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__bc74ba97._.js");
      case "server/chunks/_next-internal_server_app_api_contact_route_actions_0bce5875.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_contact_route_actions_0bce5875.js");
      case "server/chunks/node_modules_next_dist_esm_build_templates_app-route_256595d2.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_esm_build_templates_app-route_256595d2.js");
      case "server/chunks/[root-of-the-server]__b8f2bb86._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__b8f2bb86._.js");
      case "server/chunks/_next-internal_server_app_api_cron_provider-health_route_actions_c02ac4ee.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_cron_provider-health_route_actions_c02ac4ee.js");
      case "server/chunks/[root-of-the-server]__528a69b1._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__528a69b1._.js");
      case "server/chunks/_next-internal_server_app_api_route_actions_dcc5d538.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_route_actions_dcc5d538.js");
      case "server/chunks/ssr/[root-of-the-server]__2c91f63e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2c91f63e._.js");
      case "server/chunks/ssr/[root-of-the-server]__72cb231f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__72cb231f._.js");
      case "server/chunks/ssr/_cd406747._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_cd406747._.js");
      case "server/chunks/ssr/_next-internal_server_app_contact_page_actions_44e32ac3.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_contact_page_actions_44e32ac3.js");
      case "server/chunks/ssr/src_components_site_pages_contact-page_tsx_12e005ea._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_site_pages_contact-page_tsx_12e005ea._.js");
      case "server/chunks/ssr/[root-of-the-server]__2e063b7b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2e063b7b._.js");
      case "server/chunks/ssr/[root-of-the-server]__57b9d9ca._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__57b9d9ca._.js");
      case "server/chunks/ssr/_d3a81bea._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_d3a81bea._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_cookies_page_actions_2fb7c694.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_cookies_page_actions_2fb7c694.js");
      case "server/chunks/ssr/[root-of-the-server]__9c0b1667._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__9c0b1667._.js");
      case "server/chunks/ssr/_ee9ad953._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_ee9ad953._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_privacy_page_actions_58e1a65f.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_privacy_page_actions_58e1a65f.js");
      case "server/chunks/ssr/[root-of-the-server]__981fafa8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__981fafa8._.js");
      case "server/chunks/ssr/_384b5b0b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_384b5b0b._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_terms_page_actions_2eb0a351.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_terms_page_actions_2eb0a351.js");
      case "server/chunks/ssr/[root-of-the-server]__8c36cc33._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__8c36cc33._.js");
      case "server/chunks/ssr/[root-of-the-server]__8e634ad7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__8e634ad7._.js");
      case "server/chunks/ssr/_56d8ec73._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_56d8ec73._.js");
      case "server/chunks/ssr/_adf2bbda._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_adf2bbda._.js");
      case "server/chunks/ssr/_f7d51a39._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f7d51a39._.js");
      case "server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js");
      case "server/chunks/ssr/[root-of-the-server]__3babb572._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__3babb572._.js");
      case "server/chunks/ssr/[root-of-the-server]__890180d7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__890180d7._.js");
      case "server/chunks/ssr/_1144bdce._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_1144bdce._.js");
      case "server/chunks/ssr/_next-internal_server_app_portfolio_page_actions_224c57fe.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_portfolio_page_actions_224c57fe.js");
      case "server/chunks/ssr/[root-of-the-server]__0aa8c40a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0aa8c40a._.js");
      case "server/chunks/ssr/[root-of-the-server]__6a7b2bd8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__6a7b2bd8._.js");
      case "server/chunks/ssr/_19704ab4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_19704ab4._.js");
      case "server/chunks/ssr/_next-internal_server_app_resources_page_actions_40a14c4e.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_resources_page_actions_40a14c4e.js");
      case "server/chunks/[root-of-the-server]__910ef049._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__910ef049._.js");
      case "server/chunks/_next-internal_server_app_robots_txt_route_actions_9118e90f.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_robots_txt_route_actions_9118e90f.js");
      case "server/chunks/ssr/[root-of-the-server]__0fe2f5b6._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0fe2f5b6._.js");
      case "server/chunks/ssr/[root-of-the-server]__570b0748._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__570b0748._.js");
      case "server/chunks/ssr/_f1eaf404._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f1eaf404._.js");
      case "server/chunks/ssr/_next-internal_server_app_services_[[___slug]]_page_actions_c040c754.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_services_[[___slug]]_page_actions_c040c754.js");
      case "server/chunks/ssr/src_components_site_pages_services-page_tsx_6e9e3713._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_site_pages_services-page_tsx_6e9e3713._.js");
      case "server/chunks/[root-of-the-server]__c1e89594._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c1e89594._.js");
      case "server/chunks/_next-internal_server_app_sitemap_xml_route_actions_12658ace.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_sitemap_xml_route_actions_12658ace.js");
      case "server/chunks/node_modules_next_dist_esm_build_templates_app-route_ae175ba5.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_esm_build_templates_app-route_ae175ba5.js");
      default:
        throw new Error(`Not found ${chunkPath}`);
    }
  }


  async function loadWasmChunk(chunkPath) {
    switch (chunkPath) {
      case "/home/z/my-project/.open-next/server-functions/default/node_modules/.prisma/client/query_engine_bg.wasm": return (await import("/home/z/my-project/.open-next/server-functions/default/node_modules/.prisma/client/query_engine_bg.wasm")).default;
      default:
        throw new Error(`Unknown wasm chunk: ${chunkPath}`);
    }
  }

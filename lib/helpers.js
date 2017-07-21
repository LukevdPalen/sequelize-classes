// Array of method names to ignore/prevent from being added into our models
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getProperties = getProperties;
exports.defineFunctions = defineFunctions;
var marked0$0 = [findFunctions, parseFunction].map(regeneratorRuntime.mark);
var ignore = ['constructor', 'Model', 'length', 'name', 'arguments', 'caller', 'prototype'];

/**
 * Get the properties on the model, loops over Object.keys and thus skips over non-enumerable properties
 * @param {object} model - Model instance
 * @returns {Object}
 */

function getProperties(model) {
  var properties = {};
  Object.keys(model).forEach(function (name) {
    properties[name] = model[name];
  });
  return properties;
}

/**
 * Responsible for looping through all functions on the model and assigning them to the appropriate configuration
 * object
 * @param {object} model - instance of our model
 */

function defineFunctions(model) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = findFunctions(model)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 3);

      var target = _step$value[0];
      var _name = _step$value[1];
      var method = _step$value[2];

      // noinspection JSUnusedAssignment
      model[target][_name] = method;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/** helpers **/

/**
 * Adds getter and/or setter methods to a field definition.
 * @param {String|Object} field - the field declaration
 * @param {Object} method - function descriptor
 * @returns {Object} - Field declaration
 */
function addToDefinition(field, method) {
  var fieldTarget = field;
  if (typeof field !== 'object') {
    fieldTarget = { type: field };
  }

  if (method.get) fieldTarget.get = method.get;
  if (method.set) fieldTarget.set = method.set;

  return fieldTarget;
}

/**
 * Gets a array of functions that belong to object.
 * @param {object} object
 * @param {Boolean} isStatic - when true, object is the constructor of the model
 * @returns {Array}
 */
function getFunctions(object) {
  var isStatic = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  return Object.getOwnPropertyNames(object).map(function (name) {
    return _extends({}, Object.getOwnPropertyDescriptor(object, name), {
      name: name,
      isStatic: isStatic
    });
  });
}

/**
 * Iterator function that lets us loop through a model's functions
 * @param {object} model - Model instance
 */
function findFunctions(model) {
  var staticFunctions, memberFunctions, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, method, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, result, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5;

  return regeneratorRuntime.wrap(function findFunctions$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        staticFunctions = getFunctions(model.constructor, true);
        memberFunctions = getFunctions(Object.getPrototypeOf(model));
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 5;
        _iterator2 = staticFunctions.filter(filterFunction)[Symbol.iterator]();

      case 7:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 38;
          break;
        }

        method = _step2.value;
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 12;
        _iterator4 = parseFunction(method, model)[Symbol.iterator]();

      case 14:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 21;
          break;
        }

        result = _step4.value;
        context$1$0.next = 18;
        return result;

      case 18:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 14;
        break;

      case 21:
        context$1$0.next = 27;
        break;

      case 23:
        context$1$0.prev = 23;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 27:
        context$1$0.prev = 27;
        context$1$0.prev = 28;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 30:
        context$1$0.prev = 30;

        if (!_didIteratorError4) {
          context$1$0.next = 33;
          break;
        }

        throw _iteratorError4;

      case 33:
        return context$1$0.finish(30);

      case 34:
        return context$1$0.finish(27);

      case 35:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 7;
        break;

      case 38:
        context$1$0.next = 44;
        break;

      case 40:
        context$1$0.prev = 40;
        context$1$0.t1 = context$1$0['catch'](5);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 44:
        context$1$0.prev = 44;
        context$1$0.prev = 45;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 47:
        context$1$0.prev = 47;

        if (!_didIteratorError2) {
          context$1$0.next = 50;
          break;
        }

        throw _iteratorError2;

      case 50:
        return context$1$0.finish(47);

      case 51:
        return context$1$0.finish(44);

      case 52:
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 55;
        _iterator3 = memberFunctions.filter(filterFunction)[Symbol.iterator]();

      case 57:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 88;
          break;
        }

        method = _step3.value;
        _iteratorNormalCompletion5 = true;
        _didIteratorError5 = false;
        _iteratorError5 = undefined;
        context$1$0.prev = 62;
        _iterator5 = parseFunction(method, model)[Symbol.iterator]();

      case 64:
        if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
          context$1$0.next = 71;
          break;
        }

        result = _step5.value;
        context$1$0.next = 68;
        return result;

      case 68:
        _iteratorNormalCompletion5 = true;
        context$1$0.next = 64;
        break;

      case 71:
        context$1$0.next = 77;
        break;

      case 73:
        context$1$0.prev = 73;
        context$1$0.t2 = context$1$0['catch'](62);
        _didIteratorError5 = true;
        _iteratorError5 = context$1$0.t2;

      case 77:
        context$1$0.prev = 77;
        context$1$0.prev = 78;

        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }

      case 80:
        context$1$0.prev = 80;

        if (!_didIteratorError5) {
          context$1$0.next = 83;
          break;
        }

        throw _iteratorError5;

      case 83:
        return context$1$0.finish(80);

      case 84:
        return context$1$0.finish(77);

      case 85:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 57;
        break;

      case 88:
        context$1$0.next = 94;
        break;

      case 90:
        context$1$0.prev = 90;
        context$1$0.t3 = context$1$0['catch'](55);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t3;

      case 94:
        context$1$0.prev = 94;
        context$1$0.prev = 95;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 97:
        context$1$0.prev = 97;

        if (!_didIteratorError3) {
          context$1$0.next = 100;
          break;
        }

        throw _iteratorError3;

      case 100:
        return context$1$0.finish(97);

      case 101:
        return context$1$0.finish(94);

      case 102:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[5, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51], [55, 90, 94, 102], [62, 73, 77, 85], [78,, 80, 84], [95,, 97, 101]]);
}

/**
 * Helper function to get field name from a getter or setter name.
 * @param {String} name
 * @returns {String}
 */
function fieldName(name) {
  return name.replace(/^_/, '');
}

/**
 * Helper function to test if a string matches a field in object
 * @param {String} name
 * @param {object} object - object to test
 * @returns {boolean}
 */
function isField(name, object) {
  return name.startsWith('_') && object._fields[fieldName(name)];
}

/**
 * Determines which configuration object to add the function to based on it's descriptor's properties
 * @param {object} method - function descriptor
 * @param {object} model - model instance
 */
function parseFunction(method, model) {
  var field, target;
  return regeneratorRuntime.wrap(function parseFunction$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(method.get || method.set)) {
          context$1$0.next = 12;
          break;
        }

        if (isField(method.name, model)) {
          context$1$0.next = 10;
          break;
        }

        if (!method.get) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 5;
        return ['_getterMethods', method.name, method.get];

      case 5:
        if (!method.set) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 8;
        return ['_setterMethods', method.name, method.set];

      case 8:
        context$1$0.next = 12;
        break;

      case 10:
        field = fieldName(method.name);

        model._fields[field] = addToDefinition(model._fields[field], method);

      case 12:
        target = '_instanceMethods';

        if (method.isStatic === true) {
          target = '_classMethods';
        }
        context$1$0.next = 16;
        return [target, method.name, method.value];

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}

/**
 * filter function to filter out functions we aren't interested in.
 * @param {object} method - function descriptor
 * @returns {Boolean}
 */
function filterFunction(method) {
  if (ignore.indexOf(method.name) >= 0) {
    return false;
  }

  if (method.writable && typeof method.value === 'function') {
    return true;
  }

  return method.get && typeof method.get === 'function' || method.set && typeof method.set === 'function';
}
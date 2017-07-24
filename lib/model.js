/**
 * @file Defines a class Model for extending other Sequelize Models from.
 * @author Brad Decker <brad.decker@conciergeauctions.com>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _decorators = require('./decorators');

var _helpers = require('./helpers');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// Array of members in which to clean from the constructor.
var constructorCleanup = ['_validate', '_hooks', '_defaultScope', '_scopes'];
var relatedModels = {};

/**
 * @class Model
 */

var Model = (function () {
  var _instanceInitializers = {};
  var _instanceInitializers = {};

  _createDecoratedClass(Model, [{
    key: '_fields',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object for storing instance methods
    enumerable: true
  }, {
    key: '_instanceMethods',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object for storing class methods
    enumerable: true
  }, {
    key: '_classMethods',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object for declaring getters for fields
    enumerable: true
  }, {
    key: '_getterMethods',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object for declaring setters for fields
    enumerable: true
  }, {
    key: '_setterMethods',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object for declaring validators
    enumerable: true
  }, {
    key: '_validate',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object for declaring model hooks
    enumerable: true
  }, {
    key: '_hooks',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Array of indexes to create on the schema
    enumerable: true
  }, {
    key: '_indexes',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return [];
    },

    // Boolean to track status of the model.
    enumerable: true
  }, {
    key: '_generated',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return false;
    },

    // Object for declaring scopes.
    enumerable: true
  }, {
    key: '_scopes',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object to declare base scope.
    enumerable: true
  }, {
    key: '_defaultScope',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    // Object Model Options
    enumerable: true
  }, {
    key: '_options',
    decorators: [(0, _decorators.enumerable)(false)],
    initializer: function initializer() {
      return {};
    },

    /**
     * @constructor
     * builds the model and calls the cleanConstructor method.
     */
    enumerable: true
  }], null, _instanceInitializers);

  function Model() {
    _classCallCheck(this, Model);

    _defineDecoratedPropertyDescriptor(this, '_fields', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_instanceMethods', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_classMethods', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_getterMethods', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_setterMethods', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_validate', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_hooks', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_indexes', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_generated', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_scopes', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_defaultScope', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, '_options', _instanceInitializers);

    this.cleanConstructor();
  }

  /**
   * Clean up the constructor object by moving externally defined items back into the instance and removing
   * them from the original constructor object.
   */

  _createDecoratedClass(Model, [{
    key: 'cleanConstructor',
    value: function cleanConstructor() {
      var _this = this;

      constructorCleanup.forEach(function (item) {
        _this[item] = _this.constructor[item] || {};
        delete _this.constructor[item];
      });
      var cleanup = this.constructor._cleanup || [];
      cleanup.forEach(function (item) {
        delete _this.constructor[item];
      });
      delete this.constructor._cleanup;
      this._indexes = this.constructor._indexes || [];
      delete this.constructor._indexes;
    }

    /**
     * Replace all occurrences of known string dataTypes with real dataTypes
     * @param dataTypes
     */
  }, {
    key: 'declareTypes',
    decorators: [(0, _decorators.readOnly)()],
    value: function declareTypes() {
      var _this2 = this;

      var dataTypes = arguments.length <= 0 || arguments[0] === undefined ? _sequelize2['default'] : arguments[0];

      // TODO: Collect member variables and replace string data types with true data types.
      if (this._fields.length === 0) {
        this.generateOptions();
      }

      Object.keys(this._fields).forEach(function (key) {
        var definition = _this2._fields[key];
        if (typeof definition === 'object') {
          definition.type = dataTypes[definition.type];
        } else {
          definition = dataTypes[definition];
        }
        _this2._fields[key] = definition;
      });
    }

    /**
     * Loop through the hooks declared in _hooks and add them to the model schema through the addHook method.
     * @param {Object} model - instance of the model
     */
  }, {
    key: 'declareHooks',
    decorators: [(0, _decorators.readOnly)()],
    value: function declareHooks(model) {
      var _this3 = this;

      if (!model.addHook) {
        throw new Error('declareHooks called before model generated');
      }

      Object.keys(this._hooks).forEach(function (key) {
        var hook = _this3._hooks[key];
        model.addHook(hook.action, key, hook.fn);
      });
    }

    /**
     * Loop through all of the extensions added into this model and inherit all of the extension methods and fields.
     */
  }, {
    key: 'runExtensions',
    decorators: [(0, _decorators.readOnly)()],
    value: function runExtensions() {
      if (!this.constructor._extensions) {
        return;
      }

      var fields = ['_fields', '_validate', '_indexes', '_classMethods', '_instanceMethods', '_hooks', '_getterMethods', '_setterMethods', '_defaultScope', '_scopes'];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;

          this[field] = _lodash2['default'].merge.apply(_lodash2['default'], _toConsumableArray(_lodash2['default'].map(this.constructor._extensions, field)).concat([this[field]]));
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

    /**
     * Sequelize-Six requires all of the configuration level fields to be defined prior to registering a model schema
     * this function generates all of these options, and assigns function definitions to the appropriate configuration
     * object. If it is called more than once it will not regenerate options, to aid in performance.
     */
  }, {
    key: 'generateOptions',
    decorators: [(0, _decorators.readOnly)()],
    value: function generateOptions() {
      if (!this._generated) {
        this._fields = (0, _helpers.getProperties)(this);
        (0, _helpers.defineFunctions)(this);
        this.runExtensions();
        this._generated = true;
      }
    }

    /**
     * This is a shortcut to call sequelize.define. It adds in all of the configuration options that are built with
     * the Sequelize-Six library. Returns the model returned from the define call.
     * @returns {Model}
     */
  }, {
    key: 'registerModel',
    value: function registerModel(sequelize) {
      var self = this;
      var Model = sequelize.define(self.constructor.name, self._fields, _extends({
        indexes: self._indexes,
        getterMethods: self._getterMethods,
        setterMethods: self._setterMethods,
        validate: self._validate
      }, self.constructor._options));

      Object.keys(self._classMethods).forEach(function (key) {
        Model[key] = self._classMethods[key];
      }, self);

      Object.keys(self._instanceMethods).forEach(function (key) {
        Model.prototype[key] = self._instanceMethods[key];
      }, self);

      this.declareHooks(Model);
      // this.declareRelations( model, sequelize );
      return Model;
    }
  }, {
    key: 'declareRelations',
    value: function declareRelations(model, sequelize) {
      if (!this.constructor._relationships) {
        return;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.constructor._relationships[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var relation = _step2.value;

          if (typeof relatedModels[relation.model] === 'undefined') {
            relatedModels[relation.model] = sequelize['import'](relation.file);
          }
          model[relation.type](relatedModels[relation.model], relation.options);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
     * Sequelize allows you to create a export function in which you define your models. This function allows you to
     * export Sequelize-Six Models without creating an instance or manually building these functions. Simply do
     * export default Model.exportModel();
     *
     * @returns {Function}
     */
  }], [{
    key: 'exportModel',
    value: function exportModel() {
      var _this4 = this;

      return function (sequelize) {
        var model = new _this4();
        model.generateOptions();
        return model.registerModel(sequelize);
      };
    }
  }], _instanceInitializers);

  return Model;
})();

exports.Model = Model;

// Fields object for declaring model/table fields
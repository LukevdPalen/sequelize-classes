'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _decorators = require('./decorators');

_defaults(exports, _interopExportWildcard(_decorators, _defaults));

var _model = require('./model');

_defaults(exports, _interopExportWildcard(_model, _defaults));

var defaultOptions = { database: '', databaseUrl: '', username: '', pass: '', config: {} };

var Builder = (function () {
  function Builder() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];
    var models = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Builder);

    this.sequelize = null;
    this.models = [];
    this.loadedModels = {};

    var sequelizeArguments = [];
    if (options.databaseUrl) sequelizeArguments.push(options.databaseUrl);
    if (!options.databaseUrl && options.database) {
      sequelizeArguments = [options.database, options.username, options.pass];
    }
    sequelizeArguments.push(options.config);
    this.sequelize = new (_bind.apply(_sequelize2['default'], [null].concat(_toConsumableArray(sequelizeArguments))))();
    this.models = models.map(function (Model) {
      return new Model();
    });

    this.models.forEach(function (model) {
      model.generateOptions();
      var loadedModel = model.registerModel(_this.sequelize);
      _this.loadedModels[loadedModel.name] = loadedModel;
      Object.defineProperty(_this, loadedModel.name, {
        get: function get() {
          return loadedModel;
        }
      });
    });

    this.models.forEach(function (model) {
      _this.registerRelationship(model, _this.loadedModels[model.constructor.name]);
      _this.registerScopes(model, _this.loadedModels[model.constructor.name]);
    });
  }

  _createClass(Builder, [{
    key: 'registerRelationship',
    value: function registerRelationship(sequelizeClass, model) {
      var _this2 = this;

      if (!sequelizeClass.constructor._relationships) {
        return;
      }
      sequelizeClass.constructor._relationships.forEach(function (relation) {
        model[relation.type](_this2.loadedModels[relation.model], relation.options);
      });
    }
  }, {
    key: 'replaceIncludeModels',
    value: function replaceIncludeModels(scope) {
      var _this3 = this;

      return scope.include.map(function (include) {
        if (typeof include.model === 'string') {
          include.model = _this3.loadedModels[include.model];
        }
        return include;
      });
    }
  }, {
    key: 'registerScopes',
    value: function registerScopes(sequelizeClass, model) {
      var _this4 = this;

      if (sequelizeClass._defaultScope) {
        if (sequelizeClass._defaultScope.include) {
          sequelizeClass._defaultScope.include = this.replaceIncludeModels(sequelizeClass._defaultScope);
        }
        model.addScope('defaultScope', sequelizeClass._defaultScope, { override: true });
      }

      if (sequelizeClass._scopes) {
        Object.keys(sequelizeClass._scopes).forEach(function (scopeName) {
          var scope = sequelizeClass._scopes[scopeName];
          if (scope.include) {
            scope = _this4.replaceIncludeModels(scope);
          }
          model.addScope(scopeName, scope);
        });
      }
    }
  }, {
    key: 'syncDatabase',
    value: function syncDatabase() {
      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      return regeneratorRuntime.async(function syncDatabase$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.sequelize.sync(_lodash2['default'].assign(options, { force: force })));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'query',
    value: function query(_query) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      return regeneratorRuntime.async(function query$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.sequelize.query(_query, options));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'base',
    get: function get() {
      return this.sequelize;
    },
    set: function set(sequelize) {
      this.sequelize = sequelize;
    }
  }]);

  return Builder;
})();

exports.Builder = Builder;

const ignore = {
  methods: [
    'constructor',
    'Model'
  ],
  statics: [
    'length',
    'name',
    'arguments',
    'caller',
    'prototype'
  ]
};

export function* entries ( obj ) {
  for ( let key of Object.keys( obj ) ) {
    yield [ key, obj[key]];
  }
}

export function getProperties ( model ) {
  let propertyNames = Object.keys( model );
  let properties = {};

  for ( let name of propertyNames ) {
    properties[name] = model[name];
  }

  return properties;
}

export function getMemberFunctions ( model ) {

  // Get the property names on the prototype
  let functions = Object.getOwnPropertyNames( Object.getPrototypeOf( model ) );

  // Start a list of methods to return
  let methods = {};

  // Loop through method name strings
  for ( let [ methodName, method ] of findFunctions( functions, model ) ) {
    methods[methodName] = method;
  }

  // Return the methods.
  return methods;
}

export function getFunctionsOfType ( model, type = 'get' ) {

  // Get the property names on the prototype
  let functions = Object.getOwnPropertyNames( Object.getPrototypeOf( model ) );

  // Start a list of getters to return
  let foundFunctions = {};

  // Loop through method name strings
  for ( let [ methodName, method ] of findFunctions( functions, model, type ) ) {

    if ( isField( methodName, model ) ) {

      let field = fieldName( methodName );
      model._fields[field] = addToDefinition( model._fields[field], method, type );
      continue;

    }

    foundFunctions.methodName = method;
  }

  // Return the getters.
  return foundFunctions;
}

export function getStaticFunctions ( model ) {

  // Get the Object constructor to get static functions
  let constructor = model.constructor;

  // Get the property names on the constructor
  let functions = Object.getOwnPropertyNames( constructor );

  // Start a object of statics to return
  let statics = {};

  // Loop through method name strings
  for ( let [ methodName, method ] of findFunctions( functions, constructor, 'static' ) ) {
    statics[methodName] = method;
  }

  // Return the statics.
  return statics;
}

/** helpers **/

function addToDefinition ( field, method, type = 'get' ) {
  if ( typeof field !== 'object' ) {
    field = { type: field };
  }
  field[type] = method;
  return true;
}

function* findFunctions ( names, object, flag = 'methods' ) {

  let filters = ignore.methods;
  let filterFunc = method => {
    return ( typeof method !== 'function' || typeof method.get === 'function' || typeof method.set === 'function');
  };
  let returnValue = name => object[name];

  switch( flag ) {
    case 'get':
      filterFunc = method => typeof method.get !== 'function';
      returnValue = name => object[name];
      break;
    case 'set':
      filterFunc = method => typeof method.set !== 'function';
      break;
    case 'static':
      filterFunc = method => typeof method !== 'function';
      filters = ignore.statics;
      break;
    default:
      break;
  }

  for ( let name of names ) {

    let method = Object.getOwnPropertyDescriptor( object, name );

    if ( filters.indexOf( name ) >= 0 || filterFunc( method ) || !method.writable ) {
      continue;
    }

    yield [ name, returnValue( name ) ];
  }

}

function fieldName ( name ) {
  return name.replace( /^_/, '' );
}

function isField ( name, object ) {
  return name.startsWith( '_' ) && object._fields[fieldName( name )];
}
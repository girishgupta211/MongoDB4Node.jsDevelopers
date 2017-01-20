// Object Oriented Guide - JavaScript
// Valar Dohaeris

'use strict';

// always run in strict mode. It's a life saver.

// Both var points to the same object
var object1 = new Object();
var object2 = object1;

// Dereferencing Objects - To free up the memory space

object1 = null;

// Use of string literals in property name when we want spaces or special characters
var book = {
    "  name": "the principles",
    year: 2014
}

console.log(book["  name"]); // "the principles"

// Reg Exp literal - Use over the consturctor form 

var numbers = /\d+/g;

// Use of brackets notation to dynamically decide which property to access

var array = [];
array.push(123);

// OR

var array = [];
array["push"](123);

// OR

var method = "push";
array[method](123);

// the instanceof operator can identify inherited types
var items = [];
var object = {};

console.log(items instanceof Array); // true
console.log(items instanceof Object); // true
console.log(object instanceof Object); // true
console.log(object instanceof Array); // false

// use of Array.isArray() over instanceof Array to check if an object is an Array

var items = [];
console.log(Array.isArray(items)); // true

// An object always evaluates to true even its a boolean false

var found = new  Boolean(false);

if(found) {
	console.log("found");
}

// Most of the time, using primitive wrapper objects instead of primitives only leads to errors.

// Functions are objects. Functions are different from other objects because of an internal property [[Call]]

// arguments is an array like structure. Arguments is not an instance of Array and Array.isArray(arguments) always returns false.

function reflect(a, b) {
	return a;
}

console.log(reflect.length); // returns no. of expected arguements

// In practice, checking the named parameter against undefined is more common than relying on arguments.length .

// The ability to use and manipulate the this value of functions is key to good object-oriented programming in JavaScript.

// Manipulating this

// The call() Method

function sayNameForAll(label) {
	console.log(label + ":" + this.name);
}

var person1 = {
	name: "Bejoy"
}

var person2 = {
	name: "George"
}

var name = "Mathew";

sayNameForAll.call(this, "global"); // this doesn't work in sublime build - but works for browsers and node

sayNameForAll.call(person1, "person1"); // outputs "person1: Bejoy"

// pass an array or array like object when using apply 
sayNameForAll.apply(person1, ["person1"]); // outputs "person1: Bejoy"

// bind() method

// create a function just for person1
var sayNameForPerson1 = sayNameForAll.bind(person1);
sayNameForPerson1("person1");

// create a function just for person2 with passing the parameter
var sayNameForPerson2 = sayNameForAll.bind(person2, "person2");
sayNameForPerson2();

// attaching a method to an object doesn't change 'this'
person2.sayName = sayNameForPerson1;
person2.sayName("person2"); 	// outputs "person2:Bejoy"

// Detecting Properties

// unreliable
if (person1.age) {
	// do something with age
}

// reliable 
console.log("name" in person1); // true
console.log("age" in person1); // false

var person1 = {
	name: "Bejoy",
	sayName: function() {
		console.log(this.name);
	}
};

console.log("sayName" in person1); // true

// in operator has the added benefit of not evalutating the value of the property

// for checking if that obejct has specific property use hasOwnProperty

console.log(person1.hasOwnProperty("name")); // true
console.log(person1.hasOwnProperty("toString")); // false

// Removing properties

console.log("name" in person1);
delete person1.name;
console.log("name" in person1);

// Enumeration
console.log(person1.propertyIsEnumerable("sayName")); // true

var properties = Object.keys(person1);

console.log(properties); // ['sayName']

console.log("length" in properties); // true

console.log(properties.propertyIsEnumerable("length")); // false

// Many native properties are not enumerable by default

// TYPES OF PROPERTIES

// Two Types: Data Properties & Accessor Properties

// Data Properties contains a value.
// Accessor properties doesn't, instead define a function to call when the property is read or written

var person1 = {
	_name: "Bejoy",

	get name() {
		console.log("Reading name");
		return this._name;
	},

	set name(value) {
		console.log("Setting name to %s", value);
		this._name = value;
	}
}

console.log(person1.name); // "Reading name" then "Bejoy"
person1.name = "President K"; // "Setting name to President K"

// leading underscore is a common convention to indicate that the property is considered private, but its still public.

// Property Attributes
	// Common Attributes of Data and accessors. 
		// Enumerable and Configurable

// By default all declared properties are enumerable and configurable

var person1 = {
	name: "Bejoy"
}

Object.defineProperty(person1, "name", {
	enumerable: false
});

console.log("name" in person1); // true

console.log(person1.propertyIsEnumerable("name")); // false

console.log(Object.keys(person1)); // []

Object.defineProperty(person1, "name", {
	configurable: false
});

try {
	delete person1.name;
}
catch(err) {
	console.log(err); // Cannot delete property 'name'
}

// When JavaScript is running in strict mode, attempting to delete a nonconfigurable
// property results in an error. In nonstrict mode, the operation silently fails.

console.log("name" in person1); // true

console.log(person1.name); // "Bejoy"

try {
	Object.defineProperty(person1, "name", {
		configurable: true
	});
}
catch(err) {
	console.log(err); // [TypeError: Cannot redfine property: name]
}

// Data Property Attributes

	// Value
	// Writable

var person1 = {
	name: "Bejoy"
};

// OR

var person1 = {};

Object.defineProperty(person1, "name", {
	value: "Bejoy",
	enumerable: true,
	configurable: true,
	writable: true
});

// Defining a new property with Object.defineProperty() , it’s important to specify all 
// of the attributes because Boolean attributes automatically default to false other­wise.

var person1 = {};
Object.defineProperty(person1, "name", {
	value: "Bejoy"
});

console.log("name" in person1); // true

console.log(person1.propertyIsEnumerable("name")); // false

try{
	delete person1.name;
}
catch(err) {
	console.log("Throws err, cannot delete");
}

try{
	person1.name = "George";
}
catch(err) {
	console.log(err); // [TypeError: Cannot assign to read only property 'name']
}

// Accessor Property Attributes
	// Get
	// Set

var person1 = {
	_name: "Bejoy",

	get name() {
		console.log("Reading name");
		return this._name;
	},

	set name(value) {
		console.log("Setting name to %s", value);
		this._name = value;
	}
};

// This code can also be written as

var person1 = {
	_name: "Bejoy"
};

Object.defineProperty(person1, "name", {
	get: function() {
		console.log("Reading name");
		return this._name;
	},
	set: function() {
		console.log("Setting name to %s", value);
		this._name = value;
	},
	enumerable: true,
	configurable: true
});

// The advantage of using accessor property attributes instead of object literal notation to 
// define accessor properties is that you can also define those properties on existing objects. 
// If you want to use object literal notation, you have to define accessor properties when 
// you create the object.

// Defining Multiple Properties

var person1 = {};

Object.defineProperties(person1, {

	// data property to store data
	_name: {
		value: "Nicholas",
		enumerable: true,
		configurable: true,
		writable: true
	},

	// accessor property 
	name: {
		get: function() {
			console.log("Reading name");
			return this._name;
		},
		set: function(value) {
			console.log("Setting name to %s", value);
			this._name = value;
		},
		enumerable: true,
		configurable: true
	}
});

var person1 = {
	name: "Bejoy"
};

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");

console.log(descriptor);

// Preventing Object Modification
	// Preventing Extensions
var person1 = {
	name: "Bejoy"
};

console.log(Object.isExtensible(person1)); // true

Object.preventExtensions(person1);

console.log(Object.isExtensible(person1)); // false

try {
	person1.sayName = function() {
		console.log(this.name);
	};

}
catch(err) {
	console.log(err); // [TypeError: Can't add property sayName, object is not extensible]
}

console.log("sayName" in person1); // false

	// Sealing Objects
	// Cannot add new properties, cant remove properties or change their types

var person1 = {
	name: "Bejoy"
};

console.log(Object.isExtensible(person1)); // true
console.log(Object.isSealed(person1)); // false

Object.seal(person1);
console.log(Object.isExtensible(person1)); // false
console.log(Object.isSealed(person1)); // true

// adding new properties wont work

try {
	delete person1.name;	
}
catch(err) {
	console.log(err); // Cannot delete prop name
}

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");

console.log(descriptor);

person1.name = "George";

console.log(person1.name); // George 

	// Freezing Objects
	// Everything is frozen. Isn't extensible, configurable or writable (Oh! but is enumerable)

var person1 = {
	name: "Bejoy"
}

Object.freeze(person1);

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");

console.log(descriptor);

// Constructors
// Its a function that is used with new to create an object.
// Constructor names should begin with capital letter.

function Person() {
	// intentionally empty 
}

var person1 = new Person();
var person2 = new Person();

// When no parameters are to be passed object can be created without brackets

var person1 = new Person;

console.log(person1 instanceof Person);

// Every object instance is automatically ­created with a ­ constructor property 
// that contains a reference to the constructor function that ­created it.

console.log(person1.constructor); // Person

// use instanceof instead of .constructor because constructor property can be overwritten 

// constructor with properties

function Person(name) {
	this.name = name;
	this.getName = function() {
		console.log("line 459", this.name);
	}
}

// There’s no need to return a value from the function because the new operator 
// produces the return value.

var person1 = new Person("Bejoy");
var person2 = new Person("George");

console.log(person1); // Person { name: 'Bejoy', getName: [Function] }

person1.getName(); 

function PersonWithObjectReturn(name) {
	this.name = name;
	this.getName = function() {
		console.log(this.name);
	}
	return {};
}

function PersonWithPrimitiveReturn(name) {
	this.name = name;
	this.getName = function() {
		 console.log(this.name);
	}
	return 2;
}

// You can also explicitly call return inside of a constructor. If the returned value
// is an object, it will be returned instead of the newly created object instance. If the
// returned value is a primitive, the newly created object is used and the returned
// value is ignored.

var person3 = new PersonWithObjectReturn("I will cease to exist");
var person4 = new PersonWithPrimitiveReturn("I will survive any odds");

console.log(person3); // {} 
console.log(person4.name); // I will survive any odds

// Constructors with Object.defineProperty()

function Person(name) {

	Object.defineProperty(this, "name", {
		get: function() {
			return name;
		},
		set: function(newName) {
			name = newName;
		},
		enumerable: true,
		configurable: true
	});

	this.getName = function() {
		console.log(this.name);
	};
}

// always call constructors with new, otherwise risk changing the global object
// instead of creating a new one.

try {
	var person1 = Person("Bejoy"); // missing "new"
}
catch(err) {
	console.log(err); // Object.defineProperty called on non-object.
}

// An error occurs if you call the Person constructor in strict mode without using new .
// This is because strict mode doesn’t assign this to the global object. Instead, this
// remains undefined , and an error occurs whenever you attempt to create a property
// on undefined.

// Prototypes

// Refer mdn for definition 

var book = {
	title: "the principles"
};

console.log("title" in book); // true
console.log(book.hasOwnProperty("title")); // true
console.log("hasOwnProperty" in book); // true
console.log(book.hasOwnProperty("hasOwnProperty")); // false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); // true

// Identifying a prototype property
function hasPrototypeProperty(object, name) {
	return name in object && !object.hasOwnProperty(name);
}

console.log(hasPrototypeProperty(book, "title")); // false
console.log(hasPrototypeProperty(book, "hasOwnProperty")); // true

// read the value of [[Prototype]]

var object = {};
var prototype = Object.getPrototypeOf(object);

console.log(prototype === Object.prototype);  // true

// checking if one object is property for another

var object = {};

console.log(Object.prototype.isPrototypeOf(object)); // true

// When a property is read on an object, the JavaScript engine first
// looks for an own property with that name. If the engine finds a correctly
// named own property, it returns that value. If no own property with that
// name exists on the target object, JavaScript searches the [[Prototype]]
// object instead. If a prototype property with that name exists, the value
// of that property is returned. If the search concludes without finding a
// property with the correct name, undefined is returned.

var object = {};

console.log(object.toString()); // "[object Object]"

object.toString = function() {
	return "[object Custom]";
};

console.log(object.toString()); // "[object Custom]"

// delete own property
delete object.toString;

console.log(object.toString()); // "[object Object]"

// no effect - delete only works on own properties

delete object.toString;
console.log(object.toString()); // "[object Object]"

// Using Prototypes with Constructors

function PersonWithProto(name) {
	this.name = name;
}

PersonWithProto.prototype.sayName = function() {
	console.log(this.name);
};

var person1 = new PersonWithProto("Bejoy");
var person2 = new PersonWithProto("George");

console.log(person1.name); // "Bejoy"

person1.sayName(); // "Bejoy"

// be careful with reference types 

function PersonWithRefType(name) {
	this.name = name;
}

PersonWithRefType.prototype.sayName = function() {
	console.log(this.name);
};

PersonWithRefType.prototype.favorites = [];

var person1 = new PersonWithRefType("Bejoy");
var person2 = new PersonWithRefType("George");

person1.favorites.push("pizza");
person2.favorites.push("chocolate");

console.log(person1.favorites); // ['pizza', 'chocolate']
console.log(person2.favorites); // ['pizza', 'chocolate']

// the favorites property is defined on the prototype, they both point to same array

// add multiple prototype with object literal

function PersonWithObjLiteral(name) {
	this.name = name;
}

PersonWithObjLiteral.prototype = {
	sayName: function() {
		console.log(this.name);
	},

	toString: function() {
		return "[Person " + this.name + "]";
	}
};

var person1 = new PersonWithObjLiteral("Bejoy");

// but the above method has a side effect

console.log(person1 instanceof PersonWithObjLiteral); // true
console.log(person1.constructor === PersonWithObjLiteral); // false
console.log(person1.constructor === Object); // true

// Please read below discription even though it is long

/*
	Using the object literal notation to overwrite the prototype changed the constructor 
	property so that it now points to Object instead of Person. This happened because 
	the constructor property exists on the prototype, not on the object instance. When a function 
	is created, its prototype property is created with a ­constructor property equal to the 
	function. This pattern completely overwrites the prototype object, which means that constructor 
	will come from the newly created (generic) object that was assigned to Person.prototype. 
	To avoid this, restore the constructor property to a proper value when overwriting the prototype.
*/

function PersonWithConstructor(name) {
	this.name = name;
}

PersonWithConstructor.prototype = {
	constructor: PersonWithConstructor,

	sayName: function() {
		console.log(this.name);
	},

	toString: function() {
		return "[Person" + this.name + "]";
	}
};

var person1 = new PersonWithConstructor('Bejoy');

console.log(person1 instanceof PersonWithConstructor); // true
console.log(person1.constructor === PersonWithConstructor); // true
console.log(person1.constructor === Object); // false

// --> arrow represents direct relationship
// --> X no direct relationship
// instance  --> X constructor
// instance  -->   prototype
// prototype -->   constructor

// An instance and its constructor are linked via the protype.

// Changing Prototype

// [[Prototype]] property just contains a pointer to the prototype.
// Any changes to the prototype are immediately available on any instance referencing it.

function PersonWithProtoChange(name) {
	this.name = name;
}

PersonWithProtoChange.prototype = {
	constructor: Person,

	sayName: function() {
		console.log(this.name);
	},

	toString: function() {
		return "[Person" + this.name + "]";
	}
};

var person1 = new PersonWithProtoChange("Bejoy");

console.log("sayHi" in person1); // false

// add a new method
PersonWithProtoChange.prototype.sayHi = function() {
	console.log("Hi");
}

person1.sayHi();  // outputs "Hi"

// effects on sealed and frozen objects

var person1 = new PersonWithProtoChange("Bejoy");

Object.freeze(person1);

PersonWithProtoChange.prototype.sayYolo = function() {
	console.log("YOLO");
}

person1.sayYolo(); // "YOLO"

// ex of built-in Object Prototypes

Array.prototype.sum = function() {
	return this.reduce(function(previous, current) {
		return previous + current;
	});
};

var numbers = [1,2,3,4,5];

var result = numbers.sum();

console.log(result); // 21


**[typed-utils](../README.md)**

> [Globals](../globals.md) / "Maybe"

# Module: "Maybe"

## Index

### Enumerations

* [MaybeTag](../enums/_maybe_.maybetag.md)

### Type aliases

* [Maybe](_maybe_.md#maybe)
* [None](_maybe_.md#none)
* [Some](_maybe_.md#some)

### Functions

* [isNone](_maybe_.md#isnone)
* [isSome](_maybe_.md#issome)
* [map](_maybe_.md#map)
* [none](_maybe_.md#none)
* [some](_maybe_.md#some)
* [valueOf](_maybe_.md#valueof)
* [valuesOf](_maybe_.md#valuesof)

## Type aliases

### Maybe

Ƭ  **Maybe**\<T>: [Some](_maybe_.md#some)\<T> \| [None](_maybe_.md#none)

*Defined in Maybe.ts:9*

#### Type parameters:

Name |
------ |
`T` |

___

### None

Ƭ  **None**: [tag: None]

*Defined in Maybe.ts:7*

___

### Some

Ƭ  **Some**\<T>: [tag: Some, value: T]

*Defined in Maybe.ts:6*

#### Type parameters:

Name |
------ |
`T` |

## Functions

### isNone

▸ **isNone**(`maybe`: [Maybe](_maybe_.md#maybe)\<unknown>): maybe is None

*Defined in Maybe.ts:20*

#### Parameters:

Name | Type |
------ | ------ |
`maybe` | [Maybe](_maybe_.md#maybe)\<unknown> |

**Returns:** maybe is None

___

### isSome

▸ **isSome**\<T>(`maybe`: [Maybe](_maybe_.md#maybe)\<T>): maybe is Some\<T>

*Defined in Maybe.ts:24*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`maybe` | [Maybe](_maybe_.md#maybe)\<T> |

**Returns:** maybe is Some\<T>

___

### map

▸ `Const`**map**\<T, U>(`maybe`: [Maybe](_maybe_.md#maybe)\<T>, `fn`: (value: T) => [Maybe](_maybe_.md#maybe)\<U>): [Maybe](_maybe_.md#maybe)\<U>

*Defined in Maybe.ts:13*

#### Type parameters:

Name |
------ |
`T` |
`U` |

#### Parameters:

Name | Type |
------ | ------ |
`maybe` | [Maybe](_maybe_.md#maybe)\<T> |
`fn` | (value: T) => [Maybe](_maybe_.md#maybe)\<U> |

**Returns:** [Maybe](_maybe_.md#maybe)\<U>

___

### none

▸ `Const`**none**(): [None](_maybe_.md#none)

*Defined in Maybe.ts:12*

**Returns:** [None](_maybe_.md#none)

___

### some

▸ `Const`**some**\<T>(`value`: T): [Some](_maybe_.md#some)\<T>

*Defined in Maybe.ts:11*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`value` | T |

**Returns:** [Some](_maybe_.md#some)\<T>

___

### valueOf

▸ `Const`**valueOf**\<T>(`some`: [Some](_maybe_.md#some)\<T>): T

*Defined in Maybe.ts:18*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`some` | [Some](_maybe_.md#some)\<T> |

**Returns:** T

___

### valuesOf

▸ `Const`**valuesOf**\<T>(`t`: [Maybe](_maybe_.md#maybe)\<T>[]): T[]

*Defined in Maybe.ts:28*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`t` | [Maybe](_maybe_.md#maybe)\<T>[] |

**Returns:** T[]

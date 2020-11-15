**[typed-utils](../README.md)**

> [Globals](../globals.md) / "mapAsync"

# Module: "mapAsync"

## Index

### Type aliases

* [MapAsync](_mapasync_.md#mapasync)

### Functions

* [mapAsyncConcurrent](_mapasync_.md#mapasyncconcurrent)
* [mapAsyncSerial](_mapasync_.md#mapasyncserial)

## Type aliases

### MapAsync

Ƭ  **MapAsync**: \<I, T>(items: I[], fn: (item: I) => Promise\<T>) => Promise\<T[]>

*Defined in mapAsync.ts:1*

## Functions

### mapAsyncConcurrent

▸ `Const`**mapAsyncConcurrent**\<I, T>(`items`: I[], `fn`: (item: I) => Promise\<T>): Promise\<T[]>

*Defined in mapAsync.ts:17*

#### Type parameters:

Name |
------ |
`I` |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`items` | I[] |
`fn` | (item: I) => Promise\<T> |

**Returns:** Promise\<T[]>

___

### mapAsyncSerial

▸ `Const`**mapAsyncSerial**\<I, T>(`items`: I[], `fn`: (item: I) => Promise\<T>): Promise\<T[]>

*Defined in mapAsync.ts:6*

#### Type parameters:

Name |
------ |
`I` |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`items` | I[] |
`fn` | (item: I) => Promise\<T> |

**Returns:** Promise\<T[]>

**[typed-utils](../README.md)**

> [Globals](../globals.md) / "Array"

# Module: "Array"

## Index

### Type aliases

* [Equals](_array_.md#equals)

### Functions

* [containEqualItems](_array_.md#containequalitems)
* [deduplicate](_array_.md#deduplicate)
* [intersection](_array_.md#intersection)
* [strictEquals](_array_.md#strictequals)

## Type aliases

### Equals

Ƭ  **Equals**\<T>: (a: T, b: T) => boolean

*Defined in Array.ts:1*

#### Type parameters:

Name |
------ |
`T` |

## Functions

### containEqualItems

▸ `Const`**containEqualItems**\<T>(`a`: T[], `b`: T[], `equals?`: [Equals](_array_.md#equals)\<unknown>): boolean

*Defined in Array.ts:4*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`a` | T[] | - |
`b` | T[] | - |
`equals` | [Equals](_array_.md#equals)\<unknown> | strictEquals |

**Returns:** boolean

___

### deduplicate

▸ `Const`**deduplicate**\<T>(`t`: T[], `equals?`: [Equals](_array_.md#equals)\<unknown>): T[]

*Defined in Array.ts:12*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`t` | T[] | - |
`equals` | [Equals](_array_.md#equals)\<unknown> | strictEquals |

**Returns:** T[]

___

### intersection

▸ `Const`**intersection**\<T>(`arrays`: T[][], `equals?`: [Equals](_array_.md#equals)\<unknown>): T[]

*Defined in Array.ts:20*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`arrays` | T[][] | - |
`equals` | [Equals](_array_.md#equals)\<unknown> | strictEquals |

**Returns:** T[]

___

### strictEquals

▸ `Const`**strictEquals**(`a`: unknown, `b`: unknown): boolean

*Defined in Array.ts:2*

#### Parameters:

Name | Type |
------ | ------ |
`a` | unknown |
`b` | unknown |

**Returns:** boolean

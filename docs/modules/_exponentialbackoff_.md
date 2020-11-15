**[typed-utils](../README.md)**

> [Globals](../globals.md) / "exponentialBackOff"

# Module: "exponentialBackOff"

## Index

### Functions

* [exponentialBackOff](_exponentialbackoff_.md#exponentialbackoff)
* [exponentialBackOffDelay](_exponentialbackoff_.md#exponentialbackoffdelay)

## Functions

### exponentialBackOff

▸ `Const`**exponentialBackOff**\<T>(`baseInterval`: number, `factor`: number, `deadline`: number, `fn`: (iteration: number, now: number) => Promise\<null \| T>): Promise\<null \| T>

*Defined in exponentialBackOff.ts:12*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`baseInterval` | number |
`factor` | number |
`deadline` | number |
`fn` | (iteration: number, now: number) => Promise\<null \| T> |

**Returns:** Promise\<null \| T>

___

### exponentialBackOffDelay

▸ `Const`**exponentialBackOffDelay**(`baseInterval`: number, `factor`: number, `iteration`: number): number

*Defined in exponentialBackOff.ts:3*

#### Parameters:

Name | Type |
------ | ------ |
`baseInterval` | number |
`factor` | number |
`iteration` | number |

**Returns:** number

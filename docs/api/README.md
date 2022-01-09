# API

`GraphController` has various methods and properties for manipulating graphs at runtime.
These are described in the following sections.
The following setup is omitted from the samples for brevity.

@[code](samples/setup.ts)

## Methods

### Filter by Node Type

Graphs can be filtered by node types.
The filter can be updated at runtime as seen below.

@[code{15-19}](samples/node-type-filter.ts)

### Resize

While graphs can be [configured to resize automatically](/config/#resizing), manual resizing is also possible.

@[code{15-17}](samples/resize.ts)

### Restart

Simulations are automatically restarted when required.
Should the need arise in some edge cases, simulations can be manually restarted using `GraphController.restart`.

An alpha value defining the *heat* of the simulation after restarting must be provided.

@[code{15-19}](samples/restart.ts)

### Shutdown

Graphs need to be integrated in framework lifecycles.
In particular, it is necessary to stop the simulation and the (optional) automatic resizing.

@[code{15-17}](samples/shutdown.ts)

::: danger
Not calling `GraphController.shutdown` when a graph is removed can cause memory leaks.
:::

## Properties

### Include Unlinked

Unlinked nodes, i.e., nodes without incoming or outgoing links, can be included or excluded.
The setting can be changed at runtime using the `includeUnlinked` property.
The property can also be read to get the current state.

@[code{15-19}](samples/include-unlinked.ts)

### Labels

Node and link labels can be toggled on and off using the respective property.
Both properties can also be read to get the current state.

@[code{15-19}](samples/labels.ts)

### Link Filter

Link filters can be changed at runtime by assigning a new value as seen below.
The property can also be read to get the current filter.

@[code{16-19}](samples/link-filter.ts)

### Node Types

An array of available and currently filtered node types can be read using properties seen below.

@[code{15-19}](samples/node-types.ts)

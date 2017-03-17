# react-perimeter 🚧

Create an invisible boundry around an element and respond when its breached.


## Usage

`react-perimeter` exports a single `Perimeter` component that will register a `mousemove` listener and calculate whether the current mouse position is within a boundry.

The boundry will be calculated using `getBoundingClientRect` and the `boundry` prop, which lets you define "padding" for the perimeter.

```jsx
<Perimeter
  onBreach={this.prefetch}
  boundry={60}>
  <button onClick={this.fetch}>Load More</button>
</Perimeter>
```

`Perimeter` by default will wrap its children in a `span` and use that to calculate the boundries. If you want to avoid the wrapping `span`, or you want the boundry to be calculated from another element, you can use a render callback.

```jsx
<Perimeter
  onBreach={this.prefetch}
  boundry={60}>
  {ref => (
    <button
      ref={ref}
      onClick={this.fetch}>Load More</button>
  )}
</Perimeter>
```
The render callback is passed a ref callback which should be passed to the `ref` prop of the element you want to use.

## Installation

```
yarn add react-perimeter
```


## API

### Props

Property  	| 	Type		|	Default		|	  Description
:-----------------------|:-----------------------------|:--------------|:--------------------------------
`boundry` |   `number` | `0` | The buffer around the element that defines the boundry of the perimeter
`onBreach` | `() => void` | `undefined` | A callback to be invoked when the boundry is breached
`once` | `boolean` | `false` | Whether the callback should only be invoked once (for example, when prefetching some data or chunks). If true all event listeners will be removed after `onBreach` is called.


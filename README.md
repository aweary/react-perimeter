# react-perimeter 🚧

Create an invisible padding around an element and respond when its breached.


## Usage Example

`react-perimeter` exports a single `Perimeter` component that will register a `mousemove` listener and calculate whether the current mouse position is within a padding.

The padding will be calculated using `getBoundingClientRect` and the `padding` prop, which lets you define "padding" for the perimeter.

```jsx
<Perimeter
  onBreach={this.prefetch}
  padding={60}>
  <button onClick={this.fetch}>Load More</button>
</Perimeter>
```

`Perimeter` by default will wrap its children in a `span` and use that to calculate the boundries. If you want to avoid the wrapping `span`, or you want the padding to be calculated from another element, you can use a render callback.

```jsx
<Perimeter
  onBreach={this.prefetch}
  padding={60}>
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
`padding` |   `number` | `0` | The buffer around the element that defines the padding of the perimeter
`onBreach` | `() => void` | `undefined` | A callback to be invoked when the perimeter is breached
`once` | `boolean` | `false` | Whether the callback should only be invoked once (for example, when prefetching some data or chunks). If true all event listeners will be removed after `onBreach` is called.
`mapListeners` | `EventListener => EventListener` | `undefined` | If provided, each event listeners (`resize`, `mousemove`) will be passed in, and the returned function will be used instead.

### Debouncing or Throttling

You may want to debounce or throttle the `mousemove` and `resize` event listeners if you've profiled your application and determined that they are noticeably affecting your performance. You can do so using the `mapListeners` prop, which takes a function that should accept an event listener and return a new function to be used instead.

```jsx
<Perimeter mapListeners={listener => debounce(listener, 20)}>
```

By letting you provide the mapped listener yourself, `react-perimeter` gives you full control over what debounce/throttle imeplementation you wish to use and its paramaters.


### Prefetching or Preloading

`react-perimeter` shines especially bright when used to prefetch or preload other components. Here is a small example that uses [`react-loadable`](https://github.com/thejameskyle/react-loadable) and [`react-router`](https://github.com/ReactTraining/react-router) to preload a route chunk when the cursor gets near a link:

```jsx
import React from 'react'
// Assume this is the component returned from `react-loadable`, not the page itself
import OtherPage from './routes/other-page'
import Perimeter from 'react-perimeter'
import { Link } from 'react-router'

const App = () => (
  <div>
    <h1>Home Page!</h1>
    <p>Here's some content</p>
    <Perimeter padding={100} onBreach={OtherPage.preload} once={true} >
      <Link to="other">Other Page</Link>
    </Perimeter>
  </div>
)

```

`react-loadable` provides an extremely useful static `preload` method that begins fetching the chunk for us. We pass this to `onBreach` so that
the preloading begins as soon as the mouse is within `100` pixels of the `Link` component. We also pass in the `once` prop to tell `react-perimeter`
that we only want to respond to the first breach. This means that, after the preload request has been issued, the listeners will be deregistered, removing any unneeded overhead.

We can go one step further and abstract this out into its own component, `PreloadLink`:

```jsx
const PreloadLink = ({ to, children, preload }) => (
  <Perimeter padding={100} onBreach={preload.preload} once={true}>
    <Link to={to}>{children}</Link>
  </Perimeter>
)
```

```jsx
<PreloadLink to="about" preload={AboutPage} />
```

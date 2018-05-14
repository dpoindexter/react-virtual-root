# react-virtual-root

`react-virtual-root` is a tool to make incrementally migrating web applications to React easier.

## The problem
React is already great for incremental  adoption. React doesn't need to own the entire page, and you can mount as many individual React applications into the DOM as you need, using `ReactDOM.render`. A common approach to migrating a traditional server-rendered web application to be a single React application is to mount individual features into the DOM as React roots as each feature is ported to React.

However, each of these React feature roots is isolated from each of the other roots on the page. Without a common ancestor, isolated React roots can't share context, event bubbling, or state.

If you're using something to externalize state already (like Redux) and you don't care about event bubbling or context, you probably don't need this. Just use `ReactDOM.render` directly.

## Virtual root
Calling `ReactDOM.render(<App />, element)` puts React in charge of the contents of `element`. If element is the root node of an existing server-rendered page that's only partially migrated to React, that's going to cause a problem.  `react-virtual-root` uses portals to mount React-rendered features into specific subtrees, while keeping the existing DOM in place in all the other subtrees. You can treat your page as a single React application while porting more and more of the functionality into React.

## Example

```javascript
// entry.js
import { render } from 'react-virtual-root/dom';
import Application from './Application';

const rootElement = document.getElementById('rootElement');

render(<Application />, rootElement);
```

```javascript
// Application.js
import { VirtualRoot, Node } from 'react-virtual-root';
import Feature1 from './Feature1';
import Feature2 from './Feature2';

const Application = () => {
    return (
        <VirtualRoot>
            <Node id="feature1">
                <Feature1 />
            </Node>
            <Node selector=".feature2">
                <Feature2 />
            </Node>
        </VirtualRoot>
    );
}
```

## Incremental migration helper

You're probably bundling your application 
using something like Webpack. And you should be making sure that production builds are using `NODE_ENV="production"`. Just like React, `react-virtual-root` has a dev mode. When `NODE_ENV` is not set to `production`, you can call `ReactVirtualRoot.migrationReport()` in the browser's console to produce output describing how much of the root element is rendered by React, and how much is preexisting DOM. Use this to see if you're done migrating -- when you are, remove `react-virtual-root` and just render the whole thing directly.

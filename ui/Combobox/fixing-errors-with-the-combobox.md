## Debugging UX / performance issues on the downshift + radix combobox

writing these docs here because they might be helpfup in the future

### ref prop not applied correctly

```
app-index.js:32 downshift: The ref prop "ref" from {some downshift function like "getInputProps"} was not applied correctly on your element.
```

fix: [Downshift](https://www.downshift-js.com/downshift/) reuqires that the elements are always rendered. This means that since we're using downshift inside a [radix popover](https://www.radix-ui.com/primitives/docs/components/popover), we must use the `forceMount` prop to make the popover stay in the DOM

### slow, unresponsive, or unuseable comoboxbox inside a modal/dialog

pass `allowScrollOverlay` to the combobox's parent modal content, and remove `forceMountPortal`. The comobox will work, but you'll get downshift errors.

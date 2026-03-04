# CSS Computed Styles Investigation

**Selected element:** ```.task``` (Tasc card)  
**Reason for selection:** Non-trivial styling: combines SCSS variables, conditional classes (```.done```), hover states, and layout rules.

## CSS Analysis

| Property | Computed Value | Source (Styles Panel) | Generated CSS Location | Original SCSS Source |
| -------- | -------------- | --------------------- | ---------------------- | -------------------- | 
| ```background-color``` | ```#95b1c3``` | ```.task { background: $task-bg; }``` | ```dist/assets/index.DI81HA4j.css:83``` | ```$task-bg: #95b1c3``` |
| ```border-radius``` | ```8px``` | ```.task { border-radius: $radius; }``` | ```dist/assets/index.DI81HA4j.css:84``` | ```$radius: 8px```|
| ```box-shadow``` | ```0 2px 4px rgba(0,0,0,.1)``` | ```.task { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }``` |  ```dist/assets/index.DI81HA4j.css:85``` | ```Directly defined in SCSS``` |
| ```opacity``` | ```0.6``` | ```.task.done { opacity: 0.6; }``` | ```dist/assets/index.DI81HA4j.css:97``` | ```Directly defined in SCSS```|
| ```transform``` | ```none``` | ```.task:hover { transform: translateX(0); }``` | ```dist/assets/index.DI81HA4j.css:94``` | ```Directly defined in SCSS```|

## Notes on investigation:
* Computed value is what the browser finally applies after cascade, inheritance, and conditional rules.
* The Styles panel shows all matching CSS rules, including overridden ones (struck through).
* Generated CSS location comes from the compiled file. Source maps allow mapping back to the original .scss line.

## Tracing back via source maps
Using Chrome DevTools:
1. Inspect the element (```.task```).
2. In the Styles panel, hover over the file name to see the source map pointer, which shows the original SCSS file and line.
3. This allows identification of the original variable, e.g., ```$task-bg``` for ```background-color```.
4. Conditional styles like ```.done``` are applied dynamically in React. The class assignment itself isn’t part of CSS, but once applied, the CSS rule applies.

## Cases of ambiguity, indirect or breakdown
### 1. Inherited Styles from Parent Elements
* Some CSS properties (like ```color```, ```font-family```, ```line-height```) are inherited from parent elements.
* In DevTools, the computed value may come from a parent element, not the rule you think is applied directly.
* Ambiguity arises because the computed style doesn’t tell you which ancestor rule is responsible.
 ``` css
  body { color: #213547; }
  .task { } /* no color set */ 
  ```
* The ```.task``` text will show ```color: #213547``` in computed styles, but there’s no ```.task { color: ... }``` rule.
### 2. Overridden Rules (Cascade Specificity)
* If multiple CSS rules target the same property, only the **most specific / last rule wins.**
* DevTools shows struck-through rules, but you must check all possible overrides to know the source.
* Ambiguity occurs when multiple selectors in different files have similar specificity.
``` scss
.task { background: #95b1c3; }
._task_fi841_1 { background: #d6dceb; } // hover
```
* Computed value depends on **hover state or class addition**, making it non-obvious where the value comes from.
### 3. Styles Applied via CSS Modules with Hashing
* CSS Modules generate hashed class names (e.g., ```._task_fi841_1```).
* In DevTools, the computed value shows the **hashed class**, but the original ```.task``` selector is hidden.
* Without source maps, it’s impossible to know which authored class or variable generated the rule.
``` css
._task_fi841_1 { background: #95b1c3; }
```
* You can’t tell whether this came from ```.task``` or another nested selector if source maps are missing.

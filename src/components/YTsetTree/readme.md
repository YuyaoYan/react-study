### 树形组件

模仿 antd 的 tree 写的树形组件

| props        | type     | description              | default value |
| ------------ | -------- | ------------------------ | ------------- |
| addIcon      | function | callback when click icon |               |
| delIcon      | function | ··                       |               |
| editIcon     | function | ··                       |               |
| treeData     | object   | treeData                 |               |
| onMouseEnter | function | hover event              |               |
| onMouseLeave | function | hover event              |               |
| expandedKeys | array    | auto expanded keys       | []            |
| searchValue  | string   | search value             | ""            |

eg:

```html
<div className="tree-container">
  <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
  <TreeNode
    treeData="{this.treeData}"
    addIcon="{this.onAddFun}"
    delIcon="{this.onDelFun}"
    editIcon="{this.onEditFun}"
    onMouseEnter="{this.onMouseEnter}"
    onMouseLeave="{this.onMouseLeave}"
    expandedKeys="{expandedKeys}"
    searchValue="{searchValue}"
  />
</div>
```

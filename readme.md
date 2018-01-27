# Table.js

**Table.js** let you manipulate complex tables with Javascript. Version 0.2.

See [examples online](http://www.latex-tables.com/projects/TableJS/).

### About tables and cells

An `HTMLTableCellElement` is a `<TD>` or `<TH>` element.

### Create a Table object

```javascript
var mytable = new Table(document.querySelector("#table"));
```

### Methods

#### Table.cell(Number x, Number y, Optional Matrix matrix)

Returns the cell at **absolute** position `[x,y]`. Negative numbers start at the end (i.e. `[-1,-1]` is the last cell from the last row). To access a cell at **relative** position `[x,y]`, use `mytable.rel(x,y)`.
#### Table.cells(String selector)
#### Table.cells(Array XYOriginPosition, String selector)
#### Table.cells(HTMLTableCellElement origin, String selector)

Return an array of cells. See the next section.

```javascript
var cells = mytable.cells("0\\1...");
cells = mytable.cells([2,3],"-1");
cells = mytable.cells(mycell, ">1...");
cells = mytable.cells([3,0], "0-1..."); // Access the fourth column
```
#### Table.clearCache()
Clears the cache.

#### Table.first(Misc cell)
Returns the first `HTMLTableCellElement` of the table.

#### Table.isAChildCell(Misc cell)
Returns `true` if `cell` is a `HTMLTableCellElement` and a cell of the table.

#### Table.insertCol(Optional Number position)

Insert a column at the position `position` (or at the end of the table, if not specified) and insert cells inside it like the column before it (or after it if it's the first column).

#### Table.insertRow(Optional Number position)

Insert a row at the position `position` (or at the end of the table, if not specified) and insert cells inside it like the row before it (or after it if it's the first row).

#### Table.last()
Returns the last `HTMLTableCellElement` of the table.

#### Table.matrix(Optional Boolean alwaysInterpretZeroRowSpan)

`Table.matrix()` returns an `Array` of `Arrays` of `Objects`. Each subarray represents a row and each object a cell. Cells that span more than a row or more than a col are represented as "Ghost object" that references the original cell. A normal `Cell Object` look like this :

```
{   cell : a <TD> or <TH> element,
    x : column number,
    y: row number
}
```

A `Ghost Cell Object` look like this :
```
{   refCell : a Cell Object,
    x : column number,
    y: row number
}
```
**Example** :

```javascript
matrix = mytable.matrix();
```

**Visual example** : A table that look like this :
```
+-------------------+
|       Title       |
+-------------------+
|      |  B  |  C   |
|  A   |------------|
|      |  D  |  E   |
+-------------------+
```

will returns an array like this (where `X` are Cell Object and `#` are Ghost Cell Object) :
```
[ [ X, #, #],
  [ X, X, X],
  [ #, X, X] ]
```

Using `HTMLTableElement.rows`, you'd only get the `X`, which make it difficult to calculate absolute position of cells.

If the optional `alwaysInterpretZeroRowSpan` argument is set to `true`, the matrix will interpret `rowspan="0"` (which is part of the HTML5 standard) even if the browser don't support it. By default, this argument is set to `false` (`rowspan="0"` will only be interpreted if it is supported by the browser). (Note that `rowspan=0` is not supported for all methods of this utility).

#### Table.merge(NodeList||Array cells, Optional Function callback)
Merge all `HTMLTableCellElement` in `cells`. Whenever cells  are about to be merged, `callback` is called with four arguments : the first is the future value of the colspan attribute, the second is the future value of the rowspan attribute, the third is the cell that will be kept and the fourth is an `Array` of cells that will be removed.

#### Table.mergeHorizontal(NodeList||Array cells, Optional Function callback)
Merge horizontally all `HTMLTableCellElement` in `cells`. Whenever cells are about to be merged, `callback` is called with four arguments : the first is the future value of the colspan attribute, the second is the future value of the rowspan attribute, the third is the cell that will be kept and the fourth is an `Array` of cells that will be removed.

#### Table.mergeVertical(NodeList||Array cells, Optional Function callback)
Merge vertically all `HTMLTableCellElement` in `cells`.  Whenever cells are about to be merged, `callback` is called with four arguments : the first is the future value of the colspan attribute, the second is the future value of the rowspan attribute, the third is the cell that will be kept and the fourth is an `Array` of cells that will be removed.

#### Table.normalize(Optional Matrix matrix)
Normalize the table and returns a boolean value that indicates if the table was modified. `rowspan` and `colspan` attributes are reduced to a minimal value, empty rows are removed and the `colspan` attribute of the last cell of each row is expanded if there are missing cells in the row. 

#### Table.position(HTMLTableCellElement cell, Optional Matrix matrix)

Returns the cell real position inside the table as an `{x:x, y:y}` Object. If `matrix` is not specified, a matrix of the table will be calculated via `Table.matrix()` which uses a lot of ressources. If you have a lot of cells' positions to calculate, you should cache the matrix.

```javascript
var matrix = mytable.matrix(),
    position = mytable.position(mycell, matrix);
console.log("Position : (" + position.x + "," + position.y + ")");
```

#### Table.rel(Number x, Number y)
Returns the cell found at the relative position `[x,y]`.

#### Table.removeCol(Optional Number position)

Remove each cell located at position `position` for each row. Negative position start at the end (i.e. `-1` is the last cell from each row). Default value for `position` is `-1`.

#### Table.removeRow(Optional Number position)

Remove the row located at position `position` and move each cell with a rowspan attribute other than `1` to the next row if possible. Negative position start at the end (i.e. `-1` is the last row). Default value for `position` is `-1`.

#### Table.split(HTMLTableCellElement||Array||NodeList cells, Optional Function callback)

Split each cell specified in the first argument and call `callback`, if specified, for each cell created with the cell as the first argument.

```javascript
mytable.split(mytable.cell(0,3), function(cell){
    cell.innerHTML = "New cell";
});
```

### Properties

#### Table.element

Returns the `HTMLTableElement` associated with the `Table` Object.

### Accessing a table's cells

You can use `Table.cells()` to access cells from a table with a selector. If an origin is not specified, the origin is the first cell.

#### Operators

* `>` : Move to the next cell at the right
* `<` : Move to the previous cell at the left
* `+` : Move to the cell over
* `-` : Move to the cell under
* `\` : Move to the cell at the diagonal bottom right. In a `String`, you must use `\\` because it's the escape character.
* `...` : Repeat the selector until it's not possible anymore. May cause overflow issues.

#### Select cells
* `0` : Select the origin cell
* `X` : Select the next `X` cells using the last used operator.

#### Examples

This example change the background color of the cells in the [x,x] diagonal to red.
```javascript
mytable.cells("0\\1...").forEach(function(cell){
    cell.style.backgroundColor = "red";
});
```

Get the cell under a cell called `mycell` :
```javascript
var under = mytable.cells(mycell, "-1")[0];
```
Get the cell at the right of a cell called `mycell` :
```javascript
var right = mytable.cells(mycell, ">1")[0];
```

### Undocumented methods
`window.Table` has some public methods or properties listed here. Support is not guaranted.

* **`Number window.Table.rowSpan(HTMLTableCellElement cell)`**
* **`Boolean window.Table.isACell(Misc cell)`**
* **`window.Table.maxIteration`**. Default value : `50`. Used for merging cells.
* **`window.Table.cache`**. Default value : `true`. Better support for cache is on the way.

### Bugs, issues and feature requests

Please report any bugs by creating an issue. Same for feature requests. This is an alpha release, so beware to use it in production.

### To-Do

* Fix bugs
* Improve speed
* Support `<COL>`, `<CAPTION>` and `<COLGROUP>` elements
* Management of `<THEAD>`, `<TBODY>` and `TFOOT` elements

### License

**Table.js** is released under the MIT License.
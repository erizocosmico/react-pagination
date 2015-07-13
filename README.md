# react-pagination

React pagination is a very simple yet configurable pagination component built with React.

## API

When included in the browser via ```react-pagination.min.js``` everything is exposed on the ```reactPagination``` variable.

React pagination exposes two things:
* ```pageRange```: a function that returns a range of pages given a number of parameters (discussed later)
* ```Pagination```: the component itself

### pageRange
Returns an array with the range of pages to be displayed according to the params passed.
**Params:**
* ```selected``` The selected page number
* ```numPages``` The total number of pages
* ```num``` The number of pages to display

Returns an array of pages (numbers).

**Examples:**
```javascript
pageRange(1, 10, 5);
// => [1, 2, 3, 4, 5]

pageRange(2, 10, 5);
// => [1, 2, 3, 4, 5]

pageRange(3, 10, 5);
// => [1, 2, 3, 4, 5]

pageRange(4, 10, 5);
// => [2, 3, 4, 5, 6]

pageRange(5, 10, 5);
// => [3, 4, 5, 6, 7]

pageRange(8, 10, 5);
// => [6, 7, 8, 9, 10]

pageRange(9, 10, 5);
// => [7, 8, 9, 10]

pageRange(10, 10, 5);
// => [8, 9, 10]
```

### Pagination
Pagination is the Pagination component itself, it can receive the following properties:
* ```onPageChange``` {Function} Triggered when the user clicks on a page and the pages should be changed. **Required**.
* ```total``` {Number} Total number of pages. **Required**.
* ```initialPage``` {Number} Initially selected page. **Default: 1**.
* ```pagesToDisplay``` {Number} Number of pages to display. **Default: 5**.
* ```firstPageText``` {string} Text of the "First page" button. Can contain HTML. **Default: First page**.
* ```prevPageText``` {string} Text of the "Previous page" button. Can contain HTML. **Default: Previous page**.
* ```nextPageText``` {string} Text of the "Next page" button. Can contain HTML. **Default: Next page**.
* ```lastPageText``` {string} Text of the "Last page" button. Can contain HTML. **Default: Last page**.
* ```showFirstLast``` {boolean} Show "First page" and "Last page" buttons. **Default: true**.
* ```showPrevNext``` {boolean} Show "Previous page" and "Next page" buttons. **Default: true**.

**Example:**
```javascript
React.render(
  <Pagination initialPage={1} total={10} onPageChange={(page) => console.log('Selected page ' + page)}) />,
  document.body
);
```

The pagination component is completely CSS agnostic. It just renders the HTML and comes with absolutely no style.

It renders something like:
```html
<ul class="pagination">
  <li class="pagination__page pagination__page--first">First page</li>
  <li class="pagination__page pagination__page--prev">First page</li>
  <li class="pagination__page pagination__page--selected">1</li>
  <li class="pagination__page">2</li>
  <li class="pagination__page">3</li>
  <li class="pagination__page">4</li>
  <li class="pagination__page">5</li>
  <li class="pagination__page pagination__page--next">Next page</li>
  <li class="pagination__page pagination__page--last">First page</li>
</ul>
```

React-pagination uses BEM as the naming convention for the classes.

**List of classes:**
* ```pagination```: ul container
* ```pagination__page```: li children
* ```pagination__page--selected```: selected page
* ```pagination__page--first```: first page
* ```pagination__page--prev```: prev page
* ```pagination__page--next```: next page
* ```pagination__page--last```: last page

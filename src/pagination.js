import React from 'react';

/**
 * Returns an array with the range of pages to be displayed according to the params passed
 * @param {Number} selected The selected page number
 * @param {Number} numPages The total number of pages
 * @param {Number} num      The number of pages to display
 * @return {Array<Number>}
 */
function pageRange(selected, numPages, num) {
  let selectedPos = Math.ceil(num / 2);
  let start = (selected < selectedPos) ? 1
    : selected - selectedPos + 1;
  let len = (numPages < start + num - 1) ? numPages - start + 1
    : num;

  return Array
    .apply(null, Array(len))
    .map((u, i) => start + i);
}

let PaginationItem = React.createClass({
  render() {
    return (
      <li className={'pagination__page' + (this.props.className ? ' pagination__page--' + this.props.className : '')}
        onClick={() => this.props.onPageChange(this.props.page)} dangerouslySetInnerHTML={{__html: this.props.display + ''}} />
    );
  }
});

let Pagination = React.createClass({
  propTypes: {
    onPageChange:   React.PropTypes.func.isRequired,
    total:          React.PropTypes.number.isRequired,
    initialPage:    React.PropTypes.number,
    pagesToDisplay: React.PropTypes.number,
    firstPageText:  React.PropTypes.string,
    prevPageText:   React.PropTypes.string,
    nextPageText:   React.PropTypes.string,
    lastPageText:   React.PropTypes.string,
    showFirstLast:  React.PropTypes.bool,
    showPrevNext:   React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      initialPage: 1,
      pagesToDisplay: 5,
      firstPageText: 'First page',
      prevPageText: 'Previous page',
      nextPageText: 'Next page',
      lastPageText: 'Last page',
      showFirstLast: true,
      showPrevNext: true
    };
  },

  getInitialState() {
    return {
      page: this.props.initialPage
    };
  },

  onPageChange(page) {
    this.setState({page: page});
    this.props.onPageChange(page);
  },

  render() {
    let self = this;
    let currentPage = this.state.page;

    let paginationItem = function (className, page, text) {
      return (
        <PaginationItem className={className}
          onPageChange={self.onPageChange}
          page={page}
          display={text}
          key={text} />
      );
    };

    let pages = pageRange(currentPage, this.props.total, this.props.pagesToDisplay)
      .map(function (p) {
        let isCurrentPage = currentPage === p;
        return paginationItem(isCurrentPage ? 'selected' : '', p, p);
      });

    let firstPage = this.props.showFirstLast && currentPage !== 1 ?
      paginationItem('first', 1, this.props.firstPageText) : null;

    let prevPage = this.props.showPrevNext && currentPage > 1 ?
      paginationItem('prev', currentPage - 1, this.props.prevPageText) : null;

    let nextPage = this.props.showPrevNext && currentPage !== this.props.total ?
      paginationItem('next', currentPage + 1, this.props.nextPageText) : null;

    let lastPage = this.props.showFirstLast && currentPage !== this.props.total ?
      paginationItem('last', this.props.total, this.props.lastPageText) : null;

    return (
      <ul className='pagination'>
        {firstPage}
        {prevPage}
        {pages}
        {nextPage}
        {lastPage}
      </ul>
    );
  }
});

export {pageRange, Pagination};

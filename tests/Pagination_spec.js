import {Pagination, pageRange} from '../src/pagination';
import React from 'react/addons';

let pagination;
let TestUtils = React.addons.TestUtils;

function render(props) {
  pagination = TestUtils.renderIntoDocument(
    <Pagination {...props} />
  );
}

function getPages() {
  let ul = TestUtils.findRenderedDOMComponentWithTag(pagination, 'ul');
  return ul.getDOMNode().getElementsByTagName('li');
}

function clickPage(p) {
  TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li')[p - 1]);
}

function isPageSelected(p) {
  expect(getPages()[p - 1].className.indexOf('pagination__page--selected') >= 0).toBe(true);
}

function pagesEqual(results) {
  let pages = getPages();

  expect(pages.length).toBe(results.length);

  [].forEach.call(pages, (page, i) => {
    expect(page.innerHTML).toBe(results[i]);
  });
}

describe('Pagination', () => {
  describe('when it is rendered with all props', () => {
    let _page;
    beforeEach(() => {
      render({
        onPageChange: (page) => _page = page,
        total: 10,
        initialPage: 1,
        pagesToDisplay: 5,
        prevPageText: 'Prev',
        nextPageText: 'Next',
        lastPageText: 'Last',
        firstPageText: 'First',
        showFirstLast: true,
        showPrevNext: true,
      });
    });

    it('should render the number of pages given plus next and last', () => {
      pagesEqual(['1', '2', '3', '4', '5', 'Next', 'Last']);
    });

    it('should set the first page active', () => {
      isPageSelected(1);
    });

    it('should set the custom text on the next button', () => {
      let pages = getPages();
      expect(pages[pages.length - 2].innerHTML).toBe('Next');
    });

    it('should set the custom text on the last button', () => {
      let pages = getPages();
      expect(pages[pages.length - 1].innerHTML).toBe('Last');
    });

    describe('when a page is selected', () => {
      beforeEach(() => clickPage(4));

      it('should have rendered the new pages', () => {
        pagesEqual(['First', 'Prev', '2', '3', '4', '5', '6', 'Next', 'Last']);
      });

      it('should have changed the selected page', () => {
        isPageSelected(5);
      });

      it('onPageChange should have been called with the selected page', () => {
        expect(_page).toBe(4);
      });

      describe('when First is clicked', () => {
        beforeEach(() => clickPage(1));

        it('should have rendered the new pages', () => {
          pagesEqual(['1', '2', '3', '4', '5', 'Next', 'Last']);
        });

        it('should have changed the selected page', () => {
          isPageSelected(1);
        });

        it('onPageChange should have been called with the selected page', () => {
          expect(_page).toBe(1);
        });
      });

      describe('when Previous is clicked', () => {
        beforeEach(() => clickPage(2));

        it('should have rendered the new pages', () => {
          pagesEqual(['First', 'Prev', '1', '2', '3', '4', '5', 'Next', 'Last']);
        });

        it('should have changed the selected page', () => {
          isPageSelected(5);
        });

        it('onPageChange should have been called with the selected page', () => {
          expect(_page).toBe(3);
        });
      });

      describe('when Next is clicked', () => {
        beforeEach(() => clickPage(8));

        it('should have rendered the new pages', () => {
          pagesEqual(['First', 'Prev', '3', '4', '5', '6', '7', 'Next', 'Last']);
        });

        it('should have changed the selected page', () => {
          isPageSelected(5);
        });

        it('onPageChange should have been called with the selected page', () => {
          expect(_page).toBe(5);
        });
      });

      describe('when Last is clicked', () => {
        beforeEach(() => clickPage(9));

        it('should have rendered the new pages', () => {
          pagesEqual(['First', 'Prev', '8', '9', '10']);
        });

        it('should have changed the selected page', () => {
          isPageSelected(5);
        });

        it('onPageChange should have been called with the selected page', () => {
          expect(_page).toBe(10);
        });
      });
    });
  });

  describe('when it is rendered without navigation pages', () => {
    let _page;
    beforeEach(() => {
      render({
        onPageChange: (page) => _page = page,
        total: 10,
        initialPage: 4,
        pagesToDisplay: 5,
        showFirstLast: false,
        showPrevNext: false,
      });
    });

    it('should not show the navigation pages', () => {
      pagesEqual(['2', '3', '4', '5', '6']);
    });

    it('should have the initialPage selected', () => {
      isPageSelected(3);
    });
  });

  describe('when it is rendered with navigation pages but without custom text', () => {
    let _page;
    beforeEach(() => {
      render({
        onPageChange: (page) => _page = page,
        total: 10,
        initialPage: 4,
        pagesToDisplay: 5
      });
    });

    it('should not show the navigation pages', () => {
      pagesEqual(['First page', 'Previous page', '2', '3', '4', '5', '6', 'Next page', 'Last page']);
    });
  });
});

const searchClient = algoliasearch(
    'testingT4WFG88MK7',
    'b50186ba4da247be88afb1e84ef318f0'
  );
  const search = instantsearch({
    searchFunction(helper) {
    const container = document.querySelector('#hits');
    const container5 = document.querySelector('h3');
    const container6 = document.querySelector('#color-list');
    container.style.display = helper.state.query === '' ? 'none' : '';
    container5.style.display = helper.state.query === '' ? 'none' : '';
    container6.style.display = helper.state.query === '' ? 'none' : '';
    helper.search();
    },
    indexName: 'Test_01',
    searchClient,
    routing: true,
  });

  search.addWidgets(
    [instantsearch.widgets.configure({
      hitsPerPage: 3,
      distinct: true,
      enablePersonalization: true,
    })]);

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Ψάξε για φορέματα/παντελόνια...',
      searchAsYouType: true,
      autofocus: true,
      showReset: false,
      showSubmit: false,
      cssClasses: {
        input: "search-box-celestino",
      }
    })
  ]);

  search.addWidgets([
    instantsearch.widgets.hits({
      container: '#hits',
      limit: 3,
      templates: {
        item: `
        <div class="container" href="{{link}}">
          <div class="card">
            <div class="box">
              <img src="{{image}}" align="left" alt="{{name}}" class="sizer" />
              <span class="caption">
                <div class="hit-name">
                  {{#helpers.highlight}}{ "attribute": "title_gr" }{{/helpers.highlight}}
                <div>{{color_gr}}</div>
                <div class="hit-description">
                  {{#helpers.highlight}}{ "attribute": "final_price" }{{/helpers.highlight}}€
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
      `,
      empty: 'Δε βρέθηκε τίποτα για <q>{{ query }}</q>',
      },
    })
  ]);

  search.addWidgets([instantsearch.widgets.refinementList({
    container: '#color-list',
    attribute: 'color_gr',
    limit: 3,
    showMore: true,
    sortBy: ['count:desc', 'name:asc'],
    templates: {
      item: `
        <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
          <span>{{label}} ({{count}})</span>
        </a>
      `,
      showMoreText: `
      {{#isShowingMore}}
        Λιγότερα
      {{/isShowingMore}}
      {{^isShowingMore}}
        Περισσότερα
      {{/isShowingMore}}
    `,
    searchableNoResults: 'Κανένα αποτέλεσμα',
    },
  }),
])

// search.addWidgets([instantsearch.widgets.refinementList({
//   container: '#category-list',
//   attribute: 'category_gr',
//   limit: 3,
//   showMore: true,
//   sortBy: ['count:desc', 'name:asc'],
//   templates: {
//     item: `
//       <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
//         <span>{{label}} ({{count}})</span>
//       </a>
//     `,
//     showMoreText: `
//     {{#isShowingMore}}
//       Λιγότερα
//     {{/isShowingMore}}
//     {{^isShowingMore}}
//       Περισσότερα
//     {{/isShowingMore}}
//   `,
//   searchableNoResults: 'Κανένα αποτέλεσμα',
//   },
// }),
// ])

  search.start();


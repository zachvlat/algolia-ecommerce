//credentials
const searchClient = algoliasearch(
    'testingT4WFG88MK7', //<----Application ID
    'b50186ba4da247be88afb1e84ef318f0' //<----Search API Key
  );
  const search = instantsearch({
    searchFunction(helper) {
      //hide elements
    const container = document.querySelector('#hits');
    const container6 = document.querySelector('#color-list');
    const container2 = document.querySelector("#sub-categories");
    const container3 = document.querySelector(".hit-results");
    container.style.display = helper.state.query === '' ? 'none' : '';
    container2.style.display = helper.state.query === '' ? 'none' : '';
    container3.style.display = helper.state.query === '' ? 'none' : '';
    container6.style.display = helper.state.query === '' ? 'none' : '';
    helper.search();
    },
    indexName: 'Test_01', //<----Index
    searchClient,
    routing: true,
  });

  //search configuration
  search.addWidgets(
    [instantsearch.widgets.configure({
      hitsPerPage: 3,
      distinct: true,
      enablePersonalization: true,
    })]);

    //search box initialization
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Αναζήτηση',
      searchAsYouType: true,
      autofocus: true,
      showReset: false,
      showSubmit: false,
      cssClasses: {
        input: "search-box-celestino",
        submitIcon: "fa-search",
      }
    })
  ]);

  //hits initialization
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
      empty: `<div>
      <p>Δεν βρέθηκε τίποτα σχετικά με {{ query }}</p>
      <br>
      <a role="button" href=".">Καθαρισμός όλων</a>
    </div>`,
      },
    })
  ]);

  //color list
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

//category list
search.addWidgets([instantsearch.widgets.refinementList({
  container: '#category-list',
  attribute: 'category_gr',
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

//gender list
search.addWidgets([instantsearch.widgets.refinementList({
  container: '#gender-list',
  attribute: 'gender_gr',
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

  search.start();
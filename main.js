const searchClient = algoliasearch(
    'testingT4WFG88MK7',
    'b50186ba4da247be88afb1e84ef318f0'
  );
  const search = instantsearch({
    searchFunction(helper) {
    const container = document.querySelector('#hits');
    const container2 = document.querySelector('#categories-gr');
    const container3 = document.querySelector('#colors');
    const container4 = document.querySelector('#occasion_gr');
    container.style.display = helper.state.query === '' ? 'none' : '';
    container2.style.display = helper.state.query === '' ? 'none' : '';
    container3.style.display = helper.state.query === '' ? 'none' : '';
    container4.style.display = helper.state.query === '' ? 'none' : '';
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
      limit: 1,
      templates: {
        item: `
        <div class="container" href="{{link}}">
          <div class="card">
            <div class="box">
              <img src="{{image}}" align="left" alt="{{name}}" class="sizer" />
                <div class="hit-name">
                  {{#helpers.highlight}}{ "attribute": "title_gr" }{{/helpers.highlight}}
                <div>{{color_gr}}</div>
                <div class="hit-description">
                  {{#helpers.highlight}}{ "attribute": "final_price" }{{/helpers.highlight}}€
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      empty: 'Δε βρέθηκε τίποτα για <q>{{ query }}</q>',
      },
    })
  ]);

  search.addWidgets([
    instantsearch.widgets.hits({
      container: "#categories-gr",
      limit:3,
      attributeName: "subcategory_gr",
      templates:{
        empty: 'Δε βρέθηκε τίποτα για <q>{{ query }}</q>',
        item:`
        <div class="filter-widgets">
          <div>{{subcategory_gr}} </div>
        </div>
        `
      }
    })
  ]);

  search.addWidgets([
    instantsearch.widgets.hits({
      container: "#colors",
      limit:3,
      attributeName: "color_gr",
      templates:{
        empty: 'Δε βρέθηκε τίποτα για <q>{{ query }}</q>',
        item:`
        <div class="filter-widgets">
          <div>{{color_gr}} </div>
        </div>
        `
      }
    })
  ]);

  search.addWidgets([
    instantsearch.widgets.hits({
      container: "#occasion_gr",
      limit:3,
      attributeName: "occasion_gr",
      templates:{
        empty: 'Δε βρέθηκε τίποτα για <q>{{ query }}</q>',
        item:`
        <div class="filter-widgets">
          <div>{{occasion_gr}} </div>
        </div>
        `
      }
    })
  ]);

  search.start();
const searchClient = algoliasearch(
    'testingT4WFG88MK7',
    'b50186ba4da247be88afb1e84ef318f0'
  );
  const search = instantsearch({
    searchFunction(helper) {
    const container = document.querySelector('#hits');
    const container2 = document.querySelector('#sub-categories');
    const container3 = document.querySelector('#colors');
    container.style.display = helper.state.query === '' ? 'none' : '';
    container2.style.display = helper.state.query === '' ? 'none' : '';
    container3.style.display = helper.state.query === '' ? 'none' : '';
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
      container: "#sub-categories",
      limit:3,
      attributeName: "subcategory_gr",
      templates:{
        empty: 'Δε βρέθηκε τίποτα για <q>{{ query }}</q>',
        item:`
        <div class="filter-widgets">
          <div>{{subcategory_gr}}</div>
        </div>
        `
      }
    })
  ]);

  search.addWidgets([
    instantsearch.widgets.hits({
      container: "#colors",
      limit:5,
      attributeName: "color_gr",
      templates:{
        empty: 'Δε βρέθηκε τίποτα για <q>{{ query }}</q>',
        item:`
        <div class="filter-widgets">
          <div>{{color_gr}}</div>
        </div>
        `
      }
    })
  ]);


  //autocomplete
  const autocomplete = instantsearch.connectors.connectAutocomplete(
    ({ indices, refine, widgetParams }, isFirstRendering) => {
      const { container, onSelectChange } = widgetParams;
      if (isFirstRendering) {
        container.html('<select id="ais-autocomplete"></select>');
        container.find('select').selectize({
          options: [],
          valueField: 'query',
          labelField: 'query',
          highlight: false,
          onType: refine,
          onBlur() {
            refine(this.getValue());
          },
          onChange(value) {
            refine(value);
            onSelectChange({
              category: this.getOption(value).data('subcategory_gr'),
              query: value,
            });
          },
          score() {
            return function() {
              return 1;
            };
          },
          render: {
            option(item) {
              // prettier-ignore
              const [category] = item.instant_search.facets.exact_matches.categories;
              return `
                <div class="option" data-category="${category.value}">
                  ${item.query} in <i>${category.value}</i>
                </div>
              `;
            },
          },
        });
  
        return;
      }
  
      const [select] = container.find('select');
  
      select.selectize.clearOptions();
      indices.forEach(index => {
        index.results.hits.forEach(hit => select.selectize.addOption(hit));
      });
      select.selectize.refreshOptions(select.selectize.isOpen);
    }
  );

  search.start();
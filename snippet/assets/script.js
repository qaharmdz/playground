/**
 * DataTables
 */
$.extend($.fn.dataTable.defaults, {
  dom             : "<'dataTables-top'<'uk-grid uk-grid-small'<'uk-width-2-3'fi<'dt-top-info'>>'<'uk-width-1-3 dt-top-right'l>>><'dataTables-content uk-overflow-auto't><'dataTables-bottom'<'uk-grid'<'uk-width-1-3'i><'uk-width-2-3 uk-text-right'p>>>r",
  stateSave       : true,
  stateDuration   : 60 * 60 * 24 * 14, // 14 day
  orderCellsTop   : true,
  orderMulti      : true, // use "shift+"
  autoWidth       : false,
  orderClasses    : false,
  lengthMenu      : [ [10, 25, 50, 100, -1], [10, 25, 50, 100, 'all'] ],
  pageLength      : 25,
  pagingType      : 'full_numbers',
  language : {
    search              : '',
    searchPlaceholder   : 'Search all columns..',
    infoPostFix         : '<button type="button" class="js-dt-clearSearch">Clear Search</button>',
    lengthMenu          : '_MENU_',
    paginate            : {
      first    : '|<',
      previous : '<',
      next     : '>',
      last     : '>|',
    },
  },
  drawCallback: function(settings) {
    reformatLink();
    hljs.highlightAll();
  }
});

// DataTables class modification
$.extend($.fn.dataTableExt.oStdClasses, {
  sWrapper        : 'dataTables_wrapper',
  sFilter         : 'dataTables_filter',
  sInfo           : 'dataTables_info',
  sLengthSelect   : 'dataTables_length_select'
});

$(document).ready(function() {
  let tableId = '#dataTable',
      dtTable = $(tableId).DataTable({
        ajax : {
          url     : 'data-source.json',
          dataSrc : '',
        },
        columns: [
            { data : 'group' },
            { data : 'tags',
              render : function(data, type, full) {
                // output  = '<span class="label">' + data + '</span>';
                output  = '';
                $.each(data, function( index, value ) {
                  output  += '<span class="label">' + value + '</span>';
                });
                return output;
              }
            },
            { data : 'content' }
        ],
        sorting : [[0, 'asc'], [1, 'asc']],
      }),
      dtObject = $(tableId).dataTable().columnFilter({
        sPlaceHolder : 'head:after',
        sRangeFormat : '{from}-{to}',
        aoColumns    : [
          { type : 'text' },
          { type : 'text' },
          { type : 'text' }
        ]
      });

  // Input datalist
  $('.dataTable thead tr:last-child td:nth-child(1) input').attr('list', 'dataGroup')
  $('.dataTable thead tr:last-child td:nth-child(2) input').attr('list', 'dataTags')

  $('.box-wrapper').on('click', '.js-dt-clearSearch', function() {
    $('.text_filter, .select_filter').val('');
    dtTable.search('').columns().search('').draw();
  });

  reformatLink();
});

function reformatLink() {
  // Set URL external, add icon link
  $('.url-icon').remove();
  $('td a[href^="http"]')
    .attr('target', '_blank')
    .append('<span class="url-icon"><svg width="24px" height="24px" viewBox="0 0 24 24"><g id="external_link" class="icon_svg-stroke" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline><path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path></g></svg></span>');

  $('tbody a[href^="images/"]').simpleLightbox();
}

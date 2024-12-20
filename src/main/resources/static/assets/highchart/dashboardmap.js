// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data = [
    ['ca-5682', 0],
    ['ca-bc', 1],
    ['ca-nu', 2],
    ['ca-nt', 3],
    ['ca-ab', 4],
    ['ca-nl', 5],
    ['ca-sk', 6],
    ['ca-mb', 7],
    ['ca-qc', 8],
    ['ca-on', 9],
    ['ca-nb', 10],
    ['ca-ns', 11],
    ['ca-pe', 12],
    ['ca-yt', 13]
];

// Create the chart
Highcharts.mapChart('assets_provice_map', {
    chart: {
        map: 'countries/ca/ca-all',
        spacingBottom: 10,
        spacingTop: 10,
        spacingLeft: 10,
        spacingRight: 10,
        backgroundColor:'transparent'
    },

    title: {
        text: ''
    },

    subtitle: {
        text: ''
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },
    legend: {
        enabled: false,
    },
    plotOptions:{
        series:{
            point:{
                events:{
                    click: function(){
                        $(".mapmodalview").modal("show");
                    }
                }
            }
        }
    },
    exporting: {enabled: false},
    series: [{
        data: data,
        name: 'Assets by Province',
        states: {
            hover: {
                color: '#dd800f'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}<br>{point.value}'
        }
    }]
});
Highcharts.chart('compliancyar_graph', {
    chart: {
        type: 'pie',
        spacingBottom: 10,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        backgroundColor:'transparent'
    },
    title: {
        text: ''
        // align: 'center',
        // verticalAlign: 'middle',
        // y: 0
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.y}',
                distance: 5,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            },
            colors: ['#4A9658', '#FE5F55'],
            innerSize: '80%',
            startAngle: 0,
            endAngle: 360,
		   showInLegend: true,
           point: {
                     events: {
                         click: function () {
                             $(".complianydetails").modal("show");
                         }
                     }
                 }
        }
    },
    legend: {
        enabled: false
    },
	exporting: {enabled: false},
    series: [{
        name: 'Questions',
        data: [
            ['Compliant', 25],
            ['Non - Compliant', 19]
        ]
    }]
});
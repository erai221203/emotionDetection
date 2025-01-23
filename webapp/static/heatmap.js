// Heatmap Initialization
var chart;
var firstTime = true;

// Function to request data from the server and update the heatmap
function requestData() {
    $.ajaxSetup({
        async: true
    });

    $.ajax({
        url: '/live-data_multi', // Ensure this endpoint provides data in the expected format
        success: function(point) {
            console.log("Received POINT", point);

            // Assuming `point` is a 2D array, with each point being [x, y, value]
            if (firstTime) {
                // On the first request, set up the heatmap with the provided data
                chart.addSeries({
                    type: 'heatmap',
                    data: point,
                    colorAxis: {
                        min: 0,
                        max: 1000,
                        minColor: '#ffffff',
                        maxColor: '#FF0000'
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormat: 'X: {point.x}, Y: {point.y}, Value: {point.value}'
                    }
                });
                firstTime = false;
            } else {
                // On subsequent requests, update the heatmap data
                if (chart.series[0]) {
                    chart.series[0].setData(point, true);
                }
            }

            // Request data again after 3 seconds
            setTimeout(requestData, 3000);
        },
        cache: false
    });
}

// Function to initialize the heatmap chart
$(document).ready(function () {
    chart = new Highcharts.Chart({
        chart: {
            type: 'heatmap',
            renderTo: 'data-container_multi', // The container where the heatmap will be rendered
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Multimodal Emotion Recognition Heatmap'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>X:</b> {point.x}, <b>Y:</b> {point.y}, <b>Value:</b> {point.value}'
        },
        colorAxis: {
            min: 0,
            max: 1000,
            minColor: '#ffffff',
            maxColor: '#FF0000'
        },
        series: [] // Initially empty, will be populated when the data arrives
    });
});

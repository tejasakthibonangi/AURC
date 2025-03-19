function VehicleSalesController() {

    var self = this;

    self.dbSalesData = [];
    self.init = function () {
        makeAjaxRequest({
            url: API_URLS.GetVehicleSalesAsync,
            type: 'GET',
            successCallback: function (response) {
                if (response) {
                    self.dbSalesData = response ? response : [];
                    console.log(JSON.stringify(response));
                    self.loadVehicleSalesChart();
                }
            },
            errorCallback: function (xhr, status, error) {
                console.error("Error in upserting data to server: " + error);
            }
        });

       
    };
    self.loadVehicleSalesChart = function () {
        var ctx = document.getElementById('vehicleSalesChart').getContext('2d');
        var vehicleSalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: self.dbSalesData.map(data => data.month),
                datasets: [
                    {
                        label: 'New Vehicle Sales',
                        data: self.dbSalesData.map(data => data.newVehicleSales),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        stack: 'Sales'
                    },
                    {
                        label: 'Used Vehicle Sales',
                        data: self.dbSalesData.map(data => data.usedVehicleSales),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        stack: 'Sales'
                    },
                    {
                        label: 'New Vehicle Inventory',
                        data: self.dbSalesData.map(data => data.newVehicleInventory),
                        type: 'line',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y-axis-inventory'
                    },
                    {
                        label: 'Appointment Set Rate',
                        data: self.dbSalesData.map(data => data.appointmentSetRate),
                        type: 'line',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y-axis-percentage'
                    },
                    {
                        label: 'Appointment Close Rate',
                        data: self.dbSalesData.map(data => data.appointmentCloseRate),
                        type: 'scatter',
                        backgroundColor: 'rgba(255, 159, 64, 1)',
                        yAxisID: 'y-axis-percentage'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Total Vehicle Sales'
                        }
                    },
                    'y-axis-inventory': {
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Inventory Levels'
                        }
                    },
                    'y-axis-percentage': {
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Percentage'
                        },
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        position: 'top',
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    };
}
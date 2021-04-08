/* eslint-disable object-shorthand */

/* global Chart, coreui, coreui.Utils.getStyle, coreui.Utils.hexToRgba */

/**
 * --------------------------------------------------------------------------
 * CoreUI Boostrap Admin Template (v3.2.0): main.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */



const mainChart = new Chart(document.getElementById('main-chart'), {
    type: 'line',
    data: {
        labels: ['-4Sem', '-3Sem', '-2Sem', '-1Sem'],
        datasets: [{
            label: 'Parceira 001',
            backgroundColor: coreui.Utils.hexToRgba(coreui.Utils.getStyle('--info'), 10),
            borderColor: coreui.Utils.getStyle('--info'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [165, 180, 70, 69]
        }, {
            label: 'Parceira 002',
            backgroundColor: 'transparent',
            borderColor: coreui.Utils.getStyle('--success'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [92, 97, 80, 100]
        }, {
            label: 'Parceira 003',
            backgroundColor: 'transparent',
            borderColor: coreui.Utils.getStyle('--danger'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5],
            data: [65, 65, 65, 65]
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250
                }
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3
            }
        }
    }
});
// eslint-disable-next-line no-unused-vars
document.body.addEventListener('classtoggle', function (event) {
    if (event.detail.className === 'c-dark-theme') {
        if (document.body.classList.contains('c-dark-theme')) {
            cardChart1.data.datasets[0].pointBackgroundColor = coreui.Utils.getStyle('--primary-dark-theme');
            cardChart2.data.datasets[0].pointBackgroundColor = coreui.Utils.getStyle('--info-dark-theme');
            Chart.defaults.global.defaultFontColor = '#fff';
        } else {
            cardChart1.data.datasets[0].pointBackgroundColor = coreui.Utils.getStyle('--primary');
            cardChart2.data.datasets[0].pointBackgroundColor = coreui.Utils.getStyle('--info');
            Chart.defaults.global.defaultFontColor = '#646470';
        }

        cardChart1.update();
        cardChart2.update();
        mainChart.update();
    }
}); // eslint-disable-next-line no-unused-vars

/* eslint-disable no-magic-numbers */
// Disable the on-canvas tooltip
Chart.defaults.global.pointHitDetectionRadius = 1;
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.tooltips.mode = 'index';
Chart.defaults.global.tooltips.position = 'nearest';
Chart.defaults.global.tooltips.custom = coreui.ChartJS.customTooltips;
Chart.defaults.global.defaultFontColor = '#646470';
Chart.defaults.global.responsiveAnimationDuration = 1;

// eslint-disable-next-line no-unused-vars

function getProgressBarClass(percentage) {
    if (percentage < 50)
        return "danger";
    if (percentage > 50 && percentage < 90)
        return "warning";
    return "success";
}

Number.prototype.HoursToDays = function () {
    return this / 24;
};

Array.prototype.getHistorical = function (key) {
    let r = this.map((d) => {
        return d.body[key];
    });
    r.reverse();
    return r;
}
Array.prototype.getHistoricalLabels = function (label) {
    return this.map((v, i) => {
        return `-${i + 1} ${label}`;
    });
}

function getClass(val, t1, t2) {
    if (val > t2)
        return 'ok';
    if (val > t1)
        return 'warning';
    return 'not-ok';
}

function formatBytes(a, b = 2) {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

// Here we start to playing
const staticDash = false;
let theresoldGlobal1 = 0;
let theresoldGlobal2 = 0;
let theresoldPartner1 = 0;
let theresoldPartner2 = 0;
let theresoldTeam1 = 0;
let theresoldTeam2 = 0;
if (staticDash) {
    const data = {
        "teamsCount": 500,
        "lastWeekCameras": 12,
        "notConformTeams": 15,
        "camerasCount": 5000,
        "camerasInOperationCount": 13 + '/64%',
        "partners": [{
            "id": "00176cc6-7866-41b6-a3bc-c4d30c8706e2",
            "name": "Empresa 002",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 39.15
        }, {
            "id": "3b3dd63a-4784-4551-a7b8-9692415559ad",
            "name": "Empresa 003",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "beed8fc8-dbc1-4723-986a-6fbf8f3f6b50",
            "name": "Empresa 004",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "1488b162-1581-4dde-9cf6-631e964ade51",
            "name": "Empresa 005",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "6a18e44f-ba44-4de1-8f79-27d3e8636e8a",
            "name": "Empresa 006",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "cf715321-fd9c-4005-8f6c-8d46b4bcc540",
            "name": "Empresa 007",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "1a4fe06a-cd28-4b65-b6eb-029f2f24e53b",
            "name": "Empresa 008",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "ff4b9a05-0312-42d5-b873-42951f82f62e",
            "name": "Empresa 009",
            "registered": "20/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "fed0d7d6-337e-402d-a53f-2f685dbae9f3",
            "name": "Empresa 001",
            "registered": "21/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }, {
            "id": "da0f5222-98f7-4ffe-a7d8-df29833a9e23",
            "name": "Empresa 000",
            "registered": "21/09/2020",
            "contact": null,
            "email": null,
            "percentage": 0
        }],
        "avgDaysByTeam": 15.82,
        "avgHoursByDayByTeam": 379.77
    };
    setTimeout(function () {
        $('#partners-table tbody tr').empty();
        $('#tmlp-partner-row').tmpl(data.partners).appendTo($('#partners-table tbody'));
        $('#camerasCount').text(data.camerasCount);
        $('#partnersCount').text(data.partners.length);
        $('#teamsCount').text(data.teamsCount);
        $('#camerasInOperationCount').text(data.camerasInOperationCount);
        $('#avgDaysByTeam').text(data.avgDaysByTeam);
        $('#avgHoursByDayByTeam').text(data.avgHoursByDayByTeam);
        $('#lastWeekCameras').text(data.lastWeekCameras);
        $('#notConformTeams').text(data.notConformTeams);
    }, 1000);
} else {
    draw();
}

function draw() {
    $.ajax({
        dataType: "json",
        method: "GET",
        data: {
            //"start": "VarA",
            //"end": "VarB"
        },
        cache: false,
        url: "api/all",
        success: function (data) {
            theresoldGlobal1 = data.theresoldGlobal1
            theresoldGlobal2 = data.theresoldGlobal2
            theresoldPartner1 = data.theresoldPartner1
            theresoldPartner2 = data.theresoldPartner2
            theresoldTeam1 = data.theresoldTeam1
            theresoldTeam2 = data.theresoldTeam2

            data = data.data;
            data.forEach((d) => {
                d.body = JSON.parse(d.body);
            });
            console.log(data)
            const now = data[data.length - 1].body;
            //$('#partners-table tbody tr').empty();
            //$('#tmlp-partner-row').tmpl(now.Partners).appendTo($('#partners-table tbody'));
            const systemStatus = (now.SystemStatus / theresoldGlobal1);
            $('#systemStatus').text(systemStatus.toFixed(2) + '%').closest('.card').addClass('bg-gradient-' + getClass(systemStatus, theresoldGlobal1, theresoldGlobal2));

            let teams = [];
            $.each(now.Partners, function (i, p) {
                $.each(p.Teams, function (k, t) {
                    teams.push(t);
                })
            });

            const notOkTeamsCount = teams.filter(function (t) {
                return t.RecHours < theresoldTeam1;
            }).length;

            const notOkPartners = now.Partners.filter(function (p) {
                return p.RecHours < theresoldPartner1;
            });
            const OkTeamsCount = teams.length - notOkTeamsCount;
            $('#notOkTeamsCount').text(notOkTeamsCount).closest('.card').find('.progress-bar').width((notOkTeamsCount / teams.length * 100) + '%').closest('.card').find('.desc').text(theresoldPartner1 + ' horas semanais');
            $('#OkTeamsCount').text(OkTeamsCount).closest('.card').find('.progress-bar').width((OkTeamsCount / teams.length * 100) + '%').closest('.card').find('.desc').text(theresoldPartner1 + ' horas semanais');

            $('#HoursPerWeekOfTeamsAverage').text((now.HoursPerWeekOfTeamsAverage / 7).toFixed(2));
            $('#DaysPerWeekOfTeamsAverage').text((now.HoursPerWeekOfTeamsAverage / 7 / 24).toFixed(2));

            $('#LastWeekCamerasCount').text(now.LastWeekCamerasCount);
            $('#FileSize').text((formatBytes(now.FileSize, 3)));
            $('#partnersCount').text(now.Partners.length);
            $('#camerasCount').text(now.CamerasCount);
            $('#teamsCount').text(now.TeamsCount);
            $('#tmpl-partner').tmpl(now.Partners).appendTo($('#accordion'));


            $('#camerasInOperationCount').text(now.CamerasInOperationCount + '/64%');
            $('#avgDaysByTeam').text(now.AvgDaysByTeam);


            const historicalAvgDaysByTeam = data.getHistorical('AvgDaysByTeam');
            let historicalAvgDaysByTeamLabels = historicalAvgDaysByTeam.getHistoricalLabels('Sem');

            const historicalAvgHoursByDayByTeam = data.getHistorical('AvgHoursByDayByTeam');
            let historicalAvgHoursByDayByTeamLabels = historicalAvgHoursByDayByTeam.getHistoricalLabels('Sem');

            const historicalLastWeekCameras = data.getHistorical('AvgHoursByDayByTeam');
            let historicalLastWeekCamerasLabels = historicalLastWeekCameras.getHistoricalLabels('Sem');

            const historicalNotOkTeams = data.getHistorical('NotOkTeams');
            let historicalNotOkTeamsLabels = historicalNotOkTeams.getHistoricalLabels('Sem');

            const chartDaysByTeam = new Chart(document.getElementById('chartDaysByTeam'), {
                type: 'line',
                data: {
                    labels: historicalAvgDaysByTeamLabels,
                    datasets: [{
                        label: 'Evolução',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: coreui.Utils.getStyle('--primary'),
                        data: historicalAvgDaysByTeam
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: 'transparent',
                                zeroLineColor: 'transparent'
                            },
                            ticks: {
                                fontSize: 2,
                                fontColor: 'transparent'
                            }
                        }],
                        yAxes: [{
                            display: false,
                            ticks: {
                                display: false,
                                min: Math.min(...historicalAvgDaysByTeam),
                                max: Math.max(...historicalAvgDaysByTeam)
                            }
                        }]
                    },
                    elements: {
                        line: {
                            borderWidth: 1
                        },
                        point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4
                        }
                    }
                }
            });

            // const chartHoursByDayByTeam = new Chart(document.getElementById('chartHoursByDayByTeam'), {
            //     type: 'line',
            //     data: {
            //         labels: historicalAvgHoursByDayByTeamLabels,
            //         datasets: [{
            //             label: 'Evolução',
            //             backgroundColor: 'transparent',
            //             borderColor: 'rgba(255,255,255,.55)',
            //             pointBackgroundColor: coreui.Utils.getStyle('--info'),
            //             data: historicalAvgHoursByDayByTeam
            //         }]
            //     },
            //     options: {
            //         maintainAspectRatio: false,
            //         legend: {
            //             display: false
            //         },
            //         scales: {
            //             xAxes: [{
            //                 gridLines: {
            //                     color: 'transparent',
            //                     zeroLineColor: 'transparent'
            //                 },
            //                 ticks: {
            //                     fontSize: 2,
            //                     fontColor: 'transparent'
            //                 }
            //             }],
            //             yAxes: [{
            //                 display: false,
            //                 ticks: {
            //                     display: false,
            //                     min: Math.min(...historicalAvgHoursByDayByTeam),
            //                     max: Math.max(...historicalAvgHoursByDayByTeam)
            //                 }
            //             }]
            //         },
            //         elements: {
            //             line: {
            //                 tension: 0.00001,
            //                 borderWidth: 1
            //             },
            //             point: {
            //                 radius: 4,
            //                 hitRadius: 10,
            //                 hoverRadius: 4
            //             }
            //         }
            //     }
            // });
            //
            // const chartLastWeekCameras = new Chart(document.getElementById('chartLastWeekCameras'), {
            //     type: 'line',
            //     data: {
            //         labels: historicalLastWeekCamerasLabels,
            //         datasets: [{
            //             label: 'Evolução',
            //             backgroundColor: 'rgba(255,255,255,.2)',
            //             borderColor: 'rgba(255,255,255,.55)',
            //             data: historicalLastWeekCameras
            //         }]
            //     },
            //     options: {
            //         maintainAspectRatio: false,
            //         legend: {
            //             display: false
            //         },
            //         scales: {
            //             xAxes: [{
            //                 display: false
            //             }],
            //             yAxes: [{
            //                 display: false
            //             }]
            //         },
            //         elements: {
            //             line: {
            //                 borderWidth: 2
            //             },
            //             point: {
            //                 radius: 0,
            //                 hitRadius: 10,
            //                 hoverRadius: 4
            //             }
            //         }
            //     }
            // });
            //
            // const chartNotOkTeams = new Chart(document.getElementById('chartNotOkTeams'), {
            //     type: 'bar',
            //     data: {
            //         labels: historicalLastWeekCamerasLabels,
            //         datasets: [{
            //             label: 'Evolução',
            //             backgroundColor: 'rgba(255,255,255,.2)',
            //             borderColor: 'rgba(255,255,255,.55)',
            //             data: historicalNotOkTeams,
            //             barPercentage: 0.6
            //         }]
            //     },
            //     options: {
            //         maintainAspectRatio: false,
            //         legend: {
            //             display: false
            //         },
            //         scales: {
            //             xAxes: [{
            //                 display: false
            //             }],
            //             yAxes: [{
            //                 display: false
            //             }]
            //         }
            //     }
            // });
        }
    });
}

$(function () {
    $('input[name="datetimes"]').daterangepicker({
        timePicker: false,
        startDate: moment().startOf('hour').subtract(7, 'day'),
        endDate: moment().startOf('hour'),
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "De",
            "toLabel": "Até",
            "customRangeLabel": "Escolha",
            "weekLabel": "W",
            "daysOfWeek": [
                "Dom",
                "Seg",
                "Ter",
                "Qua",
                "Qui",
                "Sex",
                "Sab"
            ],
            "monthNames": [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            "firstDay": 1
        },
        ranges: {
            'Semana passada': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
            'Mês atual': [moment().startOf('month'), moment().endOf('month')],
            'Último mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
    });
});

//# 11sourceMappingURL=main.js.map



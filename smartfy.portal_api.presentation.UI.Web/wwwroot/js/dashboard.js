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

//$("body").css("cursor", "progress");
showLoading();

$.ajax({
    dataType: "json",
    method: "GET",
    data: {
        //"start": "VarA",
        //"end": "VarB"
    },
    cache: false,
    url: "api/realtime",
    error: function (data) {
        hideLoading();
    },
    success: function (data) {
        dashboardMainStatus = data.dashboardMainStatus,
        fasecount1 = data.faseCount1
        fasecount2 = data.faseCount2
        fasecount3 = data.faseCount3
        camscount = data.camscount
        theresoldGlobal1 = data.theresoldGlobal1
        theresoldGlobal2 = data.theresoldGlobal2
        theresoldPartner1 = data.theresoldPartner1
        theresoldPartner2 = data.theresoldPartner2
        theresoldTeam1 = data.theresoldTeam1
        theresoldTeam2 = data.theresoldTeam2
        faseType1 = data.faseType1
        faseType2 = data.faseType2
        faseType3 = data.faseType3
        minHoursDay1 = data.minHoursDay1
        minHoursDay2 = data.minHoursDay2
        minHoursDay3 = data.minHoursDay3
        realPercentage1 = data.realPercentage1
        realPercentage2 = data.realPercentage2
        realPercentage3 = data.realPercentage3

        data = data.data;
        data.forEach((d) => {
            d.body = JSON.parse(d.body);
        });
        console.log(data)
        if (data.length > 0) {
            const now = data[data.length - 1].body;
            //$('#partners-table tbody tr').empty();
            //$('#tmlp-partner-row').tmpl(now.Partners).appendTo($('#partners-table tbody'));
            const systemStatus = dashboardMainStatus; 
            $('#systemStatus').text(systemStatus.toFixed(2) + '%').closest('.card').addClass('bg-gradient-' + getClass(systemStatus, 25,70));

            let teams = [];
            $.each(now.Partners, function (i, p) {
                $.each(p.Teams, function (k, t) {
                    teams.push(t);
                })
            });
            //solução do problema aqui
            const notOkTeamsCount = teams.filter(function (t) {

                return t.OkAvgHoursByWeek == false;
            }).length;

            const OkTeamsCount = teams.length - notOkTeamsCount;

            $('#btnDetalhesDash').removeAttr('hidden');

            $('#notOkTeamsCount').text(notOkTeamsCount + '/' + camscount).closest('.card').find('.progress-bar').width((notOkTeamsCount / teams.length * 100) + '%').
                closest('.card').find('.desc1').text(fasecount1 + ' ' + faseType1 + ' ' + minHoursDay1 + ' ' + realPercentage1).
                closest('.card').find('.desc2').text(fasecount2 + ' ' + faseType2 + ' ' + minHoursDay2 + ' ' + realPercentage2).
                closest('.card').find('.desc3').text(fasecount3 + ' ' + faseType3 + ' ' + minHoursDay3 + ' ' + realPercentage3);
            $('#OkTeamsCount').text(OkTeamsCount + '/' + camscount).closest('.card').find('.progress-bar').width((OkTeamsCount / teams.length * 100) + '%').
                closest('.card').find('.desc').text(faseType1 + ' ' + minHoursDay1 + ' ' + realPercentage1).
                closest('.card').find('.desc2').text(faseType2 + ' ' + minHoursDay2 + ' ' + realPercentage2).
                closest('.card').find('.desc3').text(faseType3 + ' ' + minHoursDay3 + ' ' + realPercentage3);
            $('#HoursPerWeekOfTeamsAverage').text((now.HoursPerWeekOfTeamsAverage / 7).toFixed(2));
            $('#DaysPerWeekOfTeamsAverage').text((now.HoursPerWeekOfTeamsAverage / 7 / 20).toFixed(2));
            $('#LastWeekCamerasCount').text(now.LastWeekCamerasCount);
            $('#FileSize').text((formatBytes(now.FileSize, 3)));
            $('#partnersCount').text(now.Partners.length);
            $('#camerasCount').text(now.CamerasCount);
            $('#teamsCount').text(now.TeamsCount);
            $('#tmpl-partner').tmpl(now.PartnersNotOK).appendTo($('#accordion'));
            $('#camerasInOperationCount').text(now.CamerasInOperationCount + '/64%');
            $('#avgDaysByTeam').text(now.AvgDaysByTeam);
            $('#tmpl-partner').tmpl(now.PartnersTop3).appendTo($('#top3'));


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
        }
        else
        {
            $('#systemStatus').text('0 %').closest('.card').addClass('bg-gradient-default');
            $('#notOkTeamsCount').text(0).closest('.card').find('.progress-bar').width('0 %').closest('.card').find('.desc').text('8 horas semanais');
            $('#OkTeamsCount').text(0).closest('.card').find('.progress-bar').width('0 %').closest('.card').find('.desc').text('8 horas semanais');
            $('#HoursPerWeekOfTeamsAverage').text((0).toFixed(2));
            $('#DaysPerWeekOfTeamsAverage').text((0).toFixed(2));
            $('#LastWeekCamerasCount').text(0);
            $('#btnDetalhesDash').attr('hidden', 'false');
            $('#FileSize').text((formatBytes(0, 3)));
            $('#partnersCount').text(0);
            $('#camerasCount').text(0);
            $('#teamsCount').text(0);
            $('#camerasInOperationCount').text('0%');
            $('#avgDaysByTeam').text(0);
        }
       
        hideLoading();
    }
});
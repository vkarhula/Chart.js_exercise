
$(document).ready(function(){
    $.ajax({
        url: "http://localhost/pieni_ohjelmoija_mysqli/averages.php",
        method: "GET",
        success: function(data) {
            console.log(data);
            var age = [];
            var experience_years = [];
            var several = [];

            for(var i in data) {
                // for kiertää vain yhden kierroksen, i = 0
                //avg.push(data[0].avg_age);
                age.push(Math.round(data[i].avg_age));
                experience_years.push(Math.round(data[i].avg_experience_years));
            
                // Kerätään osaamisen keskiarvot yhteen taulukkoon
                // Tallennetaan arvo yhdellä desimaalilla
                several.push((parseFloat(data[i].avg_programming)).toFixed(1));
                several.push((parseFloat(data[i].avg_web_frontend)).toFixed(1));
                several.push((parseFloat(data[i].avg_web_backend)).toFixed(1));
                several.push((parseFloat(data[i].avg_mobile_native)).toFixed(1));
                several.push((parseFloat(data[i].avg_mobile_hybrid)).toFixed(1));
                several.push((parseFloat(data[i].avg_relational_database)).toFixed(1));
                several.push((parseFloat(data[i].avg_nosql_database)).toFixed(1));
            }
            
            //////////////////            
            $("#keskiarvo1").html("Ikä: " + Math.round(data[0].avg_age));

            var chartdata = {
                labels: [],
                datasets : [
                    {
                        label: 'Ikä',
                        backgroundColor: "#B4BE10",
                        borderColor: 'rgba(200, 200, 200, 0.75)',
                        hoverBackgroundColor: "#6C7404",
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: age
                    }
                ]
            };

            var ctx = $("#averages1");

            var barGraph = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: chartdata
            });
            
            ///////////////////
            $("#keskiarvo2").html("Työkokemus vuosina: " + Math.round(data[0].avg_experience_years));
            
            var chartdata2 = {
                labels: [],
                datasets : [
                    {
                        label: 'Työkokemus',
                        backgroundColor: "#EC7B0A",
                        borderColor: 'rgba(200, 200, 200, 0.75)',
                        hoverBackgroundColor: "#B30006",
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: experience_years
                    }
                ]
            };

            var ctx2 = $("#averages2");

            var barGraph2 = new Chart(ctx2, {
                    type: 'horizontalBar',
                    data: chartdata2
            });
            
            ///////////////////
            var chartdata3 = {
                labels: ["Ohjelmointi yleisellä tasolla", "Web frontend", "Web backend", 
                    "Natiivi mobiili", "Hybridi mobiili", "Relaatiotietokannat", "NoSQL-tietokannat"],
                datasets : [
                    {
                        label: 'Keskiarvot',
                        backgroundColor: 
                            ["#EC7B0A","#F8B806","#FDD631","#C6D210","#B4BD10","#969D08","#6A720D"],
                        borderColor: 'rgba(200, 200, 200, 0.75)',
                        hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: several
                    }
                ]
            };

            var ctx3 = $("#averages3");

            var barGraph3 = new Chart(ctx3, {
                    type: 'horizontalBar',
                    data: chartdata3,
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    max: 5,
                                    min: 0,
                                    stepSize: 0.5
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    max: 5,
                                    min: 0,
                                    stepSize: 0.5
                                }
                            }]

                        },
                        // Piilotetaan label-tekstin laatikko chartin yläpuolelta
                        legend: {
                            display: false
                        }
                    }      
            });
            
        },
        error: function(data) {
                console.log(data);
        }
    });
});
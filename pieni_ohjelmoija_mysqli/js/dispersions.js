
$(document).ready(function(){
$.ajax({
    url: "http://localhost/pieni_ohjelmoija_mysqli/dispersions.php",
    method: "GET",
    success: function(data) {
        console.log(data);
        var numbers = ["1","2","3","4","5"];

        var age_15_30 = [];
        var age_30_50 = [];
        var age_50_65 = [];
        var male = [];
        var female = [];
        var years_0_5 = [];
        var years_6_10 = [];
        var years_11_15 = [];
        var years_yli_15 = [];
        
        var programming = [];
        var web_frontend = [];
        var web_backend = [];
        var mobile_native = [];
        var mobile_hybrid = [];
        var relational_database = [];
        var nosql_database = [];

        // size used for data organization and bar yAxis scaling as max value
        var size = 0;
        // step used for bar yAxis scale step
        var step = 0;
        var programming_order = [];
        var web_frontend_order = [];
        var web_backend_order = [];
        var mobile_native_order = [];
        var mobile_hybrid_order = [];
        var relational_database_order = [];
        var nosql_database_order = [];

        // Jaotellaan ikä, sukupuoli ja kokemusvuodet valmiiksi omiin taulukoiden 
        // alkioihin, joita käytetään chartien datalähteenä
        age_15_30[0] = 0;
        age_30_50[0] = 0;
        age_50_65[0] = 0;
        male[0] = 0;
        female[0] = 0;
        years_0_5[0] = 0;
        years_6_10[0] = 0;
        years_11_15[0] = 0;
        years_yli_15[0] = 0;

        for(var i in data) {
            // Jaotellaan henkilöt iän perusteella kolmeen ryhmään
            if (data[i].experience_years >= 0 && data[i].experience_years <= 5){
                years_0_5[0]++;
            } else if (data[i].experience_years > 5 && data[i].experience_years <= 10){
                years_6_10[0]++;
            } else if (data[i].experience_years > 10 && data[i].experience_years <= 15){
                years_11_15[0]++;
            } else if (data[i].experience_years > 15){
                years_yli_15[0]++;
            }
            
            // Jaotellaan henkilöt sukupuolen mukaan kahteen ryhmään
            if (data[i].gender === '1'){
                male[0]++;
            } else if (data[i].gender === '2'){
                female[0]++;
            }
            
            // Jaotellaan henkilöt työkokemuksen mukaan neljään ryhmään
            if (data[i].age > 15 && data[i].age <= 30){
                age_15_30[0]++;
            } else if (data[i].age > 30 && data[i].age <= 50){
                age_30_50[0]++;
            } else if (data[i].age > 50 && data[i].age <= 65){
                age_50_65[0]++;
            }
            
            // Lasketaan tulosjoukon rivien lukumäärä eli tallennettujen
            // henkilöiden lukumäärä
            size++;

            // Kerätään tietokannan programmin-aliaksen tulokset
            // programming-taulukkoon
            programming.push(data[i].programming);
            web_frontend.push(data[i].web_frontend);
            web_backend.push(data[i].web_backend);
            mobile_native.push(data[i].mobile_native);
            mobile_hybrid.push(data[i].mobile_hybrid);
            relational_database.push(data[i].relational_database);
            nosql_database.push(data[i].nosql_database);
        }

        // Skaalataan bar-charttien yAxis siten, että syötettyjen tietojen lkm
        // on yAxis:n maksimiarvo
        size = parseInt(size);
        step = size/10;
        
        // Järjestetään taulukoiden data esitysformaattiin
        // Jokaisessa jarjestetyssä taulukossa on viisi alkiota
        // palautuva datajoukko esim. programmin_order sisältää esitysmuotoon 
        // järjestetyn datan
        // programming_order[0] sisältää heikkojen osaajien (luku 1) lukumäärän
        // programming_order[4] sisältää erittäin hyvien osasjien (luku 5)lukumäärän
        programming_order = jarjesta_data(programming, size);
        web_frontend_order = jarjesta_data(web_frontend, size);
        web_backend_order = jarjesta_data(web_backend, size);
        mobile_native_order = jarjesta_data(mobile_native, size);
        mobile_hybrid_order = jarjesta_data(mobile_hybrid, size);
        relational_database_order = jarjesta_data(relational_database, size);
        nosql_database_order = jarjesta_data(nosql_database, size);
        
        //document.getElementById('teksti2').innerHTML = "size = " +  size;
        //document.getElementById('teksti3').innerHTML = "step = " +  step;

        /////////////////
        var chartdata = {
                labels: ["15-30", "31-50", "51-65"],
                datasets: [{
                  backgroundColor: [
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: [age_15_30[0], age_30_50[0], age_50_65[0]]
                }]
            };    

        var ctx = $("#dispersions1");

        var barGraph = new Chart(ctx, {
            type: 'doughnut',
            data: chartdata
        });
        
        //////////////////
        var chartdata2 = {
            labels: ["Mies", "Nainen"],
            datasets: [{
                backgroundColor: [
                    "#3498db",
                    "#e74c3c"
                ],
                data: [male[0], female[0]]
                }]
            };    
        
        var ctx2 = $("#dispersions2");

        var barGraph2 = new Chart(ctx2, {
            type: 'pie',
            data: chartdata2
        });
        
        /////////////////////
        var chartdata3 = {
                labels: ["0-5", "6-10", "11-15","Yli 15"],
                datasets: [{
                  backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#34495e"
                  ],
                  data: [years_0_5[0], years_6_10[0], years_11_15[0], years_yli_15[0]]
                }]
            };    

        var ctx3 = $("#dispersions3");

        var barGraph3 = new Chart(ctx3, {
            type: 'doughnut',
            data: chartdata3
        });

        ///////////////////// 
        var chartdata4 = 
            {
                labels: numbers,
                datasets: [{
                  backgroundColor: [
                    "#3498db",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: programming_order
                }]
            };    

        var ctx4 = $("#dispersions4");

        var barGraph4 = new Chart(ctx4, {
            type: 'bar',
            data: chartdata4,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            // Käytetään akselin skaalauksessa tallennettujen tietojen määrää
                            //max: 20,
                            max: size,
                            min: 0,
                            stepSize: step
                            //stepSize: 2
                        }
                    }]
                },
                // Labelin värilaatikon piilotus
                legend: {
                    display: false
                }
            }
        });   
        

        ///////////////////// 
        var chartdata5 = 
            {
                labels: numbers,
                datasets: [{
                  backgroundColor: [
                    "#3498db",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: web_frontend_order
                }]
            };    

        var ctx5 = $("#dispersions5");

        var barGraph5 = new Chart(ctx5, {
            type: 'bar',
            data: chartdata5,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: size,
                            min: 0,
                            stepSize: step
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });    

        
        ///////////////////// 
        var chartdata6 = 
            {
                labels: numbers,
                datasets: [{
                  backgroundColor: [
                    "#3498db",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: web_backend_order
                }]
            };    

        var ctx6 = $("#dispersions6");

        var barGraph6 = new Chart(ctx6, {
            type: 'bar',
            data: chartdata6,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: size,
                            min: 0,
                            stepSize: step
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }            
        });    
        
        
        ///////////////////// 
        var chartdata7 = 
            {
                labels: numbers,
                datasets: [{
                  backgroundColor: [
                    "#3498db",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: mobile_native_order
                }]
            };   

        var ctx7 = $("#dispersions7");

        var barGraph7 = new Chart(ctx7, {
            type: 'bar',
            data: chartdata7,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: size,
                            min: 0,
                            stepSize: step
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }            
        });    
        
        
        ///////////////////// 
        var chartdata8 = 
            {
                labels: numbers,
                datasets: [{
                  backgroundColor: [
                    "#3498db",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: mobile_hybrid_order
                }]
            };    

        var ctx8 = $("#dispersions8");

        var barGraph8 = new Chart(ctx8, {
            type: 'bar',
            data: chartdata8,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: size,
                            min: 0,
                            stepSize: step
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }            
        });    
        
        
        ///////////////////// 
        var chartdata9 = 
            {
                labels: numbers,
                datasets: [{
                  backgroundColor: [
                    "#3498db",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: relational_database_order
                }]
            };    

        var ctx9 = $("#dispersions9");

        var barGraph9 = new Chart(ctx9, {
            type: 'bar',
            data: chartdata9,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: size,
                            min: 0,
                            stepSize: step
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }            
        });    
        
        
        ///////////////////// 
        var chartdata10 = 
            {
                labels: numbers,
                datasets: [{
                  backgroundColor: [
                    "#3498db",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                  ],
                  data: nosql_database_order
                }]
            };    

        var ctx10 = $("#dispersions10");

        var barGraph10 = new Chart(ctx10, {
            type: 'bar',
            data: chartdata10,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: size,
                            min: 0,
                            stepSize: step
                        }
                    }]
                },
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

// Funktio jarjesta_data() muokkaa datajoukon, jonka arvoalue on 1-5 välillä
// uuteen taulukkoon, jossa ensimmäiseen alkioon uusi[0] lasketaan heikkojen osaajien lkm.
// Vastaavasti erittäin hyvien osaajien lkm lasketaan alkioon uusi[4]
// Taulukko uusi[] palautetaan kutsuvaan ohjelmaan ja sitä käytetään
// chartin piirtodatana (var chartdata = {data}
function jarjesta_data(array,size){
    var uusi = [0,0,0,0,0];
    for (var i= 0; i <= size; i++){
        switch(array[i]){
            case '1': uusi[0]++; break; //heikko (luku 1)
            case '2': uusi[1]++; break; //välttävä
            case '3': uusi[2]++; break; //tyydyttävä
            case '4': uusi[3]++; break; //hyvä
            case '5': uusi[4]++; break; //erittäin hyvä (luku 5)
            default: break;
        }
    }
    return uusi;
}
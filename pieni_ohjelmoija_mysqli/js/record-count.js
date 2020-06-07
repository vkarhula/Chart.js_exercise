$(document).ready(function() {
   $.ajax({
       url: "http://localhost/pieni_ohjelmoija/record-count.php",
       method: "GET",
       success: function(data) {
           console.log(data);
           // Tulostetaan record-count.php:n palauttama record_count aliaksen
           // record-count.html diviin, jonka id="lukumaara"
           $("#lukumaara").html("Vastauksia: " +
                data[0].record_count + " kpl");
       },
       error: function(data) {
           console.log(data);
       }
   });
});

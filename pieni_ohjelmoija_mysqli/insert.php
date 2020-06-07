<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lisää arviointeja</title>
    <link href="css/style.css" rel="stylesheet">

  </head>
  <body>
        <?php
        $id=0;
        //$age=0;
        $gender=0;
        //$experience_years = 0;
        
        
        // Avataan tietokantayhteys. Nyt tietokantayhteys avataan aina, kun tämä sivu näytetään. Tähän voisi toki lisätä if-lauseen, joka
        //estää tietokannan avaamisen, jos käyttäjä avaan vain asiakkaan lisäyslomakkeen esiin (jolloin tietokantayhteyttä ei vielä tarvita).
        $tietokanta = new PDO('mysql:host=localhost;dbname=programmer_query;charset=utf8','root','');
        //Oletuksena PDO ei näytä mahdollisia virheitä, joten asetetaan "virhemoodi" päälle.
        $tietokanta->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

        if ($_SERVER['REQUEST_METHOD']==='POST') {
            try {
                // Luetaan tiedot lomakkeelta.
                $id = filter_input(INPUT_POST, 'id',FILTER_SANITIZE_NUMBER_INT);
                $age = filter_input(INPUT_POST, 'age', FILTER_SANITIZE_NUMBER_INT);
                $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_NUMBER_INT);
                $experience_years = filter_input(INPUT_POST, 'experience_years', FILTER_SANITIZE_NUMBER_INT);
                $programming = filter_input(INPUT_POST, 'programming', FILTER_SANITIZE_NUMBER_INT);
                $web_frontend = filter_input(INPUT_POST, 'web_frontend', FILTER_SANITIZE_NUMBER_INT);
                $web_backend = filter_input(INPUT_POST, 'web_backend', FILTER_SANITIZE_NUMBER_INT);
                $mobile_native = filter_input(INPUT_POST, 'mobile_native', FILTER_SANITIZE_NUMBER_INT);
                $mobile_hybrid = filter_input(INPUT_POST, 'mobile_hybrid', FILTER_SANITIZE_NUMBER_INT);
                $relational_database = filter_input(INPUT_POST, 'relational_database', FILTER_SANITIZE_NUMBER_INT);
                $nosql_database = filter_input(INPUT_POST, 'nosql_database', FILTER_SANITIZE_NUMBER_INT);

                // Muodostetaan parametroitu sql-kysely tiedon päivittämistä varten. Piilokentässä oleva id on 0 lisäystilanteessa ja muuten
                // kenttä sisältää päivitettävän tietueen id:n.
                if ($id == 0) {
                    $kysely = $tietokanta->prepare("INSERT INTO programmer_data "
                            . "(age,gender,experience_years,programming,web_frontend,"
                            . "web_backend,mobile_native,mobile_hybrid,relational_database,"
                            . "nosql_database) "
                            . "VALUES (:age,:gender,:experience_years,:programming, "
                            . ":web_frontend,:web_backend,:mobile_native,:mobile_hybrid,"
                            . ":relational_database,:nosql_database)");
                }
                else {
                    $kysely = $tietokanta->prepare("UPDATE programmer_data SET "
                            . "age=:age,gender=:gender,experience_years=:experience_years,"
                            . "programming=:programming,web_frontend=:web_frontend,"
                            . "web_backend=:web_backend,mobile_native=:mobile_native,"
                            . "mobile_hybrid=:mobile_hybrid, relational_database=:relational_database,"
                            . "nosql_database=:nosql_database"
                            . "WHERE id=:id");
                    $kysely->bindValue(':id',$id,PDO::PARAM_INT);
                }
                
                $kysely->bindValue(':age',$age,PDO::PARAM_INT);
                $kysely->bindValue(':gender',$gender,PDO::PARAM_INT);
                $kysely->bindValue(':experience_years',$experience_years,PDO::PARAM_INT);
                $kysely->bindValue(':programming',$programming,PDO::PARAM_INT);
                $kysely->bindValue(':web_frontend',$web_frontend,PDO::PARAM_INT);
                $kysely->bindValue(':web_backend',$web_backend,PDO::PARAM_INT);
                $kysely->bindValue(':mobile_native',$mobile_native,PDO::PARAM_INT);
                $kysely->bindValue(':mobile_hybrid',$mobile_hybrid,PDO::PARAM_INT);
                $kysely->bindValue(':relational_database',$relational_database,PDO::PARAM_INT);
                $kysely->bindValue(':nosql_database',$nosql_database,PDO::PARAM_INT);

                // Suoritetaan kysely ja tarkastetaan samalla mahdollinen virhe.
                if ($kysely->execute()) {
                    print('<p>Kirjoitus tallennettu</p>');
                    // Haetaan lisätyn tietueen id-muuttujaan. Jos käyttäjä muuttaa tietoja vielä tässä näkymässä, niin id sisältää sitten
                    // äskettäin lisätyn uuden tietueen id:n ja tietoja muutettaessa päivitetään (update).
                    $id = $tietokanta->lastInsertId();
                }
                else {
                    print '<p>';
                    print_r($tietokanta->errorInfo());
                    print '</p>';
                }
                  
                // Ohjataan tallennuksen jälkeen success.html-sivulle
                header('Location: success.html');

            } catch (PDOException $pdoex) {
                print '<p>Tietokannan avaus epäonnistui.' . $pdoex->getMessage(). '</p>';
            }
        }
?>

        <div class="sailio">
        <h2><?php print "Ohjelmoijakysely"; ?></h2>
        <form action="<?php print $_SERVER['PHP_SELF'];?>" method="post">
            <input type="hidden" name="id" value="<?php print($id);?>">
            
            <div>
                <label class="label_inline" for="age">Ikä:</label>
                <input type="number" min="15" max="65" id="age" name="age" 
                       placeholder="Anna ikäsi" required value="<?php print($age);?>"> 
                <span>(15-65 v.)</span>
            </div>
            
            <div>
                <label class="label_inline" for="gender">Sukupuoli:</label>
                <label><input name="gender" id="gender1" type="radio" value="1">Mies</label>
                <label><input name="gender" id="gender2" type="radio" value="2" checked>Nainen</label>
            </div>
            
            <div>
            <label class="label_inline" for="experience_years">Kokemus vuosissa:</label>
            <input id="experience_years" name="experience_years" type="number" min="0" 
                   max="50" placeholder="Anna työkokemus" required value="<?php print($experience_years);?>">
            <span>(0-50 v.)</span>
            </div>
            
            <h3>Arvioi ohjelmointiosaamistasi</h3>

            <label class="otsikko">Ohjelmointi yleisellä talsolla</label>
            <label><input name="programming" id="programming1" type="radio" value="5">Erittäin hyvä</label>
            <label><input name="programming" id="programming2" type="radio" value="4">Hyvä</label>
            <label><input name="programming" id="programming3" type="radio" value="3">Tyydyttävä</label>
            <label><input name="programming" id="programming4" type="radio" value="2">Välttävä</label>
            <label><input name="programming" id="programming5" type="radio" value="1" checked>Heikko</label>
           
            <label class="otsikko">Web frontend</label>
            <label><input name="web_frontend" id="web_frontend1" type="radio" value="5">Erittäin hyvä</label>
            <label><input name="web_frontend" id="web_frontend2" type="radio" value="4">Hyvä</label>
            <label><input name="web_frontend" id="web_frontend3" type="radio" value="3">Tyydyttävä</label>
            <label><input name="web_frontend" id="web_frontend4" type="radio" value="2">Välttävä</label>
            <label><input name="web_frontend" id="web_frontend5" type="radio" value="1" checked>Heikko</label>
            
            <label class="otsikko">Web backend</label>
            <label><input name="web_backend" id="web_backend1" type="radio" value="5">Erittäin hyvä</label>
            <label><input name="web_backend" id="web_backend2" type="radio" value="4">Hyvä</label>
            <label><input name="web_backend" id="web_backend3" type="radio" value="3">Tyydyttävä</label>
            <label><input name="web_backend" id="web_backend4" type="radio" value="2">Välttävä</label>
            <label><input name="web_backend" id="web_backend5" type="radio" value="1" checked>Heikko</label>
            
            <label class="otsikko">Natiivi mobiili</label>
            <label><input name="mobile_native" id="mobile_native1" type="radio" value="5">Erittäin hyvä</label>
            <label><input name="mobile_native" id="mobile_native2" type="radio" value="4">Hyvä</label>
            <label><input name="mobile_native" id="mobile_native3" type="radio" value="3">Tyydyttävä</label>
            <label><input name="mobile_native" id="mobile_native4" type="radio" value="2">Välttävä</label>
            <label><input name="mobile_native" id="mobile_native5" type="radio" value="1" checked>Heikko</label>
            
            <label class="otsikko">Hybridi mobiili</label>
            <label><input name="mobile_hybrid" id="mobile_hybrid1" type="radio" value="5">Erittäin hyvä</label>
            <label><input name="mobile_hybrid" id="mobile_hybrid2" type="radio" value="4">Hyvä</label>
            <label><input name="mobile_hybrid" id="mobile_hybrid3" type="radio" value="3">Tyydyttävä</label>
            <label><input name="mobile_hybrid" id="mobile_hybrid4" type="radio" value="2">Välttävä</label>
            <label><input name="mobile_hybrid" id="mobile_hybrid5" type="radio" value="1" checked>Heikko</label>
            
            <label class="otsikko">Relaatiotietokannat</label>
            <label><input name="relational_database" id="relational_database1" type="radio" value="5">Erittäin hyvä</label>
            <label><input name="relational_database" id="relational_database2" type="radio" value="4">Hyvä</label>
            <label><input name="relational_database" id="relational_database3" type="radio" value="3">Tyydyttävä</label>
            <label><input name="relational_database" id="relational_database4" type="radio" value="2">Välttävä</label>
            <label><input name="relational_database" id="relational_database5" type="radio" value="1" checked>Heikko</label>
            
            <label class="otsikko">NoSQL-tietokannat</label>
            <label><input name="nosql_database" id="nosql_database1" type="radio" value="5">Erittäin hyvä</label>
            <label><input name="nosql_database" id="nosql_database2" type="radio" value="4">Hyvä</label>
            <label><input name="nosql_database" id="nosql_database3" type="radio" value="3">Tyydyttävä</label>
            <label><input name="nosql_database" id="nosql_database4" type="radio" value="2">Välttävä</label>
            <label><input name="nosql_database" id="nosql_database5" type="radio" value="1" checked>Heikko</label>
            
            <button type="submit" name="tallenna" class="active_button">Tallenna</button>
            <button type="reset" name="tyhjenna">Tyhjennä</button>
        </form>
        </div>

    <!-- jQuery-kirjasto ja oma jQuery-koodi -->
    <script src="js/jquery-3.1.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>

  </body>
</html>
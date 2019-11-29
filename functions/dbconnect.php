<?php
    $db_connection = pg_connect("host=localhost dbname=tajikistan1 user=postgres password=admin");
    $result = pg_query($db_connection, "SELECT * FROM Export_Output1");
    while($row = pg_fetch_array($(result)){
        echo '<h2>jamoat</h2>
    })
?>

<?php
// base de datos de prueba descargada de http://www.mysqltutorial.org/mysql-sample-database.aspx
sleep(2);

$producto = $_POST["producto"];
$descripcion = $_POST["descripcion"];

//Conexion con la base
$conn = mysqli_connect("localhost", "root", "", "jquery_escuelait_classicmodels");

$result = mysqli_query($conn, "select * from products where productName like '%" . $producto . "%' and productDescription like '%" . $descripcion . "%'");
//echo "res:" . $result;
?>

<table align="center" border=1 cellspacing=0>
    <tr>
        <th width="30%">Producto</th>
        <th width="70%">Descripción</th>
    </tr>
    <?php
        //Mostramos los registros
        while ($row = mysqli_fetch_array($result)) {
            echo '<tr><td>' . $row["productName"] . '</td>';
            echo '<td>' . $row["productDescription"] . '</td></tr>';
        }
        mysqli_free_result($result);
        mysqli_close($conn);
    ?>

</table>
<?php
// ДЕМО: SQL injection. Само за локален компютър!
require 'db.php';

$title = $_GET['title'] ?? '';   // ?? '': ако няма параметър, празен текст
$rows = [];
$sql = '';

if ($title !== '') {
    $sql = "SELECT * FROM electives WHERE title = '$title'";
    $rows = $db->query($sql)->fetchAll();
}
?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <title>Демо: SQL injection</title>
</head>
<body>
    <h1>Търсене на дисциплина</h1>

    <form method="get">
        <label for="title">Име на дисциплина</label>
        <input id="title" name="title" value="<?= htmlspecialchars($title) ?>">
        <button type="submit">Търси</button>
    </form>

    <?php if ($sql !== ''): ?>
        <p>Изпълнена заявка: <code><?= htmlspecialchars($sql) ?></code></p>
        <p>Намерени: <?= count($rows) ?></p>
        <ul>
            <?php foreach ($rows as $row): ?>
                <li><?= htmlspecialchars($row['title']) ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</body>
</html>

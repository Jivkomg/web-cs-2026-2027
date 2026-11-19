<?php
// Бонус 2: късметите по категории (асоциативен масив от масиви)
$kasmeti = [
    'здраве' => ['Здраве!', 'Много енергия!', 'Без настинки цяла зима!'],
    'учене'  => ['Шестица на изпита!', 'Взета сесия!', 'Стипендия!'],
    'любов'  => ['Нова любов!', 'Среща с приятели!', 'Изненада от близък човек!'],
];

$name = trim($_GET['name'] ?? '');
$category = $_GET['category'] ?? 'всички';

// Списъкът, от който избираме: една категория или всички заедно
if (isset($kasmeti[$category])) {
    $list = $kasmeti[$category];
} else {
    $category = 'всички';
    $list = array_merge($kasmeti['здраве'], $kasmeti['учене'], $kasmeti['любов']);
}

$kasmet = '';
if ($name !== '') {
    // Основно изискване: случаен късмет
    // $kasmet = $list[rand(0, count($list) - 1)];

    // Бонус 1: едно и също число за едно и също име в един и същ ден
    $index = crc32($name . date('Y-m-d')) % count($list);
    $kasmet = $list[$index];
}
?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Баница с късмети</title>
</head>
<body>
    <h1>Баница с късмети</h1>

    <form method="get">
        <p>
            <label for="name">Име</label>
            <input id="name" name="name" value="<?= htmlspecialchars($name) ?>">
        </p>
        <p>
            <label for="category">Категория</label>
            <select id="category" name="category">
                <option value="всички">Всички</option>
                <?php
                foreach ($kasmeti as $key => $values) {
                    $selected = ($key === $category) ? ' selected' : '';
                    echo "<option value=\"$key\"$selected>$key</option>";
                }
                ?>
            </select>
        </p>
        <button type="submit">Извади късмет</button>
    </form>

    <?php
    if ($kasmet !== '') {
        echo '<p><strong>' . htmlspecialchars($name) . '</strong>, твоят късмет за ' . date('d.m.Y') . ' е: ';
        echo "<strong>$kasmet</strong></p>";
    }
    ?>
</body>
</html>

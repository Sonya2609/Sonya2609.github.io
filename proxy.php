<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Ваши данные (замените на свои!)
    $bot_token = '8103393058:AAEzEvVwk39PPyT8uU9We9CeF4InHdCIFsQ';
    $chat_id = '1098334245';
    
    // Формируем сообщение
    $message = "📩 Новая заявка!\n\n";
    $message .= "👤 Имя: " . $data['name'] . "\n";
    $message .= "📧 Email: " . $data['email'] . "\n";
    $message .= "📋 Тема: " . ($data['subject'] ?: 'Не указана') . "\n\n";
    $message .= "💬 Сообщение:\n" . $data['message'] . "\n\n";
    $message .= "⏰ Время: " . date('d.m.Y H:i:s');
    
    // Отправляем в Telegram
    $url = "https://api.telegram.org/bot{$bot_token}/sendMessage";
    $post_data = [
        'chat_id' => $chat_id,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    $response = curl_exec($ch);
    curl_close($ch);
    
    echo json_encode(['success' => true, 'message' => 'Отправлено!']);
} else {
    echo json_encode(['error' => 'Только POST запросы']);
}
?>
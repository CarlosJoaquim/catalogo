<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = 'data/produtos.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Salvar dados
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (json_last_error() === JSON_ERROR_NONE) {
        file_put_contents($dataFile, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'message' => 'Dados salvos com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'error' => 'JSON inválido']);
    }
} else {
    // Carregar dados
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Arquivo não encontrado']);
    }
}
?>
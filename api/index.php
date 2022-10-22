<?php
class Deck {
    private $result;

    function __construct(){
        if($_SERVER['REQUEST_METHOD'] != 'POST'){
            header('Allow: POST');
            header('HTTP/1.1 405 Method Not Allowed');
            header('Content-Type: text/plain');
            echo "Only POST request is allowed.";
            exit;
        }
    }

    function shapes() {
        return ['S', 'H', 'D', 'C'];
    }

    function numbers() {
        return ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'];
    }

    function cards(){
        $cards = [];
        foreach($this->shapes() as $shape) {
            foreach($this->numbers() as $number) {
                $cards[] = $shape."-".$number;
            }
        }
        shuffle($cards);
        return $cards;
    }

    function distribute($players){
        if($players < 1 || $players > 52){
            return [
                'message' => 'Input is invalid',
                'status' => 'error'
            ];
        }

        $cards = $this->cards();
        $cards_per_player = floor(count($cards) / $players);
        
        for($i = 0; $i < $players; $i++){
            $this->result[$i] = [];
            for($j = 0; $j < $cards_per_player; $j++){
                array_push($this->result[$i], $cards[$j]);
            }
            $cards = array_diff_assoc($cards, $this->result[$i]);
            $cards = array_values(array_filter($cards));
        }

        //Distribute Balance
        for($i = 0; $i < count($cards); $i++){
            array_push($this->result[$i], $cards[$i]);
        }
        
        return [
            'distributed' => $this->result,
            'balance' => $cards
        ];
    }
}

$deck = new Deck;
$input = json_decode(file_get_contents('php://input'), true)['players'] ?? 0;
header("Content-Type: application/json");
echo json_encode($deck->distribute($input));
?>
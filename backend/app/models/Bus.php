<?php

namespace app\models;

require 'Model.php';

use app\models\Model;

use PDO;

class Bus extends Model
{
    private $number_bus;
    private $companyID;
    private $capacity;
    private $cost_per_km;




    public function setNumberBus($number_bus)
    {
        $this->number_bus = $number_bus;
    }

    public function setCompanyID($companyID)
    {
        $this->companyID = $companyID;
    }

    public function setCapacity($capacity)
    {
        $this->capacity = $capacity;
    }

    public function setCostPerKm($cost_per_km)
    {
        $this->cost_per_km = $cost_per_km;
    }

    public static function latest()
    {


        return static::database()->query('SELECT bus.* , company.name AS companyName ,company.image AS companyImage  FROM bus LEFT JOIN company ON bus.companyID = company.id order by id DESC')
            ->fetchAll(PDO::FETCH_ASSOC);
    }



    public static function all()
    {
        return static::database()
            ->query("SELECT * FROM bus")
            ->fetchAll(PDO::FETCH_ASSOC);
    }



    public static function find($number_bus)
    {
        return static::where('number_bus', $number_bus);
    }


    //get element from db with condition
    public static function where($column, $value, $operator = '=')
    {
        $sqlState = self::database()->prepare("SELECT * FROM bus WHERE $column $operator ?");
        $sqlState->execute([$value]);
        $data = $sqlState->fetchAll(PDO::FETCH_ASSOC);
        if (empty($data)) {
            return null;
        }
        return $data;
    }




    public function create()
    {
        $sqlState = static::database()->prepare("INSERT INTO bus (number_bus, companyID, capacity, cost_per_km) VALUES (?, ?, ?, ?)");
        return $sqlState->execute([$this->number_bus, $this->companyID, $this->capacity, $this->cost_per_km]);
    }
    // public function update()
    // {
    //     $sqlState = static::database()->prepare("UPDATE company SET name=?, image=? WHERE id=?");
    //     return $sqlState->execute([$this->name, $this->img, $this->id]);
    // }
    public function update()
    {
        $sql = "UPDATE bus SET ";
        $params = [];

        if ($this->number_bus !== null) {
            $sql .= "number_bus=?, ";
            $params[] = $this->number_bus;
        }

        if ($this->companyID !== null) {
            $sql .= "companyID=?, ";
            $params[] = $this->companyID;
        }

        if ($this->capacity !== null) {
            $sql .= "capacity=?, ";
            $params[] = $this->capacity;
        }

        if ($this->cost_per_km !== null) {
            $sql .= "cost_per_km=?, ";
            $params[] = $this->cost_per_km;
        }

        // Remove the trailing comma and space from the SQL string
        $sql = rtrim($sql, ", ");

        $sql .= " WHERE number_bus=?";
        $params[] = $this->number_bus;

        $sqlState = static::database()->prepare($sql);

        return $sqlState->execute($params);
    }

    public static function  destroy($number_bus)
    {



        $removeTripFirst = self::database()->prepare("DELETE FROM trip WHERE number_bus = ?");
        $removeTripFirst->execute([$number_bus]);
        if ($removeTripFirst) {
            $sqlState = self::database()->prepare("DELETE FROM bus WHERE number_bus = ?");
            return $sqlState->execute([$number_bus]);
        }
    }
}

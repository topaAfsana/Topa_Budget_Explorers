package com.topa.dbmicroservice.controller;


import com.topa.dbmicroservice.model.ResultHolder;
import com.topa.dbmicroservice.service.DBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;


@CrossOrigin
@RestController
public class DBController {

    @Autowired
    private DBService dbService;

    //1. url sample: http://localhost:8080/create_table?tableName=yourTable
    @RequestMapping(value = "/create_table", method = RequestMethod.POST)
    public String createTable(@RequestParam() String tableName) {
        return dbService.createTableService(tableName); }

   //2. url sample: http://localhost:8080/find_table?tableName=yourTable
    @RequestMapping(value = "/find_table", method = RequestMethod.GET)
    public String findTable(@RequestParam() String tableName){
        return dbService.findTableService(tableName); }


    //3. url sample: http://localhost:8080/add_record?tableName=table1&date=24 may&expense=lotte&amount=340
    @RequestMapping(value = "/add_record", method = RequestMethod.POST)
    public String addRecord(@RequestParam() String tableName, String date,String title, int amount) {
        return dbService.addRecordService(tableName,date,title,amount); }


    //4. url sample: http://localhost:8080/show_records?tableName=yourTable
    @RequestMapping("/show_records")
    public List<ResultHolder> showRecords(@RequestParam() String tableName) throws ClassNotFoundException, SQLException {
        return dbService.showRecordsService(tableName);

    }

}

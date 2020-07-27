package com.topa.dbmicroservice.controller;


import com.topa.dbmicroservice.model.ProfileTableItems;
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
    public String addRecord(@RequestParam() String tableName, String date,String title, float amount) {
        return dbService.addRecordService(tableName,date,title,amount); }


    //4. url sample: http://localhost:8080/show_records?tableName=yourTable
    @RequestMapping("/show_records")
    public List<ResultHolder> showRecords(@RequestParam() String tableName) throws ClassNotFoundException, SQLException {
        return dbService.showRecordsService(tableName); }


    //5. url sample: http://localhost:8080/update_on?tableName=yourTable&newdate=yourDate
    @RequestMapping(value = "/update_on", method = RequestMethod.POST)
    public String updateOn(@RequestParam() String tableName,String  newdate) {
        return dbService.updateOnService(tableName,newdate); }

    //6. url sample: http://localhost:8080/get_updated_date?tableName=yourTable
    @RequestMapping("/get_updated_date")
    public String getUpdatedOnDate(@RequestParam() String tableName) throws ClassNotFoundException, SQLException {
        return dbService.getUpdatedOnDateService(tableName); }


    //7. url sample: http://localhost:8080/show_tables
    @RequestMapping("/show_tables")
    public List<String> getAllDataTable() throws ClassNotFoundException, SQLException {
        return dbService.getAllDataTableListService(); }


    //8. url sample: http://localhost:8080/update_record?tableName=table1&date=24may&expense=lotte&amount=340&id=1
    @RequestMapping(value = "/update_record", method = RequestMethod.POST)
    public String updateRecord(@RequestParam() String tableName, String date,String title, float amount,int id) {
        return dbService.updateRecordService(tableName,date,title,amount,id); }


    //9. url sample: http://localhost:8080/dlete_record?id=1
    @RequestMapping(value = "/delete_record", method = RequestMethod.POST)
    public String deleteRecord(@RequestParam() String tableName, int id) {
        return dbService.deleteRecordService(tableName,id); }


    //10. url sample: http://localhost:8080/create_profile?profileName=yourName&pass=yourPass
    @RequestMapping(value = "/create_profile", method = RequestMethod.POST)
    public String createProfile(@RequestParam() String profileName,String  pass) {
        return dbService.createProfileService(profileName,pass); }


    //11. url sample: http://localhost:8080/authenticate_profile?profileName=yourName&pass=yourPass
    @RequestMapping(value = "/authenticate_profile", method = RequestMethod.GET)
    public String authenticateProfile(@RequestParam() String profileName, String  pass)throws ClassNotFoundException, SQLException{
        return dbService.authenticateProfileService(profileName,pass); }




    //12. url sample: http://localhost:8080/create_profile_based_table?profileName=yourName
    @RequestMapping(value = "/create_profile_based_table", method = RequestMethod.POST)
    public String createProfileBasedTable(@RequestParam() String profileName) {
        return dbService.createProfileBasedTableService(profileName); }


    //13. url sample: http://localhost:8080/insert_into_profile_based_table?profileName=yourName&tableName=yourTable
    @RequestMapping(value = "/insert_into_profile_based_table", method = RequestMethod.POST)
    public String insertIntoProfileBasedTable(@RequestParam() String profileName,String tableName) {
        return dbService.insertIntoProfileBasedTableService(profileName,tableName); }



    //14. url sample: http://localhost:8080/get_tables_from_profile_based_table?profileName=yourProfile
    @RequestMapping("/get_tables_from_profile_based_table")
    public List<ProfileTableItems> getTablesNamefromProfileBasedTable(@RequestParam() String profileName) throws ClassNotFoundException, SQLException {
        return dbService.getTablesNamefromProfileBasedTableService(profileName); }



    //15. url sample: http://localhost:8080/validate_table_from_profile_based_table?profileName=myProfile&tableName=yourTable
    @RequestMapping(value = "/validate_table_from_profile_based_table", method = RequestMethod.GET)
    public String validateTableFromProfileBasedTable(@RequestParam() String profileName,String tableName){
        return dbService.validateTableFromProfileBasedTableService(profileName,tableName); }

    //16. url sample: http://localhost:8080/delete_table?profileName=yourName&tableName=yourTable
    @RequestMapping(value = "/delete_table", method = RequestMethod.POST)
    public String deleteTable(@RequestParam() String profileName,String tableName) {
        return dbService.deleteTableService(profileName,tableName); }

    //17. url sample: http://localhost:8080/rename_table?profileName=yourName&newTableName=newTable&oldTableName=oldTable
    @RequestMapping(value = "/rename_table", method = RequestMethod.POST)
    public String renameTable(@RequestParam() String profileName,String newTableName,String oldTableName) {
        return dbService.renameTableService(profileName,newTableName,oldTableName); }



    //18. url sample: http://localhost:8080/update_pass?profileName=yourName&newPass=newPass
    @RequestMapping(value = "/update_pass", method = RequestMethod.POST)
    public String updateProfPass(@RequestParam() String profileName,String newPass) {
        return dbService.updateProfPassService(profileName,newPass); }

}


package com.topa.dbmicroservice.service;

import com.topa.dbmicroservice.model.ResultHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class DBService {

    @Autowired
    JdbcTemplate jdbc;


    //CREATE CUSTOM OLD MODEL JDBC CONNECTION
    public Connection createDBConnection() throws ClassNotFoundException, SQLException {


        //Database Username
        String username = "root";

        //RDS DB INFO
//        String dbUrl = "jdbc:mysql://budget-explorer-db.ckult7yatbtp.us-east-1.rds.amazonaws.com:3306/TOPADB?serverTimezone=UTC";
//        String password = "TOPADBRDS";

        //LOCAL DB INFO TO TEST
         String dbUrl = "jdbc:mysql://192.168.0.14:3306/TOPADB?serverTimezone=UTC";
         String password = "Tishan@2016";


        //LOAD MYSQL JDBC DRIVER
        Class.forName("com.mysql.cj.jdbc.Driver");

        //CREATE CONNECTION TO DB
        Connection con = DriverManager.getConnection(dbUrl, username, password);
        //RETURN THE CONNECTION WHEN THIS METHOD IS CALLED
        return con;

    }


    //1. SERVICE: CREATE TABLE
    public String createTableService(String tableName) {
        //THIS METHOD USED SPRING BOOT JDBC TEMPLATE
        jdbc.execute(" CREATE TABLE `TOPADB`.`" + tableName + "` (\n" +
                "  `id` INT NOT NULL AUTO_INCREMENT,\n" +
                "  `date` VARCHAR(45) NOT NULL,\n" +
                "  `title` VARCHAR(45) NOT NULL,\n" +
                "  `amount` INT NOT NULL,\n" +
                "  PRIMARY KEY (`id`),\n" +
                "  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);\n");
        addTableToUpdatedOnService(tableName);
        return "TABLE IS SUCCESSFULLY CREATED";
    }

    //2. SERVICE: FIND TABLE
    public String findTableService(@RequestParam() String tableName) {
        List<String> list= new ArrayList<>();
        try{
            Connection con=createDBConnection();
            Statement stmt = con.createStatement();
            //Query to Execute
            String query = "show tables";
            ResultSet rs = stmt.executeQuery(query);

            // While Loop to iterate through all data and print results
            while (rs.next()) {
                String table = rs.getString(1);
                list.add(table); }
            con.close();
        }
        catch (ClassNotFoundException | SQLException sqlEx)
        {System.out.println(sqlEx.getMessage());}

        for(String mytab:list){
            if(mytab.equalsIgnoreCase(tableName)){
                return "TABLE FOUND"; } }
        return null;
    }


    // 3. SERVICE: INSERT ROW IN THE TABLE
    public String addRecordService(String tableName, String date,String title, int amount) {
        jdbc.execute("INSERT INTO `TOPADB`.`" + tableName + "`(`id`,`date`,`title`,`amount`)VALUES(id,\"" + date + "\",\"" + title + "\"," + amount + ");");
        return "ROW/RECORD INSERTED IN THE TABLE"; }

    //4. SERVICE: SHOW ALL RECORD OF A TABLE
     public List<ResultHolder> showRecordsService(String tableName) throws ClassNotFoundException, SQLException {

         Connection con=createDBConnection();
            //Create Statement Object
            Statement stmt = con.createStatement();
            //Query to Execute
            String query = "select *  from "+tableName+";";
            // Execute the SQL Query. Store results in ResultSet
            ResultSet rs = stmt.executeQuery(query);
            // While Loop to iterate through all data and print results
            List<ResultHolder> list = new ArrayList<>();
            while (rs.next()) {
                ResultHolder resultHolder = new ResultHolder();
                resultHolder.setId(rs.getInt(1));
                resultHolder.setDate(rs.getString(2));
                resultHolder.setTitle(rs.getString(3));
                resultHolder.setAmount(rs.getInt(4));
                list.add(resultHolder); }
            con.close();
            return  list;
        }

     //5. SERVICE: CREATE ROW WITH NEW DATA TABLE IN UPDATEDON TABLE-NESTED IN CREATE NEW TABLE
    public String addTableToUpdatedOnService(String tableName){
    jdbc.execute("INSERT INTO TOPADB.UPDATED_ON (id,tableName,updated)VALUES(id,\""+tableName+"\",\"Default\");");
    return "NEW TABLE ADDED TO UPDATED_ON";
    }

    //6. SERVICE: UPDATE THE UPDATED COLUMN WHEN NEW RECORD WILL BE ADDED
    public String updateOnService(String tableName, String  newdate) {
        jdbc.execute(" UPDATE TOPADB.UPDATED_ON SET updated = '"+newdate+"' WHERE tableName= '"+tableName+"';");
        return "UPDATED ON: UP-TO-DATE"; }

    //7. SERVICE: GET THE DATE WHEN THE DATABASE TABLE UPDATED
    public String getUpdatedOnDateService(String tableName) throws ClassNotFoundException, SQLException {
       List<String> myUpdateddateList= new ArrayList<>();
        try{
            Connection con=createDBConnection();
            Statement stmt = con.createStatement();
            String query = "SELECT * FROM TOPADB.UPDATED_ON WHERE tableName='"+tableName+"';";
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                String updated_on_date = rs.getString(3);
                myUpdateddateList.add(updated_on_date);
            }con.close(); }
        catch (ClassNotFoundException | SQLException sqlEx) {System.out.println(sqlEx.getMessage());}
        String updated_on_date=myUpdateddateList.get(0);
        return updated_on_date;
    }


}

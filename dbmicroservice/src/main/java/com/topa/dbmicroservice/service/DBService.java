package com.topa.dbmicroservice.service;

import com.topa.dbmicroservice.model.ProfileTableItems;
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

        // 1.RDS DB INFO
        String dbUrl = "jdbc:mysql://budget-explorer-db.ckult7yatbtp.us-east-1.rds.amazonaws.com:3306/TOPADB?serverTimezone=UTC";
        String password = "TOPADBRDS";

        //2.LOCAL DB INFO TO TEST
//         String dbUrl = "jdbc:mysql://192.168.0.14:3306/TOPADB?serverTimezone=UTC";
//         String password = "Tishan@2016";


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
        if(findTableService(tableName)=="TABLE FOUND IN DATABASE"){return "TABLE ALREADY EXISTS";}
        else{jdbc.execute(" CREATE TABLE `TOPADB`.`" + tableName + "` (\n" +
                "  `id` INT NOT NULL AUTO_INCREMENT,\n" +
                "  `date` VARCHAR(45) NULL,\n" +
                "  `title` VARCHAR(45) NOT NULL,\n" +
                "  `amount` FLOAT(100,2) NOT NULL,\n" +
                "  PRIMARY KEY (`id`),\n" +
                "  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);\n");
            addTableToUpdatedOnService(tableName);

            return "TABLE IS SUCCESSFULLY CREATED";}
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
                return "TABLE FOUND IN DATABASE"; } }
        return null;
    }


    // 3. SERVICE: INSERT ROW IN THE TABLE
    public String addRecordService(String tableName, String date,String title, float amount) {
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
                resultHolder.setAmount(rs.getFloat(4));
                list.add(resultHolder); }
            con.close();
            return  list;
        }

     //5. SERVICE: CREATE ROW WITH NEW DATA TABLE IN UPDATEDON TABLE-NESTED IN CREATE NEW TABLE
    public String addTableToUpdatedOnService(String tableName){
    jdbc.execute("INSERT INTO TOPADB.UPDATED_ON (id,tableName,updated)VALUES(id,\""+tableName+"\",\" \");");
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


    //8. SERVICE: DISPLAY ALL THE DATA TABLE
    public List<String> getAllDataTableListService() throws ClassNotFoundException, SQLException {
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

        return  list;
    }




    //9. SERVICE: UPDATE RECORD IN A TABLE
    public String updateRecordService(String tableName, String date,String title, float amount, int id) {
        jdbc.execute("UPDATE `TOPADB`.`"+tableName+"` SET\n" +
                " `date` = \""+date+"\", `title` = \""+title+"\",`amount` = "+amount+" WHERE `id` = "+id+";");
        return "ROW/RECORD UPDATED IN THE TABLE"; }




    //10. SERVICE: DELETE RECORD IN A TABLE
    public String deleteRecordService(String tableName,int id) {
        jdbc.execute("DELETE FROM `TOPADB`.`"+tableName+"` WHERE `id` = "+id+";");
        return "ROW/RECORD DELETED FROM THE TABLE"; }





    //11. SERVICE: CREATE PROFILE
    public String createProfileService(String profileName,String pass){
        jdbc.execute("INSERT INTO `TOPADB`.`USERS_TABLE`(`id`,`profileName`,`pass`)\n" +
                "VALUES(id,\""+profileName+"\",\""+pass+"\");");
        return "PROFILE IS SUCCESSFULLY CREATED";
    }


    //12. SERVICE: AUTHENTICATE PROFILE
    public String authenticateProfileService(String profileName,String pass) throws ClassNotFoundException, SQLException{
        Connection con=createDBConnection();
        Statement stmt = con.createStatement();
        String query = "SELECT count(id) FROM `TOPADB`.`USERS_TABLE` where profileName=\""+profileName+"\" And pass=\""+pass+"\"";
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) {
            int rowNum=rs.getInt(1);
            System.out.println("MY ROWS "+rowNum);
            if (rowNum == 1){
                return  "PROFILE FOUND";
            }
            else if (rowNum == 0){
                return  "PROFILE NOT FOUND";
            }
        }
        con.close();
        return null;
    }


    //13. SERVICE: CREATE A PROFILE TABLE TO HOLD THE TABLE NAME CREATED BY THE PROFILE NAME
    public String createProfileBasedTableService(String profileName) {
        //THIS METHOD USED SPRING BOOT JDBC TEMPLATE
       jdbc.execute("CREATE TABLE `TOPADB`.`"+profileName+"_PROFILE` (\n" +
                "            `id` INT NOT NULL AUTO_INCREMENT, `profile_tables` VARCHAR(45) NOT NULL,PRIMARY KEY (`id`),\n" +
                "    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,UNIQUE INDEX `profile_tables_UNIQUE` (`profile_tables` ASC) VISIBLE);");
            return "PROFILE BASED TABLE IS SUCCESSFULLY CREATED";
    }



    // 14. SERVICE: INSERT TABLE NAME  IN THE PROFILE BASED TABLE
    public String insertIntoProfileBasedTableService(String profileName,String tableName) {
        jdbc.execute("INSERT INTO `TOPADB`.`"+profileName+"`\n" +
                " (`id`,`profile_tables`)VALUES(id,\""+tableName+"\");");
        return "ROW/RECORD INSERTED IN THE PROFILE BASED TABLE"; }


    //15. SERVICE: SHOW ALL THE  TABLE NAME UNDER PROFILE BASED TABLE AS LIST
    public List<ProfileTableItems> getTablesNamefromProfileBasedTableService(String profileName) throws ClassNotFoundException, SQLException {
        Connection con=createDBConnection();
        Statement stmt = con.createStatement();
        String query = "SELECT * FROM `TOPADB`.`"+profileName+"_PROFILE`;";
        ResultSet rs = stmt.executeQuery(query);

        List<ProfileTableItems> list = new ArrayList<>();
        while (rs.next()) {
            ProfileTableItems profileTableItems = new ProfileTableItems();
            profileTableItems.setId(rs.getInt(1));
            profileTableItems.setTableName(rs.getString(2));
            list.add(profileTableItems); }
        con.close();
        return  list;
    }




    //16. SERVICE: VALIDATE TABLE NAME IN PROFILE BASED TABLE
    public String validateTableFromProfileBasedTableService(@RequestParam() String profileName,String tableName) {
        List<String> list= new ArrayList<>();
        try{
            Connection con=createDBConnection();
            Statement stmt = con.createStatement();
            String query = "SELECT * FROM `TOPADB`.`"+profileName+"_PROFILE`;";
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                String table = rs.getString(2);
                list.add(table); }
            con.close();
        }
        catch (ClassNotFoundException | SQLException sqlEx)
        {System.out.println(sqlEx.getMessage());}

        for(String dbtable:list){
            if(dbtable.equalsIgnoreCase(tableName)){
                return "TABLE NAME FOUND IN PROFILE BASED TABLE"; } }
        return null;
    }

    //17. SERVICE: DELETE TABLE NAME ON UPDATED TABLE
    public String deleteRecordFromUpdatedOnTableService(String tableName) {
        jdbc.execute("DELETE FROM `TOPADB`.`UPDATED_ON` WHERE `tableName` =\""+tableName+"\";");
        return "ROW/RECORD DELETED FROM THE TABLE"; }

    //18. SERVICE: DELETE TABLE NAME ON PROFILE TABLE
    public String deleteRecordFromProfileTableService(String profileName, String tableName) {
        jdbc.execute("DELETE FROM `TOPADB`.`"+profileName+"_PROFILE` WHERE `profile_tables` = \""+tableName+"\";");
        return "ROW/RECORD DELETED FROM THE TABLE"; }

    //19. SERVICE: DELETE A TABLE FROM A DB,UPDATED ON AND PROFILE TABLE
    public String deleteTableService(String profileName,String tableName) {
        jdbc.execute("DROP TABLE TOPADB."+tableName+";");
        deleteRecordFromUpdatedOnTableService(tableName);
        deleteRecordFromProfileTableService(profileName,tableName);
        return "TABLE DELETED FROM THE DB,UPDATED_ON AND PROFILE TABLE"; }




    //20. SERVICE: RENAME TABLE NAME IN UPDATED ON TABLE
    public String reNameTableNameOnUpdatedTableService( String  newTableName,String oldTableName) {
        jdbc.execute(" UPDATE TOPADB.UPDATED_ON SET tableName = '"+newTableName+"' WHERE tableName= '"+oldTableName+"';");
        return "TABLE NAME ON UPDATED ON TABLE RENAMED"; }

    //21. SERVICE: RENAME TABLE NAME IN PROFILE ON TABLE
    public String reNameTableNameOnProfileTableService(String profileName,String  newTableName,String oldTableName) {
        jdbc.execute(" UPDATE TOPADB."+profileName+"_PROFILE SET profile_tables = '"+newTableName+"' WHERE profile_tables= '"+oldTableName+"';");
        return "TABLE NAME ON PROFILE RENAMED"; }


    //22. SERVICE: RENAME TABLE IN A DB,UPDATED ON AND PROFILE TABLE
    public String renameTableService(String profileName,String newTableName,String oldTableName) {
        jdbc.execute("ALTER TABLE `TOPADB`.`"+oldTableName+"`\n" +
                "RENAME TO  `TOPADB`.`"+newTableName+"` ;");
        reNameTableNameOnUpdatedTableService(newTableName,oldTableName);
        reNameTableNameOnProfileTableService(profileName,newTableName,oldTableName);
        return "TABLE RENAMED ON THE DB,UPDATED_ON AND PROFILE TABLE"; }



}


















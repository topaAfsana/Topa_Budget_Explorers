package com.topa.dbmicroservice.model;

public class ProfileTableItems {
    private int id;
    private String tableName;

    public ProfileTableItems() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}

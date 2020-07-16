package com.topa.dbmicroservice.model;

public class ResultHolder {
    private int id;
    private String date;
    private String title;
    private int amount;


    //DEFAULT CONSTRUCTOR
    public ResultHolder() {
    }

    //GETTER AND SETTER

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}

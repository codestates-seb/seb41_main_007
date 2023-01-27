package com.bzzzzz.farm.common;

public class Safety {
    public static long toLong(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            return 0L;
        }
    }
}

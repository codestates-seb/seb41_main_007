package com.bzzzzz.farm.global.security.refresh;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RefreshToken {
    @Id
    @Column(name = "RT_KEY")
    private String key;

    @Column(name = "RT_VALUE")
    private String value;

    public RefreshToken updateValue(String token){
        this.value = token;
        return this;
    }
}

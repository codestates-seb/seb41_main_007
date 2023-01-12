package com.bzzzzz.farm.image.entity;

import com.bzzzzz.farm.audit.Auditable;
import com.bzzzzz.farm.review.entity.Review;
import com.bzzzzz.farm.review.entity.ReviewAnswer;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Image extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reviewId")
    private Review review;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name ="reviewAnswerId")
    private ReviewAnswer reviewAnswer;

    @Column
    private String fileName;

    @Column
    private String s3Url;

    @Column
    private String s3FilePath;



}

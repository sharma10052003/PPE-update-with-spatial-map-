var wms_layers = [];


        var lyr_Googlesatellite_0 = new ol.layer.Tile({
            'title': 'Google satellite ',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
            })
        });
var format_CollegeBoundary_1 = new ol.format.GeoJSON();
var features_CollegeBoundary_1 = format_CollegeBoundary_1.readFeatures(json_CollegeBoundary_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CollegeBoundary_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CollegeBoundary_1.addFeatures(features_CollegeBoundary_1);
var lyr_CollegeBoundary_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CollegeBoundary_1, 
                style: style_CollegeBoundary_1,
                popuplayertitle: 'College Boundary',
                interactive: false,
                title: '<img src="styles/legend/CollegeBoundary_1.png" /> College Boundary'
            });
var format_Road_2 = new ol.format.GeoJSON();
var features_Road_2 = format_Road_2.readFeatures(json_Road_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Road_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Road_2.addFeatures(features_Road_2);
var lyr_Road_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Road_2, 
                style: style_Road_2,
                popuplayertitle: 'Road',
                interactive: false,
                title: '<img src="styles/legend/Road_2.png" /> Road'
            });
var format_Footpath_3 = new ol.format.GeoJSON();
var features_Footpath_3 = format_Footpath_3.readFeatures(json_Footpath_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Footpath_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Footpath_3.addFeatures(features_Footpath_3);
var lyr_Footpath_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Footpath_3, 
                style: style_Footpath_3,
                popuplayertitle: 'Footpath',
                interactive: false,
                title: '<img src="styles/legend/Footpath_3.png" /> Footpath'
            });
var format_National_Highway_4 = new ol.format.GeoJSON();
var features_National_Highway_4 = format_National_Highway_4.readFeatures(json_National_Highway_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_National_Highway_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_National_Highway_4.addFeatures(features_National_Highway_4);
var lyr_National_Highway_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_National_Highway_4, 
                style: style_National_Highway_4,
                popuplayertitle: 'National_Highway',
                interactive: false,
                title: '<img src="styles/legend/National_Highway_4.png" /> National_Highway'
            });
var format_Fountain_5 = new ol.format.GeoJSON();
var features_Fountain_5 = format_Fountain_5.readFeatures(json_Fountain_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Fountain_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Fountain_5.addFeatures(features_Fountain_5);
var lyr_Fountain_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Fountain_5, 
                style: style_Fountain_5,
                popuplayertitle: 'Fountain',
                interactive: true,
                title: '<img src="styles/legend/Fountain_5.png" /> Fountain'
            });
var format_FishPond_6 = new ol.format.GeoJSON();
var features_FishPond_6 = format_FishPond_6.readFeatures(json_FishPond_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FishPond_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FishPond_6.addFeatures(features_FishPond_6);
var lyr_FishPond_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FishPond_6, 
                style: style_FishPond_6,
                popuplayertitle: 'Fish Pond',
                interactive: true,
                title: '<img src="styles/legend/FishPond_6.png" /> Fish Pond'
            });
var format_WisdomTree_7 = new ol.format.GeoJSON();
var features_WisdomTree_7 = format_WisdomTree_7.readFeatures(json_WisdomTree_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_WisdomTree_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_WisdomTree_7.addFeatures(features_WisdomTree_7);
var lyr_WisdomTree_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_WisdomTree_7, 
                style: style_WisdomTree_7,
                popuplayertitle: 'Wisdom Tree',
                interactive: true,
                title: '<img src="styles/legend/WisdomTree_7.png" /> Wisdom Tree'
            });
var format_Monument_8 = new ol.format.GeoJSON();
var features_Monument_8 = format_Monument_8.readFeatures(json_Monument_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Monument_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Monument_8.addFeatures(features_Monument_8);
var lyr_Monument_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Monument_8, 
                style: style_Monument_8,
                popuplayertitle: 'Monument',
                interactive: true,
                title: '<img src="styles/legend/Monument_8.png" /> Monument'
            });
var format_Chorten_9 = new ol.format.GeoJSON();
var features_Chorten_9 = format_Chorten_9.readFeatures(json_Chorten_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Chorten_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Chorten_9.addFeatures(features_Chorten_9);
var lyr_Chorten_9 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Chorten_9, 
                style: style_Chorten_9,
                popuplayertitle: 'Chorten',
                interactive: true,
                title: '<img src="styles/legend/Chorten_9.png" /> Chorten'
            });
var format_Gate_10 = new ol.format.GeoJSON();
var features_Gate_10 = format_Gate_10.readFeatures(json_Gate_10, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Gate_10 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Gate_10.addFeatures(features_Gate_10);
var lyr_Gate_10 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Gate_10, 
                style: style_Gate_10,
                popuplayertitle: 'Gate',
                interactive: true,
                title: '<img src="styles/legend/Gate_10.png" /> Gate'
            });
var format_SlappingBridge_11 = new ol.format.GeoJSON();
var features_SlappingBridge_11 = format_SlappingBridge_11.readFeatures(json_SlappingBridge_11, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SlappingBridge_11 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SlappingBridge_11.addFeatures(features_SlappingBridge_11);
var lyr_SlappingBridge_11 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_SlappingBridge_11, 
                style: style_SlappingBridge_11,
                popuplayertitle: 'Slapping Bridge',
                interactive: true,
                title: '<img src="styles/legend/SlappingBridge_11.png" /> Slapping Bridge'
            });
var format_ManiLakhor_12 = new ol.format.GeoJSON();
var features_ManiLakhor_12 = format_ManiLakhor_12.readFeatures(json_ManiLakhor_12, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ManiLakhor_12 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ManiLakhor_12.addFeatures(features_ManiLakhor_12);
var lyr_ManiLakhor_12 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ManiLakhor_12, 
                style: style_ManiLakhor_12,
                popuplayertitle: 'Mani Lakhor',
                interactive: true,
                title: '<img src="styles/legend/ManiLakhor_12.png" /> Mani Lakhor'
            });
var format_GarbageHouse_13 = new ol.format.GeoJSON();
var features_GarbageHouse_13 = format_GarbageHouse_13.readFeatures(json_GarbageHouse_13, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GarbageHouse_13 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GarbageHouse_13.addFeatures(features_GarbageHouse_13);
var lyr_GarbageHouse_13 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_GarbageHouse_13, 
                style: style_GarbageHouse_13,
                popuplayertitle: 'Garbage House',
                interactive: true,
                title: '<img src="styles/legend/GarbageHouse_13.png" /> Garbage House'
            });
var format_Canopy_14 = new ol.format.GeoJSON();
var features_Canopy_14 = format_Canopy_14.readFeatures(json_Canopy_14, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Canopy_14 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Canopy_14.addFeatures(features_Canopy_14);
var lyr_Canopy_14 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Canopy_14, 
                style: style_Canopy_14,
                popuplayertitle: 'Canopy',
                interactive: true,
                title: '<img src="styles/legend/Canopy_14.png" /> Canopy'
            });
var format_ChildrenPark_15 = new ol.format.GeoJSON();
var features_ChildrenPark_15 = format_ChildrenPark_15.readFeatures(json_ChildrenPark_15, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ChildrenPark_15 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ChildrenPark_15.addFeatures(features_ChildrenPark_15);
var lyr_ChildrenPark_15 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ChildrenPark_15, 
                style: style_ChildrenPark_15,
                popuplayertitle: 'Children Park',
                interactive: true,
                title: '<img src="styles/legend/ChildrenPark_15.png" /> Children Park'
            });
var format_GirlsBasketballCourt_16 = new ol.format.GeoJSON();
var features_GirlsBasketballCourt_16 = format_GirlsBasketballCourt_16.readFeatures(json_GirlsBasketballCourt_16, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GirlsBasketballCourt_16 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GirlsBasketballCourt_16.addFeatures(features_GirlsBasketballCourt_16);
var lyr_GirlsBasketballCourt_16 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_GirlsBasketballCourt_16, 
                style: style_GirlsBasketballCourt_16,
                popuplayertitle: 'Girls Basketball Court',
                interactive: true,
                title: '<img src="styles/legend/GirlsBasketballCourt_16.png" /> Girls Basketball Court'
            });
var format_VolleyballCourt_17 = new ol.format.GeoJSON();
var features_VolleyballCourt_17 = format_VolleyballCourt_17.readFeatures(json_VolleyballCourt_17, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_VolleyballCourt_17 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_VolleyballCourt_17.addFeatures(features_VolleyballCourt_17);
var lyr_VolleyballCourt_17 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_VolleyballCourt_17, 
                style: style_VolleyballCourt_17,
                popuplayertitle: 'Volleyball Court',
                interactive: true,
                title: '<img src="styles/legend/VolleyballCourt_17.png" /> Volleyball Court'
            });
var format_FootballGround_18 = new ol.format.GeoJSON();
var features_FootballGround_18 = format_FootballGround_18.readFeatures(json_FootballGround_18, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FootballGround_18 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FootballGround_18.addFeatures(features_FootballGround_18);
var lyr_FootballGround_18 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FootballGround_18, 
                style: style_FootballGround_18,
                popuplayertitle: 'Football Ground',
                interactive: true,
                title: '<img src="styles/legend/FootballGround_18.png" /> Football Ground'
            });
var format_SherubtseStadium_19 = new ol.format.GeoJSON();
var features_SherubtseStadium_19 = format_SherubtseStadium_19.readFeatures(json_SherubtseStadium_19, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SherubtseStadium_19 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SherubtseStadium_19.addFeatures(features_SherubtseStadium_19);
var lyr_SherubtseStadium_19 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_SherubtseStadium_19, 
                style: style_SherubtseStadium_19,
                popuplayertitle: 'Sherubtse Stadium',
                interactive: true,
                title: '<img src="styles/legend/SherubtseStadium_19.png" /> Sherubtse Stadium'
            });
var format_FootballGroundGate_20 = new ol.format.GeoJSON();
var features_FootballGroundGate_20 = format_FootballGroundGate_20.readFeatures(json_FootballGroundGate_20, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FootballGroundGate_20 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FootballGroundGate_20.addFeatures(features_FootballGroundGate_20);
var lyr_FootballGroundGate_20 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FootballGroundGate_20, 
                style: style_FootballGroundGate_20,
                popuplayertitle: 'Football Ground Gate',
                interactive: true,
                title: '<img src="styles/legend/FootballGroundGate_20.png" /> Football Ground Gate'
            });
var format_FutsalGround_21 = new ol.format.GeoJSON();
var features_FutsalGround_21 = format_FutsalGround_21.readFeatures(json_FutsalGround_21, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FutsalGround_21 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FutsalGround_21.addFeatures(features_FutsalGround_21);
var lyr_FutsalGround_21 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FutsalGround_21, 
                style: style_FutsalGround_21,
                popuplayertitle: 'Futsal Ground',
                interactive: true,
                title: '<img src="styles/legend/FutsalGround_21.png" /> Futsal Ground'
            });
var format_FutsalGallery_22 = new ol.format.GeoJSON();
var features_FutsalGallery_22 = format_FutsalGallery_22.readFeatures(json_FutsalGallery_22, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FutsalGallery_22 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FutsalGallery_22.addFeatures(features_FutsalGallery_22);
var lyr_FutsalGallery_22 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FutsalGallery_22, 
                style: style_FutsalGallery_22,
                popuplayertitle: 'Futsal Gallery',
                interactive: true,
                title: '<img src="styles/legend/FutsalGallery_22.png" /> Futsal Gallery'
            });
var format_LawnTennisCourt_23 = new ol.format.GeoJSON();
var features_LawnTennisCourt_23 = format_LawnTennisCourt_23.readFeatures(json_LawnTennisCourt_23, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LawnTennisCourt_23 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LawnTennisCourt_23.addFeatures(features_LawnTennisCourt_23);
var lyr_LawnTennisCourt_23 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LawnTennisCourt_23, 
                style: style_LawnTennisCourt_23,
                popuplayertitle: 'Lawn Tennis Court',
                interactive: true,
                title: '<img src="styles/legend/LawnTennisCourt_23.png" /> Lawn Tennis Court'
            });
var format_LawnTennisGallery_24 = new ol.format.GeoJSON();
var features_LawnTennisGallery_24 = format_LawnTennisGallery_24.readFeatures(json_LawnTennisGallery_24, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LawnTennisGallery_24 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LawnTennisGallery_24.addFeatures(features_LawnTennisGallery_24);
var lyr_LawnTennisGallery_24 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LawnTennisGallery_24, 
                style: style_LawnTennisGallery_24,
                popuplayertitle: 'Lawn Tennis Gallery',
                interactive: true,
                title: '<img src="styles/legend/LawnTennisGallery_24.png" /> Lawn Tennis Gallery'
            });
var format_BasketballCourt_25 = new ol.format.GeoJSON();
var features_BasketballCourt_25 = format_BasketballCourt_25.readFeatures(json_BasketballCourt_25, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BasketballCourt_25 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BasketballCourt_25.addFeatures(features_BasketballCourt_25);
var lyr_BasketballCourt_25 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BasketballCourt_25, 
                style: style_BasketballCourt_25,
                popuplayertitle: 'Basketball Court',
                interactive: true,
                title: '<img src="styles/legend/BasketballCourt_25.png" /> Basketball Court'
            });
var format_BasketballGallery_26 = new ol.format.GeoJSON();
var features_BasketballGallery_26 = format_BasketballGallery_26.readFeatures(json_BasketballGallery_26, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BasketballGallery_26 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BasketballGallery_26.addFeatures(features_BasketballGallery_26);
var lyr_BasketballGallery_26 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BasketballGallery_26, 
                style: style_BasketballGallery_26,
                popuplayertitle: 'Basketball Gallery',
                interactive: true,
                title: '<img src="styles/legend/BasketballGallery_26.png" /> Basketball Gallery'
            });
var format_ArcheryField_27 = new ol.format.GeoJSON();
var features_ArcheryField_27 = format_ArcheryField_27.readFeatures(json_ArcheryField_27, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ArcheryField_27 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ArcheryField_27.addFeatures(features_ArcheryField_27);
var lyr_ArcheryField_27 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ArcheryField_27, 
                style: style_ArcheryField_27,
                popuplayertitle: 'Archery Field',
                interactive: true,
                title: '<img src="styles/legend/ArcheryField_27.png" /> Archery Field'
            });
var format_Gallery_28 = new ol.format.GeoJSON();
var features_Gallery_28 = format_Gallery_28.readFeatures(json_Gallery_28, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Gallery_28 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Gallery_28.addFeatures(features_Gallery_28);
var lyr_Gallery_28 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Gallery_28, 
                style: style_Gallery_28,
                popuplayertitle: 'Gallery',
                interactive: true,
                title: '<img src="styles/legend/Gallery_28.png" /> Gallery'
            });
var format_IsmileCafe_29 = new ol.format.GeoJSON();
var features_IsmileCafe_29 = format_IsmileCafe_29.readFeatures(json_IsmileCafe_29, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_IsmileCafe_29 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_IsmileCafe_29.addFeatures(features_IsmileCafe_29);
var lyr_IsmileCafe_29 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_IsmileCafe_29, 
                style: style_IsmileCafe_29,
                popuplayertitle: 'Ismile Cafe',
                interactive: true,
                title: '<img src="styles/legend/IsmileCafe_29.png" /> Ismile Cafe'
            });
var format_CollegeZangtopelri_30 = new ol.format.GeoJSON();
var features_CollegeZangtopelri_30 = format_CollegeZangtopelri_30.readFeatures(json_CollegeZangtopelri_30, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CollegeZangtopelri_30 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CollegeZangtopelri_30.addFeatures(features_CollegeZangtopelri_30);
var lyr_CollegeZangtopelri_30 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CollegeZangtopelri_30, 
                style: style_CollegeZangtopelri_30,
                popuplayertitle: 'College Zangtopelri',
                interactive: true,
                title: '<img src="styles/legend/CollegeZangtopelri_30.png" /> College Zangtopelri'
            });
var format_GuestHouse_31 = new ol.format.GeoJSON();
var features_GuestHouse_31 = format_GuestHouse_31.readFeatures(json_GuestHouse_31, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GuestHouse_31 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GuestHouse_31.addFeatures(features_GuestHouse_31);
var lyr_GuestHouse_31 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_GuestHouse_31, 
                style: style_GuestHouse_31,
                popuplayertitle: 'Guest House',
                interactive: true,
                title: '<img src="styles/legend/GuestHouse_31.png" /> Guest House'
            });
var format_StudentMess_32 = new ol.format.GeoJSON();
var features_StudentMess_32 = format_StudentMess_32.readFeatures(json_StudentMess_32, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentMess_32 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentMess_32.addFeatures(features_StudentMess_32);
var lyr_StudentMess_32 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentMess_32, 
                style: style_StudentMess_32,
                popuplayertitle: 'Student Mess',
                interactive: true,
                title: '<img src="styles/legend/StudentMess_32.png" /> Student Mess'
            });
var format_StudentMess_33 = new ol.format.GeoJSON();
var features_StudentMess_33 = format_StudentMess_33.readFeatures(json_StudentMess_33, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentMess_33 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentMess_33.addFeatures(features_StudentMess_33);
var lyr_StudentMess_33 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentMess_33, 
                style: style_StudentMess_33,
                popuplayertitle: 'Student Mess',
                interactive: true,
                title: '<img src="styles/legend/StudentMess_33.png" /> Student Mess'
            });
var format_StudentServiceVillage_34 = new ol.format.GeoJSON();
var features_StudentServiceVillage_34 = format_StudentServiceVillage_34.readFeatures(json_StudentServiceVillage_34, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentServiceVillage_34 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentServiceVillage_34.addFeatures(features_StudentServiceVillage_34);
var lyr_StudentServiceVillage_34 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentServiceVillage_34, 
                style: style_StudentServiceVillage_34,
                popuplayertitle: 'Student Service Village',
                interactive: true,
                title: '<img src="styles/legend/StudentServiceVillage_34.png" /> Student Service Village'
            });
var format_StudentServiceVillage_35 = new ol.format.GeoJSON();
var features_StudentServiceVillage_35 = format_StudentServiceVillage_35.readFeatures(json_StudentServiceVillage_35, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentServiceVillage_35 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentServiceVillage_35.addFeatures(features_StudentServiceVillage_35);
var lyr_StudentServiceVillage_35 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentServiceVillage_35, 
                style: style_StudentServiceVillage_35,
                popuplayertitle: 'Student Service Village',
                interactive: true,
                title: '<img src="styles/legend/StudentServiceVillage_35.png" /> Student Service Village'
            });
var format_StudentServiceVillage_36 = new ol.format.GeoJSON();
var features_StudentServiceVillage_36 = format_StudentServiceVillage_36.readFeatures(json_StudentServiceVillage_36, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentServiceVillage_36 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentServiceVillage_36.addFeatures(features_StudentServiceVillage_36);
var lyr_StudentServiceVillage_36 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentServiceVillage_36, 
                style: style_StudentServiceVillage_36,
                popuplayertitle: 'Student Service Village',
                interactive: true,
                title: '<img src="styles/legend/StudentServiceVillage_36.png" /> Student Service Village'
            });
var format_StudentServiceVillage_37 = new ol.format.GeoJSON();
var features_StudentServiceVillage_37 = format_StudentServiceVillage_37.readFeatures(json_StudentServiceVillage_37, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentServiceVillage_37 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentServiceVillage_37.addFeatures(features_StudentServiceVillage_37);
var lyr_StudentServiceVillage_37 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentServiceVillage_37, 
                style: style_StudentServiceVillage_37,
                popuplayertitle: 'Student Service Village',
                interactive: true,
                title: '<img src="styles/legend/StudentServiceVillage_37.png" /> Student Service Village'
            });
var format_StudentServiceVillage_38 = new ol.format.GeoJSON();
var features_StudentServiceVillage_38 = format_StudentServiceVillage_38.readFeatures(json_StudentServiceVillage_38, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentServiceVillage_38 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentServiceVillage_38.addFeatures(features_StudentServiceVillage_38);
var lyr_StudentServiceVillage_38 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentServiceVillage_38, 
                style: style_StudentServiceVillage_38,
                popuplayertitle: 'Student Service Village',
                interactive: true,
                title: '<img src="styles/legend/StudentServiceVillage_38.png" /> Student Service Village'
            });
var format_StudentServiceVillage_39 = new ol.format.GeoJSON();
var features_StudentServiceVillage_39 = format_StudentServiceVillage_39.readFeatures(json_StudentServiceVillage_39, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StudentServiceVillage_39 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StudentServiceVillage_39.addFeatures(features_StudentServiceVillage_39);
var lyr_StudentServiceVillage_39 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StudentServiceVillage_39, 
                style: style_StudentServiceVillage_39,
                popuplayertitle: 'Student Service Village',
                interactive: true,
                title: '<img src="styles/legend/StudentServiceVillage_39.png" /> Student Service Village'
            });
var format_AcademicBuilding_40 = new ol.format.GeoJSON();
var features_AcademicBuilding_40 = format_AcademicBuilding_40.readFeatures(json_AcademicBuilding_40, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_40 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_40.addFeatures(features_AcademicBuilding_40);
var lyr_AcademicBuilding_40 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_40, 
                style: style_AcademicBuilding_40,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_40.png" /> Academic Building'
            });
var format_AcademicBuilding_41 = new ol.format.GeoJSON();
var features_AcademicBuilding_41 = format_AcademicBuilding_41.readFeatures(json_AcademicBuilding_41, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_41 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_41.addFeatures(features_AcademicBuilding_41);
var lyr_AcademicBuilding_41 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_41, 
                style: style_AcademicBuilding_41,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_41.png" /> Academic Building'
            });
var format_AcademicBuilding_42 = new ol.format.GeoJSON();
var features_AcademicBuilding_42 = format_AcademicBuilding_42.readFeatures(json_AcademicBuilding_42, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_42 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_42.addFeatures(features_AcademicBuilding_42);
var lyr_AcademicBuilding_42 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_42, 
                style: style_AcademicBuilding_42,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_42.png" /> Academic Building'
            });
var format_AcademicBuilding_43 = new ol.format.GeoJSON();
var features_AcademicBuilding_43 = format_AcademicBuilding_43.readFeatures(json_AcademicBuilding_43, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_43 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_43.addFeatures(features_AcademicBuilding_43);
var lyr_AcademicBuilding_43 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_43, 
                style: style_AcademicBuilding_43,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_43.png" /> Academic Building'
            });
var format_AcademicBuilding_44 = new ol.format.GeoJSON();
var features_AcademicBuilding_44 = format_AcademicBuilding_44.readFeatures(json_AcademicBuilding_44, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_44 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_44.addFeatures(features_AcademicBuilding_44);
var lyr_AcademicBuilding_44 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_44, 
                style: style_AcademicBuilding_44,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_44.png" /> Academic Building'
            });
var format_AcademicBuilding_45 = new ol.format.GeoJSON();
var features_AcademicBuilding_45 = format_AcademicBuilding_45.readFeatures(json_AcademicBuilding_45, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_45 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_45.addFeatures(features_AcademicBuilding_45);
var lyr_AcademicBuilding_45 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_45, 
                style: style_AcademicBuilding_45,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_45.png" /> Academic Building'
            });
var format_AcademicBuilding_46 = new ol.format.GeoJSON();
var features_AcademicBuilding_46 = format_AcademicBuilding_46.readFeatures(json_AcademicBuilding_46, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_46 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_46.addFeatures(features_AcademicBuilding_46);
var lyr_AcademicBuilding_46 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_46, 
                style: style_AcademicBuilding_46,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_46.png" /> Academic Building'
            });
var format_AcademicBuilding_47 = new ol.format.GeoJSON();
var features_AcademicBuilding_47 = format_AcademicBuilding_47.readFeatures(json_AcademicBuilding_47, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_47 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_47.addFeatures(features_AcademicBuilding_47);
var lyr_AcademicBuilding_47 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_47, 
                style: style_AcademicBuilding_47,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_47.png" /> Academic Building'
            });
var format_AcademicBuilding_48 = new ol.format.GeoJSON();
var features_AcademicBuilding_48 = format_AcademicBuilding_48.readFeatures(json_AcademicBuilding_48, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_48 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_48.addFeatures(features_AcademicBuilding_48);
var lyr_AcademicBuilding_48 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_48, 
                style: style_AcademicBuilding_48,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_48.png" /> Academic Building'
            });
var format_AcademicBuilding_49 = new ol.format.GeoJSON();
var features_AcademicBuilding_49 = format_AcademicBuilding_49.readFeatures(json_AcademicBuilding_49, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_49 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_49.addFeatures(features_AcademicBuilding_49);
var lyr_AcademicBuilding_49 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_49, 
                style: style_AcademicBuilding_49,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_49.png" /> Academic Building'
            });
var format_AcademicBuilding_50 = new ol.format.GeoJSON();
var features_AcademicBuilding_50 = format_AcademicBuilding_50.readFeatures(json_AcademicBuilding_50, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_50 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_50.addFeatures(features_AcademicBuilding_50);
var lyr_AcademicBuilding_50 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_50, 
                style: style_AcademicBuilding_50,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_50.png" /> Academic Building'
            });
var format_AcademicBuilding_51 = new ol.format.GeoJSON();
var features_AcademicBuilding_51 = format_AcademicBuilding_51.readFeatures(json_AcademicBuilding_51, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_51 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_51.addFeatures(features_AcademicBuilding_51);
var lyr_AcademicBuilding_51 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_51, 
                style: style_AcademicBuilding_51,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_51.png" /> Academic Building'
            });
var format_AcademicBuilding_52 = new ol.format.GeoJSON();
var features_AcademicBuilding_52 = format_AcademicBuilding_52.readFeatures(json_AcademicBuilding_52, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_52 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_52.addFeatures(features_AcademicBuilding_52);
var lyr_AcademicBuilding_52 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_52, 
                style: style_AcademicBuilding_52,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_52.png" /> Academic Building'
            });
var format_AcademicBuilding_53 = new ol.format.GeoJSON();
var features_AcademicBuilding_53 = format_AcademicBuilding_53.readFeatures(json_AcademicBuilding_53, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AcademicBuilding_53 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AcademicBuilding_53.addFeatures(features_AcademicBuilding_53);
var lyr_AcademicBuilding_53 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AcademicBuilding_53, 
                style: style_AcademicBuilding_53,
                popuplayertitle: 'Academic Building',
                interactive: true,
                title: '<img src="styles/legend/AcademicBuilding_53.png" /> Academic Building'
            });
var format_ClockTower_54 = new ol.format.GeoJSON();
var features_ClockTower_54 = format_ClockTower_54.readFeatures(json_ClockTower_54, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ClockTower_54 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ClockTower_54.addFeatures(features_ClockTower_54);
var lyr_ClockTower_54 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ClockTower_54, 
                style: style_ClockTower_54,
                popuplayertitle: 'Clock Tower',
                interactive: true,
                title: '<img src="styles/legend/ClockTower_54.png" /> Clock Tower'
            });
var format_MultiPurposeHall_55 = new ol.format.GeoJSON();
var features_MultiPurposeHall_55 = format_MultiPurposeHall_55.readFeatures(json_MultiPurposeHall_55, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_MultiPurposeHall_55 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_MultiPurposeHall_55.addFeatures(features_MultiPurposeHall_55);
var lyr_MultiPurposeHall_55 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_MultiPurposeHall_55, 
                style: style_MultiPurposeHall_55,
                popuplayertitle: 'Multi-Purpose Hall',
                interactive: true,
                title: '<img src="styles/legend/MultiPurposeHall_55.png" /> Multi-Purpose Hall'
            });
var format_StaffQuarter_56 = new ol.format.GeoJSON();
var features_StaffQuarter_56 = format_StaffQuarter_56.readFeatures(json_StaffQuarter_56, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StaffQuarter_56 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StaffQuarter_56.addFeatures(features_StaffQuarter_56);
var lyr_StaffQuarter_56 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StaffQuarter_56, 
                style: style_StaffQuarter_56,
                popuplayertitle: 'Staff Quarter',
                interactive: true,
                title: '<img src="styles/legend/StaffQuarter_56.png" /> Staff Quarter'
            });
var format_StaffQuarter_57 = new ol.format.GeoJSON();
var features_StaffQuarter_57 = format_StaffQuarter_57.readFeatures(json_StaffQuarter_57, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StaffQuarter_57 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StaffQuarter_57.addFeatures(features_StaffQuarter_57);
var lyr_StaffQuarter_57 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StaffQuarter_57, 
                style: style_StaffQuarter_57,
                popuplayertitle: 'Staff Quarter',
                interactive: true,
                title: '<img src="styles/legend/StaffQuarter_57.png" /> Staff Quarter'
            });
var format_Hostel_58 = new ol.format.GeoJSON();
var features_Hostel_58 = format_Hostel_58.readFeatures(json_Hostel_58, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Hostel_58 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Hostel_58.addFeatures(features_Hostel_58);
var lyr_Hostel_58 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Hostel_58, 
                style: style_Hostel_58,
                popuplayertitle: 'Hostel',
                interactive: true,
                title: '<img src="styles/legend/Hostel_58.png" /> Hostel'
            });
var format_Hostel_59 = new ol.format.GeoJSON();
var features_Hostel_59 = format_Hostel_59.readFeatures(json_Hostel_59, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Hostel_59 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Hostel_59.addFeatures(features_Hostel_59);
var lyr_Hostel_59 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Hostel_59, 
                style: style_Hostel_59,
                popuplayertitle: 'Hostel',
                interactive: true,
                title: '<img src="styles/legend/Hostel_59.png" /> Hostel'
            });

lyr_Googlesatellite_0.setVisible(true);lyr_CollegeBoundary_1.setVisible(true);lyr_Road_2.setVisible(true);lyr_Footpath_3.setVisible(true);lyr_National_Highway_4.setVisible(true);lyr_Fountain_5.setVisible(true);lyr_FishPond_6.setVisible(true);lyr_WisdomTree_7.setVisible(true);lyr_Monument_8.setVisible(true);lyr_Chorten_9.setVisible(true);lyr_Gate_10.setVisible(true);lyr_SlappingBridge_11.setVisible(true);lyr_ManiLakhor_12.setVisible(true);lyr_GarbageHouse_13.setVisible(true);lyr_Canopy_14.setVisible(true);lyr_ChildrenPark_15.setVisible(true);lyr_GirlsBasketballCourt_16.setVisible(true);lyr_VolleyballCourt_17.setVisible(true);lyr_FootballGround_18.setVisible(true);lyr_SherubtseStadium_19.setVisible(true);lyr_FootballGroundGate_20.setVisible(true);lyr_FutsalGround_21.setVisible(true);lyr_FutsalGallery_22.setVisible(true);lyr_LawnTennisCourt_23.setVisible(true);lyr_LawnTennisGallery_24.setVisible(true);lyr_BasketballCourt_25.setVisible(true);lyr_BasketballGallery_26.setVisible(true);lyr_ArcheryField_27.setVisible(true);lyr_Gallery_28.setVisible(true);lyr_IsmileCafe_29.setVisible(true);lyr_CollegeZangtopelri_30.setVisible(true);lyr_GuestHouse_31.setVisible(true);lyr_StudentMess_32.setVisible(true);lyr_StudentMess_33.setVisible(true);lyr_StudentServiceVillage_34.setVisible(true);lyr_StudentServiceVillage_35.setVisible(true);lyr_StudentServiceVillage_36.setVisible(true);lyr_StudentServiceVillage_37.setVisible(true);lyr_StudentServiceVillage_38.setVisible(true);lyr_StudentServiceVillage_39.setVisible(true);lyr_AcademicBuilding_40.setVisible(true);lyr_AcademicBuilding_41.setVisible(true);lyr_AcademicBuilding_42.setVisible(true);lyr_AcademicBuilding_43.setVisible(true);lyr_AcademicBuilding_44.setVisible(true);lyr_AcademicBuilding_45.setVisible(true);lyr_AcademicBuilding_46.setVisible(true);lyr_AcademicBuilding_47.setVisible(true);lyr_AcademicBuilding_48.setVisible(true);lyr_AcademicBuilding_49.setVisible(true);lyr_AcademicBuilding_50.setVisible(true);lyr_AcademicBuilding_51.setVisible(true);lyr_AcademicBuilding_52.setVisible(true);lyr_AcademicBuilding_53.setVisible(true);lyr_ClockTower_54.setVisible(true);lyr_MultiPurposeHall_55.setVisible(true);lyr_StaffQuarter_56.setVisible(true);lyr_StaffQuarter_57.setVisible(true);lyr_Hostel_58.setVisible(true);lyr_Hostel_59.setVisible(true);
var layersList = [lyr_Googlesatellite_0,lyr_CollegeBoundary_1,lyr_Road_2,lyr_Footpath_3,lyr_National_Highway_4,lyr_Fountain_5,lyr_FishPond_6,lyr_WisdomTree_7,lyr_Monument_8,lyr_Chorten_9,lyr_Gate_10,lyr_SlappingBridge_11,lyr_ManiLakhor_12,lyr_GarbageHouse_13,lyr_Canopy_14,lyr_ChildrenPark_15,lyr_GirlsBasketballCourt_16,lyr_VolleyballCourt_17,lyr_FootballGround_18,lyr_SherubtseStadium_19,lyr_FootballGroundGate_20,lyr_FutsalGround_21,lyr_FutsalGallery_22,lyr_LawnTennisCourt_23,lyr_LawnTennisGallery_24,lyr_BasketballCourt_25,lyr_BasketballGallery_26,lyr_ArcheryField_27,lyr_Gallery_28,lyr_IsmileCafe_29,lyr_CollegeZangtopelri_30,lyr_GuestHouse_31,lyr_StudentMess_32,lyr_StudentMess_33,lyr_StudentServiceVillage_34,lyr_StudentServiceVillage_35,lyr_StudentServiceVillage_36,lyr_StudentServiceVillage_37,lyr_StudentServiceVillage_38,lyr_StudentServiceVillage_39,lyr_AcademicBuilding_40,lyr_AcademicBuilding_41,lyr_AcademicBuilding_42,lyr_AcademicBuilding_43,lyr_AcademicBuilding_44,lyr_AcademicBuilding_45,lyr_AcademicBuilding_46,lyr_AcademicBuilding_47,lyr_AcademicBuilding_48,lyr_AcademicBuilding_49,lyr_AcademicBuilding_50,lyr_AcademicBuilding_51,lyr_AcademicBuilding_52,lyr_AcademicBuilding_53,lyr_ClockTower_54,lyr_MultiPurposeHall_55,lyr_StaffQuarter_56,lyr_StaffQuarter_57,lyr_Hostel_58,lyr_Hostel_59];
lyr_CollegeBoundary_1.set('fieldAliases', {'FID': 'FID', });
lyr_Road_2.set('fieldAliases', {'id': 'id', });
lyr_Footpath_3.set('fieldAliases', {'id': 'id', 'Photo': 'Photo', 'Name': 'Name', });
lyr_National_Highway_4.set('fieldAliases', {'id': 'id', });
lyr_Fountain_5.set('fieldAliases', {'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_FishPond_6.set('fieldAliases', {'Purpose': 'Purpose:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_WisdomTree_7.set('fieldAliases', {'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_Monument_8.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_Chorten_9.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_Gate_10.set('fieldAliases', {'Name': 'Name:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_SlappingBridge_11.set('fieldAliases', {'ESTD': 'ESTD:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_ManiLakhor_12.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_GarbageHouse_13.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_Canopy_14.set('fieldAliases', {'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_ChildrenPark_15.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_GirlsBasketballCourt_16.set('fieldAliases', {'Descriptio': 'Description:', 'Length': 'Length:', 'Width': 'Width:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_VolleyballCourt_17.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Length': 'Length:', 'Width': 'Width:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_FootballGround_18.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Length': 'Length:', 'Width': 'Width:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_SherubtseStadium_19.set('fieldAliases', {'Name': 'Name:', 'Capacity': 'Capacity:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_FootballGroundGate_20.set('fieldAliases', {'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_FutsalGround_21.set('fieldAliases', {'Descriptio': 'Description:', 'Length': 'Length:', 'Width': 'Width:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_FutsalGallery_22.set('fieldAliases', {'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_LawnTennisCourt_23.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Length': 'Length:', 'Width': 'Width:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_LawnTennisGallery_24.set('fieldAliases', {'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_BasketballCourt_25.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Length': 'Length:', 'Width': 'Width:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Pciture:', });
lyr_BasketballGallery_26.set('fieldAliases', {'ESTD': 'ESTD:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_ArcheryField_27.set('fieldAliases', {'Name': 'Name:', 'Descriptio': 'Description:', 'Length': 'Length:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_Gallery_28.set('fieldAliases', {'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_IsmileCafe_29.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_CollegeZangtopelri_30.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_GuestHouse_31.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'No. of uni': 'No. of Units:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentMess_32.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentMess_33.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentServiceVillage_34.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentServiceVillage_35.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentServiceVillage_36.set('fieldAliases', {'ESTD': 'ESTD:', 'Units Offi': 'Units Office:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentServiceVillage_37.set('fieldAliases', {'ESTD': 'ESTD:', 'No. of Uni': 'No. of Units:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentServiceVillage_38.set('fieldAliases', {'ESTD': 'ESTD:', 'Top Floor': 'Top Floor:', 'Ground Flo': 'Ground Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StudentServiceVillage_39.set('fieldAliases', {'ESTD': 'ESTD:', 'Top Floor': 'Top Floor:', 'Ground Flo': 'Ground Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_40.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Flo': 'Ground Floor:', 'Top Floor': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_41.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Flo': 'Ground Floor:', 'Top Floor': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_42.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'No. of roo': 'No. of Rooms:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_43.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_44.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Flo': 'Ground Floor:', 'Top Floor': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_45.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Flo': 'Ground Floor:', 'Top Floor': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_46.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Flo': 'Ground Floor:', 'First Floo': 'First Floor:', 'Second Flo': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_47.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Flo': 'Ground Floor:', 'Top Floor': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_48.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Foo': 'Ground Floor:', 'First Floo': 'First Floor:', 'Second Flo': 'Second Floor:', 'Third Floo': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_49.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Ground Flo': 'Ground Floor:', 'First Floo': 'First Floor:', 'Second Flo': 'Second Floor:', 'Third Floo': 'Top Floor:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_50.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_51.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_52.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_AcademicBuilding_53.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_ClockTower_54.set('fieldAliases', {'ESTD': 'ESTD:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_MultiPurposeHall_55.set('fieldAliases', {'ESTD': 'ESTD:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StaffQuarter_56.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'No. of Uni': 'No. of Units:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_StaffQuarter_57.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Category': 'Category:', 'No. of Uni': 'No. of Units:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_Hostel_58.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Category': 'Category:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_Hostel_59.set('fieldAliases', {'Name': 'Name:', 'ESTD': 'ESTD:', 'Category': 'Category:', 'Capacity': 'Capacity:', 'Descriptio': 'Description:', 'Latitude': 'Latitude:', 'Longitude': 'Longitude:', 'Picture': 'Picture:', });
lyr_CollegeBoundary_1.set('fieldImages', {'FID': 'TextEdit', });
lyr_Road_2.set('fieldImages', {'id': 'TextEdit', });
lyr_Footpath_3.set('fieldImages', {'id': 'TextEdit', 'Photo': 'TextEdit', 'Name': 'TextEdit', });
lyr_National_Highway_4.set('fieldImages', {'id': 'TextEdit', });
lyr_Fountain_5.set('fieldImages', {'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_FishPond_6.set('fieldImages', {'Purpose': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_WisdomTree_7.set('fieldImages', {'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_Monument_8.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_Chorten_9.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_Gate_10.set('fieldImages', {'Name': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_SlappingBridge_11.set('fieldImages', {'ESTD': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_ManiLakhor_12.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_GarbageHouse_13.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_Canopy_14.set('fieldImages', {'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_ChildrenPark_15.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_GirlsBasketballCourt_16.set('fieldImages', {'Descriptio': 'TextEdit', 'Length': 'TextEdit', 'Width': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_VolleyballCourt_17.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Length': 'TextEdit', 'Width': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_FootballGround_18.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Length': 'TextEdit', 'Width': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_SherubtseStadium_19.set('fieldImages', {'Name': 'TextEdit', 'Capacity': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_FootballGroundGate_20.set('fieldImages', {'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_FutsalGround_21.set('fieldImages', {'Descriptio': 'TextEdit', 'Length': 'TextEdit', 'Width': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_FutsalGallery_22.set('fieldImages', {'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_LawnTennisCourt_23.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Length': 'TextEdit', 'Width': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_LawnTennisGallery_24.set('fieldImages', {'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_BasketballCourt_25.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Length': 'TextEdit', 'Width': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_BasketballGallery_26.set('fieldImages', {'ESTD': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_ArcheryField_27.set('fieldImages', {'Name': 'TextEdit', 'Descriptio': 'TextEdit', 'Length': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_Gallery_28.set('fieldImages', {'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_IsmileCafe_29.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_CollegeZangtopelri_30.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_GuestHouse_31.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'No. of uni': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentMess_32.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentMess_33.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentServiceVillage_34.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentServiceVillage_35.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentServiceVillage_36.set('fieldImages', {'ESTD': 'TextEdit', 'Units Offi': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentServiceVillage_37.set('fieldImages', {'ESTD': 'TextEdit', 'No. of Uni': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentServiceVillage_38.set('fieldImages', {'ESTD': 'TextEdit', 'Top Floor': 'TextEdit', 'Ground Flo': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StudentServiceVillage_39.set('fieldImages', {'ESTD': 'TextEdit', 'Top Floor': 'TextEdit', 'Ground Flo': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_40.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Flo': 'TextEdit', 'Top Floor': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_41.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Flo': 'TextEdit', 'Top Floor': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_42.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'No. of roo': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_43.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_44.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Flo': 'TextEdit', 'Top Floor': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_45.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Flo': 'TextEdit', 'Top Floor': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_46.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Flo': 'TextEdit', 'First Floo': 'TextEdit', 'Second Flo': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_47.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Flo': 'TextEdit', 'Top Floor': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_48.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Foo': 'TextEdit', 'First Floo': 'TextEdit', 'Second Flo': 'TextEdit', 'Third Floo': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_49.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Ground Flo': 'TextEdit', 'First Floo': 'TextEdit', 'Second Flo': 'TextEdit', 'Third Floo': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_50.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_51.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_52.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_AcademicBuilding_53.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_ClockTower_54.set('fieldImages', {'ESTD': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_MultiPurposeHall_55.set('fieldImages', {'ESTD': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StaffQuarter_56.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'No. of Uni': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_StaffQuarter_57.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Category': 'TextEdit', 'No. of Uni': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_Hostel_58.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Category': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_Hostel_59.set('fieldImages', {'Name': 'TextEdit', 'ESTD': 'TextEdit', 'Category': 'TextEdit', 'Capacity': 'TextEdit', 'Descriptio': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Picture': 'ExternalResource', });
lyr_CollegeBoundary_1.set('fieldLabels', {'FID': 'inline label - visible with data', });
lyr_Road_2.set('fieldLabels', {'id': 'inline label - visible with data', });
lyr_Footpath_3.set('fieldLabels', {'id': 'inline label - visible with data', 'Photo': 'inline label - visible with data', 'Name': 'inline label - visible with data', });
lyr_National_Highway_4.set('fieldLabels', {'id': 'inline label - visible with data', });
lyr_Fountain_5.set('fieldLabels', {'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_FishPond_6.set('fieldLabels', {'Purpose': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_WisdomTree_7.set('fieldLabels', {'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Monument_8.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Chorten_9.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Gate_10.set('fieldLabels', {'Name': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_SlappingBridge_11.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_ManiLakhor_12.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_GarbageHouse_13.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Canopy_14.set('fieldLabels', {'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_ChildrenPark_15.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_GirlsBasketballCourt_16.set('fieldLabels', {'Descriptio': 'inline label - visible with data', 'Length': 'inline label - visible with data', 'Width': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_VolleyballCourt_17.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Length': 'inline label - visible with data', 'Width': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_FootballGround_18.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Length': 'inline label - visible with data', 'Width': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_SherubtseStadium_19.set('fieldLabels', {'Name': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_FootballGroundGate_20.set('fieldLabels', {'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_FutsalGround_21.set('fieldLabels', {'Descriptio': 'inline label - visible with data', 'Length': 'inline label - visible with data', 'Width': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_FutsalGallery_22.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_LawnTennisCourt_23.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Length': 'inline label - visible with data', 'Width': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_LawnTennisGallery_24.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_BasketballCourt_25.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Length': 'inline label - visible with data', 'Width': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_BasketballGallery_26.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_ArcheryField_27.set('fieldLabels', {'Name': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Length': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Gallery_28.set('fieldLabels', {'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_IsmileCafe_29.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_CollegeZangtopelri_30.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_GuestHouse_31.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'No. of uni': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentMess_32.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentMess_33.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentServiceVillage_34.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentServiceVillage_35.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentServiceVillage_36.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Units Offi': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentServiceVillage_37.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'No. of Uni': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentServiceVillage_38.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Top Floor': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StudentServiceVillage_39.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Top Floor': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_40.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'Top Floor': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_41.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'Top Floor': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_42.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'No. of roo': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_43.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_44.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'Top Floor': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_45.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'Top Floor': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_46.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'First Floo': 'inline label - visible with data', 'Second Flo': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_47.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'Top Floor': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_48.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Foo': 'inline label - visible with data', 'First Floo': 'inline label - visible with data', 'Second Flo': 'inline label - visible with data', 'Third Floo': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_49.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Ground Flo': 'inline label - visible with data', 'First Floo': 'inline label - visible with data', 'Second Flo': 'inline label - visible with data', 'Third Floo': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_50.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_51.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_52.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_AcademicBuilding_53.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_ClockTower_54.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_MultiPurposeHall_55.set('fieldLabels', {'ESTD': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StaffQuarter_56.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'No. of Uni': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_StaffQuarter_57.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Category': 'inline label - visible with data', 'No. of Uni': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Hostel_58.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Category': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Hostel_59.set('fieldLabels', {'Name': 'inline label - visible with data', 'ESTD': 'inline label - visible with data', 'Category': 'inline label - visible with data', 'Capacity': 'inline label - visible with data', 'Descriptio': 'inline label - visible with data', 'Latitude': 'inline label - visible with data', 'Longitude': 'inline label - visible with data', 'Picture': 'inline label - visible with data', });
lyr_Hostel_59.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
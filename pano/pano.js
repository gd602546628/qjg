$(function () {
    $("#fileUploadContent").initUpload({
        "uploadUrl": "/springboot/source/multipartUploadImg",
        //上传文件信息地址
        // "progressUrl": "#",
        //获取进度信息地址，可选，注意需要返回的data格式如下
        "scheduleStandard": false,
        showFileItemProgress: false,
        "showSummerProgress": false,//总进度条，默认限制
        //"size":350,//文件大小限制，单位kb,默认不限制
        "maxFileNumber": 3,//文件个数限制，为整数
        //"filelSavePath":"",//文件上传地址，后台设置的根目录
        //"beforeUpload":function(){alert("zxm first");},
        //在上传前执行的函数
        "onUpload": function (opt, data) {
            if (data.code == "000000") {
                $("#hotspotImg").attr("src", config.fileUrl + data.data);
                $("#hotspotImg").val(data.data)
            } else {
                alert(data.mesg)
            }


        },
        //在上传后执行的函数
        "fileType": ['png', 'jpg', 'docx', 'doc', 'zip'],
        // "selfUploadBtId":"",//自定义文件上传按钮id
        "velocity": 1000,//模拟进度速度
        // "autoCommit":false,//是否自动上传
        // "isHiddenUploadBt":false,//是否隐藏上传按钮
        // "isHiddenCleanBt":false,//是否隐藏清除按钮
        "isAutoClean": true,//是否上传完成后自动清除
        "canDrag": true,//是否可以拖动
        "ismultiple": true,//是否选择多文件
        // "showFileItemProgress":true,//是否显示文件单个总进度
        //文件类型限制，默认不限制，注意写的是文件后缀
    })
    $("#videoFileUploadContent").initUpload({
        "uploadUrl": "/springboot/source/multipartUploadVideo",
        //上传文件信息地址
        // "progressUrl": "#",
        //获取进度信息地址，可选，注意需要返回的data格式如下
        "scheduleStandard": false,
        showFileItemProgress: false,
        "showSummerProgress": false,//总进度条，默认限制
        //"size":350,//文件大小限制，单位kb,默认不限制
        "maxFileNumber": 3,//文件个数限制，为整数
        //"filelSavePath":"",//文件上传地址，后台设置的根目录
        //"beforeUpload":function(){alert("zxm first");},
        //在上传前执行的函数
        "onUpload": function (opt, data) {
            if (data.code == "000000") {
                $("#hotspotVideo").attr("src", config.fileUrl + data.data);
                $("#hotspotVideo").val(data.data)
            } else {
                alert(data.mesg)
            }
        },
        //在上传后执行的函数
        "fileType": ['mp4'],
        // "selfUploadBtId":"",//自定义文件上传按钮id
        "velocity": 1000,//模拟进度速度
        // "autoCommit":false,//是否自动上传
        // "isHiddenUploadBt":false,//是否隐藏上传按钮
        // "isHiddenCleanBt":false,//是否隐藏清除按钮
        "isAutoClean": true,//是否上传完成后自动清除
        "canDrag": true,//是否可以拖动
        "ismultiple": true,//是否选择多文件
        // "showFileItemProgress":true,//是否显示文件单个总进度
        //文件类型限制，默认不限制，注意写的是文件后缀
    })

    $("#iconFileUploadContent").initUpload({
        "uploadUrl": "/springboot/source/multipartUploadImg",
        //上传文件信息地址
        // "progressUrl": "#",
        //获取进度信息地址，可选，注意需要返回的data格式如下
        "scheduleStandard": false,
        showFileItemProgress: false,
        "showSummerProgress": false,//总进度条，默认限制
        //"size":350,//文件大小限制，单位kb,默认不限制
        "maxFileNumber": 3,//文件个数限制，为整数
        //"filelSavePath":"",//文件上传地址，后台设置的根目录
        //"beforeUpload":function(){alert("zxm first");},
        //在上传前执行的函数
        "onUpload": function (opt, data) {
            if (data.code == "000000") {
                $("#iconImg").attr("src", config.fileUrl + data.data);
                $("#iconImg").val(data.data)
            } else {
                alert(data.mesg)
            }


        },
        //在上传后执行的函数
        "fileType": ['png', 'jpg', 'docx', 'doc', 'zip'],
        // "selfUploadBtId":"",//自定义文件上传按钮id
        "velocity": 1000,//模拟进度速度
        // "autoCommit":false,//是否自动上传
        // "isHiddenUploadBt":false,//是否隐藏上传按钮
        // "isHiddenCleanBt":false,//是否隐藏清除按钮
        "isAutoClean": true,//是否上传完成后自动清除
        "canDrag": true,//是否可以拖动
        "ismultiple": true,//是否选择多文件
        // "showFileItemProgress":true,//是否显示文件单个总进度
        //文件类型限制，默认不限制，注意写的是文件后缀
    })
    var PI = window.Math.PI
    var marks = []

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var sourceId = GetQueryString("id")
    var data = {}
    data.id = sourceId
    var parorama;
    $.ajax({
        url: config.getSourceById,
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        size: {
            "width": 14000,
            "height": 7000
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.code == "000000") {
                parorama = config.fileUrl + response.data.url.replace("/preview", "")
            } else {
                $.message({type: "error", message: response.mesg});
            }
        },
        error: function (response) {
            $.message({type: "error", message: "接口有误"})
        }
    });
    var data1 = {}
    data1.id = sourceId;
    $.ajax({
        url: config.getHotspotList,
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        size: {
            "width": 14000,
            "height": 7000
        },
        data: JSON.stringify(data1),
        success: function (response) {
            if (response.code == "000000") {
                for (i = 0; i < response.data.length; i++) {
                    hotspot = response.data[i];
                    var hotspot1 = {};
                    hotspot1.id = hotspot.id;
                    hotspot1.longitude = hotspot.longitude
                    hotspot1.latitude = hotspot.latitude
                    hotspot1.html = '<div style="background: black;color: white;text-align: center;"><b>' + hotspot.title + '</b></div><div></div><img src="' + config.fileUrl + hotspot.icon + '" width="50px" height="50px">'
                    hotspot1.content = hotspot.content
                    hotspot1.data = hotspot;
                    marks.push(hotspot1)
                }
            } else {
                $.message({type: "error", message: response.mesg});
            }
        },
        error: function (response) {
            $.message({type: "error", message: "接口有误"})
        }
    });

    $("#panoLocationType").change(function () {
        var panoLocationType = $("#panoLocationType").val()
        if (panoLocationType == 1) {
            $("#sceneDiv").addClass("hidden")
            $("#hotspotImgDiv").addClass("hidden")
            $("#hotspotVideoDiv").addClass("hidden")
            $("#panoLocationUrlGroup").removeClass("hidden")
        } else if (panoLocationType == 3) {
            $("#hotspotVideoDiv").addClass("hidden")
            $("#hotspotImgDiv").removeClass("hidden")
            $("#panoLocationUrlGroup").addClass("hidden")
            $("#sceneDiv").addClass("hidden")
        } else if (panoLocationType == 2) {
            $("#hotspotVideoDiv").addClass("hidden")
            $("#hotspotImgDiv").addClass("hidden")
            $("#panoLocationUrlGroup").addClass("hidden")
            $("#sceneDiv").removeClass("hidden")
        } else if (panoLocationType == 0) {
            $("#hotspotVideoDiv").addClass("hidden")
            $("#hotspotImgDiv").addClass("hidden")
            $("#panoLocationUrlGroup").addClass("hidden")
            $("#sceneDiv").addClass("hidden")
        } else if (panoLocationType == 4) {
            $("#hotspotImgDiv").addClass("hidden")
            $("#panoLocationUrlGroup").addClass("hidden")
            $("#sceneDiv").addClass("hidden")
            $("#hotspotVideoDiv").removeClass("hidden")
        }
    })
    var PSV;
    PSV = new PhotoSphereViewer({
        container: 'photosphere',
        panorama: parorama,
        loading_txt: "加载中.....",
        default_fov: 90,
        fisheye: false,
        max_fov: 75,
        time_anim: false,
        navbar: [
            'autorotate',
            'zoom',
            'download',
            // 'markers',
            'spacer-1',
            'caption',
            'gyroscope',
            'fullscreen'
        ],
        lang: {
            autorotate: 'Automatic rotation',
            zoom: 'Zoom',
            zoomOut: 'Zoom out',
            zoomIn: 'Zoom in',
            download: 'Download',
            fullscreen: 'Fullscreen',
            markers: 'Markers',
            gyroscope: 'Gyroscope'
        },
        gyroscope: true,
        markers: marks,
        long_offset: PI / 180,
        lat_offset: PI / 180,
        navbar_style: {
            backgroundColor: 'rgba(58, 67, 100, 0.7)',
            buttonsHeight: 100,
        },


    });

    function getLongitude(longitude) {
        if (longitude > PI) {
            return ((longitude - 2 * PI) / PI) * 180;
        } else {
            return ((longitude) / PI) * 180;
        }
    }

    function getLatitude(latitude) {
        if (latitude < 0) {
            return window.Math.abs(latitude / PI) * 180
        } else {
            return -((latitude / PI) * 180)
        }
    }

    function addMark(data) {
        if (data.id == null || data.id == "") {
            data.sourceId = sourceId
            $.ajax({
                url: config.addHotspot,
                type: "POST",
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                processData: false,
                size: {
                    "width": 14000,
                    "height": 7000
                },
                data: JSON.stringify(data),
                success: function (response) {
                    if (response.code == "000000") {
                        data.id = response.data.id;
                        PSV.addMarker({
                            id: data.id,
                            longitude: data.longitude,
                            latitude: data.latitude,
                            html: '<div style="background: black;color: white;text-align: center;"><b>' + data.title + '</b></div><div></div><img src="' + config.fileUrl + data.icon + '" width="50px" height="50px">',
                            content: data.content,
                            data: data
                        });
                        $.message("添加热点成功")
                    } else {
                        $.message({type: "error", message: response.mesg});
                    }
                },
                error: function (response) {
                    $.message({type: "error", message: "接口有误"})
                }
            });
        } else {
            PSV.updateMarker({
                id: data.id,
                html: '<div style="background: black;color: white;text-align: center;"><b>' + data.title + '</b></div><div></div><img src="' + config.fileUrl + data.icon + '" width="50px" height="50px">',
                content: data.content,
                data: data
            });

        }
        $("#panoLocationAddButton").unbind("click")
    }

    PSV.on('dblclick', function (e) {
        var position = {}
        position.latitude = e.latitude
        position.longitude = e.longitude
        $("#panoLocationTooltip").val("")
        $("#panoLocationType").val("");
        $("#panoLocationContent").val("")
        $("#hotspotImgDiv").attr("src", "")
        $("#hotspotVideo").attr("src", "")
        $("#markId").val("");
        $("#dpModalButton").trigger("click")
        $("#panoLocationAddButton").click(function (object) {
            var val = new validate({
                rules: {
                    panoLocationTooltip: "notEmpty",
                    panoLocationType: "notEmpty",
                    panoLocationContent: "notEmpty",
                },
                submitFun: function () {
                    data = {};
                    data.id = $("#markId").val()
                    data.title = $("#panoLocationTooltip").val()
                    data.type = $("#panoLocationType").val();
                    data.content = $("#panoLocationContent").val()
                    data.url = $("#panoLocationUrl").val()
                    data.video = $("#hotspotVideo").val()
                    data.image = $("#hotspotImg").val()
                    data.icon = $("input[name='optionsRadiosinline']:checked").attr("imgUrl")
                    data.deletable = true;
                    data.latitude = e.latitude;
                    data.longitude = e.longitude;
                    data.ath = getLongitude(e.longitude);
                    data.atv = getLatitude(e.latitude);
                    addMark(data)
                    $("#panoLocationCancelButton").trigger("click")
                }
            })
        })
    });

    PSV.on('select-marker', function (marker, dblclick) {
        if (marker.data) {
            if (dblclick) {
                $.confirm({
                    title: "",
                    content: "确认删除改热点？",
                    confirmButtonClass: 'btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确定',
                    cancelButton: '取消',
                    confirm: function () {
                        var data = {};
                        data.id = marker.data.id;
                        $.ajax({
                            url: config.deleteHotspotById,
                            type: "POST",
                            async: false,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            processData: false,
                            data: JSON.stringify(data),
                            success: function (response) {
                                if (response.code == "000000") {
                                    PSV.removeMarker(marker);
                                    $.message("删除成功")
                                } else {
                                    $.message({type: "error", message: response.mesg});
                                }
                            }, error: function (response) {
                                $.message({type: "error", message: "接口有误"})
                            }
                        });
                    }
                })
            }
        }
    });
});

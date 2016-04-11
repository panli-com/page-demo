
;(function(){
    
    if (!supportCss3('transform')) {
        document.body.className += 'no_transform'
    }

    var urlRel = /^(http(s)?:\/\/)?([\w-]+\.)+([\w-\.]+)(\/[\w-.\/\?%&=]*)?/,
           errerText = '您输入的链接地址不正确，请核实后再填写！';
           
           
    $('#topSearch').on('click', function () {
        var $input = $(this).prevAll('input'),
                url = $.trim($input.val());
        if (urlRel.test(url)) {
            if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0)
                url = "http://" + url;
            url = url.replace(/&#/gi, '&'); //特殊地址报错
            window.location.href = "/Crawler.aspx?purl=" + encodeURIComponent(url);
        } else {
            $input.addClass('red').val(errerText);
            return false;
        }
    }); 
    
    
    $('#headSearch').on('click', function () {
        var $input = $(this).prevAll('input'),
                url = $.trim($input.val());
        if (urlRel.test(url)) {
            if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0)
                url = "http://" + url;
            url = url.replace(/&#/gi, '&'); //特殊地址报错
            
           var urV = $(".tab-sel-clk").attr("data-val");
           
           var urlFe = ["","http://www.panli.com/Crawler.aspx?purl=","http://www.panli.com/mypanli/SelfPurchase/Order.aspx?szURL="]
            
            
            window.location.href = urlFe[urV] + encodeURIComponent(url);
        } else {
            $input.addClass('red').val(errerText);
            return false;
        }
    }); 


    $('.search input').on({ '  ': function () {
            if ($(this).hasClass('red')) {
                $(this).removeClass('red').val('');
            }
        },
            'click': function (e) {
                if ($(this).hasClass('red')) {
                    $(this).removeClass('red').val('');
                }
            },
            'keyup': function (e) {
                if (e.keyCode == 13) {
                    $(this).next().click();
                    return false;
                }
            }
    });


    new hover($('*[data-hover]'));

    $('#r_download').hover(function () {
        $('.icon_code_h', this).show();
        $('.icon_code_p', this).animate({ left: 0 }, 300);
    }, function () {
        var _this = this;
        $('.icon_code_p', this).animate({ left: '121px' }, 300, function () {
            $('.icon_code_h', _this).hide();
        });
    }); 



    RightK();
 

    $(window).resize(RightK); 

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop(),
                    topHeight = $('#nav_list').offset().top + 48;
        if (scrollTop > topHeight) { }
        $('.overHead')[scrollTop > topHeight ? 'addClass' : 'removeClass']('top_Show');
        // (scrollTop > topHeight ? $('#topSearch') : $('#headSearch')).prev().focus();
        $('#black_Top')[scrollTop > 400 ? 'show' : 'hide']();
        if (window['IsIndex']) {

            $('#index_message')[scrollTop > 400 ? 'show' : 'hide']();
        }
    });
    
})()






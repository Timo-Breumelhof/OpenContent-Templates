(function ($) {
    $(document).ready(function () {
        initPage(document);
    });
    $(document).on("opencontent.change", function (event, element) {
        initPage(element);
    });
    /*
    function initPage(element) {
        $(".jplist", element).each(function () {
            $(this).jplist({
                itemsBox: '.list'
                , itemPath: '.list-item'
                , panelPath: '.jplist-panel'
                ,deepLinking: true    
            });
        });
    }
    */

    var template = '';

    function initPage(element) {
        $(".jplist", element).each(function () {

            var moduleid = $(this).attr('data-moduleid');
            var moduleScope = $(this),
                self = moduleScope,
                sf = $.ServicesFramework(moduleid);

            var $list = $('#demo .list')
			    , template = Handlebars.compile($('#jplist-template').html());

            $(this).jplist({
                itemsBox: ".list"
                , itemPath: ".list-item"
                , panelPath: ".jplist-panel"
                , deepLinking: false
                , dataSource: {
                    type: 'server'
                    , server: {
                        ajax: {
                            data: {}
                                , url: sf.getServiceRoot('OpenContent') + "JplistAPI/List"
							    , dataType: 'json'
							    , type: 'POST'
                                , beforeSend: sf.setModuleHeaders
                        }
                    }
                    , render: function (dataItem, statuses) {
                        $list.html(template(dataItem.content));
                        var logs = dataItem.content.Logs;
                        $.fn.openContent.printLogs('Module ' + moduleid + ' - jplist webapi', logs);
                    }
                }
            });
          
           var isTyping = false;
            var typingHandler = null;
            var $textfilter = $(".textfilter", this);

            $textfilter.on('input', function(context){
              if (isTyping) {
                window.clearTimeout(typingHandler);
              }
              else {
                isTyping = true;
              }

              typingHandler = window.setTimeout(function () {
                isTyping = false;
                $textfilter.trigger("keydelay");
              }, 1000);
            });
          
        });
      
     

        $(".flexslider.flex-carousel", element).each(function () {
            $(this).flexslider({
                'animationLoop': $(this).attr("data-animationloop") ? $(this).data("animationloop") : false,
                'slideshow': $(this).attr("data-slideshow") ? $(this).data("slideshow") : false,
                'animation': "slide",
                'touch': $(this).attr("data-touch") ? $(this).data("touch") : false,
                'controlNav': $(this).attr("data-controlnav") ? $(this).data("controlnav") : false,
                'directionNav': $(this).attr("data-directionnav") ? $(this).data("directionnav") : false,
                'itemWidth': $(this).attr("data-itemwidth") ? $(this).data("itemwidth") : 210,
                'itemMargin': $(this).attr("data-itemmargin") ? $(this).data("itemmargin") : 5,
                'minItems': $(this).attr("data-minitems") ? $(this).data("minitems") : 0,
                'maxItems': $(this).attr("data-maxitems") ? $(this).data("maxitems") : 0,
                'move': $(this).attr("data-move") ? $(this).data("move") : 0,
                'asNavFor': $(this).attr("data-asnavfor") ? $(this).data("asnavfor") : ""
            });
        });
        $(".flexslider.flex-slider", element).each(function () {
            $(this).flexslider({
                'animationLoop': $(this).attr("data-animationloop") ? $(this).data("animationloop") : false,
                'slideshow': $(this).attr("data-slideshow") ? $(this).data("slideshow") : false,

                'animation': $(this).attr("data-animation") ? $(this).data("animation") : "slide",
                'touch': $(this).attr("data-touch") ? $(this).data("touch") : false,
                'controlNav': $(this).attr("data-controlnav") ? $(this).data("controlnav") : false,
                'directionNav': $(this).attr("data-directionnav") ? $(this).data("directionnav") : false,
                'sync': $(this).attr("data-sync") ? $(this).data("sync") : ""

            });
        });

        if ($.fn.oembed) {
            $(".jplist-detail .description a").oembed(null, {'maxWidth':300});
        }
     
    }
    if (typeof Handlebars != 'undefined') {
        Handlebars.registerHelper('formatDateTime', function (context, format) {

            if (window.moment && context && moment(context).isValid()) {

                var f = format || "DD/MM/YYYY";

                return moment(context).format(f);

            } else {

                return context;   //  moment plugin is not available, context does not have a truthy value, or context is not a valid date

            }

        });

        Handlebars.registerHelper('lookup', function (context, field, value, options) {
            if (context) {

                for (var i = 0; i < context.length; i++) {
                    if (context[i][field] == value) {

                        return options.fn(context[i]);
                    }
                }
            }

            return context;
        });
    }
     
    
}(jQuery));
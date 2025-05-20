$(document).ready(function() {
    // Initialize all slick sliders without arrows
    $('.js-slick-wrapper').each(function() {
        var $this = $(this);
        var slickXs = $this.data('slick-xs');
        var slickSm = $this.data('slick-sm');
        var slickMd = $this.data('slick-md');
        var slickLg = $this.data('slick-lg');
        var slickXl = $this.data('slick-xl');
        var slickDots = $this.data('slick-dots');
        var slickAutoplay = $this.data('slick-autoplay');
        
        var settings = {
            dots: slickDots,
            autoplay: slickAutoplay,
            autoplaySpeed: 5000,
            infinite: true,
            speed: 700,
            slidesToShow: slickXl || 4,
            slidesToScroll: 1,
            arrows: false, // Removed arrows
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: slickLg || 3
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: slickMd || 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: slickSm || 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: slickXs || 1
                    }
                }
            ]
        };
        
        $this.find('.js-slick-content').slick(settings);
    });
    
    // Handle tab navigation and indicator
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $('.js-slick-content').slick('setPosition');
        
        // Move indicator based on active tab
        var activeTab = $(e.target);
        var tabIndex = activeTab.parent().index();
        var indicatorPosition = tabIndex * 33.33;
        $('.tab-indicator').css('left', indicatorPosition + '%');
    });
    
    // Initialize tab indicator position
    var activeTabIndex = $('.nav-link.active').parent().index();
    var initialPosition = activeTabIndex * 33.33;
    $('.tab-indicator').css('left', initialPosition + '%');
});
$(document).ready(function() {
    // Handle tab navigation
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        // Add any custom functionality here if needed
    });
});
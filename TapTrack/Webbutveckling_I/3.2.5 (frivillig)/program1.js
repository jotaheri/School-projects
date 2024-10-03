
$(function() {
    $("#main-menu").smartmenus({
        mainMenuSubOffsetX: -1, // Justerar X-positionen för menyn
        mainMenuSubOffset: 4,   // Justerar Y-positionen för menyn
        subMenusSubOffsetX: 6, // Justerar X-positionen för undermenyn
        subMenusSubOffsetY: -6  // Justerar Y-positionen för undermenyn
    });
});

// SmartMenus animerade submenyer
$(function() {
    // När en undermeny visas, lägger till 'show-animation' och tar bort 'hide-animation'
    $('#main-menu').bind({
      'show.smapi': function(e, menu) {
        $(menu).removeClass('hide-animation').addClass('show-animation');
      },
      // När en undermeny döljs, lägger till 'hide-animation' och tar bort 'show-animation'
      'hide.smapi': function(e, menu) {
        $(menu).removeClass('show-animation').addClass('hide-animation');
      }
    // När animationen är klar, tar bort både 'show-animation' och 'hide-animation'
    }).on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', 'ul', function(e) {
      $(this).removeClass('show-animation hide-animation');
      e.stopPropagation(); // Förhindrar att händelsen sprids vidare
    });
  });


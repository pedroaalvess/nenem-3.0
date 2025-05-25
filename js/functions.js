
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const googleData = JSON.parse(localStorage.getItem('google')) || {};

    params.forEach((value, key) => {
        googleData[key] = value;
    });

    if (!googleData.utm_source) {
        googleData.utm_source = 'organic';
    }

    localStorage.setItem('google', JSON.stringify(googleData));
    //console.log('Google Data Atualizado:', googleData);

    const newParams = Object.entries(googleData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = `${baseUrl}?${newParams}`;

    if (window.location.href !== newUrl) {
        window.history.replaceState(null, '', newUrl);
    }
});

jQuery(function($){
    $('.css-15jw0c5').animate({
        scrollLeft: "+=775px"
    }, "slow");
    
    $('select').each(function () {
        var name = $(this).attr('id');
        var $this = $(this);
        var numberOfOptions = $this.children('option').length;
    
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="styledSelect ' + name + '"><span></span></div>');
    
        var $styledSelect = $this.next('div.styledSelect');
        var $selectWrapper = $this.closest('.select');
    
        $styledSelect.find('span').text($this.children('option').eq(0).text());
    
        var $list = $('<ul />', { 'class': 'options' }).insertAfter($styledSelect);
    
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
    
        var $listItems = $list.children('li');
    
        $styledSelect.on('click', function (e) {
            e.stopPropagation();
        
            $('.select.active').not($selectWrapper).removeClass('active').find('ul.options').hide();
        
            $selectWrapper.toggleClass('active');
            $list.toggle();
        
            if ($list.find('.search-input').length === 0) {
                $list.prepend(`
                    <li class="search-wrapper">
                        <input type="text" class="search-input" placeholder="Procurar...">
                    </li>
                `);
            }

            $list.find('.search-input').on('click', function(e) {
                e.stopPropagation();
            });
        
            $list.find('.search-input').val('');
            $list.find('li').show();
        });        

        $listItems.on('click', function (e) {
            e.stopPropagation();
            $styledSelect.find('span').text($(this).text());
            $this.val($(this).attr('rel'));
            $list.hide();
            $selectWrapper.removeClass('active').addClass('prench');
        });
    
        $(document).on('click', function () {
            $('.select.active').removeClass('active').find('ul.options').hide();
        });
    });

    $(document).on('input', '.search-input', function () {
        const searchValue = $(this).val().toLowerCase();
    
        $(this).closest('ul.options').find('li').not('.search-wrapper').each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(searchValue));
        });
    });   
     
});

function copyPixCode() {
    const pixCode = document.getElementById('pix-code').textContent;
    navigator.clipboard.writeText(pixCode)
    .then(() => {
        const copyButton = document.getElementById('btn-copiar-pix');
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = 'Código Copiado <i class="fas fa-copy"></i>';

        setTimeout(() => {
            copyButton.innerHTML = originalText;
        }, 2000);
    })
    .catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    triggerDebugger();
});

document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();

    if (
      key === "f12" ||
      (e.ctrlKey && e.shiftKey && (key === "i" || key === "c")) ||
      (e.ctrlKey && key === "u") ||
      (e.ctrlKey && e.shiftKey && (key === "j" || key === "k")) ||
      key === "f11" ||
      (e.metaKey && key === "i")
    ) {
      e.preventDefault();
      triggerDebugger();
    }
}); 

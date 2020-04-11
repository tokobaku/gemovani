/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

/**
 * Turn all textarea inputs with ToTinyMCE class into wysiwyg editor
 */
window.addEventListener('load', () => {
    window.tinymce.init({
        selector: 'textarea.ToTinyMCE',
        height: '500',
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table directionality',
            'emoticons template paste textpattern'
        ],
        // eslint-disable-next-line @typescript-eslint/camelcase
        relative_urls: false,
        // eslint-disable-next-line max-len
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
        // eslint-disable-next-line @typescript-eslint/camelcase
        file_browser_callback(field_name, url, type, win) {
            window.tinymce.activeEditor.windowManager.open({
                file: `${window.location.origin}/elfinder/tinymce4`,
                title: 'elFinder 2.0',
                width: 900,
                height: 450,
                resizable: 'yes'
            }, {
                setUrl(url) {
                    // eslint-disable-next-line no-param-reassign
                    win.document.getElementById(field_name).value = url;
                }
            });

            return false;
        }
    });
});

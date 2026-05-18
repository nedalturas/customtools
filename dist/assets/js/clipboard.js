let clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
    e.clearSelection();

    $('body').toast({
        message: 'Copied to clipboard!',
        class: 'cb-toast cb-toast-success',
        showIcon: 'clipboard check',
        displayTime: 2000,
        position: 'top center',
        transition: {
            showMethod: 'slide down',
            showDuration: 120,
            hideMethod: 'slide up',
            hideDuration: 200
        }
    });
});

clipboard.on('error', function (e) {
    console.error('Action:', e.action);

    $('body').toast({
        message: 'Failed to copy!',
        class: 'cb-toast cb-toast-error',
        showIcon: 'exclamation triangle',
        displayTime: 3000,
        position: 'top center',
        transition: {
            showMethod: 'slide down',
            showDuration: 120,
            hideMethod: 'slide up',
            hideDuration: 200
        }
    });
});
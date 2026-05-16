let clipboard = new ClipboardJS('.btn');

    clipboard.on('success', function (e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);

      e.clearSelection();

      $('body').toast({
        message: 'Copied to clipboard!',
        class: 'blue',
        showIcon: 'clipboard check',
        // displayTime: 2000,
        position: 'top center',
        transition: {
          showMethod: 'slide down',
          showDuration: 100,
          hideMethod: 'slide down',
          hideDuration: 500
        }
      });
    });

    clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);

      $('body').toast({
        message: 'Failed to copy to clipboard',
        class: 'error',
        showIcon: 'exclamation triangle',
        displayTime: 3000,
        position: 'top center',

        transition: {
          showMethod: 'slide down',
          showDuration: 100,
          hideMethod: 'slide down',
          hideDuration: 500
        }
      });


      
    });
const FormValidator = {
    init(formId, rules, onValid, submitBtnId) {
      const $form = $(`#${formId}`);
      const $btn = $(`#${submitBtnId}`);
  
      $btn.addClass('disabled');

      $form.form({
        fields: rules,
        inline: true,
        on: 'blur',
        onValid() { $btn.removeClass('disabled'); },
        oninvalid() { $btn.addClass('disabled'); }
      });
  
      return () => {
        if ($form.form('is valid')) {
          onValid();
        } else {
          $form.form('validate form');
        }
      };
    }
  };
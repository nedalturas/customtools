const FormValidator = {
    init(formId, rules, onValid, submitBtnId) {
      const $form = $(`#${formId}`);
  

      $form.form({
        fields: rules,
        inline: true,
        on: 'blur',
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
const FormValidator = {
    init(formId, rules, onValid) {
      const $form = $(`#${formId}`);
  
      $form.form({
        fields: rules,
        inline: true,
        on: 'blur',
      });
  
      // Expose a validate-then-run helper
      return () => {
        if ($form.form('is valid')) {
          onValid();
        } else {
          $form.form('validate form');
        }
      };
    }
  };
import * as Yup from "yup";

function configureValidations() {
  //type // nameofvalidation //function
  Yup.addMethod(Yup.string, "firstLetterUppercase", function () {
    return this.test(
      "first-letter-uppercase",
      "First Letter Must Be Uppercase.",
      function (value) {
        if (value && value.length > 0) {
          const firstletter = value.substring(0, 1);
          return firstletter === firstletter.toUpperCase();
        }
        return true;
      });
  });
}

export default configureValidations;

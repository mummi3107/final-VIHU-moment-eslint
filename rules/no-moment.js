module.exports = {
    meta: {
      type: "suggestion",
      docs: {
        description: "The use of the library 'moment' is not allowed, ",
      },
      schema: [],
      messages: {
        noMoment: "The 'moment' library is forbidden. Use 'date-fns' instead.",
      },
    },
    create(context) {
      return {
        // Detect imports (import moment from "moment";)
        ImportDeclaration(node) {
          if (node.source.value === "moment") {
            context.report({
              node,
              messageId: "noMoment",
            });
          }
        },
        // Detect requires (const moment = require("moment");)
        CallExpression(node) {
          if (
            node.callee.name === "require" &&
            node.arguments[0].value === "moment"
          ) {
            context.report({
              node,
              messageId: "noMoment",
            });
          }
        },
      };
    },
  };
  